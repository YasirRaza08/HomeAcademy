// Test Suite: Student Data Isolation & Privacy Verification
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

async function testStudentIsolation() {
  console.log('--- STARTING STUDENT DATA ISOLATION & PRIVACY TESTS ---');

  const ts = Date.now();

  // 1. Create Student A
  const studentAEmail = `student_a_${ts}@example.com`;
  const joinARes = await req('/api/auth/join', {
    method: 'POST',
    body: JSON.stringify({
      fullName: 'Student Alpha',
      email: studentAEmail,
      password: 'passwordA123',
      classCode: 'HOME-ENGLISH'
    })
  });
  assert.strictEqual(joinARes.status, 201);
  const tokenA = joinARes.data.token;
  const studentAId = joinARes.data.student.studentId;
  console.log(`✓ Student A registered: ${studentAId} (${studentAEmail})`);

  // Student A completes a quiz to earn private history
  await req('/api/quiz/submit', {
    method: 'POST',
    headers: { Authorization: `Bearer ${tokenA}` },
    body: JSON.stringify({
      topicId: 'adjectives',
      answers: { 0: 0, 1: 1, 2: 2, 3: 0, 4: 1 },
      totalQuestions: 5,
      correctCount: 5,
      score: 100,
      passed: true,
      submissionToken: `tok_iso_a_${ts}`
    })
  });

  // 2. Create Student B
  const studentBEmail = `student_b_${ts}@example.com`;
  const joinBRes = await req('/api/auth/join', {
    method: 'POST',
    body: JSON.stringify({
      fullName: 'Student Beta',
      email: studentBEmail,
      password: 'passwordB123',
      classCode: 'HOME-ENGLISH'
    })
  });
  assert.strictEqual(joinBRes.status, 201);
  const tokenB = joinBRes.data.token;
  const studentBId = joinBRes.data.student.studentId;
  console.log(`✓ Student B registered: ${studentBId} (${studentBEmail})`);

  // 3. Test Student B requesting Student A's private profile via Student endpoints
  console.log('\nTesting isolation on Student B session...');
  const meBRes = await req('/api/student/me', {
    headers: { Authorization: `Bearer ${tokenB}` }
  });
  assert.strictEqual(meBRes.status, 200);
  assert.strictEqual(meBRes.data.student.studentId, studentBId);
  assert.strictEqual(meBRes.data.student.email, studentBEmail);
  assert.strictEqual(meBRes.data.student.xp, 0); // Student B has 0 XP, not Student A's 50 XP
  console.log('✓ Student B requesting /api/student/me strictly returns Student B data');

  // 4. Test Student B attempting to call Admin Endpoints (Must be rejected with 401)
  console.log('\nTesting unauthorized Admin access by Student B...');
  const adminAccessRes = await req('/api/admin/students', {
    headers: { Authorization: `Bearer ${tokenB}` }
  });
  assert.strictEqual(adminAccessRes.status, 401, 'Student token must NOT be allowed to access /api/admin/students');
  console.log('✓ Student token rejected on Admin endpoints (401 Unauthorized)');

  // Attempt direct dossier query with Student token
  const dossierByStudentRes = await req(`/api/admin/students/${studentAId}`, {
    headers: { Authorization: `Bearer ${tokenB}` }
  });
  assert.strictEqual(dossierByStudentRes.status, 401, 'Student token must NOT access /api/admin/students/:id');
  console.log('✓ Student token rejected on Student Dossier endpoint (401 Unauthorized)');

  // 5. Test Leaderboard privacy: Student A and Student B appear, but EMAILS are suppressed
  console.log('\nTesting Leaderboard Privacy...');
  const lbRes = await req('/api/leaderboard');
  assert.strictEqual(lbRes.status, 200);
  const foundA = lbRes.data.leaderboard.find(s => s.studentId === studentAId);
  const foundB = lbRes.data.leaderboard.find(s => s.studentId === studentBId);
  assert.ok(foundA, 'Student A on leaderboard');
  assert.ok(foundB, 'Student B on leaderboard');
  assert.strictEqual(foundA.email, undefined, "Student A email must NEVER be in leaderboard response");
  assert.strictEqual(foundB.email, undefined, "Student B email must NEVER be in leaderboard response");
  console.log('✓ Public Leaderboard strictly suppresses student email addresses');

  // 6. Test Authorized Teacher Admin viewing both students
  console.log('\nTesting Authorized Faculty access...');
  const adminLoginRes = await req('/api/admin/login', {
    method: 'POST',
    body: JSON.stringify({ password: 'pakistan786' })
  });
  assert.strictEqual(adminLoginRes.status, 200);
  const adminToken = adminLoginRes.data.token;

  const adminDossierARes = await req(`/api/admin/students/${studentAId}`, {
    headers: { Authorization: `Bearer ${adminToken}` }
  });
  assert.strictEqual(adminDossierARes.status, 200);
  assert.strictEqual(adminDossierARes.data.profile.student.email, studentAEmail);
  assert.strictEqual(adminDossierARes.data.profile.student.xp, 50);
  console.log('✓ Authorized Teacher can inspect Student A dossier');

  // 7. Cleanup test students
  await req(`/api/admin/students/${studentAId}`, { method: 'DELETE', headers: { Authorization: `Bearer ${adminToken}` } });
  await req(`/api/admin/students/${studentBId}`, { method: 'DELETE', headers: { Authorization: `Bearer ${adminToken}` } });
  console.log('✓ Cleaned up test students.');

  console.log('\n======================================================');
  console.log('🎉 STUDENT DATA ISOLATION TESTS PASSED 100%!');
  console.log('======================================================');
}

testStudentIsolation().catch(err => {
  console.error('Student Isolation Test Failed:', err);
  process.exit(1);
});
