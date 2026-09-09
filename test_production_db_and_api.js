// Automated Verification of Turso Database Layer and API Router
import assert from 'assert';
import { handleApiRequest } from './server/apiRouter.js';
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
        Object.assign(resHeaders, h);
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
  assert.strictEqual(meRes.body.topics.length, 6);
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
  console.log('10. Testing Teacher Admin Login (POST /api/admin/login)...');
  const adminLoginRes = await invokeApi('POST', '/api/admin/login', {
    password: 'pakistan786'
  });
  assert.strictEqual(adminLoginRes.status, 200);
  assert.ok(adminLoginRes.body.token, 'Teacher admin login must return a token');
  const adminToken = adminLoginRes.body.token;
  console.log('✓ Teacher admin logged in successfully.\n');

  // Step 11: Test Teacher Admin Roster (GET /api/admin/students)
  console.log('11. Testing Teacher Admin Roster (GET /api/admin/students)...');
  const rosterRes = await invokeApi('GET', '/api/admin/students', null, {
    authorization: `Bearer ${adminToken}`
  });
  assert.strictEqual(rosterRes.status, 200);
  assert.ok(rosterRes.body.students.length > 0);
  const foundInRoster = rosterRes.body.students.find(s => s.studentId === studentId);
  assert.ok(foundInRoster, 'Student must appear in teacher roster');
  console.log(`✓ Teacher roster contains ${rosterRes.body.students.length} real student(s).\n`);

  console.log('====================================================');
  console.log('🎉 ALL PRODUCTION DATABASE & API TESTS PASSED 100%!');
  console.log('====================================================\n');
}

runVerification().catch(err => {
  console.error('❌ Verification failed:', err);
  process.exit(1);
});
