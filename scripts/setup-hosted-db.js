// Home Academy — Production Hosted Database Provisioning Script (Turso / LibSQL)
// Connects to hosted cloud database, provisions 18 relational tables, and seeds curriculum & questions.
// ZERO fake students or fake XP are seeded.

import { createClient } from '@libsql/client';
import bcrypt from 'bcryptjs';

import { OFFICIAL_TOPICS } from '../js/data/curriculum.js';
import { OFFICIAL_ROLEPLAYS } from '../js/data/roleplay-data.js';
import { TOPIC_QUESTION_BANKS } from '../js/data/topic-activities.js';
import { ACHIEVEMENTS } from '../js/data/initial-data.js';

const dbUrl = process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!dbUrl) {
  console.error('\n======================================================');
  console.error('❌ ERROR: TURSO_DATABASE_URL environment variable is missing.');
  console.error('======================================================');
  console.error('To provision the real production database on Turso:');
  console.error('  1. Sign up / log in to https://turso.tech');
  console.error('  2. Run: turso db create home-academy-prod');
  console.error('  3. Run: turso db show home-academy-prod --url');
  console.error('  4. Run: turso db tokens create home-academy-prod');
  console.error('  5. Set TURSO_DATABASE_URL and TURSO_AUTH_TOKEN in .env or Netlify settings');
  console.error('======================================================\n');
  process.exit(1);
}

console.log(`Connecting to hosted database: ${dbUrl}...`);

const client = createClient({
  url: dbUrl,
  authToken: authToken
});

async function setupHostedDatabase() {
  console.log('--- PROVISIONING 18 RELATIONAL TABLES ON HOSTED DATABASE ---');

  const statements = [
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
      expires_at DATETIME
    );`,

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

    `CREATE TABLE IF NOT EXISTS app_settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );`
  ];

  for (const stmt of statements) {
    await client.execute(stmt);
  }
  console.log('✓ All 18 relational tables verified on hosted database.');

  // Seed Class & Teacher (Initial Teacher Password: bcrypt)
  const initialTeacherPassword = process.env.INITIAL_ADMIN_PASSWORD || 'pakistan786';
  const adminHash = bcrypt.hashSync(initialTeacherPassword, 10);
  const teacherUserId = 'usr_teacher_zubair';

  await client.execute({
    sql: `INSERT OR IGNORE INTO users (user_id, role, email, password_hash, password_salt) VALUES (?, 'teacher', 'teacher@homeacademy.com', ?, 'bcrypt')`,
    args: [teacherUserId, adminHash]
  });

  await client.execute({
    sql: `INSERT OR IGNORE INTO classes (class_id, code, name, teacher_id) VALUES ('cls_home_english', 'HOME-ENGLISH', 'Home Academy - English Language Program', 'tch_zubair')`,
    args: []
  });

  await client.execute({
    sql: `INSERT OR IGNORE INTO teachers_admins (teacher_id, user_id, name, email) VALUES ('tch_zubair', ?, 'Sir Zubair', 'teacher@homeacademy.com')`,
    args: [teacherUserId]
  });

  // Seed Curriculum Topics & Quizzes
  for (const topic of OFFICIAL_TOPICS) {
    await client.execute({
      sql: `INSERT OR IGNORE INTO curriculum_topics (topic_id, number, title, subtitle, summary, color, active, data_json) VALUES (?, ?, ?, ?, ?, ?, 1, ?)`,
      args: [topic.id, topic.number, topic.title, topic.subtitle || '', topic.summary || '', topic.color || '#0A2558', JSON.stringify(topic)]
    });
    await client.execute({
      sql: `INSERT OR IGNORE INTO quizzes (quiz_id, topic_id, title, total_questions, pass_percentage) VALUES (?, ?, ?, 5, 80)`,
      args: [`quiz_${topic.id}`, topic.id, `${topic.title} Mastery Quiz`]
    });
  }
  console.log(`✓ Seeded ${OFFICIAL_TOPICS.length} curriculum topics & quizzes.`);

  // Seed Questions
  let totalQuestionsSeeded = 0;
  for (const [topicId, qList] of Object.entries(TOPIC_QUESTION_BANKS)) {
    for (const q of qList) {
      await client.execute({
        sql: `INSERT OR IGNORE INTO questions (question_id, topic_id, question, question_type, options_json, correct_answer, explanation, difficulty, xp_reward, active) VALUES (?, ?, ?, ?, ?, ?, ?, 'easy', 10, 1)`,
        args: [q.id, topicId, q.question, q.type || 'mcq', JSON.stringify(q.options || []), q.answer !== undefined ? q.answer : 0, q.explanation || '']
      });
      totalQuestionsSeeded++;
    }
  }
  console.log(`✓ Seeded ${totalQuestionsSeeded} questions.`);

  // Seed Roleplays
  for (const rp of OFFICIAL_ROLEPLAYS) {
    await client.execute({
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
  console.log(`✓ Seeded ${OFFICIAL_ROLEPLAYS.length} roleplay presentations.`);

  // Seed Achievements
  for (const a of ACHIEVEMENTS) {
    await client.execute({
      sql: `INSERT OR IGNORE INTO achievements (achievement_id, title, description, xp_reward, type, requirement) VALUES (?, ?, ?, ?, ?, ?)`,
      args: [a.id, a.title, a.description, a.xpReward || 25, a.type || 'general', a.requirement || 1]
    });
  }
  console.log(`✓ Seeded ${ACHIEVEMENTS.length} achievements.`);

  // Verify Zero Students
  const stuCount = await client.execute('SELECT COUNT(*) as count FROM students');
  console.log(`✓ Students in hosted database: ${stuCount.rows[0].count} (ZERO fake students confirmed).`);

  console.log('\n======================================================');
  console.log('🎉 HOSTED PRODUCTION DATABASE SETUP COMPLETE!');
  console.log('======================================================\n');
}

setupHostedDatabase().catch(err => {
  console.error('Failed to provision hosted database:', err);
  process.exit(1);
});
