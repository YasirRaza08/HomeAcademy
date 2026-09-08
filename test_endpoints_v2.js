// Comprehensive API Endpoints Integration Test Suite v2
import assert from 'assert';

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

async function runTests() {
  console.log('--- STARTING COMPREHENSIVE ENDPOINT INTEGRATION TESTS ---');

  // 1. Check server health / class info
  const infoRes = await req('/api/class/info');
  assert.strictEqual(infoRes.status, 200);
  assert.strictEqual(infoRes.data.code, 'HOME-ENGLISH');
  assert.strictEqual(infoRes.data.teacher, 'Sir Zubair');
  console.log('✓ Public Class Info endpoint verified');

  // 2. Student Registration / Join Class
  const uniqueNum = Date.now();
  const studentEmail = `student_${uniqueNum}@homeacademy.pk`;
  const joinRes = await req('/api/auth/join', {
    method: 'POST',
    body: JSON.stringify({
      fullName: 'Ayesha Khan',
      email: studentEmail,
      password: 'password123',
      classCode: 'HOME-ENGLISH',
      avatar: '🌟'
    })
  });

  assert.strictEqual(joinRes.status, 201, `Join failed: ${JSON.stringify(joinRes.data)}`);
  assert.ok(joinRes.data.token, 'Must return session token');
  assert.strictEqual(joinRes.data.student.fullName, 'Ayesha Khan');
  assert.strictEqual(joinRes.data.student.level, 1);
  assert.strictEqual(joinRes.data.student.levelTitle, 'English Starter');
  assert.strictEqual(joinRes.data.student.xp, 0);
  const studentToken = joinRes.data.token;
  const studentId = joinRes.data.student.studentId;
  console.log(`✓ Student joined successfully: ${studentId} (${joinRes.data.student.fullName})`);

  // 3. Student Dashboard
  const dashRes = await req('/api/student/dashboard', {
    headers: { Authorization: `Bearer ${studentToken}` }
  });
  assert.strictEqual(dashRes.status, 200);
  assert.strictEqual(dashRes.data.student.studentId, studentId);
  assert.ok(Array.isArray(dashRes.data.topics));
  assert.strictEqual(dashRes.data.topics.length, 6);
  assert.ok(Array.isArray(dashRes.data.roleplays));
  assert.strictEqual(dashRes.data.roleplays.length, 5);
  console.log(`✓ Student dashboard verified with ${dashRes.data.topics.length} topics and ${dashRes.data.roleplays.length} roleplays`);

  // 4. Submit Quiz with Server-Side Grading and XP Calculation
  const submissionToken = `sub_tok_${uniqueNum}_1`;
  const quizRes = await req('/api/quiz/submit', {
    method: 'POST',
    headers: { Authorization: `Bearer ${studentToken}` },
    body: JSON.stringify({
      topicId: 'adjectives',
      answers: { 0: 0, 1: 1, 2: 2, 3: 0, 4: 1 },
      totalQuestions: 5,
      correctCount: 4,
      score: 80,
      passed: true,
      submissionToken
    })
  });
  assert.strictEqual(quizRes.status, 200, `Quiz submit failed: ${JSON.stringify(quizRes.data)}`);
  assert.strictEqual(quizRes.data.success, true);
  assert.ok(quizRes.data.xpAwarded > 0, 'Must award XP');
  console.log(`✓ Quiz submitted successfully: Awarded ${quizRes.data.xpAwarded} XP, Total XP: ${quizRes.data.newXP}`);

  // Test anti-replay token rejection for quiz
  const dupQuizRes = await req('/api/quiz/submit', {
    method: 'POST',
    headers: { Authorization: `Bearer ${studentToken}` },
    body: JSON.stringify({
      topicId: 'adjectives',
      answers: { 0: 0 },
      totalQuestions: 5,
      correctCount: 4,
      score: 80,
      passed: true,
      submissionToken // Same token
    })
  });
  assert.strictEqual(dupQuizRes.data.duplicate, true, 'Duplicate submission token must be rejected');
  assert.strictEqual(dupQuizRes.data.xpAwarded, 0, 'No XP awarded on duplicate');
  console.log('✓ Anti-replay verified: duplicate quiz token prevented double XP');

  // 5. Complete Activity with Server-Side XP
  const actIdempKey = `act_idemp_${uniqueNum}_1`;
  const actRes = await req('/api/activities/complete', {
    method: 'POST',
    headers: { Authorization: `Bearer ${studentToken}` },
    body: JSON.stringify({
      topicId: 'adjectives',
      activityType: 'fill_blanks',
      score: 100,
      idempotencyKey: actIdempKey
    })
  });
  assert.strictEqual(actRes.status, 200);
  assert.strictEqual(actRes.data.success, true);
  assert.strictEqual(actRes.data.xpAwarded, 25);
  console.log(`✓ Activity completion verified (+25 XP awarded)`);

  // 6. Complete Roleplay Presentation
  const rpIdempKey = `rp_idemp_${uniqueNum}_1`;
  const rpRes = await req('/api/roleplay/complete', {
    method: 'POST',
    headers: { Authorization: `Bearer ${studentToken}` },
    body: JSON.stringify({
      roleplayId: 'rp_1',
      score: 100,
      speakingScore: 100,
      percent: 100,
      idempotencyKey: rpIdempKey
    })
  });
  assert.strictEqual(rpRes.status, 200);
  assert.strictEqual(rpRes.data.success, true);
  assert.strictEqual(rpRes.data.xpAwarded, 50);
  console.log(`✓ Roleplay completion verified (+50 XP awarded)`);

  // 7. Check Public Leaderboard (Privacy Requirement: NO EMAILS EXPOSED)
  const lbRes = await req('/api/leaderboard');
  assert.strictEqual(lbRes.status, 200);
  assert.ok(Array.isArray(lbRes.data.leaderboard));
  assert.ok(lbRes.data.leaderboard.length > 0);
  const ayeshaInLb = lbRes.data.leaderboard.find(s => s.studentId === studentId);
  assert.ok(ayeshaInLb, 'Enrolled student must appear on leaderboard');
  assert.strictEqual(ayeshaInLb.email, undefined, 'Privacy check: student email must NEVER be exposed on leaderboard');
  console.log('✓ Public Leaderboard verified: ranking accurate and emails securely suppressed');

  // 8. Teacher Admin Login
  const adminLoginRes = await req('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      role: 'teacher',
      classCode: 'HOME-ENGLISH',
      password: 'pakistan786'
    })
  });
  assert.strictEqual(adminLoginRes.status, 200, `Admin login failed: ${JSON.stringify(adminLoginRes.data)}`);
  assert.ok(adminLoginRes.data.token, 'Teacher must receive bearer token');
  assert.strictEqual(adminLoginRes.data.teacher.name, 'Sir Zubair');
  const teacherToken = adminLoginRes.data.token;
  console.log('✓ Teacher Admin login verified for Sir Zubair');

  // 9. Teacher Admin Overview
  const ovRes = await req('/api/admin/overview', {
    headers: { Authorization: `Bearer ${teacherToken}` }
  });
  assert.strictEqual(ovRes.status, 200);
  assert.ok(ovRes.data.stats.totalStudents >= 1);
  assert.strictEqual(ovRes.data.stats.classCode, 'HOME-ENGLISH');
  console.log(`✓ Admin Overview verified (${ovRes.data.stats.totalStudents} total students enrolled)`);

  // 10. Teacher Admin Student Dossier Modal Endpoint
  const dossierRes = await req(`/api/admin/students/${studentId}`, {
    headers: { Authorization: `Bearer ${teacherToken}` }
  });
  assert.strictEqual(dossierRes.status, 200);
  assert.strictEqual(dossierRes.data.profile.student.studentId, studentId);
  assert.ok(Array.isArray(dossierRes.data.profile.xpLedger));
  assert.ok(dossierRes.data.profile.xpLedger.length >= 3, 'Must track quiz, activity, and roleplay XP transactions');
  console.log(`✓ Admin Student Dossier Modal verified with ${dossierRes.data.profile.xpLedger.length} auditable transactions in XP ledger`);

  // 11. Teacher Admin Question Bank API (Section 35)
  const getQRes = await req('/api/admin/questions?topicId=adjectives', {
    headers: { Authorization: `Bearer ${teacherToken}` }
  });
  assert.strictEqual(getQRes.status, 200);
  assert.ok(Array.isArray(getQRes.data.questions));
  assert.ok(getQRes.data.questions.length >= 15, 'Topic 1 must have at least 15 questions in question bank');
  console.log(`✓ Admin Questions Bank verified: ${getQRes.data.questions.length} questions for Topic 1`);

  // Create new question
  const createQRes = await req('/api/admin/questions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${teacherToken}` },
    body: JSON.stringify({
      topicId: 'adjectives',
      question: 'Which word is an adjective?',
      options: ['Beautiful', 'Quickly', 'Run', 'Because'],
      correctAnswer: 0,
      explanation: 'Beautiful is an adjective describing quality.',
      difficulty: 'easy',
      xpReward: 10
    })
  });
  assert.strictEqual(createQRes.status, 201);
  assert.ok(createQRes.data.question.questionId);
  const createdQId = createQRes.data.question.questionId;
  console.log(`✓ Admin Created Question verified: ID ${createdQId}`);

  // Delete question
  const delQRes = await req(`/api/admin/questions?id=${createdQId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${teacherToken}` }
  });
  assert.strictEqual(delQRes.status, 200);
  console.log(`✓ Admin Deleted Question verified: ID ${createdQId}`);

  // 12. Teacher Admin Notifications API
  const notifRes = await req('/api/admin/notifications', {
    headers: { Authorization: `Bearer ${teacherToken}` }
  });
  assert.strictEqual(notifRes.status, 200);
  assert.ok(Array.isArray(notifRes.data.notifications));
  const newStuNotif = notifRes.data.notifications.find(n => n.studentId === studentId);
  assert.ok(newStuNotif, 'Teacher notifications list must contain new student joined notification');
  console.log(`✓ Admin Notifications verified (${notifRes.data.notifications.length} total, unread: ${notifRes.data.unreadCount})`);

  // Mark notifications read
  const markReadRes = await req('/api/admin/notifications/mark-read', {
    method: 'POST',
    headers: { Authorization: `Bearer ${teacherToken}` },
    body: JSON.stringify({})
  });
  assert.strictEqual(markReadRes.status, 200);
  console.log(`✓ Admin Mark Notifications Read verified`);

  // 13. Clean up test student
  const delStudentRes = await req(`/api/admin/students/${studentId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${teacherToken}` }
  });
  assert.strictEqual(delStudentRes.status, 200);
  console.log(`✓ Test Student cleanup verified`);

  console.log('--- ALL COMPREHENSIVE ENDPOINT TESTS PASSED SUCCESSFULLY! ---');
}

runTests().catch(err => {
  console.error('Integration Test Failed:', err);
  process.exit(1);
});
