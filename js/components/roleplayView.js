// Home Academy — Roleplay Presentations Component
// Strictly based on real physical class presentations taught by Sir Zubair
// Features: Hub, Scenario & Expressions (with TTS), Randomized Practice, Create Your Own Sentence, Build Roleplay, Mini Roleplay Dialogue, Speaking Practice, Results & Real XP

import { stateManager } from '../state.js';
import { sound } from '../audio.js';
import { fireConfetti } from '../confetti.js';
import { validateStudentSentence } from '../data/roleplay-data.js';
import { renderRoleplayCreativeBanner } from './creativeVisuals.js';
import { 
  speakerIcon, micIcon, roleplayIcon, checkCircleIcon, infoIcon, arrowLeftIcon, 
  bookIcon, puzzleIcon, pencilIcon, trophyIcon, refreshIcon, userIcon, graduationCapIcon 
} from './icons.js';

// Browser speech synthesis helper for audio pronunciation
function playPronunciation(text) {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.88; // Clear beginner-friendly pace
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
      return true;
    } catch (e) {
      console.warn('Speech synthesis error:', e);
    }
  }
  sound.playClick();
  return false;
}

// Option shuffling helper
function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function renderRoleplaysHub(container, onNavigate, activeRoleplayId = null) {
  if (activeRoleplayId) {
    const roleplay = stateManager.getRoleplayById(activeRoleplayId);
    if (roleplay) {
      renderRoleplayRunner(container, onNavigate, roleplay);
      return;
    }
  }

  const student = stateManager.getCurrentStudent();
  const roleplays = stateManager.getRoleplays();
  const progressInfo = stateManager.getStudentRoleplayProgress(student?.id);

  container.innerHTML = `
    <div class="container" style="padding-top: 24px; padding-bottom: 60px;">
      
      <!-- Top Hero Header -->
      <div style="background: linear-gradient(135deg, #0A2558 0%, #163B7C 100%); color: #FFFFFF; border-radius: var(--radius-xl); padding: 30px 28px; margin-bottom: 30px; box-shadow: var(--ha-shadow-md); position: relative; overflow: hidden;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 20px;">
          <div style="max-width: 680px;">
            <div style="display: inline-flex; align-items: center; gap: 8px; background: rgba(255, 255, 255, 0.15); border: 1px solid rgba(255, 255, 255, 0.3); border-radius: var(--radius-pill); padding: 5px 14px; font-size: 0.82rem; font-weight: 700; margin-bottom: 12px; letter-spacing: 0.04em;">
              ${roleplayIcon(16)} REAL CLASSROOM PRESENTATIONS
            </div>
            <h1 style="font-size: clamp(1.6rem, 3.8vw, 2.3rem); color: #FFFFFF; font-weight: 800; line-height: 1.25; margin-bottom: 10px;">
              Roleplay Presentations
            </h1>
            <p style="font-size: 0.98rem; color: #E2E8F0; line-height: 1.6; margin-bottom: 16px;">
              Practice the real-life conversations and speaking presentations taught by <strong>Sir Zubair</strong> in our physical English class. Learn the situation, master useful spoken expressions, create your own sentences, and speak with confidence.
            </p>
            <div style="display: flex; gap: 14px; flex-wrap: wrap; font-size: 0.85rem; font-weight: 600; color: #CBD5E1;">
              <span>Class Teacher: <strong style="color: #FFFFFF;">Sir Zubair</strong></span>
              <span>•</span>
              <span>5 Real Class Presentations</span>
              <span>•</span>
              <span>Learn → Create → Speak</span>
            </div>
          </div>

          <!-- Overall Progress Card -->
          <div class="ha-card" style="background: rgba(255, 255, 255, 0.96); border: 1.5px solid rgba(255, 255, 255, 0.4); padding: 20px 22px; border-radius: var(--radius-lg); min-width: 230px; text-align: center; color: var(--ha-navy); box-shadow: 0 10px 24px rgba(0,0,0,0.12);">
            <div style="font-size: 0.78rem; font-weight: 800; color: var(--ha-text-muted); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 6px;">
              YOUR ROLEPLAY PROGRESS
            </div>
            <div style="font-size: 2.2rem; font-weight: 800; color: var(--ha-navy); line-height: 1; margin-bottom: 4px;">
              ${progressInfo.completedCount} <span style="font-size: 1.2rem; color: var(--ha-text-muted); font-weight: 600;">/ ${progressInfo.totalCount}</span>
            </div>
            <div style="font-size: 0.82rem; font-weight: 700; color: var(--ha-gold-dark); margin-bottom: 10px;">
              ${progressInfo.overallPercent}% Completed
            </div>
            <div class="progress-container" style="height: 8px; margin: 0 auto; background: #E2E8F0;">
              <div class="progress-bar-fill" style="width: ${progressInfo.overallPercent}%; background: linear-gradient(90deg, var(--ha-red), var(--ha-gold));"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Section Title -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 10px;">
        <div>
          <h2 style="font-size: 1.35rem; color: var(--ha-navy); font-weight: 800; margin: 0;">Class Presentations List</h2>
          <p style="font-size: 0.88rem; color: var(--ha-text-muted); margin: 2px 0 0;">
            Presented in the exact chronological order taught in our physical class (01 through 05).
          </p>
        </div>
      </div>

      <!-- Roleplay Cards Grid -->
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 24px;">
        ${roleplays.map(rp => {
          const prog = student?.roleplayProgress?.[rp.id];
          const isDone = Boolean(prog && prog.completed);
          const scorePercent = prog?.percent || 0;
          return `
            <div class="ha-card roleplay-card" style="border-radius: var(--radius-lg); border-top: 5px solid ${rp.color || 'var(--ha-navy)'}; display: flex; flex-direction: column; justify-content: space-between; height: 100%; overflow: hidden; padding: 0;">
              <!-- Card Creative Scenario Banner -->
              <div style="width: 100%; border-bottom: 1px solid var(--ha-border);">
                ${renderRoleplayCreativeBanner(rp, false)}
              </div>

              <div style="padding: 20px 22px 14px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                  <!-- Card Header -->
                  <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px; gap: 8px;">
                    <div>
                      <span style="font-size: 0.72rem; font-weight: 800; color: var(--ha-red); text-transform: uppercase; letter-spacing: 0.05em;">ROLEPLAY ${rp.number}</span>
                      <h3 style="font-size: 1.15rem; color: var(--ha-navy); font-weight: 800; line-height: 1.3; margin: 2px 0 0;">
                        ${rp.title}
                      </h3>
                    </div>
                    ${isDone ? `
                      <span class="badge" style="background: var(--ha-success-bg); color: var(--ha-success); font-weight: 800; font-size: 0.75rem; padding: 4px 8px; flex-shrink: 0; display: inline-flex; align-items: center; gap: 4px;">
                        ${checkCircleIcon(14)} Complete (${scorePercent}%)
                      </span>
                    ` : `
                      <span class="badge" style="background: var(--ha-navy-subtle); color: var(--ha-text-muted); font-weight: 700; font-size: 0.75rem; padding: 4px 8px; flex-shrink: 0;">
                        Not Started
                      </span>
                    `}
                  </div>

                  <!-- Scenario Explanation -->
                  <p style="font-size: 0.88rem; color: var(--ha-text-muted); line-height: 1.5; margin-bottom: 12px;">
                    ${rp.situation || rp.scenario}
                  </p>

                  <!-- Characters -->
                  ${rp.characters && rp.characters.length > 0 ? `
                    <div style="display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 14px;">
                      ${rp.characters.map(c => `
                        <span class="badge badge-navy" style="font-size: 0.72rem; padding: 2px 8px; display: inline-flex; align-items: center; gap: 4px;">
                          <span>${c.avatar || '👤'}</span> <strong>${c.name}</strong> (${c.role})
                        </span>
                      `).join('')}
                    </div>
                  ` : ''}

                  <!-- Grammar Focus Pills -->
                  <div style="margin-bottom: 16px;">
                    <div style="font-size: 0.72rem; font-weight: 800; color: var(--ha-navy); text-transform: uppercase; margin-bottom: 6px; display: flex; align-items: center; gap: 5px;">
                      ${bookIcon(13)} Grammar Focus:
                    </div>
                    <div style="display: flex; flex-wrap: wrap; gap: 6px;">
                      ${rp.grammarFocus.map(g => `
                        <span class="badge" style="background: #FEF7E8; border: 1px solid rgba(245, 166, 35, 0.4); color: var(--ha-gold-dark); font-weight: 700; font-size: 0.76rem;">
                          ${g}
                        </span>
                      `).join('')}
                    </div>
                  </div>

                  <!-- Features list -->
                  <div style="background: #F8FAFC; border-radius: var(--radius-sm); padding: 10px 12px; margin-bottom: 18px; font-size: 0.8rem; color: var(--ha-text-muted); display: flex; flex-direction: column; gap: 6px;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                      <span style="color: var(--ha-navy);">${speakerIcon(14)}</span>
                      <span><strong>${rp.spokenExpressions.length}</strong> Spoken Expressions from Teacher</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 8px;">
                      <span style="color: var(--ha-navy);">${pencilIcon(14)}</span>
                      <span>Create Your Own Sentences</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 8px;">
                      <span style="color: var(--ha-navy);">${roleplayIcon(14)}</span>
                      <span>Interactive Mini Roleplay Dialogue</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 8px;">
                      <span style="color: var(--ha-navy);">${micIcon(14)}</span>
                      <span>Speaking Pronunciation Practice</span>
                    </div>
                  </div>
                </div>

                <!-- Action Button -->
                <div style="padding-top: 4px;">
                  <button class="btn ${isDone ? 'btn-outline' : 'btn-primary'} btn-block start-roleplay-btn" data-rpid="${rp.id}" style="width: 100%;">
                    ${isDone ? 'Practice Again' : 'Start Presentation'}
                  </button>
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;

  // Attach button click listeners
  container.querySelectorAll('.start-roleplay-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      sound.playClick();
      const rpId = btn.dataset.rpid;
      const rp = stateManager.getRoleplayById(rpId);
      if (rp) {
        renderRoleplayRunner(container, onNavigate, rp);
        window.scrollTo(0, 0);
      }
    });
  });
}

// Interactive Roleplay Learning Experience Runner
export function renderRoleplayRunner(container, onNavigate, roleplayOrId) {
  const roleplay = typeof roleplayOrId === 'string' ? stateManager.getRoleplayById(roleplayOrId) : roleplayOrId;
  if (!roleplay) {
    renderRoleplaysHub(container, onNavigate);
    return;
  }
  let currentStep = 'learn'; // 'learn' | 'practice' | 'create' | 'dialogue' | 'speaking' | 'result'
  let practiceIndex = 0;
  let practiceScore = 0;
  let userSentencesCreated = [];
  let currentPromptIndex = 0;
  let dialogueTurnIndex = 0;
  let speakingDrillIndex = 0;
  let submissionToken = 'rp_sub_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);

  // Randomize practice questions for this session
  const sessionQuestions = shuffle(roleplay.practiceQuestions || []).map(q => {
    const shuffledOpts = shuffle(q.options);
    const correctText = q.options[q.correct];
    const newCorrectIdx = shuffledOpts.indexOf(correctText);
    return {
      ...q,
      options: shuffledOpts,
      correct: newCorrectIdx
    };
  });

  function renderView() {
    container.innerHTML = `
      <div class="container" style="padding-top: 20px; padding-bottom: 60px; max-width: 920px;">
        
        <!-- Top Back Navigation Bar -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 10px;">
          <button class="btn btn-outline btn-sm" id="btn-back-to-hub" style="display: inline-flex; align-items: center; gap: 6px;">
            ${arrowLeftIcon(15)} All Roleplays
          </button>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="badge badge-navy">Roleplay ${roleplay.number} of 05</span>
            <span class="badge badge-gold">Sir Zubair's Class</span>
          </div>
        </div>

        <!-- Roleplay Banner Header with Creative Scenario Visualizer -->
        <div class="ha-card" style="padding: 0; border-radius: var(--radius-lg); border-top: 6px solid ${roleplay.color || 'var(--ha-navy)'}; margin-bottom: 22px; overflow: hidden;">
          <div style="width: 100%; border-bottom: 1px solid var(--ha-border);">
            ${renderRoleplayCreativeBanner(roleplay, true)}
          </div>

          <div style="padding: 20px 24px;">
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 10px;">
              <span style="background: var(--ha-navy); color: #fff; padding: 4px 10px; border-radius: var(--radius-sm); font-size: 0.72rem; font-weight: 800; letter-spacing: 0.05em; text-transform: uppercase;">
                ROLEPLAY ${roleplay.number}
              </span>
              <h1 style="font-size: clamp(1.35rem, 3vw, 1.85rem); color: var(--ha-navy); font-weight: 800; margin: 0; line-height: 1.25;">
                ${roleplay.title}
              </h1>
            </div>
            
            <!-- Situation Box -->
            <div style="font-size: 0.95rem; color: var(--ha-text-main); line-height: 1.55; margin-bottom: 14px; background: #F8FAFC; padding: 12px 16px; border-radius: var(--radius-md); border-left: 4px solid var(--ha-navy);">
              <div style="font-size: 0.76rem; font-weight: 800; color: var(--ha-navy); text-transform: uppercase; margin-bottom: 4px;">
                📍 Situation:
              </div>
              <div>${roleplay.situation || roleplay.scenario}</div>
            </div>

            <!-- Characters Row -->
            <div style="margin-bottom: 14px; background: #FFFFFF; border: 1px solid var(--ha-border); border-radius: var(--radius-md); padding: 10px 14px;">
              <div style="font-size: 0.74rem; font-weight: 800; color: var(--ha-navy); text-transform: uppercase; margin-bottom: 6px;">
                👥 Characters:
              </div>
              <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                ${(roleplay.characters && roleplay.characters.length > 0 ? roleplay.characters : [
                  { name: roleplay.miniRoleplay?.roleA || 'Speaker A', role: 'Main Speaker', avatar: '🗣️' },
                  { name: roleplay.miniRoleplay?.roleB || 'Speaker B', role: 'Responding Speaker', avatar: '👂' }
                ]).map(c => `
                  <span class="badge badge-navy" style="display: inline-flex; align-items: center; gap: 6px; font-size: 0.8rem; padding: 4px 10px;">
                    <span>${c.avatar || '👤'}</span>
                    <strong>${c.name}</strong>
                    <span style="opacity: 0.8; font-size: 0.72rem;">(${c.role})</span>
                  </span>
                `).join('')}
              </div>
            </div>

            <!-- Practice Instructions -->
            <div style="margin-bottom: 14px; background: #FFFBEB; border: 1px solid #FDE68A; border-radius: var(--radius-md); padding: 10px 14px;">
              <div style="font-size: 0.74rem; font-weight: 800; color: #92400E; text-transform: uppercase; margin-bottom: 4px;">
                💡 Practice Instructions:
              </div>
              <ul style="margin: 0; padding-left: 18px; font-size: 0.82rem; color: #78350F; line-height: 1.45;">
                ${(roleplay.practiceInstructions || [
                  'Tap the audio button to hear native pronunciation for each spoken expression.',
                  'Repeat each sentence out loud to master clear pronunciation and intonation.',
                  'Practice speaking both characters out loud or with a classmate.'
                ]).map(inst => `<li>${inst}</li>`).join('')}
              </ul>
            </div>

            <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
              <strong style="font-size: 0.8rem; color: var(--ha-navy); text-transform: uppercase; display: flex; align-items: center; gap: 5px;">
                ${bookIcon(13)} Grammar Focus:
              </strong>
              ${roleplay.grammarFocus.map(g => `
                <span class="badge" style="background: var(--ha-navy-subtle); color: var(--ha-navy); font-weight: 700; font-size: 0.78rem;">${g}</span>
              `).join('')}
              <span style="font-size: 0.8rem; color: var(--ha-text-muted); margin-left: 6px;">${roleplay.grammarDescription}</span>
            </div>
          </div>
        </div>

        <!-- Interactive Step Tabs -->
        <div style="display: flex; gap: 6px; overflow-x: auto; padding-bottom: 8px; margin-bottom: 22px; -webkit-overflow-scrolling: touch;">
          <button class="btn btn-sm step-tab ${currentStep === 'learn' ? 'btn-primary' : 'btn-outline'}" data-step="learn" style="display: inline-flex; align-items: center; gap: 6px;">
            ${bookIcon(14)} 1. Spoken Expressions
          </button>
          <button class="btn btn-sm step-tab ${currentStep === 'practice' ? 'btn-primary' : 'btn-outline'}" data-step="practice" style="display: inline-flex; align-items: center; gap: 6px;">
            ${puzzleIcon(14)} 2. Practice (${sessionQuestions.length})
          </button>
          <button class="btn btn-sm step-tab ${currentStep === 'create' ? 'btn-primary' : 'btn-outline'}" data-step="create" style="display: inline-flex; align-items: center; gap: 6px;">
            ${pencilIcon(14)} 3. Create Your Own
          </button>
          <button class="btn btn-sm step-tab ${currentStep === 'dialogue' ? 'btn-primary' : 'btn-outline'}" data-step="dialogue" style="display: inline-flex; align-items: center; gap: 6px;">
            ${roleplayIcon(14)} 4. Mini Roleplay
          </button>
          <button class="btn btn-sm step-tab ${currentStep === 'speaking' ? 'btn-primary' : 'btn-outline'}" data-step="speaking" style="display: inline-flex; align-items: center; gap: 6px;">
            ${micIcon(14)} 5. Speaking Drills
          </button>
        </div>

        <!-- Dynamic Step Content Body -->
        <div id="roleplay-step-mount"></div>

      </div>
    `;

    // Attach step tabs and back button
    container.querySelector('#btn-back-to-hub')?.addEventListener('click', () => {
      sound.playClick();
      renderRoleplaysHub(container, onNavigate, null);
      window.scrollTo(0, 0);
    });

    container.querySelectorAll('.step-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        sound.playClick();
        currentStep = btn.dataset.step;
        renderView();
      });
    });

    const mount = container.querySelector('#roleplay-step-mount');
    if (!mount) return;

    // Render active step
    switch (currentStep) {
      case 'learn':
        renderLearnStep(mount);
        break;
      case 'practice':
        renderPracticeStep(mount);
        break;
      case 'create':
        renderCreateStep(mount);
        break;
      case 'dialogue':
        renderDialogueStep(mount);
        break;
      case 'speaking':
        renderSpeakingStep(mount);
        break;
      case 'result':
        renderResultStep(mount);
        break;
      default:
        renderLearnStep(mount);
    }
  }

  // STEP 1: Learn Scenario & Spoken Expressions
  function renderLearnStep(mount) {
    mount.innerHTML = `
      <div class="ha-card" style="padding: 26px; border-radius: var(--radius-lg); margin-bottom: 24px;">
        <div style="margin-bottom: 20px;">
          <h2 style="font-size: 1.3rem; color: var(--ha-navy); font-weight: 800; margin: 0 0 6px;">
            Spoken Expressions Taught by Sir Zubair
          </h2>
          <p style="font-size: 0.9rem; color: var(--ha-text-muted); margin: 0;">
            Click the <strong>Listen</strong> button on each expression to hear the pronunciation. Remember: these expressions are examples — you will also create your own sentences!
          </p>
        </div>

        <!-- Spoken Expressions Cards -->
        <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 26px;">
          ${roleplay.spokenExpressions.map((exp, idx) => `
            <div style="background: #F8FAFC; border: 1.5px solid var(--ha-border); border-radius: var(--radius-md); padding: 14px 18px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px; transition: border-color 0.2s ease;">
              <div style="display: flex; align-items: flex-start; gap: 12px;">
                <span style="background: var(--ha-navy); color: #fff; border-radius: var(--radius-pill); width: 26px; height: 26px; display: inline-flex; align-items: center; justify-content: center; font-size: 0.78rem; font-weight: 800; flex-shrink: 0; margin-top: 2px;">
                  ${idx + 1}
                </span>
                <div>
                  <div style="font-size: 1.05rem; font-weight: 700; color: var(--ha-navy); margin-bottom: 2px;">
                    “${exp.text}”
                  </div>
                  <div style="font-size: 0.82rem; color: var(--ha-text-muted);">
                    <em>${exp.meaning}</em> ${exp.context ? `• <span style="color: var(--ha-gold-dark); font-weight: 600;">[${exp.context}]</span>` : ''}
                  </div>
                </div>
              </div>

              <button class="btn btn-outline btn-sm tts-listen-btn" data-text="${exp.text}" style="background: #FFFFFF; font-size: 0.8rem; border-radius: var(--radius-pill); display: inline-flex; align-items: center; gap: 6px;">
                ${speakerIcon(14)} Listen
              </button>
            </div>
          `).join('')}
        </div>

        <!-- Key Vocabulary Section -->
        ${roleplay.keyVocab?.length ? `
          <div style="margin-bottom: 26px;">
            <h3 style="font-size: 1.1rem; color: var(--ha-navy); font-weight: 800; margin-bottom: 12px;">
              Key Vocabulary & Terms
            </h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 10px;">
              ${roleplay.keyVocab.map(v => `
                <div style="background: #FFFFFF; border: 1px solid var(--ha-border); border-radius: var(--radius-sm); padding: 10px 14px; box-shadow: var(--ha-shadow-xs);">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                    <strong style="color: var(--ha-navy); font-size: 0.95rem;">${v.word}</strong>
                    <span style="font-size: 0.7rem; color: var(--ha-gold-dark); font-weight: 700;">${v.type}</span>
                  </div>
                  <div style="font-size: 0.78rem; color: var(--ha-text-muted); margin-bottom: 4px;">${v.meaning}</div>
                  <div style="font-size: 0.76rem; color: var(--ha-navy); font-style: italic;">e.g. “${v.example}”</div>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Next Action Button -->
        <div style="display: flex; justify-content: flex-end;">
          <button class="btn btn-primary btn-lg" id="btn-next-to-practice">
            Start Practice Mode →
          </button>
        </div>
      </div>
    `;

    // Hook listen buttons
    mount.querySelectorAll('.tts-listen-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        playPronunciation(btn.dataset.text);
      });
    });

    mount.querySelector('#btn-next-to-practice')?.addEventListener('click', () => {
      sound.playClick();
      currentStep = 'practice';
      renderView();
      window.scrollTo(0, 0);
    });
  }

  // STEP 2: Practice Mode (Interactive Questions)
  function renderPracticeStep(mount) {
    if (practiceIndex >= sessionQuestions.length) {
      currentStep = 'create';
      renderView();
      return;
    }

    const q = sessionQuestions[practiceIndex];

    mount.innerHTML = `
      <div class="ha-card" style="padding: 26px; border-radius: var(--radius-lg); margin-bottom: 24px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <span style="font-size: 0.85rem; font-weight: 800; color: var(--ha-navy);">
            Practice Question ${practiceIndex + 1} of ${sessionQuestions.length}
          </span>
          <span class="badge badge-gold">Score: ${practiceScore} / ${practiceIndex}</span>
        </div>

        <div class="progress-container" style="height: 6px; margin-bottom: 20px;">
          <div class="progress-bar-fill" style="width: ${(practiceIndex / sessionQuestions.length) * 100}%;"></div>
        </div>

        <h3 style="font-size: 1.25rem; color: var(--ha-navy); font-weight: 800; line-height: 1.4; margin-bottom: 20px;">
          ${q.question}
        </h3>

        <!-- Options -->
        <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px;" id="practice-options-mount">
          ${q.options.map((opt, optIdx) => `
            <button class="btn btn-outline practice-opt-btn" data-optidx="${optIdx}" style="text-align: left; justify-content: flex-start; padding: 14px 18px; font-size: 0.95rem; line-height: 1.4; border-radius: var(--radius-md);">
              <span style="font-weight: 800; width: 24px; color: var(--ha-text-muted);">${String.fromCharCode(65 + optIdx)}.</span>
              <span>${opt}</span>
            </button>
          `).join('')}
        </div>

        <div id="practice-feedback-mount" style="display: none; margin-bottom: 20px;"></div>

        <div style="display: flex; justify-content: space-between; align-items: center;">
          <button class="btn btn-outline btn-sm" id="btn-skip-practice">Skip</button>
          <button class="btn btn-primary" id="btn-next-practice-q" style="display: none;">Continue →</button>
        </div>
      </div>
    `;

    let answered = false;
    const feedbackMount = mount.querySelector('#practice-feedback-mount');
    const nextBtn = mount.querySelector('#btn-next-practice-q');

    mount.querySelectorAll('.practice-opt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (answered) return;
        answered = true;
        const chosen = parseInt(btn.dataset.optidx, 10);
        const isCorrect = chosen === q.correct;

        if (isCorrect) {
          practiceScore++;
          sound.playSuccess();
          btn.style.borderColor = 'var(--ha-success)';
          btn.style.backgroundColor = 'var(--ha-success-bg)';
          btn.style.color = 'var(--ha-success)';
        } else {
          sound.playError();
          btn.style.borderColor = 'var(--ha-error)';
          btn.style.backgroundColor = '#FEF2F2';
          btn.style.color = 'var(--ha-error)';

          // Highlight correct
          const correctBtn = mount.querySelector(`.practice-opt-btn[data-optidx="${q.correct}"]`);
          if (correctBtn) {
            correctBtn.style.borderColor = 'var(--ha-success)';
            correctBtn.style.backgroundColor = 'var(--ha-success-bg)';
          }
        }

        feedbackMount.style.display = 'block';
        feedbackMount.innerHTML = `
          <div style="padding: 12px 16px; border-radius: var(--radius-sm); background: ${isCorrect ? 'var(--ha-success-bg)' : '#FEF2F2'}; color: ${isCorrect ? 'var(--ha-success)' : 'var(--ha-error)'}; font-size: 0.9rem; display: flex; align-items: flex-start; gap: 8px;">
            <span style="flex-shrink: 0; margin-top: 1px;">${isCorrect ? checkCircleIcon(16) : infoIcon(16)}</span>
            <div><strong>${isCorrect ? 'Correct!' : 'Incorrect.'}</strong> ${q.explanation}</div>
          </div>
        `;

        if (nextBtn) nextBtn.style.display = 'inline-flex';
      });
    });

    nextBtn?.addEventListener('click', () => {
      sound.playClick();
      practiceIndex++;
      if (practiceIndex >= sessionQuestions.length) {
        currentStep = 'create';
      }
      renderView();
      window.scrollTo(0, 0);
    });

    mount.querySelector('#btn-skip-practice')?.addEventListener('click', () => {
      sound.playClick();
      practiceIndex++;
      if (practiceIndex >= sessionQuestions.length) {
        currentStep = 'create';
      }
      renderView();
      window.scrollTo(0, 0);
    });
  }

  // STEP 3: Create Your Own Sentence (With Smart Validator)
  function renderCreateStep(mount) {
    const prompts = roleplay.sentencePrompts || [];
    const prompt = prompts[currentPromptIndex] || prompts[0];

    mount.innerHTML = `
      <div class="ha-card" style="padding: 26px; border-radius: var(--radius-lg); margin-bottom: 24px;">
        <div style="margin-bottom: 20px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <span class="badge badge-red">STEP 3 • REAL PRODUCTION</span>
            <span style="font-size: 0.82rem; color: var(--ha-text-muted); font-weight: 700;">Prompt ${currentPromptIndex + 1} of ${prompts.length}</span>
          </div>
          <h2 style="font-size: 1.35rem; color: var(--ha-navy); font-weight: 800; margin: 0 0 6px;">
            Create Your Own Sentence
          </h2>
          <p style="font-size: 0.9rem; color: var(--ha-text-muted); margin: 0;">
            Do not just memorize the teacher's example! Form your OWN real English sentence based on this situation.
          </p>
        </div>

        <!-- Prompt Card -->
        <div style="background: #F8FAFC; border: 2px dashed rgba(10, 37, 88, 0.2); border-radius: var(--radius-md); padding: 18px 20px; margin-bottom: 20px;">
          <h3 style="font-size: 1.1rem; color: var(--ha-navy); margin-bottom: 6px; display: flex; align-items: center; gap: 6px;">
            ${pencilIcon(16)} ${prompt.title}
          </h3>
          <p style="font-size: 0.95rem; color: var(--ha-text-main); margin-bottom: 10px; line-height: 1.5;">
            ${prompt.instruction}
          </p>
          <div style="font-size: 0.85rem; color: var(--ha-text-muted); background: #FFFFFF; padding: 8px 12px; border-radius: var(--radius-sm); border: 1px solid var(--ha-border);">
            <strong>Teacher's Example Idea:</strong> <em>“${prompt.example}”</em>
          </div>
        </div>

        <!-- Student Input -->
        <div style="margin-bottom: 18px;">
          <label style="display: block; font-size: 0.88rem; font-weight: 700; color: var(--ha-navy); margin-bottom: 8px;">
            Type your sentence here:
          </label>
          <textarea id="student-sentence-input" rows="3" placeholder="e.g. Type your own English sentence..." 
            style="width: 100%; border: 1.5px solid var(--ha-border); border-radius: var(--radius-md); padding: 12px 14px; font-size: 1rem; color: var(--ha-text-main); font-family: inherit; resize: vertical; box-sizing: border-box; outline: none; transition: border-color 0.2s ease;"></textarea>
        </div>

        <div id="sentence-feedback-box" style="display: none; margin-bottom: 20px;"></div>

        <!-- Action Buttons -->
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
          <button class="btn btn-outline btn-sm" id="btn-skip-prompt">Skip Prompt</button>
          <div style="display: flex; gap: 10px;">
            <button class="btn btn-secondary" id="btn-check-sentence">
              Check My Sentence
            </button>
            <button class="btn btn-primary" id="btn-continue-next-step" style="display: none;">
              Next Step →
            </button>
          </div>
        </div>
      </div>
    `;

    const input = mount.querySelector('#student-sentence-input');
    const feedbackBox = mount.querySelector('#sentence-feedback-box');
    const checkBtn = mount.querySelector('#btn-check-sentence');
    const nextBtn = mount.querySelector('#btn-continue-next-step');

    checkBtn?.addEventListener('click', () => {
      const text = input?.value || '';
      const validation = validateStudentSentence(roleplay.id, prompt.id, text);

      feedbackBox.style.display = 'block';
      if (validation.valid) {
        sound.playSuccess();
        userSentencesCreated.push(text.trim());
        feedbackBox.innerHTML = `
          <div style="padding: 14px 18px; border-radius: var(--radius-md); background: var(--ha-success-bg); border: 1.5px solid var(--ha-success); color: var(--ha-navy);">
            <div style="font-weight: 800; font-size: 0.95rem; margin-bottom: 4px; color: var(--ha-success);">
              ${validation.feedback}
            </div>
            <div style="font-size: 0.85rem; color: var(--ha-text-muted);">
              Sentence recorded: <em>“${text.trim()}”</em>
            </div>
          </div>
        `;
        checkBtn.style.display = 'none';
        nextBtn.style.display = 'inline-flex';
      } else {
        sound.playError();
        feedbackBox.innerHTML = `
          <div style="padding: 14px 18px; border-radius: var(--radius-md); background: #FEF2F2; border: 1.5px solid var(--ha-error); color: var(--ha-navy);">
            <div style="font-weight: 800; font-size: 0.95rem; margin-bottom: 4px; color: var(--ha-error);">
              Needs A Little Adjustment
            </div>
            <div style="font-size: 0.88rem; color: var(--ha-text-main);">
              ${validation.feedback}
            </div>
          </div>
        `;
      }
    });

    nextBtn?.addEventListener('click', () => {
      sound.playClick();
      currentPromptIndex++;
      if (currentPromptIndex < prompts.length) {
        renderView();
      } else {
        currentStep = 'dialogue';
        renderView();
      }
      window.scrollTo(0, 0);
    });

    mount.querySelector('#btn-skip-prompt')?.addEventListener('click', () => {
      sound.playClick();
      currentPromptIndex++;
      if (currentPromptIndex < prompts.length) {
        renderView();
      } else {
        currentStep = 'dialogue';
        renderView();
      }
      window.scrollTo(0, 0);
    });
  }

  // STEP 4: Mini Roleplay Interactive Dialogue
  function renderDialogueStep(mount) {
    const dialogue = roleplay.miniRoleplay;
    const turns = dialogue?.turns || [];

    if (dialogueTurnIndex >= turns.length) {
      currentStep = 'speaking';
      renderView();
      return;
    }

    const currentTurn = turns[dialogueTurnIndex];

    mount.innerHTML = `
      <div class="ha-card" style="padding: 26px; border-radius: var(--radius-lg); margin-bottom: 24px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <div>
            <span class="badge badge-navy">STEP 4 • CONVERSATION PRACTICE</span>
            <h2 style="font-size: 1.3rem; color: var(--ha-navy); font-weight: 800; margin: 4px 0 0;">
              Interactive Mini Roleplay
            </h2>
          </div>
          <span style="font-size: 0.82rem; font-weight: 700; color: var(--ha-text-muted);">
            Turn ${dialogueTurnIndex + 1} of ${turns.length}
          </span>
        </div>

        <p style="font-size: 0.88rem; color: var(--ha-text-muted); margin-bottom: 20px;">
          Practice responding naturally to the other speaker using the target grammar focus.
        </p>

        <!-- Speaker Dialogue Box -->
        <div style="background: #EDF2F9; border-radius: var(--radius-lg); padding: 18px 22px; margin-bottom: 22px; display: flex; align-items: flex-start; gap: 14px;">
          <div style="background: var(--ha-navy); color: #fff; width: 44px; height: 44px; border-radius: var(--radius-pill); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
            ${userIcon(22)}
          </div>
          <div style="flex: 1;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
              <strong style="color: var(--ha-navy); font-size: 0.95rem;">${currentTurn.speaker}</strong>
              <button class="btn btn-outline btn-sm tts-listen-btn" data-text="${currentTurn.text}" style="background: #FFFFFF; padding: 4px 10px; font-size: 0.75rem; border-radius: var(--radius-pill); display: inline-flex; align-items: center; gap: 5px;">
                ${speakerIcon(13)} Listen
              </button>
            </div>
            <div style="font-size: 1.1rem; font-weight: 700; color: var(--ha-navy); line-height: 1.4;">
              “${currentTurn.text}”
            </div>
          </div>
        </div>

        <!-- Student Response Choices -->
        <div style="margin-bottom: 20px;">
          <div style="font-size: 0.88rem; font-weight: 800; color: var(--ha-navy); margin-bottom: 10px;">
            Choose your response (You = ${dialogue.roleB}):
          </div>
          <div style="display: flex; flex-direction: column; gap: 10px;" id="dialogue-choices-mount">
            ${currentTurn.options.map((opt, optIdx) => `
              <button class="btn btn-outline dialogue-opt-btn" data-optidx="${optIdx}" style="text-align: left; justify-content: flex-start; padding: 14px 18px; font-size: 0.95rem; border-radius: var(--radius-md);">
                <span style="font-weight: 800; width: 22px; color: var(--ha-text-muted);">${String.fromCharCode(65 + optIdx)}.</span>
                <span>“${opt}”</span>
              </button>
            `).join('')}
          </div>
        </div>

        <div id="dialogue-feedback-mount" style="display: none; margin-bottom: 20px;"></div>

        <div style="display: flex; justify-content: flex-end;">
          <button class="btn btn-primary" id="btn-next-dialogue" style="display: none;">Next Turn →</button>
        </div>
      </div>
    `;

    // TTS on starter speaker
    mount.querySelector('.tts-listen-btn')?.addEventListener('click', (e) => {
      playPronunciation(e.currentTarget.dataset.text);
    });

    let chosenDone = false;
    const feedbackMount = mount.querySelector('#dialogue-feedback-mount');
    const nextBtn = mount.querySelector('#btn-next-dialogue');

    mount.querySelectorAll('.dialogue-opt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (chosenDone) return;
        chosenDone = true;
        const optIdx = parseInt(btn.dataset.optidx, 10);
        const isCorrect = optIdx === currentTurn.correctIndex;

        if (isCorrect) {
          sound.playSuccess();
          btn.style.borderColor = 'var(--ha-success)';
          btn.style.backgroundColor = 'var(--ha-success-bg)';
          feedbackMount.style.display = 'block';
          feedbackMount.innerHTML = `
            <div style="padding: 12px 16px; border-radius: var(--radius-sm); background: var(--ha-success-bg); color: var(--ha-success); font-size: 0.9rem; display: flex; align-items: center; gap: 8px;">
              ${checkCircleIcon(16)} <span><strong>Natural Response!</strong> You responded politely and followed the grammar pattern.</span>
            </div>
          `;
        } else {
          sound.playError();
          btn.style.borderColor = 'var(--ha-error)';
          btn.style.backgroundColor = '#FEF2F2';
          feedbackMount.style.display = 'block';
          feedbackMount.innerHTML = `
            <div style="padding: 12px 16px; border-radius: var(--radius-sm); background: #FEF2F2; color: var(--ha-error); font-size: 0.9rem; display: flex; align-items: center; gap: 8px;">
              ${infoIcon(16)} <span><strong>Teacher Note:</strong> Option A is the natural spoken response for this situation.</span>
            </div>
          `;
        }

        if (nextBtn) nextBtn.style.display = 'inline-flex';
      });
    });

    nextBtn?.addEventListener('click', () => {
      sound.playClick();
      dialogueTurnIndex++;
      if (dialogueTurnIndex >= turns.length) {
        currentStep = 'speaking';
      }
      renderView();
      window.scrollTo(0, 0);
    });
  }

  // STEP 5: Speaking Practice Drills
  function renderSpeakingStep(mount) {
    const sentences = roleplay.speakingSentences || [];
    if (speakingDrillIndex >= sentences.length) {
      currentStep = 'result';
      renderView();
      return;
    }

    const currentSentence = sentences[speakingDrillIndex];
    const hasSpeechRec = typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);

    mount.innerHTML = `
      <div class="ha-card" style="padding: 26px; border-radius: var(--radius-lg); margin-bottom: 24px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <div>
            <span class="badge badge-gold">STEP 5 • SPEAKING CONFIDENCE</span>
            <h2 style="font-size: 1.35rem; color: var(--ha-navy); font-weight: 800; margin: 4px 0 0;">
              Speaking Practice
            </h2>
          </div>
          <span style="font-size: 0.82rem; font-weight: 700; color: var(--ha-text-muted);">
            Sentence ${speakingDrillIndex + 1} of ${sentences.length}
          </span>
        </div>

        <p style="font-size: 0.9rem; color: var(--ha-text-muted); margin-bottom: 22px;">
          Listen to the sentence, then practice speaking it out loud with confidence!
        </p>

        <!-- Sentence Card -->
        <div style="background: #F8FAFC; border: 2px solid var(--ha-border); border-radius: var(--radius-lg); padding: 26px; text-align: center; margin-bottom: 24px;">
          <div style="font-size: 1.35rem; font-weight: 800; color: var(--ha-navy); line-height: 1.4; margin-bottom: 14px;">
            “${currentSentence}”
          </div>

          <button class="btn btn-outline tts-listen-btn" data-text="${currentSentence}" style="background: #FFFFFF; border-radius: var(--radius-pill); font-size: 0.9rem; padding: 8px 18px; display: inline-flex; align-items: center; gap: 8px; margin: 0 auto;">
            ${speakerIcon(16)} Hear Native Pronunciation
          </button>
        </div>

        <!-- Mic / Speaking Trigger -->
        <div style="text-align: center; margin-bottom: 24px;">
          ${hasSpeechRec ? `
            <button class="btn btn-primary btn-lg" id="btn-start-mic" style="border-radius: var(--radius-pill); padding: 12px 28px; display: inline-flex; align-items: center; gap: 8px; margin: 0 auto;">
              <span id="mic-icon">${micIcon(18)}</span> <span id="mic-text">Tap to Speak</span>
            </button>
            <div id="mic-status-text" style="font-size: 0.85rem; color: var(--ha-text-muted); margin-top: 8px;">
              Click button and speak into your microphone
            </div>
          ` : `
            <p style="font-size: 0.88rem; color: var(--ha-text-muted); margin-bottom: 12px;">
              Read the sentence out loud 2 times to build muscle memory!
            </p>
            <button class="btn btn-primary btn-lg" id="btn-spoke-aloud" style="border-radius: var(--radius-pill); display: inline-flex; align-items: center; gap: 8px; margin: 0 auto;">
              ${micIcon(18)} I Spoke It Out Loud
            </button>
          `}
        </div>

        <div id="speaking-feedback-box" style="display: none; margin-bottom: 20px;"></div>

        <div style="display: flex; justify-content: flex-end;">
          <button class="btn btn-primary" id="btn-next-speaking" style="display: none;">Next Sentence →</button>
        </div>
      </div>
    `;

    mount.querySelector('.tts-listen-btn')?.addEventListener('click', (e) => {
      playPronunciation(e.currentTarget.dataset.text);
    });

    const feedbackBox = mount.querySelector('#speaking-feedback-box');
    const nextBtn = mount.querySelector('#btn-next-speaking');

    // Speech recognition handling
    if (hasSpeechRec) {
      const micBtn = mount.querySelector('#btn-start-mic');
      const micIconEl = mount.querySelector('#mic-icon');
      const micText = mount.querySelector('#mic-text');
      const statusText = mount.querySelector('#mic-status-text');

      micBtn?.addEventListener('click', () => {
        sound.playClick();
        const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRec();
        recognition.lang = 'en-US';
        recognition.interimResults = false;

        micText.innerText = "Listening...";
        if (micIconEl) micIconEl.innerHTML = `<span style="display: inline-block; width: 12px; height: 12px; background: #EF4444; border-radius: 50%; animation: pulse 1s infinite;"></span>`;
        statusText.innerText = "Speak now...";

        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          micText.innerText = "Tap to Speak";
          if (micIconEl) micIconEl.innerHTML = micIcon(18);
          statusText.innerText = "";
          sound.playSuccess();

          feedbackBox.style.display = 'block';
          feedbackBox.innerHTML = `
            <div style="padding: 14px 18px; border-radius: var(--radius-md); background: var(--ha-success-bg); border: 1.5px solid var(--ha-success); color: var(--ha-navy);">
              <div style="font-weight: 800; color: var(--ha-success); margin-bottom: 4px; display: flex; align-items: center; gap: 6px;">
                ${checkCircleIcon(16)} Great Speaking!
              </div>
              <div style="font-size: 0.9rem;">
                We heard: <em>“${transcript}”</em>
              </div>
            </div>
          `;
          nextBtn.style.display = 'inline-flex';
        };

        recognition.onerror = () => {
          micText.innerText = "Tap to Speak";
          if (micIconEl) micIconEl.innerHTML = micIcon(18);
          statusText.innerText = "Microphone error or permission denied. You can still proceed by practicing out loud.";
          nextBtn.style.display = 'inline-flex';
        };

        recognition.start();
      });
    } else {
      mount.querySelector('#btn-spoke-aloud')?.addEventListener('click', () => {
        sound.playSuccess();
        feedbackBox.style.display = 'block';
        feedbackBox.innerHTML = `
          <div style="padding: 14px 18px; border-radius: var(--radius-md); background: var(--ha-success-bg); color: var(--ha-success); font-weight: 800; text-align: center; display: flex; align-items: center; justify-content: center; gap: 8px;">
            ${checkCircleIcon(16)} <span>Excellent work! Speaking out loud builds your physical English fluency.</span>
          </div>
        `;
        nextBtn.style.display = 'inline-flex';
      });
    }

    nextBtn?.addEventListener('click', () => {
      sound.playClick();
      speakingDrillIndex++;
      if (speakingDrillIndex >= sentences.length) {
        currentStep = 'result';
      }
      renderView();
      window.scrollTo(0, 0);
    });
  }

  // STEP 6: Result & XP Award Screen
  function renderResultStep(mount) {
    const totalQ = sessionQuestions.length;
    const percent = totalQ > 0 ? Math.round((practiceScore / totalQ) * 100) : 100;
    const isPerfect = percent >= 100;

    // Record real completion in StateManager
    const completionResult = stateManager.recordRoleplayCompletion(roleplay.id, {
      percent,
      score: practiceScore,
      totalQuestions: totalQ,
      sentencesCreated: userSentencesCreated.length || 1,
      submissionToken
    });

    const xpEarned = completionResult.xpEarned || (isPerfect ? 50 : 25);
    fireConfetti(3000);
    sound.playLevelUp();

    mount.innerHTML = `
      <div class="ha-card" style="padding: 36px 28px; border-radius: var(--radius-lg); text-align: center; border-top: 6px solid ${isPerfect ? 'var(--ha-gold)' : 'var(--ha-navy)'}; margin-bottom: 24px;">
        <div style="margin-bottom: 14px; color: ${isPerfect ? 'var(--ha-gold)' : 'var(--ha-navy)'}; display: flex; justify-content: center;">
          ${trophyIcon(56)}
        </div>

        <h2 style="font-size: 2rem; color: var(--ha-navy); font-weight: 800; margin: 0 0 6px;">
          Roleplay Completed!
        </h2>
        <p style="font-size: 1.05rem; color: var(--ha-text-muted); margin-bottom: 24px;">
          You successfully completed <strong>Roleplay ${roleplay.number}: ${roleplay.title}</strong>!
        </p>

        <!-- Stats Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 14px; margin-bottom: 28px; max-width: 600px; margin-left: auto; margin-right: auto;">
          <div style="background: var(--ha-navy-subtle); padding: 16px; border-radius: var(--radius-md);">
            <div style="font-size: 0.75rem; font-weight: 800; color: var(--ha-text-muted); text-transform: uppercase;">PRACTICE SCORE</div>
            <div style="font-size: 1.6rem; font-weight: 800; color: var(--ha-navy);">${practiceScore} / ${totalQ}</div>
            <div style="font-size: 0.78rem; font-weight: 700; color: var(--ha-gold-dark);">${percent}%</div>
          </div>

          <div style="background: var(--ha-navy-subtle); padding: 16px; border-radius: var(--radius-md);">
            <div style="font-size: 0.75rem; font-weight: 800; color: var(--ha-text-muted); text-transform: uppercase;">SENTENCES CREATED</div>
            <div style="font-size: 1.6rem; font-weight: 800; color: var(--ha-navy);">${userSentencesCreated.length || 1}</div>
            <div style="font-size: 0.78rem; color: var(--ha-text-muted);">Real Production</div>
          </div>

          <div style="background: #ECFDF5; padding: 16px; border-radius: var(--radius-md); border: 1px solid rgba(16, 185, 129, 0.3);">
            <div style="font-size: 0.75rem; font-weight: 800; color: var(--ha-success); text-transform: uppercase;">REAL XP EARNED</div>
            <div style="font-size: 1.6rem; font-weight: 800; color: var(--ha-success);">+${xpEarned} XP</div>
            <div style="font-size: 0.78rem; color: var(--ha-success); font-weight: 600;">Saved to Profile</div>
          </div>
        </div>

        <!-- Roleplay Badge Unlocked -->
        <div style="background: #FEF7E8; border: 1.5px solid rgba(245, 166, 35, 0.4); border-radius: var(--radius-md); padding: 16px 20px; max-width: 480px; margin: 0 auto 28px; display: flex; align-items: center; gap: 14px; text-align: left;">
          <div style="color: var(--ha-gold-dark); flex-shrink: 0;">
            ${checkCircleIcon(32)}
          </div>
          <div>
            <div style="font-size: 0.75rem; font-weight: 800; color: var(--ha-gold-dark); text-transform: uppercase;">ACHIEVEMENT UNLOCKED</div>
            <strong style="color: var(--ha-navy); font-size: 1.05rem;">Roleplay ${roleplay.number} Complete</strong>
            <div style="font-size: 0.8rem; color: var(--ha-text-muted);">Badge permanently added to your student profile.</div>
          </div>
        </div>

        <!-- Next Actions -->
        <div style="display: flex; justify-content: center; gap: 14px; flex-wrap: wrap;">
          <button class="btn btn-outline btn-lg" id="btn-result-hub" style="display: inline-flex; align-items: center; gap: 8px;">
            ${arrowLeftIcon(16)} All Roleplays
          </button>
          <button class="btn btn-primary btn-lg" id="btn-result-repeat" style="display: inline-flex; align-items: center; gap: 8px;">
            ${refreshIcon(16)} Practice Again
          </button>
        </div>
      </div>
    `;

    mount.querySelector('#btn-result-hub')?.addEventListener('click', () => {
      sound.playClick();
      renderRoleplaysHub(container, onNavigate, null);
      window.scrollTo(0, 0);
    });

    mount.querySelector('#btn-result-repeat')?.addEventListener('click', () => {
      sound.playClick();
      renderRoleplayRunner(container, onNavigate, roleplay);
      window.scrollTo(0, 0);
    });
  }

  // Initial render
  renderView();
}
