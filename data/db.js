// Home Academy - Complete Production Relational Database Layer
// 18 Relational Entities, Server-Side Questions, Notifications, and Audit Ledger
// Powered by @libsql/client (Turso Cloud Database with Local Offline Fallback)

import { createClient } from '@libsql/client';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';

import { INITIAL_CLASS, ACHIEVEMENTS } from '../js/data/initial-data.js';
import { OFFICIAL_TOPICS } from '../js/data/curriculum.js';
import { OFFICIAL_ROLEPLAYS } from '../js/data/roleplay-data.js';
import { TOPIC_QUESTION_BANKS } from '../js/data/topic-activities.js';

const DB_DIR = path.resolve(process.cwd(), 'data');
if (!fs.existsSync(DB_DIR)) {
  try {
    fs.mkdirSync(DB_DIR, { recursive: true });
  } catch (e) {}
}

export const DB_PATH = process.env.DATABASE_PATH || path.join(DB_DIR, 'home_academy.db');

// Environment Detection & Turso Configuration
const tursoUrl = process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL;
const tursoToken = process.env.TURSO_AUTH_TOKEN || process.env.DATABASE_AUTH_TOKEN;
const isProduction = process.env.NODE_ENV === 'production' || process.env.NETLIFY === 'true';

let configError = null;
if (isProduction && !tursoUrl) {
  configError = 'TURSO_DATABASE_URL environment variable is missing in production! ' +
    'Local SQLite fallback is strictly prohibited on Netlify / production. ' +
    'Please configure TURSO_DATABASE_URL and TURSO_AUTH_TOKEN in Netlify Site configuration -> Environment variables.';
}

export const isTurso = Boolean(tursoUrl);

export const client = configError
  ? null
  : createClient(
      isTurso
        ? { url: tursoUrl, authToken: tursoToken }
        : { url: `file:${DB_PATH}` }
    );

export const db = client;

function getClient() {
  if (!client) {
    throw new Error(configError || 'Database client is not initialized. Please verify TURSO_DATABASE_URL.');
  }
  return client;
}

// --------------------------------------------------------------------------
// HEALTH CHECK ENDPOINT HELPER
// --------------------------------------------------------------------------
export async function checkHealth() {
  if (configError) {
    return {
      ok: false,
      database: 'turso',
      connected: false,
      error: configError,
      timestamp: new Date().toISOString()
    };
  }

  try {
    const aliveRes = await client.execute('SELECT 1 as alive');
    const tableRes = await client.execute(
      "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'"
    );
    const tables = tableRes.rows.map(r => r.name);
    let studentCount = 0;
    if (tables.includes('students')) {
      const countRes = await client.execute('SELECT COUNT(*) as count FROM students');
      studentCount = Number(countRes.rows[0]?.count || 0);
    }

    let teacherVerified = false;
    if (tables.includes('users')) {
      const teacherRes = await client.execute("SELECT password_hash, password_salt FROM users WHERE role IN ('teacher', 'admin')");
      teacherVerified = teacherRes.rows.some(r => verifyPasswordServer('pakistan786', r.password_hash, r.password_salt));
    }

    return {
      ok: true,
      database: isTurso ? 'turso' : 'local',
      connected: aliveRes.rows.length > 0,
      tableCount: tables.length,
      tables: tables.sort(),
      studentCount,
      teacherVerified,
      timestamp: new Date().toISOString()
    };
  } catch (err) {
    return {
      ok: false,
      database: isTurso ? 'turso' : 'local',
      connected: false,
      error: err.message,
      timestamp: new Date().toISOString()
    };
  }
}

// --------------------------------------------------------------------------
// PASSWORD & SECURITY UTILITIES (bcrypt cost factor 10)
// --------------------------------------------------------------------------
export function hashPasswordServer(password) {
  return bcrypt.hashSync(password, 10);
}

export function generateSaltServer(length = 16) {
  return crypto.randomBytes(length).toString('hex');
}

export function verifyPasswordServer(password, storedHash, salt = null) {
  if (!storedHash || !password) return false;
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

export function calculateLevel(xp = 0) {
  const numXp = Number(xp || 0);
  if (numXp >= 2000) return { level: 6, title: 'English Champion' };
  if (numXp >= 1000) return { level: 5, title: 'English Explorer' };
  if (numXp >= 500) return { level: 4, title: 'English Learner' };
  if (numXp >= 250) return { level: 3, title: 'Sentence Builder' };
  if (numXp >= 100) return { level: 2, title: 'Word Explorer' };
  return { level: 1, title: 'English Starter' };
}

// --------------------------------------------------------------------------
// SCHEMA MIGRATION & PROVISIONING (18 RELATIONAL TABLES)
// --------------------------------------------------------------------------
export async function initDatabase() {
  const activeClient = getClient();

  // Fast check: if core tables exist, avoid running 150 DDL and seed statements sequentially
  try {
    const existingTablesRes = await activeClient.execute(
      "SELECT name FROM sqlite_master WHERE type='table' AND name IN ('users', 'messages', 'curriculum_topics')"
    );
    const existingNames = new Set(existingTablesRes.rows.map(r => r.name));

    if (existingNames.has('users') && existingNames.has('messages') && existingNames.has('curriculum_topics')) {
      await ensureTeacherAccountSynchronized(activeClient);
      return;
    }
  } catch (e) {}

  const ddlStatements = [
    // 1. Users
    `CREATE TABLE IF NOT EXISTS users (
      user_id TEXT PRIMARY KEY,
      role TEXT NOT NULL CHECK(role IN ('student', 'teacher', 'admin')),
      email TEXT UNIQUE NOT NULL COLLATE NOCASE,
      password_hash TEXT NOT NULL,
      password_salt TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      last_login DATETIME
    );`,
    `CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);`,

    // 2. Classes
    `CREATE TABLE IF NOT EXISTS classes (
      class_id TEXT PRIMARY KEY,
      code TEXT UNIQUE NOT NULL COLLATE NOCASE,
      name TEXT NOT NULL,
      teacher_id TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );`,
    `CREATE INDEX IF NOT EXISTS idx_classes_code ON classes(code);`,

    // 3. Teachers / Admins
    `CREATE TABLE IF NOT EXISTS teachers_admins (
      teacher_id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
      name TEXT NOT NULL,
      email TEXT NOT NULL COLLATE NOCASE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );`,

    // 4. Students
    `CREATE TABLE IF NOT EXISTS students (
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
    );`,
    `CREATE INDEX IF NOT EXISTS idx_students_xp ON students(xp DESC, level DESC);`,
    `CREATE INDEX IF NOT EXISTS idx_students_email ON students(email);`,

    // 5. Sessions
    `CREATE TABLE IF NOT EXISTS sessions (
      token TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
      student_id TEXT REFERENCES students(student_id) ON DELETE CASCADE,
      role TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      expires_at DATETIME,
      last_activity_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      revoked_at DATETIME,
      remember_me INTEGER DEFAULT 0
    );`,
    `CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions(user_id);`,
    `CREATE INDEX IF NOT EXISTS idx_sessions_student ON sessions(student_id);`,

    // 6. Curriculum Topics
    `CREATE TABLE IF NOT EXISTS curriculum_topics (
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
    );`,

    // 7. Questions
    `CREATE TABLE IF NOT EXISTS questions (
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
    );`,
    `CREATE INDEX IF NOT EXISTS idx_questions_topic ON questions(topic_id, active);`,

    // 8. Quizzes
    `CREATE TABLE IF NOT EXISTS quizzes (
      quiz_id TEXT PRIMARY KEY,
      topic_id TEXT NOT NULL REFERENCES curriculum_topics(topic_id) ON DELETE CASCADE,
      title TEXT NOT NULL,
      total_questions INTEGER DEFAULT 5,
      pass_percentage INTEGER DEFAULT 80,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );`,

    // 9. Quiz Attempts
    `CREATE TABLE IF NOT EXISTS quiz_attempts (
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
    );`,
    `CREATE INDEX IF NOT EXISTS idx_quiz_attempts_student ON quiz_attempts(student_id);`,

    // 10. Activities
    `CREATE TABLE IF NOT EXISTS activities (
      activity_id TEXT PRIMARY KEY,
      topic_id TEXT NOT NULL REFERENCES curriculum_topics(topic_id) ON DELETE CASCADE,
      activity_type TEXT NOT NULL,
      title TEXT NOT NULL,
      data_json TEXT
    );`,

    // 11. Activity Attempts
    `CREATE TABLE IF NOT EXISTS activity_attempts (
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
    );`,

    // 12. Roleplays
    `CREATE TABLE IF NOT EXISTS roleplays (
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
    );`,

    // 13. Roleplay Attempts
    `CREATE TABLE IF NOT EXISTS roleplay_attempts (
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
    );`,

    // 14. Achievements
    `CREATE TABLE IF NOT EXISTS achievements (
      achievement_id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      xp_reward INTEGER DEFAULT 25,
      type TEXT NOT NULL,
      requirement INTEGER DEFAULT 1
    );`,

    // 15. Student Achievements
    `CREATE TABLE IF NOT EXISTS student_achievements (
      student_id TEXT NOT NULL REFERENCES students(student_id) ON DELETE CASCADE,
      achievement_id TEXT NOT NULL REFERENCES achievements(achievement_id) ON DELETE CASCADE,
      unlocked_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY(student_id, achievement_id)
    );`,

    // 16. Student Progress
    `CREATE TABLE IF NOT EXISTS student_progress (
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
    );`,

    // 17. XP Transactions
    `CREATE TABLE IF NOT EXISTS xp_transactions (
      transaction_id TEXT PRIMARY KEY,
      student_id TEXT NOT NULL REFERENCES students(student_id) ON DELETE CASCADE,
      activity_id TEXT,
      source TEXT NOT NULL,
      amount INTEGER NOT NULL,
      idempotency_key TEXT UNIQUE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );`,

    // 18. Streaks, Notifications, App Settings
    `CREATE TABLE IF NOT EXISTS streaks (
      student_id TEXT PRIMARY KEY REFERENCES students(student_id) ON DELETE CASCADE,
      current_streak INTEGER DEFAULT 0,
      highest_streak INTEGER DEFAULT 0,
      last_activity_date TEXT,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );`,

    `CREATE TABLE IF NOT EXISTS notifications (
      notification_id TEXT PRIMARY KEY,
      recipient_role TEXT NOT NULL CHECK(recipient_role IN ('teacher', 'student', 'all')),
      student_id TEXT REFERENCES students(student_id) ON DELETE CASCADE,
      title TEXT NOT NULL,
      message TEXT NOT NULL,
      type TEXT NOT NULL,
      data_json TEXT,
      is_read INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );`,
    `CREATE INDEX IF NOT EXISTS idx_notifications_role ON notifications(recipient_role, is_read);`,

    `CREATE TABLE IF NOT EXISTS app_settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );`,

    // 19. Student ↔ Teacher Messages / Chat Box
    `CREATE TABLE IF NOT EXISTS messages (
      message_id TEXT PRIMARY KEY,
      sender_role TEXT NOT NULL DEFAULT 'student',
      sender_name TEXT NOT NULL,
      student_id TEXT,
      student_email TEXT,
      content TEXT NOT NULL,
      reply_text TEXT,
      reply_at DATETIME,
      is_read INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );`,
    `CREATE INDEX IF NOT EXISTS idx_messages_time ON messages(created_at DESC);`,
    `CREATE INDEX IF NOT EXISTS idx_messages_student ON messages(student_id);`
  ];

  for (const stmt of ddlStatements) {
    await activeClient.execute(stmt);
  }

  // Idempotent column migrations for sessions table in existing databases
  const sessionColumnMigrations = [
    `ALTER TABLE sessions ADD COLUMN last_activity_at DATETIME;`,
    `ALTER TABLE sessions ADD COLUMN revoked_at DATETIME;`,
    `ALTER TABLE sessions ADD COLUMN remember_me INTEGER DEFAULT 0;`
  ];
  for (const colStmt of sessionColumnMigrations) {
    try {
      await activeClient.execute(colStmt);
    } catch (e) {
      // Ignored if column already exists
    }
  }
  try {
    await activeClient.execute(`CREATE INDEX IF NOT EXISTS idx_sessions_revoked ON sessions(revoked_at, expires_at);`);
  } catch (e) {}

  await seedInitialDataIfEmpty();
}

async function ensureTeacherAccountSynchronized(activeClient) {
  const initialTeacherPassword = process.env.INITIAL_ADMIN_PASSWORD || 'pakistan786';
  const teacherUserId = 'usr_teacher_zubair';

  try {
    const existingTeachers = await activeClient.execute(
      `SELECT user_id, password_hash, password_salt FROM users WHERE role IN ('teacher', 'admin')`
    );

    let hasValidPassword = false;
    if (existingTeachers.rows && existingTeachers.rows.length > 0) {
      for (const row of existingTeachers.rows) {
        if (verifyPasswordServer(initialTeacherPassword, row.password_hash, row.password_salt)) {
          hasValidPassword = true;
          break;
        }
      }
    }

    if (!hasValidPassword) {
      const adminHash = hashPasswordServer(initialTeacherPassword);
      console.log('[Home Academy] Synchronizing teacher password to master password.');
      await activeClient.execute({
        sql: `INSERT INTO users (user_id, role, email, password_hash, password_salt)
              VALUES (?, 'teacher', 'teacher@homeacademy.com', ?, 'bcrypt')
              ON CONFLICT(user_id) DO UPDATE SET password_hash = excluded.password_hash, password_salt = 'bcrypt'`,
        args: [teacherUserId, adminHash]
      }).catch(async () => {
        await activeClient.execute({
          sql: `UPDATE users SET password_hash = ?, password_salt = 'bcrypt' WHERE role IN ('teacher', 'admin')`,
          args: [adminHash]
        });
      });

      await activeClient.execute({
        sql: `INSERT OR IGNORE INTO teachers_admins (teacher_id, user_id, name, email) VALUES ('tch_zubair', ?, 'Sir Zubair', 'teacher@homeacademy.com')`,
        args: [teacherUserId]
      }).catch(() => {});
    }
  } catch (err) {
    console.warn('[Home Academy] Teacher account sync notice:', err.message);
  }
}

// --------------------------------------------------------------------------
// SYSTEM SEEDING (ZERO FAKE STUDENTS, REAL CONTENT ONLY)
// --------------------------------------------------------------------------
async function seedInitialDataIfEmpty() {
  const activeClient = getClient();
  const teacherUserId = 'usr_teacher_zubair';

  await ensureTeacherAccountSynchronized(activeClient);

  await activeClient.execute({
    sql: `INSERT OR IGNORE INTO classes (class_id, code, name, teacher_id) VALUES ('cls_home_english', 'HOME-ENGLISH', 'Home Academy - English Language Program', 'tch_zubair')`,
    args: []
  });

  await activeClient.execute({
    sql: `INSERT OR IGNORE INTO teachers_admins (teacher_id, user_id, name, email) VALUES ('tch_zubair', ?, 'Sir Zubair', 'teacher@homeacademy.com')`,
    args: [teacherUserId]
  });

  await activeClient.execute({
    sql: `INSERT OR IGNORE INTO app_settings (key, value) VALUES ('class_code', 'HOME-ENGLISH')`,
    args: []
  });
  await activeClient.execute({
    sql: `INSERT OR IGNORE INTO app_settings (key, value) VALUES ('class_name', 'Home Academy - English Language Program')`,
    args: []
  });
  await activeClient.execute({
    sql: `INSERT OR IGNORE INTO app_settings (key, value) VALUES ('teacher_name', 'Sir Zubair')`,
    args: []
  });

  // 2. Seed Achievements
  for (const a of ACHIEVEMENTS) {
    await activeClient.execute({
      sql: `INSERT OR IGNORE INTO achievements (achievement_id, title, description, xp_reward, type, requirement) VALUES (?, ?, ?, ?, ?, ?)`,
      args: [a.id, a.title, a.description, a.xpReward || 25, a.type || 'general', a.requirement || 1]
    });
  }

  // 3. Seed Curriculum Topics & Quizzes
  for (const topic of OFFICIAL_TOPICS) {
    await activeClient.execute({
      sql: `INSERT OR IGNORE INTO curriculum_topics (topic_id, number, title, subtitle, summary, color, active, data_json) VALUES (?, ?, ?, ?, ?, ?, 1, ?)`,
      args: [topic.id, topic.number, topic.title, topic.subtitle || '', topic.summary || '', topic.color || '#0A2558', JSON.stringify(topic)]
    });
    await activeClient.execute({
      sql: `INSERT OR IGNORE INTO quizzes (quiz_id, topic_id, title, total_questions, pass_percentage) VALUES (?, ?, ?, 5, 80)`,
      args: [`quiz_${topic.id}`, topic.id, `${topic.title} Mastery Quiz`]
    });
  }

  // 4. Seed Questions Database (90 real curriculum questions)
  for (const [topicId, qList] of Object.entries(TOPIC_QUESTION_BANKS)) {
    for (const q of qList) {
      await activeClient.execute({
        sql: `INSERT OR IGNORE INTO questions (question_id, topic_id, question, question_type, options_json, correct_answer, explanation, difficulty, xp_reward, active) VALUES (?, ?, ?, ?, ?, ?, ?, 'easy', 10, 1)`,
        args: [q.id, topicId, q.question, q.type || 'mcq', JSON.stringify(q.options || []), q.answer !== undefined ? q.answer : 0, q.explanation || '']
      });
    }
  }

  // 5. Seed Roleplays (5 official roleplay presentations)
  for (const rp of OFFICIAL_ROLEPLAYS) {
    await activeClient.execute({
      sql: `INSERT OR IGNORE INTO roleplays (roleplay_id, roleplay_number, title, scenario, grammar_focus, spoken_expressions_json, vocabulary_json, practice_questions_json, difficulty, color, active, data_json) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'beginner', ?, 1, ?)`,
      args: [
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
      ]
    });
  }
}

// --------------------------------------------------------------------------
// STUDENT REPOSITORY OPERATIONS
// --------------------------------------------------------------------------
export async function createStudent({ id, name, email, passwordHash, passwordSalt, avatar, classCode }) {
  const activeClient = getClient();
  const cleanEmail = email.trim().toLowerCase();
  const cleanName = name.trim();
  const studentId = id || ('ha_stu_' + Date.now() + '_' + crypto.randomBytes(4).toString('hex'));
  const userId = 'usr_' + crypto.randomBytes(8).toString('hex');
  const joinDate = new Date().toISOString().split('T')[0];

  const classRes = await activeClient.execute({
    sql: 'SELECT class_id, code FROM classes WHERE code = ? COLLATE NOCASE',
    args: [(classCode || 'HOME-ENGLISH').trim()]
  });
  const classRow = classRes.rows[0];
  if (!classRow) {
    throw new Error('Invalid class code. Please check with your teacher.');
  }

  const topicsRes = await activeClient.execute('SELECT topic_id FROM curriculum_topics WHERE active = 1');
  const activeTopicIds = topicsRes.rows.map(t => t.topic_id);

  const notifId = 'notif_' + Date.now() + '_' + crypto.randomBytes(3).toString('hex');
  const notifData = JSON.stringify({ name: cleanName, email: cleanEmail, joinDate, avatar: avatar || '🦁' });

  // Atomic batch execution
  const batchStatements = [
    {
      sql: `INSERT INTO users (user_id, role, email, password_hash, password_salt) VALUES (?, 'student', ?, ?, ?)`,
      args: [userId, cleanEmail, passwordHash, passwordSalt || 'bcrypt']
    },
    {
      sql: `INSERT INTO students (student_id, user_id, full_name, email, class_id, avatar, join_date, xp, level, streak, activities_completed, overall_progress, roleplay_progress)
            VALUES (?, ?, ?, ?, ?, ?, ?, 0, 1, 0, 0, 0, 0)`,
      args: [studentId, userId, cleanName, cleanEmail, classRow.class_id, avatar || '🦁', joinDate]
    },
    {
      sql: `INSERT INTO streaks (student_id, current_streak, highest_streak, last_activity_date) VALUES (?, 0, 0, ?)`,
      args: [studentId, joinDate]
    },
    ...activeTopicIds.map(topicId => ({
      sql: `INSERT INTO student_progress (student_id, topic_id, progress_percentage, learned, practice_count, quiz_score, passed) VALUES (?, ?, 0, 0, 0, 0, 0)`,
      args: [studentId, topicId]
    })),
    {
      sql: `INSERT OR IGNORE INTO student_achievements (student_id, achievement_id) VALUES (?, 'first_join')`,
      args: [studentId]
    },
    {
      sql: `INSERT INTO notifications (notification_id, recipient_role, student_id, title, message, type, data_json)
            VALUES (?, 'teacher', ?, 'New Student Joined', ?, 'new_student', ?)`,
      args: [notifId, studentId, `${cleanName} successfully enrolled in Home Academy!`, notifData]
    }
  ];

  await activeClient.batch(batchStatements, 'write');
  return getStudentById(studentId);
}

export async function getStudentByEmail(email) {
  if (!email) return null;
  const activeClient = getClient();
  const res = await activeClient.execute({
    sql: `SELECT * FROM students WHERE email = ? COLLATE NOCASE`,
    args: [email.trim().toLowerCase()]
  });
  if (res.rows.length === 0) return null;
  return formatStudentEntity(res.rows[0]);
}

export async function getStudentById(id) {
  if (!id) return null;
  const activeClient = getClient();
  const res = await activeClient.execute({
    sql: `SELECT * FROM students WHERE student_id = ?`,
    args: [id]
  });
  if (res.rows.length === 0) return null;
  return formatStudentEntity(res.rows[0]);
}

export async function verifyStudentCredentials(email, password) {
  if (!email || !password) return null;
  const activeClient = getClient();
  const res = await activeClient.execute({
    sql: `SELECT * FROM users WHERE email = ? COLLATE NOCASE AND role = 'student'`,
    args: [email.trim().toLowerCase()]
  });
  const user = res.rows[0];
  if (!user) return null;

  const isValid = verifyPasswordServer(password, user.password_hash, user.password_salt);
  if (!isValid) return null;

  // Upgrade legacy hash to bcrypt if needed
  if (!user.password_hash.startsWith('$2a$') && !user.password_hash.startsWith('$2b$')) {
    const newHash = hashPasswordServer(password);
    await activeClient.execute({
      sql: `UPDATE users SET password_hash = ?, password_salt = 'bcrypt' WHERE user_id = ?`,
      args: [newHash, user.user_id]
    });
  }

  await activeClient.execute({
    sql: `UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE user_id = ?`,
    args: [user.user_id]
  });

  const stuRes = await activeClient.execute({
    sql: `SELECT * FROM students WHERE user_id = ?`,
    args: [user.user_id]
  });
  return stuRes.rows[0] ? formatStudentEntity(stuRes.rows[0]) : null;
}

export async function getAllStudents() {
  const activeClient = getClient();
  const res = await activeClient.execute(`SELECT * FROM students ORDER BY xp DESC, level DESC`);
  return Promise.all(res.rows.map(formatStudentEntity));
}

export async function deleteStudentById(studentId) {
  const activeClient = getClient();
  const res = await activeClient.execute({
    sql: 'SELECT user_id FROM students WHERE student_id = ?',
    args: [studentId]
  });
  const student = res.rows[0];
  if (!student) return false;
  await activeClient.execute({
    sql: 'DELETE FROM users WHERE user_id = ?',
    args: [student.user_id]
  });
  return true;
}

async function formatStudentEntity(row) {
  if (!row) return null;
  const activeClient = getClient();

  const [progressRes, rpRes, achRes, quizStatsRes, gamesCountRes] = await Promise.all([
    activeClient.execute({ sql: `SELECT * FROM student_progress WHERE student_id = ?`, args: [row.student_id] }),
    activeClient.execute({ sql: `SELECT * FROM roleplay_attempts WHERE student_id = ?`, args: [row.student_id] }),
    activeClient.execute({ sql: `SELECT achievement_id FROM student_achievements WHERE student_id = ?`, args: [row.student_id] }),
    activeClient.execute({
      sql: `SELECT COUNT(*) as taken, COALESCE(SUM(correct_answers), 0) as correct, COALESCE(SUM(total_questions), 0) as total FROM quiz_attempts WHERE student_id = ?`,
      args: [row.student_id]
    }),
    activeClient.execute({ sql: `SELECT COUNT(*) as count FROM activity_attempts WHERE student_id = ?`, args: [row.student_id] })
  ]);

  const topicProgress = {};
  for (const p of progressRes.rows) {
    topicProgress[p.topic_id] = {
      learned: Boolean(p.learned),
      practiceCount: Number(p.practice_count || 0),
      quizScore: Number(p.quiz_score || 0),
      passed: Boolean(p.passed),
      completedAt: p.completed_at
    };
  }

  const roleplayProgress = {};
  for (const r of rpRes.rows) {
    roleplayProgress[r.roleplay_id] = {
      started: Boolean(r.started),
      completed: Boolean(r.completed),
      percent: Number(r.progress_percentage || 0),
      score: Number(r.score || 0),
      speakingScore: Number(r.speaking_score || 0),
      completedAt: r.completed_at
    };
  }

  const unlockedAchievements = achRes.rows.map(a => a.achievement_id);
  const quizStats = quizStatsRes.rows[0] || { taken: 0, correct: 0, total: 0 };
  const gamesCount = Number(gamesCountRes.rows[0]?.count || 0);
  const levelData = calculateLevel(row.xp || 0);

  const numCorrect = Number(quizStats.correct || 0);
  const numTotal = Number(quizStats.total || 0);
  const numTaken = Number(quizStats.taken || 0);

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
    xp: Number(row.xp || 0),
    streak: Number(row.streak || 0),
    activitiesCompleted: Number(row.activities_completed || 0),
    overallProgress: Number(row.overall_progress || 0),
    roleplayProgressPercent: Number(row.roleplay_progress || 0),
    joinDate: row.join_date,
    joinedAt: row.created_at,
    topicProgress,
    roleplayProgress,
    unlockedAchievements,
    stats: {
      quizzesTaken: numTaken,
      correctAnswers: numCorrect,
      totalQuestions: numTotal,
      topicsCompleted: progressRes.rows.filter(p => p.passed).length,
      gamesPlayed: gamesCount,
      accuracy: numTotal > 0 ? Math.round((numCorrect / numTotal) * 100) : 0
    }
  };
}

// --------------------------------------------------------------------------
// DETAILED STUDENT PROFILE / DOSSIER
// --------------------------------------------------------------------------
export async function getStudentDetailedProfile(studentId) {
  const student = await getStudentById(studentId);
  if (!student) return null;
  const activeClient = getClient();

  const [quizRes, actRes, rpRes, xpRes, streakRes] = await Promise.all([
    activeClient.execute({ sql: `SELECT * FROM quiz_attempts WHERE student_id = ? ORDER BY completed_at DESC`, args: [studentId] }),
    activeClient.execute({ sql: `SELECT * FROM activity_attempts WHERE student_id = ? ORDER BY completed_at DESC`, args: [studentId] }),
    activeClient.execute({
      sql: `SELECT r.*, rp.title as roleplay_title, rp.roleplay_number
            FROM roleplay_attempts r
            LEFT JOIN roleplays rp ON r.roleplay_id = rp.roleplay_id
            WHERE r.student_id = ? ORDER BY r.completed_at DESC`,
      args: [studentId]
    }),
    activeClient.execute({ sql: `SELECT * FROM xp_transactions WHERE student_id = ? ORDER BY created_at DESC LIMIT 50`, args: [studentId] }),
    activeClient.execute({ sql: `SELECT * FROM streaks WHERE student_id = ?`, args: [studentId] })
  ]);

  const streakData = streakRes.rows[0] || { current_streak: 0, highest_streak: 0, last_activity_date: null };

  return {
    student,
    streak: streakData,
    quizHistory: quizRes.rows,
    activityHistory: actRes.rows,
    roleplayHistory: rpRes.rows,
    xpLedger: xpRes.rows
  };
}

// --------------------------------------------------------------------------
// SERVER-SIDE XP TRANSACTIONS & LEVELING
// --------------------------------------------------------------------------
export async function awardXP({ studentId, amount, source, activityId = null, idempotencyKey = null }) {
  if (amount <= 0) return { student: await getStudentById(studentId), xpAwarded: 0 };
  const activeClient = getClient();

  if (idempotencyKey) {
    const existing = await activeClient.execute({
      sql: `SELECT transaction_id FROM xp_transactions WHERE idempotency_key = ?`,
      args: [idempotencyKey]
    });
    if (existing.rows.length > 0) {
      return { student: await getStudentById(studentId), xpAwarded: 0, duplicate: true };
    }
  }

  const studentRes = await activeClient.execute({
    sql: `SELECT * FROM students WHERE student_id = ?`,
    args: [studentId]
  });
  const student = studentRes.rows[0];
  if (!student) throw new Error('Student not found for XP award');

  const newXP = Number(student.xp || 0) + amount;
  const levelInfo = calculateLevel(newXP);

  const today = new Date().toISOString().split('T')[0];
  let newStreak = Number(student.streak || 0);
  const streakRes = await activeClient.execute({
    sql: `SELECT * FROM streaks WHERE student_id = ?`,
    args: [studentId]
  });
  const streakRow = streakRes.rows[0];

  const batch = [];
  if (streakRow) {
    if (streakRow.last_activity_date !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      if (streakRow.last_activity_date === yesterday) {
        newStreak = Number(streakRow.current_streak || 0) + 1;
      } else if (!streakRow.last_activity_date) {
        newStreak = 1;
      }
      const highest = Math.max(Number(streakRow.highest_streak || 0), newStreak);
      batch.push({
        sql: `UPDATE streaks SET current_streak = ?, highest_streak = ?, last_activity_date = ?, updated_at = CURRENT_TIMESTAMP WHERE student_id = ?`,
        args: [newStreak, highest, today, studentId]
      });
    }
  }

  batch.push({
    sql: `UPDATE students SET xp = ?, level = ?, streak = ?, updated_at = CURRENT_TIMESTAMP WHERE student_id = ?`,
    args: [newXP, levelInfo.level, newStreak, studentId]
  });

  const txId = 'tx_' + Date.now() + '_' + crypto.randomBytes(3).toString('hex');
  batch.push({
    sql: `INSERT INTO xp_transactions (transaction_id, student_id, activity_id, source, amount, idempotency_key) VALUES (?, ?, ?, ?, ?, ?)`,
    args: [txId, studentId, activityId, source, amount, idempotencyKey]
  });

  if (newXP >= 500) {
    batch.push({
      sql: `INSERT OR IGNORE INTO student_achievements (student_id, achievement_id) VALUES (?, 'xp_500')`,
      args: [studentId]
    });
  }
  if (newStreak >= 3) {
    batch.push({
      sql: `INSERT OR IGNORE INTO student_achievements (student_id, achievement_id) VALUES (?, 'streak_3')`,
      args: [studentId]
    });
  }
  if (newStreak >= 7) {
    batch.push({
      sql: `INSERT OR IGNORE INTO student_achievements (student_id, achievement_id) VALUES (?, 'streak_7')`,
      args: [studentId]
    });
  }

  await activeClient.batch(batch, 'write');
  return { student: await getStudentById(studentId), xpAwarded: amount, newXP, newLevel: levelInfo.level, levelTitle: levelInfo.title };
}

// --------------------------------------------------------------------------
// QUIZ ATTEMPTS & PROGRESS (SERVER-VALIDATED)
// --------------------------------------------------------------------------
export async function recordQuizSubmission({ studentId, topicId, submissionToken, score, totalQuestions, correctAnswers, incorrectAnswers, percentage }) {
  const activeClient = getClient();
  const existing = await activeClient.execute({
    sql: `SELECT attempt_id FROM quiz_attempts WHERE submission_token = ?`,
    args: [submissionToken]
  });
  if (existing.rows.length > 0) {
    return { duplicate: true, student: await getStudentById(studentId), xpEarned: 0 };
  }

  const passed = percentage >= 80 ? 1 : 0;
  const isPerfect = percentage >= 100;

  let xpReward = 0;
  const prevProgressRes = await activeClient.execute({
    sql: `SELECT passed FROM student_progress WHERE student_id = ? AND topic_id = ?`,
    args: [studentId, topicId]
  });
  const prevProgress = prevProgressRes.rows[0];
  const isFirstPass = passed && (!prevProgress || !prevProgress.passed);

  if (isPerfect) {
    xpReward = 50;
  } else if (passed) {
    xpReward = isFirstPass ? 25 : 10;
  }

  const attemptId = 'qatt_' + Date.now() + '_' + crypto.randomBytes(4).toString('hex');
  const nowIso = new Date().toISOString();

  const batch = [
    {
      sql: `INSERT OR IGNORE INTO quizzes (quiz_id, topic_id, title, total_questions, pass_percentage) VALUES (?, ?, ?, ?, 80)`,
      args: [`quiz_${topicId}`, topicId, `${topicId} Mastery Quiz`, totalQuestions || 5]
    },
    {
      sql: `INSERT INTO quiz_attempts (attempt_id, student_id, quiz_id, topic_id, submission_token, score, total_questions, correct_answers, incorrect_answers, percentage, passed, xp_earned)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [attemptId, studentId, `quiz_${topicId}`, topicId, submissionToken, score, totalQuestions, correctAnswers, incorrectAnswers, percentage, passed, xpReward]
    },
    {
      sql: `INSERT INTO student_progress (student_id, topic_id, progress_percentage, quiz_score, passed, completed_at)
            VALUES (?, ?, ?, ?, ?, ?)
            ON CONFLICT(student_id, topic_id) DO UPDATE SET
              quiz_score = MAX(quiz_score, excluded.quiz_score),
              progress_percentage = MAX(progress_percentage, excluded.progress_percentage),
              passed = MAX(passed, excluded.passed),
              completed_at = CASE WHEN excluded.passed = 1 AND (passed IS NULL OR passed = 0) THEN excluded.completed_at ELSE completed_at END,
              updated_at = CURRENT_TIMESTAMP`,
      args: [studentId, topicId, percentage, percentage, passed, passed ? nowIso : null]
    }
  ];

  if (isPerfect) {
    batch.push({
      sql: `INSERT OR IGNORE INTO student_achievements (student_id, achievement_id) VALUES (?, 'perfect_quiz')`,
      args: [studentId]
    });
  }

  await activeClient.batch(batch, 'write');

  if (xpReward > 0) {
    await awardXP({
      studentId,
      amount: xpReward,
      source: isPerfect ? `perfect_quiz_${topicId}` : `quiz_pass_${topicId}`,
      activityId: `quiz_${topicId}`,
      idempotencyKey: `xp_qatt_${submissionToken}`
    });
  }

  return { student: await getStudentById(studentId), passed: Boolean(passed), percentage, xpEarned: xpReward, isFirstPass };
}

export async function recordTopicQuiz({ studentId, topicId, submissionToken, score = 5, total = 5, percent = 100, correctAnswers, incorrectAnswers }) {
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

export async function recordFullGrammarTest({ studentId, submissionToken, score = 24, total = 30, percent = 80, topicBreakdown = {} }) {
  const activeClient = getClient();
  const existing = await activeClient.execute({
    sql: `SELECT attempt_id FROM quiz_attempts WHERE submission_token = ?`,
    args: [submissionToken]
  });
  if (existing.rows.length > 0) {
    return { duplicate: true, student: await getStudentById(studentId), xpEarned: 0 };
  }

  const passed = percent >= 80 ? 1 : 0;
  const isPerfect = percent >= 100;
  const xpEarned = isPerfect ? 150 : (passed ? 125 : 50);
  const attemptId = 'ftatt_' + Date.now() + '_' + crypto.randomBytes(4).toString('hex');

  const batch = [
    {
      sql: `INSERT OR IGNORE INTO quizzes (quiz_id, topic_id, title, total_questions, pass_percentage) VALUES ('quiz_full_grammar', 'adjectives', 'Full Grammar Grand Test', ?, 80)`,
      args: [total || 30]
    },
    {
      sql: `INSERT INTO quiz_attempts (attempt_id, student_id, quiz_id, topic_id, submission_token, score, total_questions, correct_answers, incorrect_answers, percentage, passed, xp_earned)
            VALUES (?, ?, 'quiz_full_grammar', 'full_grammar', ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [attemptId, studentId, submissionToken, score, total, score, Math.max(0, total - score), percent, passed, xpEarned]
    }
  ];

  await activeClient.batch(batch, 'write');

  await awardXP({
    studentId,
    amount: xpEarned,
    source: isPerfect ? 'perfect_full_grammar_test' : 'full_grammar_test_pass',
    activityId: 'quiz_full_grammar',
    idempotencyKey: `xp_${submissionToken}`
  });

  return { student: await getStudentById(studentId), passed: Boolean(passed), percent, xpEarned };
}

// --------------------------------------------------------------------------
// TOPIC PRACTICE & ACTIVITIES
// --------------------------------------------------------------------------
export async function recordTopicPractice(studentId, topicId, count = 1) {
  const activeClient = getClient();
  await activeClient.execute({
    sql: `INSERT INTO student_progress (student_id, topic_id, practice_count)
          VALUES (?, ?, ?)
          ON CONFLICT(student_id, topic_id) DO UPDATE SET practice_count = practice_count + ?, updated_at = CURRENT_TIMESTAMP`,
    args: [studentId, topicId, count, count]
  });

  return awardXP({
    studentId,
    amount: 25,
    source: `practice_${topicId}`,
    activityId: `practice_${topicId}`
  });
}

export async function recordTopicLearn(studentId, topicId) {
  const activeClient = getClient();
  const existingRes = await activeClient.execute({
    sql: `SELECT learned FROM student_progress WHERE student_id = ? AND topic_id = ?`,
    args: [studentId, topicId]
  });
  const existing = existingRes.rows[0];

  if (!existing || !existing.learned) {
    await activeClient.execute({
      sql: `INSERT INTO student_progress (student_id, topic_id, learned)
            VALUES (?, ?, 1)
            ON CONFLICT(student_id, topic_id) DO UPDATE SET learned = 1, updated_at = CURRENT_TIMESTAMP`,
      args: [studentId, topicId]
    });

    return awardXP({
      studentId,
      amount: 10,
      source: `learn_${topicId}`,
      activityId: `learn_${topicId}`,
      idempotencyKey: `learn_${studentId}_${topicId}`
    });
  }
  return { student: await getStudentById(studentId), xpAwarded: 0 };
}

export async function recordActivityCompletion({ studentId, topicId, activityType, score = 100, xpReward = 25, idempotencyKey = null }) {
  const activeClient = getClient();
  const idempKey = idempotencyKey || `act_${studentId}_${topicId}_${activityType}`;
  const existing = await activeClient.execute({
    sql: `SELECT attempt_id FROM activity_attempts WHERE idempotency_key = ?`,
    args: [idempKey]
  });
  if (existing.rows.length > 0) {
    return { duplicate: true, student: await getStudentById(studentId), xpAwarded: 0 };
  }

  const attemptId = 'aatt_' + Date.now() + '_' + crypto.randomBytes(4).toString('hex');
  const batch = [
    {
      sql: `INSERT INTO activity_attempts (attempt_id, student_id, activity_id, topic_id, activity_type, score, correct_answers, xp_earned, idempotency_key)
            VALUES (?, ?, ?, ?, ?, ?, 1, ?, ?)`,
      args: [attemptId, studentId, `act_${topicId}_${activityType}`, topicId, activityType, score, xpReward, idempKey]
    },
    {
      sql: `UPDATE students SET activities_completed = activities_completed + 1 WHERE student_id = ?`,
      args: [studentId]
    }
  ];

  await activeClient.batch(batch, 'write');

  await awardXP({
    studentId,
    amount: xpReward,
    source: `activity_${topicId}_${activityType}`,
    activityId: `act_${topicId}_${activityType}`,
    idempotencyKey: `xp_${idempKey}`
  });

  return { student: await getStudentById(studentId), xpAwarded: xpReward, completed: true };
}

// --------------------------------------------------------------------------
// ROLEPLAY PRESENTATION PROGRESS
// --------------------------------------------------------------------------
export async function recordRoleplayAttempt({ studentId, roleplayId, score = 100, speakingScore = 100, percent = 100 }) {
  const activeClient = getClient();
  if (typeof roleplayId === 'string' && roleplayId.match(/^rp_\d$/)) {
    roleplayId = roleplayId.replace(/^rp_(\d)$/, 'rp_0$1');
  }

  const completed = percent >= 80 ? 1 : 0;
  const isPerfect = percent >= 100;
  const xpEarned = isPerfect ? 50 : (completed ? 25 : 10);

  const existingRes = await activeClient.execute({
    sql: `SELECT attempt_id, completed FROM roleplay_attempts WHERE student_id = ? AND roleplay_id = ?`,
    args: [studentId, roleplayId]
  });
  const existing = existingRes.rows[0];
  const isFirstCompletion = completed && (!existing || !existing.completed);
  const attemptId = existing ? existing.attempt_id : ('rpatt_' + Date.now() + '_' + crypto.randomBytes(4).toString('hex'));
  const nowIso = new Date().toISOString();

  await activeClient.execute({
    sql: `INSERT INTO roleplay_attempts (attempt_id, student_id, roleplay_id, started, completed, score, speaking_score, xp_earned, progress_percentage, completed_at)
          VALUES (?, ?, ?, 1, ?, ?, ?, ?, ?, ?)
          ON CONFLICT(attempt_id) DO UPDATE SET
            completed = MAX(completed, excluded.completed),
            score = MAX(score, excluded.score),
            progress_percentage = MAX(progress_percentage, excluded.progress_percentage),
            completed_at = CASE WHEN excluded.completed = 1 AND (completed IS NULL OR completed = 0) THEN excluded.completed_at ELSE completed_at END`,
    args: [attemptId, studentId, roleplayId, completed, score, speakingScore, xpEarned, percent, completed ? nowIso : null]
  });

  if (isFirstCompletion) {
    await awardXP({
      studentId,
      amount: xpEarned,
      source: isPerfect ? `perfect_roleplay_${roleplayId}` : `complete_roleplay_${roleplayId}`,
      activityId: roleplayId,
      idempotencyKey: `rp_first_${studentId}_${roleplayId}`
    });

    const achId = roleplayId.replace('rp_0', 'roleplay_').replace('rp_', 'roleplay_') + '_complete';
    await activeClient.execute({
      sql: `INSERT OR IGNORE INTO student_achievements (student_id, achievement_id) VALUES (?, ?)`,
      args: [studentId, achId]
    });
  }

  const [totalRpsRes, completedRpsRes] = await Promise.all([
    activeClient.execute('SELECT COUNT(*) as count FROM roleplays WHERE active = 1'),
    activeClient.execute({ sql: 'SELECT COUNT(*) as count FROM roleplay_attempts WHERE student_id = ? AND completed = 1', args: [studentId] })
  ]);
  const totalRps = Number(totalRpsRes.rows[0]?.count || 5);
  const completedRps = Number(completedRpsRes.rows[0]?.count || 0);
  const overallRpPercent = Math.min(100, Math.round((completedRps / totalRps) * 100));

  await activeClient.execute({
    sql: `UPDATE students SET roleplay_progress = ? WHERE student_id = ?`,
    args: [overallRpPercent, studentId]
  });

  return { student: await getStudentById(studentId), completed: Boolean(completed), percent, xpEarned: isFirstCompletion ? xpEarned : 0 };
}

export async function recordRoleplayCompletion({ studentId, roleplayId, percent = 100, score = 100, speakingScore = 100 }) {
  return recordRoleplayAttempt({ studentId, roleplayId, score, speakingScore, percent });
}

// --------------------------------------------------------------------------
// QUESTIONS REPOSITORY
// --------------------------------------------------------------------------
export async function getQuestionsByTopic(topicId, limit = 10, randomize = true) {
  const activeClient = getClient();
  let query = 'SELECT * FROM questions WHERE topic_id = ? AND active = 1';
  if (randomize) query += ' ORDER BY RANDOM()';
  if (limit) query += ` LIMIT ${parseInt(limit, 10)}`;

  const res = await activeClient.execute({ sql: query, args: [topicId] });
  return res.rows.map(r => ({
    id: r.question_id,
    topicId: r.topic_id,
    question: r.question,
    type: r.question_type,
    options: JSON.parse(r.options_json || '[]'),
    answer: Number(r.correct_answer),
    explanation: r.explanation,
    difficulty: r.difficulty,
    xpReward: Number(r.xp_reward || 10)
  }));
}

export async function getAllQuestionsAdmin(topicId = null) {
  const activeClient = getClient();
  let query = 'SELECT * FROM questions';
  const args = [];
  if (topicId) {
    query += ' WHERE topic_id = ?';
    args.push(topicId);
  }
  query += ' ORDER BY topic_id ASC, created_at DESC';

  const res = await activeClient.execute({ sql: query, args });
  return res.rows.map(r => ({
    id: r.question_id,
    topicId: r.topic_id,
    question: r.question,
    type: r.question_type,
    options: JSON.parse(r.options_json || '[]'),
    answer: Number(r.correct_answer),
    explanation: r.explanation,
    difficulty: r.difficulty,
    xpReward: Number(r.xp_reward || 10),
    active: Boolean(r.active)
  }));
}

export async function createQuestion({ topicId, question, questionType = 'mcq', options, correctAnswer = 0, explanation = '', difficulty = 'easy', xpReward = 10 }) {
  const activeClient = getClient();
  const qId = 'q_' + Date.now() + '_' + crypto.randomBytes(3).toString('hex');
  await activeClient.execute({
    sql: `INSERT INTO questions (question_id, topic_id, question, question_type, options_json, correct_answer, explanation, difficulty, xp_reward, active)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1)`,
    args: [qId, topicId, question.trim(), questionType, JSON.stringify(options || []), correctAnswer, explanation.trim(), difficulty, xpReward]
  });
  return qId;
}

export async function updateQuestion(questionId, updates) {
  const activeClient = getClient();
  const res = await activeClient.execute({
    sql: `SELECT * FROM questions WHERE question_id = ?`,
    args: [questionId]
  });
  const current = res.rows[0];
  if (!current) throw new Error('Question not found');

  const question = updates.question !== undefined ? updates.question.trim() : current.question;
  const optionsJson = updates.options ? JSON.stringify(updates.options) : current.options_json;
  const correctAnswer = updates.correctAnswer !== undefined ? updates.correctAnswer : current.correct_answer;
  const explanation = updates.explanation !== undefined ? updates.explanation.trim() : current.explanation;
  const difficulty = updates.difficulty !== undefined ? updates.difficulty : current.difficulty;
  const active = updates.active !== undefined ? (updates.active ? 1 : 0) : current.active;

  await activeClient.execute({
    sql: `UPDATE questions SET question = ?, options_json = ?, correct_answer = ?, explanation = ?, difficulty = ?, active = ?, updated_at = CURRENT_TIMESTAMP WHERE question_id = ?`,
    args: [question, optionsJson, correctAnswer, explanation, difficulty, active, questionId]
  });
  return true;
}

export async function deleteQuestion(questionId) {
  const activeClient = getClient();
  return activeClient.execute({
    sql: `DELETE FROM questions WHERE question_id = ?`,
    args: [questionId]
  });
}

// --------------------------------------------------------------------------
// NOTIFICATIONS REPOSITORY
// --------------------------------------------------------------------------
export async function createNotification({ recipientRole = 'teacher', studentId = null, title, message, type, data = {} }) {
  const activeClient = getClient();
  const id = 'notif_' + Date.now() + '_' + crypto.randomBytes(3).toString('hex');
  await activeClient.execute({
    sql: `INSERT INTO notifications (notification_id, recipient_role, student_id, title, message, type, data_json) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    args: [id, recipientRole, studentId, title, message, type, JSON.stringify(data)]
  });
  return id;
}

export async function getNotifications(recipientRole = 'teacher', limit = 50) {
  const activeClient = getClient();
  const res = await activeClient.execute({
    sql: `SELECT * FROM notifications WHERE recipient_role = ? ORDER BY created_at DESC LIMIT ?`,
    args: [recipientRole, parseInt(limit, 10) || 50]
  });

  return res.rows.map(r => ({
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

export async function markNotificationsAsRead(recipientRole = 'teacher') {
  const activeClient = getClient();
  await activeClient.execute({
    sql: `UPDATE notifications SET is_read = 1 WHERE recipient_role = ?`,
    args: [recipientRole]
  });
  return true;
}

// --------------------------------------------------------------------------
// SESSIONS & AUTHENTICATION (TURSO CLOUD PERSISTENCE)
// --------------------------------------------------------------------------
export async function createSession(userId, studentId = null, role = 'student', expiryHours = 72, rememberMe = 0) {
  const activeClient = getClient();
  const token = 'ha_sess_' + crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + expiryHours * 3600000).toISOString();
  const remValue = rememberMe ? 1 : 0;
  await activeClient.execute({
    sql: `INSERT INTO sessions (token, user_id, student_id, role, expires_at, last_activity_at, remember_me) VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP, ?)`,
    args: [token, userId, studentId, role, expiresAt, remValue]
  });
  return token;
}

export async function createTeacherSession(userId, rememberMe = false) {
  const expiryHours = rememberMe ? 24 * 30 : 24; // 30 days vs 24 hours
  const token = await createSession(userId, null, 'teacher', expiryHours, rememberMe ? 1 : 0);
  const maxAgeSeconds = expiryHours * 3600;
  const expiresAt = new Date(Date.now() + maxAgeSeconds * 1000).toISOString();
  return { token, expiresAt, maxAgeSeconds, role: 'teacher' };
}

export async function getSession(token) {
  if (!token) return null;
  const activeClient = getClient();
  const res = await activeClient.execute({
    sql: `SELECT * FROM sessions WHERE token = ?`,
    args: [token]
  });
  const session = res.rows[0];
  if (!session) return null;

  // Check if session has been revoked
  if (session.revoked_at) {
    return null;
  }

  // Check expiration
  if (session.expires_at && new Date(session.expires_at) < new Date()) {
    await activeClient.execute({ sql: `DELETE FROM sessions WHERE token = ?`, args: [token] });
    return null;
  }

  // Throttled update of last_activity_at in background
  activeClient.execute({
    sql: `UPDATE sessions SET last_activity_at = CURRENT_TIMESTAMP WHERE token = ?`,
    args: [token]
  }).catch(() => {});

  return session;
}

export async function deleteSession(token) {
  if (!token) return;
  const activeClient = getClient();
  await activeClient.execute({
    sql: `DELETE FROM sessions WHERE token = ?`,
    args: [token]
  });
}

export async function revokeAllTeacherSessions(userId = null, exceptToken = null) {
  const activeClient = getClient();
  let sql = `DELETE FROM sessions WHERE role IN ('teacher', 'admin')`;
  const args = [];
  if (exceptToken) {
    sql += ` AND token != ?`;
    args.push(exceptToken);
  }
  await activeClient.execute({ sql, args });
  return true;
}

export async function verifyTeacherCredentials(identifier, password) {
  if (!password) return null;
  const activeClient = getClient();
  const cleanPass = password.trim();
  const masterPassword = process.env.INITIAL_ADMIN_PASSWORD || 'pakistan786';

  // Retrieve teacher accounts
  const res = await activeClient.execute(
    `SELECT u.user_id, u.role, u.email, u.password_hash, u.password_salt, t.name as teacher_name
     FROM users u
     LEFT JOIN teachers_admins t ON u.user_id = t.user_id
     WHERE u.role IN ('teacher', 'admin')`
  );

  let candidate = null;

  // 1. If an identifier was explicitly passed (and not just generic 'teacher' / 'admin')
  const idClean = (identifier || '').trim().toLowerCase();
  const isGeneric = !idClean || ['teacher', 'admin', 'zubair', 'sir zubair'].includes(idClean);

  if (!isGeneric && res.rows && res.rows.length > 0) {
    const specific = res.rows.find(r =>
      (r.email && r.email.toLowerCase() === idClean) ||
      (r.teacher_name && r.teacher_name.toLowerCase() === idClean) ||
      (r.user_id && r.user_id.toLowerCase() === idClean)
    );
    if (specific && verifyPasswordServer(cleanPass, specific.password_hash, specific.password_salt)) {
      candidate = specific;
    }
  }

  // 2. If not matched yet, check all teacher accounts against cleanPass
  if (!candidate && res.rows && res.rows.length > 0) {
    for (const r of res.rows) {
      if (verifyPasswordServer(cleanPass, r.password_hash, r.password_salt)) {
        candidate = r;
        break;
      }
    }
  }

  // 3. Self-healing fallback: If password entered matches the official master password 'pakistan786'
  if (!candidate && cleanPass === masterPassword) {
    const settingRes = await activeClient.execute(
      `SELECT value FROM app_settings WHERE key = 'custom_teacher_password'`
    ).catch(() => ({ rows: [] }));
    const isCustom = settingRes.rows?.[0]?.value === '1';

    if (!isCustom) {
      const adminHash = hashPasswordServer(cleanPass);
      const teacherUserId = 'usr_teacher_zubair';

      // Synchronize or insert usr_teacher_zubair in users table
      try {
        await activeClient.execute({
          sql: `INSERT INTO users (user_id, role, email, password_hash, password_salt)
                VALUES (?, 'teacher', 'teacher@homeacademy.com', ?, 'bcrypt')
                ON CONFLICT(user_id) DO UPDATE SET password_hash = excluded.password_hash, password_salt = 'bcrypt'`,
          args: [teacherUserId, adminHash]
        });
      } catch (e) {
        await activeClient.execute({
          sql: `UPDATE users SET password_hash = ?, password_salt = 'bcrypt' WHERE role IN ('teacher', 'admin')`,
          args: [adminHash]
        }).catch(() => {});
      }

      try {
        await activeClient.execute({
          sql: `INSERT OR IGNORE INTO teachers_admins (teacher_id, user_id, name, email) VALUES ('tch_zubair', ?, 'Sir Zubair', 'teacher@homeacademy.com')`,
          args: [teacherUserId]
        });
      } catch (e) {}

      candidate = {
        user_id: teacherUserId,
        role: 'teacher',
        email: 'teacher@homeacademy.com',
        teacher_name: 'Sir Zubair'
      };
    }
  }

  if (!candidate) return null;

  // Update last_login timestamp
  activeClient.execute({
    sql: `UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE user_id = ?`,
    args: [candidate.user_id]
  }).catch(() => {});

  return {
    userId: candidate.user_id,
    role: candidate.role,
    email: candidate.email,
    name: candidate.teacher_name || 'Sir Zubair'
  };
}

export async function verifyTeacherPassword(password) {
  const creds = await verifyTeacherCredentials(null, password);
  return Boolean(creds);
}

export async function updateTeacherPassword(newPassword, currentPassword = null) {
  if (!newPassword || newPassword.length < 6) {
    throw new Error('New teacher password must be at least 6 characters long.');
  }

  const activeClient = getClient();
  if (currentPassword) {
    const valid = await verifyTeacherPassword(currentPassword);
    if (!valid) {
      throw new Error('Current password is incorrect.');
    }
  }

  const hash = hashPasswordServer(newPassword);
  await activeClient.batch([
    {
      sql: `UPDATE users SET password_salt = 'bcrypt', password_hash = ? WHERE role IN ('teacher', 'admin')`,
      args: [hash]
    },
    {
      sql: `INSERT INTO app_settings (key, value) VALUES ('custom_teacher_password', ?)
            ON CONFLICT(key) DO UPDATE SET value = excluded.value`,
      args: [newPassword === 'pakistan786' ? '0' : '1']
    },
    {
      sql: `DELETE FROM sessions WHERE role IN ('teacher', 'admin')`,
      args: []
    }
  ], 'write');
  return true;
}

export async function cleanProductionDatabase() {
  const activeClient = getClient();
  const statements = [
    'DELETE FROM sessions;',
    'DELETE FROM student_achievements;',
    'DELETE FROM student_progress;',
    'DELETE FROM quiz_attempts;',
    'DELETE FROM activity_attempts;',
    'DELETE FROM roleplay_attempts;',
    'DELETE FROM streaks;',
    'DELETE FROM xp_transactions;',
    'DELETE FROM notifications WHERE student_id IS NOT NULL;',
    'DELETE FROM students;',
    "DELETE FROM users WHERE role = 'student';"
  ];
  for (const s of statements) {
    await activeClient.execute(s);
  }
  return true;
}

// --------------------------------------------------------------------------
// LEADERBOARD (REAL RECORDS ONLY, NO FAKE DATA)
// --------------------------------------------------------------------------
export async function getLeaderboard(limit = 50) {
  const activeClient = getClient();
  const res = await activeClient.execute({
    sql: `SELECT student_id, full_name, avatar, level, xp, streak, join_date FROM students ORDER BY xp DESC, level DESC LIMIT ?`,
    args: [parseInt(limit, 10) || 50]
  });

  return res.rows.map((r, idx) => {
    const levelInfo = calculateLevel(r.xp || 0);
    return {
      rank: idx + 1,
      id: r.student_id,
      studentId: r.student_id,
      name: r.full_name,
      avatar: r.avatar,
      level: levelInfo.level,
      levelTitle: levelInfo.title,
      xp: Number(r.xp || 0),
      streak: Number(r.streak || 0),
      joinedAt: r.join_date
    };
  });
}

// --------------------------------------------------------------------------
// CLASS SETTINGS
// --------------------------------------------------------------------------
export async function getClassSettings() {
  const activeClient = getClient();
  const [clsRes, teacherRes] = await Promise.all([
    activeClient.execute(`SELECT * FROM classes LIMIT 1`),
    activeClient.execute(`SELECT name FROM teachers_admins LIMIT 1`)
  ]);
  const cls = clsRes.rows[0];
  const teacher = teacherRes.rows[0];
  return {
    code: cls ? cls.code : 'HOME-ENGLISH',
    name: cls ? cls.name : 'Home Academy - English Language Program',
    teacher: teacher ? teacher.name : 'Sir Zubair'
  };
}

export async function updateClassSettings({ name, code, teacher }) {
  const activeClient = getClient();
  const batch = [];
  if (code) {
    batch.push(
      { sql: `UPDATE classes SET code = ?, updated_at = CURRENT_TIMESTAMP`, args: [code.trim().toUpperCase()] },
      { sql: `INSERT OR REPLACE INTO app_settings (key, value) VALUES ('class_code', ?)`, args: [code.trim().toUpperCase()] }
    );
  }
  if (name) {
    batch.push(
      { sql: `UPDATE classes SET name = ?, updated_at = CURRENT_TIMESTAMP`, args: [name.trim()] },
      { sql: `INSERT OR REPLACE INTO app_settings (key, value) VALUES ('class_name', ?)`, args: [name.trim()] }
    );
  }
  if (teacher) {
    batch.push(
      { sql: `UPDATE teachers_admins SET name = ?`, args: [teacher.trim()] },
      { sql: `INSERT OR REPLACE INTO app_settings (key, value) VALUES ('teacher_name', ?)`, args: [teacher.trim()] }
    );
  }
  if (batch.length > 0) {
    await activeClient.batch(batch, 'write');
  }
  return getClassSettings();
}

// --------------------------------------------------------------------------
// CURRICULUM & ROLEPLAYS GETTERS
// --------------------------------------------------------------------------
export async function getCurriculumTopics(includeInactive = false) {
  const activeClient = getClient();
  const sql = includeInactive
    ? `SELECT * FROM curriculum_topics ORDER BY CAST(number AS INTEGER) ASC`
    : `SELECT * FROM curriculum_topics WHERE active = 1 ORDER BY CAST(number AS INTEGER) ASC`;
  const res = await activeClient.execute(sql);

  return res.rows.map(r => {
    try {
      const parsed = JSON.parse(r.data_json || '{}');
      return { ...parsed, id: r.topic_id, topicId: r.topic_id, number: r.number, title: r.title, active: Boolean(r.active) };
    } catch (e) {
      return { id: r.topic_id, topicId: r.topic_id, number: r.number, title: r.title, active: Boolean(r.active) };
    }
  });
}

export async function toggleCurriculumTopic(topicId) {
  const activeClient = getClient();
  const res = await activeClient.execute({
    sql: `SELECT active FROM curriculum_topics WHERE topic_id = ?`,
    args: [topicId]
  });
  const topic = res.rows[0];
  if (!topic) throw new Error('Topic not found');
  const nextActive = topic.active === 1 ? 0 : 1;
  await activeClient.execute({
    sql: `UPDATE curriculum_topics SET active = ?, updated_at = CURRENT_TIMESTAMP WHERE topic_id = ?`,
    args: [nextActive, topicId]
  });
  return Boolean(nextActive);
}

export async function deleteCurriculumTopic(topicId) {
  const activeClient = getClient();
  await activeClient.execute({
    sql: `DELETE FROM curriculum_topics WHERE topic_id = ?`,
    args: [topicId]
  });
  return true;
}

export async function resetCurriculumTopics() {
  const activeClient = getClient();
  await activeClient.execute(`DELETE FROM curriculum_topics`);
  for (const topic of OFFICIAL_TOPICS) {
    await activeClient.execute({
      sql: `INSERT INTO curriculum_topics (topic_id, number, title, subtitle, summary, color, active, data_json) VALUES (?, ?, ?, ?, ?, ?, 1, ?)`,
      args: [topic.id, topic.number, topic.title, topic.subtitle || '', topic.summary || '', topic.color || '#0A2558', JSON.stringify(topic)]
    });
  }
  return getCurriculumTopics(true);
}

export async function getRoleplays(includeInactive = false) {
  const activeClient = getClient();
  const sql = includeInactive
    ? `SELECT * FROM roleplays ORDER BY CAST(roleplay_number AS INTEGER) ASC`
    : `SELECT * FROM roleplays WHERE active = 1 ORDER BY CAST(roleplay_number AS INTEGER) ASC`;
  const res = await activeClient.execute(sql);

  return res.rows.map(r => {
    try {
      const parsed = JSON.parse(r.data_json || '{}');
      return { ...parsed, id: r.roleplay_id, roleplayId: r.roleplay_id, number: r.roleplay_number, title: r.title, active: Boolean(r.active) };
    } catch (e) {
      return { id: r.roleplay_id, roleplayId: r.roleplay_id, number: r.roleplay_number, title: r.title, active: Boolean(r.active) };
    }
  });
}

export async function toggleRoleplayActive(roleplayId) {
  const activeClient = getClient();
  const res = await activeClient.execute({
    sql: `SELECT active FROM roleplays WHERE roleplay_id = ?`,
    args: [roleplayId]
  });
  const rp = res.rows[0];
  if (!rp) throw new Error('Roleplay presentation not found');
  const nextActive = rp.active === 1 ? 0 : 1;
  await activeClient.execute({
    sql: `UPDATE roleplays SET active = ?, updated_at = CURRENT_TIMESTAMP WHERE roleplay_id = ?`,
    args: [nextActive, roleplayId]
  });
  return Boolean(nextActive);
}

export async function updateRoleplay(roleplayId, updates) {
  const activeClient = getClient();
  const res = await activeClient.execute({
    sql: `SELECT data_json FROM roleplays WHERE roleplay_id = ?`,
    args: [roleplayId]
  });
  const rp = res.rows[0];
  if (!rp) throw new Error('Roleplay presentation not found');
  const parsed = JSON.parse(rp.data_json || '{}');
  const merged = { ...parsed, ...updates };

  await activeClient.execute({
    sql: `UPDATE roleplays SET title = ?, scenario = ?, data_json = ?, updated_at = CURRENT_TIMESTAMP WHERE roleplay_id = ?`,
    args: [merged.title, merged.scenario, JSON.stringify(merged), roleplayId]
  });

  return merged;
}

export async function deleteRoleplay(roleplayId) {
  const activeClient = getClient();
  await activeClient.execute({
    sql: `DELETE FROM roleplays WHERE roleplay_id = ?`,
    args: [roleplayId]
  });
  return true;
}

export async function resetRoleplays() {
  const activeClient = getClient();
  await activeClient.execute(`DELETE FROM roleplays`);
  for (const rp of OFFICIAL_ROLEPLAYS) {
    await activeClient.execute({
      sql: `INSERT INTO roleplays (roleplay_id, roleplay_number, title, scenario, grammar_focus, spoken_expressions_json, vocabulary_json, practice_questions_json, difficulty, color, active, data_json) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'beginner', ?, 1, ?)`,
      args: [
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
      ]
    });
  }
  return getRoleplays(true);
}

// --------------------------------------------------------------------------
// 20. STUDENT ↔ TEACHER CHAT BOX (MESSAGES)
// --------------------------------------------------------------------------
export async function createChatMessage({ senderRole = 'student', senderName, studentId = null, studentEmail = null, content }) {
  if (!content || !content.trim()) throw new Error('Message content cannot be empty.');
  const activeClient = getClient();
  const messageId = 'msg_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
  const cleanName = (senderName || 'Student').trim();
  const cleanContent = content.trim();

  await activeClient.execute({
    sql: `INSERT INTO messages (message_id, sender_role, sender_name, student_id, student_email, content, is_read)
          VALUES (?, ?, ?, ?, ?, ?, 0)`,
    args: [messageId, senderRole, cleanName, studentId, studentEmail, cleanContent]
  });

  return {
    messageId,
    senderRole,
    senderName: cleanName,
    studentId,
    studentEmail,
    content: cleanContent,
    replyText: null,
    replyAt: null,
    isRead: 0,
    createdAt: new Date().toISOString()
  };
}

export async function getChatMessages(limit = 60) {
  const activeClient = getClient();
  const res = await activeClient.execute({
    sql: `SELECT * FROM messages ORDER BY created_at ASC LIMIT ?`,
    args: [parseInt(limit, 10) || 60]
  });

  return res.rows.map(r => ({
    messageId: r.message_id,
    senderRole: r.sender_role,
    senderName: r.sender_name,
    studentId: r.student_id,
    studentEmail: r.student_email,
    content: r.content,
    replyText: r.reply_text,
    replyAt: r.reply_at,
    isRead: Number(r.is_read || 0),
    createdAt: r.created_at
  }));
}

export async function replyChatMessage(messageId, replyText) {
  if (!messageId || !replyText || !replyText.trim()) {
    throw new Error('Message ID and reply text are required.');
  }
  const activeClient = getClient();
  const now = new Date().toISOString();
  await activeClient.execute({
    sql: `UPDATE messages SET reply_text = ?, reply_at = ?, is_read = 1 WHERE message_id = ?`,
    args: [replyText.trim(), now, messageId]
  });
  return true;
}

export async function deleteChatMessage(messageId) {
  const activeClient = getClient();
  await activeClient.execute({
    sql: `DELETE FROM messages WHERE message_id = ?`,
    args: [messageId]
  });
  return true;
}
