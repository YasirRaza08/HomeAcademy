// Game 4: Sentence Builder
import { stateManager } from '../../state.js';
import { SENTENCE_BUILDER_DATA } from '../../data/games-data.js';
import { shuffleArray, getRandomFeedback } from '../../utils/helpers.js';
import { sound } from '../../audio.js';
import { fireConfetti } from '../../confetti.js';

export function runSentenceBuilderGame(container, onBackToHub) {
  const sentences = shuffleArray(SENTENCE_BUILDER_DATA);
  let currentIndex = 0;
  let score = 0;

  function renderSentence() {
    if (currentIndex >= sentences.length) {
      sound.playLevelUp();
      fireConfetti(3000);
      stateManager.addXP(60, 'sentence_builder_complete');
      stateManager.recordActivityStats('gamesPlayed', 1);

      container.innerHTML = `
        <div class="container game-zone-container" style="text-align: center;">
          <div class="ha-card" style="padding: 40px 24px;">
            <span style="font-size: 4rem;">✍️</span>
            <h2 style="font-size: 2rem; color: var(--ha-navy); margin: 14px 0;">Sentence Master!</h2>
            <p style="font-size: 1.1rem; color: var(--ha-text-muted); margin-bottom: 20px;">
              You arranged all beginner English sentences properly! +60 XP earned!
            </p>
            <button class="btn btn-primary" id="sb-back-hub">Return to Game Center</button>
          </div>
        </div>
      `;
      container.querySelector('#sb-back-hub')?.addEventListener('click', onBackToHub);
      return;
    }

    const item = sentences[currentIndex];
    const targetSentence = item.tokens.join(' ');
    let availableTokens = shuffleArray(item.tokens).map((tok, id) => ({ id, text: tok, used: false }));
    let assembledTokens = [];

    container.innerHTML = `
      <div class="container game-zone-container">
        <div class="game-header-bar">
          <button class="game-back-btn" id="sb-exit-btn">← Back to Hub</button>
          <div class="game-score-tracker">
            <span class="score-chip xp">⚡ Score: +${score} XP</span>
            <span class="score-chip">Sentence ${currentIndex + 1} of ${sentences.length}</span>
          </div>
        </div>

        <div class="ha-card" style="padding: 36px 24px; text-align: center;">
          <span class="badge badge-navy" style="margin-bottom: 12px;">Sentence Builder</span>
          <h2 style="font-size: 1.4rem; color: var(--ha-navy); margin-bottom: 6px;">Arrange the Words in Order</h2>
          <p style="font-size: 0.9rem; color: var(--ha-text-muted); margin-bottom: 20px;">
            💡 Hint: ${item.hint}
          </p>

          <div class="sb-target-zone" id="sb-target-area">
            <span style="color: var(--ha-text-muted); font-size: 0.95rem; font-style: italic;" id="sb-empty-prompt">
              Tap words below to build the sentence
            </span>
          </div>

          <div class="word-chip-bank" id="sb-bank">
            ${availableTokens.map(tok => `
              <button class="word-chip" data-token-id="${tok.id}">${tok.text}</button>
            `).join('')}
          </div>

          <div style="display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;">
            <button class="btn btn-outline btn-sm" id="sb-read-btn">
              <span>🔊</span> Listen
            </button>
            <button class="btn btn-outline btn-sm" id="sb-clear-btn">
              <span>🔄</span> Clear
            </button>
            <button class="btn btn-primary" id="sb-check-btn" disabled>
              Check Sentence →
            </button>
          </div>

          <div id="sb-feedback" style="display: none;" class="quiz-feedback-banner"></div>
        </div>
      </div>
    `;

    const targetArea = container.querySelector('#sb-target-area');
    const bank = container.querySelector('#sb-bank');
    const checkBtn = container.querySelector('#sb-check-btn');
    const feedback = container.querySelector('#sb-feedback');
    const emptyPrompt = container.querySelector('#sb-empty-prompt');

    function updateUI() {
      targetArea.innerHTML = '';
      if (assembledTokens.length === 0) {
        targetArea.appendChild(emptyPrompt);
      } else {
        assembledTokens.forEach(tok => {
          const chip = document.createElement('button');
          chip.className = 'word-chip';
          chip.textContent = tok.text;
          chip.style.backgroundColor = 'var(--ha-navy)';
          chip.style.color = '#FFFFFF';
          chip.title = 'Click to remove';
          chip.addEventListener('click', () => {
            assembledTokens = assembledTokens.filter(t => t.id !== tok.id);
            tok.used = false;
            const bankBtn = bank.querySelector(`[data-token-id="${tok.id}"]`);
            if (bankBtn) bankBtn.disabled = false;
            sound.playClick();
            updateUI();
          });
          targetArea.appendChild(chip);
        });
      }
      checkBtn.disabled = assembledTokens.length !== item.tokens.length;
    }

    container.querySelectorAll('.word-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        const tokenId = Number(btn.dataset.tokenId);
        const tok = availableTokens.find(t => t.id === tokenId);
        if (tok && !tok.used) {
          tok.used = true;
          btn.disabled = true;
          assembledTokens.push(tok);
          sound.playClick();
          updateUI();
        }
      });
    });

    container.querySelector('#sb-read-btn')?.addEventListener('click', () => {
      sound.speak(targetSentence);
    });

    container.querySelector('#sb-clear-btn')?.addEventListener('click', () => {
      assembledTokens = [];
      availableTokens.forEach(t => t.used = false);
      bank.querySelectorAll('.word-chip').forEach(b => b.disabled = false);
      sound.playClick();
      updateUI();
    });

    checkBtn.addEventListener('click', () => {
      const built = assembledTokens.map(t => t.text).join(' ');
      if (built === targetSentence) {
        sound.playCorrect();
        score += 25;
        stateManager.addXP(25, 'sentence_builder');
        stateManager.recordActivityStats('correctAnswers', 1);

        feedback.className = 'quiz-feedback-banner correct';
        feedback.textContent = getRandomFeedback(true) + ` "${targetSentence}" (+25 XP)`;
        feedback.style.display = 'block';

        setTimeout(() => {
          currentIndex++;
          renderSentence();
        }, 1400);
      } else {
        sound.playWrong();
        feedback.className = 'quiz-feedback-banner wrong';
        feedback.textContent = getRandomFeedback(false) + ` Check the word order and try again!`;
        feedback.style.display = 'block';
      }
    });

    container.querySelector('#sb-exit-btn')?.addEventListener('click', onBackToHub);
  }

  renderSentence();
}