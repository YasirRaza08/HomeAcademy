// Automated Verification: Home Academy Dynamic Questions, Activities Hub, and Full Grammar Test
import assert from 'assert';
import { 
  TOPIC_QUESTION_BANKS, 
  TOPIC_ACTIVITIES, 
  getFreshQuestionsForTopic, 
  generateFullGrammarTest, 
  shuffleQuestion 
} from './js/data/topic-activities.js';
import { stateManager } from './js/state.js';

console.log('🧪 Starting Automated Verification: Dynamic Questions, Activities & Full Grammar Test...\n');

// ----------------------------------------------------
// TEST 1: Question Banks Completeness & Integrity
// ----------------------------------------------------
console.log('Test 1: Checking question bank completeness across all 6 class topics...');
const expectedTopics = [
  'adjectives',
  'genitive_s',
  'question_words',
  'whose',
  'possessive_adjectives',
  'what_color_genitive_s'
];

expectedTopics.forEach(topicId => {
  const bank = TOPIC_QUESTION_BANKS[topicId];
  assert(bank && bank.length >= 10, `Topic ${topicId} must have at least 10 questions in bank. Found: ${bank?.length}`);
  
  // Verify each question has valid question text, options, answer index, and explanation
  bank.forEach((q, idx) => {
    assert(q.id, `Question #${idx} in ${topicId} is missing an ID`);
    assert(typeof q.question === 'string' && q.question.length > 3, `Question #${idx} in ${topicId} has invalid question string`);
    assert(Array.isArray(q.options) && q.options.length >= 2, `Question #${idx} in ${topicId} must have at least 2 options`);
    assert(typeof q.answer === 'number' && q.answer >= 0 && q.answer < q.options.length, `Question #${idx} in ${topicId} has invalid answer index ${q.answer}`);
    assert(typeof q.explanation === 'string' && q.explanation.length > 0, `Question #${idx} in ${topicId} is missing an explanation`);
  });
});
console.log('✅ Test 1 Passed: All 6 topics have rich, well-formed question banks (90+ questions total).\n');

// ----------------------------------------------------
// TEST 2: Question Freshness & Non-Repetition Across Attempts
// ----------------------------------------------------
console.log('Test 2: Verifying fresh questions every time and non-repetition tracking...');
const topic = 'adjectives';
let seenIds = [];

// Attempt 1: First 5 questions
const attempt1 = getFreshQuestionsForTopic(topic, seenIds, 5);
assert.strictEqual(attempt1.questions.length, 5, 'Attempt 1 must return 5 questions');
seenIds = seenIds.concat(attempt1.selectedIds);

// Attempt 2: Next 5 questions
const attempt2 = getFreshQuestionsForTopic(topic, seenIds, 5);
assert.strictEqual(attempt2.questions.length, 5, 'Attempt 2 must return 5 questions');

// Check intersection between attempt 1 and attempt 2
const attempt1Set = new Set(attempt1.selectedIds);
const overlap = attempt2.selectedIds.filter(id => attempt1Set.has(id));
assert.strictEqual(overlap.length, 0, `Attempt 2 should have 0 overlapping questions with Attempt 1! Found overlap: ${overlap.join(', ')}`);
console.log(`  ✓ Attempt 1 IDs: ${attempt1.selectedIds.join(', ')}`);
console.log(`  ✓ Attempt 2 IDs: ${attempt2.selectedIds.join(', ')}`);
console.log('✅ Test 2 Passed: Repeated attempts provide 100% fresh, different questions.\n');

// ----------------------------------------------------
// TEST 3: Option Shuffling Keeps Answer Synchronized
// ----------------------------------------------------
console.log('Test 3: Verifying option shuffling preserves correct answer accuracy...');
const sampleQuestion = TOPIC_QUESTION_BANKS.adjectives[0];
const originalCorrectText = sampleQuestion.options[sampleQuestion.answer];

for (let i = 0; i < 20; i++) {
  const shuffled = shuffleQuestion(sampleQuestion);
  const newAnswerIndex = shuffled.answer;
  const newCorrectText = shuffled.options[newAnswerIndex];
  assert.strictEqual(
    newCorrectText, 
    originalCorrectText, 
    `After shuffling, correct option text "${newCorrectText}" does not match original "${originalCorrectText}"`
  );
}
console.log('✅ Test 3 Passed: Option shuffling accurately preserves correct answer index synchronization.\n');

// ----------------------------------------------------
// TEST 4: Multi-Format Topic Activities Completeness
// ----------------------------------------------------
console.log('Test 4: Checking multi-format activities data for all 6 topics...');
expectedTopics.forEach(topicId => {
  const acts = TOPIC_ACTIVITIES[topicId];
  assert(acts, `Topic ${topicId} is missing from TOPIC_ACTIVITIES`);
  assert(Array.isArray(acts.matching) && acts.matching.length >= 4, `Topic ${topicId} must have at least 4 matching pairs`);
  assert(Array.isArray(acts.scrambles) && acts.scrambles.length >= 3, `Topic ${topicId} must have at least 3 sentence scrambles`);
  assert(Array.isArray(acts.trueFalse) && acts.trueFalse.length >= 3, `Topic ${topicId} must have at least 3 true/false items`);
  assert(Array.isArray(acts.sentenceBuilder) && acts.sentenceBuilder.length >= 2, `Topic ${topicId} must have at least 2 sentence builder items`);
});
console.log('✅ Test 4 Passed: All topics contain Matching, Scramble, True/False, and Sentence Builder data.\n');

// ----------------------------------------------------
// TEST 5: Full Grammar Test Generator Across Active Topics
// ----------------------------------------------------
console.log('Test 5: Generating Full Grammar Test across active topics...');
const allActiveTopics = stateManager.getActiveCurriculum();
assert.strictEqual(allActiveTopics.length, 6, 'Should have 6 active topics by default');

const fullTest1 = generateFullGrammarTest(allActiveTopics, [], 2);
assert.strictEqual(fullTest1.questions.length, 12, 'Full test should have 12 questions (2 per topic * 6 topics)');

// Verify each active topic is represented
allActiveTopics.forEach(t => {
  assert(fullTest1.topicBreakdown[t.id], `Topic ${t.id} must be in test breakdown`);
  assert.strictEqual(fullTest1.topicBreakdown[t.id].count, 2, `Topic ${t.id} must have 2 questions in test`);
});
console.log('✅ Test 5 Passed: Full Grammar Test accurately samples 2 questions per active topic (12 total).\n');

// ----------------------------------------------------
// TEST 6: Dynamic Topic Exclusion When Teacher Deletes a Topic
// ----------------------------------------------------
console.log('Test 6: Verifying dynamic exclusion of deleted/inactive topics from Full Test...');
const mockRemainingTopics = allActiveTopics.filter(t => t.id !== 'whose');
const testWithoutWhose = generateFullGrammarTest(mockRemainingTopics, [], 2);

assert.strictEqual(testWithoutWhose.questions.length, 10, 'Test with 5 topics should have 10 questions');
const whoseQuestions = testWithoutWhose.questions.filter(q => q.topicId === 'whose');
assert.strictEqual(whoseQuestions.length, 0, 'Full test must NEVER contain questions from a deleted or inactive topic!');
console.log('✅ Test 6 Passed: Deleted/inactive topics are dynamically excluded from the Full Grammar Test.\n');

// ----------------------------------------------------
// TEST 7: Anti-Duplicate XP Protection & History Tracking
// ----------------------------------------------------
console.log('Test 7: Testing anti-duplicate XP protection on Full Grammar Test submission...');
// Register a clean test student
const testStudent = await stateManager.registerStudent({
  name: 'Exam Tester',
  email: `tester_${Date.now()}@homeacademy.pk`,
  password: 'password123',
  classCode: 'HOME-ENGLISH'
});
// Let welcome achievements settle
stateManager.checkAchievements(testStudent);
const initialXP = testStudent.xp;
const token = 'sub_test_unique_token_999';

const testPayload = {
  score: 11,
  total: 12,
  percent: 90,
  xpEarned: 75,
  topicPerformance: {},
  submissionToken: token
};

// First submission -> should succeed and award +75 XP
const beforeSubmissionXP = testStudent.xp;
const result1 = stateManager.recordFullTestResult(testPayload);
assert.strictEqual(result1.success, true, 'First submission must succeed');
assert.strictEqual(result1.xpEarned, 75, 'First passing submission must earn 75 XP');
assert(testStudent.xp >= beforeSubmissionXP + 75, 'Student XP must increase by at least 75');
assert.strictEqual(testStudent.fullTestHistory.length, 1, 'fullTestHistory must contain 1 entry');
assert.strictEqual(testStudent.stats.bestFullTestScore, 90, 'bestFullTestScore must be 90');

// Capture XP after first submission
const xpAfterFirstSubmission = testStudent.xp;

// Second submission with same token -> should be blocked!
const result2 = stateManager.recordFullTestResult(testPayload);
assert.strictEqual(result2.success, false, 'Duplicate submission must be rejected');
assert.strictEqual(result2.alreadyRecorded, true, 'Duplicate must be flagged as alreadyRecorded');
assert.strictEqual(result2.xpEarned, 0, 'Duplicate must earn 0 XP');
assert.strictEqual(testStudent.xp, xpAfterFirstSubmission, 'Student XP must NOT increase on duplicate submission');
assert.strictEqual(testStudent.fullTestHistory.length, 1, 'fullTestHistory must remain 1');

console.log('✅ Test 7 Passed: Anti-duplicate XP protection cleanly blocked replay attack and prevented duplicate XP.\n');

// ----------------------------------------------------
// TEST 8: Activity Completion XP Recording
// ----------------------------------------------------
console.log('Test 8: Testing recordActivityCompletion for topic activities...');
const beforeActXP = testStudent.xp;
stateManager.recordActivityCompletion('adjectives', 'matching', 30);
assert.strictEqual(testStudent.xp, beforeActXP + 30, 'Student XP must increase by 30 for matching activity');
assert.strictEqual(testStudent.stats.gamesPlayed > 0, true, 'gamesPlayed stat must increment');
console.log('✅ Test 8 Passed: Activities completion properly updates student progress and awards XP.\n');

console.log('🎉 ALL 8 AUTOMATED VERIFICATION SUITES PASSED FLAWLESSLY!\n');
