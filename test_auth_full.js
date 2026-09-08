// Automated End-to-End Test for Home Academy Secure Student Login & Password Auth

import { generateSalt, hashPassword, verifyPassword } from './js/utils/crypto.js';
import { StateManager } from './js/state.js';

// Setup Mock LocalStorage for Node environment
class MockLocalStorage {
  constructor() {
    this.store = {};
  }
  getItem(key) {
    return this.store[key] || null;
  }
  setItem(key, value) {
    this.store[key] = String(value);
  }
  removeItem(key) {
    delete this.store[key];
  }
  clear() {
    this.store = {};
  }
}

global.localStorage = new MockLocalStorage();
global.window = {
  dispatchEvent: () => {}
};

async function runTests() {
  console.log('🧪 ===================================================');
  console.log('🧪 RUNNING HOME ACADEMY AUTH & PASSWORD SUITE');
  console.log('🧪 ===================================================\n');

  let passedTests = 0;
  let totalTests = 0;

  function assert(condition, testName) {
    totalTests++;
    if (condition) {
      console.log(`  ✅ PASS: ${testName}`);
      passedTests++;
    } else {
      console.error(`  ❌ FAIL: ${testName}`);
      process.exitCode = 1;
    }
  }

  // TEST 1: Cryptographic Salt & SHA-256 Hashing
  console.log('▶ Test Category 1: Cryptography & Security');
  const salt1 = generateSalt();
  const salt2 = generateSalt();
  assert(salt1 !== salt2, 'Salts are cryptographically unique per user');
  assert(salt1.length === 32, 'Salt length is 32 hexadecimal characters');

  const hashA = await hashPassword('myPassword123', salt1);
  const hashB = await hashPassword('myPassword123', salt2);
  assert(hashA !== hashB, 'Different salts produce different hashes for identical passwords');
  assert(hashA.length === 64, 'SHA-256 hash length is 64 hex characters');

  const verifyValid = await verifyPassword('myPassword123', hashA, salt1);
  assert(verifyValid === true, 'verifyPassword returns true for matching password');

  const verifyInvalid = await verifyPassword('wrongPassword', hashA, salt1);
  assert(verifyInvalid === false, 'verifyPassword returns false for wrong password');

  // TEST 2: Student Registration
  console.log('\n▶ Test Category 2: Student Registration');
  const sm = new StateManager();

  // Test invalid class code rejection
  let caughtCodeErr = false;
  try {
    await sm.registerStudent({
      name: 'Test Student',
      email: 'test@example.com',
      password: 'validPass123',
      classCode: 'WRONG-CODE'
    });
  } catch (err) {
    caughtCodeErr = true;
    assert(err.message.includes('Invalid class code'), 'Rejects invalid class code');
  }
  assert(caughtCodeErr, 'Throws error when class code is wrong');

  // Test invalid password length (< 4 chars)
  let caughtShortPass = false;
  try {
    await sm.registerStudent({
      name: 'Test Student',
      email: 'test@example.com',
      password: '123',
      classCode: 'HOME-ENGLISH'
    });
  } catch (err) {
    caughtShortPass = true;
    assert(err.message.includes('at least 4 characters'), 'Rejects password shorter than 4 characters');
  }
  assert(caughtShortPass, 'Throws error when password is too short');

  // Register Student 1: Yasir Ahmad
  const student1 = await sm.registerStudent({
    name: 'Yasir Ahmad',
    email: 'yasir@example.com',
    password: 'securePass2026',
    classCode: 'HOME-ENGLISH',
    avatar: '🦁'
  });

  assert(student1.name === 'Yasir Ahmad', 'Student 1 registered with correct name');
  assert(student1.email === 'yasir@example.com', 'Student 1 registered with correct email');
  assert(student1.password === undefined, 'Plaintext password is NEVER stored in student record');
  assert(typeof student1.passwordHash === 'string' && student1.passwordHash.length === 64, 'passwordHash is saved as 64-char SHA-256');
  assert(typeof student1.passwordSalt === 'string' && student1.passwordSalt.length === 32, 'passwordSalt is saved as unique 32-char salt');
  assert(student1.xp === 0 && student1.level === 1 && student1.streak === 0, 'New student starts at 0 XP, Level 1, 0 streak');
  assert(sm.getCurrentStudent().id === student1.id, 'Student 1 is automatically logged in after registration');

  // Register duplicate email rejection
  let caughtDupEmail = false;
  try {
    await sm.registerStudent({
      name: 'Yasir Impersonator',
      email: 'yasir@example.com',
      password: 'otherPass123',
      classCode: 'HOME-ENGLISH'
    });
  } catch (err) {
    caughtDupEmail = true;
    assert(err.message.includes('already exists'), 'Rejects duplicate registration with existing email');
  }
  assert(caughtDupEmail, 'Throws error on duplicate email registration');

  // Register Student 2: Zainab Fatima
  const student2 = await sm.registerStudent({
    name: 'Zainab Fatima',
    email: 'zainab@example.com',
    password: 'zainabSecret456',
    classCode: 'HOME-ENGLISH',
    avatar: '🌸'
  });

  assert(student2.name === 'Zainab Fatima', 'Student 2 registered successfully');
  assert(sm.state.students.length === 2, 'Two students now enrolled in the academy');
  assert(sm.getCurrentStudent().id === student2.id, 'Active student switched to Student 2');

  // TEST 3: Progress Accumulation & Isolation
  console.log('\n▶ Test Category 3: Progress Accumulation & Account Isolation');
  // Switch back to Student 1 and award XP and quiz progress
  sm.setCurrentStudent(student1.id);
  assert(sm.getCurrentStudent().name === 'Yasir Ahmad', 'Switched to Yasir Ahmad');
  sm.addXP(150, 'Completed Lesson Practice');
  sm.recordTopicProgress('topic_01', 'quiz', { scorePercent: 90, correctCount: 9, totalCount: 10 });
  const yasirEarnedXP = sm.getCurrentStudent().xp;
  assert(yasirEarnedXP === 275, `Yasir accumulated expected XP (150 practice + achievements + quiz bonus = ${yasirEarnedXP})`);
  assert(sm.getCurrentStudent().topicProgress['topic_01'].quizScore === 90, 'Yasir completed topic_01 with 90% score');

  // Check Zainab Fatima's progress remains untouched (0 XP)
  const zainabRecord = sm.state.students.find(s => s.id === student2.id);
  assert(zainabRecord.xp === 0, "Zainab's XP is still 0 (isolated from Yasir)");
  assert(!zainabRecord.topicProgress['topic_01'], "Zainab's topic progress is clean");

  // TEST 4: Logout & Session Clearing
  console.log('\n▶ Test Category 4: Logout & Session Clearing');
  sm.logout();
  assert(sm.getCurrentStudent() === null, 'Current student is null after logout');
  assert(sm.checkActiveSession() === null, 'Active session is null after logout');

  // TEST 5: Student Login with Password Verification
  console.log('\n▶ Test Category 5: Student Login with Email + Password');
  // Test wrong password
  let caughtWrongPass = false;
  try {
    await sm.loginStudent({
      email: 'yasir@example.com',
      password: 'incorrectPassword'
    });
  } catch (err) {
    caughtWrongPass = true;
    assert(err.message.includes('Incorrect password'), 'Rejects login with incorrect password');
  }
  assert(caughtWrongPass, 'Throws error on wrong password');
  assert(sm.getCurrentStudent() === null, 'Student remains logged out after failed login');

  // Test non-existent email
  let caughtUnknownEmail = false;
  try {
    await sm.loginStudent({
      email: 'nobody@example.com',
      password: 'somePassword123'
    });
  } catch (err) {
    caughtUnknownEmail = true;
    assert(err.message.includes('No student account found'), 'Rejects login with unknown email');
  }
  assert(caughtUnknownEmail, 'Throws error on unknown email');

  // Test successful login with correct password
  const loggedInStudent = await sm.loginStudent({
    email: 'yasir@example.com',
    password: 'securePass2026'
  });

  assert(loggedInStudent.id === student1.id, 'Logged in student ID matches Yasir Ahmad');
  assert(loggedInStudent.xp === yasirEarnedXP, `Previous ${yasirEarnedXP} XP restored completely and unchanged`);
  assert(loggedInStudent.topicProgress['topic_01'].quizScore === 90, 'Topic progress restored completely');
  assert(sm.getCurrentStudent().name === 'Yasir Ahmad', 'Active session reflects Yasir Ahmad');

  // TEST 6: Student 2 Login & Isolation Check
  console.log('\n▶ Test Category 6: Multi-Student Switching with Authentication');
  sm.logout();
  assert(sm.getCurrentStudent() === null, 'Logged out Yasir Ahmad');

  const loggedInZainab = await sm.loginStudent({
    email: 'zainab@example.com',
    password: 'zainabSecret456'
  });
  assert(loggedInZainab.id === student2.id, 'Logged in student ID matches Zainab Fatima');
  assert(loggedInZainab.xp === 0, "Zainab's clean 0 XP loaded");
  assert(sm.getCurrentStudent().name === 'Zainab Fatima', 'Active session reflects Zainab Fatima');

  // TEST 7: Teacher / Admin Separation
  console.log('\n▶ Test Category 7: Teacher / Admin Separation');
  assert(sm.state.isAdmin === false, 'Admin status is false by default');
  sm.setAdmin(true);
  assert(sm.state.isAdmin === true, 'Admin status toggled to true');
  // Passwords are never in the student records shown to admin
  sm.state.students.forEach(s => {
    assert(s.password === undefined, `Student ${s.name} record has no plaintext password`);
  });

  console.log('\n===================================================');
  console.log(`🎉 TEST SUMMARY: ${passedTests} / ${totalTests} TESTS PASSED`);
  console.log('===================================================');
}

runTests().catch(err => {
  console.error('Fatal Test Suite Error:', err);
  process.exit(1);
});
