// Test Suite: Persistence Lifecycle, Anti-Replay Idempotency, and Empty States
import assert from 'assert';
import * as db from './data/db.js';

const BASE_URL = 'http://localhost:3000';

async function req(path, options = {}) {
  const url = `${BASE_URL}${path}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    }
  });
  const data = await res.json().catch(() => null);
  return { status: res.status, ok: res.ok, data };
}

async function testPersistenceAndLifecycle() {
  console.log('--- STARTING COMPLETE PERSISTENCE, ANTI-REPLAY & EMPTY STATE SUITE ---');

  // STEP 0: Clean database to test Requirement 16 (Empty States)
  console.log('\n[Phase 1] Testing Empty States (Requirement 16)...');
  db.cleanProductionDatabase();

  const emptyLbRes = await req('/api/leaderboard');
  assert.strictEqual(emptyLbRes.status, 200);
  assert.strictEqual(emptyLbRes.data.leaderboard.length, 0, 'Leaderboard must be strictly empty with 0 fake students');
  console.log('✓ Leaderboard is strictly empty (0 fake students, 0 fake records)');

  // Admin login to check empty roster & overview
  const adminLoginRes = await req('/api/admin/login', {
    method: 'POST',
    body: JSON.stringify({ password: 'pakistan786' })
  });
  assert.strictEqual(adminLoginRes.status, 200);
  const teacherToken = adminLoginRes.data.token;

  const emptyRosterRes = await req('/api/admin/students', {
    headers: { Authorization: `Bearer ${teacherToken}` }
  });
  assert.strictEqual(emptyRosterRes.status, 200);
  assert.strictEqual(emptyRosterRes.data.students.length, 0, 'Admin roster must be strictly empty');
  console.log('✓ Admin roster is strictly empty (0 students enrolled)');

  const emptyOverviewRes = await req('/api/admin/overview', {
    headers: { Authorization: `Bearer ${teacherToken}` }
  });
  assert.strictEqual(emptyOverviewRes.status, 200);
  assert.strictEqual(emptyOverviewRes.data.stats.totalStudents, 0);
  assert.strictEqual(emptyOverviewRes.data.stats.totalXP, 0);
  console.log('✓ Admin overview reflects zero students and zero fake XP');

  // STEP 1: Student joins (Requirement 14 & 6)
  console.log('\n[Phase 2] Testing Student Full Journey & Persistence (Requirement 14)...');
  const studentEmail = `perftest_${Date.now()}@example.com`;
  const joinRes = await req('/api/auth/join', {
    method: 'POST',
    body: JSON.stringify({
      fullName: 'Kamran Ali',
      email: studentEmail,
      password: 'mypassword123',
      classCode: 'HOME-ENGLISH',
      avatar: '🦅'
    })
  });
  assert.strictEqual(joinRes.status, 201);
  const sessionToken1 = joinRes.data.token;
  const studentId = joinRes.data.student.studentId;
  console.log(`✓ Student joined: ${studentId} (${joinRes.data.student.fullName})`);

  // STEP 2: Earns Practice XP
  const actRes = await req('/api/activities/complete', {
    method: 'POST',
    headers: { Authorization: `Bearer ${sessionToken1}` },
    body: JSON.stringify({
      topicId: 'adjectives',
      activityType: 'sentence_scramble',
      score: 100,
      idempotencyKey: `idemp_act_scramble_${studentId}`
    })
  });
  assert.strictEqual(actRes.status, 200);
  assert.strictEqual(actRes.data.xpAwarded, 25);
  console.log('✓ Activity completed: +25 XP awarded');

  // STEP 3: Completes Quiz & Requirement 9 (Quiz Duplication Anti-Replay Test)
  console.log('\n[Phase 3] Testing Quiz Submission & Anti-Replay Duplicate Test (Requirement 9)...');
  const quizToken = `sub_tok_${studentId}_q1`;
  const quiz1Res = await req('/api/quiz/submit', {
    method: 'POST',
    headers: { Authorization: `Bearer ${sessionToken1}` },
    body: JSON.stringify({
      topicId: 'adjectives',
      answers: { 0: 0, 1: 1, 2: 2, 3: 0, 4: 1 },
      totalQuestions: 5,
      correctCount: 5,
      score: 100,
      passed: true,
      submissionToken: quizToken
    })
  });
  assert.strictEqual(quiz1Res.status, 200);
  assert.strictEqual(quiz1Res.data.xpAwarded, 50, 'Perfect quiz awards 50 XP');
  console.log(`✓ Quiz 1st Submission: +50 XP awarded (Total XP: ${quiz1Res.data.newXP})`);

  // SUBMIT EXACT SAME QUIZ ATTEMPT A SECOND TIME
  const quizDupRes = await req('/api/quiz/submit', {
    method: 'POST',
    headers: { Authorization: `Bearer ${sessionToken1}` },
    body: JSON.stringify({
      topicId: 'adjectives',
      answers: { 0: 0, 1: 1, 2: 2, 3: 0, 4: 1 },
      totalQuestions: 5,
      correctCount: 5,
      score: 100,
      passed: true,
      submissionToken: quizToken // EXACT SAME TOKEN
    })
  });
  assert.strictEqual(quizDupRes.status, 200);
  assert.strictEqual(quizDupRes.data.duplicate, true, 'Must detect duplicate submission');
  assert.strictEqual(quizDupRes.data.xpAwarded, 0, 'Must award ZERO XP on duplicate submission');
  console.log('✓ Requirement 9 Verified: Exact same quiz submitted twice awarded XP only once');

  // STEP 4: Completes Roleplay Presentation
  const rpRes = await req('/api/roleplay/complete', {
    method: 'POST',
    headers: { Authorization: `Bearer ${sessionToken1}` },
    body: JSON.stringify({
      roleplayId: 'rp_01',
      score: 100,
      speakingScore: 100,
      percent: 100
    })
  });
  assert.strictEqual(rpRes.status, 200);
  assert.strictEqual(rpRes.data.xpAwarded, 50, 'Perfect Roleplay awards 50 XP');
  console.log('✓ Roleplay presentation completed: +50 XP awarded');

  // Expected Total XP: 25 (activity) + 50 (quiz) + 50 (roleplay) = 125 XP (Level 2: Word Explorer)
  const expectedXP = 125;

  // STEP 5: Logout (Simulate browser close / session clear)
  console.log('\n[Phase 4] Testing Logout, Multi-Device Login & Rehydration...');
  const logoutRes = await req('/api/auth/logout', {
    method: 'POST',
    headers: { Authorization: `Bearer ${sessionToken1}` }
  });
  assert.strictEqual(logoutRes.status, 200);
  console.log('✓ Student logged out cleanly; session token 1 revoked');

  // Verify old token is revoked
  const staleMeRes = await req('/api/student/me', {
    headers: { Authorization: `Bearer ${sessionToken1}` }
  });
  assert.strictEqual(staleMeRes.status, 401, 'Revoked token must be rejected');
  console.log('✓ Revoked session token rejected with 401');

  // STEP 6: Login again from another device / browser
  const loginRes = await req('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      email: studentEmail,
      password: 'mypassword123'
    })
  });
  assert.strictEqual(loginRes.status, 200);
  const sessionToken2 = loginRes.data.token;
  assert.ok(sessionToken2, 'New session token issued');
  console.log('✓ Logged in from another device with fresh session token 2');

  // STEP 7: Verify all data persisted completely in the database
  const restoredMeRes = await req('/api/student/me', {
    headers: { Authorization: `Bearer ${sessionToken2}` }
  });
  assert.strictEqual(restoredMeRes.status, 200);
  const restored = restoredMeRes.data.student;

  assert.strictEqual(restored.studentId, studentId);
  assert.strictEqual(restored.fullName, 'Kamran Ali');
  assert.strictEqual(restored.xp, expectedXP, `XP must be strictly preserved as ${expectedXP}`);
  assert.strictEqual(restored.level, 2, 'Level must be 2');
  assert.strictEqual(restored.levelTitle, 'Word Explorer', 'Level title must be Word Explorer');
  assert.strictEqual(restored.topicProgress['adjectives'].passed, true, 'Topic 1 must remain passed');
  assert.strictEqual(restored.roleplayProgress['rp_01'].completed, true, 'Roleplay 1 must remain completed');
  console.log(`✓ All student records restored with 100% fidelity from database (XP: ${restored.xp}, Level: ${restored.level} - ${restored.levelTitle})`);

  // STEP 8: Inspect Teacher Dossier & XP Ledger
  const dossierRes = await req(`/api/admin/students/${studentId}`, {
    headers: { Authorization: `Bearer ${teacherToken}` }
  });
  assert.strictEqual(dossierRes.status, 200);
  assert.strictEqual(dossierRes.data.profile.xpLedger.length, 3, 'XP ledger must track exactly 3 auditable transactions');
  console.log(`✓ Faculty dossier verified with ${dossierRes.data.profile.xpLedger.length} auditable transactions in ledger.`);

  // Clean database back to zero fake data
  db.cleanProductionDatabase();
  console.log('✓ Reset database to clean production zero-data state.');

  console.log('\n======================================================');
  console.log('🎉 PERSISTENCE, ANTI-REPLAY & EMPTY STATES PASSED 100%!');
  console.log('======================================================');
}

testPersistenceAndLifecycle().catch(err => {
  console.error('Persistence Test Failed:', err);
  process.exit(1);
});
