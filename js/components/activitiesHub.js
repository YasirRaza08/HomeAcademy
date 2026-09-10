// Home Academy Multi-Format Grammar Activities Hub
// Comprehensive interactive practice modes:
// 1. Vocabulary Practice (flashcards with audio pronunciation & definitions)
// 2. Fill in the Blanks (complete sentences with missing grammar words)
// 3. Sentence Building (construct sentences with touch-friendly chips)
// 4. Multiple Choice Questions (MCQs with instant explanation)
// 5. Speaking Practice (listen & repeat aloud with speech practice)
// + Sentence Scramble, Pair Matching, and True or False

import { stateManager } from '../state.js';
import { sound } from '../audio.js';
import { fireConfetti } from '../confetti.js';
import { TOPIC_ACTIVITIES, TOPIC_QUESTION_BANKS, shuffleArray } from '../data/topic-activities.js';
import { renderConceptVisual } from './creativeVisuals.js';
import { 
  puzzleIcon, refreshIcon, checkCircleIcon, pencilIcon, bookIcon, 
  checkIcon, trophyIcon, gamepadIcon, graduationCapIcon, infoIcon,
  speakerIcon, micIcon, arrowLeftIcon
} from './icons.js';

// Browser speech synthesis helper for clear pronunciation
function playPronunciation(text) {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.88;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
      return true;
    } catch (e) {
      console.warn('Speech error:', e);
    }
  }
  sound.playClick();
  return false;
}

export function renderActivitiesHub(container, onNavigate, initialTopicId = null, initialActivityType = null) {
  const student = stateManager.getCurrentStudent();
  const activeTopics = stateManager.getActiveCurriculum();

  let selectedTopicId = initialTopicId || (activeTopics.length > 0 ? activeTopics[0].id : 'adjectives');
  let currentActivity = initialActivityType || null; 
  // 'vocab' | 'fill' | 'builder' | 'mcq' | 'speaking' | 'scramble' | 'matching' | 'true_false'

  function render() {
    if (!currentActivity) {
      renderActivitySelector();
    } else {
      renderActivityRunner();
    }
  }

  // --- View 1: Activities Hub Selector ---
  function renderActivitySelector() {
    const topicData = TOPIC_ACTIVITIES[selectedTopicId] || TOPIC_ACTIVITIES.adjectives;
    const activeTopicObj = activeTopics.find(t => t.id === selectedTopicId) || activeTopics[0];

    container.innerHTML = `
      <div class="container" style="padding-top: 24px; padding-bottom: 60px; max-width: 960px;">
        
        <!-- Header -->
        <div style="text-align: center; margin-bottom: 28px;">
          <div style="display: flex; justify-content: center; gap: 8px; margin-bottom: 8px; flex-wrap: wrap;">
            <span class="badge badge-navy">Interactive Grammar Practice</span>
            <span class="badge badge-red">Sir Zubair's Class</span>
          </div>
          <h1 style="font-size: 2.2rem; color: var(--ha-navy); margin-bottom: 8px; font-weight: 800;">Grammar Activities Hub</h1>
          <p style="font-size: 1.05rem; color: var(--ha-text-muted); max-width: 650px; margin: 0 auto 20px;">
            Select a class topic and practice through <strong>Vocabulary practice, Fill in the blanks, Sentence building, MCQs, and Speaking practice</strong>.
          </p>
        </div>

        <!-- Topic Selector Tabs -->
        <div style="margin-bottom: 24px;">
          <div style="font-size: 0.82rem; font-weight: 800; color: var(--ha-navy); text-transform: uppercase; margin-bottom: 10px; text-align: center;">
            Select Topic to Practice:
          </div>
          <div style="display: flex; justify-content: center; gap: 8px; flex-wrap: wrap;">
            ${activeTopics.map(t => {
              const isSelected = t.id === selectedTopicId;
              return `
                <button class="topic-filter-pill ${isSelected ? 'active' : ''}" data-topic-id="${t.id}"
                  style="padding: 8px 16px; border-radius: var(--radius-pill); font-size: 0.88rem; font-weight: 700; cursor: pointer; border: 2px solid ${isSelected ? t.color : 'var(--ha-border)'}; background: ${isSelected ? t.color : '#FFFFFF'}; color: ${isSelected ? '#FFFFFF' : 'var(--ha-navy)'}; transition: all 0.2s; display: flex; align-items: center; gap: 6px;">
                  <span>Topic ${t.number}: ${t.title}</span>
                </button>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Active Topic Summary Banner -->
        ${activeTopicObj ? `
          <div class="ha-card" style="border-left: 6px solid ${activeTopicObj.color}; padding: 18px 24px; margin-bottom: 28px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 14px;">
            <div style="display: flex; align-items: center; gap: 14px;">
              <div style="background: var(--ha-navy-subtle); width: 48px; height: 48px; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; color: ${activeTopicObj.color}; font-size: 1.3rem;">
                ${bookIcon(24)}
              </div>
              <div>
                <span style="font-size: 0.78rem; font-weight: 800; color: ${activeTopicObj.color}; text-transform: uppercase;">Active Topic Drills</span>
                <h2 style="font-size: 1.3rem; color: var(--ha-navy); margin: 0; font-weight: 800;">${activeTopicObj.title}</h2>
                <div style="font-size: 0.88rem; color: var(--ha-text-muted);">${activeTopicObj.subtitle || activeTopicObj.summary || ''}</div>
              </div>
            </div>
            <button class="btn btn-outline btn-sm" id="btn-open-topic-lesson" style="display: inline-flex; align-items: center; gap: 6px;">
              ${bookIcon(15)} Open Full Lesson →
            </button>
          </div>
        ` : ''}

        <!-- The 5 Primary Interactive Activities Grid as Requested -->
        <div style="font-size: 0.85rem; font-weight: 800; color: var(--ha-navy); text-transform: uppercase; margin-bottom: 12px; letter-spacing: 0.04em;">
          Interactive Learning Activities:
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(270px, 1fr)); gap: 18px; margin-bottom: 30px;">
          
          <!-- Activity 1: Vocabulary Practice -->
          <div class="ha-card activity-select-card" data-activity="vocab" style="cursor: pointer; border-top: 5px solid #8B5CF6; transition: all 0.2s;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
              <div style="color: #8B5CF6; background: #F5F3FF; width: 48px; height: 48px; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center;">
                ${bookIcon(24)}
              </div>
              <span class="badge" style="background: #F5F3FF; color: #8B5CF6; font-weight: 800;">+25 XP</span>
            </div>
            <h3 style="font-size: 1.2rem; color: var(--ha-navy); margin-bottom: 6px; font-weight: 800;">1. Vocabulary Practice</h3>
            <p style="font-size: 0.88rem; color: var(--ha-text-muted); line-height: 1.45; margin-bottom: 16px;">
              Interactive flashcards with audio pronunciation, Urdu translations, and example sentences.
            </p>
            <button class="btn btn-primary btn-sm" style="width: 100%; background: #8B5CF6; border-color: #8B5CF6;">Practice Vocabulary →</button>
          </div>

          <!-- Activity 2: Fill in the Blanks -->
          <div class="ha-card activity-select-card" data-activity="fill" style="cursor: pointer; border-top: 5px solid #0891b2; transition: all 0.2s;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
              <div style="color: #0891b2; background: #ECFEFF; width: 48px; height: 48px; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center;">
                ${pencilIcon(24)}
              </div>
              <span class="badge badge-navy">+25 XP</span>
            </div>
            <h3 style="font-size: 1.2rem; color: var(--ha-navy); margin-bottom: 6px; font-weight: 800;">2. Fill in the Blanks</h3>
            <p style="font-size: 0.88rem; color: var(--ha-text-muted); line-height: 1.45; margin-bottom: 16px;">
              Complete the sentence by selecting the grammatically correct word from the options.
            </p>
            <button class="btn btn-primary btn-sm" style="width: 100%; background: #0891b2; border-color: #0891b2;">Fill in the Blanks →</button>
          </div>

          <!-- Activity 3: Sentence Building -->
          <div class="ha-card activity-select-card" data-activity="builder" style="cursor: pointer; border-top: 5px solid #2563eb; transition: all 0.2s;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
              <div style="color: #2563eb; background: #EFF6FF; width: 48px; height: 48px; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center;">
                ${puzzleIcon(24)}
              </div>
              <span class="badge badge-navy">+30 XP</span>
            </div>
            <h3 style="font-size: 1.2rem; color: var(--ha-navy); margin-bottom: 6px; font-weight: 800;">3. Sentence Building</h3>
            <p style="font-size: 0.88rem; color: var(--ha-text-muted); line-height: 1.45; margin-bottom: 16px;">
              Assemble word chips in proper grammatical order to construct full English sentences.
            </p>
            <button class="btn btn-primary btn-sm" style="width: 100%; background: #2563eb; border-color: #2563eb;">Build Sentences →</button>
          </div>

          <!-- Activity 4: Multiple Choice Questions (MCQs) -->
          <div class="ha-card activity-select-card" data-activity="mcq" style="cursor: pointer; border-top: 5px solid #d97706; transition: all 0.2s;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
              <div style="color: #d97706; background: #FFFBEB; width: 48px; height: 48px; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center;">
                ${checkCircleIcon(24)}
              </div>
              <span class="badge badge-gold">+25 XP</span>
            </div>
            <h3 style="font-size: 1.2rem; color: var(--ha-navy); margin-bottom: 6px; font-weight: 800;">4. Multiple Choice Questions</h3>
            <p style="font-size: 0.88rem; color: var(--ha-text-muted); line-height: 1.45; margin-bottom: 16px;">
              Rapid multiple-choice questions testing grammar rules with immediate answers & review.
            </p>
            <button class="btn btn-primary btn-sm" style="width: 100%; background: #d97706; border-color: #d97706;">Solve MCQs →</button>
          </div>

          <!-- Activity 5: Speaking Practice -->
          <div class="ha-card activity-select-card" data-activity="speaking" style="cursor: pointer; border-top: 5px solid #059669; transition: all 0.2s;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
              <div style="color: #059669; background: #ECFDF5; width: 48px; height: 48px; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center;">
                ${micIcon(24)}
              </div>
              <span class="badge badge-success">+30 XP</span>
            </div>
            <h3 style="font-size: 1.2rem; color: var(--ha-navy); margin-bottom: 6px; font-weight: 800;">5. Speaking Practice</h3>
            <p style="font-size: 0.88rem; color: var(--ha-text-muted); line-height: 1.45; margin-bottom: 16px;">
              Listen to native model pronunciations and practice reading sentences aloud with TTS audio.
            </p>
            <button class="btn btn-primary btn-sm" style="width: 100%; background: #059669; border-color: #059669;">Practice Speaking →</button>
          </div>

          <!-- Activity 6: Pair Matching (Bonus) -->
          <div class="ha-card activity-select-card" data-activity="matching" style="cursor: pointer; border-top: 5px solid #dc2626; transition: all 0.2s;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
              <div style="color: #dc2626; background: #FEF2F2; width: 48px; height: 48px; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center;">
                ${refreshIcon(24)}
              </div>
              <span class="badge badge-red">+25 XP</span>
            </div>
            <h3 style="font-size: 1.2rem; color: var(--ha-navy); margin-bottom: 6px; font-weight: 800;">6. Pair Matching</h3>
            <p style="font-size: 0.88rem; color: var(--ha-text-muted); line-height: 1.45; margin-bottom: 16px;">
              Tap and match grammar pairs: opposites, ownership, and pronouns.
            </p>
            <button class="btn btn-primary btn-sm" style="width: 100%; background: #dc2626; border-color: #dc2626;">Match Pairs →</button>
          </div>

        </div>

        <!-- Full Grammar Test Callout Banner -->
        <div style="background: linear-gradient(135deg, #0A2558 0%, #163B7C 100%); color: #FFFFFF; border-radius: var(--radius-xl); padding: 24px 28px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px;">
          <div>
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
              <span class="badge badge-gold">Mastery Exam</span>
              <span style="font-size: 0.8rem; color: #E2E8F0;">All ${activeTopics.length} Topics Combined</span>
            </div>
            <h3 style="font-size: 1.35rem; color: #FFFFFF; margin: 0 0 4px; font-weight: 800;">Ready to test all grammar topics together?</h3>
            <p style="font-size: 0.88rem; color: #CBD5E1; margin: 0;">
              Take the Full Grammar Test with fresh questions, automatic score calculation, and persistent database records!
            </p>
          </div>
          <button class="btn btn-accent btn-lg" id="btn-hub-goto-fulltest" style="display: inline-flex; align-items: center; gap: 8px; font-weight: 800;">
            ${graduationCapIcon(18)} Take Full Grammar Test
          </button>
        </div>

      </div>
    `;

    // Event listeners
    container.querySelectorAll('.topic-filter-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        sound.playClick();
        selectedTopicId = btn.dataset.topicId;
        render();
      });
    });

    container.querySelectorAll('.activity-select-card').forEach(card => {
      card.addEventListener('click', () => {
        sound.playClick();
        currentActivity = card.dataset.activity;
        render();
        window.scrollTo(0, 0);
      });
    });

    container.querySelector('#btn-open-topic-lesson')?.addEventListener('click', () => {
      sound.playClick();
      if (onNavigate) {
        window.dispatchEvent(new CustomEvent('ha:open-topic', { detail: { topicId: selectedTopicId } }));
      }
    });

    container.querySelector('#btn-hub-goto-fulltest')?.addEventListener('click', () => {
      sound.playClick();
      if (onNavigate) onNavigate('full-test');
    });
  }

  // --- View 2: Interactive Activity Runner ---
  function renderActivityRunner() {
    const topicData = TOPIC_ACTIVITIES[selectedTopicId] || TOPIC_ACTIVITIES.adjectives;
    const activeTopicObj = activeTopics.find(t => t.id === selectedTopicId) || activeTopics[0];

    switch (currentActivity) {
      case 'vocab':
        runVocabularyPractice(activeTopicObj);
        break;
      case 'fill':
        runFillInBlank(activeTopicObj);
        break;
      case 'builder':
        runSentenceBuilder(topicData, activeTopicObj);
        break;
      case 'mcq':
        runMCQPractice(activeTopicObj);
        break;
      case 'speaking':
        runSpeakingPractice(activeTopicObj);
        break;
      case 'scramble':
        runSentenceScramble(topicData, activeTopicObj);
        break;
      case 'matching':
        runMatchingPairs(topicData, activeTopicObj);
        break;
      case 'true_false':
        runTrueFalse(topicData, activeTopicObj);
        break;
      default:
        currentActivity = null;
        render();
    }
  }

  // --------------------------------------------------------------------------
  // Activity Runner 1: VOCABULARY PRACTICE (Flashcards with Audio & Definitions)
  // --------------------------------------------------------------------------
  function runVocabularyPractice(topicObj) {
    const rawVocab = topicObj.vocab || [];
    const vocabList = rawVocab.length > 0 ? rawVocab : [
      { word: topicObj.title, meaning: topicObj.subtitle || "Key English concept", example: "We use this topic daily." }
    ];

    let currentIndex = 0;
    let isFlipped = false;

    function renderCard() {
      const item = vocabList[currentIndex];
      const progressPercent = Math.round(((currentIndex + 1) / vocabList.length) * 100);

      container.innerHTML = `
        <div class="container" style="padding-top: 24px; padding-bottom: 60px; max-width: 720px;">
          
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <button class="btn btn-outline btn-sm" id="btn-vocab-back" style="display: inline-flex; align-items: center; gap: 6px;">
              ${arrowLeftIcon(15)} Activities Hub
            </button>
            <span class="badge badge-navy">Card ${currentIndex + 1} of ${vocabList.length}</span>
          </div>

          <div class="progress-container" style="height: 6px; margin-bottom: 24px;">
            <div class="progress-bar-fill" style="width: ${progressPercent}%; background: #8B5CF6;"></div>
          </div>

          <!-- Flashcard Container -->
          <div class="ha-card" style="padding: 36px 28px; text-align: center; border-radius: var(--radius-xl); border-top: 6px solid #8B5CF6; margin-bottom: 24px; min-height: 280px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: var(--ha-shadow-md);">
            <div>
              <span class="badge" style="background: #F5F3FF; color: #8B5CF6; font-weight: 800; margin-bottom: 16px;">
                VOCABULARY ITEM • ${topicObj.title}
              </span>
              
              <div style="font-size: clamp(2rem, 5vw, 2.6rem); font-weight: 900; color: var(--ha-navy); margin-bottom: 12px;">
                ${item.word}
              </div>

              <div style="margin-bottom: 18px;">
                <button class="btn btn-secondary btn-sm" id="btn-vocab-listen" style="display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px; background: #8B5CF6; border-color: #8B5CF6;">
                  ${speakerIcon(16)} Listen Pronunciation
                </button>
              </div>

              <!-- Meaning & Example Box -->
              <div id="vocab-details-box" style="background: #F8FAFC; border: 1.5px solid var(--ha-border); border-radius: var(--radius-lg); padding: 18px 20px; text-align: left; margin-top: 14px;">
                <div style="font-size: 0.8rem; font-weight: 800; color: var(--ha-navy); text-transform: uppercase; margin-bottom: 4px;">
                  Meaning / Urdu:
                </div>
                <div style="font-size: 1.05rem; color: var(--ha-text-main); font-weight: 700; margin-bottom: 12px;">
                  ${item.meaning || item.urdu || 'Definition'}
                </div>

                <div style="font-size: 0.8rem; font-weight: 800; color: var(--ha-navy); text-transform: uppercase; margin-bottom: 4px;">
                  Example Sentence:
                </div>
                <div style="font-size: 0.95rem; color: var(--ha-text-muted); font-style: italic; display: flex; justify-content: space-between; align-items: center;">
                  <span>“${item.example || 'Example sentence'}”</span>
                  <button class="btn btn-outline btn-xs" id="btn-vocab-listen-example" title="Listen Example">
                    ${speakerIcon(13)}
                  </button>
                </div>
              </div>
            </div>

            <div style="font-size: 0.8rem; color: var(--ha-text-muted); margin-top: 18px;">
              Tap Next to continue or Review anytime
            </div>
          </div>

          <!-- Controls -->
          <div style="display: flex; justify-content: space-between; gap: 12px;">
            <button class="btn btn-outline btn-lg" id="btn-vocab-prev" ${currentIndex === 0 ? 'disabled' : ''}>
              ← Previous
            </button>
            <button class="btn btn-primary btn-lg" id="btn-vocab-next" style="flex: 1; background: #8B5CF6; border-color: #8B5CF6;">
              ${currentIndex < vocabList.length - 1 ? 'Next Word →' : 'Complete Activity ✓'}
            </button>
          </div>

        </div>
      `;

      container.querySelector('#btn-vocab-back')?.addEventListener('click', () => {
        sound.playClick();
        currentActivity = null;
        render();
      });

      container.querySelector('#btn-vocab-listen')?.addEventListener('click', () => {
        sound.playClick();
        playPronunciation(item.word);
      });

      container.querySelector('#btn-vocab-listen-example')?.addEventListener('click', () => {
        sound.playClick();
        if (item.example) playPronunciation(item.example);
      });

      container.querySelector('#btn-vocab-prev')?.addEventListener('click', () => {
        if (currentIndex > 0) {
          sound.playClick();
          currentIndex--;
          renderCard();
        }
      });

      container.querySelector('#btn-vocab-next')?.addEventListener('click', () => {
        sound.playClick();
        if (currentIndex < vocabList.length - 1) {
          currentIndex++;
          renderCard();
        } else {
          sound.playLevelUp();
          fireConfetti(3000);
          stateManager.recordActivityCompletion(topicObj.id, 'vocab', 25);
          renderCompletionView(
            bookIcon(64),
            'Vocabulary Practice Complete!',
            `You reviewed all ${vocabList.length} vocabulary words for <strong>${topicObj.title}</strong>!`,
            25
          );
        }
      });
    }

    renderCard();
  }

  // --------------------------------------------------------------------------
  // Activity Runner 2: FILL IN THE BLANKS
  // --------------------------------------------------------------------------
  function runFillInBlank(topicObj) {
    const rawBank = (TOPIC_QUESTION_BANKS[topicObj.id] || []).filter(q => q.type === 'fill' || (q.question && q.question.includes('___')));
    const questions = rawBank.length > 0 ? shuffleArray(rawBank).slice(0, 5) : (topicObj.practiceQuestions || []).slice(0, 5);

    let currentIndex = 0;
    let score = 0;

    function renderQuestion() {
      const q = questions[currentIndex];
      const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);

      container.innerHTML = `
        <div class="container" style="padding-top: 24px; padding-bottom: 60px; max-width: 720px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <button class="btn btn-outline btn-sm" id="btn-fill-back">← Activities Hub</button>
            <span class="badge badge-navy">Question ${currentIndex + 1} of ${questions.length}</span>
          </div>

          <div class="progress-container" style="height: 6px; margin-bottom: 24px;">
            <div class="progress-bar-fill" style="width: ${progressPercent}%; background: #0891b2;"></div>
          </div>

          <div class="ha-card" style="padding: 32px 26px; border-radius: var(--radius-xl); border-top: 6px solid #0891b2; margin-bottom: 24px;">
            <span class="badge" style="background: #ECFEFF; color: #0891b2; font-weight: 800; margin-bottom: 14px;">
              FILL IN THE BLANK
            </span>

            <h2 style="font-size: 1.4rem; color: var(--ha-navy); margin-bottom: 24px; line-height: 1.5; font-weight: 800;">
              ${q.question}
            </h2>

            <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px;" id="fill-options-container">
              ${(q.options || []).map((opt, idx) => `
                <button class="btn btn-outline fill-opt-btn" data-idx="${idx}"
                  style="text-align: left; padding: 14px 18px; font-size: 1rem; font-weight: 700; border-radius: var(--radius-md);">
                  ${opt}
                </button>
              `).join('')}
            </div>

            <div id="fill-feedback" style="display: none; padding: 14px 18px; border-radius: var(--radius-md); margin-bottom: 16px; font-size: 0.95rem; font-weight: 700;"></div>

            <div style="text-align: right;">
              <button class="btn btn-primary btn-lg" id="btn-fill-next" style="display: none; background: #0891b2; border-color: #0891b2;">
                Next Question →
              </button>
            </div>
          </div>
        </div>
      `;

      container.querySelector('#btn-fill-back')?.addEventListener('click', () => {
        sound.playClick();
        currentActivity = null;
        render();
      });

      const optBtns = container.querySelectorAll('.fill-opt-btn');
      const feedback = container.querySelector('#fill-feedback');
      const nextBtn = container.querySelector('#btn-fill-next');

      optBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.dataset.idx, 10);
          const isCorrect = idx === q.correct;

          optBtns.forEach(b => b.disabled = true);

          if (isCorrect) {
            sound.playCorrect();
            score++;
            btn.style.background = 'var(--ha-success-bg)';
            btn.style.borderColor = 'var(--ha-success)';
            btn.style.color = '#065F46';
            feedback.style.background = 'var(--ha-success-bg)';
            feedback.style.color = '#065F46';
            feedback.innerHTML = `🎉 Correct! ${q.explanation || ''}`;
          } else {
            sound.playWrong();
            btn.style.background = '#FEF2F2';
            btn.style.borderColor = 'var(--ha-error)';
            btn.style.color = 'var(--ha-error)';
            feedback.style.background = '#FEF2F2';
            feedback.style.color = 'var(--ha-error)';
            feedback.innerHTML = `❌ Incorrect. The correct answer is "${q.options[q.correct]}". ${q.explanation || ''}`;
          }

          feedback.style.display = 'block';
          nextBtn.style.display = 'inline-flex';
        });
      });

      nextBtn?.addEventListener('click', () => {
        sound.playClick();
        currentIndex++;
        if (currentIndex < questions.length) {
          renderQuestion();
        } else {
          sound.playLevelUp();
          fireConfetti(3000);
          stateManager.recordActivityCompletion(topicObj.id, 'fill', 25);
          renderCompletionView(
            pencilIcon(64),
            'Fill in the Blanks Complete!',
            `You scored ${score} out of ${questions.length} on <strong>${topicObj.title}</strong>!`,
            25
          );
        }
      });
    }

    renderQuestion();
  }

  // --------------------------------------------------------------------------
  // Activity Runner 3: SENTENCE BUILDING (Chips)
  // --------------------------------------------------------------------------
  function runSentenceBuilder(topicData, topicObj) {
    const rawSentences = topicData.sentenceBuilder || [
      { parts: ["Could", "you", "please", "help", "me?"], correct: "Could you please help me?" },
      { parts: ["How", "much", "is", "this", "bag?"], correct: "How much is this bag?" }
    ];
    const sentences = shuffleArray(rawSentences).slice(0, 4);

    let currentIndex = 0;
    let currentAssembled = [];

    function renderSentence() {
      const item = sentences[currentIndex];
      const availableChips = shuffleArray([...item.parts]);
      currentAssembled = [];

      container.innerHTML = `
        <div class="container" style="padding-top: 24px; padding-bottom: 60px; max-width: 720px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <button class="btn btn-outline btn-sm" id="btn-builder-back">← Activities Hub</button>
            <span class="badge badge-navy">Sentence ${currentIndex + 1} of ${sentences.length}</span>
          </div>

          <div class="ha-card" style="padding: 32px 26px; border-radius: var(--radius-xl); border-top: 6px solid #2563eb; margin-bottom: 24px;">
            <span class="badge" style="background: #EFF6FF; color: #2563eb; font-weight: 800; margin-bottom: 12px;">
              SENTENCE BUILDER
            </span>
            <h2 style="font-size: 1.25rem; color: var(--ha-navy); margin-bottom: 18px;">
              Tap the word chips in the correct grammatical order:
            </h2>

            <!-- Assembled Line -->
            <div id="assembled-box" style="min-height: 60px; padding: 12px 16px; background: #F8FAFC; border: 2px dashed #93C5FD; border-radius: var(--radius-md); display: flex; gap: 8px; flex-wrap: wrap; align-items: center; margin-bottom: 24px;">
              <span style="font-size: 0.88rem; color: var(--ha-text-muted); font-style: italic;" id="assembled-placeholder">Tap words below to build sentence...</span>
            </div>

            <!-- Available Chips -->
            <div style="font-size: 0.8rem; font-weight: 800; color: var(--ha-navy); text-transform: uppercase; margin-bottom: 8px;">
              Available Word Chips:
            </div>
            <div id="chips-pool" style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 24px;">
              ${availableChips.map((word, idx) => `
                <button class="chip-btn btn btn-outline btn-sm" data-word="${word}" data-id="${idx}"
                  style="font-size: 1rem; font-weight: 700; padding: 8px 16px; border-radius: var(--radius-pill); cursor: pointer;">
                  ${word}
                </button>
              `).join('')}
            </div>

            <div id="builder-feedback" style="display: none; padding: 12px 16px; border-radius: var(--radius-md); margin-bottom: 16px; font-weight: 700;"></div>

            <div style="display: flex; justify-content: space-between; gap: 10px;">
              <button class="btn btn-outline" id="btn-builder-clear">Reset Chips</button>
              <button class="btn btn-primary" id="btn-builder-check" style="background: #2563eb; border-color: #2563eb;">Check Sentence ✓</button>
              <button class="btn btn-secondary" id="btn-builder-next" style="display: none; background: var(--ha-navy);">Next Sentence →</button>
            </div>
          </div>
        </div>
      `;

      container.querySelector('#btn-builder-back')?.addEventListener('click', () => {
        sound.playClick();
        currentActivity = null;
        render();
      });

      const assembledBox = container.querySelector('#assembled-box');
      const placeholder = container.querySelector('#assembled-placeholder');
      const chips = container.querySelectorAll('.chip-btn');
      const feedback = container.querySelector('#builder-feedback');
      const checkBtn = container.querySelector('#btn-builder-check');
      const nextBtn = container.querySelector('#btn-builder-next');

      chips.forEach(chip => {
        chip.addEventListener('click', () => {
          sound.playClick();
          const word = chip.dataset.word;
          currentAssembled.push({ word, chipEl: chip });
          chip.style.display = 'none';
          if (placeholder) placeholder.style.display = 'none';

          updateAssembled();
        });
      });

      function updateAssembled() {
        assembledBox.innerHTML = '';
        currentAssembled.forEach((item, i) => {
          const pill = document.createElement('span');
          pill.className = 'badge badge-navy';
          pill.style.fontSize = '0.95rem';
          pill.style.padding = '6px 12px';
          pill.style.cursor = 'pointer';
          pill.textContent = item.word + ' ✕';
          pill.addEventListener('click', () => {
            sound.playClick();
            item.chipEl.style.display = 'inline-block';
            currentAssembled.splice(i, 1);
            if (currentAssembled.length === 0 && placeholder) {
              assembledBox.appendChild(placeholder);
              placeholder.style.display = 'inline';
            } else {
              updateAssembled();
            }
          });
          assembledBox.appendChild(pill);
        });
      }

      container.querySelector('#btn-builder-clear')?.addEventListener('click', () => {
        sound.playClick();
        renderSentence();
      });

      checkBtn?.addEventListener('click', () => {
        const sentenceBuilt = currentAssembled.map(a => a.word).join(' ');
        const targetClean = item.correct || item.parts.join(' ');

        feedback.style.display = 'block';
        if (sentenceBuilt.trim().toLowerCase() === targetClean.trim().toLowerCase()) {
          sound.playCorrect();
          feedback.style.background = 'var(--ha-success-bg)';
          feedback.style.color = '#065F46';
          feedback.innerHTML = `🎉 Perfect! "${sentenceBuilt}" is grammatically correct.`;
          checkBtn.style.display = 'none';
          nextBtn.style.display = 'inline-flex';
        } else {
          sound.playWrong();
          feedback.style.background = '#FEF2F2';
          feedback.style.color = 'var(--ha-error)';
          feedback.innerHTML = `❌ Not quite in the right order. Tap 'Reset Chips' and try again.`;
        }
      });

      nextBtn?.addEventListener('click', () => {
        sound.playClick();
        currentIndex++;
        if (currentIndex < sentences.length) {
          renderSentence();
        } else {
          sound.playLevelUp();
          fireConfetti(3000);
          stateManager.recordActivityCompletion(topicObj.id, 'builder', 30);
          renderCompletionView(
            puzzleIcon(64),
            'Sentence Building Complete!',
            `You assembled all ${sentences.length} sentences for <strong>${topicObj.title}</strong>!`,
            30
          );
        }
      });
    }

    renderSentence();
  }

  // --------------------------------------------------------------------------
  // Activity Runner 4: MULTIPLE CHOICE QUESTIONS (MCQs)
  // --------------------------------------------------------------------------
  function runMCQPractice(topicObj) {
    const raw = (TOPIC_QUESTION_BANKS[topicObj.id] || []).filter(q => q.type === 'mcq' || Array.isArray(q.options));
    const questions = raw.length > 0 ? shuffleArray(raw).slice(0, 5) : (topicObj.practiceQuestions || []).slice(0, 5);

    let currentIndex = 0;
    let score = 0;

    function renderMCQ() {
      const q = questions[currentIndex];
      const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);

      container.innerHTML = `
        <div class="container" style="padding-top: 24px; padding-bottom: 60px; max-width: 720px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <button class="btn btn-outline btn-sm" id="btn-mcq-back">← Activities Hub</button>
            <span class="badge badge-gold">MCQ ${currentIndex + 1} of ${questions.length}</span>
          </div>

          <div class="progress-container" style="height: 6px; margin-bottom: 24px;">
            <div class="progress-bar-fill" style="width: ${progressPercent}%; background: #d97706;"></div>
          </div>

          <div class="ha-card" style="padding: 32px 26px; border-radius: var(--radius-xl); border-top: 6px solid #d97706; margin-bottom: 24px;">
            <span class="badge" style="background: #FFFBEB; color: #d97706; font-weight: 800; margin-bottom: 12px;">
              MULTIPLE CHOICE DRILL
            </span>

            <h2 style="font-size: 1.35rem; color: var(--ha-navy); margin-bottom: 22px; font-weight: 800; line-height: 1.45;">
              ${q.question}
            </h2>

            <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px;">
              ${(q.options || []).map((opt, i) => `
                <button class="btn btn-outline mcq-opt-btn" data-idx="${i}"
                  style="text-align: left; padding: 14px 18px; font-size: 1rem; font-weight: 700; border-radius: var(--radius-md);">
                  <strong style="margin-right: 8px; color: var(--ha-navy);">${String.fromCharCode(65 + i)}.</strong> ${opt}
                </button>
              `).join('')}
            </div>

            <div id="mcq-feedback" style="display: none; padding: 14px 18px; border-radius: var(--radius-md); margin-bottom: 16px; font-size: 0.95rem; font-weight: 700;"></div>

            <div style="text-align: right;">
              <button class="btn btn-primary btn-lg" id="btn-mcq-next" style="display: none; background: #d97706; border-color: #d97706;">
                Next Question →
              </button>
            </div>
          </div>
        </div>
      `;

      container.querySelector('#btn-mcq-back')?.addEventListener('click', () => {
        sound.playClick();
        currentActivity = null;
        render();
      });

      const optBtns = container.querySelectorAll('.mcq-opt-btn');
      const feedback = container.querySelector('#mcq-feedback');
      const nextBtn = container.querySelector('#btn-mcq-next');

      optBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.dataset.idx, 10);
          const isCorrect = idx === q.correct;

          optBtns.forEach(b => b.disabled = true);

          if (isCorrect) {
            sound.playCorrect();
            score++;
            btn.style.background = 'var(--ha-success-bg)';
            btn.style.borderColor = 'var(--ha-success)';
            btn.style.color = '#065F46';
            feedback.style.background = 'var(--ha-success-bg)';
            feedback.style.color = '#065F46';
            feedback.innerHTML = `🎉 Correct! ${q.explanation || ''}`;
          } else {
            sound.playWrong();
            btn.style.background = '#FEF2F2';
            btn.style.borderColor = 'var(--ha-error)';
            btn.style.color = 'var(--ha-error)';
            feedback.style.background = '#FEF2F2';
            feedback.style.color = 'var(--ha-error)';
            feedback.innerHTML = `❌ Incorrect. The correct option is "${q.options[q.correct]}". ${q.explanation || ''}`;
          }

          feedback.style.display = 'block';
          nextBtn.style.display = 'inline-flex';
        });
      });

      nextBtn?.addEventListener('click', () => {
        sound.playClick();
        currentIndex++;
        if (currentIndex < questions.length) {
          renderMCQ();
        } else {
          sound.playLevelUp();
          fireConfetti(3000);
          stateManager.recordActivityCompletion(topicObj.id, 'mcq', 25);
          renderCompletionView(
            checkCircleIcon(64),
            'MCQ Practice Complete!',
            `You scored ${score} out of ${questions.length} on <strong>${topicObj.title}</strong>!`,
            25
          );
        }
      });
    }

    renderMCQ();
  }

  // --------------------------------------------------------------------------
  // Activity Runner 5: SPEAKING PRACTICE (Listen & Read Aloud)
  // --------------------------------------------------------------------------
  function runSpeakingPractice(topicObj) {
    const rawSentences = (topicObj.examples || []).map(e => e.english || e.text || e).filter(Boolean);
    const sentences = rawSentences.length > 0 ? rawSentences.slice(0, 5) : [
      "Could you please help me with this exercise?",
      "How much is this book?",
      "The living room is very clean and comfortable."
    ];

    let currentIndex = 0;

    function renderSpeaking() {
      const currentSentence = sentences[currentIndex];
      const progressPercent = Math.round(((currentIndex + 1) / sentences.length) * 100);

      container.innerHTML = `
        <div class="container" style="padding-top: 24px; padding-bottom: 60px; max-width: 720px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <button class="btn btn-outline btn-sm" id="btn-speaking-back">← Activities Hub</button>
            <span class="badge badge-teal">Sentence ${currentIndex + 1} of ${sentences.length}</span>
          </div>

          <div class="progress-container" style="height: 6px; margin-bottom: 24px;">
            <div class="progress-bar-fill" style="width: ${progressPercent}%; background: #059669;"></div>
          </div>

          <div class="ha-card" style="padding: 36px 28px; text-align: center; border-radius: var(--radius-xl); border-top: 6px solid #059669; margin-bottom: 24px;">
            <span class="badge badge-success" style="margin-bottom: 16px;">
              SPEAKING PRONUNCIATION DRILL
            </span>

            <div style="font-size: 0.88rem; color: var(--ha-text-muted); margin-bottom: 12px;">
              Listen to the model pronunciation, then read aloud with clear voice:
            </div>

            <div style="font-size: clamp(1.4rem, 4vw, 1.85rem); font-weight: 800; color: var(--ha-navy); line-height: 1.45; margin-bottom: 24px; padding: 20px; background: #F8FAFC; border-radius: var(--radius-lg); border: 1.5px solid var(--ha-border);">
              “${currentSentence}”
            </div>

            <!-- Audio Buttons -->
            <div style="display: flex; justify-content: center; gap: 14px; flex-wrap: wrap; margin-bottom: 24px;">
              <button class="btn btn-primary btn-lg" id="btn-speak-listen" style="display: inline-flex; align-items: center; gap: 8px; background: #059669; border-color: #059669;">
                ${speakerIcon(20)} Listen (Normal Speed)
              </button>
              <button class="btn btn-outline btn-lg" id="btn-speak-slow" style="display: inline-flex; align-items: center; gap: 8px;">
                ${speakerIcon(18)} Listen (Slow)
              </button>
            </div>

            <!-- Speaking Simulation / Repeat Aloud Prompt -->
            <div style="padding: 16px; background: #ECFDF5; border-radius: var(--radius-md); border: 1px solid #A7F3D0; margin-bottom: 20px;">
              <div style="font-weight: 800; color: #065F46; font-size: 0.95rem; margin-bottom: 4px;">
                🎙️ Speaking Prompt:
              </div>
              <p style="font-size: 0.88rem; color: #047857; margin: 0;">
                Say the sentence out loud now. Focus on clear pauses and natural English rhythm.
              </p>
            </div>

            <button class="btn btn-secondary btn-lg" id="btn-speak-done" style="width: 100%; font-weight: 800; background: var(--ha-navy);">
              I Said It Out Loud ✓ Next Sentence →
            </button>
          </div>
        </div>
      `;

      container.querySelector('#btn-speaking-back')?.addEventListener('click', () => {
        sound.playClick();
        currentActivity = null;
        render();
      });

      container.querySelector('#btn-speak-listen')?.addEventListener('click', () => {
        sound.playClick();
        playPronunciation(currentSentence);
      });

      container.querySelector('#btn-speak-slow')?.addEventListener('click', () => {
        sound.playClick();
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
          window.speechSynthesis.cancel();
          const u = new SpeechSynthesisUtterance(currentSentence);
          u.rate = 0.65;
          window.speechSynthesis.speak(u);
        }
      });

      container.querySelector('#btn-speak-done')?.addEventListener('click', () => {
        sound.playCorrect();
        currentIndex++;
        if (currentIndex < sentences.length) {
          renderSpeaking();
        } else {
          sound.playLevelUp();
          fireConfetti(3000);
          stateManager.recordActivityCompletion(topicObj.id, 'speaking', 30);
          renderCompletionView(
            micIcon(64),
            'Speaking Practice Complete!',
            `You practiced speaking all ${sentences.length} sentences for <strong>${topicObj.title}</strong>!`,
            30
          );
        }
      });
    }

    renderSpeaking();
  }

  // --------------------------------------------------------------------------
  // Activity Runner 6: SENTENCE SCRAMBLE (Bonus)
  // --------------------------------------------------------------------------
  function runSentenceScramble(topicData, topicObj) {
    const scrambles = topicData.scrambles || [];
    if (scrambles.length === 0) {
      runSentenceBuilder(topicData, topicObj);
      return;
    }

    let currentIndex = 0;
    const sessionItems = shuffleArray(scrambles).slice(0, 5);

    function renderScrambleItem() {
      const item = sessionItems[currentIndex];
      const jumbled = shuffleArray([...item.words]);
      let userOrder = [];

      container.innerHTML = `
        <div class="container" style="padding-top: 24px; padding-bottom: 60px; max-width: 720px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <button class="btn btn-outline btn-sm" id="btn-scramble-back">← Activities Hub</button>
            <span class="badge badge-navy">Scramble ${currentIndex + 1} of ${sessionItems.length}</span>
          </div>

          <div class="ha-card" style="padding: 32px 26px; border-radius: var(--radius-xl); border-top: 6px solid #2563eb; margin-bottom: 24px;">
            <h2 style="font-size: 1.3rem; color: var(--ha-navy); margin-bottom: 20px; font-weight: 800;">
              Arrange words into a correct sentence:
            </h2>

            <div id="scramble-target" style="min-height: 56px; padding: 12px; background: #F8FAFC; border: 2px dashed #93C5FD; border-radius: var(--radius-md); display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 20px;"></div>

            <div id="scramble-source" style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 24px;">
              ${jumbled.map((w, i) => `
                <button class="btn btn-outline btn-sm scramble-word-btn" data-word="${w}" data-idx="${i}" style="font-size: 1rem; font-weight: 700; border-radius: var(--radius-pill);">
                  ${w}
                </button>
              `).join('')}
            </div>

            <div id="scramble-feedback" style="display: none; padding: 12px; border-radius: var(--radius-md); margin-bottom: 16px; font-weight: 700;"></div>

            <div style="display: flex; justify-content: space-between;">
              <button class="btn btn-outline" id="btn-scramble-reset">Reset</button>
              <button class="btn btn-primary" id="btn-scramble-check" style="background: #2563eb; border-color: #2563eb;">Check ✓</button>
              <button class="btn btn-secondary" id="btn-scramble-next" style="display: none; background: var(--ha-navy);">Next →</button>
            </div>
          </div>
        </div>
      `;

      container.querySelector('#btn-scramble-back')?.addEventListener('click', () => {
        sound.playClick();
        currentActivity = null;
        render();
      });

      const target = container.querySelector('#scramble-target');
      const sourceBtns = container.querySelectorAll('.scramble-word-btn');
      const feedback = container.querySelector('#scramble-feedback');
      const checkBtn = container.querySelector('#btn-scramble-check');
      const nextBtn = container.querySelector('#btn-scramble-next');

      sourceBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          sound.playClick();
          const word = btn.dataset.word;
          userOrder.push({ word, btn });
          btn.style.display = 'none';

          updateTarget();
        });
      });

      function updateTarget() {
        target.innerHTML = '';
        userOrder.forEach((item, idx) => {
          const pill = document.createElement('span');
          pill.className = 'badge badge-navy';
          pill.style.fontSize = '0.95rem';
          pill.style.padding = '6px 12px';
          pill.style.cursor = 'pointer';
          pill.textContent = item.word + ' ✕';
          pill.addEventListener('click', () => {
            sound.playClick();
            item.btn.style.display = 'inline-block';
            userOrder.splice(idx, 1);
            updateTarget();
          });
          target.appendChild(pill);
        });
      }

      container.querySelector('#btn-scramble-reset')?.addEventListener('click', () => {
        sound.playClick();
        renderScrambleItem();
      });

      checkBtn?.addEventListener('click', () => {
        const assembled = userOrder.map(u => u.word).join(' ');
        const isCorrect = assembled.trim().toLowerCase() === item.correct.trim().toLowerCase();

        feedback.style.display = 'block';
        if (isCorrect) {
          sound.playCorrect();
          feedback.style.background = 'var(--ha-success-bg)';
          feedback.style.color = '#065F46';
          feedback.innerHTML = `🎉 Correct! "${assembled}"`;
          checkBtn.style.display = 'none';
          nextBtn.style.display = 'inline-flex';
        } else {
          sound.playWrong();
          feedback.style.background = '#FEF2F2';
          feedback.style.color = 'var(--ha-error)';
          feedback.innerHTML = `❌ Keep trying! Words are not in the right order yet.`;
        }
      });

      nextBtn?.addEventListener('click', () => {
        sound.playClick();
        currentIndex++;
        if (currentIndex < sessionItems.length) {
          renderScrambleItem();
        } else {
          sound.playLevelUp();
          fireConfetti(3000);
          stateManager.recordActivityCompletion(topicObj.id, 'scramble', 25);
          renderCompletionView(
            puzzleIcon(64),
            'Sentence Scramble Complete!',
            `You solved all ${sessionItems.length} scrambles for <strong>${topicObj.title}</strong>!`,
            25
          );
        }
      });
    }

    renderScrambleItem();
  }

  // --------------------------------------------------------------------------
  // Activity Runner 7: PAIR MATCHING
  // --------------------------------------------------------------------------
  function runMatchingPairs(topicData, topicObj) {
    const rawPairs = topicData.matching || [];
    const selectedPairs = shuffleArray(rawPairs).slice(0, 4);

    let selectedLeftId = null;
    let selectedRightId = null;
    let matchedCount = 0;

    const leftItems = shuffleArray(selectedPairs.map((p, i) => ({ id: i, text: p.left })));
    const rightItems = shuffleArray(selectedPairs.map((p, i) => ({ id: i, text: p.right })));

    container.innerHTML = `
      <div class="container" style="padding-top: 24px; padding-bottom: 60px; max-width: 720px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
          <button class="btn btn-outline btn-sm" id="btn-matching-back">← Activities Hub</button>
          <span class="badge badge-success" id="match-counter-badge">Matched: 0 / ${selectedPairs.length}</span>
        </div>

        <div class="ha-card" style="padding: 32px 24px; border-radius: var(--radius-xl); border-top: 6px solid #dc2626; margin-bottom: 24px;">
          <h2 style="font-size: 1.3rem; color: var(--ha-navy); margin-bottom: 20px; font-weight: 800; text-align: center;">
            Match Related Grammar Pairs
          </h2>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 20px;">
            <div style="display: flex; flex-direction: column; gap: 10px;" id="left-column">
              ${leftItems.map(item => `
                <button class="match-item-btn match-left" data-id="${item.id}"
                  style="padding: 14px; border-radius: var(--radius-md); font-size: 1rem; font-weight: 700; background: #FFFFFF; border: 2px solid var(--ha-border); cursor: pointer;">
                  ${item.text}
                </button>
              `).join('')}
            </div>
            <div style="display: flex; flex-direction: column; gap: 10px;" id="right-column">
              ${rightItems.map(item => `
                <button class="match-item-btn match-right" data-id="${item.id}"
                  style="padding: 14px; border-radius: var(--radius-md); font-size: 1rem; font-weight: 700; background: #FFFFFF; border: 2px solid var(--ha-border); cursor: pointer;">
                  ${item.text}
                </button>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;

    container.querySelector('#btn-matching-back')?.addEventListener('click', () => {
      sound.playClick();
      currentActivity = null;
      render();
    });

    const leftBtns = container.querySelectorAll('.match-left');
    const rightBtns = container.querySelectorAll('.match-right');
    const counterBadge = container.querySelector('#match-counter-badge');

    function checkPair() {
      if (selectedLeftId !== null && selectedRightId !== null) {
        if (selectedLeftId === selectedRightId) {
          sound.playCorrect();
          const lBtn = container.querySelector(`.match-left[data-id="${selectedLeftId}"]`);
          const rBtn = container.querySelector(`.match-right[data-id="${selectedRightId}"]`);

          if (lBtn && rBtn) {
            lBtn.style.background = 'var(--ha-success-bg)';
            lBtn.style.borderColor = 'var(--ha-success)';
            lBtn.disabled = true;
            rBtn.style.background = 'var(--ha-success-bg)';
            rBtn.style.borderColor = 'var(--ha-success)';
            rBtn.disabled = true;
          }

          matchedCount++;
          if (counterBadge) counterBadge.textContent = `Matched: ${matchedCount} / ${selectedPairs.length}`;
          selectedLeftId = null;
          selectedRightId = null;

          if (matchedCount >= selectedPairs.length) {
            sound.playLevelUp();
            fireConfetti(3000);
            stateManager.recordActivityCompletion(topicObj.id, 'matching', 25);
            setTimeout(() => {
              renderCompletionView(
                refreshIcon(64),
                'Matching Complete!',
                `You matched all pairs for <strong>${topicObj.title}</strong>!`,
                25
              );
            }, 600);
          }
        } else {
          sound.playWrong();
          const lBtn = container.querySelector(`.match-left[data-id="${selectedLeftId}"]`);
          const rBtn = container.querySelector(`.match-right[data-id="${selectedRightId}"]`);
          if (lBtn) lBtn.style.borderColor = 'var(--ha-red)';
          if (rBtn) rBtn.style.borderColor = 'var(--ha-red)';
          setTimeout(() => {
            if (lBtn && !lBtn.disabled) lBtn.style.borderColor = 'var(--ha-border)';
            if (rBtn && !rBtn.disabled) rBtn.style.borderColor = 'var(--ha-border)';
            selectedLeftId = null;
            selectedRightId = null;
          }, 600);
        }
      }
    }

    leftBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        sound.playClick();
        leftBtns.forEach(b => { if (!b.disabled) b.style.borderColor = 'var(--ha-border)'; });
        btn.style.borderColor = 'var(--ha-navy)';
        selectedLeftId = parseInt(btn.dataset.id, 10);
        checkPair();
      });
    });

    rightBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        sound.playClick();
        rightBtns.forEach(b => { if (!b.disabled) b.style.borderColor = 'var(--ha-border)'; });
        btn.style.borderColor = 'var(--ha-navy)';
        selectedRightId = parseInt(btn.dataset.id, 10);
        checkPair();
      });
    });
  }

  // --------------------------------------------------------------------------
  // Activity Runner 8: TRUE OR FALSE
  // --------------------------------------------------------------------------
  function runTrueFalse(topicData, topicObj) {
    const rawTF = topicData.trueFalse || [];
    const questions = shuffleArray(rawTF).slice(0, 5);

    let currentIndex = 0;
    let score = 0;

    function renderTF() {
      const q = questions[currentIndex];

      container.innerHTML = `
        <div class="container" style="padding-top: 24px; padding-bottom: 60px; max-width: 720px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <button class="btn btn-outline btn-sm" id="btn-tf-back">← Activities Hub</button>
            <span class="badge badge-navy">Question ${currentIndex + 1} of ${questions.length}</span>
          </div>

          <div class="ha-card" style="padding: 36px 26px; text-align: center; border-radius: var(--radius-xl); border-top: 6px solid #d97706; margin-bottom: 24px;">
            <span class="badge badge-gold" style="margin-bottom: 16px;">TRUE OR FALSE</span>
            <div style="font-size: 1.45rem; font-weight: 800; color: var(--ha-navy); margin-bottom: 24px; line-height: 1.45;">
              “${q.statement || q.text}”
            </div>

            <div style="display: flex; justify-content: center; gap: 16px; margin-bottom: 20px;">
              <button class="btn btn-outline btn-lg tf-btn" data-val="true" style="min-width: 140px; font-weight: 800; border-color: var(--ha-success); color: var(--ha-success);">
                ✓ True
              </button>
              <button class="btn btn-outline btn-lg tf-btn" data-val="false" style="min-width: 140px; font-weight: 800; border-color: var(--ha-error); color: var(--ha-error);">
                ✗ False
              </button>
            </div>

            <div id="tf-feedback" style="display: none; padding: 14px; border-radius: var(--radius-md); font-weight: 700; margin-bottom: 16px;"></div>

            <button class="btn btn-primary btn-lg" id="btn-tf-next" style="display: none; background: var(--ha-navy);">
              Next Question →
            </button>
          </div>
        </div>
      `;

      container.querySelector('#btn-tf-back')?.addEventListener('click', () => {
        sound.playClick();
        currentActivity = null;
        render();
      });

      const btns = container.querySelectorAll('.tf-btn');
      const feedback = container.querySelector('#tf-feedback');
      const nextBtn = container.querySelector('#btn-tf-next');

      btns.forEach(b => {
        b.addEventListener('click', () => {
          const userVal = b.dataset.val === 'true';
          const isCorrect = userVal === q.isTrue;

          btns.forEach(btn => btn.disabled = true);

          if (isCorrect) {
            sound.playCorrect();
            score++;
            b.style.background = 'var(--ha-success-bg)';
            feedback.style.background = 'var(--ha-success-bg)';
            feedback.style.color = '#065F46';
            feedback.innerHTML = `🎉 Correct! ${q.explanation || ''}`;
          } else {
            sound.playWrong();
            b.style.background = '#FEF2F2';
            feedback.style.background = '#FEF2F2';
            feedback.style.color = 'var(--ha-error)';
            feedback.innerHTML = `❌ Incorrect. The statement is ${q.isTrue ? 'True' : 'False'}. ${q.explanation || ''}`;
          }

          feedback.style.display = 'block';
          nextBtn.style.display = 'inline-flex';
        });
      });

      nextBtn?.addEventListener('click', () => {
        sound.playClick();
        currentIndex++;
        if (currentIndex < questions.length) {
          renderTF();
        } else {
          sound.playLevelUp();
          fireConfetti(3000);
          stateManager.recordActivityCompletion(topicObj.id, 'true_false', 20);
          renderCompletionView(
            checkCircleIcon(64),
            'True or False Complete!',
            `You scored ${score} out of ${questions.length} on <strong>${topicObj.title}</strong>!`,
            20
          );
        }
      });
    }

    renderTF();
  }

  // --- View 3: Completion View ---
  function renderCompletionView(iconHtml, title, message, xpAwarded) {
    container.innerHTML = `
      <div class="container" style="padding-top: 40px; padding-bottom: 70px; max-width: 620px; text-align: center;">
        <div class="ha-card" style="padding: 40px 24px; border-radius: var(--radius-xl); border-top: 6px solid var(--ha-navy); box-shadow: var(--ha-shadow-md);">
          <div style="display: flex; justify-content: center; margin-bottom: 16px; color: var(--ha-navy);">
            ${iconHtml}
          </div>
          <h2 style="font-size: 1.8rem; color: var(--ha-navy); margin-bottom: 8px; font-weight: 800;">
            ${title}
          </h2>
          <p style="font-size: 1rem; color: var(--ha-text-muted); line-height: 1.6; margin-bottom: 24px;">
            ${message}
          </p>

          <div style="display: inline-flex; align-items: center; gap: 8px; background: var(--ha-navy-subtle); padding: 12px 24px; border-radius: var(--radius-pill); font-size: 1.2rem; font-weight: 800; color: var(--ha-gold-dark); margin-bottom: 28px;">
            ⚡ +${xpAwarded} XP Added to Profile
          </div>

          <div style="display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;">
            <button class="btn btn-primary btn-lg" id="btn-completion-hub" style="font-weight: 800;">
              More Activities →
            </button>
            <button class="btn btn-outline btn-lg" id="btn-completion-dash" style="font-weight: 800;">
              My Dashboard
            </button>
          </div>
        </div>
      </div>
    `;

    container.querySelector('#btn-completion-hub')?.addEventListener('click', () => {
      sound.playClick();
      currentActivity = null;
      render();
    });

    container.querySelector('#btn-completion-dash')?.addEventListener('click', () => {
      sound.playClick();
      if (onNavigate) onNavigate('dashboard');
    });
  }

  // Initial call
  render();
}
