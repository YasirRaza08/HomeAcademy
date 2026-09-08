// Automated Verification Test for Side-by-Side Student & Teacher Login and Teacher Portal Security

import { StateManager } from './js/state.js';
import { generateSalt, hashPassword, verifyPassword } from './js/utils/crypto.js';

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

async function runSideBySideTests() {
  console.log('🧪 ===================================================');
  console.log('🧪 RUNNING HOME ACADEMY SIDE-BY-SIDE AUTH & TEACHER SUITE');
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

  const sm = new StateManager();

  // ===================================================
  // 1. LEFT: STUDENT LOGIN TESTS
  // ===================================================
  console.log('▶ Test Category 1: Student Login (LEFT PANEL)');

  // Register Student: Yasir Ahmad
  const student = await sm.registerStudent({
    name: 'Yasir Ahmad',
    email: 'yasir.student@example.com',
    password: 'studentPassword123',
    classCode: 'HOME-ENGLISH',
    avatar: '🦁'
  });

  assert(student.name === 'Yasir Ahmad', 'Student registered with correct name');
  assert(student.email === 'yasir.student@example.com', 'Student registered with correct email');
  assert(student.password === undefined, 'No plaintext password saved for student');
  assert(typeof student.passwordHash === 'string' && student.passwordHash.length === 64, 'Salted SHA-256 password hash created');

  // Accumulate XP and quiz progress
  sm.addXP(100, 'Vocabulary drill practice');
  sm.recordTopicProgress('topic_01', 'quiz', { scorePercent: 90, correctCount: 9, totalCount: 10 });
  const accumulatedXP = sm.getCurrentStudent().xp;
  assert(accumulatedXP > 0, `Student earned progress (XP: ${accumulatedXP})`);

  // Student Logout
  sm.logout();
  assert(sm.getCurrentStudent() === null, 'Student logged out cleanly');

  // Failed login with wrong password
  let studentWrongPass = false;
  try {
    await sm.loginStudent({
      email: 'yasir.student@example.com',
      password: 'badPassword'
    });
  } catch (err) {
    studentWrongPass = true;
    assert(err.message.includes('Incorrect password'), 'Student login rejects invalid password');
  }
  assert(studentWrongPass, 'Throws on wrong student password');

  // Successful Student Login
  const loggedInStudent = await sm.loginStudent({
    email: 'yasir.student@example.com',
    password: 'studentPassword123'
  });
  assert(loggedInStudent.id === student.id, 'Logged in student ID matches original student');
  assert(loggedInStudent.xp === accumulatedXP, 'Student XP is 100% preserved and restored');
  assert(loggedInStudent.topicProgress['topic_01'].quizScore === 90, 'Student topic quiz score is preserved');
  assert(sm.state.isAdmin === false, 'Student login does NOT grant admin/teacher access');

  // ===================================================
  // 2. RIGHT: TEACHER PORTAL LOGIN TESTS
  // ===================================================
  console.log('\n▶ Test Category 2: Teacher Portal Login (RIGHT PANEL)');

  // Initial teacher password check
  assert(sm.state.teacherAuth.password === 'pakistan786', 'Initial teacher password is pakistan786');

  // Test teacher login with password only (no email required)
  sm.setAdmin(false);
  const teacherLoginPassOnlySuccess = sm.verifyTeacherLogin('pakistan786');
  assert(teacherLoginPassOnlySuccess === true, 'Teacher login with just Password (no email) succeeds with pakistan786');
  assert(sm.state.isAdmin === true, 'Teacher login grants admin status');

  // Test backward compatibility: teacher login with 2 arguments
  sm.setAdmin(false);
  const teacherLoginTwoArgSuccess = sm.verifyTeacherLogin('teacher', 'pakistan786');
  assert(teacherLoginTwoArgSuccess === true, 'Teacher login via legacy 2-arguments succeeds');
  assert(sm.state.isAdmin === true, 'Teacher login via 2-arguments grants admin status');

  // Test teacher login with empty password
  sm.setAdmin(false);
  let caughtEmptyPass = false;
  try {
    sm.verifyTeacherLogin('');
  } catch (err) {
    caughtEmptyPass = true;
    assert(err.message.includes('Please enter the Teacher Password'), 'Empty teacher password is rejected');
  }
  assert(caughtEmptyPass, 'Throws error on empty teacher password');

  // Test teacher login with wrong password (e.g. admin123)
  sm.setAdmin(false);
  let caughtWrongPassErr = false;
  try {
    sm.verifyTeacherLogin('admin123');
  } catch (err) {
    caughtWrongPassErr = true;
    assert(err.message.includes('Incorrect teacher password'), 'Wrong password is rejected');
  }
  assert(caughtWrongPassErr, 'Throws error when trying wrong teacher password');
  assert(sm.state.isAdmin === false, 'Admin status remains false after failed login');

  // ===================================================
  // 3. TEACHER SECURITY SETTINGS: CHANGE PASSWORD
  // ===================================================
  console.log('\n▶ Test Category 3: Teacher Portal Security Settings (Change Password)');

  // Test updating with wrong current password
  let caughtBadCurrent = false;
  try {
    sm.updateTeacherPassword('wrongCurrentPassword', 'newSecret2026');
  } catch (err) {
    caughtBadCurrent = true;
    assert(err.message.includes('Current teacher password does not match'), 'Rejects wrong current password');
  }
  assert(caughtBadCurrent, 'Throws error on bad current password');

  // Test updating with password too short
  let caughtShortNewPass = false;
  try {
    sm.updateTeacherPassword('pakistan786', '123');
  } catch (err) {
    caughtShortNewPass = true;
    assert(err.message.includes('at least 6 characters'), 'Rejects new password shorter than 6 characters');
  }
  assert(caughtShortNewPass, 'Throws error on short new password');

  // Test successful teacher password change
  const changeResult = sm.updateTeacherPassword('pakistan786', 'lahore999');
  assert(changeResult === true, 'Successfully updated teacher password to lahore999');
  assert(sm.state.teacherAuth.password === 'lahore999', 'Stored teacher password updated');

  // Verify old password pakistan786 NO LONGER works
  let oldPassFails = false;
  try {
    sm.verifyTeacherLogin('pakistan786');
  } catch (err) {
    oldPassFails = true;
    assert(err.message.includes('Incorrect teacher password'), 'Initial password pakistan786 no longer accepted after update');
  }
  assert(oldPassFails, 'Throws error when using old password after change');

  // Verify new password lahore999 works
  sm.setAdmin(false);
  const newPassLoginSuccess = sm.verifyTeacherLogin('lahore999');
  assert(newPassLoginSuccess === true, 'Login with new password lahore999 succeeds');
  assert(sm.state.isAdmin === true, 'Admin status granted with updated password');

  // ===================================================
  // 4. CLASS SETTINGS & PRIVATE CODE MANAGEMENT
  // ===================================================
  console.log('\n▶ Test Category 4: Class Settings & Private Class Code');

  assert(sm.state.classInfo.code === 'HOME-ENGLISH', 'Default class code is HOME-ENGLISH');
  assert(sm.state.classInfo.teacher === 'Sir Zubair', 'Default class teacher is Sir Zubair');

  // Update class code to ACADEMY-2026
  sm.updateClassSettings({
    name: 'Home Academy: Advanced English Program',
    code: 'ACADEMY-2026',
    teacher: 'Sir Zubair'
  });

  assert(sm.state.classInfo.code === 'ACADEMY-2026', 'Updated class code is ACADEMY-2026');
  assert(sm.state.classInfo.name === 'Home Academy: Advanced English Program', 'Updated class name persisted');
  assert(sm.state.classInfo.teacher === 'Sir Zubair', 'Class teacher Sir Zubair is properly stored');

  // Register new student requires the updated code
  let caughtOldCode = false;
  try {
    await sm.registerStudent({
      name: 'Bilal Khan',
      email: 'bilal@example.com',
      password: 'bilalPass123',
      classCode: 'HOME-ENGLISH'
    });
  } catch (err) {
    caughtOldCode = true;
    assert(err.message.includes('Invalid class code'), 'Old class code is now rejected');
  }
  assert(caughtOldCode, 'Throws error using outdated class code');

  // Register with updated code succeeds
  const newStudentWithUpdatedCode = await sm.registerStudent({
    name: 'Bilal Khan',
    email: 'bilal@example.com',
    password: 'bilalPass123',
    classCode: 'ACADEMY-2026'
  });
  assert(newStudentWithUpdatedCode.name === 'Bilal Khan', 'New student registered successfully with updated class code');

  // Reset class code back to HOME-ENGLISH for consistency
  sm.updateClassSettings({
    name: 'Home Academy: English Language Program',
    code: 'HOME-ENGLISH',
    teacher: 'Sir Zubair'
  });
  // Reset password back to pakistan786 for default state
  // ===================================================
  // 5. STRICT SECURITY: ZERO PERSISTENCE OF ADMIN ACCESS
  // ===================================================
  console.log('\n▶ Test Category 5: Strict Portal Lock (Cannot access without password in login section)');

  // Teacher logs in with active password (lahore999)
  sm.verifyTeacherLogin('lahore999');
  assert(sm.state.isAdmin === true, 'Admin status active in current session');

  // Trigger state saving
  sm.saveState();

  // Verify saved JSON in localStorage NEVER has isAdmin: true
  const storedJson = JSON.parse(global.localStorage.getItem('home_academy_v2_clean'));
  assert(storedJson.isAdmin === false, 'Stored localStorage state strictly has isAdmin: false');

  // Reload state in a new StateManager instance (simulating browser restart or student opening site)
  const reloadedSm = new StateManager();
  assert(reloadedSm.state.isAdmin === false, 'Reloaded StateManager strictly has isAdmin: false');

  // Attempting to access teacher portal without password is blocked
  assert(reloadedSm.state.isAdmin === false, 'Teacher portal is 100% locked on reload');

  // Teacher MUST provide password at login section to unlock
  reloadedSm.verifyTeacherLogin('lahore999');
  assert(reloadedSm.state.isAdmin === true, 'Teacher portal unlocked only after entering password in login section');

  // Logging out resets isAdmin to false immediately
  reloadedSm.logout();
  assert(reloadedSm.state.isAdmin === false, 'Logout immediately revokes admin status');

  // Reset password back to pakistan786 for clean initial defaults
  reloadedSm.verifyTeacherLogin('lahore999');
  reloadedSm.updateTeacherPassword('lahore999', 'pakistan786');
  reloadedSm.logout();
  assert(reloadedSm.state.teacherAuth.password === 'pakistan786', 'Reset default teacher password back to pakistan786');

  console.log('\n===================================================');
  console.log(`🎉 TEST SUMMARY: ${passedTests} / ${totalTests} TESTS PASSED`);
  console.log('===================================================');
}

runSideBySideTests().catch(err => {
  console.error('Fatal Test Suite Error:', err);
  process.exit(1);
});
