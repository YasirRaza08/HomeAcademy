// Home Academy 16 Categories Vocabulary Zone
import { stateManager } from '../state.js';
import { VOCABULARY_CATEGORIES } from '../data/vocabulary.js';
import { sound } from '../audio.js';
import { getRandomFeedback } from '../utils/helpers.js';

export function renderVocabularyZone(container, onNavigate) {
  let selectedCategory = VOCABULARY_CATEGORIES[0].id;
  let searchQuery = '';

  function render() {
    const student = stateManager.getCurrentStudent();
    const activeCat = VOCABULARY_CATEGORIES.find(c => c.id === selectedCategory) || VOCABULARY_CATEGORIES[0];

    // Filter words
    let displayWords = activeCat.words;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      displayWords = [];
      VOCABULARY_CATEGORIES.forEach(cat => {
        cat.words.forEach(w => {
          if (w.word.toLowerCase().includes(q) || w.meaning.toLowerCase().includes(q) || w.example.toLowerCase().includes(q)) {
            displayWords.push({ ...w, categoryName: cat.name });
          }
        });
      });
    }

    container.innerHTML = `
      <div class="container" style="padding-top: 24px; padding-bottom: 40px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; flex-wrap: wrap; gap: 16px;">
          <div>
            <span class="badge badge-navy" style="margin-bottom: 8px;">Vocabulary Zone</span>
            <h1 style="font-size: 2rem; color: var(--ha-navy);">${searchQuery ? 'Search Results' : activeCat.name}</h1>
            <p style="font-size: 0.95rem; color: var(--ha-text-muted);">
              ${searchQuery ? `Showing matches for "${searchQuery}"` : activeCat.description}
            </p>
          </div>

          <div style="display: flex; align-items: center; gap: 12px;">
            <input type="text" id="vocab-search-input" value="${searchQuery}" placeholder="🔍 Search any beginner word..."
              style="padding: 10px 16px; border: 1.5px solid var(--ha-border); border-radius: var(--radius-pill); font-size: 0.9rem; width: 240px;" />
          </div>
        </div>

        <!-- 16 Categories Horizontal Pills -->
        <div style="display: flex; gap: 8px; overflow-x: auto; padding-bottom: 14px; margin-bottom: 28px; scrollbar-width: thin;">
          ${VOCABULARY_CATEGORIES.map(cat => `
            <button class="vocab-cat-pill ${cat.id === selectedCategory && !searchQuery ? 'active' : ''}" data-cat="${cat.id}"
              style="white-space: nowrap; padding: 8px 16px; border-radius: var(--radius-pill); font-weight: 700; font-size: 0.85rem; display: flex; align-items: center; gap: 6px; border: 1.5px solid ${cat.id === selectedCategory && !searchQuery ? 'var(--ha-navy)' : 'var(--ha-border)'}; background: ${cat.id === selectedCategory && !searchQuery ? 'var(--ha-navy)' : '#FFFFFF'}; color: ${cat.id === selectedCategory && !searchQuery ? '#FFFFFF' : 'var(--ha-navy)'}; cursor: pointer; transition: all 0.15s;">
              <span>${cat.icon}</span> ${cat.name}
            </button>
          `).join('')}
        </div>

        <!-- Words Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;" id="vocab-words-grid">
          ${displayWords.length === 0 ? `
            <div class="ha-card" style="grid-column: 1 / -1; text-align: center; padding: 40px;">
              <span style="font-size: 3rem;">🔍</span>
              <h3 style="color: var(--ha-navy); margin: 12px 0;">No words found</h3>
              <p>Try searching for a different word like "apple", "school", or "cat".</p>
            </div>
          ` : displayWords.map(w => `
            <div class="ha-card" style="display: flex; flex-direction: column; justify-content: space-between; border-top: 3px solid var(--ha-gold);">
              <div>
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
                  <div style="font-size: 2.5rem;">${w.icon}</div>
                  <button class="btn-listen-word" data-word="${w.word}" data-sentence="${w.example}"
                    style="width: 36px; height: 36px; border-radius: var(--radius-pill); border: 1px solid var(--ha-border); background: var(--ha-navy-subtle); color: var(--ha-navy); cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; transition: transform 0.15s;" title="Listen to pronunciation">
                    🔊
                  </button>
                </div>
                
                <h3 style="font-size: 1.4rem; color: var(--ha-navy); margin-bottom: 4px;">${w.word}</h3>
                <p style="font-size: 0.88rem; color: var(--ha-text-muted); margin-bottom: 12px;">
                  <strong>Meaning:</strong> ${w.meaning}
                </p>
                <div style="background: var(--ha-navy-subtle); border-radius: var(--radius-sm); padding: 10px 12px; font-size: 0.88rem; color: var(--ha-navy); font-style: italic; margin-bottom: 16px;">
                  “${w.example}”
                </div>
              </div>

              <div style="display: flex; align-items: center; justify-content: space-between; pt: 12px; border-top: 1px solid var(--ha-border); margin-top: 10px; padding-top: 12px;">
                <button class="btn btn-outline btn-sm btn-mini-quiz" data-word="${w.word}">
                  <span>❓</span> Mini Quiz
                </button>
                <button class="btn btn-primary btn-sm btn-learned" data-word="${w.word}">
                  <span>✓</span> Learn (+10 XP)
                </button>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Mini Quiz Modal Container -->
        <div id="word-quiz-modal-mount"></div>
      </div>
    `;

    // Category pills click
    container.querySelectorAll('.vocab-cat-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        sound.playClick();
        selectedCategory = btn.dataset.cat;
        searchQuery = '';
        render();
      });
    });

    // Search input
    const searchInput = container.querySelector('#vocab-search-input');
    searchInput?.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      render();
      // refocus input after render
      const newInput = container.querySelector('#vocab-search-input');
      newInput.focus();
      newInput.setSelectionRange(newInput.value.length, newInput.value.length);
    });

    // Listen pronunciation buttons
    container.querySelectorAll('.btn-listen-word').forEach(btn => {
      btn.addEventListener('click', () => {
        const word = btn.dataset.word;
        const sentence = btn.dataset.sentence;
        sound.speak(word + '. ' + sentence);
      });
    });

    // Mark as Learned button (+10 XP)
    container.querySelectorAll('.btn-learned').forEach(btn => {
      btn.addEventListener('click', () => {
        sound.playCorrect();
        stateManager.addXP(10, 'vocab_learned');
        stateManager.recordActivityStats('wordsLearned', 1);
        btn.disabled = true;
        btn.style.background = 'var(--ha-success)';
        btn.textContent = 'Learned! ⭐';
      });
    });

    // Mini Quiz button
    container.querySelectorAll('.btn-mini-quiz').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetWord = btn.dataset.word;
        let wordObj = null;
        for (let cat of VOCABULARY_CATEGORIES) {
          wordObj = cat.words.find(w => w.word === targetWord);
          if (wordObj) break;
        }
        if (wordObj && wordObj.miniQuiz) {
          openWordMiniQuiz(wordObj);
        }
      });
    });
  }

  function openWordMiniQuiz(wordObj) {
    const mount = container.querySelector('#word-quiz-modal-mount');
    const mq = wordObj.miniQuiz;

    mount.innerHTML = `
      <div class="ha-modal-backdrop" id="word-quiz-backdrop">
        <div class="ha-modal-dialog" style="text-align: center;">
          <button class="modal-close-btn" id="wq-close-btn">&times;</button>
          
          <div style="font-size: 3rem; margin-bottom: 8px;">${wordObj.icon}</div>
          <span class="badge badge-gold" style="margin-bottom: 8px;">Mini Quiz: ${wordObj.word}</span>
          <h3 style="font-size: 1.25rem; color: var(--ha-navy); margin-bottom: 20px;">${mq.question}</h3>

          <div style="display: grid; grid-template-columns: 1fr; gap: 10px; margin-bottom: 20px;" id="wq-options-box">
            ${mq.options.map(opt => `
              <button class="quiz-option-btn wq-opt-btn" data-ans="${opt}">${opt}</button>
            `).join('')}
          </div>

          <div id="wq-feedback" style="display: none;" class="quiz-feedback-banner"></div>
        </div>
      </div>
    `;

    const backdrop = mount.querySelector('#word-quiz-backdrop');
    const closeBtn = mount.querySelector('#wq-close-btn');
    const feedback = mount.querySelector('#wq-feedback');

    closeBtn.addEventListener('click', () => mount.innerHTML = '');

    mount.querySelectorAll('.wq-opt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const chosen = btn.dataset.ans;
        const isCorrect = chosen === mq.correctAnswer;
        mount.querySelectorAll('.wq-opt-btn').forEach(b => b.disabled = true);

        if (isCorrect) {
          sound.playCorrect();
          btn.classList.add('correct');
          stateManager.addXP(10, 'vocab_quiz');
          stateManager.recordActivityStats('correctAnswers', 1);

          feedback.className = 'quiz-feedback-banner correct';
          feedback.textContent = getRandomFeedback(true) + ` "${mq.correctAnswer}" is correct! (+10 XP)`;
          feedback.style.display = 'block';

          setTimeout(() => {
            mount.innerHTML = '';
          }, 1500);
        } else {
          sound.playWrong();
          btn.classList.add('wrong');
          mount.querySelectorAll('.wq-opt-btn').forEach(b => {
            if (b.dataset.ans === mq.correctAnswer) b.classList.add('correct');
          });

          feedback.className = 'quiz-feedback-banner wrong';
          feedback.textContent = getRandomFeedback(false) + ` The correct answer is "${mq.correctAnswer}".`;
          feedback.style.display = 'block';

          setTimeout(() => {
            mount.innerHTML = '';
          }, 2000);
        }
      });
    });
  }

  render();
}