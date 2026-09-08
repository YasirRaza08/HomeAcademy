// Home Academy - Complete Production Relational Database Layer
// 18 Relational Entities, Server-Side Questions, Notifications, and Audit Ledger
// Native Node.js 24 node:sqlite DatabaseSync with persistent disk storage

import { DatabaseSync } from 'node:sqlite';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';

import { INITIAL_CLASS, ACHIEVEMENTS } from '../js/data/initial-data.js';
import { OFFICIAL_TOPICS } from '../js/data/curriculum.js';
import { OFFICIAL_ROLEPLAYS } from '../js/data/roleplay-data.js';
import { TOPIC_QUESTION_BANKS } from '../js/data/topic-activities.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_DIR = path.resolve(__dirname);
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

export const DB_PATH = process.env.DATABASE_PATH || path.join(DB_DIR, 'home_academy.db');
export const db = new DatabaseSync(DB_PATH);

// Helper for bcrypt password hashing (cost factor 10)
export function hashPasswordServer(password) {
  return bcrypt.hashSync(password, 10);
}

export function generateSaltServer(length = 16) {
  return crypto.randomBytes(length).toString('hex');
}

export function verifyPasswordServer(password, storedHash, salt = null) {
  if (!storedHash || !password) return false;
  // If bcrypt hash ($2a$ or $2b$)
  if (storedHash.startsWith('$2a$') || storedHash.startsWith('$2b$')) {
    try {
      return bcrypt.compareSync(password, storedHash);
    } catch (e) {
      return false;
    }
  }
  // Fallback check for legacy salted SHA-256 hashes during migration
  if (salt) {
    const legacy = crypto.createHash('sha256').update(`${salt}:${password}`).digest('hex');
    return legacy === storedHash;
  }
  return false;
}

// Canonical Level Names
export function calculateLevel(xp = 0) {
  if (xp >= 2000) return { level: 6, title: 'English Champion' };
  if (xp >= 1000) return { level: 5, title: 'English Explorer' };
  if (xp >= 500) return { level: 4, title: 'English Learner' };
  if (xp >= 250) return { level: 3, title: 'Sentence Builder' };
  if (xp >= 100) return { level: 2, title: 'Word Explorer' };
  return { level: 1, title: 'English Starter' };
}

// --------------------------------------------------------------------------
// SCHEMA INITIALIZATION (18 RELATIONAL ENTITIES)
// --------------------------------------------------------------------------
export function initDatabase() {
  db.exec('PRAGMA foreign_keys = OFF;');

  // Check if existing students or curriculum_topics table has legacy schema
  try {
    const existingTopicCols = db.prepare(`PRAGMA table_info(curriculum_topics)`).all().map(c => c.name);
    if (existingTopicCols.length > 0 && !existingTopicCols.includes('topic_id')) {
      // Cleanly recreate tables with new 18-entity relational architecture
      db.exec(`
        DROP TABLE IF EXISTS questions;
        DROP TABLE IF EXISTS quizzes;
        DROP TABLE IF EXISTS quiz_attempts;
        DROP TABLE IF EXISTS activities;
        DROP TABLE IF EXISTS activity_attempts;
        DROP TABLE IF EXISTS student_progress;
        DROP TABLE IF EXISTS student_achievements;
        DROP TABLE IF EXISTS streaks;
        DROP TABLE IF EXISTS notifications;
        DROP TABLE IF EXISTS roleplay_attempts;
        DROP TABLE IF EXISTS roleplays;
        DROP TABLE IF EXISTS curriculum_topics;
        DROP TABLE IF EXISTS teachers_admins;
        DROP TABLE IF EXISTS classes;
        DROP TABLE IF EXISTS sessions;
        DROP TABLE IF EXISTS students;
        DROP TABLE IF EXISTS users;
        DROP TABLE IF EXISTS xp_transactions;
        DROP TABLE IF EXISTS achievements;
      `);
    }

    const existingXpCols = db.prepare(`PRAGMA table_info(xp_transactions)`).all().map(c => c.name);
    if (existingXpCols.length > 0 && !existingXpCols.includes('transaction_id')) {
      db.exec(`DROP TABLE IF EXISTS xp_transactions;`);
    }

    const existingAchCols = db.prepare(`PRAGMA table_info(achievements)`).all().map(c => c.name);
    if (existingAchCols.length > 0 && !existingAchCols.includes('achievement_id')) {
      db.exec(`DROP TABLE IF EXISTS achievements;`);
    }
  } catch (e) {}

  db.exec('PRAGMA foreign_keys = ON;');

  db.exec(`
    -- 1. USERS TABLE (Core Authentication)
    CREATE TABLE IF NOT EXISTS users (
      user_id TEXT PRIMARY KEY,
      role TEXT NOT NULL CHECK(role IN ('student', 'teacher', 'admin')),
      email TEXT UNIQUE NOT NULL COLLATE NOCASE,
      password_hash TEXT NOT NULL,
      password_salt TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      last_login DATETIME
    );

    CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

    -- 2. CLASSES TABLE
    CREATE TABLE IF NOT EXISTS classes (
      class_id TEXT PRIMARY KEY,
      code TEXT UNIQUE NOT NULL COLLATE NOCASE,
      name TEXT NOT NULL,
      teacher_id TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_classes_code ON classes(code);

    -- 3. TEACHERS_ADMINS TABLE
    CREATE TABLE IF NOT EXISTS teachers_admins (
      teacher_id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
      name TEXT NOT NULL,
      email TEXT NOT NULL COLLATE NOCASE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- 4. STUDENTS TABLE
    CREATE TABLE IF NOT EXISTS students (
      student_id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
      full_name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL COLLATE NOCASE,
      class_id TEXT NOT NULL REFERENCES classes(class_id),
      avatar TEXT DEFAULT '🦁',
      join_date TEXT NOT NULL,
      xp INTEGER DEFAULT 0,
      level INTEGER DEFAULT 1,
      streak INTEGER DEFAULT 0,
      activities_completed INTEGER DEFAULT 0,
      overall_progress INTEGER DEFAULT 0,
      roleplay_progress INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_students_xp ON students(xp DESC, level DESC);
    CREATE INDEX IF NOT EXISTS idx_students_email ON students(email);
    CREATE INDEX IF NOT EXISTS idx_students_class ON students(class_id);

    -- 5. SESSIONS TABLE (Bearer Token Authentication)
    CREATE TABLE IF NOT EXISTS sessions (
      token TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
      student_id TEXT REFERENCES students(student_id) ON DELETE CASCADE,
      role TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      expires_at DATETIME
    );

    CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions(user_id);
    CREATE INDEX IF NOT EXISTS idx_sessions_student ON sessions(student_id);

    -- 6. CURRICULUM_TOPICS TABLE
    CREATE TABLE IF NOT EXISTS curriculum_topics (
      topic_id TEXT PRIMARY KEY,
      number TEXT NOT NULL,
      title TEXT NOT NULL,
      subtitle TEXT,
      summary TEXT,
      color TEXT,
      active INTEGER DEFAULT 1,
      data_json TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- 7. QUESTIONS TABLE (Server-Side Question Bank)
    CREATE TABLE IF NOT EXISTS questions (
      question_id TEXT PRIMARY KEY,
      topic_id TEXT NOT NULL REFERENCES curriculum_topics(topic_id) ON DELETE CASCADE,
      question TEXT NOT NULL,
      question_type TEXT DEFAULT 'mcq',
      options_json TEXT NOT NULL,
      correct_answer INTEGER NOT NULL,
      explanation TEXT,
      difficulty TEXT DEFAULT 'easy',
      xp_reward INTEGER DEFAULT 10,
      active INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_questions_topic ON questions(topic_id, active);

    -- 8. QUIZZES TABLE
    CREATE TABLE IF NOT EXISTS quizzes (
      quiz_id TEXT PRIMARY KEY,
      topic_id TEXT NOT NULL REFERENCES curriculum_topics(topic_id) ON DELETE CASCADE,
      title TEXT NOT NULL,
      total_questions INTEGER DEFAULT 5,
      pass_percentage INTEGER DEFAULT 80,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- 9. QUIZ_ATTEMPTS TABLE
    CREATE TABLE IF NOT EXISTS quiz_attempts (
      attempt_id TEXT PRIMARY KEY,
      student_id TEXT NOT NULL REFERENCES students(student_id) ON DELETE CASCADE,
      quiz_id TEXT REFERENCES quizzes(quiz_id),
      topic_id TEXT NOT NULL,
      submission_token TEXT UNIQUE NOT NULL,
      score INTEGER NOT NULL,
      total_questions INTEGER NOT NULL,
      correct_answers INTEGER NOT NULL,
      incorrect_answers INTEGER NOT NULL,
      percentage INTEGER NOT NULL,
      passed INTEGER NOT NULL,
      xp_earned INTEGER NOT NULL,
      completed_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_quiz_attempts_student ON quiz_attempts(student_id);

    -- 10. ACTIVITIES TABLE
    CREATE TABLE IF NOT EXISTS activities (
      activity_id TEXT PRIMARY KEY,
      topic_id TEXT NOT NULL REFERENCES curriculum_topics(topic_id) ON DELETE CASCADE,
      activity_type TEXT NOT NULL,
      title TEXT NOT NULL,
      data_json TEXT
    );

    -- 11. ACTIVITY_ATTEMPTS TABLE
    CREATE TABLE IF NOT EXISTS activity_attempts (
      attempt_id TEXT PRIMARY KEY,
      student_id TEXT NOT NULL REFERENCES students(student_id) ON DELETE CASCADE,
      activity_id TEXT,
      topic_id TEXT NOT NULL,
      activity_type TEXT NOT NULL,
      score INTEGER DEFAULT 100,
      correct_answers INTEGER DEFAULT 1,
      xp_earned INTEGER NOT NULL,
      idempotency_key TEXT UNIQUE,
      completed_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_activity_attempts_student ON activity_attempts(student_id);

    -- 12. ROLEPLAYS TABLE (5 Physical Class Roleplays)
    CREATE TABLE IF NOT EXISTS roleplays (
      roleplay_id TEXT PRIMARY KEY,
      roleplay_number TEXT NOT NULL,
      title TEXT NOT NULL,
      scenario TEXT NOT NULL,
      grammar_focus TEXT,
      spoken_expressions_json TEXT,
      vocabulary_json TEXT,
      practice_questions_json TEXT,
      difficulty TEXT DEFAULT 'beginner',
      color TEXT,
      active INTEGER DEFAULT 1,
      data_json TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- 13. ROLEPLAY_ATTEMPTS TABLE
    CREATE TABLE IF NOT EXISTS roleplay_attempts (
      attempt_id TEXT PRIMARY KEY,
      student_id TEXT NOT NULL REFERENCES students(student_id) ON DELETE CASCADE,
      roleplay_id TEXT NOT NULL REFERENCES roleplays(roleplay_id) ON DELETE CASCADE,
      started INTEGER DEFAULT 1,
      completed INTEGER DEFAULT 0,
      score INTEGER DEFAULT 0,
      speaking_score INTEGER DEFAULT 0,
      xp_earned INTEGER DEFAULT 0,
      progress_percentage INTEGER DEFAULT 0,
      completed_at DATETIME
    );

    CREATE INDEX IF NOT EXISTS idx_roleplay_attempts_student ON roleplay_attempts(student_id);

    -- 14. ACHIEVEMENTS TABLE
    CREATE TABLE IF NOT EXISTS achievements (
      achievement_id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      xp_reward INTEGER DEFAULT 25,
      type TEXT NOT NULL,
      requirement INTEGER DEFAULT 1
    );

    -- 15. STUDENT_ACHIEVEMENTS TABLE
    CREATE TABLE IF NOT EXISTS student_achievements (
      student_id TEXT NOT NULL REFERENCES students(student_id) ON DELETE CASCADE,
      achievement_id TEXT NOT NULL REFERENCES achievements(achievement_id) ON DELETE CASCADE,
      unlocked_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY(student_id, achievement_id)
    );

    -- 16. STUDENT_PROGRESS TABLE (Curriculum Topic Mastery)
    CREATE TABLE IF NOT EXISTS student_progress (
      student_id TEXT NOT NULL REFERENCES students(student_id) ON DELETE CASCADE,
      topic_id TEXT NOT NULL REFERENCES curriculum_topics(topic_id) ON DELETE CASCADE,
      progress_percentage INTEGER DEFAULT 0,
      learned INTEGER DEFAULT 0,
      practice_count INTEGER DEFAULT 0,
      quiz_score INTEGER DEFAULT 0,
      passed INTEGER DEFAULT 0,
      completed_at TEXT,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY(student_id, topic_id)
    );

    -- 17. XP_TRANSACTIONS TABLE (Audit Ledger & Anti-Replay)
    CREATE TABLE IF NOT EXISTS xp_transactions (
      transaction_id TEXT PRIMARY KEY,
      student_id TEXT NOT NULL REFERENCES students(student_id) ON DELETE CASCADE,
      activity_id TEXT,
      source TEXT NOT NULL,
      amount INTEGER NOT NULL,
      idempotency_key TEXT UNIQUE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_xp_tx_student ON xp_transactions(student_id);

    -- 18. STREAKS TABLE
    CREATE TABLE IF NOT EXISTS streaks (
      student_id TEXT PRIMARY KEY REFERENCES students(student_id) ON DELETE CASCADE,
      current_streak INTEGER DEFAULT 0,
      highest_streak INTEGER DEFAULT 0,
      last_activity_date TEXT,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- 19. NOTIFICATIONS TABLE (Real-Time Teacher & Student Notifications)
    CREATE TABLE IF NOT EXISTS notifications (
      notification_id TEXT PRIMARY KEY,
      recipient_role TEXT DEFAULT 'teacher',
      student_id TEXT,
      title TEXT NOT NULL,
      message TEXT NOT NULL,
      type TEXT NOT NULL,
      data_json TEXT,
      is_read INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_notifications_role ON notifications(recipient_role, is_read);

    -- 20. APP_SETTINGS TABLE
    CREATE TABLE IF NOT EXISTS app_settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  seedInitialDataIfEmpty();
}

// --------------------------------------------------------------------------
// SYSTEM SEEDING (NO FAKE STUDENTS, REAL CONTENT ONLY)
// --------------------------------------------------------------------------
function seedInitialDataIfEmpty() {
  // 1. Seed Classes & Teacher User
  const classRow = db.prepare('SELECT class_id FROM classes WHERE code = ?').get(INITIAL_CLASS.code || 'HOME-ENGLISH');
  let classId = classRow ? classRow.class_id : null;

  if (!classRow) {
    classId = 'cls_' + crypto.randomBytes(6).toString('hex');
    db.prepare(`
      INSERT INTO classes (class_id, code, name, teacher_id)
      VALUES (?, ?, ?, 'tch_zubair')
    `).run(classId, INITIAL_CLASS.code || 'HOME-ENGLISH', INITIAL_CLASS.name || 'Home Academy - English Language Program');

    // Create teacher user (Initial password: env or pakistan786)
    const initialTeacherPassword = process.env.INITIAL_ADMIN_PASSWORD || 'pakistan786';
    const adminHash = hashPasswordServer(initialTeacherPassword);
    const teacherUserId = 'usr_teacher_zubair';

    db.prepare(`
      INSERT OR IGNORE INTO users (user_id, role, email, password_hash, password_salt)
      VALUES (?, 'teacher', 'teacher@homeacademy.com', ?, 'bcrypt')
    `).run(teacherUserId, adminHash);

    db.prepare(`
      INSERT OR IGNORE INTO teachers_admins (teacher_id, user_id, name, email)
      VALUES ('tch_zubair', ?, ?, 'teacher@homeacademy.com')
    `).run(teacherUserId, INITIAL_CLASS.teacher || 'Sir Zubair');

    db.prepare(`INSERT OR REPLACE INTO app_settings (key, value) VALUES ('class_code', ?)`).run(INITIAL_CLASS.code || 'HOME-ENGLISH');
    db.prepare(`INSERT OR REPLACE INTO app_settings (key, value) VALUES ('class_name', ?)`).run(INITIAL_CLASS.name || 'Home Academy - English Language Program');
    db.prepare(`INSERT OR REPLACE INTO app_settings (key, value) VALUES ('teacher_name', ?)`).run(INITIAL_CLASS.teacher || 'Sir Zubair');
  }

  // Auto-upgrade teacher password to bcrypt if it is still plain SHA-256
  try {
    const teacherUser = db.prepare(`SELECT * FROM users WHERE role = 'teacher'`).get();
    if (teacherUser && !teacherUser.password_hash.startsWith('$2a$') && !teacherUser.password_hash.startsWith('$2b$')) {
      const initialTeacherPassword = process.env.INITIAL_ADMIN_PASSWORD || 'pakistan786';
      const adminHash = hashPasswordServer(initialTeacherPassword);
      db.prepare(`UPDATE users SET password_hash = ?, password_salt = 'bcrypt' WHERE user_id = ?`).run(adminHash, teacherUser.user_id);
    }
  } catch (e) {}

  // 2. Seed Achievements
  const achCount = db.prepare('SELECT COUNT(*) AS count FROM achievements').get().count;
  if (achCount === 0) {
    const insertAch = db.prepare(`
      INSERT INTO achievements (achievement_id, title, description, xp_reward, type, requirement)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    ACHIEVEMENTS.forEach(a => {
      insertAch.run(a.id, a.title, a.description, a.xpReward || 25, a.type || 'general', a.requirement || 1);
    });
  }

  // 3. Seed 6 Official Curriculum Topics & Quizzes
  const topicCount = db.prepare('SELECT COUNT(*) AS count FROM curriculum_topics').get().count;
  if (topicCount === 0) {
    const insertTopic = db.prepare(`
      INSERT INTO curriculum_topics (topic_id, number, title, subtitle, summary, color, active, data_json)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const insertQuiz = db.prepare(`
      INSERT INTO quizzes (quiz_id, topic_id, title, total_questions, pass_percentage)
      VALUES (?, ?, ?, 5, 80)
    `);

    OFFICIAL_TOPICS.forEach(topic => {
      insertTopic.run(
        topic.id,
        topic.number,
        topic.title,
        topic.subtitle || '',
        topic.summary || '',
        topic.color || '#0A2558',
        topic.active !== false ? 1 : 0,
        JSON.stringify(topic)
      );
      insertQuiz.run(`quiz_${topic.id}`, topic.id, `${topic.title} Mastery Quiz`);
    });
  }

  // Ensure quizzes exist for all curriculum topics
  db.exec(`
    INSERT OR IGNORE INTO quizzes (quiz_id, topic_id, title, total_questions, pass_percentage)
    SELECT 'quiz_' || topic_id, topic_id, title || ' Mastery Quiz', 5, 80 FROM curriculum_topics;
  `);

  // 4. Seed Questions Database from TOPIC_QUESTION_BANKS
  const qCount = db.prepare('SELECT COUNT(*) AS count FROM questions').get().count;
  if (qCount === 0) {
    const insertQ = db.prepare(`
      INSERT INTO questions (question_id, topic_id, question, question_type, options_json, correct_answer, explanation, difficulty, xp_reward, active)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 10, 1)
    `);

    Object.entries(TOPIC_QUESTION_BANKS).forEach(([topicId, qList]) => {
      qList.forEach(q => {
        insertQ.run(
          q.id,
          topicId,
          q.question,
          q.type || 'mcq',
          JSON.stringify(q.options || []),
          q.answer !== undefined ? q.answer : 0,
          q.explanation || '',
          q.difficulty || 'easy'
        );
      });
    });
  }

  // 5. Seed 5 Official Roleplays
  const rpCount = db.prepare('SELECT COUNT(*) AS count FROM roleplays').get().count;
  if (rpCount === 0) {
    const insertRp = db.prepare(`
      INSERT INTO roleplays (roleplay_id, roleplay_number, title, scenario, grammar_focus, spoken_expressions_json, vocabulary_json, practice_questions_json, difficulty, color, active, data_json)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'beginner', ?, ?, ?)
    `);

    OFFICIAL_ROLEPLAYS.forEach(rp => {
      insertRp.run(
        rp.id,
        rp.number,
        rp.title,
        rp.scenario,
        Array.isArray(rp.grammarFocus) ? rp.grammarFocus.join(', ') : (rp.grammarFocus || ''),
        JSON.stringify(rp.spokenExpressions || []),
        JSON.stringify(rp.keyVocab || []),
        JSON.stringify(rp.practiceQuestions || []),
        rp.color || '#0A2558',
        rp.active !== false ? 1 : 0,
        JSON.stringify(rp)
      );
    });
  }
}

// --------------------------------------------------------------------------
// STUDENT REPOSITORY OPERATIONS
// --------------------------------------------------------------------------

export function createStudent({ id, name, email, passwordHash, passwordSalt, avatar, classCode }) {
  const cleanEmail = email.trim().toLowerCase();
  const cleanName = name.trim();
  const studentId = id || ('ha_stu_' + Date.now() + '_' + crypto.randomBytes(4).toString('hex'));
  const userId = 'usr_' + crypto.randomBytes(8).toString('hex');
  const joinDate = new Date().toISOString().split('T')[0];

  // Validate Class Code
  const classRow = db.prepare('SELECT class_id, code FROM classes WHERE code = ? COLLATE NOCASE').get((classCode || 'HOME-ENGLISH').trim());
  if (!classRow) {
    throw new Error('Invalid class code. Please check with your teacher.');
  }

  // ATOMIC DATABASE TRANSACTION (Requirement 6)
  db.exec('BEGIN TRANSACTION;');
  try {
    // 1. Create user account
    db.prepare(`
      INSERT INTO users (user_id, role, email, password_hash, password_salt)
      VALUES (?, 'student', ?, ?, ?)
    `).run(userId, cleanEmail, passwordHash, passwordSalt || 'bcrypt');

    // 2. Create student record
    db.prepare(`
      INSERT INTO students (student_id, user_id, full_name, email, class_id, avatar, join_date, xp, level, streak, activities_completed, overall_progress, roleplay_progress)
      VALUES (?, ?, ?, ?, ?, ?, ?, 0, 1, 0, 0, 0, 0)
    `).run(studentId, userId, cleanName, cleanEmail, classRow.class_id, avatar || '🦁', joinDate);

    // 3. Create initial streaks record
    db.prepare(`
      INSERT INTO streaks (student_id, current_streak, highest_streak, last_activity_date)
      VALUES (?, 0, 0, ?)
    `).run(studentId, joinDate);

    // 4. Initialize progress (0%) across all active curriculum topics
    const topics = db.prepare('SELECT topic_id FROM curriculum_topics WHERE active = 1').all();
    const insertProg = db.prepare(`
      INSERT INTO student_progress (student_id, topic_id, progress_percentage, learned, practice_count, quiz_score, passed)
      VALUES (?, ?, 0, 0, 0, 0, 0)
    `);
    topics.forEach(t => insertProg.run(studentId, t.topic_id));

    // 5. Initial achievement badge
    db.prepare(`INSERT OR IGNORE INTO student_achievements (student_id, achievement_id) VALUES (?, 'first_join')`).run(studentId);

    // 6. Create Real Notification for Teacher
    createNotification({
      recipientRole: 'teacher',
      studentId,
      title: 'New Student Joined',
      message: `${cleanName} successfully enrolled in Home Academy!`,
      type: 'new_student',
      data: { name: cleanName, email: cleanEmail, joinDate, avatar: avatar || '🦁' }
    });

    db.exec('COMMIT;');
  } catch (err) {
    try { db.exec('ROLLBACK;'); } catch (rbErr) {}
    throw err;
  }

  return getStudentById(studentId);
}

export function getStudentByEmail(email) {
  if (!email) return null;
  const row = db.prepare(`SELECT * FROM students WHERE email = ? COLLATE NOCASE`).get(email.trim().toLowerCase());
  if (!row) return null;
  return formatStudentEntity(row);
}

export function getStudentById(id) {
  if (!id) return null;
  const row = db.prepare(`SELECT * FROM students WHERE student_id = ?`).get(id);
  if (!row) return null;
  return formatStudentEntity(row);
}

export function verifyStudentCredentials(email, password) {
  if (!email || !password) return null;
  const user = db.prepare(`SELECT * FROM users WHERE email = ? COLLATE NOCASE AND role = 'student'`).get(email.trim().toLowerCase());
  if (!user) return null;

  const isValid = verifyPasswordServer(password, user.password_hash, user.password_salt);
  if (!isValid) return null;

  // Upgrade legacy hash to bcrypt if needed
  if (!user.password_hash.startsWith('$2a$') && !user.password_hash.startsWith('$2b$')) {
    const newHash = hashPasswordServer(password);
    db.prepare(`UPDATE users SET password_hash = ?, password_salt = 'bcrypt' WHERE user_id = ?`).run(newHash, user.user_id);
  }

  // Update last_login
  db.prepare(`UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE user_id = ?`).run(user.user_id);

  const student = db.prepare(`SELECT * FROM students WHERE user_id = ?`).get(user.user_id);
  return student ? formatStudentEntity(student) : null;
}

export function getAllStudents() {
  const rows = db.prepare(`SELECT * FROM students ORDER BY xp DESC, level DESC`).all();
  return rows.map(formatStudentEntity);
}

export function deleteStudentById(studentId) {
  const student = db.prepare('SELECT user_id FROM students WHERE student_id = ?').get(studentId);
  if (!student) return false;
  db.prepare('DELETE FROM users WHERE user_id = ?').run(student.user_id);
  return true;
}

// Format student entity for client / API consumption
function formatStudentEntity(row) {
  if (!row) return null;

  // Topic progress
  const progressRows = db.prepare(`SELECT * FROM student_progress WHERE student_id = ?`).all(row.student_id);
  const topicProgress = {};
  progressRows.forEach(p => {
    topicProgress[p.topic_id] = {
      learned: Boolean(p.learned),
      practiceCount: p.practice_count,
      quizScore: p.quiz_score,
      passed: Boolean(p.passed),
      completedAt: p.completed_at
    };
  });

  // Roleplay progress
  const rpRows = db.prepare(`SELECT * FROM roleplay_attempts WHERE student_id = ?`).all(row.student_id);
  const roleplayProgress = {};
  rpRows.forEach(r => {
    roleplayProgress[r.roleplay_id] = {
      started: Boolean(r.started),
      completed: Boolean(r.completed),
      percent: r.progress_percentage,
      score: r.score,
      speakingScore: r.speaking_score,
      completedAt: r.completed_at
    };
  });

  // Achievements
  const achRows = db.prepare(`SELECT achievement_id FROM student_achievements WHERE student_id = ?`).all(row.student_id);
  const unlockedAchievements = achRows.map(a => a.achievement_id);

  // Stats
  const quizStats = db.prepare(`
    SELECT COUNT(*) as taken, COALESCE(SUM(correct_answers), 0) as correct, COALESCE(SUM(total_questions), 0) as total
    FROM quiz_attempts WHERE student_id = ?
  `).get(row.student_id);

  const gamesCount = db.prepare(`SELECT COUNT(*) as count FROM activity_attempts WHERE student_id = ?`).get(row.student_id).count;
  const levelData = calculateLevel(row.xp || 0);

  return {
    id: row.student_id,
    studentId: row.student_id,
    userId: row.user_id,
    name: row.full_name,
    fullName: row.full_name,
    email: row.email,
    avatar: row.avatar,
    classId: row.class_id,
    level: levelData.level,
    levelTitle: levelData.title,
    xp: row.xp,
    streak: row.streak,
    activitiesCompleted: row.activities_completed,
    overallProgress: row.overall_progress,
    roleplayProgressPercent: row.roleplay_progress,
    joinDate: row.join_date,
    joinedAt: row.created_at,
    topicProgress,
    roleplayProgress,
    unlockedAchievements,
    stats: {
      quizzesTaken: quizStats.taken,
      correctAnswers: quizStats.correct,
      totalQuestions: quizStats.total,
      topicsCompleted: progressRows.filter(p => p.passed).length,
      gamesPlayed: gamesCount,
      accuracy: quizStats.total > 0 ? Math.round((quizStats.correct / quizStats.total) * 100) : 0
    }
  };
}

// --------------------------------------------------------------------------
// DETAILED STUDENT PROFILE / DOSSIER (FOR TEACHER ADMIN DASHBOARD)
// --------------------------------------------------------------------------
export function getStudentDetailedProfile(studentId) {
  const student = getStudentById(studentId);
  if (!student) return null;

  const quizHistory = db.prepare(`
    SELECT * FROM quiz_attempts WHERE student_id = ? ORDER BY completed_at DESC
  `).all(studentId);

  const activityHistory = db.prepare(`
    SELECT * FROM activity_attempts WHERE student_id = ? ORDER BY completed_at DESC
  `).all(studentId);

  const roleplayHistory = db.prepare(`
    SELECT r.*, rp.title as roleplay_title, rp.roleplay_number
    FROM roleplay_attempts r
    LEFT JOIN roleplays rp ON r.roleplay_id = rp.roleplay_id
    WHERE r.student_id = ? ORDER BY r.completed_at DESC
  `).all(studentId);

  const xpLedger = db.prepare(`
    SELECT * FROM xp_transactions WHERE student_id = ? ORDER BY created_at DESC LIMIT 50
  `).all(studentId);

  const streakData = db.prepare(`
    SELECT * FROM streaks WHERE student_id = ?
  `).get(studentId) || { current_streak: 0, highest_streak: 0, last_activity_date: null };

  return {
    student,
    streak: streakData,
    quizHistory,
    activityHistory,
    roleplayHistory,
    xpLedger
  };
}

// --------------------------------------------------------------------------
// SERVER-SIDE XP TRANSACTIONS & LEVELING (CANNOT BE MANIPULATED BY CLIENT)
// --------------------------------------------------------------------------
export function awardXP({ studentId, amount, source, activityId = null, idempotencyKey = null }) {
  if (amount <= 0) return { student: getStudentById(studentId), xpAwarded: 0 };

  // Check idempotency
  if (idempotencyKey) {
    const existing = db.prepare(`SELECT transaction_id FROM xp_transactions WHERE idempotency_key = ?`).get(idempotencyKey);
    if (existing) {
      return { student: getStudentById(studentId), xpAwarded: 0, duplicate: true };
    }
  }

  const student = db.prepare(`SELECT * FROM students WHERE student_id = ?`).get(studentId);
  if (!student) throw new Error('Student not found for XP award');

  const newXP = (student.xp || 0) + amount;
  const levelInfo = calculateLevel(newXP);

  // Update streak logic
  const today = new Date().toISOString().split('T')[0];
  let newStreak = student.streak || 0;
  const streakRow = db.prepare(`SELECT * FROM streaks WHERE student_id = ?`).get(studentId);

  if (streakRow) {
    if (streakRow.last_activity_date !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      if (streakRow.last_activity_date === yesterday) {
        newStreak = streakRow.current_streak + 1;
      } else if (!streakRow.last_activity_date) {
        newStreak = 1;
      }
      const highest = Math.max(streakRow.highest_streak || 0, newStreak);
      db.prepare(`
        UPDATE streaks SET current_streak = ?, highest_streak = ?, last_activity_date = ?, updated_at = CURRENT_TIMESTAMP
        WHERE student_id = ?
      `).run(newStreak, highest, today, studentId);
    }
  }

  // Update student table atomically
  db.prepare(`
    UPDATE students
    SET xp = ?, level = ?, streak = ?, updated_at = CURRENT_TIMESTAMP
    WHERE student_id = ?
  `).run(newXP, levelInfo.level, newStreak, studentId);

  // Record audit transaction
  const txId = 'tx_' + Date.now() + '_' + crypto.randomBytes(3).toString('hex');
  db.prepare(`
    INSERT INTO xp_transactions (transaction_id, student_id, activity_id, source, amount, idempotency_key)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(txId, studentId, activityId, source, amount, idempotencyKey);

  // Check milestone achievements
  if (newXP >= 500) db.prepare(`INSERT OR IGNORE INTO student_achievements (student_id, achievement_id) VALUES (?, 'xp_500')`).run(studentId);
  if (newStreak >= 3) db.prepare(`INSERT OR IGNORE INTO student_achievements (student_id, achievement_id) VALUES (?, 'streak_3')`).run(studentId);
  if (newStreak >= 7) db.prepare(`INSERT OR IGNORE INTO student_achievements (student_id, achievement_id) VALUES (?, 'streak_7')`).run(studentId);

  return { student: getStudentById(studentId), xpAwarded: amount, newXP, newLevel: levelInfo.level, levelTitle: levelInfo.title };
}

// --------------------------------------------------------------------------
// QUIZ ATTEMPTS & PROGRESS (SERVER-VALIDATED)
// --------------------------------------------------------------------------
export function recordQuizSubmission({ studentId, topicId, submissionToken, score, totalQuestions, correctAnswers, incorrectAnswers, percentage }) {
  const existing = db.prepare(`SELECT attempt_id FROM quiz_attempts WHERE submission_token = ?`).get(submissionToken);
  if (existing) {
    return { duplicate: true, student: getStudentById(studentId), xpEarned: 0 };
  }

  const passed = percentage >= 80 ? 1 : 0;
  const isPerfect = percentage >= 100;

  // Rules: Perfect Quiz = +50 XP, Normal Pass = +25 XP
  let xpReward = 0;
  const prevProgress = db.prepare(`SELECT passed FROM student_progress WHERE student_id = ? AND topic_id = ?`).get(studentId, topicId);
  const isFirstPass = passed && (!prevProgress || !prevProgress.passed);

  if (isPerfect) {
    xpReward = 50;
  } else if (passed) {
    xpReward = isFirstPass ? 25 : 10;
  }

  const attemptId = 'qatt_' + Date.now() + '_' + crypto.randomBytes(4).toString('hex');
  
  // Ensure quiz exists in quizzes table
  db.prepare(`
    INSERT OR IGNORE INTO quizzes (quiz_id, topic_id, title, total_questions, pass_percentage)
    VALUES (?, ?, ?, ?, 80)
  `).run(`quiz_${topicId}`, topicId, `${topicId} Mastery Quiz`, totalQuestions || 5);

  db.prepare(`
    INSERT INTO quiz_attempts (attempt_id, student_id, quiz_id, topic_id, submission_token, score, total_questions, correct_answers, incorrect_answers, percentage, passed, xp_earned)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    attemptId,
    studentId,
    `quiz_${topicId}`,
    topicId,
    submissionToken,
    score,
    totalQuestions,
    correctAnswers,
    incorrectAnswers,
    percentage,
    passed,
    xpReward
  );

  // Update student_progress
  db.prepare(`
    INSERT INTO student_progress (student_id, topic_id, progress_percentage, quiz_score, passed, completed_at)
    VALUES (?, ?, ?, ?, ?, ?)
    ON CONFLICT(student_id, topic_id) DO UPDATE SET
      quiz_score = MAX(quiz_score, excluded.quiz_score),
      progress_percentage = MAX(progress_percentage, excluded.progress_percentage),
      passed = MAX(passed, excluded.passed),
      completed_at = CASE WHEN excluded.passed = 1 AND (passed IS NULL OR passed = 0) THEN excluded.completed_at ELSE completed_at END,
      updated_at = CURRENT_TIMESTAMP
  `).run(studentId, topicId, percentage, percentage, passed, passed ? new Date().toISOString() : null);

  if (xpReward > 0) {
    awardXP({
      studentId,
      amount: xpReward,
      source: isPerfect ? `perfect_quiz_${topicId}` : `quiz_pass_${topicId}`,
      activityId: `quiz_${topicId}`,
      idempotencyKey: `xp_qatt_${submissionToken}`
    });
  }

  if (isPerfect) {
    db.prepare(`INSERT OR IGNORE INTO student_achievements (student_id, achievement_id) VALUES (?, 'perfect_quiz')`).run(studentId);
  }

  return { student: getStudentById(studentId), passed: Boolean(passed), percentage, xpEarned: xpReward, isFirstPass };
}

export function recordTopicQuiz({ studentId, topicId, submissionToken, score = 5, total = 5, percent = 100, correctAnswers, incorrectAnswers }) {
  return recordQuizSubmission({
    studentId,
    topicId,
    submissionToken,
    score,
    totalQuestions: total,
    correctAnswers: correctAnswers !== undefined ? correctAnswers : score,
    incorrectAnswers: incorrectAnswers !== undefined ? incorrectAnswers : (total - score),
    percentage: percent
  });
}

export function recordFullGrammarTest({ studentId, submissionToken, score = 24, total = 30, percent = 80, topicBreakdown = {} }) {
  const existing = db.prepare(`SELECT attempt_id FROM quiz_attempts WHERE submission_token = ?`).get(submissionToken);
  if (existing) {
    return { duplicate: true, student: getStudentById(studentId), xpEarned: 0 };
  }

  const passed = percent >= 80 ? 1 : 0;
  const isPerfect = percent >= 100;
  const xpEarned = isPerfect ? 150 : (passed ? 125 : 50);

  const attemptId = 'ftatt_' + Date.now() + '_' + crypto.randomBytes(4).toString('hex');
  
  // Ensure full grammar test quiz exists
  db.prepare(`
    INSERT OR IGNORE INTO quizzes (quiz_id, topic_id, title, total_questions, pass_percentage)
    VALUES ('quiz_full_grammar', 'adjectives', 'Full Grammar Grand Test', ?, 80)
  `).run(total || 30);

  db.prepare(`
    INSERT INTO quiz_attempts (attempt_id, student_id, quiz_id, topic_id, submission_token, score, total_questions, correct_answers, incorrect_answers, percentage, passed, xp_earned)
    VALUES (?, ?, 'quiz_full_grammar', 'full_grammar', ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    attemptId,
    studentId,
    submissionToken,
    score,
    total,
    score,
    Math.max(0, total - score),
    percent,
    passed,
    xpEarned
  );

  awardXP({
    studentId,
    amount: xpEarned,
    source: isPerfect ? 'perfect_full_grammar_test' : 'full_grammar_test_pass',
    activityId: 'quiz_full_grammar',
    idempotencyKey: `xp_${submissionToken}`
  });

  return { student: getStudentById(studentId), passed: Boolean(passed), percent, xpEarned };
}

// --------------------------------------------------------------------------
// TOPIC PRACTICE & ACTIVITIES
// --------------------------------------------------------------------------
export function recordTopicPractice(studentId, topicId, count = 1) {
  db.prepare(`
    INSERT INTO student_progress (student_id, topic_id, practice_count)
    VALUES (?, ?, ?)
    ON CONFLICT(student_id, topic_id) DO UPDATE SET practice_count = practice_count + ?, updated_at = CURRENT_TIMESTAMP
  `).run(studentId, topicId, count, count);

  // Rule: Complete Topic Practice = +25 XP
  return awardXP({
    studentId,
    amount: 25,
    source: `practice_${topicId}`,
    activityId: `practice_${topicId}`
  });
}

export function recordTopicLearn(studentId, topicId) {
  const existing = db.prepare(`SELECT learned FROM student_progress WHERE student_id = ? AND topic_id = ?`).get(studentId, topicId);
  if (!existing || !existing.learned) {
    db.prepare(`
      INSERT INTO student_progress (student_id, topic_id, learned)
      VALUES (?, ?, 1)
      ON CONFLICT(student_id, topic_id) DO UPDATE SET learned = 1, updated_at = CURRENT_TIMESTAMP
    `).run(studentId, topicId);

    return awardXP({
      studentId,
      amount: 10,
      source: `learn_${topicId}`,
      activityId: `learn_${topicId}`,
      idempotencyKey: `learn_${studentId}_${topicId}`
    });
  }
  return { student: getStudentById(studentId), xpAwarded: 0 };
}

export function recordActivityCompletion({ studentId, topicId, activityType, score = 100, xpReward = 25, idempotencyKey = null }) {
  const idempKey = idempotencyKey || `act_${studentId}_${topicId}_${activityType}`;
  const existing = db.prepare(`SELECT attempt_id FROM activity_attempts WHERE idempotency_key = ?`).get(idempKey);
  if (existing) {
    return { duplicate: true, student: getStudentById(studentId), xpAwarded: 0 };
  }

  const attemptId = 'aatt_' + Date.now() + '_' + crypto.randomBytes(4).toString('hex');
  db.prepare(`
    INSERT INTO activity_attempts (attempt_id, student_id, activity_id, topic_id, activity_type, score, correct_answers, xp_earned, idempotency_key)
    VALUES (?, ?, ?, ?, ?, ?, 1, ?, ?)
  `).run(attemptId, studentId, `act_${topicId}_${activityType}`, topicId, activityType, score, xpReward, idempKey);

  db.prepare(`UPDATE students SET activities_completed = activities_completed + 1 WHERE student_id = ?`).run(studentId);

  awardXP({
    studentId,
    amount: xpReward,
    source: `activity_${topicId}_${activityType}`,
    activityId: `act_${topicId}_${activityType}`,
    idempotencyKey: `xp_${idempKey}`
  });

  return { student: getStudentById(studentId), xpAwarded: xpReward, completed: true };
}

// --------------------------------------------------------------------------
// ROLEPLAY PRESENTATION PROGRESS
// --------------------------------------------------------------------------
export function recordRoleplayAttempt({ studentId, roleplayId, score = 100, speakingScore = 100, percent = 100 }) {
  // Normalize roleplayId (e.g. rp_1 -> rp_01)
  if (typeof roleplayId === 'string' && roleplayId.match(/^rp_\d$/)) {
    roleplayId = roleplayId.replace(/^rp_(\d)$/, 'rp_0$1');
  }

  const completed = percent >= 80 ? 1 : 0;
  const isPerfect = percent >= 100;
  // Rules: Complete Roleplay Practice = +25 XP; Perfect Roleplay = +50 XP
  const xpEarned = isPerfect ? 50 : (completed ? 25 : 10);

  const existing = db.prepare(`SELECT attempt_id, completed FROM roleplay_attempts WHERE student_id = ? AND roleplay_id = ?`).get(studentId, roleplayId);
  const isFirstCompletion = completed && (!existing || !existing.completed);

  const attemptId = existing ? existing.attempt_id : ('rpatt_' + Date.now() + '_' + crypto.randomBytes(4).toString('hex'));

  db.prepare(`
    INSERT INTO roleplay_attempts (attempt_id, student_id, roleplay_id, started, completed, score, speaking_score, xp_earned, progress_percentage, completed_at)
    VALUES (?, ?, ?, 1, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(attempt_id) DO UPDATE SET
      completed = MAX(completed, excluded.completed),
      score = MAX(score, excluded.score),
      progress_percentage = MAX(progress_percentage, excluded.progress_percentage),
      completed_at = CASE WHEN excluded.completed = 1 AND (completed IS NULL OR completed = 0) THEN excluded.completed_at ELSE completed_at END
  `).run(attemptId, studentId, roleplayId, completed, score, speakingScore, xpEarned, percent, completed ? new Date().toISOString() : null);

  if (isFirstCompletion) {
    awardXP({
      studentId,
      amount: xpEarned,
      source: isPerfect ? `perfect_roleplay_${roleplayId}` : `complete_roleplay_${roleplayId}`,
      activityId: roleplayId,
      idempotencyKey: `rp_first_${studentId}_${roleplayId}`
    });
    const achId = roleplayId.replace('rp_0', 'roleplay_').replace('rp_', 'roleplay_') + '_complete';
    const achRow = db.prepare(`SELECT achievement_id FROM achievements WHERE achievement_id = ?`).get(achId);
    if (achRow) {
      db.prepare(`INSERT OR IGNORE INTO student_achievements (student_id, achievement_id) VALUES (?, ?)`).run(studentId, achId);
    }
  }

  // Update roleplay_progress percentage in students table
  const totalRps = db.prepare('SELECT COUNT(*) as count FROM roleplays WHERE active = 1').get().count || 5;
  const completedRps = db.prepare('SELECT COUNT(*) as count FROM roleplay_attempts WHERE student_id = ? AND completed = 1').get(studentId).count;
  const overallRpPercent = Math.min(100, Math.round((completedRps / totalRps) * 100));
  db.prepare(`UPDATE students SET roleplay_progress = ? WHERE student_id = ?`).run(overallRpPercent, studentId);

  return { student: getStudentById(studentId), completed: Boolean(completed), percent, xpEarned: isFirstCompletion ? xpEarned : 0 };
}

export function recordRoleplayCompletion({ studentId, roleplayId, percent = 100, score = 100, speakingScore = 100 }) {
  return recordRoleplayAttempt({ studentId, roleplayId, score, speakingScore, percent });
}

// --------------------------------------------------------------------------
// QUESTIONS REPOSITORY
// --------------------------------------------------------------------------
export function getQuestionsByTopic(topicId, limit = 10, randomize = true) {
  let query = 'SELECT * FROM questions WHERE topic_id = ? AND active = 1';
  if (randomize) query += ' ORDER BY RANDOM()';
  if (limit) query += ` LIMIT ${parseInt(limit, 10)}`;

  const rows = db.prepare(query).all(topicId);
  return rows.map(r => ({
    id: r.question_id,
    topicId: r.topic_id,
    question: r.question,
    type: r.question_type,
    options: JSON.parse(r.options_json || '[]'),
    answer: r.correct_answer,
    explanation: r.explanation,
    difficulty: r.difficulty,
    xpReward: r.xp_reward
  }));
}

export function getAllQuestionsAdmin(topicId = null) {
  let query = 'SELECT * FROM questions';
  const params = [];
  if (topicId) {
    query += ' WHERE topic_id = ?';
    params.push(topicId);
  }
  query += ' ORDER BY topic_id ASC, created_at DESC';

  const rows = db.prepare(query).all(...params);
  return rows.map(r => ({
    id: r.question_id,
    topicId: r.topic_id,
    question: r.question,
    type: r.question_type,
    options: JSON.parse(r.options_json || '[]'),
    answer: r.correct_answer,
    explanation: r.explanation,
    difficulty: r.difficulty,
    xpReward: r.xp_reward,
    active: Boolean(r.active)
  }));
}

export function createQuestion({ topicId, question, questionType = 'mcq', options, correctAnswer = 0, explanation = '', difficulty = 'easy', xpReward = 10 }) {
  const qId = 'q_' + Date.now() + '_' + crypto.randomBytes(3).toString('hex');
  db.prepare(`
    INSERT INTO questions (question_id, topic_id, question, question_type, options_json, correct_answer, explanation, difficulty, xp_reward, active)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
  `).run(qId, topicId, question.trim(), questionType, JSON.stringify(options || []), correctAnswer, explanation.trim(), difficulty, xpReward);
  return qId;
}

export function updateQuestion(questionId, updates) {
  const current = db.prepare(`SELECT * FROM questions WHERE question_id = ?`).get(questionId);
  if (!current) throw new Error('Question not found');

  const question = updates.question !== undefined ? updates.question.trim() : current.question;
  const optionsJson = updates.options ? JSON.stringify(updates.options) : current.options_json;
  const correctAnswer = updates.correctAnswer !== undefined ? updates.correctAnswer : current.correct_answer;
  const explanation = updates.explanation !== undefined ? updates.explanation.trim() : current.explanation;
  const difficulty = updates.difficulty !== undefined ? updates.difficulty : current.difficulty;
  const active = updates.active !== undefined ? (updates.active ? 1 : 0) : current.active;

  db.prepare(`
    UPDATE questions
    SET question = ?, options_json = ?, correct_answer = ?, explanation = ?, difficulty = ?, active = ?, updated_at = CURRENT_TIMESTAMP
    WHERE question_id = ?
  `).run(question, optionsJson, correctAnswer, explanation, difficulty, active, questionId);

  return true;
}

export function deleteQuestion(questionId) {
  return db.prepare(`DELETE FROM questions WHERE question_id = ?`).run(questionId);
}

// --------------------------------------------------------------------------
// NOTIFICATIONS REPOSITORY
// --------------------------------------------------------------------------
export function createNotification({ recipientRole = 'teacher', studentId = null, title, message, type, data = {} }) {
  const id = 'notif_' + Date.now() + '_' + crypto.randomBytes(3).toString('hex');
  db.prepare(`
    INSERT INTO notifications (notification_id, recipient_role, student_id, title, message, type, data_json)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(id, recipientRole, studentId, title, message, type, JSON.stringify(data));
  return id;
}

export function getNotifications(recipientRole = 'teacher', limit = 50) {
  const rows = db.prepare(`
    SELECT * FROM notifications WHERE recipient_role = ? ORDER BY created_at DESC LIMIT ?
  `).all(recipientRole, limit);

  return rows.map(r => ({
    id: r.notification_id,
    recipientRole: r.recipient_role,
    studentId: r.student_id,
    title: r.title,
    message: r.message,
    type: r.type,
    data: JSON.parse(r.data_json || '{}'),
    isRead: Boolean(r.is_read),
    createdAt: r.created_at
  }));
}

export function markNotificationsAsRead(recipientRole = 'teacher') {
  db.prepare(`UPDATE notifications SET is_read = 1 WHERE recipient_role = ?`).run(recipientRole);
  return true;
}

// --------------------------------------------------------------------------
// SESSIONS & AUTHENTICATION
// --------------------------------------------------------------------------
export function createSession(userId, studentId = null, role = 'student', expiryHours = 72) {
  const token = 'ha_tok_' + crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + expiryHours * 3600000).toISOString();
  db.prepare(`INSERT INTO sessions (token, user_id, student_id, role, expires_at) VALUES (?, ?, ?, ?, ?)`).run(token, userId, studentId, role, expiresAt);
  return token;
}

export function getSession(token) {
  if (!token) return null;
  const session = db.prepare(`SELECT * FROM sessions WHERE token = ?`).get(token);
  if (!session) return null;
  if (session.expires_at && new Date(session.expires_at) < new Date()) {
    db.prepare(`DELETE FROM sessions WHERE token = ?`).run(token);
    return null;
  }
  return session;
}

export function deleteSession(token) {
  if (!token) return;
  db.prepare(`DELETE FROM sessions WHERE token = ?`).run(token);
}

// Teacher / Admin verification (Requirement 2 & 15: bcrypt hashing & session revocation)
export function verifyTeacherPassword(password) {
  const user = db.prepare(`SELECT * FROM users WHERE role = 'teacher'`).get();
  if (!user) return false;
  return verifyPasswordServer(password, user.password_hash, user.password_salt);
}

export function updateTeacherPassword(newPassword) {
  const hash = hashPasswordServer(newPassword);
  db.prepare(`UPDATE users SET password_salt = 'bcrypt', password_hash = ? WHERE role = 'teacher'`).run(hash);
  // Invalidate all existing teacher sessions so old sessions cannot be used
  db.prepare(`DELETE FROM sessions WHERE role = 'teacher'`).run();
  return true;
}

// Reset database to clean production state (Requirement 5 & 16: Zero fake data)
export function cleanProductionDatabase() {
  db.exec(`
    DELETE FROM sessions;
    DELETE FROM student_achievements;
    DELETE FROM student_progress;
    DELETE FROM quiz_attempts;
    DELETE FROM activity_attempts;
    DELETE FROM roleplay_attempts;
    DELETE FROM streaks;
    DELETE FROM xp_transactions;
    DELETE FROM notifications WHERE student_id IS NOT NULL;
    DELETE FROM students;
    DELETE FROM users WHERE role = 'student';
  `);
  return true;
}

// --------------------------------------------------------------------------
// LEADERBOARD (REAL RECORDS ONLY, NO FAKE DATA)
// --------------------------------------------------------------------------
export function getLeaderboard(limit = 50) {
  const rows = db.prepare(`
    SELECT student_id, full_name, avatar, level, xp, streak, join_date
    FROM students
    ORDER BY xp DESC, level DESC
    LIMIT ?
  `).all(limit);

  return rows.map((r, idx) => {
    const levelInfo = calculateLevel(r.xp || 0);
    return {
      rank: idx + 1,
      id: r.student_id,
      studentId: r.student_id,
      name: r.full_name,
      avatar: r.avatar,
      level: levelInfo.level,
      levelTitle: levelInfo.title,
      xp: r.xp,
      streak: r.streak,
      joinedAt: r.join_date
    };
  });
}

// --------------------------------------------------------------------------
// CLASS SETTINGS
// --------------------------------------------------------------------------
export function getClassSettings() {
  const cls = db.prepare(`SELECT * FROM classes LIMIT 1`).get();
  const teacher = db.prepare(`SELECT name FROM teachers_admins LIMIT 1`).get();
  return {
    code: cls ? cls.code : 'HOME-ENGLISH',
    name: cls ? cls.name : 'Home Academy - English Language Program',
    teacher: teacher ? teacher.name : 'Sir Zubair'
  };
}

export function updateClassSettings({ name, code, teacher }) {
  if (code) {
    db.prepare(`UPDATE classes SET code = ?, updated_at = CURRENT_TIMESTAMP`).run(code.trim().toUpperCase());
    db.prepare(`INSERT OR REPLACE INTO app_settings (key, value) VALUES ('class_code', ?)`).run(code.trim().toUpperCase());
  }
  if (name) {
    db.prepare(`UPDATE classes SET name = ?, updated_at = CURRENT_TIMESTAMP`).run(name.trim());
    db.prepare(`INSERT OR REPLACE INTO app_settings (key, value) VALUES ('class_name', ?)`).run(name.trim());
  }
  if (teacher) {
    db.prepare(`UPDATE teachers_admins SET name = ?`).run(teacher.trim());
    db.prepare(`INSERT OR REPLACE INTO app_settings (key, value) VALUES ('teacher_name', ?)`).run(teacher.trim());
  }
  return getClassSettings();
}

// --------------------------------------------------------------------------
// CURRICULUM & ROLEPLAYS GETTERS
// --------------------------------------------------------------------------
export function getCurriculumTopics(includeInactive = false) {
  const rows = includeInactive
    ? db.prepare(`SELECT * FROM curriculum_topics ORDER BY CAST(number AS INTEGER) ASC`).all()
    : db.prepare(`SELECT * FROM curriculum_topics WHERE active = 1 ORDER BY CAST(number AS INTEGER) ASC`).all();

  return rows.map(r => {
    try {
      const parsed = JSON.parse(r.data_json || '{}');
      return { ...parsed, id: r.topic_id, topicId: r.topic_id, number: r.number, title: r.title, active: Boolean(r.active) };
    } catch (e) {
      return { id: r.topic_id, topicId: r.topic_id, number: r.number, title: r.title, active: Boolean(r.active) };
    }
  });
}

export function toggleCurriculumTopic(topicId) {
  const topic = db.prepare(`SELECT active FROM curriculum_topics WHERE topic_id = ?`).get(topicId);
  if (!topic) throw new Error('Topic not found');
  const nextActive = topic.active === 1 ? 0 : 1;
  db.prepare(`UPDATE curriculum_topics SET active = ?, updated_at = CURRENT_TIMESTAMP WHERE topic_id = ?`).run(nextActive, topicId);
  return Boolean(nextActive);
}

export function deleteCurriculumTopic(topicId) {
  db.prepare(`DELETE FROM curriculum_topics WHERE topic_id = ?`).run(topicId);
  return true;
}

export function resetCurriculumTopics() {
  db.prepare(`DELETE FROM curriculum_topics`).run();
  const insertTopic = db.prepare(`
    INSERT INTO curriculum_topics (topic_id, number, title, subtitle, summary, color, active, data_json)
    VALUES (?, ?, ?, ?, ?, ?, 1, ?)
  `);
  OFFICIAL_TOPICS.forEach(topic => {
    insertTopic.run(topic.id, topic.number, topic.title, topic.subtitle || '', topic.summary || '', topic.color || '#0A2558', JSON.stringify(topic));
  });
  return getCurriculumTopics(true);
}

export function getRoleplays(includeInactive = false) {
  const rows = includeInactive
    ? db.prepare(`SELECT * FROM roleplays ORDER BY CAST(roleplay_number AS INTEGER) ASC`).all()
    : db.prepare(`SELECT * FROM roleplays WHERE active = 1 ORDER BY CAST(roleplay_number AS INTEGER) ASC`).all();

  return rows.map(r => {
    try {
      const parsed = JSON.parse(r.data_json || '{}');
      return { ...parsed, id: r.roleplay_id, roleplayId: r.roleplay_id, number: r.roleplay_number, title: r.title, active: Boolean(r.active) };
    } catch (e) {
      return { id: r.roleplay_id, roleplayId: r.roleplay_id, number: r.roleplay_number, title: r.title, active: Boolean(r.active) };
    }
  });
}

export function toggleRoleplayActive(roleplayId) {
  const rp = db.prepare(`SELECT active FROM roleplays WHERE roleplay_id = ?`).get(roleplayId);
  if (!rp) throw new Error('Roleplay presentation not found');
  const nextActive = rp.active === 1 ? 0 : 1;
  db.prepare(`UPDATE roleplays SET active = ?, updated_at = CURRENT_TIMESTAMP WHERE roleplay_id = ?`).run(nextActive, roleplayId);
  return Boolean(nextActive);
}

export function updateRoleplay(roleplayId, updates) {
  const rp = db.prepare(`SELECT data_json FROM roleplays WHERE roleplay_id = ?`).get(roleplayId);
  if (!rp) throw new Error('Roleplay presentation not found');
  const parsed = JSON.parse(rp.data_json || '{}');
  const merged = { ...parsed, ...updates };

  db.prepare(`
    UPDATE roleplays
    SET title = ?, scenario = ?, data_json = ?, updated_at = CURRENT_TIMESTAMP
    WHERE roleplay_id = ?
  `).run(merged.title, merged.scenario, JSON.stringify(merged), roleplayId);

  return merged;
}

export function deleteRoleplay(roleplayId) {
  db.prepare(`DELETE FROM roleplays WHERE roleplay_id = ?`).run(roleplayId);
  return true;
}

export function resetRoleplays() {
  db.prepare(`DELETE FROM roleplays`).run();
  const insertRp = db.prepare(`
    INSERT INTO roleplays (roleplay_id, roleplay_number, title, scenario, grammar_focus, spoken_expressions_json, vocabulary_json, practice_questions_json, difficulty, color, active, data_json)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'beginner', ?, 1, ?)
  `);
  OFFICIAL_ROLEPLAYS.forEach(rp => {
    insertRp.run(
      rp.id,
      rp.number,
      rp.title,
      rp.scenario,
      Array.isArray(rp.grammarFocus) ? rp.grammarFocus.join(', ') : (rp.grammarFocus || ''),
      JSON.stringify(rp.spokenExpressions || []),
      JSON.stringify(rp.keyVocab || []),
      JSON.stringify(rp.practiceQuestions || []),
      rp.color || '#0A2558',
      JSON.stringify(rp)
    );
  });
  return getRoleplays(true);
}

// Auto-run schema initialization on module import
initDatabase();
