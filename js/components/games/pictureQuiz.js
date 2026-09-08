// Game 3: Picture Quiz
import { stateManager } from '../../state.js';
import { PICTURE_QUIZ_QUESTIONS } from '../../data/questions.js';
import { shuffleArray, getRandomFeedback } from '../../utils/helpers.js';
import { sound } from '../../audio.js';
import { fireConfetti } from '../../confetti.js';

export function runPictureQuizGame(container, onBackToHub) {
  const questions = shuffleArray(PICTURE_QUIZ_QUESTIONS);
  let currentIndex = 0;
  let score = 0;

  function renderQuestion() {
    if (currentIndex >= questions.length) {
      sound.playLevelUp();
      fireConfetti(3000);
      stateManager.addXP(40, 'picture_quiz_complete');
      stateManager.recordActivityStats('gamesPlayed', 1);

      container.innerHTML = `
        <div class="container game-zone-container" style="text-align: center;">
          <div class="ha-card" style="padding: 40px 24px;">
            <span style="font-size: 4rem;">🖼️</span>
            <h2 style="font-size: 2rem; color: var(--ha-navy); margin: 14px 0;">Picture Quiz Completed!</h2>
            <p style="font-size: 1.1rem; color: var(--ha-text-muted); margin-bottom: 20px;">
              You identified every picture accurately and earned <strong>+40 Bonus XP</strong>!
            </p>
            <button class="btn btn-primary" id="pq-back-hub">Return to Game Center</button>
          </div>
        </div>
      `;
      container.querySelector('#pq-back-hub')?.addEventListener('click', onBackToHub);
      return;
    }

    const q = questions[currentIndex];
    const randomizedOptions = shuffleArray(q.options);

    container.innerHTML = `
      <div class="container game-zone-container">
        <div class="game-header-bar">
          <button class="game-back-btn" id="pq-exit-btn">← Back to Hub</button>
          <div class="game-score-tracker">
            <span class="score-chip xp">⚡ XP: +${score}</span>
            <span class="score-chip">Question ${currentIndex + 1} of ${questions.length}</span>
          </div>
        </div>

        <div class="pic-quiz-wrapper">
          <div class="pic-quiz-display">
            <div class="pic-quiz-emoji">${q.imageEmoji}</div>
            <h2 class="pic-quiz-prompt">${q.question}</h2>
            <p class="pic-quiz-hint">💡 Hint: ${q.hint}</p>
          </div>

          <div class="pic-quiz-options-grid" id="pq-options-box">
            ${randomizedOptions.map(opt => `
              <button class="quiz-option-btn" data-answer="${opt}">${opt}</button>
            `).join('')}
          </div>

          <div id="pq-feedback" style="display: none;" class="quiz-feedback-banner"></div>
        </div>
      </div>
    `;

    const optionsBox = container.querySelector('#pq-options-box');
    const feedback = container.querySelector('#pq-feedback');

    optionsBox.querySelectorAll('.quiz-option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const chosen = btn.dataset.answer;
        const isCorrect = chosen === q.correctAnswer;

        optionsBox.querySelectorAll('.quiz-option-btn').forEach(b => b.disabled = true);

        if (isCorrect) {
          sound.playCorrect();
          btn.classList.add('correct');
          score += 15;
          stateManager.addXP(15, 'picture_quiz_answer');
          stateManager.recordActivityStats('correctAnswers', 1);

          feedback.className = 'quiz-feedback-banner correct';
          feedback.textContent = getRandomFeedback(true) + ` That is a ${q.correctAnswer}! (+15 XP)`;
          feedback.style.display = 'block';

          setTimeout(() => {
            currentIndex++;
            renderQuestion();
          }, 1300);
        } else {
          sound.playWrong();
          btn.classList.add('wrong');
          optionsBox.querySelectorAll('.quiz-option-btn').forEach(b => {
            if (b.dataset.answer === q.correctAnswer) b.classList.add('correct');
          });

          feedback.className = 'quiz-feedback-banner wrong';
          feedback.textContent = getRandomFeedback(false) + ` It is a ${q.correctAnswer}!`;
          feedback.style.display = 'block';

          setTimeout(() => {
            currentIndex++;
            renderQuestion();
          }, 1800);
        }
      });
    });

    container.querySelector('#pq-exit-btn')?.addEventListener('click', onBackToHub);
  }

  renderQuestion();
}