// Audit Test Suite: Question Bank Validation & Curriculum Integrity
import assert from 'assert';
import { TOPIC_QUESTION_BANKS } from './js/data/topic-activities.js';
import { OFFICIAL_TOPICS } from './js/data/curriculum.js';
import * as db from './data/db.js';

async function auditQuestions() {
  console.log('--- STARTING COMPREHENSIVE QUESTION BANK AUDIT ---');

  const validTopicIds = OFFICIAL_TOPICS.map(t => t.id);
  console.log('Valid Curriculum Topic IDs:', validTopicIds);
  assert.strictEqual(validTopicIds.length, 6, 'Exactly 6 curriculum topics must be defined');

  let totalQuestionsCount = 0;
  const questionIdsSeen = new Set();

  for (const [topicId, questions] of Object.entries(TOPIC_QUESTION_BANKS)) {
    console.log(`\nAuditing Topic: "${topicId}" (${questions.length} questions)...`);
    
    // 1. Validate topic belongs to official curriculum
    assert.ok(validTopicIds.includes(topicId), `Topic "${topicId}" must be one of the official 6 topics`);
    assert.ok(questions.length >= 15, `Topic "${topicId}" must contain at least 15 questions`);

    questions.forEach((q, idx) => {
      totalQuestionsCount++;

      // 2. Validate unique ID
      assert.ok(q.id && typeof q.id === 'string', `Question at index ${idx} in ${topicId} must have an ID string`);
      assert.ok(!questionIdsSeen.has(q.id), `Question ID "${q.id}" must be unique across all banks`);
      questionIdsSeen.add(q.id);

      // 3. Validate topic ID assignment
      assert.strictEqual(q.topicId, topicId, `Question ${q.id} topicId must match parent topic ${topicId}`);

      // 4. Validate Question Text
      assert.ok(q.question && typeof q.question === 'string' && q.question.trim().length > 5,
        `Question ${q.id} must have non-empty, substantive question text`);

      // 5. Validate Options
      assert.ok(Array.isArray(q.options), `Question ${q.id} options must be an array`);
      assert.ok(q.options.length >= 2, `Question ${q.id} must have at least 2 options`);
      q.options.forEach((opt, optIdx) => {
        assert.ok(opt && typeof opt === 'string' && opt.trim().length > 0,
          `Option ${optIdx} in ${q.id} must be non-empty string`);
      });

      // 6. Validate Correct Answer index
      const answerIdx = q.answer !== undefined ? q.answer : q.correctAnswer;
      assert.ok(typeof answerIdx === 'number', `Question ${q.id} answer must be numeric`);
      assert.ok(Number.isInteger(answerIdx), `Question ${q.id} answer must be an integer`);
      assert.ok(answerIdx >= 0 && answerIdx < q.options.length,
        `Question ${q.id} answer index (${answerIdx}) must be within options range [0, ${q.options.length - 1}]`);

      // 7. Validate Explanation
      assert.ok(q.explanation && typeof q.explanation === 'string' && q.explanation.trim().length > 5,
        `Question ${q.id} must have clear, helpful explanation text`);

      // 8. Beginner suitability check (No advanced/unlearned grammar)
      const text = (q.question + ' ' + q.options.join(' ')).toLowerCase();
      const forbiddenAdvanced = ['subjunctive', 'past participle', 'gerundial', 'conditional 3', 'inversion'];
      forbiddenAdvanced.forEach(term => {
        assert.ok(!text.includes(term), `Question ${q.id} should not contain unlearned advanced grammar: ${term}`);
      });
    });

    console.log(`✓ All ${questions.length} questions in "${topicId}" passed validation.`);
  }

  console.log(`\n✓ Total Validated Questions: ${totalQuestionsCount} (Exact count verified across all 6 topics)`);
  assert.strictEqual(totalQuestionsCount, 90, 'Total question bank must contain exactly 90 questions');

  // 9. Verify Randomization of Selection & Order (Requirement 4)
  console.log('\nVerifying question randomization on repetitive requests...');
  const sample1 = db.getQuestionsByTopic('adjectives', 5, true).map(q => q.id);
  const sample2 = db.getQuestionsByTopic('adjectives', 5, true).map(q => q.id);
  const sample3 = db.getQuestionsByTopic('adjectives', 5, true).map(q => q.id);

  console.log('Sample 1 Question IDs:', sample1.join(', '));
  console.log('Sample 2 Question IDs:', sample2.join(', '));
  console.log('Sample 3 Question IDs:', sample3.join(', '));

  // The chance of 3 random draws of 5 from 15 having identical order and items is (5! / 15^5) ~ 0.0001
  const allIdentical = sample1.join(',') === sample2.join(',') && sample2.join(',') === sample3.join(',');
  assert.ok(!allIdentical, 'Repeating requests must produce randomized order and question selection');
  console.log('✓ Question randomization confirmed: quizzes vary across attempts.');

  console.log('\n======================================================');
  console.log('🎉 QUESTION BANK AUDIT PASSED 100%!');
  console.log('======================================================');
}

auditQuestions().catch(err => {
  console.error('Question Audit Failed:', err);
  process.exit(1);
});
