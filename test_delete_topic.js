// Automated Test for Delete Topic Functionality in Curriculum & Questions Manager
import { StateManager } from './js/state.js';
import { OFFICIAL_TOPICS } from './js/data/curriculum.js';

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

async function runDeleteTopicTests() {
  console.log('🧪 ===================================================');
  console.log('🧪 RUNNING CURRICULUM TOPIC DELETION TEST SUITE');
  console.log('🧪 ===================================================\n');

  let passed = 0;
  let total = 0;

  function assert(condition, name) {
    total++;
    if (condition) {
      console.log(`  ✅ PASS: ${name}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${name}`);
      process.exitCode = 1;
    }
  }

  // 1. Initial State
  const sm = new StateManager();
  console.log('▶ Test Category 1: Initial Curriculum Setup');
  assert(sm.state.curriculumTopics.length === 6, 'Initial curriculum has exactly 6 topics');
  assert(sm.getActiveCurriculum().length === 6, 'All 6 topics are active initially');

  // 2. Delete Topic ("whose")
  console.log('\n▶ Test Category 2: Deleting a Topic');
  const deleted = sm.adminDeleteTopic('whose');
  assert(deleted && deleted.id === 'whose', 'adminDeleteTopic returns the deleted topic');
  assert(sm.state.curriculumTopics.length === 5, 'Curriculum topics length reduced from 6 to 5');
  assert(!sm.state.curriculumTopics.some(t => t.id === 'whose'), 'Deleted topic is removed from state array');
  assert(!sm.getActiveCurriculum().some(t => t.id === 'whose'), 'Deleted topic is not returned in getActiveCurriculum()');

  // 3. Smooth Renumbering
  console.log('\n▶ Test Category 3: Topic Renumbering');
  const numbers = sm.state.curriculumTopics.map(t => t.number);
  assert(JSON.stringify(numbers) === JSON.stringify(['01', '02', '03', '04', '05']), 'Remaining topics are cleanly renumbered 01 through 05');

  // 4. Error Handling
  console.log('\n▶ Test Category 4: Error Handling on Missing or Invalid ID');
  let threwEmpty = false;
  try {
    sm.adminDeleteTopic('');
  } catch (err) {
    threwEmpty = true;
    assert(err.message.includes('required'), 'Rejects empty topic ID with descriptive error');
  }
  assert(threwEmpty, 'Throws error when deleting with empty topic ID');

  let threwNotFound = false;
  try {
    sm.adminDeleteTopic('non_existent_topic_xyz');
  } catch (err) {
    threwNotFound = true;
    assert(err.message.includes('not found'), 'Rejects non-existent topic ID');
  }
  assert(threwNotFound, 'Throws error when deleting non-existent topic');

  // 5. Add New Topic & Delete
  console.log('\n▶ Test Category 5: Add New Topic & Subsequent Deletion');
  const newTopic = sm.adminAddTopic({
    title: 'Future Tense Drill',
    subtitle: 'Will / Won\'t for promises and predictions',
    active: true
  });
  assert(sm.state.curriculumTopics.length === 6, 'Adding new topic increases length to 6');
  assert(newTopic.number === '06', 'New topic receives next sequential number 06');

  sm.adminDeleteTopic(newTopic.id);
  assert(sm.state.curriculumTopics.length === 5, 'Deleting custom topic reduces length back to 5');

  // 6. Persistence across instances
  console.log('\n▶ Test Category 6: Persistence in LocalStorage');
  const sm2 = new StateManager();
  assert(sm2.state.curriculumTopics.length === 5, 'Reloaded StateManager remembers that topic was deleted (5 topics)');
  assert(!sm2.state.curriculumTopics.some(t => t.id === 'whose'), 'Deleted topic remains absent after reload');

  // 7. Reset Curriculum
  console.log('\n▶ Test Category 7: Restoring Default Curriculum');
  sm2.adminResetCurriculum();
  assert(sm2.state.curriculumTopics.length === 6, 'Reset restores official curriculum length to 6');
  assert(sm2.state.curriculumTopics.some(t => t.id === 'whose'), 'Topic "whose" is restored');

  const sm3 = new StateManager();
  assert(sm3.state.curriculumTopics.length === 6, 'Reloaded StateManager retains restored default curriculum');

  console.log('\n===================================================');
  console.log(`🎉 TEST SUMMARY: ${passed} / ${total} TESTS PASSED`);
  console.log('===================================================');

  if (passed !== total) {
    process.exit(1);
  }
}

runDeleteTopicTests();
