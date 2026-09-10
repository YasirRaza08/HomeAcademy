// Home Academy Curriculum Zone - 5-Step Learning Architecture
// 1. LEARN -> 2. PRACTICE -> 3. QUIZ -> 4. RESULT -> 5. XP REWARD
// Strictly for the 6 official class topics

import { stateManager } from '../state.js';
import { sound } from '../audio.js';
import { fireConfetti } from '../confetti.js';
import { getActiveTopics, getTopicById } from '../data/curriculum.js';
import { getFreshQuestionsForTopic, shuffleQuestion } from '../data/topic-activities.js';
import { renderConceptVisual } from './creativeVisuals.js';
import { 
  speakerIcon, bookIcon, checkCircleIcon, infoIcon, arrowLeftIcon, 
  trophyIcon, refreshIcon, puzzleIcon, graduationCapIcon, schoolIcon, gamepadIcon 
} from './icons.js';

export function renderCurriculumZone(container, onNavigate, initialTopicId = null) {
  const student = stateManager.getCurrentStudent();
  const topics = stateManager.getActiveCurriculum();

  let selectedTopic = initialTopicId ? getTopicById(initialTopicId, topics) : null;
  let currentStep = 'learn'; // 'learn' | 'practice' | 'quiz' | 'result'
  let practiceIndex = 0;
  let practiceAnswers = [];
  let practiceQuestionsList = [];
  let quizIndex = 0;
  let quizAnswers = [];
  let quizQuestionsList = [];
  let lastQuizResult = null;

  function initPracticeQuestions() {
    if (!selectedTopic) return;
    const seenIds = stateManager.getSeenQuestionIds(selectedTopic.id);
    const { questions, selectedIds } = getFreshQuestionsForTopic(selectedTopic.id, seenIds, 5);
    if (questions && questions.length > 0) {
      practiceQuestionsList = questions;
      stateManager.markQuestionsSeen(selectedTopic.id, selectedIds);
    } else {
      practiceQuestionsList = (selectedTopic.practiceQuestions || []).map(q => shuffleQuestion(q));
    }
    practiceIndex = 0;
    practiceAnswers = [];
  }

  function initQuizQuestions() {
    if (!selectedTopic) return;
    const seenIds = stateManager.getSeenQuestionIds(selectedTopic.id);
    const { questions, selectedIds } = getFreshQuestionsForTopic(selectedTopic.id, seenIds, 5);
    if (questions && questions.length > 0) {
      quizQuestionsList = questions;
      stateManager.markQuestionsSeen(selectedTopic.id, selectedIds);
    } else {
      quizQuestionsList = (selectedTopic.quizQuestions || []).map(q => shuffleQuestion(q));
    }
    quizIndex = 0;
    quizAnswers = [];
  }

  function render() {
    if (!selectedTopic) {
      renderTopicSelection();
    } else {
      switch (currentStep) {
        case 'learn':
          renderLearnStep();
          break;
        case 'practice':
          renderPracticeStep();
          break;
        case 'quiz':
          renderQuizStep();
          break;
        case 'result':
          renderResultStep();
          break;
        default:
          renderLearnStep();
      }
    }
  }

  // View: Grid of all 6 Class Topics
  function renderTopicSelection() {
    const studentProgress = student?.topicProgress || {};

    container.innerHTML = `
      <div class="container" style="padding-top: 24px; padding-bottom: 50px;">
          <div style="display: flex; justify-content: center; gap: 8px; margin-bottom: 8px; flex-wrap: wrap;">
            <span class="badge badge-navy">Official Class Curriculum</span>
            <span class="badge badge-red">Taught by Sir Zubair</span>
          </div>
          <h1 style="font-size: 2.2rem; color: var(--ha-navy); margin-bottom: 8px;">English Language Program</h1>
          <p style="font-size: 1.05rem; color: var(--ha-text-muted); max-width: 620px; margin: 0 auto 28px;">
            The foundational grammar and speaking topics taught in class by <strong>Sir Zubair</strong>. Follow the 5-step path: <strong>Learn → Practice → Quiz → Result → Earn XP!</strong>
          </p>

        ${topics.length === 0 ? `
          <div class="ha-card" style="padding: 48px 24px; text-align: center; max-width: 540px; margin: 20px auto; border-top: 4px solid var(--ha-navy);">
            <span style="display: flex; justify-content: center; margin-bottom: 12px; color: var(--ha-navy);">${bookIcon(42)}</span>
            <h2 style="font-size: 1.35rem; color: var(--ha-navy); margin-bottom: 8px;">Curriculum Under Update</h2>
            <p style="font-size: 0.95rem; color: var(--ha-text-muted); line-height: 1.6; margin-bottom: 20px;">
              Curriculum topics are currently being updated by <strong>Sir Zubair</strong>. Please check back soon or practice in the Games & Practice Zone!
            </p>
            <button class="btn btn-primary btn-sm" id="btn-curriculum-goto-games" style="display: inline-flex; align-items: center; gap: 6px;">
              ${gamepadIcon(15)} Play Practice Games →
            </button>
          </div>
        ` : `
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr)); gap: 24px;">
            ${topics.map(t => {
              const prog = studentProgress[t.id] || {};
              const isPassed = prog.passed || prog.quizScore >= 80;
              const statusLabel = isPassed ? `${checkCircleIcon(13)} Mastered (100%)` : (prog.learned ? 'In Practice' : 'Ready to Start');
              const statusBadgeClass = isPassed ? 'badge-success' : (prog.learned ? 'badge-gold' : 'badge-navy');

              return `
                <div class="ha-card topic-card" data-id="${t.id}" style="cursor: pointer; border-top: 5px solid ${t.color}; display: flex; flex-direction: column; justify-content: space-between; transition: all 0.25s;">
                  <div>
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
                      <div style="width: 44px; height: 44px; border-radius: var(--radius-md); background: var(--ha-navy-subtle); display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.95rem; color: var(--ha-navy);">
                        ${t.number}
                      </div>
                      <span class="badge ${statusBadgeClass}" style="display: inline-flex; align-items: center; gap: 4px;">${statusLabel}</span>
                    </div>
                    <div style="font-size: 0.8rem; font-weight: 800; color: ${t.color}; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">
                      Topic ${t.number}
                    </div>
                    <h3 style="font-size: 1.3rem; color: var(--ha-navy); margin-bottom: 8px; font-weight: 800;">${t.title}</h3>
                    <p style="font-size: 0.9rem; color: var(--ha-text-muted); margin-bottom: 16px; line-height: 1.5;">
                      ${t.subtitle || t.summary || 'Master this foundational grammar and speaking topic.'}
                    </p>
                  </div>

                  <div style="border-top: 1px solid var(--ha-border); padding-top: 14px; display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-size: 0.82rem; font-weight: 700; color: var(--ha-navy);">
                      Reward: +50 XP
                    </span>
                    <button class="btn btn-primary btn-sm btn-start-topic" data-id="${t.id}" style="background: ${t.color}; font-weight: 700;">
                      View Topic →
                    </button>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        `}
      </div>
    `;

    container.querySelector('#btn-curriculum-goto-games')?.addEventListener('click', () => {
      sound.playClick();
      if (onNavigate) onNavigate('games');
    });

    container.querySelectorAll('.topic-card, .btn-start-topic').forEach(el => {
      el.addEventListener('click', (e) => {
        const id = el.dataset.id || el.closest('.topic-card')?.dataset.id;
        if (id) {
          sound.playClick();
          selectedTopic = getTopicById(id, topics);
          currentStep = 'learn';
          render();
          window.scrollTo(0, 0);
        }
      });
    });
  }

  // Step 1: LEARN
  function renderLearnStep() {
    const guide = selectedTopic.explanationGuide || {
      kyun: {
        title: "Kyun Istemal Hota Hai? (Why do we use it?)",
        urdu: selectedTopic.summary,
        english: selectedTopic.subtitle || "To build proper English grammar and communication skills."
      },
      kaise: {
        title: "Kaise Istemal Hota Hai? (How is it formed?)",
        urdu: "Class rules ke mutabiq sahi tarteeb mein alfaz ka istemal karein.",
        english: "Follow standard English word order and grammar rules.",
        formula: "Grammar Pattern: " + selectedTopic.title
      },
      kisLiye: {
        title: "Kis Liye Istemal Hota Hai? (When & What for?)",
        urdu: "Rozmarrah English bol-chaal aur writing ko behtar banane ke liye.",
        english: "For daily conversational clarity and accurate English writing.",
        points: ["Classroom conversation", "Daily speaking practice", "Written exercises"]
      },
      audioNarration: `${selectedTopic.title}. ${selectedTopic.summary}`
    };

    container.innerHTML = `
      <div class="container" style="padding-top: 24px; padding-bottom: 50px; max-width: 880px;">
        
        <!-- Header & Breadcrumbs -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 12px;">
          <button class="btn btn-outline btn-sm" id="btn-back-to-topics" style="display: inline-flex; align-items: center; gap: 6px;">
            ${arrowLeftIcon(14)} Back to All Topics
          </button>
          <div style="display: flex; gap: 6px; flex-wrap: wrap;">
            <span class="badge badge-navy" style="background: var(--ha-navy); color: #fff;">1. LEARN</span>
            <span class="badge badge-navy" style="opacity: 0.5;">2. PRACTICE</span>
            <span class="badge badge-navy" style="opacity: 0.5;">3. QUIZ</span>
            <span class="badge badge-navy" style="opacity: 0.5;">4. RESULT</span>
          </div>
        </div>

        <div class="ha-card topic-master-card" style="border-top: 6px solid ${selectedTopic.color}; margin-bottom: 24px;">
          <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 24px; flex-wrap: wrap;">
            <div style="width: 56px; height: 56px; border-radius: var(--radius-lg); background: var(--ha-navy-subtle); display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1.2rem; color: var(--ha-navy);">
              ${selectedTopic.number}
            </div>
            <div>
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="font-size: 0.85rem; font-weight: 800; color: ${selectedTopic.color}; text-transform: uppercase;">
                  Topic ${selectedTopic.number} — Class Master Lesson
                </span>
                <span class="badge badge-red" style="font-size: 0.68rem; padding: 2px 6px;">Taught by Sir Zubair</span>
              </div>
              <h1 style="font-size: 2.1rem; color: var(--ha-navy); margin-top: 2px; line-height: 1.2;">${selectedTopic.title}</h1>
            </div>
          </div>

          <!-- Interactive Teacher Explanation Box (Sir Zubair ki Wazahath: Kyun, Kaise, Kis Liye) -->
          <div class="grammar-explanation-hub" style="background: #FFFFFF; border: 2px solid ${selectedTopic.color}33; border-radius: var(--radius-lg); padding: 22px; margin-bottom: 28px; box-shadow: var(--ha-shadow-sm);">
            
            <!-- Voice Audio Bar Header -->
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px; margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid var(--ha-border);">
              <div style="display: flex; align-items: center; gap: 12px;">
                <div style="width: 44px; height: 44px; border-radius: var(--radius-pill); background: ${selectedTopic.color}; color: #fff; display: flex; align-items: center; justify-content: center;">
                  ${schoolIcon(22)}
                </div>
                <div>
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <h3 style="font-size: 1.15rem; color: var(--ha-navy); margin: 0; font-weight: 800;">
                      Sir Zubair's Grammar Masterclass
                    </h3>
                    <span class="badge badge-navy" style="font-size: 0.7rem;">Official Explanation</span>
                  </div>
                  <div style="font-size: 0.82rem; color: var(--ha-text-muted);">
                    Topic ${selectedTopic.number}: ${selectedTopic.title} • <strong>Kyun, Kaise aur Kis Liye</strong>
                  </div>
                </div>
              </div>

              <!-- Voice Audio Narration Button -->
              <div style="display: flex; align-items: center; gap: 10px;">
                <button class="btn btn-secondary btn-sm btn-audio-explain" id="btn-topic-audio-explain" style="background: ${selectedTopic.color}; border-color: ${selectedTopic.color}; font-weight: 700; display: inline-flex; align-items: center; gap: 8px; padding: 10px 18px;">
                  <span id="audio-explain-icon">${speakerIcon(16)}</span>
                  <span id="audio-explain-text">Bol Kar Suniye (Listen Explanation)</span>
                </button>
              </div>
            </div>

            <!-- 3 Pillars Grid: KYUN, KAISE, KIS LIYE -->
            <div class="explanation-pillars-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px;">
              
              <!-- 1. KYUN Istemal Hota Hai? -->
              <div class="explanation-pillar-card" style="background: #F8FAFC; border: 1.5px solid #E2E8F0; border-top: 4px solid #2563eb; border-radius: var(--radius-md); padding: 18px;">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                  <h4 style="font-size: 0.98rem; font-weight: 800; color: #1e3a8a; margin: 0;">1. KYUN? (Why?)</h4>
                </div>
                <div style="font-size: 0.74rem; font-weight: 800; color: var(--ha-navy); text-transform: uppercase; margin-bottom: 4px; letter-spacing: 0.04em;">Wajah / Purpose:</div>
                <p style="font-size: 0.88rem; color: var(--ha-text-main); line-height: 1.5; margin-bottom: 10px;">
                  ${guide.kyun.urdu}
                </p>
                <div style="font-size: 0.8rem; color: var(--ha-text-muted); background: #FFFFFF; border-radius: var(--radius-sm); padding: 8px 10px; border-left: 3px solid #2563eb; line-height: 1.4;">
                  <em>"${guide.kyun.english}"</em>
                </div>
              </div>

              <!-- 2. KAISE Istemal Hota Hai? -->
              <div class="explanation-pillar-card" style="background: #F8FAFC; border: 1.5px solid #E2E8F0; border-top: 4px solid #d97706; border-radius: var(--radius-md); padding: 18px;">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                  <h4 style="font-size: 0.98rem; font-weight: 800; color: #b45309; margin: 0;">2. KAISE? (How?)</h4>
                </div>
                <div style="font-size: 0.74rem; font-weight: 800; color: var(--ha-navy); text-transform: uppercase; margin-bottom: 4px; letter-spacing: 0.04em;">Formula & Rule:</div>
                <p style="font-size: 0.88rem; color: var(--ha-text-main); line-height: 1.5; margin-bottom: 10px;">
                  ${guide.kaise.urdu}
                </p>
                <div style="background: #FFFBEB; border: 1px dashed #d97706; border-radius: var(--radius-sm); padding: 8px 10px; font-size: 0.82rem; font-weight: 800; color: #92400e; line-height: 1.4;">
                  ${guide.kaise.formula}
                </div>
              </div>

              <!-- 3. KIS LIYE Istemal Hota Hai? -->
              <div class="explanation-pillar-card" style="background: #F8FAFC; border: 1.5px solid #E2E8F0; border-top: 4px solid #059669; border-radius: var(--radius-md); padding: 18px;">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                  <h4 style="font-size: 0.98rem; font-weight: 800; color: #065f46; margin: 0;">3. KIS LIYE? (What for?)</h4>
                </div>
                <div style="font-size: 0.74rem; font-weight: 800; color: var(--ha-navy); text-transform: uppercase; margin-bottom: 6px; letter-spacing: 0.04em;">Rozmarrah Istemal:</div>
                <ul style="margin: 0; padding-left: 18px; font-size: 0.82rem; color: var(--ha-text-main); display: flex; flex-direction: column; gap: 5px; line-height: 1.35;">
                  ${(guide.kisLiye.points || []).map(pt => `<li>${pt}</li>`).join('')}
                </ul>
              </div>

            </div>
          </div>

          <!-- Vocabulary / Rule Reference Table -->
          <div style="margin-bottom: 30px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; flex-wrap: wrap; gap: 8px;">
              <h3 style="font-size: 1.15rem; color: var(--ha-navy); margin: 0;">
                Key Vocabulary & Forms Taught in Class
              </h3>
              <span style="font-size: 0.8rem; color: var(--ha-text-muted); display: flex; align-items: center; gap: 4px;">
                ${speakerIcon(13)} Click icon to listen pronunciation
              </span>
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px;">
              ${(selectedTopic.vocab || []).map(v => `
                <div style="background: #FFFFFF; border: 1.5px solid var(--ha-border); border-radius: var(--radius-md); padding: 12px 16px;">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                    <strong style="color: var(--ha-navy); font-size: 1.05rem;">${v.word}</strong>
                    <div style="display: flex; align-items: center; gap: 6px;">
                      <span style="font-size: 0.75rem; font-weight: 700; color: ${selectedTopic.color}; background: var(--ha-navy-subtle); padding: 2px 8px; border-radius: var(--radius-pill);">${v.category || v.pronoun || ''}</span>
                      <button class="btn-speak-mini" data-word="${v.word}" title="Listen to pronunciation" style="background: none; border: none; cursor: pointer; display: inline-flex; align-items: center; color: var(--ha-navy);">
                        ${speakerIcon(14)}
                      </button>
                    </div>
                  </div>
                  ${v.opposite ? `<div style="font-size: 0.82rem; color: var(--ha-red); margin-bottom: 4px;">Opposite: <strong>${v.opposite}</strong></div>` : ''}
                  <div style="font-size: 0.88rem; color: var(--ha-text-muted); font-style: italic;">
                    “${v.example}”
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Classroom Examples -->
          <div style="margin-bottom: 32px;">
            <h3 style="font-size: 1.15rem; color: var(--ha-navy); margin-bottom: 12px;">
              Real Classroom Sentences
            </h3>
            <div style="display: flex; flex-direction: column; gap: 10px;">
              ${(selectedTopic.examples || []).map((ex, idx) => `
                <div style="display: flex; align-items: center; justify-content: space-between; padding: 14px 18px; background: #F8FAFC; border: 1px solid var(--ha-border); border-radius: var(--radius-md); flex-wrap: wrap; gap: 10px;">
                  <div style="display: flex; align-items: center; gap: 12px;">
                    <span style="background: var(--ha-navy); color: #fff; width: 26px; height: 26px; border-radius: var(--radius-pill); display: flex; align-items: center; justify-content: center; font-size: 0.8rem; font-weight: 800;">${idx + 1}</span>
                    <div>
                      <div style="font-size: 1.05rem; font-weight: 700; color: var(--ha-navy);">${ex.english}</div>
                      <div style="font-size: 0.82rem; color: var(--ha-text-muted);">${ex.note}</div>
                    </div>
                  </div>
                  <button class="btn btn-outline btn-sm btn-speak-sentence" data-sentence="${ex.english}" title="Listen to pronunciation" style="display: inline-flex; align-items: center; gap: 6px;">
                    ${speakerIcon(14)} Speak
                  </button>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Interactive Topic Activities Hub Link -->
          <div style="margin-bottom: 28px; background: #F8FAFC; border: 1.5px solid var(--ha-border); border-left: 5px solid ${selectedTopic.color}; border-radius: var(--radius-lg); padding: 20px 24px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; flex-wrap: wrap; gap: 8px;">
              <div>
                <span class="badge badge-navy" style="font-size: 0.72rem;">Multi-Format Practice</span>
                <h3 style="font-size: 1.15rem; color: var(--ha-navy); margin: 2px 0 0;">Practice ${selectedTopic.title} Through Activities</h3>
              </div>
              <span style="font-size: 0.8rem; color: var(--ha-text-muted);">Play beyond regular MCQs</span>
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 10px;">
              <button class="btn btn-outline btn-sm btn-open-act-type" data-act="scramble" style="text-align: left; padding: 10px 14px; display: inline-flex; align-items: center; gap: 8px; font-weight: 700;">
                ${puzzleIcon(15)} <span>Sentence Scramble</span>
              </button>
              <button class="btn btn-outline btn-sm btn-open-act-type" data-act="matching" style="text-align: left; padding: 10px 14px; display: inline-flex; align-items: center; gap: 8px; font-weight: 700;">
                ${refreshIcon(15)} <span>Pair Matching</span>
              </button>
              <button class="btn btn-outline btn-sm btn-open-act-type" data-act="true_false" style="text-align: left; padding: 10px 14px; display: inline-flex; align-items: center; gap: 8px; font-weight: 700;">
                ${checkCircleIcon(15)} <span>True or False</span>
              </button>
              <button class="btn btn-outline btn-sm btn-open-act-type" data-act="builder" style="text-align: left; padding: 10px 14px; display: inline-flex; align-items: center; gap: 8px; font-weight: 700;">
                ${bookIcon(15)} <span>Sentence Builder</span>
              </button>
            </div>
          </div>

          <!-- Action Button to step 2 -->
          <div style="display: flex; justify-content: flex-end; align-items: center; gap: 16px; border-top: 1px solid var(--ha-border); padding-top: 20px;">
            <span style="font-size: 0.88rem; color: var(--ha-text-muted);">
              Learned the concept? Let's practice!
            </span>
            <button class="btn btn-primary btn-lg" id="btn-goto-practice" style="background: ${selectedTopic.color};">
              Start Practice Exercises →
            </button>
          </div>
        </div>

      </div>
    `;

    // Record 'learn' completion in state (+10 XP)
    if (student) {
      stateManager.recordTopicProgress(selectedTopic.id, 'learn');
    }

    // Interactive activities buttons
    container.querySelectorAll('.btn-open-act-type').forEach(btn => {
      btn.addEventListener('click', () => {
        sound.stopSpeech();
        sound.playClick();
        const act = btn.dataset.act;
        if (onNavigate) {
          onNavigate('activities');
          window.dispatchEvent(new CustomEvent('ha:open-activity', {
            detail: { topicId: selectedTopic.id, activityType: act }
          }));
        }
      });
    });

    // Audio Explanation Button
    const audioExplainBtn = container.querySelector('#btn-topic-audio-explain');
    const audioIcon = container.querySelector('#audio-explain-icon');
    const audioText = container.querySelector('#audio-explain-text');

    audioExplainBtn?.addEventListener('click', () => {
      if (sound.isSpeaking()) {
        sound.stopSpeech();
        audioExplainBtn.classList.remove('is-speaking');
        if (audioIcon) audioIcon.textContent = '🔊';
        if (audioText) audioText.textContent = 'Bol Kar Suniye (Listen Explanation)';
      } else {
        const narration = guide.audioNarration || selectedTopic.summary;
        sound.playClick();
        audioExplainBtn.classList.add('is-speaking');
        if (audioIcon) audioIcon.textContent = '⏹️';
        if (audioText) audioText.textContent = 'Sir Zubair is speaking... (Click to stop)';

        sound.speak(narration, {
          rate: 0.88,
          pitch: 1.0,
          onEnd: () => {
            audioExplainBtn.classList.remove('is-speaking');
            if (audioIcon) audioIcon.textContent = '🔊';
            if (audioText) audioText.textContent = 'Bol Kar Suniye (Listen Explanation)';
          }
        });
      }
    });

    container.querySelector('#btn-back-to-topics')?.addEventListener('click', () => {
      sound.stopSpeech();
      sound.playClick();
      selectedTopic = null;
      render();
    });

    container.querySelector('#btn-goto-practice')?.addEventListener('click', () => {
      sound.stopSpeech();
      sound.playClick();
      initPracticeQuestions();
      currentStep = 'practice';
      render();
      window.scrollTo(0, 0);
    });

    // Vocabulary mini speaker buttons
    container.querySelectorAll('.btn-speak-mini').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const word = btn.dataset.word;
        if (word) sound.speak(word, 0.85);
      });
    });

    // Example sentences speaker buttons
    container.querySelectorAll('.btn-speak-sentence').forEach(btn => {
      btn.addEventListener('click', () => {
        const sentence = btn.dataset.sentence;
        if (sentence) sound.speak(sentence, 0.88);
      });
    });
  }

  // Step 2: PRACTICE
  function renderPracticeStep() {
    if (!practiceQuestionsList || practiceQuestionsList.length === 0) {
      initPracticeQuestions();
    }
    const questions = practiceQuestionsList;
    if (practiceIndex >= questions.length) {
      // Completed all practice questions!
      sound.playSuccess();
      if (student) {
        stateManager.recordTopicProgress(selectedTopic.id, 'practice', {
          xp: 15,
          correctCount: practiceAnswers.filter(a => a.isCorrect).length,
          totalCount: questions.length
        });
      }

      container.innerHTML = `
        <div class="container" style="padding-top: 40px; text-align: center; max-width: 600px;">
          <div class="ha-card" style="padding: 40px 28px;">
            <span style="font-size: 4rem;">🎯</span>
            <h2 style="font-size: 2rem; color: var(--ha-navy); margin: 12px 0;">Practice Complete!</h2>
            <p style="font-size: 1rem; color: var(--ha-text-muted); margin-bottom: 20px;">
              Great job practicing <strong>${selectedTopic.title}</strong>! You earned <strong>+15 XP</strong>.
              Now, prove your mastery in the official 5-question Topic Quiz!
            </p>
            <div style="display: flex; justify-content: center; gap: 14px; flex-wrap: wrap;">
              <button class="btn btn-outline" id="btn-repractice">Practice Again</button>
              <button class="btn btn-primary btn-lg" id="btn-goto-quiz" style="background: var(--ha-red); display: inline-flex; align-items: center; gap: 8px;">
                ${graduationCapIcon(18)} Take Official Topic Quiz
              </button>
            </div>
          </div>
        </div>
      `;

      container.querySelector('#btn-repractice')?.addEventListener('click', () => {
        sound.playClick();
        initPracticeQuestions();
        render();
        window.scrollTo(0, 0);
      });

      container.querySelector('#btn-goto-quiz')?.addEventListener('click', () => {
        sound.playClick();
        initQuizQuestions();
        currentStep = 'quiz';
        render();
        window.scrollTo(0, 0);
      });
      return;
    }

    const q = questions[practiceIndex];

    container.innerHTML = `
      <div class="container" style="padding-top: 24px; padding-bottom: 50px; max-width: 760px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
          <button class="btn btn-outline btn-sm" id="btn-back-learn">← Back to Lesson</button>
          <span class="badge badge-gold">2. PRACTICE (${practiceIndex + 1} / ${questions.length})</span>
        </div>

        <div class="ha-card topic-master-card" style="border-top: 5px solid ${selectedTopic.color};">
          <div style="font-size: 0.82rem; font-weight: 800; color: ${selectedTopic.color}; text-transform: uppercase; margin-bottom: 6px;">
            Practice Exercise ${practiceIndex + 1}
          </div>

          ${renderConceptVisual(selectedTopic.id, q)}

          <h2 style="font-size: 1.4rem; color: var(--ha-navy); margin-bottom: 24px;">
            ${q.question}
          </h2>

          <div style="display: grid; grid-template-columns: 1fr; gap: 12px; margin-bottom: 24px;" id="practice-options-grid">
            ${(q.options || []).map((opt, idx) => `
              <button class="practice-opt-btn" data-index="${idx}" data-text="${opt}"
                style="padding: 14px 20px; font-size: 1rem; font-weight: 700; color: var(--ha-navy); background: #F8FAFC; border: 2px solid var(--ha-border); border-radius: var(--radius-md); text-align: left; cursor: pointer; transition: all 0.15s;">
                <span style="display: inline-block; width: 28px; height: 28px; line-height: 28px; text-align: center; border-radius: var(--radius-pill); background: var(--ha-navy-subtle); margin-right: 12px; font-size: 0.85rem;">${String.fromCharCode(65 + idx)}</span>
                ${opt}
              </button>
            `).join('')}
          </div>

          <div id="practice-feedback-box" style="display: none; padding: 16px; border-radius: var(--radius-md); margin-bottom: 20px;">
            <div id="practice-feedback-title" style="font-size: 1.05rem; font-weight: 800; margin-bottom: 4px; display: flex; align-items: center; gap: 6px;"></div>
            <div id="practice-feedback-text" style="font-size: 0.9rem;"></div>
          </div>

          <div style="display: flex; justify-content: flex-end;">
            <button class="btn btn-primary" id="btn-next-practice" style="display: none; background: ${selectedTopic.color};">
              Next Question →
            </button>
          </div>
        </div>
      </div>
    `;

    container.querySelector('#btn-back-learn')?.addEventListener('click', () => {
      currentStep = 'learn';
      render();
    });

    const optButtons = container.querySelectorAll('.practice-opt-btn');
    const feedbackBox = container.querySelector('#practice-feedback-box');
    const feedbackTitle = container.querySelector('#practice-feedback-title');
    const feedbackText = container.querySelector('#practice-feedback-text');
    const nextBtn = container.querySelector('#btn-next-practice');

    optButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        optButtons.forEach(b => b.disabled = true);
        const chosenIdx = parseInt(btn.dataset.index);
        const chosenText = btn.dataset.text;

        const isCorrect = q.type === 'fill' ? chosenText.toLowerCase() === q.answer.toLowerCase() : chosenIdx === q.answer;

        practiceAnswers.push({ question: q.question, chosen: chosenText, isCorrect });

        if (isCorrect) {
          sound.playCorrect();
          btn.style.borderColor = 'var(--ha-success)';
          btn.style.background = 'var(--ha-success-bg)';
          btn.style.color = 'var(--ha-success)';
          feedbackBox.style.background = 'var(--ha-success-bg)';
          feedbackBox.style.color = '#065F46';
          feedbackBox.style.border = '1px solid var(--ha-success)';
          feedbackTitle.innerHTML = `${checkCircleIcon(18)} Correct!`;
        } else {
          sound.playWrong();
          btn.style.borderColor = 'var(--ha-error)';
          btn.style.background = 'var(--ha-red-light)';
          btn.style.color = 'var(--ha-red)';
          feedbackBox.style.background = 'var(--ha-red-light)';
          feedbackBox.style.color = '#991B1B';
          feedbackBox.style.border = '1px solid var(--ha-red)';
          feedbackTitle.innerHTML = `${infoIcon(18)} Not quite!`;
        }

        feedbackText.textContent = q.explanation || '';
        feedbackBox.style.display = 'block';
        nextBtn.style.display = 'inline-flex';
      });
    });

    nextBtn.addEventListener('click', () => {
      sound.playClick();
      practiceIndex++;
      render();
      window.scrollTo(0, 0);
    });
  }

  // Step 3: QUIZ
  function renderQuizStep() {
    if (!quizQuestionsList || quizQuestionsList.length === 0) {
      initQuizQuestions();
    }
    const questions = quizQuestionsList;
    if (quizIndex >= questions.length) {
      // Calculate Quiz Results
      const correctCount = quizAnswers.filter(a => a.isCorrect).length;
      const totalCount = questions.length;
      const scorePercent = Math.round((correctCount / totalCount) * 100);
      const passed = scorePercent >= 80;

      lastQuizResult = {
        correctCount,
        totalCount,
        scorePercent,
        passed,
        answers: quizAnswers
      };

      if (passed) {
        sound.playLevelUp();
        fireConfetti(3500);
      } else {
        sound.playClick();
      }

      if (student) {
        stateManager.recordTopicProgress(selectedTopic.id, 'quiz', {
          scorePercent,
          correctCount,
          totalCount
        });
      }

      currentStep = 'result';
      render();
      window.scrollTo(0, 0);
      return;
    }

    const q = questions[quizIndex];

    container.innerHTML = `
      <div class="container" style="padding-top: 24px; padding-bottom: 50px; max-width: 760px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
          <span class="badge badge-red">3. OFFICIAL TOPIC QUIZ</span>
          <span style="font-weight: 700; color: var(--ha-navy);">Question ${quizIndex + 1} of ${questions.length}</span>
        </div>

        <div class="progress-container" style="margin-bottom: 24px; height: 8px;">
          <div class="progress-bar-fill red" style="width: ${((quizIndex + 1) / questions.length) * 100}%;"></div>
        </div>

        <div class="ha-card topic-master-card" style="border-top: 5px solid var(--ha-red);">
          <div style="font-size: 0.85rem; font-weight: 800; color: var(--ha-red); text-transform: uppercase; margin-bottom: 8px;">
            ${selectedTopic.title} Quiz
          </div>

          ${renderConceptVisual(selectedTopic.id, q)}

          <h2 style="font-size: 1.45rem; color: var(--ha-navy); margin-bottom: 24px; line-height: 1.4;">
            ${q.question}
          </h2>

          <div style="display: grid; grid-template-columns: 1fr; gap: 12px; margin-bottom: 24px;" id="quiz-options-grid">
            ${(q.options || []).map((opt, idx) => `
              <button class="quiz-opt-btn" data-index="${idx}" data-text="${opt}"
                style="padding: 14px 20px; font-size: 1rem; font-weight: 700; color: var(--ha-navy); background: #FFFFFF; border: 2px solid var(--ha-border); border-radius: var(--radius-md); text-align: left; cursor: pointer; transition: all 0.15s;">
                <span style="display: inline-block; width: 28px; height: 28px; line-height: 28px; text-align: center; border-radius: var(--radius-pill); background: var(--ha-navy-subtle); margin-right: 12px; font-size: 0.85rem;">${String.fromCharCode(65 + idx)}</span>
                ${opt}
              </button>
            `).join('')}
          </div>

          <div id="quiz-feedback-box" style="display: none; padding: 16px; border-radius: var(--radius-md); margin-bottom: 20px;">
            <div id="quiz-feedback-title" style="font-size: 1.05rem; font-weight: 800; margin-bottom: 4px; display: flex; align-items: center; gap: 6px;"></div>
            <div id="quiz-feedback-text" style="font-size: 0.9rem;"></div>
          </div>

          <div style="display: flex; justify-content: flex-end;">
            <button class="btn btn-secondary btn-lg" id="btn-next-quiz" style="display: none;">
              ${quizIndex === questions.length - 1 ? 'Finish Quiz & View Results →' : 'Next Question →'}
            </button>
          </div>
        </div>
      </div>
    `;

    const optButtons = container.querySelectorAll('.quiz-opt-btn');
    const feedbackBox = container.querySelector('#quiz-feedback-box');
    const feedbackTitle = container.querySelector('#quiz-feedback-title');
    const feedbackText = container.querySelector('#quiz-feedback-text');
    const nextBtn = container.querySelector('#btn-next-quiz');

    optButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        optButtons.forEach(b => b.disabled = true);
        const chosenIdx = parseInt(btn.dataset.index);
        const chosenText = btn.dataset.text;
        const isCorrect = chosenIdx === q.answer;

        quizAnswers.push({
          question: q.question,
          chosen: chosenText,
          correctText: q.options[q.answer],
          isCorrect,
          explanation: q.explanation
        });

        if (isCorrect) {
          sound.playCorrect();
          btn.style.borderColor = 'var(--ha-success)';
          btn.style.background = 'var(--ha-success-bg)';
          btn.style.color = 'var(--ha-success)';
          feedbackBox.style.background = 'var(--ha-success-bg)';
          feedbackBox.style.color = '#065F46';
          feedbackBox.style.border = '1px solid var(--ha-success)';
          feedbackTitle.innerHTML = `${checkCircleIcon(18)} Correct Answer!`;
        } else {
          sound.playWrong();
          btn.style.borderColor = 'var(--ha-error)';
          btn.style.background = 'var(--ha-red-light)';
          btn.style.color = 'var(--ha-red)';
          feedbackBox.style.background = 'var(--ha-red-light)';
          feedbackBox.style.color = '#991B1B';
          feedbackBox.style.border = '1px solid var(--ha-red)';
          feedbackTitle.innerHTML = `${infoIcon(18)} Incorrect (Correct: "${q.options[q.answer]}")`;
        }

        feedbackText.textContent = q.explanation || '';
        feedbackBox.style.display = 'block';
        nextBtn.style.display = 'inline-flex';
      });
    });

    nextBtn.addEventListener('click', () => {
      sound.playClick();
      quizIndex++;
      render();
      window.scrollTo(0, 0);
    });
  }

  // Step 4 & 5: RESULT & XP REWARD
  function renderResultStep() {
    const res = lastQuizResult;
    if (!res) {
      renderTopicSelection();
      return;
    }

    container.innerHTML = `
      <div class="container" style="padding-top: 30px; padding-bottom: 60px; max-width: 760px;">
        
        <!-- Score Card -->
        <div class="ha-card topic-master-card" style="text-align: center; border-top: 6px solid ${res.passed ? 'var(--ha-gold)' : 'var(--ha-red)'}; margin-bottom: 30px;">
          <div style="display: flex; justify-content: center; margin-bottom: 16px; color: ${res.passed ? 'var(--ha-gold)' : 'var(--ha-navy)'};">
            ${res.passed ? trophyIcon(64) : bookIcon(64)}
          </div>
          <h1 style="font-size: 2.2rem; color: var(--ha-navy); margin-bottom: 6px;">
            ${res.passed ? 'Topic Mastered!' : 'Keep Practicing!'}
          </h1>
          <p style="font-size: 1.05rem; color: var(--ha-text-muted); margin-bottom: 24px;">
            ${res.passed 
              ? `Outstanding work on <strong>${selectedTopic.title}</strong>! You passed the official quiz.` 
              : `You scored ${res.scorePercent}%. Review your mistakes below and retake the quiz to earn the full 50 XP!`
            }
          </p>

          <!-- Big Score Badge -->
          <div style="display: inline-flex; align-items: center; justify-content: center; gap: 16px; flex-wrap: wrap; background: var(--ha-navy-subtle); padding: 14px 22px; border-radius: var(--radius-lg); margin-bottom: 24px; max-width: 100%;">
            <div>
              <div style="font-size: 0.8rem; font-weight: 800; color: var(--ha-text-muted); text-transform: uppercase;">YOUR SCORE</div>
              <div style="font-size: 2.2rem; font-weight: 800; color: ${res.passed ? 'var(--ha-navy)' : 'var(--ha-red)'};">
                ${res.correctCount} / ${res.totalCount} (${res.scorePercent}%)
              </div>
            </div>
            ${res.passed ? `
              <div style="border-left: 2px solid var(--ha-border); padding-left: 16px; text-align: left;">
                <div style="font-size: 0.8rem; font-weight: 800; color: var(--ha-gold-dark); text-transform: uppercase;">REWARD EARNED</div>
                <div style="font-size: 1.6rem; font-weight: 800; color: var(--ha-gold-dark);">+50 XP</div>
              </div>
            ` : ''}
          </div>

          <!-- Buttons -->
          <div style="display: flex; justify-content: center; gap: 14px; flex-wrap: wrap;">
            <button class="btn btn-outline" id="btn-retake-quiz" style="display: inline-flex; align-items: center; gap: 8px;">
              ${refreshIcon(16)} Retake Quiz (Fresh Questions)
            </button>
            <button class="btn btn-secondary" id="btn-result-activities" style="display: inline-flex; align-items: center; gap: 8px;">
              ${gamepadIcon(16)} Play Topic Activities
            </button>
            <button class="btn btn-primary" id="btn-result-fulltest" style="background: var(--ha-navy); display: inline-flex; align-items: center; gap: 8px;">
              ${graduationCapIcon(16)} Take Full Grammar Test
            </button>
            <button class="btn btn-outline" id="btn-finish-topic">
              All Topics →
            </button>
          </div>
        </div>

        <!-- Mistake / Question Breakdown -->
        <div class="ha-card" style="padding: 28px;">
          <h3 style="font-size: 1.2rem; color: var(--ha-navy); margin-bottom: 18px;">
            Question Breakdown
          </h3>
          <div style="display: flex; flex-direction: column; gap: 14px;">
            ${res.answers.map((ans, idx) => `
              <div style="padding: 14px 18px; border-radius: var(--radius-md); border: 1.5px solid ${ans.isCorrect ? 'var(--ha-success)' : 'var(--ha-red)'}; background: ${ans.isCorrect ? 'var(--ha-success-bg)' : 'var(--ha-red-light)'};">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                  <strong style="color: var(--ha-navy); font-size: 0.95rem;">Q${idx + 1}: ${ans.question}</strong>
                  <span style="font-size: 0.8rem; font-weight: 800; color: ${ans.isCorrect ? 'var(--ha-success)' : 'var(--ha-red)'}; display: inline-flex; align-items: center; gap: 4px;">
                    ${ans.isCorrect ? `${checkCircleIcon(14)} CORRECT` : `${infoIcon(14)} INCORRECT`}
                  </span>
                </div>
                <div style="font-size: 0.85rem; margin-bottom: 4px;">
                  Your answer: <strong>${ans.chosen}</strong>
                  ${!ans.isCorrect ? ` • Correct answer: <strong style="color: var(--ha-navy);">${ans.correctText}</strong>` : ''}
                </div>
                ${ans.explanation ? `<div style="font-size: 0.82rem; opacity: 0.85; font-style: italic; display: flex; align-items: flex-start; gap: 6px; margin-top: 4px;">${infoIcon(13)} <span>${ans.explanation}</span></div>` : ''}
              </div>
            `).join('')}
          </div>
        </div>

      </div>
    `;

    container.querySelector('#btn-retake-quiz')?.addEventListener('click', () => {
      sound.playClick();
      initQuizQuestions();
      currentStep = 'quiz';
      render();
      window.scrollTo(0, 0);
    });

    container.querySelector('#btn-result-activities')?.addEventListener('click', () => {
      sound.playClick();
      if (onNavigate) {
        onNavigate('activities');
        window.dispatchEvent(new CustomEvent('ha:open-activity', {
          detail: { topicId: selectedTopic.id }
        }));
      }
    });

    container.querySelector('#btn-result-fulltest')?.addEventListener('click', () => {
      sound.playClick();
      if (onNavigate) onNavigate('full-test');
    });

    container.querySelector('#btn-finish-topic')?.addEventListener('click', () => {
      sound.playClick();
      selectedTopic = null;
      render();
      window.scrollTo(0, 0);
    });
  }

  // Initial render
  render();
}
