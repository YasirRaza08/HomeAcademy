// Home Academy Listening Practice Zone
import { stateManager } from '../state.js';
import { LISTENING_DRILLS } from '../data/games-data.js';
import { sound } from '../audio.js';
import { shuffleArray, getRandomFeedback } from '../utils/helpers.js';
import { fireConfetti } from '../confetti.js';

export function renderListeningZone(container, onNavigate) {
  const drills = shuffleArray(LISTENING_DRILLS);
  let currentIndex = 0;
  let score = 0;
  let speechRate = 0.9;

  function renderDrill() {
    if (currentIndex >= drills.length) {
      sound.playLevelUp();
      fireConfetti(3000);
      stateManager.addXP(40, 'listening_complete');
      stateManager.recordActivityStats('listeningCompleted', 1);

      container.innerHTML = `
        <div class="container game-zone-container" style="text-align: center; padding-top: 30px;">
          <div class="ha-card" style="padding: 40px 24px;">
            <span style="font-size: 4rem;">🎧</span>
            <h2 style="font-size: 2rem; color: var(--ha-navy); margin: 14px 0;">Great Listening!</h2>
            <p style="font-size: 1.1rem; color: var(--ha-text-muted); margin-bottom: 20px;">
              You completed all listening comprehension exercises and earned <strong>+40 Bonus XP</strong>!
            </p>
            <button class="btn btn-primary" id="listen-back-dash">Return to Dashboard</button>
          </div>
        </div>
      `;
      container.querySelector('#listen-back-dash')?.addEventListener('click', () => onNavigate('dashboard'));
      return;
    }

    const item = drills[currentIndex];
    const opts = shuffleArray(item.options);

    container.innerHTML = `
      <div class="container game-zone-container" style="padding-top: 20px;">
        <div class="game-header-bar">
          <button class="game-back-btn" id="listen-exit-btn">← Back to Dashboard</button>
          <div class="game-score-tracker">
            <span class="score-chip xp">⚡ XP: +${score}</span>
            <span class="score-chip">Audio ${currentIndex + 1} of ${drills.length}</span>
          </div>
        </div>

        <div class="ha-card" style="padding: 36px 24px; text-align: center;">
          <span class="badge badge-navy" style="margin-bottom: 12px;">Listening Comprehension</span>
          <h2 style="font-size: 1.6rem; color: var(--ha-navy); margin-bottom: 6px;">Listen to the English Sentence</h2>
          <p style="font-size: 0.95rem; color: var(--ha-text-muted); margin-bottom: 24px;">
            Click the speaker to listen. You can listen as many times as you like!
          </p>

          <!-- Audio Player Card -->
          <div style="background: var(--ha-navy-subtle); border-radius: var(--radius-lg); padding: 24px; margin-bottom: 28px; display: flex; flex-direction: column; align-items: center; gap: 14px;">
            <button class="btn btn-primary btn-lg" id="play-audio-btn" style="border-radius: var(--radius-pill); padding: 14px 28px;">
              <span>🔊</span> PLAY AUDIO
            </button>
            <div style="display: flex; gap: 10px;">
              <button class="btn btn-outline btn-sm ${speechRate === 0.75 ? 'active' : ''}" id="speed-slow-btn">
                🐢 Slow Speed (0.75x)
              </button>
              <button class="btn btn-outline btn-sm ${speechRate === 1.0 ? 'active' : ''}" id="speed-normal-btn">
                ⚡ Normal Speed (1.0x)
              </button>
            </div>
          </div>

          <!-- Question -->
          <div style="margin-bottom: 20px;">
            <div style="font-size: 0.85rem; font-weight: 700; color: var(--ha-red); text-transform: uppercase; margin-bottom: 6px;">
              Comprehension Question
            </div>
            <h3 style="font-size: 1.35rem; color: var(--ha-navy); margin-bottom: 20px;">
              ${item.question}
            </h3>

            <div style="display: grid; grid-template-columns: 1fr; gap: 12px; max-width: 500px; margin: 0 auto;" id="listen-opts-box">
              ${opts.map(opt => `
                <button class="quiz-option-btn listen-opt-btn" data-ans="${opt}">${opt}</button>
              `).join('')}
            </div>
          </div>

          <div id="listen-feedback" style="display: none;" class="quiz-feedback-banner"></div>
        </div>
      </div>
    `;

    const playBtn = container.querySelector('#play-audio-btn');
    const feedback = container.querySelector('#listen-feedback');
    const optsBox = container.querySelector('#listen-opts-box');

    function playAudio() {
      sound.speak(item.sentence, speechRate);
    }

    // Auto play audio once on start
    setTimeout(playAudio, 400);

    playBtn?.addEventListener('click', playAudio);

    container.querySelector('#speed-slow-btn')?.addEventListener('click', () => {
      speechRate = 0.75;
      playAudio();
    });

    container.querySelector('#speed-normal-btn')?.addEventListener('click', () => {
      speechRate = 1.0;
      playAudio();
    });

    optsBox.querySelectorAll('.listen-opt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const chosen = btn.dataset.ans;
        const isCorrect = chosen === item.correctAnswer;
        optsBox.querySelectorAll('.listen-opt-btn').forEach(b => b.disabled = true);

        if (isCorrect) {
          sound.playCorrect();
          btn.classList.add('correct');
          score += 20;
          stateManager.addXP(20, 'listening_correct');
          stateManager.recordActivityStats('correctAnswers', 1);

          feedback.className = 'quiz-feedback-banner correct';
          feedback.textContent = getRandomFeedback(true) + ` Sentence was: "${item.transcript}" (+20 XP)`;
          feedback.style.display = 'block';

          setTimeout(() => {
            currentIndex++;
            renderDrill();
          }, 1500);
        } else {
          sound.playWrong();
          btn.classList.add('wrong');
          optsBox.querySelectorAll('.listen-opt-btn').forEach(b => {
            if (b.dataset.ans === item.correctAnswer) b.classList.add('correct');
          });

          feedback.className = 'quiz-feedback-banner wrong';
          feedback.textContent = getRandomFeedback(false) + ` Sentence was: "${item.transcript}".`;
          feedback.style.display = 'block';

          setTimeout(() => {
            currentIndex++;
            renderDrill();
          }, 2000);
        }
      });
    });

    container.querySelector('#listen-exit-btn')?.addEventListener('click', () => onNavigate('dashboard'));
  }

  renderDrill();
}