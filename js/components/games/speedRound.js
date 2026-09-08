// Game 5: Speed Round (30-Second Rapid Sprint)
import { stateManager } from '../../state.js';
import { QUESTIONS_DATABASE } from '../../data/questions.js';
import { shuffleArray } from '../../utils/helpers.js';
import { sound } from '../../audio.js';
import { fireConfetti } from '../../confetti.js';

export function runSpeedRoundGame(container, onBackToHub) {
  let timeLeft = 30;
  let timerInterval = null;
  let correctCount = 0;
  let totalAnswered = 0;
  const questions = shuffleArray(QUESTIONS_DATABASE);
  let qIndex = 0;

  container.innerHTML = `
    <div class="container game-zone-container">
      <div class="game-header-bar">
        <button class="game-back-btn" id="speed-exit-btn">← Quit Round</button>
        <div class="game-score-tracker">
          <span class="score-chip streak" id="speed-timer-badge">⏱️ 30s remaining</span>
          <span class="score-chip xp" id="speed-score-badge">Score: 0</span>
        </div>
      </div>

      <div class="speed-timer-bar">
        <div class="speed-timer-fill" id="speed-bar-fill" style="width: 100%;"></div>
      </div>

      <div class="speed-question-box" id="speed-box">
        <div id="speed-q-container"></div>
      </div>
    </div>
  `;

  const timerBadge = container.querySelector('#speed-timer-badge');
  const scoreBadge = container.querySelector('#speed-score-badge');
  const barFill = container.querySelector('#speed-bar-fill');
  const qContainer = container.querySelector('#speed-q-container');

  function showCurrentQuestion() {
    if (qIndex >= questions.length) qIndex = 0;
    const q = questions[qIndex];
    const opts = shuffleArray(q.options);

    qContainer.innerHTML = `
      <div style="font-size: 0.85rem; font-weight: 700; color: var(--ha-red); text-transform: uppercase; margin-bottom: 8px;">
        ${q.category} • Speed Question
      </div>
      <h2 style="font-size: 1.5rem; color: var(--ha-navy); margin-bottom: 24px;">${q.question}</h2>
      
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; max-width: 500px; margin: 0 auto;">
        ${opts.map(opt => `
          <button class="quiz-option-btn speed-opt-btn" data-ans="${opt}" style="padding: 14px;">${opt}</button>
        `).join('')}
      </div>
    `;

    qContainer.querySelectorAll('.speed-opt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        totalAnswered++;
        const ans = btn.dataset.ans;
        if (ans === q.correctAnswer) {
          sound.playCorrect();
          correctCount++;
          stateManager.addXP(10, 'speed_round');
          stateManager.recordActivityStats('correctAnswers', 1);
          scoreBadge.textContent = `Score: ${correctCount * 10}`;
        } else {
          sound.playWrong();
        }
        qIndex++;
        showCurrentQuestion();
      });
    });
  }

  showCurrentQuestion();

  timerInterval = setInterval(() => {
    timeLeft--;
    timerBadge.textContent = `⏱️ ${timeLeft}s remaining`;
    const pct = (timeLeft / 30) * 100;
    barFill.style.width = pct + '%';
    if (timeLeft <= 5) sound.playTick();

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      endRound();
    }
  }, 1000);

  function endRound() {
    sound.playLevelUp();
    fireConfetti(3000);
    const bonusXP = correctCount * 10;
    stateManager.recordActivityStats('gamesPlayed', 1);
    const accuracy = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;

    container.innerHTML = `
      <div class="container game-zone-container" style="text-align: center;">
        <div class="ha-card" style="padding: 40px 24px;">
          <span style="font-size: 4rem;">⚡</span>
          <h2 style="font-size: 2.2rem; color: var(--ha-navy); margin: 12px 0;">Time’s Up!</h2>
          <p style="font-size: 1.1rem; color: var(--ha-text-muted); margin-bottom: 24px;">
            You completed the 30-second rapid sprint!
          </p>

          <div style="display: flex; justify-content: center; gap: 20px; margin-bottom: 30px; flex-wrap: wrap;">
            <div class="stat-pill-card" style="min-width: 140px; text-align: center;">
              <div style="width: 100%;">
                <div class="stat-label">CORRECT</div>
                <div class="stat-value" style="color: var(--ha-success);">${correctCount} / ${totalAnswered}</div>
              </div>
            </div>
            <div class="stat-pill-card" style="min-width: 140px; text-align: center;">
              <div style="width: 100%;">
                <div class="stat-label">ACCURACY</div>
                <div class="stat-value" style="color: var(--ha-navy);">${accuracy}%</div>
              </div>
            </div>
            <div class="stat-pill-card" style="min-width: 140px; text-align: center;">
              <div style="width: 100%;">
                <div class="stat-label">XP EARNED</div>
                <div class="stat-value" style="color: var(--ha-gold-dark);">+${bonusXP} XP</div>
              </div>
            </div>
          </div>

          <button class="btn btn-primary" id="speed-again-btn">Try Speed Round Again</button>
          <button class="btn btn-outline" id="speed-hub-btn" style="margin-left: 10px;">Return to Hub</button>
        </div>
      </div>
    `;

    container.querySelector('#speed-again-btn')?.addEventListener('click', () => runSpeedRoundGame(container, onBackToHub));
    container.querySelector('#speed-hub-btn')?.addEventListener('click', onBackToHub);
  }

  container.querySelector('#speed-exit-btn')?.addEventListener('click', () => {
    clearInterval(timerInterval);
    onBackToHub();
  });
}