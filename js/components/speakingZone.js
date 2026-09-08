// Home Academy Speaking Practice Zone
import { stateManager } from '../state.js';
import { SPEAKING_DRILLS } from '../data/games-data.js';
import { sound } from '../audio.js';
import { fireConfetti } from '../confetti.js';

export function renderSpeakingZone(container, onNavigate) {
  const student = stateManager.getCurrentStudent();
  const drills = SPEAKING_DRILLS;
  let currentIndex = 0;
  let score = 0;
  let isListening = false;

  function renderDrill() {
    if (currentIndex >= drills.length) {
      sound.playLevelUp();
      fireConfetti(3500);
      stateManager.addXP(60, 'speaking_complete');
      stateManager.recordActivityStats('speakingCompleted', 1);

      container.innerHTML = `
        <div class="container game-zone-container" style="text-align: center; padding-top: 30px;">
          <div class="ha-card" style="padding: 40px 24px;">
            <span style="font-size: 4rem;">🗣️</span>
            <h2 style="font-size: 2rem; color: var(--ha-navy); margin: 14px 0;">Speaking Superstar!</h2>
            <p style="font-size: 1.1rem; color: var(--ha-text-muted); margin-bottom: 20px;">
              You practiced all beginner sentences! Great pronunciation boost! <strong>+60 Bonus XP</strong>!
            </p>
            <button class="btn btn-primary" id="speak-back-dash">Return to Dashboard</button>
          </div>
        </div>
      `;
      container.querySelector('#speak-back-dash')?.addEventListener('click', () => onNavigate('dashboard'));
      return;
    }

    const item = drills[currentIndex];
    const displaySentence = item.prompt.replace('[Name]', student.name).replace('[Student]', student.name);

    container.innerHTML = `
      <div class="container game-zone-container" style="padding-top: 20px;">
        <div class="game-header-bar">
          <button class="game-back-btn" id="speak-exit-btn">← Back to Dashboard</button>
          <div class="game-score-tracker">
            <span class="score-chip xp">⚡ XP: +${score}</span>
            <span class="score-chip">Sentence ${currentIndex + 1} of ${drills.length}</span>
          </div>
        </div>

        <div class="ha-card" style="padding: 36px 24px; text-align: center;">
          <span class="badge badge-red" style="margin-bottom: 12px;">Speaking Drill</span>
          <h2 style="font-size: 1.6rem; color: var(--ha-navy); margin-bottom: 6px;">Speak English Out Loud</h2>
          <p style="font-size: 0.95rem; color: var(--ha-text-muted); margin-bottom: 24px;">
            Listen first to hear the model pronunciation, then tap the microphone to speak!
          </p>

          <!-- Prompt Display Box -->
          <div style="background: var(--ha-navy-subtle); border-radius: var(--radius-xl); padding: 32px 20px; margin-bottom: 24px; border: 2px solid #BFDBFE;">
            <div style="font-size: 2rem; font-weight: 800; color: var(--ha-navy); margin-bottom: 10px;">
              “${displaySentence}”
            </div>
            <div style="font-size: 0.9rem; color: var(--ha-text-muted);">
              💡 ${item.hint}
            </div>
          </div>

          <!-- Actions -->
          <div style="display: flex; justify-content: center; gap: 14px; margin-bottom: 28px;">
            <button class="btn btn-outline" id="speak-listen-first-btn">
              <span>🔊</span> Listen First
            </button>
          </div>

          <!-- Microphone Trigger -->
          <div class="mic-action-box">
            <button class="mic-circle-btn" id="mic-btn" title="Tap to Speak">
              <span id="mic-icon">🎤</span>
            </button>
            <div style="font-size: 0.9rem; font-weight: 700; color: var(--ha-navy);" id="mic-status-label">
              Tap the microphone and read the sentence
            </div>
          </div>

          <!-- Recognized Text Display -->
          <div id="heard-speech-box" style="display: none; font-size: 0.95rem; color: var(--ha-navy); background: #F1F5F9; padding: 12px 18px; border-radius: var(--radius-md); margin-bottom: 16px;"></div>

          <div id="speak-feedback" style="display: none;" class="quiz-feedback-banner"></div>

          <!-- Alternative for browsers without mic support -->
          <div style="margin-top: 24px; padding-top: 18px; border-top: 1px solid var(--ha-border);">
            <button class="btn btn-outline btn-sm" id="btn-self-verified">
              <span>👍</span> I Practiced Speaking Out Loud (+30 XP)
            </button>
          </div>
        </div>
      </div>
    `;

    const micBtn = container.querySelector('#mic-btn');
    const micStatus = container.querySelector('#mic-status-label');
    const heardBox = container.querySelector('#heard-speech-box');
    const feedback = container.querySelector('#speak-feedback');

    // Listen first
    container.querySelector('#speak-listen-first-btn')?.addEventListener('click', () => {
      sound.speak(displaySentence, 0.85);
    });

    // Mic click
    micBtn?.addEventListener('click', () => {
      if (isListening) {
        sound.stopListening();
        setMicIdle();
        return;
      }

      sound.playClick();
      isListening = true;
      micBtn.classList.add('listening');
      micStatus.textContent = 'Listening... Speak clearly now! 🎙️';
      micStatus.style.color = 'var(--ha-red)';

      const started = sound.listenForSpeech(
        (spokenText) => {
          setMicIdle();
          evaluateSpeech(spokenText);
        },
        (error) => {
          setMicIdle();
          micStatus.textContent = 'Could not hear clearly. Tap mic to try again!';
        },
        () => {
          setMicIdle();
        }
      );

      if (!started) {
        setMicIdle();
        micStatus.textContent = 'Microphone not available in this browser. Use "I Practiced" below!';
      }
    });

    function setMicIdle() {
      isListening = false;
      micBtn?.classList.remove('listening');
      if (micStatus) {
        micStatus.textContent = 'Tap the microphone and read the sentence';
        micStatus.style.color = 'var(--ha-navy)';
      }
    }

    function evaluateSpeech(spokenText) {
      heardBox.style.display = 'block';
      heardBox.innerHTML = `We heard: <strong>"${spokenText}"</strong>`;

      const targetWords = displaySentence.toLowerCase().replace(/[^a-z0-9 ]/g, '').split(' ');
      const heardWords = spokenText.toLowerCase().replace(/[^a-z0-9 ]/g, '').split(' ');

      // Check overlap (forgiving beginner evaluation)
      const matches = targetWords.filter(w => heardWords.includes(w));
      const matchRatio = matches.length / targetWords.length;

      if (matchRatio >= 0.5 || heardWords.length >= 2) {
        // Successful beginner attempt!
        sound.playCorrect();
        score += 30;
        stateManager.addXP(30, 'speaking_drill');
        stateManager.recordActivityStats('speakingCompleted', 1);

        feedback.className = 'quiz-feedback-banner correct';
        feedback.textContent = `Great job! 👍 Beautiful effort! (+30 XP)`;
        feedback.style.display = 'block';

        setTimeout(() => {
          currentIndex++;
          renderDrill();
        }, 1600);
      } else {
        sound.playWrong();
        feedback.className = 'quiz-feedback-banner wrong';
        feedback.textContent = `Almost there! Try speaking a little louder and clearer.`;
        feedback.style.display = 'block';
      }
    }

    // Manual verified fallback
    container.querySelector('#btn-self-verified')?.addEventListener('click', () => {
      sound.playCorrect();
      score += 30;
      stateManager.addXP(30, 'speaking_drill');
      stateManager.recordActivityStats('speakingCompleted', 1);

      feedback.className = 'quiz-feedback-banner correct';
      feedback.textContent = `Excellent practice! 👍 You earned +30 XP!`;
      feedback.style.display = 'block';

      setTimeout(() => {
        currentIndex++;
        renderDrill();
      }, 1200);
    });

    container.querySelector('#speak-exit-btn')?.addEventListener('click', () => onNavigate('dashboard'));
  }

  renderDrill();
}