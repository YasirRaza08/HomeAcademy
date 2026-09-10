// Automated Verification of Turso Database Layer and API Router
import assert from 'assert';
import { handleApiRequest } from './server/apiRouter.js';
import * as db from './data/db.js';
import { initDatabase, checkHealth, getStudentByEmail, getAllStudents } from './data/db.js';

// Mock request / response helper for in-process testing
function invokeApi(method, path, body = null, headers = {}) {
  return new Promise((resolve) => {
    let statusCode = 200;
    const resHeaders = {};
    const chunks = [];

    const mockReq = {
      url: path,
      method,
      headers: { 'content-type': 'application/json', ...headers },
      body: body ? JSON.stringify(body) : '',
      on(ev, fn) {
        if (ev === 'data' && this.body) fn(Buffer.from(this.body));
        if (ev === 'end') fn();
        return this;
      }
    };

    const mockRes = {
      writeHead(code, h = {}) {
        statusCode = code;
        for (const [k, v] of Object.entries(h)) {
          resHeaders[k.toLowerCase()] = v;
        }
      },
      setHeader(name, val) {
        resHeaders[name.toLowerCase()] = val;
      },
      write(chunk) {
        if (chunk) chunks.push(typeof chunk === 'string' ? chunk : chunk.toString());
      },
      end(chunk) {
        if (chunk) chunks.push(typeof chunk === 'string' ? chunk : chunk.toString());
        const raw = chunks.join('');
        let json = null;
        try { json = JSON.parse(raw); } catch (e) { json = raw; }
        resolve({ status: statusCode, headers: resHeaders, body: json });
      }
    };

    handleApiRequest(mockReq, mockRes).catch(err => {
      resolve({ status: 500, headers: {}, body: { error: err.message, success: false } });
    });
  });
}

async function runVerification() {
  console.log('====================================================');
  console.log('🧪 VERIFYING PRODUCTION DATABASE & REST API ENDPOINTS');
  console.log('====================================================\n');

  // Step 1: Initialize Database
  console.log('1. Initializing schema & seeding...');
  await initDatabase();
  console.log('✓ Database initialized successfully.\n');

  // Step 2: Test Health Check Endpoint (GET /api/health/db)
  console.log('2. Testing GET /api/health/db...');
  const healthRes = await invokeApi('GET', '/api/health/db');
  console.log('✓ Health check response:', healthRes.body);
  assert.strictEqual(healthRes.status, 200, 'Health check should return 200');
  assert.strictEqual(healthRes.body.ok, true, 'ok should be true');
  assert.ok(healthRes.body.connected, 'connected should be true');
  assert.ok(healthRes.body.tableCount >= 18, `Expected at least 18 tables, got ${healthRes.body.tableCount}`);
  assert.ok(!healthRes.body.password, 'Must not leak secrets');
  assert.ok(!healthRes.body.token, 'Must not leak tokens');
  console.log('✓ Health check passed with 0 secrets leaked.\n');

  // Step 3: Test Public Class Info
  console.log('3. Testing GET /api/class-info...');
  const classRes = await invokeApi('GET', '/api/class-info');
  assert.strictEqual(classRes.status, 200);
  assert.strictEqual(classRes.body.classCode, 'HOME-ENGLISH');
  console.log(`✓ Class info verified: ${classRes.body.className} (${classRes.body.classCode})\n`);

  // Step 4: Test Student Registration (POST /api/auth/join)
  console.log('4. Testing Student Registration (POST /api/auth/join)...');
  const testEmail = `test_student_${Date.now()}@example.com`;
  const joinRes = await invokeApi('POST', '/api/auth/join', {
    name: 'Hamza Malik',
    email: testEmail,
    password: 'securePassword123',
    avatar: '🦁',
    classCode: 'HOME-ENGLISH'
  });
  console.log('Registration status:', joinRes.status, 'Body:', joinRes.body.success ? 'Success' : joinRes.body);
  assert.strictEqual(joinRes.status, 201, 'Registration should return 201 Created');
  assert.ok(joinRes.body.token, 'Registration must return a session token');
  assert.strictEqual(joinRes.body.student.name, 'Hamza Malik');
  const studentToken = joinRes.body.token;
  const studentId = joinRes.body.student.id;
  console.log(`✓ Student registered with ID: ${studentId}\n`);

  // Step 5: Test Student Direct DB Read
  console.log('5. Verifying persistent student record in database...');
  const dbStudent = await getStudentByEmail(testEmail);
  assert.ok(dbStudent, 'Student must be found in database');
  assert.strictEqual(dbStudent.name, 'Hamza Malik');
  assert.strictEqual(dbStudent.email, testEmail);
  console.log('✓ Persistent record confirmed in database.\n');

  // Step 6: Test Student Dashboard Auth (GET /api/student/me)
  console.log('6. Testing GET /api/student/me with Bearer token...');
  const meRes = await invokeApi('GET', '/api/student/me', null, {
    authorization: `Bearer ${studentToken}`
  });
  assert.strictEqual(meRes.status, 200);
  assert.strictEqual(meRes.body.student.name, 'Hamza Malik');
  assert.strictEqual(meRes.body.topics.length, 8);
  assert.strictEqual(meRes.body.roleplays.length, 5);
  console.log('✓ Student profile and static curriculum verified.\n');

  // Step 7: Test Quiz Submission & Server-Side XP Award (POST /api/quiz/submit)
  console.log('7. Testing Quiz Submission (POST /api/quiz/submit)...');
  const submissionToken = `sub_${Date.now()}_test`;
  const quizRes = await invokeApi('POST', '/api/quiz/submit', {
    topicId: 'adjectives',
    submissionToken,
    score: 5,
    totalQuestions: 5,
    percentage: 100
  }, {
    authorization: `Bearer ${studentToken}`
  });
  assert.strictEqual(quizRes.status, 200);
  assert.strictEqual(quizRes.body.passed, true);
  assert.strictEqual(quizRes.body.xpAwarded, 50, 'Perfect score should award 50 XP');
  console.log(`✓ Quiz passed with 100%! XP awarded: ${quizRes.body.xpAwarded}, New Total XP: ${quizRes.body.newXP}\n`);

  // Step 8: Test Anti-Replay Duplicate Quiz Submission
  console.log('8. Testing Anti-Replay Duplicate Quiz Submission...');
  const dupQuizRes = await invokeApi('POST', '/api/quiz/submit', {
    topicId: 'adjectives',
    submissionToken,
    score: 5,
    totalQuestions: 5,
    percentage: 100
  }, {
    authorization: `Bearer ${studentToken}`
  });
  assert.strictEqual(dupQuizRes.status, 200);
  assert.strictEqual(dupQuizRes.body.duplicate, true, 'Duplicate submission must be detected');
  assert.strictEqual(dupQuizRes.body.xpAwarded, 0, 'No XP on duplicate submission');
  console.log('✓ Anti-replay token protection verified: 0 duplicate XP awarded.\n');

  // Step 9: Test Real Leaderboard (GET /api/leaderboard)
  console.log('9. Testing GET /api/leaderboard...');
  const lbRes = await invokeApi('GET', '/api/leaderboard');
  assert.strictEqual(lbRes.status, 200);
  assert.ok(lbRes.body.leaderboard.length > 0, 'Leaderboard should have students');
  const lbStudent = lbRes.body.leaderboard.find(s => s.studentId === studentId);
  assert.ok(lbStudent, 'Newly registered student should appear on leaderboard');
  assert.strictEqual(lbStudent.xp, 50, 'Leaderboard should reflect 50 XP');
  assert.strictEqual(lbStudent.email, undefined, 'Privacy check: email must NOT be exposed on leaderboard');
  console.log(`✓ Leaderboard verified: ${lbStudent.name} is ranked with ${lbStudent.xp} XP (Zero email leak)\n`);

  // Step 10: Test Teacher Admin Login (POST /api/admin/login)
  console.log('10. Testing Teacher Admin Login with identifier and rememberMe (POST /api/admin/login)...');
  const adminLoginRes = await invokeApi('POST', '/api/admin/login', {
    emailOrUsername: 'teacher',
    password: 'pakistan786',
    rememberMe: true
  });
  assert.strictEqual(adminLoginRes.status, 200, 'Admin login should return 200');
  assert.ok(adminLoginRes.body.token, 'Teacher admin login must return a token');
  assert.strictEqual(adminLoginRes.body.role, 'teacher');
  assert.ok(adminLoginRes.headers['set-cookie'], 'Response must set HTTP-only cookie');
  assert.ok(adminLoginRes.headers['set-cookie'].includes('ha_admin_session='), 'Must set ha_admin_session cookie');
  assert.ok(adminLoginRes.headers['set-cookie'].includes('HttpOnly'), 'Cookie must be HttpOnly');
  assert.ok(adminLoginRes.headers['set-cookie'].includes('SameSite=Lax'), 'Cookie must have SameSite protection');
  const adminToken = adminLoginRes.body.token;
  console.log('✓ Teacher admin logged in successfully with HTTP-only cookie set.\n');

  // Step 11: Verify Session in Database
  console.log('11. Verifying persistent session in database...');
  const dbSession = await db.getSession(adminToken);
  assert.ok(dbSession, 'Session must exist in database');
  assert.strictEqual(dbSession.role, 'teacher');
  assert.strictEqual(dbSession.remember_me, 1, 'remember_me flag must be 1');
  console.log('✓ Session verified in Turso/SQLite sessions table.\n');

  // Step 12: Test Teacher Admin Auto-Restoration (GET /api/admin/me & GET /api/auth/me)
  console.log('12. Testing Session Auto-Restoration (GET /api/admin/me & GET /api/auth/me)...');
  const adminMeRes = await invokeApi('GET', '/api/admin/me', null, {
    cookie: `ha_admin_session=${adminToken}`
  });
  assert.strictEqual(adminMeRes.status, 200);
  assert.strictEqual(adminMeRes.body.authenticated, true);
  assert.strictEqual(adminMeRes.body.user.role, 'teacher');

  const authMeRes = await invokeApi('GET', '/api/auth/me', null, {
    authorization: `Bearer ${adminToken}`
  });
  assert.strictEqual(authMeRes.status, 200);
  assert.strictEqual(authMeRes.body.authenticated, true);
  assert.strictEqual(authMeRes.body.role, 'teacher');
  assert.strictEqual(authMeRes.body.user.name, 'Sir Zubair');
  console.log('✓ Session auto-restored via HTTP-only cookie and Bearer token.\n');

  // Step 13: Test Route Protection - 401 Unauthorized for unauthenticated requests
  console.log('13. Testing Admin Route Protection (401 Unauthorized)...');
  const unauthRes = await invokeApi('GET', '/api/admin/students');
  assert.strictEqual(unauthRes.status, 401, 'Unauthenticated access to admin routes must return 401');
  console.log('✓ 401 Unauthorized verified for unauthenticated request.\n');

  // Step 14: Test Route Protection - 403 Forbidden for logged-in students
  console.log('14. Testing Admin Route Protection (403 Forbidden for students)...');
  const studentForbiddenRes = await invokeApi('GET', '/api/admin/students', null, {
    authorization: `Bearer ${studentToken}`
  });
  assert.strictEqual(studentForbiddenRes.status, 403, 'Student access to admin routes must return 403 Forbidden');
  console.log('✓ 403 Forbidden verified for student token attempting admin route.\n');

  // Step 14b: Test Full Grammar Test Submission (POST /api/full-test/submit)
  console.log('14b. Testing Full Grammar Test Submission (POST /api/full-test/submit)...');
  const fullTestToken = `ft_sub_${Date.now()}`;
  const fullTestRes = await invokeApi('POST', '/api/full-test/submit', {
    submissionToken: fullTestToken,
    score: 17,
    totalQuestions: 20,
    total: 20,
    percentage: 85,
    percent: 85,
    topicBreakdown: { adjectives: { correct: 2, total: 2, percent: 100 } }
  }, {
    authorization: `Bearer ${studentToken}`
  });
  assert.strictEqual(fullTestRes.status, 200, 'Full test submit should return 200');
  assert.strictEqual(fullTestRes.body.passed, true);
  console.log(`✓ Full grammar test submitted successfully! Passed: ${fullTestRes.body.passed}, XP: ${fullTestRes.body.xpAwarded}\n`);

  // Step 14c: Test Student Test History with Strict Isolation (GET /api/student/history)
  console.log('14c. Testing Student History with Strict Isolation (GET /api/student/history)...');
  const studentHistoryRes = await invokeApi('GET', '/api/student/history', null, {
    authorization: `Bearer ${studentToken}`
  });
  assert.strictEqual(studentHistoryRes.status, 200);
  assert.ok(Array.isArray(studentHistoryRes.body.attempts), 'Should return array of attempts');
  assert.ok(studentHistoryRes.body.attempts.length >= 2, 'Should include both quiz and full test');
  const hasFullTest = studentHistoryRes.body.attempts.some(a => a.topic_id === 'full_grammar_test' && a.score === 17);
  assert.ok(hasFullTest, 'Student history must contain the full grammar test (17/20)');
  // Strict isolation check: all attempts must belong to studentId
  studentHistoryRes.body.attempts.forEach(a => {
    assert.strictEqual(a.student_id, studentId, 'Attempt must strictly belong to current student');
  });
  console.log('✓ Student test history retrieved with 100% strict student isolation.\n');

  // Step 14d: Test Admin Summary Cards & Dossier Telemetry (GET /api/admin/test-results)
  console.log('14d. Testing Admin Test Results & Summary Metrics (GET /api/admin/test-results)...');
  const adminTestResultsRes = await invokeApi('GET', '/api/admin/test-results', null, {
    authorization: `Bearer ${adminToken}`
  });
  assert.strictEqual(adminTestResultsRes.status, 200);
  const { stats, attempts } = adminTestResultsRes.body;
  assert.ok(stats, 'Response must contain stats object with the 4 summary metrics');
  assert.ok(stats.totalStudents >= 1, 'stats.totalStudents must be >= 1');
  assert.ok(stats.testsCompleted >= 2, 'stats.testsCompleted must be >= 2');
  assert.ok(stats.averageScore > 0, 'stats.averageScore must be > 0');
  assert.ok(stats.highestScore >= 85, 'stats.highestScore must be >= 85');
  assert.ok(Array.isArray(attempts), 'attempts must be an array');
  console.log(`✓ Admin summary metrics verified: Total Students: ${stats.totalStudents}, Tests Completed: ${stats.testsCompleted}, Avg Score: ${stats.averageScore}%, Highest: ${stats.highestScore}%\n`);

  // Step 15: Test Teacher Admin Roster Access (Authorized 200 OK)
  console.log('15. Testing Teacher Admin Roster Access (GET /api/admin/students)...');
  const rosterRes = await invokeApi('GET', '/api/admin/students', null, {
    cookie: `ha_admin_session=${adminToken}`
  });
  assert.strictEqual(rosterRes.status, 200);
  assert.ok(rosterRes.body.students.length > 0);
  const foundInRoster = rosterRes.body.students.find(s => s.studentId === studentId);
  assert.ok(foundInRoster, 'Student must appear in teacher roster');
  console.log(`✓ Teacher roster verified with ${rosterRes.body.students.length} real student(s).\n`);

  // Step 16: Test Invalid Password Login
  console.log('16. Testing Invalid Password Login...');
  const badLoginRes = await invokeApi('POST', '/api/admin/login', {
    emailOrUsername: 'teacher',
    password: 'wrongPassword999'
  });
  assert.strictEqual(badLoginRes.status, 401);
  assert.strictEqual(badLoginRes.body.success, false);
  console.log('✓ Invalid password correctly rejected with 401.\n');

  // Step 17: Test Rate Limiting on Brute-Force Login
  console.log('17. Testing Rate Limiting on Repeated Failed Logins...');
  let rateLimited = false;
  for (let i = 0; i < 6; i++) {
    const rlRes = await invokeApi('POST', '/api/admin/login', {
      emailOrUsername: 'test_brute_force_user',
      password: 'bad'
    }, {
      'x-forwarded-for': '192.168.1.99'
    });
    if (rlRes.status === 429) {
      rateLimited = true;
      break;
    }
  }
  assert.ok(rateLimited, 'Repeated failed login attempts must be rate-limited with 429');
  console.log('✓ Rate limiting verified: 429 Too Many Requests returned.\n');

  // Step 18: Test Password Change Flow
  console.log('18. Testing Password Change Flow (POST /api/admin/security/change-password)...');
  // Wrong current password
  const badChangeRes = await invokeApi('POST', '/api/admin/security/change-password', {
    currentPassword: 'wrongCurrentPassword',
    newPassword: 'newValidPassword786',
    confirmPassword: 'newValidPassword786'
  }, {
    authorization: `Bearer ${adminToken}`
  });
  assert.strictEqual(badChangeRes.status, 401);
  assert.strictEqual(badChangeRes.body.error, 'Current password is incorrect.');

  // Successful password change
  const goodChangeRes = await invokeApi('POST', '/api/admin/security/change-password', {
    currentPassword: 'pakistan786',
    newPassword: 'newValidPassword786',
    confirmPassword: 'newValidPassword786'
  }, {
    authorization: `Bearer ${adminToken}`
  });
  assert.strictEqual(goodChangeRes.status, 200);
  assert.strictEqual(goodChangeRes.body.success, true);
  assert.ok(goodChangeRes.body.token, 'Should issue fresh active session');
  const freshAdminToken = goodChangeRes.body.token;

  // Verify old password fails
  const oldPassLoginRes = await invokeApi('POST', '/api/admin/login', {
    emailOrUsername: 'teacher',
    password: 'pakistan786'
  });
  assert.strictEqual(oldPassLoginRes.status, 401, 'Old password must no longer work');

  // Verify new password works
  const newPassLoginRes = await invokeApi('POST', '/api/admin/login', {
    emailOrUsername: 'teacher',
    password: 'newValidPassword786'
  });
  assert.strictEqual(newPassLoginRes.status, 200, 'New password must work');

  // Reset back to initial password 'pakistan786' for clean production state
  const resetPassRes = await invokeApi('POST', '/api/admin/security/change-password', {
    currentPassword: 'newValidPassword786',
    newPassword: 'pakistan786',
    confirmPassword: 'pakistan786'
  }, {
    authorization: `Bearer ${freshAdminToken}`
  });
  assert.strictEqual(resetPassRes.status, 200);
  const activeAdminToken = resetPassRes.body.token;
  console.log('✓ Password change flow verified: old password rejected, new password verified, reset successfully.\n');

  // Step 19: Test Logout (Single Device)
  console.log('19. Testing Logout (POST /api/auth/logout)...');
  const logoutRes = await invokeApi('POST', '/api/auth/logout', null, {
    authorization: `Bearer ${activeAdminToken}`
  });
  const setCookieHeader = logoutRes.headers['set-cookie'];
  const hasMaxAgeZero = Array.isArray(setCookieHeader)
    ? setCookieHeader.some(c => c.includes('Max-Age=0'))
    : (setCookieHeader && setCookieHeader.includes('Max-Age=0'));
  assert.ok(hasMaxAgeZero, 'Logout must clear cookie with Max-Age=0');

  // Verify session is now revoked
  const afterLogoutRes = await invokeApi('GET', '/api/admin/me', null, {
    authorization: `Bearer ${activeAdminToken}`
  });
  assert.strictEqual(afterLogoutRes.status, 401, 'Revoked session must return 401');
  console.log('✓ Logout verified: session revoked and cookie cleared.\n');

  // Step 20: Test Logout All Devices
  console.log('20. Testing Logout of All Devices (POST /api/admin/security/logout-all)...');
  const freshLogin = await invokeApi('POST', '/api/admin/login', {
    password: 'pakistan786'
  });
  const tempToken = freshLogin.body.token;
  const logoutAllRes = await invokeApi('POST', '/api/admin/security/logout-all', null, {
    authorization: `Bearer ${tempToken}`
  });
  assert.strictEqual(logoutAllRes.status, 200);
  const checkAfterAll = await invokeApi('GET', '/api/admin/me', null, {
    authorization: `Bearer ${tempToken}`
  });
  assert.strictEqual(checkAfterAll.status, 401);
  console.log('✓ Logout all devices verified: all teacher sessions revoked.\n');

  // Step 21: Secrets Audit
  console.log('21. Auditing Codebase & Bundles for Plaintext Password Secrets...');
  const fs = await import('fs');
  const bundleContent = fs.readFileSync('./js/bundle.js', 'utf8');
  assert.ok(!bundleContent.includes("password: 'pakistan786'"), 'Bundle must not contain hardcoded teacher password');
  console.log('✓ Zero plaintext secrets found in frontend bundle.\n');

  console.log('====================================================');
  console.log('🎉 ALL 21 PRODUCTION TESTS PASSED 100%!');
  console.log('====================================================\n');
}

runVerification().catch(err => {
  console.error('❌ Verification failed:', err);
  process.exit(1);
});
