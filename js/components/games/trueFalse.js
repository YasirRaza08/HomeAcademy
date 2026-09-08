// Game 6: True or False (Funny Beginner Drill)
import { stateManager } from '../../state.js';
import { TRUE_FALSE_DATA } from '../../data/games-data.js';
import { shuffleArray, getRandomFeedback } from '../../utils/helpers.js';
import { sound } from '../../audio.js';
import { fireConfetti } from '../../confetti.js';

export function runTrueFalseGame(container, onBackToHub) {
  const items = shuffleArray(TRUE_FALSE_DATA);
  let index = 0;
  let score = 0;

  function renderItem() {
    if (index >= items.length) {
      sound.playLevelUp();
      fireConfetti(3000);
      stateManager.addXP(40, 'true_false_complete');
      stateManager.recordActivityStats('gamesPlayed', 1);

      container.innerHTML = `
        <div class="container game-zone-container" style="text-align: center;">
          <div class="ha-card" style="padding: 40px 24px;">
            <span style="font-size: 4rem;">🎉</span>
            <h2 style="font-size: 2rem; color: var(--ha-navy); margin: 14px 0;">True or False Champion!</h2>
            <p style="font-size: 1.1rem; color: var(--ha-text-muted); margin-bottom: 20px;">
              You answered all statements and earned <strong>+40 Bonus XP</strong>!
            </p>
            <button class="btn btn-primary" id="tf-back-hub">Return to Game Center</button>
          </div>
        </div>
      `;
      container.querySelector('#tf-back-hub')?.addEventListener('click', onBackToHub);
      return;
    }

    const item = items[index];

    container.innerHTML = `
      <div class="container game-zone-container">
        <div class="game-header-bar">
          <button class="game-back-btn" id="tf-exit-btn">← Back to Hub</button>
          <div class="game-score-tracker">
            <span class="score-chip xp">⚡ Score: +${score} XP</span>
            <span class="score-chip">Statement ${index + 1} of ${items.length}</span>
          </div>
        </div>

        <div class="tf-statement-card">
          <span class="badge badge-gold" style="margin-bottom: 16px;">True or False?</span>
          <div class="tf-statement-text">"${item.statement}"</div>

          <div class="tf-buttons-row">
            <button class="btn-tf btn-tf-true" id="btn-answer-true">
              <span>👍</span> TRUE
            </button>
            <button class="btn-tf btn-tf-false" id="btn-answer-false">
              <span>👎</span> FALSE
            </button>
          </div>

          <div id="tf-feedback" style="display: none;" class="quiz-feedback-banner"></div>
        </div>
      </div>
    `;

    const feedback = container.querySelector('#tf-feedback');
    const btnTrue = container.querySelector('#btn-answer-true');
    const btnFalse = container.querySelector('#btn-answer-false');

    function handleAnswer(choice) {
      btnTrue.disabled = true;
      btnFalse.disabled = true;
      const isCorrect = choice === item.isTrue;

      if (isCorrect) {
        sound.playCorrect();
        score += 10;
        stateManager.addXP(10, 'true_false_answer');
        stateManager.recordActivityStats('correctAnswers', 1);

        feedback.className = 'quiz-feedback-banner correct';
        feedback.textContent = getRandomFeedback(true) + ` ${item.explanation} (+10 XP)`;
        feedback.style.display = 'block';

        setTimeout(() => {
          index++;
          renderItem();
        }, 1400);
      } else {
        sound.playWrong();
        feedback.className = 'quiz-feedback-banner wrong';
        feedback.textContent = getRandomFeedback(false) + ` ${item.explanation}`;
        feedback.style.display = 'block';

        setTimeout(() => {
          index++;
          renderItem();
        }, 1800);
      }
    }

    btnTrue.addEventListener('click', () => handleAnswer(true));
    btnFalse.addEventListener('click', () => handleAnswer(false));
    container.querySelector('#tf-exit-btn')?.addEventListener('click', onBackToHub);
  }

  renderItem();
}