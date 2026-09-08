// Test Suite: 18-Entity Relational Database Schema & Integrity
import assert from 'assert';
import * as db from './data/db.js';

async function testRelationalSchema() {
  console.log('--- STARTING 18-ENTITY RELATIONAL DATABASE TEST ---');

  // 1. Verify all 18 tables exist in SQLite master
  const tables = db.db.prepare(`
    SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'
  `).all().map(t => t.name);

  console.log('Detected database tables:', tables);

  const requiredTables = [
    'users',
    'students',
    'teachers_admins',
    'classes',
    'curriculum_topics',
    'questions',
    'quizzes',
    'quiz_attempts',
    'activities',
    'activity_attempts',
    'roleplays',
    'roleplay_attempts',
    'achievements',
    'student_achievements',
    'student_progress',
    'xp_transactions',
    'streaks',
    'notifications',
    'app_settings'
  ];

  requiredTables.forEach(tbl => {
    assert.ok(tables.includes(tbl), `Table "${tbl}" must exist in the database`);
    console.log(`✓ Table confirmed: ${tbl}`);
  });

  // 2. Verify questions table seeded with real curriculum questions
  const qCount = db.db.prepare('SELECT COUNT(*) as cnt FROM questions').get().cnt;
  console.log(`✓ Questions in database: ${qCount}`);
  assert.ok(qCount >= 90, 'Database must contain at least 90 curriculum questions');

  // 3. Verify class code and teacher
  const settings = db.getClassSettings();
  console.log('✓ Class Settings:', settings);
  assert.strictEqual(settings.code, 'HOME-ENGLISH');
  assert.strictEqual(settings.teacher, 'Sir Zubair');

  // 4. Test Student Join with full relational record creation
  const testEmail = `relational_test_${Date.now()}@example.com`;
  const salt = db.generateSaltServer(16);
  const hash = db.hashPasswordServer('password123', salt);

  const student = db.createStudent({
    name: 'Tariq Mehmood',
    email: testEmail,
    passwordHash: hash,
    passwordSalt: salt,
    avatar: '🐯',
    classCode: 'HOME-ENGLISH'
  });

  console.log('✓ Student created with ID:', student.studentId, 'User ID:', student.userId);
  assert.ok(student.studentId.startsWith('ha_stu_'));
  assert.ok(student.userId.startsWith('usr_'));
  assert.strictEqual(student.level, 1);
  assert.strictEqual(student.levelTitle, 'English Starter');
  assert.strictEqual(student.xp, 0);

  // Verify user record exists in users table
  const userRow = db.db.prepare('SELECT * FROM users WHERE user_id = ?').get(student.userId);
  assert.ok(userRow, 'User row must exist');
  assert.strictEqual(userRow.role, 'student');

  // Verify streak record exists
  const streakRow = db.db.prepare('SELECT * FROM streaks WHERE student_id = ?').get(student.studentId);
  assert.ok(streakRow, 'Streak record must be initialized');
  assert.strictEqual(streakRow.current_streak, 0);

  // Verify progress initialized for all 6 active topics
  const progressRows = db.db.prepare('SELECT * FROM student_progress WHERE student_id = ?').all(student.studentId);
  console.log(`✓ Student progress initialized across ${progressRows.length} topics`);
  assert.strictEqual(progressRows.length, 6);
  progressRows.forEach(p => {
    assert.strictEqual(p.progress_percentage, 0);
    assert.strictEqual(p.learned, 0);
  });

  // Verify real notification created for teacher
  const notifs = db.getNotifications('teacher', 5);
  const studentNotif = notifs.find(n => n.studentId === student.studentId);
  assert.ok(studentNotif, 'Teacher notification must be created for new student');
  console.log('✓ Teacher notification verified:', studentNotif.title, '-', studentNotif.message);

  // 5. Test Server-Side Graded XP and Canonical Level Titles
  const xpAward = db.awardXP({
    studentId: student.studentId,
    amount: 120,
    source: 'quiz_mastery',
    idempotencyKey: `idemp_${student.studentId}_1`
  });
  console.log('✓ XP Awarded:', xpAward.newXP, 'Level:', xpAward.newLevel, 'Title:', xpAward.levelTitle);
  assert.strictEqual(xpAward.newXP, 120);
  assert.strictEqual(xpAward.newLevel, 2);
  assert.strictEqual(xpAward.levelTitle, 'Word Explorer');

  // Test anti-replay idempotency
  const dupAward = db.awardXP({
    studentId: student.studentId,
    amount: 120,
    source: 'quiz_mastery',
    idempotencyKey: `idemp_${student.studentId}_1`
  });
  assert.strictEqual(dupAward.duplicate, true);
  assert.strictEqual(dupAward.xpAwarded, 0);
  console.log('✓ Anti-replay idempotency verified (Duplicate rejected)');

  // 6. Test Detailed Student Profile / Dossier Retrieval (Section 12)
  const dossier = db.getStudentDetailedProfile(student.studentId);
  assert.ok(dossier, 'Dossier must be returned');
  assert.strictEqual(dossier.student.studentId, student.studentId);
  assert.ok(Array.isArray(dossier.xpLedger));
  assert.strictEqual(dossier.xpLedger.length, 1);
  assert.strictEqual(dossier.xpLedger[0].amount, 120);
  console.log('✓ Detailed student dossier verified with auditable XP ledger');

  // 7. Cleanup
  db.deleteStudentById(student.studentId);
  assert.strictEqual(db.getStudentById(student.studentId), null);
  console.log('✓ Cleaned up test student record');

  console.log('--- ALL 18-ENTITY RELATIONAL TESTS PASSED! ---');
}

testRelationalSchema().catch(err => {
  console.error('Relational Schema Test Failed:', err);
  process.exit(1);
});
