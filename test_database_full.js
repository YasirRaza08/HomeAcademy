// Comprehensive Test Suite for Home Academy Persistent Database Layer (data/db.js)
import assert from 'assert';
import * as db from './data/db.js';

async function runTests() {
  console.log('--- STARTING DATABASE TEST SUITE ---');

  await db.initDatabase();

  // 1. Class settings verification
  const settings = await db.getClassSettings();
  console.log('✓ Class Settings:', settings);
  assert.strictEqual(settings.code, 'HOME-ENGLISH');
  assert.strictEqual(settings.teacher, 'Sir Zubair');

  // 2. Teacher password verification
  assert.strictEqual(await db.verifyTeacherPassword('pakistan786'), true);
  assert.strictEqual(await db.verifyTeacherPassword('wrongpassword'), false);
  console.log('✓ Teacher password authentication verified (pakistan786)');

  // 3. Curriculum and Roleplays seeded correctly
  const topics = await db.getCurriculumTopics(true);
  console.log(`✓ Curriculum topics count: ${topics.length}`);
  assert.strictEqual(topics.length, 6);
  assert.strictEqual(topics[0].id, 'adjectives');

  const roleplays = await db.getRoleplays(true);
  console.log(`✓ Roleplay presentations count: ${roleplays.length}`);
  assert.strictEqual(roleplays.length, 5);
  assert.strictEqual(roleplays[0].id, 'rp_01');

  // 4. Student creation & password hashing
  const testEmail = `test_student_${Date.now()}@example.com`;
  const salt = db.generateSaltServer(16);
  const hash = db.hashPasswordServer('studentpass123', salt);

  const student = await db.createStudent({
    name: 'Hamza Zubair',
    email: testEmail,
    passwordHash: hash,
    passwordSalt: salt,
    avatar: '🦁',
    classCode: 'HOME-ENGLISH'
  });

  console.log('✓ Created Student:', student.id, student.name, student.email);
  assert.strictEqual(student.name, 'Hamza Zubair');
  assert.strictEqual(student.level, 1);
  assert.strictEqual(student.xp, 0);
  assert.ok(student.unlockedAchievements.includes('first_join'));

  // Verify credentials
  const verified = await db.verifyStudentCredentials(testEmail, 'studentpass123');
  assert.ok(verified, 'Credentials should verify');
  assert.strictEqual(verified.id, student.id);

  const invalid = await db.verifyStudentCredentials(testEmail, 'wrongpass');
  assert.strictEqual(invalid, null, 'Wrong password must fail');

  // 5. Server-Side XP Award & Anti-Replay Idempotency
  const xpRes1 = await db.awardXP({
    studentId: student.id,
    amount: 50,
    source: 'test_task',
    idempotencyKey: `idemp_${student.id}_task_1`
  });
  console.log('✓ Awarded 50 XP:', xpRes1.newXP, 'Level:', xpRes1.newLevel);
  assert.strictEqual(xpRes1.newXP, 50);

  // Attempt duplicate with same idempotency key
  const xpResDup = await db.awardXP({
    studentId: student.id,
    amount: 50,
    source: 'test_task',
    idempotencyKey: `idemp_${student.id}_task_1`
  });
  console.log('✓ Duplicate idempotency handled properly:', xpResDup.duplicate);
  assert.strictEqual(xpResDup.duplicate, true);
  assert.strictEqual(xpResDup.xpAwarded, 0);

  // 6. Topic Progress
  const learnRes = await db.recordTopicLearn(student.id, 'adjectives');
  console.log('✓ Topic Learn XP Awarded:', learnRes.xpAwarded);
  assert.strictEqual(learnRes.xpAwarded, 10);

  const quizRes = await db.recordTopicQuiz({
    studentId: student.id,
    topicId: 'adjectives',
    submissionToken: `tok_quiz_${Date.now()}`,
    score: 5,
    total: 5,
    percent: 100
  });
  console.log('✓ Topic Quiz Result:', quizRes.passed, 'XP:', quizRes.xpEarned);
  assert.strictEqual(quizRes.passed, true);
  assert.strictEqual(quizRes.xpEarned, 50);

  // 7. Roleplay Presentation Progress
  const rpRes = await db.recordRoleplayCompletion({
    studentId: student.id,
    roleplayId: 'rp_01',
    percent: 100
  });
  console.log('✓ Roleplay completion:', rpRes.completed, 'XP:', rpRes.xpEarned);
  assert.strictEqual(rpRes.completed, true);
  assert.strictEqual(rpRes.xpEarned, 50);

  // 8. Full Grammar Test
  const ftRes = await db.recordFullGrammarTest({
    studentId: student.id,
    submissionToken: `tok_ft_${Date.now()}`,
    score: 28,
    total: 30,
    percent: 93,
    topicBreakdown: { adjectives: 5, genitive_s: 5 }
  });
  console.log('✓ Full Grammar Test:', ftRes.passed, 'XP:', ftRes.xpEarned);
  assert.strictEqual(ftRes.passed, true);
  assert.strictEqual(ftRes.xpEarned, 125);

  // 9. Leaderboard returns real student
  const leaderboard = await db.getLeaderboard(10);
  console.log('✓ Leaderboard entries:', leaderboard.length);
  const found = leaderboard.find(s => s.id === student.id);
  assert.ok(found, 'Student should be present on real database leaderboard');
  console.log('✓ Student on leaderboard with rank:', found.rank, 'XP:', found.xp);

  // 10. Clean up test student
  await db.deleteStudentById(student.id);
  const deleted = await db.getStudentById(student.id);
  assert.strictEqual(deleted, null, 'Deleted student must not exist');
  console.log('✓ Test student cleaned up successfully');

  console.log('--- ALL DATABASE TESTS PASSED SUCCESSFULLY! ---');
}

runTests().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
