import { stateManager } from '../state.js';
import { GRAMMAR_LESSONS } from '../data/grammar.js';
import { sound } from '../audio.js';
import { fireConfetti } from '../confetti.js';
import { getRandomFeedback } from '../utils/helpers.js';

export function renderGrammarZone(container, onNavigate, initialLessonId = null) {
  let activeLessonId = initialLessonId;

  function renderList() {
    container.innerHTML = `
      <div class="container" style="padding-top: 24px; padding-bottom: 40px;">
        <div style="margin-bottom: 30px;">
          <span class="badge badge-navy" style="margin-bottom: 8px;">Grammar Zone</span>
          <h1 style="font-size: 2.2rem; color: var(--ha-navy); margin-bottom: 6px;">Beginner English Grammar</h1>
          <p style="font-size: 1rem; color: var(--ha-text-muted);">
            Simple, bite-sized lessons with interactive mini-games and quiz challenges.
          </p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
          ${GRAMMAR_LESSONS.map((lesson, idx) => `
            <div class="ha-card grammar-card" data-lesson-id="${lesson.id}" style="cursor: pointer; border-left: 5px solid var(--ha-navy); display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                  <span class="badge badge-navy">Lesson ${idx + 1}</span>
                  <span class="badge badge-gold">+${lesson.xpReward} XP</span>
                </div>
                <h3 style="font-size: 1.25rem; color: var(--ha-navy); margin-bottom: 6px;">${lesson.title}</h3>
                <div style="font-size: 0.85rem; font-weight: 600; color: var(--ha-red); margin-bottom: 10px;">
                  ${lesson.category}
                </div>
                <p style="font-size: 0.9rem; color: var(--ha-text-muted); margin-bottom: 16px;">
                  ${lesson.learn.explanation}
                </p>
              </div>

              <div style="display: flex; align-items: center; justify-content: space-between; padding-top: 14px; border-top: 1px solid var(--ha-border);">
                <span style="font-size: 0.8rem; font-weight: 700; color: var(--ha-text-muted);">5-Step Practice</span>
                <button class="btn btn-primary btn-sm">Start Lesson →</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    container.querySelectorAll('.grammar-card').forEach(card => {
      card.addEventListener('click', () => {
        sound.playClick();
        activeLessonId = card.dataset.lessonId;
        renderDetail();
      });
    });
  }
  function renderDetail() {
    const lesson = GRAMMAR_LESSONS.find(l => l.id === activeLessonId) || GRAMMAR_LESSONS[0];
    let step = 1;
    let quizIndex = 0;

    function renderStep() {
      container.innerHTML = `
        <div class="container game-zone-container" style="padding-top: 20px;">
          <div class="game-header-bar">
            <button class="game-back-btn" id="grammar-exit-btn">← Back to All Lessons</button>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span class="badge badge-gold">Step ${step} of 5</span>
              <span class="badge badge-navy">${lesson.title}</span>
            </div>
          </div>
          <div class="ha-card" style="padding: 36px 28px;">
            ${getStepContent()}
          </div>
        </div>
      `;
      container.querySelector('#grammar-exit-btn')?.addEventListener('click', () => {
        sound.stopSpeech();
        renderList();
      });
      attachStepEvents();
    }

function getGrammarExplanation(lesson) {
  const map = {
    pronouns_basic: {
      kyun: {
        urdu: "Baar baar logon ya cheezon ka naam dohrane ke bajaye mukhtasar aur aasan lafz istemal karne ke liye.",
        english: "To replace repetitive names of people and objects with concise, natural pronouns."
      },
      kaise: {
        urdu: "Subject ki jagah istemal hote hain: Khud ke liye I, dost ke liye You, larkay ke liye He, larki ke liye She, aur cheez/janwar ke liye It.",
        english: "Replace the subject noun directly: Male = He, Female = She, Object/Animal = It, Self = I, Listener = You.",
        formula: "[Pronoun] + Verb + ... (e.g. He is a teacher, She reads)"
      },
      kisLiye: {
        urdu: "Rozmarrah guftagu mein kisi shakhs ya cheez ka zikr karne ke liye taake jumlay aasan aur taaza lagain.",
        english: "Use in everyday conversations to refer to yourself, friends, family, and objects smoothly.",
        points: [
          "👤 I am Ali (khud ke liye)",
          "👨 He is my brother (larkay ke liye)",
          "👩 She is my teacher (larki ke liye)",
          "📦 It is a book (cheez ke liye)",
          "👥 You are a student (samne wale ke liye)"
        ]
      },
      audioNarration: "Why do we use pronouns? We use pronouns to replace names so we do not repeat them. For a boy use He, for a girl use She, for an object use It, and for yourself use I. For example: He is my brother, She reads a book."
    },
    to_be: {
      kyun: {
        urdu: "Pehchan, halat, umer ya pesha batane ke liye ke koi shakhs kya hai, kaisa hai, ya kahan mojud hai.",
        english: "To express existence, identity, condition, location, or profession."
      },
      kaise: {
        urdu: "Subject ke hisab se 'be' ki teen shaklein hoti hain: I ke sath 'am', singular ke sath 'is', aur plural ke sath 'are'.",
        english: "Subject determines the form: I + am, He/She/It + is, You/We/They + are.",
        formula: "Subject + is/am/are + Adjective / Noun / Place"
      },
      kisLiye: {
        urdu: "Apna ta'aruf karane, doston ki halat batane, aur classroom mein mojoodgi zahir karne ke liye.",
        english: "Use it to introduce yourself, describe feelings, tell where people are, and state facts.",
        points: [
          "I am a student at Home Academy",
          "Ali is in the classroom",
          "We are happy today",
          "They are classmates"
        ]
      },
      audioNarration: "Why do we use the verb to be? To describe who or what someone is, their feelings, and their location. How do we use it? Always say: I am, He is, She is, It is, and We are, You are, They are."
    },
    this_that: {
      kyun: {
        urdu: "Kisi ek cheez ki taraf ungli se ishara (point) karne ke liye ke wo hamare qareeb hai ya humse door.",
        english: "To point out a single specific object based on its distance from the speaker."
      },
      kaise: {
        urdu: "Hath ke qareeb ek cheez ho toh 'This' lagate hain; door ho toh 'That' lagate hain.",
        english: "Near your hand: 'This'. Far away from you: 'That'. Followed by 'is'.",
        formula: "This is + [Near Item]  |  That is + [Far Item]"
      },
      kisLiye: {
        urdu: "Classroom mein kitaab, pen, ya bahar gari ya darakht ki taraf ishara karke batane ke liye.",
        english: "Use it when showing someone an item in your hand or pointing across the room.",
        points: [
          "👉 This is my pen (mere hath mein hai)",
          "👉 That is a car (door khari hai)",
          "👉 This is Home Academy"
        ]
      },
      audioNarration: "Why do we use this and that? To point to a single object. Use 'This' for something close to your hand: This is my book. Use 'That' for something far away: That is a star."
    }
  };

  if (map[lesson.id]) return map[lesson.id];

  return {
    kyun: {
      urdu: lesson.learn.explanation || "English grammar ko sahi aur wazeh tareeqay se bolne aur likhne ke liye.",
      english: "To speak and write English clearly, accurately, and naturally according to standard rules."
    },
    kaise: {
      urdu: (lesson.learn.rules && lesson.learn.rules[0] ? lesson.learn.rules[0].desc : "Rule ke mutabiq alfaz ki sahi tarteeb istemal karein."),
      english: "Follow the core grammatical pattern taught in this lesson.",
      formula: lesson.title + " Grammar Structure"
    },
    kisLiye: {
      urdu: "Daily conversations aur class exercises mein behtar communication ke liye.",
      english: "For daily conversations, asking questions, and expressing ideas.",
      points: (lesson.learn.rules || []).map(r => `${r.label}: ${r.desc}`)
    },
    audioNarration: `Lesson: ${lesson.title}. ${lesson.learn.headline}. ${lesson.learn.explanation}`
  };
}

    function getStepContent() {
      if (step === 1) {
        const guide = getGrammarExplanation(lesson);
        return `
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; flex-wrap: wrap; gap: 12px; border-bottom: 1px solid var(--ha-border); padding-bottom: 16px;">
            <div>
              <div style="display: flex; align-items: center; gap: 8px;">
                <span class="badge badge-navy">Step 1: Learn</span>
                <span class="badge badge-red">Sir Zubair's Explanation</span>
              </div>
              <h2 style="font-size: 1.8rem; color: var(--ha-navy); margin: 6px 0 2px;">${lesson.learn.headline}</h2>
              <div style="font-size: 0.88rem; color: var(--ha-text-muted);">${lesson.category} • ${lesson.level}</div>
            </div>

            <button class="btn btn-secondary btn-sm btn-audio-explain" id="btn-grammar-audio-explain" style="padding: 10px 18px; font-weight: 700;">
              <span id="grammar-audio-icon" style="font-size: 1.1rem;">🔊</span>
              <span id="grammar-audio-text">Bol Kar Suniye (Listen Explanation)</span>
            </button>
          </div>

          <!-- 3 Pillars Grid: KYUN, KAISE, KIS LIYE -->
          <div class="grammar-explanation-hub" style="padding: 0; margin-bottom: 26px; border: none; box-shadow: none;">
            <div class="explanation-pillars-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px;">
              
              <!-- 1. KYUN? -->
              <div class="explanation-pillar-card" style="background: #F8FAFC; border: 1.5px solid #E2E8F0; border-top: 4px solid #2563eb; border-radius: var(--radius-md); padding: 18px;">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                  <span style="font-size: 1.25rem;">❓</span>
                  <h4 style="font-size: 0.98rem; font-weight: 800; color: #1e3a8a; margin: 0;">1. KYUN? (Why?)</h4>
                </div>
                <div style="font-size: 0.74rem; font-weight: 800; color: var(--ha-navy); text-transform: uppercase; margin-bottom: 4px;">Wajah / Purpose:</div>
                <p style="font-size: 0.88rem; color: var(--ha-text-main); line-height: 1.5; margin-bottom: 10px;">
                  ${guide.kyun.urdu}
                </p>
                <div style="font-size: 0.8rem; color: var(--ha-text-muted); background: #FFFFFF; border-radius: var(--radius-sm); padding: 8px 10px; border-left: 3px solid #2563eb;">
                  <em>"${guide.kyun.english}"</em>
                </div>
              </div>

              <!-- 2. KAISE? -->
              <div class="explanation-pillar-card" style="background: #F8FAFC; border: 1.5px solid #E2E8F0; border-top: 4px solid #d97706; border-radius: var(--radius-md); padding: 18px;">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                  <span style="font-size: 1.25rem;">⚙️</span>
                  <h4 style="font-size: 0.98rem; font-weight: 800; color: #b45309; margin: 0;">2. KAISE? (How?)</h4>
                </div>
                <div style="font-size: 0.74rem; font-weight: 800; color: var(--ha-navy); text-transform: uppercase; margin-bottom: 4px;">Formula & Rule:</div>
                <p style="font-size: 0.88rem; color: var(--ha-text-main); line-height: 1.5; margin-bottom: 10px;">
                  ${guide.kaise.urdu}
                </p>
                <div style="background: #FFFBEB; border: 1px dashed #d97706; border-radius: var(--radius-sm); padding: 8px 10px; font-size: 0.82rem; font-weight: 800; color: #92400e;">
                  📐 ${guide.kaise.formula}
                </div>
              </div>

              <!-- 3. KIS LIYE? -->
              <div class="explanation-pillar-card" style="background: #F8FAFC; border: 1.5px solid #E2E8F0; border-top: 4px solid #059669; border-radius: var(--radius-md); padding: 18px;">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                  <span style="font-size: 1.25rem;">🎯</span>
                  <h4 style="font-size: 0.98rem; font-weight: 800; color: #065f46; margin: 0;">3. KIS LIYE? (What for?)</h4>
                </div>
                <div style="font-size: 0.74rem; font-weight: 800; color: var(--ha-navy); text-transform: uppercase; margin-bottom: 6px;">Rozmarrah Istemal:</div>
                <ul style="margin: 0; padding-left: 18px; font-size: 0.82rem; color: var(--ha-text-main); display: flex; flex-direction: column; gap: 5px;">
                  ${(guide.kisLiye.points || []).map(pt => `<li>${pt}</li>`).join('')}
                </ul>
              </div>

            </div>
          </div>

          <div style="margin-bottom: 24px;">
            <h3 style="font-size: 1.1rem; color: var(--ha-navy); margin-bottom: 12px;">Detailed Rules & Forms</h3>
            <div style="display: flex; flex-direction: column; gap: 10px;">
              ${lesson.learn.rules.map(rule => `
                <div style="display: flex; align-items: center; gap: 16px; background: var(--ha-navy-subtle); padding: 12px 18px; border-radius: var(--radius-md); border-left: 4px solid var(--ha-navy);">
                  <div style="background: var(--ha-navy); color: #FFFFFF; font-weight: 800; padding: 4px 12px; border-radius: var(--radius-pill); font-size: 0.92rem;">
                    ${rule.label}
                  </div>
                  <div style="font-size: 0.92rem; color: var(--ha-text-main); font-weight: 600;">
                    ${rule.desc}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <div style="text-align: center; border-top: 1px solid var(--ha-border); padding-top: 20px;">
            <button class="btn btn-primary btn-lg" id="step1-next-btn">Next: See Examples →</button>
          </div>
        `;
      }
      if (step === 2) {
        return `
          <div style="text-align: center; margin-bottom: 24px;">
            <span class="badge badge-red" style="margin-bottom: 8px;">Step 2: Examples</span>
            <h2 style="font-size: 1.8rem; color: var(--ha-navy); margin-bottom: 8px;">Beginner Examples</h2>
            <p style="font-size: 1rem; color: var(--ha-text-muted);">Listen and observe how each word is used in daily life:</p>
          </div>
          <div style="display: flex; flex-direction: column; gap: 14px; margin-bottom: 30px;">
            ${lesson.examples.map(ex => `
              <div style="display: flex; align-items: center; justify-content: space-between; background: #FFFFFF; border: 1.5px solid var(--ha-border); padding: 14px 20px; border-radius: var(--radius-md);">
                <div style="font-size: 1.1rem; color: var(--ha-navy); font-weight: 700;">
                  “${ex.text}”
                </div>
                <button class="btn-listen-example" data-text="${ex.text}"
                  style="width: 36px; height: 36px; border-radius: var(--radius-pill); border: 1px solid var(--ha-border); background: var(--ha-navy-subtle); cursor: pointer;" title="Listen">
                  🔊
                </button>
              </div>
            `).join('')}
          </div>
          <div style="text-align: center;">
            <button class="btn btn-secondary btn-lg" id="step2-next-btn">Next: Play Mini-Game →</button>
          </div>
        `;
      }
      if (step === 3) {
        const mg = lesson.miniGame;
        return `
          <div style="text-align: center; margin-bottom: 24px;">
            <span class="badge badge-gold" style="margin-bottom: 8px;">Step 3: Mini Game</span>
            <h2 style="font-size: 1.8rem; color: var(--ha-navy); margin-bottom: 8px;">Fill in the Blank</h2>
            <p style="font-size: 1rem; color: var(--ha-text-muted);">${mg.instruction}</p>
          </div>
          <div style="background: var(--ha-navy-subtle); border-radius: var(--radius-lg); padding: 30px 20px; margin-bottom: 28px; text-align: center; border: 2px dashed #93C5FD;">
            <div style="font-size: 1.4rem; color: var(--ha-navy); font-weight: 800; margin-bottom: 20px;">
              ${mg.sentenceBefore} <span id="mg-blank" style="display: inline-block; min-width: 90px; border-bottom: 3px solid var(--ha-red); color: var(--ha-red); text-align: center;">____</span> ${mg.sentenceAfter}
            </div>
            <div style="display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;" id="mg-options-row">
              ${mg.options.map(opt => `
                <button class="word-chip mg-choice-btn" data-choice="${opt}" style="font-size: 1.15rem; padding: 12px 24px;">
                  ${opt}
                </button>
              `).join('')}
            </div>
          </div>
          <div id="mg-feedback" style="display: none; margin-bottom: 20px;" class="quiz-feedback-banner"></div>
          <div style="text-align: center;">
            <button class="btn btn-primary btn-lg" id="step3-next-btn" style="display: none;">Next: Take Quiz →</button>
          </div>
        `;
      }
      if (step === 4) {
        const q = lesson.quiz[quizIndex];
        return `
          <div style="text-align: center; margin-bottom: 20px;">
            <span class="badge badge-navy" style="margin-bottom: 8px;">Step 4: Lesson Quiz</span>
            <div style="font-size: 0.9rem; font-weight: 700; color: var(--ha-red);">Question ${quizIndex + 1} of ${lesson.quiz.length}</div>
            <h2 style="font-size: 1.5rem; color: var(--ha-navy); margin-top: 6px;">${q.question}</h2>
          </div>
          <div style="display: grid; grid-template-columns: 1fr; gap: 12px; max-width: 500px; margin: 0 auto 20px;" id="gq-options-box">
            ${q.options.map(opt => `
              <button class="quiz-option-btn gq-opt-btn" data-ans="${opt}">${opt}</button>
            `).join('')}
          </div>
          <div id="gq-feedback" style="display: none;" class="quiz-feedback-banner"></div>
        `;
      }
      return `
        <div style="text-align: center; padding: 30px 10px;">
          <span style="font-size: 4.5rem;">🎉</span>
          <h2 style="font-size: 2.2rem; color: var(--ha-navy); margin: 12px 0;">Lesson Completed!</h2>
          <p style="font-size: 1.1rem; color: var(--ha-text-muted); margin-bottom: 24px;">
            You mastered <strong>${lesson.title}</strong> and earned <strong>+${lesson.xpReward} XP</strong>!
          </p>
          <div class="badge badge-gold" style="font-size: 1rem; padding: 8px 18px; margin-bottom: 28px;">
            ⭐ Grammar Power Up!
          </div>
          <div>
            <button class="btn btn-primary btn-lg" id="grammar-finish-btn">Return to Grammar Hub</button>
          </div>
        </div>
      `;
    }

    function attachStepEvents() {
      if (step === 1) {
        const audioBtn = container.querySelector('#btn-grammar-audio-explain');
        const audioIcon = container.querySelector('#grammar-audio-icon');
        const audioText = container.querySelector('#grammar-audio-text');
        const guide = getGrammarExplanation(lesson);

        audioBtn?.addEventListener('click', () => {
          if (sound.isSpeaking()) {
            sound.stopSpeech();
            audioBtn.classList.remove('is-speaking');
            if (audioIcon) audioIcon.textContent = '🔊';
            if (audioText) audioText.textContent = 'Bol Kar Suniye (Listen Explanation)';
          } else {
            sound.playClick();
            audioBtn.classList.add('is-speaking');
            if (audioIcon) audioIcon.textContent = '⏹️';
            if (audioText) audioText.textContent = 'Sir Zubair is speaking... (Click to stop)';

            sound.speak(guide.audioNarration, {
              rate: 0.88,
              pitch: 1.0,
              onEnd: () => {
                audioBtn.classList.remove('is-speaking');
                if (audioIcon) audioIcon.textContent = '🔊';
                if (audioText) audioText.textContent = 'Bol Kar Suniye (Listen Explanation)';
              }
            });
          }
        });

        container.querySelector('#step1-next-btn')?.addEventListener('click', () => {
          sound.stopSpeech();
          sound.playClick();
          step = 2;
          renderStep();
        });
      } else if (step === 2) {
        container.querySelectorAll('.btn-listen-example').forEach(b => {
          b.addEventListener('click', () => sound.speak(b.dataset.text));
        });
        container.querySelector('#step2-next-btn')?.addEventListener('click', () => {
          sound.playClick();
          step = 3;
          renderStep();
        });
      } else if (step === 3) {
        const mg = lesson.miniGame;
        const blank = container.querySelector('#mg-blank');
        const feedback = container.querySelector('#mg-feedback');
        const nextBtn = container.querySelector('#step3-next-btn');

        container.querySelectorAll('.mg-choice-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            const choice = btn.dataset.choice;
            blank.textContent = choice;
            if (choice === mg.correctAnswer) {
              sound.playCorrect();
              feedback.className = 'quiz-feedback-banner correct';
              feedback.textContent = getRandomFeedback(true) + ` "${choice}" fits perfectly!`;
              feedback.style.display = 'block';
              nextBtn.style.display = 'inline-flex';
            } else {
              sound.playWrong();
              feedback.className = 'quiz-feedback-banner wrong';
              feedback.textContent = getRandomFeedback(false) + ` Try one of the other choices!`;
              feedback.style.display = 'block';
            }
          });
        });

        nextBtn?.addEventListener('click', () => {
          sound.playClick();
          step = 4;
          quizIndex = 0;
          renderStep();
        });
      } else if (step === 4) {
        const q = lesson.quiz[quizIndex];
        const feedback = container.querySelector('#gq-feedback');

        container.querySelectorAll('.gq-opt-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            const chosen = btn.dataset.ans;
            const isCorrect = chosen === q.correctAnswer;
            container.querySelectorAll('.gq-opt-btn').forEach(b => b.disabled = true);

            if (isCorrect) {
              sound.playCorrect();
              btn.classList.add('correct');
              stateManager.addXP(10, 'grammar_quiz');
              stateManager.recordActivityStats('correctAnswers', 1);
              feedback.className = 'quiz-feedback-banner correct';
              feedback.textContent = getRandomFeedback(true) + ` (+10 XP)`;
              feedback.style.display = 'block';

              setTimeout(() => {
                quizIndex++;
                if (quizIndex >= lesson.quiz.length) {
                  sound.playLevelUp();
                  fireConfetti(3500);
                  stateManager.addXP(lesson.xpReward, 'grammar_mastery');
                  stateManager.recordActivityStats('grammarCompleted', 1);
                  step = 5;
                }
                renderStep();
              }, 1200);
            } else {
              sound.playWrong();
              btn.classList.add('wrong');
              container.querySelectorAll('.gq-opt-btn').forEach(b => {
                if (b.dataset.ans === q.correctAnswer) b.classList.add('correct');
              });
              feedback.className = 'quiz-feedback-banner wrong';
              feedback.textContent = getRandomFeedback(false) + ` The correct answer is "${q.correctAnswer}".`;
              feedback.style.display = 'block';

              setTimeout(() => {
                quizIndex++;
                if (quizIndex >= lesson.quiz.length) {
                  sound.playLevelUp();
                  fireConfetti(3500);
                  stateManager.addXP(lesson.xpReward, 'grammar_mastery');
                  stateManager.recordActivityStats('grammarCompleted', 1);
                  step = 5;
                }
                renderStep();
              }, 1800);
            }
          });
        });
      } else if (step === 5) {
        container.querySelector('#grammar-finish-btn')?.addEventListener('click', renderList);
      }
    }

    renderStep();
  }

  if (activeLessonId) {
    renderDetail();
  } else {
    renderList();
  }
}