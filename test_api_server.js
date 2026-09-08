// Integration Test Suite for Home Academy REST API Endpoints
import assert from 'assert';

const BASE_URL = 'http://localhost:3000';

async function req(path, options = {}) {
  const url = `${BASE_URL}${path}`;
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  if (options.body && typeof options.body === 'object') {
    options.body = JSON.stringify(options.body);
  }
  const res = await fetch(url, { ...options, headers });
  const data = await res.json().catch(() => ({}));
  return { status: res.status, ok: res.ok, data };
}

async function runApiTests() {
  console.log('--- STARTING REST API INTEGRATION TESTS ---');

  // 1. GET /api/class-info
  const classInfo = await req('/api/class-info');
  console.log('✓ /api/class-info:', classInfo.data);
  assert.strictEqual(classInfo.status, 200);
  assert.strictEqual(classInfo.data.classCode, 'HOME-ENGLISH');

  // 2. GET /api/curriculum (public)
  const curriculum = await req('/api/curriculum');
  console.log(`✓ /api/curriculum returned ${curriculum.data.topics.length} topics`);
  assert.strictEqual(curriculum.status, 200);
  assert.strictEqual(curriculum.data.topics.length, 6);

  // 3. GET /api/roleplays (public)
  const roleplays = await req('/api/roleplays');
  console.log(`✓ /api/roleplays returned ${roleplays.data.roleplays.length} roleplays`);
  assert.strictEqual(roleplays.status, 200);
  assert.strictEqual(roleplays.data.roleplays.length, 5);

  // 4. POST /api/auth/register
  const email = `api_student_${Date.now()}@example.com`;
  const regRes = await req('/api/auth/register', {
    method: 'POST',
    body: {
      name: 'Sarah Khan',
      email,
      password: 'password123',
      avatar: '🌟',
      classCode: 'HOME-ENGLISH'
    }
  });
  console.log('✓ /api/auth/register status:', regRes.status, 'studentId:', regRes.data.student?.id);
  assert.strictEqual(regRes.status, 201);
  assert.ok(regRes.data.token, 'Token must be returned');
  const token = regRes.data.token;
  const studentId = regRes.data.student.id;

  // 5. GET /api/auth/me
  const meRes = await req('/api/auth/me', {
    headers: { Authorization: `Bearer ${token}` }
  });
  console.log('✓ /api/auth/me verified:', meRes.data.student?.name);
  assert.strictEqual(meRes.status, 200);
  assert.strictEqual(meRes.data.student.id, studentId);

  // 6. POST /api/auth/login
  const loginRes = await req('/api/auth/login', {
    method: 'POST',
    body: { email, password: 'password123' }
  });
  console.log('✓ /api/auth/login success:', loginRes.status);
  assert.strictEqual(loginRes.status, 200);
  assert.strictEqual(loginRes.data.student.id, studentId);

  // 7. POST /api/curriculum/:topicId/learn
  const learnRes = await req('/api/curriculum/adjectives/learn', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` }
  });
  console.log('✓ /api/curriculum/adjectives/learn status:', learnRes.status, 'XP:', learnRes.data.result?.xpAwarded);
  assert.strictEqual(learnRes.status, 200);
  assert.strictEqual(learnRes.data.result.xpAwarded, 10);

  // 8. POST /api/curriculum/:topicId/quiz
  const quizRes = await req('/api/curriculum/adjectives/quiz', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: {
      submissionToken: `sub_quiz_${Date.now()}`,
      score: 5,
      total: 5,
      percent: 100
    }
  });
  console.log('✓ /api/curriculum/adjectives/quiz status:', quizRes.status, 'XP:', quizRes.data.result?.xpEarned);
  assert.strictEqual(quizRes.status, 200);
  assert.strictEqual(quizRes.data.result.xpEarned, 50);

  // 9. POST /api/roleplays/:id/complete
  const rpRes = await req('/api/roleplays/rp_01/complete', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: { percent: 100 }
  });
  console.log('✓ /api/roleplays/:id/complete status:', rpRes.status, 'XP:', rpRes.data.result?.xpEarned);
  assert.strictEqual(rpRes.status, 200);
  assert.strictEqual(rpRes.data.result.xpEarned, 50);

  // 10. GET /api/leaderboard
  const lbRes = await req('/api/leaderboard');
  console.log('✓ /api/leaderboard total ranked:', lbRes.data.count);
  assert.strictEqual(lbRes.status, 200);
  const foundStudent = lbRes.data.leaderboard.find(s => s.id === studentId);
  assert.ok(foundStudent, 'Student must appear in live leaderboard');
  console.log('✓ Student verified on live leaderboard with XP:', foundStudent.xp);
  assert.ok(foundStudent.xp >= 110);

  // 11. TEACHER / ADMIN AUTHENTICATION
  const adminLoginRes = await req('/api/admin/login', {
    method: 'POST',
    body: { password: 'pakistan786' }
  });
  console.log('✓ /api/admin/login status:', adminLoginRes.status);
  assert.strictEqual(adminLoginRes.status, 200);
  const adminToken = adminLoginRes.data.token;
  assert.ok(adminToken, 'Admin token required');

  // 12. GET /api/admin/roster
  const rosterRes = await req('/api/admin/roster', {
    headers: { Authorization: `Bearer ${adminToken}` }
  });
  console.log('✓ /api/admin/roster count:', rosterRes.data.count);
  assert.strictEqual(rosterRes.status, 200);
  assert.ok(rosterRes.data.students.some(s => s.id === studentId));

  // 13. POST /api/admin/award-xp
  const awardRes = await req('/api/admin/award-xp', {
    method: 'POST',
    headers: { Authorization: `Bearer ${adminToken}` },
    body: { studentId, amount: 25, reason: 'Great classroom presentation' }
  });
  console.log('✓ /api/admin/award-xp status:', awardRes.status, 'New XP:', awardRes.data.result?.newXP);
  assert.strictEqual(awardRes.status, 200);
  assert.strictEqual(awardRes.data.result.xpAwarded, 25);

  // 14. DELETE /api/admin/students/:id (Clean up)
  const delRes = await req(`/api/admin/students/${studentId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${adminToken}` }
  });
  console.log('✓ /api/admin/students/:id deleted status:', delRes.status);
  assert.strictEqual(delRes.status, 200);

  console.log('--- ALL REST API INTEGRATION TESTS PASSED! ---');
}

runApiTests().catch(err => {
  console.error('API Test Failed:', err);
  process.exit(1);
});
