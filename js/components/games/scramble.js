// Game 1: Word Scramble
import { stateManager } from '../../state.js';
import { SCRAMBLE_WORDS } from '../../data/games-data.js';
import { shuffleArray, getRandomFeedback } from '../../utils/helpers.js';
import { sound } from '../../audio.js';
import { fireConfetti } from '../../confetti.js';

export function runScrambleGame(container, onBackToHub) {
  const words = shuffleArray(SCRAMBLE_WORDS);
  let wordIndex = 0;
  let score = 0;

  function renderRound() {
    if (wordIndex >= words.length) {
      sound.playLevelUp();
      fireConfetti(3000);
      stateManager.addXP(50, 'game_scramble');
      stateManager.recordActivityStats('gamesPlayed', 1);

      container.innerHTML = `
        <div class="container game-zone-container" style="text-align: center;">
          <div class="ha-card" style="padding: 40px 24px;">
            <span style="font-size: 4rem;">🏆</span>
            <h2 style="font-size: 2rem; color: var(--ha-navy); margin: 14px 0;">Scramble Champion!</h2>
            <p style="font-size: 1.1rem; color: var(--ha-text-muted); margin-bottom: 20px;">
              You solved all scrambled words and earned <strong>+50 Bonus XP</strong>!
            </p>
            <button class="btn btn-primary" id="scramble-back-hub">Return to Game Center</button>
          </div>
        </div>
      `;
      container.querySelector('#scramble-back-hub')?.addEventListener('click', onBackToHub);
      return;
    }

    const item = words[wordIndex];
    const targetWord = item.word.toUpperCase();
    let letters = shuffleArray(targetWord.split(''));
    if (letters.join('') === targetWord && letters.length > 2) {
      letters.reverse();
    }

    let currentInput = [];
    let availableTiles = letters.map((l, idx) => ({ id: idx, letter: l, used: false }));

    container.innerHTML = `
      <div class="container game-zone-container">
        <div class="game-header-bar">
          <button class="game-back-btn" id="scramble-exit-btn">← Back to Hub</button>
          <div class="game-score-tracker">
            <span class="score-chip xp">⚡ XP: +${score}</span>
            <span class="score-chip">Word ${wordIndex + 1} of ${words.length}</span>
          </div>
        </div>

        <div class="scramble-box">
          <div style="font-size: 3rem; margin-bottom: 8px;">${item.icon}</div>
          <div class="scramble-hint-pill">
            <span>💡</span> Hint: ${item.hint} (${item.category})
          </div>

          <div class="scramble-slots" id="scramble-slots-row">
            ${Array.from({ length: targetWord.length }).map((_, i) => `
              <div class="scramble-slot" data-slot="${i}"></div>
            `).join('')}
          </div>

          <div class="scramble-letters-pool" id="scramble-pool">
            ${availableTiles.map((t) => `
              <button class="letter-tile-btn" data-tile-id="${t.id}">${t.letter}</button>
            `).join('')}
          </div>

          <div class="scramble-controls">
            <button class="btn btn-outline btn-sm" id="scramble-backspace-btn">⌫ Delete</button>
            <button class="btn btn-outline btn-sm" id="scramble-reset-btn">🔄 Clear</button>
            <button class="btn btn-primary" id="scramble-check-btn" disabled>Check Word →</button>
          </div>

          <div id="scramble-feedback" style="display: none;" class="quiz-feedback-banner"></div>
        </div>
      </div>
    `;

    const slotsRow = container.querySelector('#scramble-slots-row');
    const pool = container.querySelector('#scramble-pool');
    const checkBtn = container.querySelector('#scramble-check-btn');
    const feedback = container.querySelector('#scramble-feedback');

    function updateSlots() {
      const slots = slotsRow.querySelectorAll('.scramble-slot');
      slots.forEach((slot, idx) => {
        if (idx < currentInput.length) {
          slot.textContent = currentInput[idx].letter;
          slot.classList.add('filled');
        } else {
          slot.textContent = '';
          slot.classList.remove('filled');
        }
      });
      checkBtn.disabled = currentInput.length !== targetWord.length;
    }

    container.querySelectorAll('.letter-tile-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const tileId = Number(btn.dataset.tileId);
        const tile = availableTiles.find(t => t.id === tileId);
        if (tile && !tile.used) {
          tile.used = true;
          btn.disabled = true;
          currentInput.push(tile);
          sound.playClick();
          updateSlots();
        }
      });
    });

    container.querySelector('#scramble-backspace-btn')?.addEventListener('click', () => {
      if (currentInput.length > 0) {
        const lastTile = currentInput.pop();
        lastTile.used = false;
        const btn = pool.querySelector(`[data-tile-id="${lastTile.id}"]`);
        if (btn) btn.disabled = false;
        sound.playClick();
        updateSlots();
      }
    });

    container.querySelector('#scramble-reset-btn')?.addEventListener('click', () => {
      currentInput = [];
      availableTiles.forEach(t => t.used = false);
      pool.querySelectorAll('.letter-tile-btn').forEach(b => b.disabled = false);
      sound.playClick();
      updateSlots();
    });

    checkBtn.addEventListener('click', () => {
      const formedWord = currentInput.map(t => t.letter).join('');
      if (formedWord === targetWord) {
        sound.playCorrect();
        score += 20;
        stateManager.addXP(20, 'scramble_correct');
        stateManager.recordActivityStats('correctAnswers', 1);

        feedback.className = 'quiz-feedback-banner correct';
        feedback.textContent = getRandomFeedback(true) + ` "${targetWord}" is correct! (+20 XP)`;
        feedback.style.display = 'block';

        setTimeout(() => {
          wordIndex++;
          renderRound();
        }, 1300);
      } else {
        sound.playWrong();
        feedback.className = 'quiz-feedback-banner wrong';
        feedback.textContent = getRandomFeedback(false) + ` That spelled "${formedWord}". Try again!`;
        feedback.style.display = 'block';
      }
    });

    container.querySelector('#scramble-exit-btn')?.addEventListener('click', onBackToHub);
  }

  renderRound();
}