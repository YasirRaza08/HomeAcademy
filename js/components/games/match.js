// Game 2: Word Match
import { stateManager } from '../../state.js';
import { MATCH_PAIRS } from '../../data/games-data.js';
import { shuffleArray } from '../../utils/helpers.js';
import { sound } from '../../audio.js';
import { fireConfetti } from '../../confetti.js';

export function runMatchGame(container, onBackToHub) {
  const sample = shuffleArray(MATCH_PAIRS).slice(0, 6);
  const cards = [];

  sample.forEach((item, idx) => {
    cards.push({
      id: `word_${idx}`,
      matchKey: item.word,
      type: 'word',
      content: item.word,
      emoji: null
    });
    cards.push({
      id: `emoji_${idx}`,
      matchKey: item.word,
      type: 'emoji',
      content: null,
      emoji: item.emoji
    });
  });

  const shuffledCards = shuffleArray(cards);
  let flippedCards = [];
  let matchedKeys = new Set();
  let score = 0;

  container.innerHTML = `
    <div class="container game-zone-container">
      <div class="game-header-bar">
        <button class="game-back-btn" id="match-exit-btn">← Back to Hub</button>
        <div class="game-score-tracker">
          <span class="score-chip xp">⚡ Score: +${score} XP</span>
          <span class="score-chip" id="pairs-left-chip">Pairs: 0 / ${sample.length}</span>
        </div>
      </div>

      <div class="ha-card" style="padding: 24px; text-align: center; margin-bottom: 20px;">
        <h2 style="font-size: 1.4rem; color: var(--ha-navy); margin-bottom: 6px;">Word & Picture Match</h2>
        <p style="font-size: 0.9rem; color: var(--ha-text-muted);">
          Match the English word card to its matching picture!
        </p>

        <div class="match-grid" id="match-cards-grid">
          ${shuffledCards.map((card, i) => `
            <div class="match-card" data-index="${i}" data-key="${card.matchKey}" data-type="${card.type}">
              <div class="match-card-inner">
                <div class="match-card-front">
                  <span class="card-logo-mini">🎓</span>
                  <span style="font-size: 0.75rem; font-weight: 700; margin-top: 4px;">HOME</span>
                </div>
                <div class="match-card-back">
                  <div class="match-card-content">
                    ${card.type === 'emoji' ? `<span class="match-emoji">${card.emoji}</span>` : `<span class="match-word">${card.content}</span>`}
                  </div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  const grid = container.querySelector('#match-cards-grid');
  const pairsChip = container.querySelector('#pairs-left-chip');

  grid.querySelectorAll('.match-card').forEach(cardEl => {
    cardEl.addEventListener('click', () => {
      if (cardEl.classList.contains('flipped') || cardEl.classList.contains('matched') || flippedCards.length >= 2) {
        return;
      }

      sound.playClick();
      cardEl.classList.add('flipped');
      flippedCards.push(cardEl);

      if (flippedCards.length === 2) {
        const [first, second] = flippedCards;
        const key1 = first.dataset.key;
        const key2 = second.dataset.key;

        if (key1 === key2) {
          sound.playCorrect();
          matchedKeys.add(key1);
          score += 15;
          stateManager.addXP(15, 'match_pair');
          stateManager.recordActivityStats('correctAnswers', 1);

          first.classList.add('matched');
          second.classList.add('matched');
          flippedCards = [];
          pairsChip.textContent = `Pairs: ${matchedKeys.size} / ${sample.length}`;

          if (matchedKeys.size === sample.length) {
            sound.playLevelUp();
            fireConfetti(3500);
            stateManager.addXP(50, 'match_perfect');
            stateManager.recordActivityStats('gamesPlayed', 1);

            setTimeout(() => {
              container.innerHTML = `
                <div class="container game-zone-container" style="text-align: center;">
                  <div class="ha-card" style="padding: 40px 24px;">
                    <span style="font-size: 4rem;">🎉</span>
                    <h2 style="font-size: 2rem; color: var(--ha-navy); margin: 14px 0;">All Pairs Matched!</h2>
                    <p style="font-size: 1.1rem; color: var(--ha-text-muted); margin-bottom: 20px;">
                      Fantastic memory! You matched all words and earned <strong>+50 Bonus XP</strong>!
                    </p>
                    <button class="btn btn-primary" id="match-again-btn">Play Again</button>
                    <button class="btn btn-outline" id="match-done-hub-btn" style="margin-left: 10px;">Return to Hub</button>
                  </div>
                </div>
              `;
              container.querySelector('#match-again-btn')?.addEventListener('click', () => runMatchGame(container, onBackToHub));
              container.querySelector('#match-done-hub-btn')?.addEventListener('click', onBackToHub);
            }, 800);
          }
        } else {
          sound.playWrong();
          setTimeout(() => {
            first.classList.remove('flipped');
            second.classList.remove('flipped');
            flippedCards = [];
          }, 900);
        }
      }
    });
  });

  container.querySelector('#match-exit-btn')?.addEventListener('click', onBackToHub);
}