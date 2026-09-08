// Automated test suite for Home Academy Roleplay Presentations system
import assert from 'assert';
import fs from 'fs';
import path from 'path';

// Mock browser globals for stateManager
globalThis.window = {
  dispatchEvent: () => {},
  addEventListener: () => {},
  removeEventListener: () => {}
};
globalThis.CustomEvent = class CustomEvent {
  constructor(name, opts) {
    this.name = name;
    this.detail = opts?.detail;
  }
};
globalThis.localStorage = {
  _store: {},
  getItem(k) { return this._store[k] || null; },
  setItem(k, v) { this._store[k] = String(v); },
  removeItem(k) { delete this._store[k]; },
  clear() { this._store = {}; }
};

import { OFFICIAL_ROLEPLAYS, validateStudentSentence } from './js/data/roleplay-data.js';
import { stateManager } from './js/state.js';

console.log('--- STARTING ROLEPLAY PRESENTATIONS VERIFICATION ---');

// 1. Verify 5 official roleplays integrity
assert.strictEqual(OFFICIAL_ROLEPLAYS.length, 5, 'Must have exactly 5 official physical class presentations');
const expectedTitles = [
  "A Friend Visits Another Friend's House",
  "A Police Officer Asks Questions About People, Things and Possessions",
  "A Person Visits His Friend's House and Asks About Family Members and Their Jobs",
  "A Person Reports His Lost Children at the Police Station",
  "Two Friends Talk About Their New School, College or Workplace"
];

OFFICIAL_ROLEPLAYS.forEach((rp, idx) => {
  assert.strictEqual(rp.title, expectedTitles[idx], `Roleplay ${idx+1} title mismatch`);
  assert(rp.grammarFocus && rp.grammarFocus.length > 0, `Roleplay ${idx+1} missing grammarFocus`);
  assert(rp.grammarDescription && rp.grammarDescription.length > 0, `Roleplay ${idx+1} missing grammarDescription`);
  assert(rp.scenario && rp.scenario.length > 0, `Roleplay ${idx+1} missing scenario`);
  assert(Array.isArray(rp.spokenExpressions) && rp.spokenExpressions.length >= 5, `Roleplay ${idx+1} spoken expressions too few`);
  assert(Array.isArray(rp.keyVocab) && rp.keyVocab.length >= 4, `Roleplay ${idx+1} key vocab too few`);
  assert(Array.isArray(rp.practiceQuestions) && rp.practiceQuestions.length >= 3, `Roleplay ${idx+1} practice questions too few`);
  assert(Array.isArray(rp.sentencePrompts) && rp.sentencePrompts.length >= 2, `Roleplay ${idx+1} sentence prompts too few`);
  assert(rp.miniRoleplay && Array.isArray(rp.miniRoleplay.turns) && rp.miniRoleplay.turns.length >= 4, `Roleplay ${idx+1} mini roleplay dialogue turns too few`);
  assert(Array.isArray(rp.speakingSentences) && rp.speakingSentences.length >= 3, `Roleplay ${idx+1} speaking sentences too few`);
});
console.log('✓ Test 1: All 5 official physical class presentations verified with complete data.');

// 2. Roleplay 5 Grammar Test: "There is" vs "There are" singular vs plural
const rp5 = OFFICIAL_ROLEPLAYS[4];
assert(rp5.grammarFocus.includes('There is') && rp5.grammarFocus.includes('There are'), 'Roleplay 5 must focus on There is / There are');
const hasSingularQ = rp5.practiceQuestions.some(q => q.explanation.includes('There is') || q.question.includes('library'));
const hasPluralQ = rp5.practiceQuestions.some(q => q.explanation.includes('There are') || q.question.includes('labs'));
assert(hasSingularQ && hasPluralQ, 'Roleplay 5 must include both singular (There is) and plural (There are) practice');
assert.strictEqual(rp5.spokenExpressions.length, 7, 'Roleplay 5 must have 7 spoken expressions taught by Sir Zubair');
console.log('✓ Test 2: Roleplay 5 (There is vs There are singular/plural) verified.');

// 3. Sentence Validator Flexibility Test
const prompt1 = OFFICIAL_ROLEPLAYS[0].sentencePrompts[0]; // Describe friend's house with adjective
const vResult1 = validateStudentSentence('rp_01', prompt1.id, "Your house is really beautiful and clean.");
assert.strictEqual(vResult1.valid, true, 'Valid adjective sentence must pass');

const vResultFail = validateStudentSentence('rp_01', prompt1.id, "Hello.");
assert.strictEqual(vResultFail.valid, false, 'Sentence without target adjectives or minimum length must fail gracefully');

const prompt5_1 = OFFICIAL_ROLEPLAYS[4].sentencePrompts[0]; // There is a library in my school
const vResult5a = validateStudentSentence('rp_05', prompt5_1.id, "There is a big playground in our school.");
assert.strictEqual(vResult5a.valid, true, 'There is sentence must pass');

const prompt5_2 = OFFICIAL_ROLEPLAYS[4].sentencePrompts[1]; // There are many classrooms
const vResult5b = validateStudentSentence('rp_05', prompt5_2.id, "There are many classrooms in our college.");
assert.strictEqual(vResult5b.valid, true, 'There are sentence must pass');
console.log('✓ Test 3: Sentence validator works intelligently without rigid word-for-word memorization.');

// 4. Student Real Progress & Anti-Duplicate XP
localStorage.clear();
stateManager.loadState();

// Join new student
const testStudent = await stateManager.joinClass('Hamza Tariq', 'HOME-ENGLISH', '🦁');
assert(testStudent, 'Student must be created');
const initialProg = stateManager.getStudentRoleplayProgress(testStudent.id);
assert.strictEqual(initialProg.completedCount, 0, 'Initial roleplay completed count must be 0');
assert.strictEqual(initialProg.percent, 0, 'Initial roleplay progress percent must be 0%');
assert.strictEqual(testStudent.xp, 0, 'Initial student XP must be 0');
console.log('✓ Test 4a: Newly joined student starts with 0% roleplay progress and 0 fake data.');

// Complete Roleplay 1 with 100% score (perfect)
const token1 = 'token_test_123';
const completionRes = stateManager.recordRoleplayCompletion('rp_01', 100, token1);
assert.strictEqual(completionRes.success, true);
assert.strictEqual(completionRes.xpEarned, 50, 'Perfect score awards 50 XP');

const studentAfter = stateManager.getCurrentStudent();
const earnedXP = studentAfter.xp;
assert(earnedXP >= 50, 'Student XP must have increased by at least 50');
const progAfter = stateManager.getStudentRoleplayProgress(studentAfter.id);
assert.strictEqual(progAfter.completedCount, 1, 'Completed count should be 1');
assert.strictEqual(progAfter.percent, 20, '1 of 5 roleplays is 20%');

// Test anti-duplicate token protection
const duplicateAttempt = stateManager.recordRoleplayCompletion('rp_01', 100, token1);
assert.strictEqual(duplicateAttempt.xpEarned, 0, 'Duplicate submission token must not award duplicate XP');
assert.strictEqual(studentAfter.xp, earnedXP, 'Student XP must remain unchanged without duplicates');
console.log('✓ Test 4b: Real XP awarded and duplicate token protection verified.');

// 5. Admin Management of Roleplay Presentations
stateManager.verifyTeacherLogin('pakistan786');
assert.strictEqual(stateManager.state.isAdmin, true, 'Sir Zubair logged in');

// Toggle active
stateManager.adminToggleRoleplayActive('rp_02');
assert.strictEqual(stateManager.getRoleplayById('rp_02').active, false, 'Roleplay 2 toggled inactive');
stateManager.adminToggleRoleplayActive('rp_02');
assert.strictEqual(stateManager.getRoleplayById('rp_02').active, true, 'Roleplay 2 toggled back active');

// Update Roleplay
stateManager.adminUpdateRoleplay('rp_01', { title: "A Friend Visits Another Friend's Beautiful House" });
assert.strictEqual(stateManager.getRoleplayById('rp_01').title, "A Friend Visits Another Friend's Beautiful House");

// Reset to official 5
stateManager.adminResetRoleplays();
assert.strictEqual(stateManager.getAllRoleplays().length, 5, 'Reset restores exactly 5 official presentations');
assert.strictEqual(stateManager.getRoleplayById('rp_01').title, "A Friend Visits Another Friend's House");
console.log('✓ Test 5: Admin toggle, update, and reset roleplays verified.');

console.log('\n========================================');
console.log('🎉 ALL ROLEPLAY PRESENTATION TESTS PASSED!');
console.log('========================================');
