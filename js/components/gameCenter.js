// Home Academy Game Center Main Hub
import { sound } from '../audio.js';
import { runScrambleGame } from './games/scramble.js';
import { runMatchGame } from './games/match.js';
import { runPictureQuizGame } from './games/pictureQuiz.js';
import { runSentenceBuilderGame } from './games/sentenceBuilder.js';
import { runSpeedRoundGame } from './games/speedRound.js';
import { runTrueFalseGame } from './games/trueFalse.js';

export function renderGameCenter(container, onNavigate, initialGame = null) {
  function renderHub() {
    container.innerHTML = `
      <div class="container game-zone-container">
        <div style="text-align: center; margin-bottom: 36px;">
          <span class="badge badge-red" style="margin-bottom: 10px;">Play & Practice</span>
          <h1 style="font-size: 2.2rem; color: var(--ha-navy); margin-bottom: 8px;">Academy Game Center</h1>
          <p style="font-size: 1.05rem; color: var(--ha-text-muted); max-width: 600px; margin: 0 auto;">
            Compete, practice beginner English words and sentences, and earn XP to climb the class leaderboard!
          </p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px;">
          
          <!-- Game 1: Word Scramble -->
          <div class="ha-card game-select-card" data-game="scramble" style="cursor: pointer; border-top: 4px solid var(--ha-navy);">
            <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
              <span style="font-size: 2.5rem;">🔤</span>
              <span class="badge badge-gold">+20 XP per word</span>
            </div>
            <h3 style="font-size: 1.25rem; margin-bottom: 8px;">Game 1: Word Scramble</h3>
            <p style="font-size: 0.9rem; margin-bottom: 16px;">
              Unscramble mixed-up letters to discover the hidden English word before time runs out!
            </p>
            <button class="btn btn-primary btn-sm" style="width: 100%;">Play Scramble →</button>
          </div>

          <!-- Game 2: Word Match -->
          <div class="ha-card game-select-card" data-game="match" style="cursor: pointer; border-top: 4px solid var(--ha-red);">
            <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
              <span style="font-size: 2.5rem;">🃏</span>
              <span class="badge badge-red">+30 XP Match Bonus</span>
            </div>
            <h3 style="font-size: 1.25rem; margin-bottom: 8px;">Game 2: Word Match</h3>
            <p style="font-size: 0.9rem; margin-bottom: 16px;">
              Flip cards and match beginner English words to their pictures: APPLE ↔ 🍎, DOG ↔ 🐶!
            </p>
            <button class="btn btn-secondary btn-sm" style="width: 100%;">Play Word Match →</button>
          </div>

          <!-- Game 3: Picture Quiz -->
          <div class="ha-card game-select-card" data-game="picture" style="cursor: pointer; border-top: 4px solid var(--ha-gold);">
            <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
              <span style="font-size: 2.5rem;">🖼️</span>
              <span class="badge badge-gold">+15 XP per image</span>
            </div>
            <h3 style="font-size: 1.25rem; margin-bottom: 8px;">Game 3: Picture Quiz</h3>
            <p style="font-size: 0.9rem; margin-bottom: 16px;">
              Look at the picture: "What is this?" Pick the right English answer from 4 options.
            </p>
            <button class="btn btn-accent btn-sm" style="width: 100%;">Play Picture Quiz →</button>
          </div>

          <!-- Game 4: Sentence Builder -->
          <div class="ha-card game-select-card" data-game="sentence" style="cursor: pointer; border-top: 4px solid var(--ha-navy);">
            <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
              <span style="font-size: 2.5rem;">✍️</span>
              <span class="badge badge-navy">+25 XP per sentence</span>
            </div>
            <h3 style="font-size: 1.25rem; margin-bottom: 8px;">Game 4: Sentence Builder</h3>
            <p style="font-size: 0.9rem; margin-bottom: 16px;">
              Rearrange scrambled word chips into perfect beginner sentences like "I go to school."
            </p>
            <button class="btn btn-primary btn-sm" style="width: 100%;">Play Sentence Builder →</button>
          </div>

          <!-- Game 5: Speed Round -->
          <div class="ha-card game-select-card" data-game="speed" style="cursor: pointer; border-top: 4px solid var(--ha-red);">
            <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
              <span style="font-size: 2.5rem;">⚡</span>
              <span class="badge badge-red">30-Second Rush!</span>
            </div>
            <h3 style="font-size: 1.25rem; margin-bottom: 8px;">Game 5: Speed Round</h3>
            <p style="font-size: 0.9rem; margin-bottom: 16px;">
              Fast-paced 30-second rush! Answer as many beginner questions as you can.
            </p>
            <button class="btn btn-secondary btn-sm" style="width: 100%;">Start Speed Round →</button>
          </div>

          <!-- Game 6: True or False -->
          <div class="ha-card game-select-card" data-game="truefalse" style="cursor: pointer; border-top: 4px solid var(--ha-gold);">
            <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
              <span style="font-size: 2.5rem;">🤔</span>
              <span class="badge badge-gold">+10 XP Funny Drill</span>
            </div>
            <h3 style="font-size: 1.25rem; margin-bottom: 8px;">Game 6: True or False</h3>
            <p style="font-size: 0.9rem; margin-bottom: 16px;">
              Test funny beginner statements: "Cats can fly." Quick, funny, and educational!
            </p>
            <button class="btn btn-accent btn-sm" style="width: 100%;">Play True or False →</button>
          </div>

        </div>
      </div>
    `;

    container.querySelectorAll('.game-select-card').forEach(card => {
      card.addEventListener('click', () => {
        sound.playClick();
        loadGame(card.dataset.game);
      });
    });
  }

  function loadGame(gameName) {
    if (gameName === 'scramble') runScrambleGame(container, renderHub);
    else if (gameName === 'match') runMatchGame(container, renderHub);
    else if (gameName === 'picture' || gameName === 'quiz') runPictureQuizGame(container, renderHub);
    else if (gameName === 'sentence') runSentenceBuilderGame(container, renderHub);
    else if (gameName === 'speed') runSpeedRoundGame(container, renderHub);
    else if (gameName === 'truefalse') runTrueFalseGame(container, renderHub);
    else renderHub();
  }

  if (initialGame) {
    loadGame(initialGame);
  } else {
    renderHub();
  }
}