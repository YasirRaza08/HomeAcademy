// Home Academy Multi-Format Grammar Activities Hub
// Provides 6+ interactive formats for every active class topic taught by Sir Zubair:
// 1. Sentence Scramble / Arrange the Words
// 2. Pair Matching (Opposites, Ownership, Pronouns)
// 3. True or False Grammar Master
// 4. Sentence Builder (Construct sentences with chips)
// 5. Fill in the Blank & Sentence Completion
// 6. Picture & Context Quiz

import { stateManager } from '../state.js';
import { sound } from '../audio.js';
import { fireConfetti } from '../confetti.js';
import { TOPIC_ACTIVITIES, TOPIC_QUESTION_BANKS, shuffleArray } from '../data/topic-activities.js';
import { renderConceptVisual } from './creativeVisuals.js';
import { 
  puzzleIcon, refreshIcon, checkCircleIcon, pencilIcon, bookIcon, 
  checkIcon, trophyIcon, gamepadIcon, graduationCapIcon, infoIcon 
} from './icons.js';

export function renderActivitiesHub(container, onNavigate, initialTopicId = null, initialActivityType = null) {
  const student = stateManager.getCurrentStudent();
  const activeTopics = stateManager.getActiveCurriculum();

  let selectedTopicId = initialTopicId || (activeTopics.length > 0 ? activeTopics[0].id : 'adjectives');
  let currentActivity = initialActivityType || null; // 'scramble' | 'matching' | 'true_false' | 'builder' | 'fill' | 'picture'

  function render() {
    if (!currentActivity) {
      renderActivitySelector();
    } else {
      renderActivityRunner();
    }
  }

  // --- View 1: Activities Hub Selector ---
  function renderActivitySelector() {
    const topicData = TOPIC_ACTIVITIES[selectedTopicId] || TOPIC_ACTIVITIES.adjectives;
    const activeTopicObj = activeTopics.find(t => t.id === selectedTopicId) || activeTopics[0];

    container.innerHTML = `
      <div class="container" style="padding-top: 24px; padding-bottom: 60px; max-width: 900px;">
        
        <!-- Header -->
        <div style="text-align: center; margin-bottom: 28px;">
          <div style="display: flex; justify-content: center; gap: 8px; margin-bottom: 8px; flex-wrap: wrap;">
            <span class="badge badge-navy">Interactive Practice</span>
            <span class="badge badge-red">Sir Zubair's Class Activities</span>
          </div>
          <h1 style="font-size: 2.2rem; color: var(--ha-navy); margin-bottom: 8px;">Grammar Activities Hub</h1>
          <p style="font-size: 1.05rem; color: var(--ha-text-muted); max-width: 620px; margin: 0 auto 20px;">
            Choose a class topic and practice through <strong>matching pairs, sentence scrambles, true/false, and sentence building</strong>.
          </p>
        </div>

        <!-- Topic Selector Tabs -->
        <div style="margin-bottom: 28px;">
          <div style="font-size: 0.85rem; font-weight: 800; color: var(--ha-navy); text-transform: uppercase; margin-bottom: 10px; text-align: center;">
            Select Grammar Topic:
          </div>
          <div style="display: flex; justify-content: center; gap: 10px; flex-wrap: wrap;">
            ${activeTopics.map(t => {
              const isSelected = t.id === selectedTopicId;
              return `
                <button class="topic-filter-pill ${isSelected ? 'active' : ''}" data-topic-id="${t.id}"
                  style="padding: 9px 16px; border-radius: var(--radius-pill); font-size: 0.9rem; font-weight: 700; cursor: pointer; border: 2px solid ${isSelected ? t.color : 'var(--ha-border)'}; background: ${isSelected ? t.color : '#FFFFFF'}; color: ${isSelected ? '#FFFFFF' : 'var(--ha-navy)'}; transition: all 0.2s; display: flex; align-items: center; gap: 6px;">
                  <span>Topic ${t.number}: ${t.title}</span>
                </button>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Active Topic Summary Banner -->
        ${activeTopicObj ? `
          <div class="ha-card" style="border-left: 6px solid ${activeTopicObj.color}; padding: 18px 24px; margin-bottom: 28px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 14px;">
            <div style="display: flex; align-items: center; gap: 14px;">
              <div style="background: var(--ha-navy-subtle); width: 48px; height: 48px; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; color: ${activeTopicObj.color};">
                ${bookIcon(26)}
              </div>
              <div>
                <span style="font-size: 0.78rem; font-weight: 800; color: ${activeTopicObj.color}; text-transform: uppercase;">Active Topic Practice</span>
                <h2 style="font-size: 1.35rem; color: var(--ha-navy); margin: 0;">${activeTopicObj.title}</h2>
                <div style="font-size: 0.88rem; color: var(--ha-text-muted);">${activeTopicObj.subtitle}</div>
              </div>
            </div>
            <button class="btn btn-outline btn-sm" id="btn-open-topic-lesson" style="display: inline-flex; align-items: center; gap: 6px;">
              ${bookIcon(15)} Open Full Lesson
            </button>
          </div>
        ` : ''}

        <!-- 6 Interactive Activity Cards Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px; margin-bottom: 36px;">
          
          <!-- Activity 1: Sentence Scramble / Arrange the Words -->
          <div class="ha-card activity-select-card" data-activity="scramble" style="cursor: pointer; border-top: 5px solid #2563eb; transition: transform 0.2s, box-shadow 0.2s;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
              <div style="color: #2563eb; background: #EFF6FF; width: 48px; height: 48px; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center;">
                ${puzzleIcon(26)}
              </div>
              <span class="badge badge-navy">+25 XP</span>
            </div>
            <h3 style="font-size: 1.2rem; color: var(--ha-navy); margin-bottom: 6px;">Sentence Scramble</h3>
            <p style="font-size: 0.88rem; color: var(--ha-text-muted); line-height: 1.45; margin-bottom: 18px;">
              Arrange jumbled class words into correct grammatical sentences.
            </p>
            <button class="btn btn-primary btn-sm" style="width: 100%; background: #2563eb;">Play Scramble →</button>
          </div>

          <!-- Activity 2: Matching Pairs -->
          <div class="ha-card activity-select-card" data-activity="matching" style="cursor: pointer; border-top: 5px solid #059669; transition: transform 0.2s, box-shadow 0.2s;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
              <div style="color: #059669; background: #ECFDF5; width: 48px; height: 48px; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center;">
                ${refreshIcon(26)}
              </div>
              <span class="badge badge-success">+30 XP</span>
            </div>
            <h3 style="font-size: 1.2rem; color: var(--ha-navy); margin-bottom: 6px;">Grammar Matching</h3>
            <p style="font-size: 0.88rem; color: var(--ha-text-muted); line-height: 1.45; margin-bottom: 18px;">
              Tap and match opposites, ownerships, question targets, and pronouns.
            </p>
            <button class="btn btn-primary btn-sm" style="width: 100%; background: #059669;">Play Matching →</button>
          </div>

          <!-- Activity 3: True or False -->
          <div class="ha-card activity-select-card" data-activity="true_false" style="cursor: pointer; border-top: 5px solid #d97706; transition: transform 0.2s, box-shadow 0.2s;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
              <div style="color: #d97706; background: #FFFBEB; width: 48px; height: 48px; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center;">
                ${checkCircleIcon(26)}
              </div>
              <span class="badge badge-gold">+20 XP</span>
            </div>
            <h3 style="font-size: 1.2rem; color: var(--ha-navy); margin-bottom: 6px;">True or False</h3>
            <p style="font-size: 0.88rem; color: var(--ha-text-muted); line-height: 1.45; margin-bottom: 18px;">
              Test grammar rules and identify correct vs incorrect English forms.
            </p>
            <button class="btn btn-primary btn-sm" style="width: 100%; background: #d97706;">Play True or False →</button>
          </div>

          <!-- Activity 4: Sentence Builder -->
          <div class="ha-card activity-select-card" data-activity="builder" style="cursor: pointer; border-top: 5px solid #7c3aed; transition: transform 0.2s, box-shadow 0.2s;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
              <div style="color: #7c3aed; background: #F5F3FF; width: 48px; height: 48px; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center;">
                ${pencilIcon(26)}
              </div>
              <span class="badge badge-navy">+25 XP</span>
            </div>
            <h3 style="font-size: 1.2rem; color: var(--ha-navy); margin-bottom: 6px;">Sentence Builder</h3>
            <p style="font-size: 0.88rem; color: var(--ha-text-muted); line-height: 1.45; margin-bottom: 18px;">
              Assemble word chips in proper grammatical sequence to build sentences.
            </p>
            <button class="btn btn-primary btn-sm" style="width: 100%; background: #7c3aed;">Build Sentences →</button>
          </div>

          <!-- Activity 5: Fill in the Blank -->
          <div class="ha-card activity-select-card" data-activity="fill" style="cursor: pointer; border-top: 5px solid #0891b2; transition: transform 0.2s, box-shadow 0.2s;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
              <div style="color: #0891b2; background: #ECFEFF; width: 48px; height: 48px; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center;">
                ${bookIcon(26)}
              </div>
              <span class="badge badge-navy">+20 XP</span>
            </div>
            <h3 style="font-size: 1.2rem; color: var(--ha-navy); margin-bottom: 6px;">Complete the Sentence</h3>
            <p style="font-size: 0.88rem; color: var(--ha-text-muted); line-height: 1.45; margin-bottom: 18px;">
              Choose the missing adjective, question word, or possessive form.
            </p>
            <button class="btn btn-primary btn-sm" style="width: 100%; background: #0891b2;">Fill in the Blank →</button>
          </div>

          <!-- Activity 6: Choose Correct Sentence -->
          <div class="ha-card activity-select-card" data-activity="picture" style="cursor: pointer; border-top: 5px solid #dc2626; transition: transform 0.2s, box-shadow 0.2s;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
              <div style="color: #dc2626; background: #FEF2F2; width: 48px; height: 48px; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center;">
                ${checkIcon(26)}
              </div>
              <span class="badge badge-red">+20 XP</span>
            </div>
            <h3 style="font-size: 1.2rem; color: var(--ha-navy); margin-bottom: 6px;">Choose Correct Sentence</h3>
            <p style="font-size: 0.88rem; color: var(--ha-text-muted); line-height: 1.45; margin-bottom: 18px;">
              Identify the 100% grammatically correct sentence from the options.
            </p>
            <button class="btn btn-primary btn-sm" style="width: 100%; background: #dc2626;">Choose Sentence →</button>
          </div>

        </div>

        <!-- Full Grammar Test Callout Banner -->
        <div style="background: linear-gradient(135deg, #0A2558 0%, #163B7C 100%); color: #FFFFFF; border-radius: var(--radius-xl); padding: 24px 28px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px;">
          <div>
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
              <span class="badge badge-gold">Mastery Exam</span>
              <span style="font-size: 0.8rem; color: #E2E8F0;">Combined 6 Topics</span>
            </div>
            <h3 style="font-size: 1.35rem; color: #FFFFFF; margin: 0 0 4px;">Ready to test all grammar topics together?</h3>
            <p style="font-size: 0.88rem; color: #CBD5E1; margin: 0;">
              Take the Full Grammar Test with fresh questions every attempt. Earn +75 XP!
            </p>
          </div>
          <button class="btn btn-accent btn-lg" id="btn-hub-goto-fulltest" style="display: inline-flex; align-items: center; gap: 8px;">
            ${graduationCapIcon(18)} Take Full Grammar Test
          </button>
        </div>

      </div>
    `;

    // Event listeners
    container.querySelectorAll('.topic-filter-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        sound.playClick();
        selectedTopicId = btn.dataset.topicId;
        render();
      });
    });

    container.querySelectorAll('.activity-select-card').forEach(card => {
      card.addEventListener('click', () => {
        sound.playClick();
        currentActivity = card.dataset.activity;
        render();
        window.scrollTo(0, 0);
      });
    });

    container.querySelector('#btn-open-topic-lesson')?.addEventListener('click', () => {
      sound.playClick();
      if (onNavigate) {
        window.dispatchEvent(new CustomEvent('ha:open-topic', { detail: selectedTopicId }));
      }
    });

    container.querySelector('#btn-hub-goto-fulltest')?.addEventListener('click', () => {
      sound.playClick();
      if (onNavigate) onNavigate('full-test');
    });
  }

  // --- View 2: Interactive Activity Runner ---
  function renderActivityRunner() {
    const topicData = TOPIC_ACTIVITIES[selectedTopicId] || TOPIC_ACTIVITIES.adjectives;
    const activeTopicObj = activeTopics.find(t => t.id === selectedTopicId) || activeTopics[0];

    switch (currentActivity) {
      case 'scramble':
        runSentenceScramble(topicData, activeTopicObj);
        break;
      case 'matching':
        runMatchingPairs(topicData, activeTopicObj);
        break;
      case 'true_false':
        runTrueFalse(topicData, activeTopicObj);
        break;
      case 'builder':
        runSentenceBuilder(topicData, activeTopicObj);
        break;
      case 'fill':
        runFillInBlank(activeTopicObj);
        break;
      case 'picture':
        runChooseCorrectSentence(activeTopicObj);
        break;
      default:
        currentActivity = null;
        render();
    }
  }

  // Activity Runner 1: Sentence Scramble / Arrange the Words
  function runSentenceScramble(topicData, topicObj) {
    const scrambles = topicData.scrambles || [];
    if (scrambles.length === 0) {
      currentActivity = null;
      render();
      return;
    }

    let currentIndex = 0;
    let earnedXP = 0;

    function renderItem() {
      if (currentIndex >= scrambles.length) {
        // Complete!
        sound.playLevelUp();
        fireConfetti(3000);
        stateManager.recordActivityCompletion(topicObj.id, 'scramble', 25);

        renderCompletionView(
          puzzleIcon(64),
          'Sentence Scramble Master!',
          `You successfully arranged all sentences for <strong>${topicObj.title}</strong>!`,
          25
        );
        return;
      }

      const item = scrambles[currentIndex];
      const targetTokens = [...item.words];
      const cleanAnswer = item.answer.replace(/[.?]/g, '').trim();
      let availableTokens = shuffleArray([...targetTokens]).map((word, idx) => ({ id: idx, text: word, placed: false }));
      let assembledTokens = [];

      container.innerHTML = `
        <div class="container" style="padding-top: 24px; padding-bottom: 60px; max-width: 760px;">
          
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 10px;">
            <button class="btn btn-outline btn-sm" id="btn-runner-back">← Back to Activities</button>
            <div style="display: flex; gap: 8px; align-items: center;">
              <span class="badge" style="background: ${topicObj.color}; color: #FFF;">${topicObj.title}</span>
              <span class="badge badge-navy">Scramble ${currentIndex + 1} of ${scrambles.length}</span>
            </div>
          </div>

          <div class="ha-card topic-master-card" style="border-top: 5px solid ${topicObj.color}; text-align: center; padding: 32px 24px;">
            <div style="font-size: 0.85rem; font-weight: 800; color: ${topicObj.color}; text-transform: uppercase; margin-bottom: 6px;">
              Arrange the Words in Order
            </div>

            ${renderConceptVisual(topicObj.id, { question: item.answer })}

            <h2 style="font-size: 1.4rem; color: var(--ha-navy); margin-bottom: 8px;">
              Tap words in correct English order:
            </h2>
            <p style="font-size: 0.88rem; color: var(--ha-text-muted); margin-bottom: 24px;">
              Click each word chip to place it in the sentence slot below.
            </p>

            <!-- Target Slot -->
            <div id="scramble-target-zone" style="min-height: 64px; background: #F8FAFC; border: 2px dashed var(--ha-border); border-radius: var(--radius-lg); padding: 12px; margin-bottom: 20px; display: flex; align-items: center; justify-content: center; gap: 8px; flex-wrap: wrap;">
              <span id="target-placeholder" style="color: var(--ha-text-muted); font-size: 0.92rem; font-style: italic;">
                Tap words below to build the sentence
              </span>
            </div>

            <!-- Chips Bank -->
            <div id="scramble-chips-bank" style="display: flex; justify-content: center; gap: 10px; flex-wrap: wrap; margin-bottom: 24px;">
              ${availableTokens.map(tok => `
                <button class="word-chip-btn" data-id="${tok.id}" data-word="${tok.text}"
                  style="padding: 10px 18px; border-radius: var(--radius-pill); font-size: 1rem; font-weight: 700; background: #FFFFFF; border: 2px solid var(--ha-border); color: var(--ha-navy); cursor: pointer; transition: all 0.15s; box-shadow: var(--ha-shadow-sm);">
                  ${tok.text}
                </button>
              `).join('')}
            </div>

            <!-- Feedback Message -->
            <div id="scramble-feedback" style="display: none; padding: 12px; border-radius: var(--radius-md); margin-bottom: 20px; font-weight: 700;"></div>

            <!-- Action Controls -->
            <div style="display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;">
              <button class="btn btn-outline" id="btn-reset-scramble">Reset</button>
              <button class="btn btn-primary" id="btn-check-scramble" style="background: ${topicObj.color};" disabled>Check Sentence</button>
              <button class="btn btn-secondary" id="btn-next-scramble" style="display: none;">Next Sentence →</button>
            </div>
          </div>

        </div>
      `;

      container.querySelector('#btn-runner-back')?.addEventListener('click', () => {
        sound.playClick();
        currentActivity = null;
        render();
      });

      const targetZone = container.querySelector('#scramble-target-zone');
      const placeholder = container.querySelector('#target-placeholder');
      const bank = container.querySelector('#scramble-chips-bank');
      const checkBtn = container.querySelector('#btn-check-scramble');
      const resetBtn = container.querySelector('#btn-reset-scramble');
      const nextBtn = container.querySelector('#btn-next-scramble');
      const feedback = container.querySelector('#scramble-feedback');

      function updateTargetUI() {
        if (assembledTokens.length === 0) {
          if (placeholder) placeholder.style.display = 'inline';
          targetZone.querySelectorAll('.placed-chip-btn').forEach(el => el.remove());
          checkBtn.disabled = true;
          return;
        }

        if (placeholder) placeholder.style.display = 'none';
        targetZone.innerHTML = '';
        assembledTokens.forEach((tok, idx) => {
          const btn = document.createElement('button');
          btn.className = 'placed-chip-btn';
          btn.textContent = tok.text;
          btn.style.cssText = 'padding: 8px 16px; border-radius: var(--radius-pill); font-size: 1rem; font-weight: 700; background: var(--ha-navy); color: #FFF; border: none; cursor: pointer;';
          btn.title = 'Click to remove';
          btn.addEventListener('click', () => {
            sound.playClick();
            assembledTokens.splice(idx, 1);
            const bankBtn = bank.querySelector(`[data-id="${tok.id}"]`);
            if (bankBtn) bankBtn.style.visibility = 'visible';
            updateTargetUI();
          });
          targetZone.appendChild(btn);
        });

        checkBtn.disabled = assembledTokens.length !== availableTokens.length;
      }

      bank.querySelectorAll('.word-chip-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          sound.playClick();
          const id = parseInt(btn.dataset.id);
          const word = btn.dataset.word;
          btn.style.visibility = 'hidden';
          assembledTokens.push({ id, text: word });
          updateTargetUI();
        });
      });

      resetBtn?.addEventListener('click', () => {
        sound.playClick();
        assembledTokens = [];
        bank.querySelectorAll('.word-chip-btn').forEach(btn => btn.style.visibility = 'visible');
        feedback.style.display = 'none';
        updateTargetUI();
      });

      checkBtn?.addEventListener('click', () => {
        const studentSentence = assembledTokens.map(t => t.text).join(' ');
        const isCorrect = studentSentence.toLowerCase() === cleanAnswer.toLowerCase() ||
          studentSentence.toLowerCase() + '.' === item.answer.toLowerCase() ||
          studentSentence.toLowerCase() + '?' === item.answer.toLowerCase();

        if (isCorrect) {
          sound.playCorrect();
          feedback.style.display = 'block';
          feedback.style.background = 'var(--ha-success-bg)';
          feedback.style.color = '#065F46';
          feedback.style.border = '1px solid var(--ha-success)';
          feedback.innerHTML = `<span style="display: inline-flex; align-items: center; gap: 6px;">${checkCircleIcon(18)} Correct! <strong>"${item.answer}"</strong></span>`;
          checkBtn.style.display = 'none';
          resetBtn.style.display = 'none';
          nextBtn.style.display = 'inline-flex';
        } else {
          sound.playWrong();
          feedback.style.display = 'block';
          feedback.style.background = 'var(--ha-red-light)';
          feedback.style.color = '#991B1B';
          feedback.style.border = '1px solid var(--ha-red)';
          feedback.innerHTML = `<span style="display: inline-flex; align-items: center; gap: 6px;">${infoIcon(18)} Not quite in order! Try resetting and listening to the word flow.</span>`;
        }
      });

      nextBtn?.addEventListener('click', () => {
        sound.playClick();
        currentIndex++;
        renderItem();
      });
    }

    renderItem();
  }

  // Activity Runner 2: Matching Pairs
  function runMatchingPairs(topicData, topicObj) {
    const rawPairs = topicData.matching || [];
    if (rawPairs.length === 0) {
      currentActivity = null;
      render();
      return;
    }

    // Take up to 5 pairs for clean display
    const selectedPairs = rawPairs.slice(0, 5);
    const leftItems = selectedPairs.map((p, idx) => ({ id: idx, text: p.left, matched: false }));
    const rightItems = shuffleArray(selectedPairs.map((p, idx) => ({ id: idx, text: p.right, matched: false })));

    let selectedLeftId = null;
    let selectedRightId = null;
    let matchedCount = 0;

    container.innerHTML = `
      <div class="container" style="padding-top: 24px; padding-bottom: 60px; max-width: 820px;">
        
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 10px;">
          <button class="btn btn-outline btn-sm" id="btn-matching-back">← Back to Activities</button>
          <div style="display: flex; gap: 8px; align-items: center;">
            <span class="badge" style="background: ${topicObj.color}; color: #FFF;">${topicObj.title}</span>
            <span class="badge badge-success" id="match-counter-badge">Matched: 0 / ${selectedPairs.length}</span>
          </div>
        </div>

        <div class="ha-card topic-master-card" style="border-top: 5px solid #059669; padding: 32px 24px;">
          <div style="text-align: center; margin-bottom: 24px;">
            <div style="font-size: 0.85rem; font-weight: 800; color: #059669; text-transform: uppercase; margin-bottom: 4px;">
              Grammar Pair Matching
            </div>
            <h2 style="font-size: 1.45rem; color: var(--ha-navy); margin-bottom: 6px;">
              Tap one item on the left, then tap its match on the right!
            </h2>
            <p style="font-size: 0.88rem; color: var(--ha-text-muted);">
              Practice connecting grammar concepts, ownerships, and vocabulary.
            </p>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 24px;">
            <!-- Left Column -->
            <div style="display: flex; flex-direction: column; gap: 12px;" id="left-column">
              ${leftItems.map(item => `
                <button class="match-item-btn match-left" data-id="${item.id}"
                  style="padding: 16px 18px; border-radius: var(--radius-md); font-size: 1.05rem; font-weight: 700; background: #FFFFFF; border: 2px solid var(--ha-border); color: var(--ha-navy); text-align: center; cursor: pointer; transition: all 0.15s;">
                  ${item.text}
                </button>
              `).join('')}
            </div>

            <!-- Right Column -->
            <div style="display: flex; flex-direction: column; gap: 12px;" id="right-column">
              ${rightItems.map(item => `
                <button class="match-item-btn match-right" data-id="${item.id}"
                  style="padding: 16px 18px; border-radius: var(--radius-md); font-size: 1.05rem; font-weight: 700; background: #FFFFFF; border: 2px solid var(--ha-border); color: var(--ha-navy); text-align: center; cursor: pointer; transition: all 0.15s;">
                  ${item.text}
                </button>
              `).join('')}
            </div>
          </div>

          <div id="matching-feedback" style="display: none; text-align: center; padding: 14px; border-radius: var(--radius-md); font-weight: 700;"></div>
        </div>

      </div>
    `;

    container.querySelector('#btn-matching-back')?.addEventListener('click', () => {
      sound.playClick();
      currentActivity = null;
      render();
    });

    const leftBtns = container.querySelectorAll('.match-left');
    const rightBtns = container.querySelectorAll('.match-right');
    const counterBadge = container.querySelector('#match-counter-badge');
    const feedback = container.querySelector('#matching-feedback');

    function checkPair() {
      if (selectedLeftId !== null && selectedRightId !== null) {
        if (selectedLeftId === selectedRightId) {
          // Correct Match!
          sound.playCorrect();
          const lBtn = container.querySelector(`.match-left[data-id="${selectedLeftId}"]`);
          const rBtn = container.querySelector(`.match-right[data-id="${selectedRightId}"]`);

          if (lBtn && rBtn) {
            lBtn.style.background = 'var(--ha-success-bg)';
            lBtn.style.borderColor = 'var(--ha-success)';
            lBtn.style.color = '#065F46';
            lBtn.disabled = true;

            rBtn.style.background = 'var(--ha-success-bg)';
            rBtn.style.borderColor = 'var(--ha-success)';
            rBtn.style.color = '#065F46';
            rBtn.disabled = true;
          }

          matchedCount++;
          if (counterBadge) counterBadge.textContent = `Matched: ${matchedCount} / ${selectedPairs.length}`;

          selectedLeftId = null;
          selectedRightId = null;

          if (matchedCount >= selectedPairs.length) {
            sound.playLevelUp();
            fireConfetti(3000);
            stateManager.recordActivityCompletion(topicObj.id, 'matching', 30);
            setTimeout(() => {
              renderCompletionView(
                refreshIcon(64),
                'Pair Matching Complete!',
                `You matched all grammar pairs for <strong>${topicObj.title}</strong>!`,
                30
              );
            }, 600);
          }
        } else {
          // Wrong Match
          sound.playWrong();
          const lBtn = container.querySelector(`.match-left[data-id="${selectedLeftId}"]`);
          const rBtn = container.querySelector(`.match-right[data-id="${selectedRightId}"]`);

          if (lBtn) lBtn.style.borderColor = 'var(--ha-red)';
          if (rBtn) rBtn.style.borderColor = 'var(--ha-red)';

          setTimeout(() => {
            if (lBtn && !lBtn.disabled) lBtn.style.borderColor = 'var(--ha-border)';
            if (rBtn && !rBtn.disabled) rBtn.style.borderColor = 'var(--ha-border)';
            selectedLeftId = null;
            selectedRightId = null;
          }, 600);
        }
      }
    }

    leftBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        sound.playClick();
        leftBtns.forEach(b => {
          if (!b.disabled) b.style.borderColor = 'var(--ha-border)';
        });
        btn.style.borderColor = '#2563eb';
        btn.style.background = '#EFF6FF';
        selectedLeftId = parseInt(btn.dataset.id);
        checkPair();
      });
    });

    rightBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        sound.playClick();
        rightBtns.forEach(b => {
          if (!b.disabled) b.style.borderColor = 'var(--ha-border)';
        });
        btn.style.borderColor = '#2563eb';
        btn.style.background = '#EFF6FF';
        selectedRightId = parseInt(btn.dataset.id);
        checkPair();
      });
    });
  }

  // Activity Runner 3: True or False
  function runTrueFalse(topicData, topicObj) {
    const items = topicData.trueFalse || [];
    if (items.length === 0) {
      currentActivity = null;
      render();
      return;
    }

    let currentIndex = 0;
    let correctCount = 0;

    function renderItem() {
      if (currentIndex >= items.length) {
        sound.playLevelUp();
        fireConfetti(3000);
        stateManager.recordActivityCompletion(topicObj.id, 'true_false', 20);

        renderCompletionView(
          checkCircleIcon(64),
          'True or False Master!',
          `You answered ${correctCount} of ${items.length} questions correctly on <strong>${topicObj.title}</strong>!`,
          20
        );
        return;
      }

      const item = items[currentIndex];

      container.innerHTML = `
        <div class="container" style="padding-top: 24px; padding-bottom: 60px; max-width: 760px;">
          
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 10px;">
            <button class="btn btn-outline btn-sm" id="btn-tf-back">← Back to Activities</button>
            <div style="display: flex; gap: 8px; align-items: center;">
              <span class="badge" style="background: ${topicObj.color}; color: #FFF;">${topicObj.title}</span>
              <span class="badge badge-gold">Question ${currentIndex + 1} of ${items.length}</span>
            </div>
          </div>

          <div class="ha-card topic-master-card" style="border-top: 5px solid #d97706; text-align: center; padding: 36px 28px;">
            <div style="font-size: 0.85rem; font-weight: 800; color: #d97706; text-transform: uppercase; margin-bottom: 8px;">
              Grammar Rule Challenge
            </div>
            
            <div style="background: #F8FAFC; border: 2px solid var(--ha-border); border-radius: var(--radius-lg); padding: 24px; margin-bottom: 28px;">
              <p style="font-size: 1.35rem; color: var(--ha-navy); font-weight: 700; line-height: 1.45; margin: 0;">
                “${item.statement}”
              </p>
            </div>

            <!-- Big True / False Buttons -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px;">
              <button class="btn-tf-choice" data-choice="true"
                style="padding: 20px; font-size: 1.25rem; font-weight: 800; border-radius: var(--radius-lg); border: 2px solid var(--ha-success); background: #FFFFFF; color: var(--ha-success); cursor: pointer; transition: all 0.15s; display: flex; align-items: center; justify-content: center; gap: 8px;">
                <span style="font-size: 1.6rem;">✓</span> TRUE
              </button>

              <button class="btn-tf-choice" data-choice="false"
                style="padding: 20px; font-size: 1.25rem; font-weight: 800; border-radius: var(--radius-lg); border: 2px solid var(--ha-red); background: #FFFFFF; color: var(--ha-red); cursor: pointer; transition: all 0.15s; display: flex; align-items: center; justify-content: center; gap: 8px;">
                <span style="font-size: 1.6rem;">✗</span> FALSE
              </button>
            </div>

            <!-- Feedback & Explanation Box -->
            <div id="tf-feedback-box" style="display: none; padding: 18px; border-radius: var(--radius-md); text-align: left; margin-bottom: 24px;">
              <div id="tf-feedback-title" style="font-size: 1.1rem; font-weight: 800; margin-bottom: 6px;"></div>
              <div id="tf-feedback-explanation" style="font-size: 0.92rem; line-height: 1.5;"></div>
            </div>

            <div style="display: flex; justify-content: flex-end;">
              <button class="btn btn-primary btn-lg" id="btn-next-tf" style="display: none; background: #d97706;">
                Next Statement →
              </button>
            </div>
          </div>

        </div>
      `;

      container.querySelector('#btn-tf-back')?.addEventListener('click', () => {
        sound.playClick();
        currentActivity = null;
        render();
      });

      const tfButtons = container.querySelectorAll('.btn-tf-choice');
      const feedbackBox = container.querySelector('#tf-feedback-box');
      const feedbackTitle = container.querySelector('#tf-feedback-title');
      const feedbackExpl = container.querySelector('#tf-feedback-explanation');
      const nextBtn = container.querySelector('#btn-next-tf');

      tfButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          tfButtons.forEach(b => b.disabled = true);
          const chosenBool = btn.dataset.choice === 'true';
          const isCorrect = chosenBool === item.isTrue;

          if (isCorrect) {
            correctCount++;
            sound.playCorrect();
            btn.style.background = 'var(--ha-success-bg)';
            feedbackBox.style.background = 'var(--ha-success-bg)';
            feedbackBox.style.color = '#065F46';
            feedbackBox.style.border = '1.5px solid var(--ha-success)';
            feedbackTitle.innerHTML = `<span style="display: inline-flex; align-items: center; gap: 6px;">${checkCircleIcon(18)} That is correct!</span>`;
          } else {
            sound.playWrong();
            btn.style.background = 'var(--ha-red-light)';
            feedbackBox.style.background = 'var(--ha-red-light)';
            feedbackBox.style.color = '#991B1B';
            feedbackBox.style.border = '1.5px solid var(--ha-red)';
            feedbackTitle.innerHTML = `<span style="display: inline-flex; align-items: center; gap: 6px;">${infoIcon(18)} Incorrect (It is actually ${item.isTrue ? 'TRUE' : 'FALSE'})</span>`;
          }

          feedbackExpl.textContent = item.explanation || '';
          feedbackBox.style.display = 'block';
          nextBtn.style.display = 'inline-flex';
        });
      });

      nextBtn?.addEventListener('click', () => {
        sound.playClick();
        currentIndex++;
        renderItem();
      });
    }

    renderItem();
  }

  // Activity Runner 4: Sentence Builder
  function runSentenceBuilder(topicData, topicObj) {
    const items = topicData.sentenceBuilder || [];
    if (items.length === 0) {
      currentActivity = null;
      render();
      return;
    }

    let currentIndex = 0;

    function renderItem() {
      if (currentIndex >= items.length) {
        sound.playLevelUp();
        fireConfetti(3000);
        stateManager.recordActivityCompletion(topicObj.id, 'builder', 25);

        renderCompletionView(
          pencilIcon(64),
          'Sentence Builder Champion!',
          `You assembled all sentences successfully for <strong>${topicObj.title}</strong>!`,
          25
        );
        return;
      }

      const item = items[currentIndex];
      const targetTokens = [...item.chips];
      let availableTokens = shuffleArray([...targetTokens]).map((tok, idx) => ({ id: idx, text: tok }));
      let assembledTokens = [];

      container.innerHTML = `
        <div class="container" style="padding-top: 24px; padding-bottom: 60px; max-width: 760px;">
          
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 10px;">
            <button class="btn btn-outline btn-sm" id="btn-builder-back">← Back to Activities</button>
            <div style="display: flex; gap: 8px; align-items: center;">
              <span class="badge" style="background: ${topicObj.color}; color: #FFF;">${topicObj.title}</span>
              <span class="badge badge-navy">Exercise ${currentIndex + 1} of ${items.length}</span>
            </div>
          </div>

          <div class="ha-card topic-master-card" style="border-top: 5px solid #7c3aed; text-align: center; padding: 32px 24px;">
            <div style="font-size: 0.85rem; font-weight: 800; color: #7c3aed; text-transform: uppercase; margin-bottom: 6px;">
              Sentence Builder
            </div>

            ${renderConceptVisual(topicObj.id, { question: item.prompt })}

            <h2 style="font-size: 1.35rem; color: var(--ha-navy); margin-bottom: 8px;">
              ${item.prompt}
            </h2>

            <!-- Slot Zone -->
            <div id="builder-slot-zone" style="min-height: 64px; background: #F8FAFC; border: 2px dashed var(--ha-border); border-radius: var(--radius-lg); padding: 12px; margin-bottom: 20px; display: flex; align-items: center; justify-content: center; gap: 8px; flex-wrap: wrap;">
              <span id="builder-placeholder" style="color: var(--ha-text-muted); font-size: 0.92rem; font-style: italic;">
                Tap chips below in proper grammatical sequence
              </span>
            </div>

            <!-- Chips -->
            <div id="builder-chips-bank" style="display: flex; justify-content: center; gap: 10px; flex-wrap: wrap; margin-bottom: 24px;">
              ${availableTokens.map(tok => `
                <button class="builder-chip-btn" data-id="${tok.id}" data-text="${tok.text}"
                  style="padding: 10px 18px; border-radius: var(--radius-pill); font-size: 1rem; font-weight: 700; background: #FFFFFF; border: 2px solid var(--ha-border); color: var(--ha-navy); cursor: pointer; transition: all 0.15s; box-shadow: var(--ha-shadow-sm);">
                  ${tok.text}
                </button>
              `).join('')}
            </div>

            <div id="builder-feedback" style="display: none; padding: 12px; border-radius: var(--radius-md); margin-bottom: 20px; font-weight: 700;"></div>

            <div style="display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;">
              <button class="btn btn-outline" id="btn-builder-reset">Reset</button>
              <button class="btn btn-primary" id="btn-builder-check" style="background: #7c3aed;" disabled>Check Sentence</button>
              <button class="btn btn-secondary" id="btn-builder-next" style="display: none;">Next Exercise →</button>
            </div>
          </div>

        </div>
      `;

      container.querySelector('#btn-builder-back')?.addEventListener('click', () => {
        sound.playClick();
        currentActivity = null;
        render();
      });

      const slotZone = container.querySelector('#builder-slot-zone');
      const placeholder = container.querySelector('#builder-placeholder');
      const bank = container.querySelector('#builder-chips-bank');
      const checkBtn = container.querySelector('#btn-builder-check');
      const resetBtn = container.querySelector('#btn-builder-reset');
      const nextBtn = container.querySelector('#btn-builder-next');
      const feedback = container.querySelector('#builder-feedback');

      function updateSlotUI() {
        if (assembledTokens.length === 0) {
          if (placeholder) placeholder.style.display = 'inline';
          slotZone.querySelectorAll('.builder-placed-chip').forEach(el => el.remove());
          checkBtn.disabled = true;
          return;
        }

        if (placeholder) placeholder.style.display = 'none';
        slotZone.innerHTML = '';
        assembledTokens.forEach((tok, idx) => {
          const btn = document.createElement('button');
          btn.className = 'builder-placed-chip';
          btn.textContent = tok.text;
          btn.style.cssText = 'padding: 8px 16px; border-radius: var(--radius-pill); font-size: 1rem; font-weight: 700; background: #7c3aed; color: #FFF; border: none; cursor: pointer;';
          btn.title = 'Click to remove';
          btn.addEventListener('click', () => {
            sound.playClick();
            assembledTokens.splice(idx, 1);
            const bankBtn = bank.querySelector(`[data-id="${tok.id}"]`);
            if (bankBtn) bankBtn.style.visibility = 'visible';
            updateSlotUI();
          });
          slotZone.appendChild(btn);
        });

        checkBtn.disabled = assembledTokens.length !== availableTokens.length;
      }

      bank.querySelectorAll('.builder-chip-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          sound.playClick();
          const id = parseInt(btn.dataset.id);
          const text = btn.dataset.text;
          btn.style.visibility = 'hidden';
          assembledTokens.push({ id, text });
          updateSlotUI();
        });
      });

      resetBtn?.addEventListener('click', () => {
        sound.playClick();
        assembledTokens = [];
        bank.querySelectorAll('.builder-chip-btn').forEach(b => b.style.visibility = 'visible');
        feedback.style.display = 'none';
        updateSlotUI();
      });

      checkBtn?.addEventListener('click', () => {
        const studentSentence = assembledTokens.map(t => t.text).join(' ');
        const isCorrect = studentSentence.trim() === item.correct.trim();

        if (isCorrect) {
          sound.playCorrect();
          feedback.style.display = 'block';
          feedback.style.background = 'var(--ha-success-bg)';
          feedback.style.color = '#065F46';
          feedback.style.border = '1px solid var(--ha-success)';
          feedback.innerHTML = `<span style="display: inline-flex; align-items: center; gap: 6px;">${checkCircleIcon(18)} Correct sentence constructed!</span>`;
          checkBtn.style.display = 'none';
          resetBtn.style.display = 'none';
          nextBtn.style.display = 'inline-flex';
        } else {
          sound.playWrong();
          feedback.style.display = 'block';
          feedback.style.background = 'var(--ha-red-light)';
          feedback.style.color = '#991B1B';
          feedback.style.border = '1px solid var(--ha-red)';
          feedback.innerHTML = `<span style="display: inline-flex; align-items: center; gap: 6px;">${infoIcon(18)} Words are not in standard English order. Try again!</span>`;
        }
      });

      nextBtn?.addEventListener('click', () => {
        sound.playClick();
        currentIndex++;
        renderItem();
      });
    }

    renderItem();
  }

  // Activity Runner 5: Fill in the Blank / Complete Sentence
  function runFillInBlank(topicObj) {
    const bank = TOPIC_QUESTION_BANKS[topicObj.id] || [];
    const fillQuestions = bank.filter(q => q.type === 'fill' || q.question.includes('_____'));
    const pool = fillQuestions.length > 0 ? fillQuestions : bank.slice(0, 4);

    let currentIndex = 0;
    let correctCount = 0;

    function renderItem() {
      if (currentIndex >= pool.length) {
        sound.playLevelUp();
        fireConfetti(3000);
        stateManager.recordActivityCompletion(topicObj.id, 'fill', 20);

        renderCompletionView(
          bookIcon(64),
          'Fill in the Blank Complete!',
          `You completed all sentence exercises for <strong>${topicObj.title}</strong>!`,
          20
        );
        return;
      }

      const q = pool[currentIndex];

      container.innerHTML = `
        <div class="container" style="padding-top: 24px; padding-bottom: 60px; max-width: 760px;">
          
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 10px;">
            <button class="btn btn-outline btn-sm" id="btn-fill-back">← Back to Activities</button>
            <div style="display: flex; gap: 8px; align-items: center;">
              <span class="badge" style="background: ${topicObj.color}; color: #FFF;">${topicObj.title}</span>
              <span class="badge badge-navy">Sentence ${currentIndex + 1} of ${pool.length}</span>
            </div>
          </div>

          <div class="ha-card topic-master-card" style="border-top: 5px solid #0891b2; padding: 32px 24px;">
            <div style="font-size: 0.85rem; font-weight: 800; color: #0891b2; text-transform: uppercase; margin-bottom: 6px;">
              Complete the Sentence
            </div>

            ${renderConceptVisual(topicObj.id, q)}

            <h2 style="font-size: 1.4rem; color: var(--ha-navy); margin-bottom: 24px; line-height: 1.4;">
              ${q.question}
            </h2>

            <div style="display: grid; grid-template-columns: 1fr; gap: 12px; margin-bottom: 24px;" id="fill-options-grid">
              ${(q.options || []).map((opt, idx) => `
                <button class="fill-opt-btn" data-index="${idx}" data-text="${opt}"
                  style="padding: 14px 20px; font-size: 1rem; font-weight: 700; color: var(--ha-navy); background: #FFFFFF; border: 2px solid var(--ha-border); border-radius: var(--radius-md); text-align: left; cursor: pointer; transition: all 0.15s;">
                  <span style="display: inline-block; width: 28px; height: 28px; line-height: 28px; text-align: center; border-radius: var(--radius-pill); background: var(--ha-navy-subtle); margin-right: 12px; font-size: 0.85rem;">${String.fromCharCode(65 + idx)}</span>
                  ${opt}
                </button>
              `).join('')}
            </div>

            <div id="fill-feedback-box" style="display: none; padding: 14px; border-radius: var(--radius-md); margin-bottom: 20px;">
              <div id="fill-feedback-title" style="font-weight: 800; margin-bottom: 4px;"></div>
              <div id="fill-feedback-text" style="font-size: 0.9rem;"></div>
            </div>

            <div style="display: flex; justify-content: flex-end;">
              <button class="btn btn-primary" id="btn-next-fill" style="display: none; background: #0891b2;">
                Next Sentence →
              </button>
            </div>
          </div>

        </div>
      `;

      container.querySelector('#btn-fill-back')?.addEventListener('click', () => {
        sound.playClick();
        currentActivity = null;
        render();
      });

      const optButtons = container.querySelectorAll('.fill-opt-btn');
      const feedbackBox = container.querySelector('#fill-feedback-box');
      const feedbackTitle = container.querySelector('#fill-feedback-title');
      const feedbackText = container.querySelector('#fill-feedback-text');
      const nextBtn = container.querySelector('#btn-next-fill');

      optButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          optButtons.forEach(b => b.disabled = true);
          const chosenIdx = parseInt(btn.dataset.index);
          const isCorrect = chosenIdx === q.answer;

          if (isCorrect) {
            correctCount++;
            sound.playCorrect();
            btn.style.borderColor = 'var(--ha-success)';
            btn.style.background = 'var(--ha-success-bg)';
            btn.style.color = 'var(--ha-success)';
            feedbackBox.style.background = 'var(--ha-success-bg)';
            feedbackBox.style.color = '#065F46';
            feedbackBox.style.border = '1px solid var(--ha-success)';
            feedbackTitle.innerHTML = `<span style="display: inline-flex; align-items: center; gap: 6px;">${checkCircleIcon(18)} Correct!</span>`;
          } else {
            sound.playWrong();
            btn.style.borderColor = 'var(--ha-red)';
            btn.style.background = 'var(--ha-red-light)';
            btn.style.color = 'var(--ha-red)';
            feedbackBox.style.background = 'var(--ha-red-light)';
            feedbackBox.style.color = '#991B1B';
            feedbackBox.style.border = '1px solid var(--ha-red)';
            feedbackTitle.innerHTML = `<span style="display: inline-flex; align-items: center; gap: 6px;">${infoIcon(18)} Incorrect (Correct: "${q.options[q.answer]}")</span>`;
          }

          feedbackText.textContent = q.explanation || '';
          feedbackBox.style.display = 'block';
          nextBtn.style.display = 'inline-flex';
        });
      });

      nextBtn?.addEventListener('click', () => {
        sound.playClick();
        currentIndex++;
        renderItem();
      });
    }

    renderItem();
  }

  // Activity Runner 6: Choose Correct Sentence
  function runChooseCorrectSentence(topicObj) {
    const bank = TOPIC_QUESTION_BANKS[topicObj.id] || [];
    const chooseQuestions = bank.filter(q => q.type === 'choose_sentence');
    const pool = chooseQuestions.length > 0 ? chooseQuestions : bank.slice(0, 4);

    let currentIndex = 0;
    let correctCount = 0;

    function renderItem() {
      if (currentIndex >= pool.length) {
        sound.playLevelUp();
        fireConfetti(3000);
        stateManager.recordActivityCompletion(topicObj.id, 'picture', 20);

        renderCompletionView(
          checkIcon(64),
          'Sentence Master!',
          `You selected the correct sentences for <strong>${topicObj.title}</strong>!`,
          20
        );
        return;
      }

      const q = pool[currentIndex];

      container.innerHTML = `
        <div class="container" style="padding-top: 24px; padding-bottom: 60px; max-width: 760px;">
          
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 10px;">
            <button class="btn btn-outline btn-sm" id="btn-choose-back">← Back to Activities</button>
            <div style="display: flex; gap: 8px; align-items: center;">
              <span class="badge" style="background: ${topicObj.color}; color: #FFF;">${topicObj.title}</span>
              <span class="badge badge-red">Question ${currentIndex + 1} of ${pool.length}</span>
            </div>
          </div>

          <div class="ha-card topic-master-card" style="border-top: 5px solid #dc2626; padding: 32px 24px;">
            <div style="font-size: 0.85rem; font-weight: 800; color: #dc2626; text-transform: uppercase; margin-bottom: 6px;">
              Choose the Correct Sentence
            </div>

            ${renderConceptVisual(topicObj.id, q)}

            <h2 style="font-size: 1.4rem; color: var(--ha-navy); margin-bottom: 24px;">
              ${q.question}
            </h2>

            <div style="display: grid; grid-template-columns: 1fr; gap: 12px; margin-bottom: 24px;">
              ${(q.options || []).map((opt, idx) => `
                <button class="choose-opt-btn" data-index="${idx}"
                  style="padding: 14px 20px; font-size: 1rem; font-weight: 700; color: var(--ha-navy); background: #FFFFFF; border: 2px solid var(--ha-border); border-radius: var(--radius-md); text-align: left; cursor: pointer; transition: all 0.15s;">
                  <span style="display: inline-block; width: 28px; height: 28px; line-height: 28px; text-align: center; border-radius: var(--radius-pill); background: var(--ha-navy-subtle); margin-right: 12px; font-size: 0.85rem;">${String.fromCharCode(65 + idx)}</span>
                  ${opt}
                </button>
              `).join('')}
            </div>

            <div id="choose-feedback-box" style="display: none; padding: 14px; border-radius: var(--radius-md); margin-bottom: 20px;">
              <div id="choose-feedback-title" style="font-weight: 800; margin-bottom: 4px;"></div>
              <div id="choose-feedback-text" style="font-size: 0.9rem;"></div>
            </div>

            <div style="display: flex; justify-content: flex-end;">
              <button class="btn btn-primary" id="btn-next-choose" style="display: none; background: #dc2626;">
                Next Question →
              </button>
            </div>
          </div>

        </div>
      `;

      container.querySelector('#btn-choose-back')?.addEventListener('click', () => {
        sound.playClick();
        currentActivity = null;
        render();
      });

      const optButtons = container.querySelectorAll('.choose-opt-btn');
      const feedbackBox = container.querySelector('#choose-feedback-box');
      const feedbackTitle = container.querySelector('#choose-feedback-title');
      const feedbackText = container.querySelector('#choose-feedback-text');
      const nextBtn = container.querySelector('#btn-next-choose');

      optButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          optButtons.forEach(b => b.disabled = true);
          const chosenIdx = parseInt(btn.dataset.index);
          const isCorrect = chosenIdx === q.answer;

          if (isCorrect) {
            correctCount++;
            sound.playCorrect();
            btn.style.borderColor = 'var(--ha-success)';
            btn.style.background = 'var(--ha-success-bg)';
            btn.style.color = 'var(--ha-success)';
            feedbackBox.style.background = 'var(--ha-success-bg)';
            feedbackBox.style.color = '#065F46';
            feedbackBox.style.border = '1px solid var(--ha-success)';
            feedbackTitle.innerHTML = `<span style="display: inline-flex; align-items: center; gap: 6px;">${checkCircleIcon(18)} Perfect choice!</span>`;
          } else {
            sound.playWrong();
            btn.style.borderColor = 'var(--ha-red)';
            btn.style.background = 'var(--ha-red-light)';
            btn.style.color = 'var(--ha-red)';
            feedbackBox.style.background = 'var(--ha-red-light)';
            feedbackBox.style.color = '#991B1B';
            feedbackBox.style.border = '1px solid var(--ha-red)';
            feedbackTitle.innerHTML = `<span style="display: inline-flex; align-items: center; gap: 6px;">${infoIcon(18)} Incorrect (Correct: "${q.options[q.answer]}")</span>`;
          }

          feedbackText.textContent = q.explanation || '';
          feedbackBox.style.display = 'block';
          nextBtn.style.display = 'inline-flex';
        });
      });

      nextBtn?.addEventListener('click', () => {
        sound.playClick();
        currentIndex++;
        renderItem();
      });
    }

    renderItem();
  }

  // Common Completion View
  function renderCompletionView(icon, title, message, xpEarned) {
    container.innerHTML = `
      <div class="container" style="padding-top: 40px; padding-bottom: 60px; max-width: 620px; text-align: center;">
        <div class="ha-card topic-master-card" style="padding: 40px 28px; border-top: 6px solid var(--ha-gold);">
          <div style="display: flex; justify-content: center; margin-bottom: 16px; color: var(--ha-gold);">
            ${icon}
          </div>
          <h1 style="font-size: 2rem; color: var(--ha-navy); margin-bottom: 8px;">${title}</h1>
          <p style="font-size: 1.05rem; color: var(--ha-text-muted); margin-bottom: 24px; line-height: 1.5;">
            ${message}
          </p>

          <div style="display: inline-flex; align-items: center; gap: 8px; background: var(--ha-navy-subtle); padding: 10px 22px; border-radius: var(--radius-pill); margin-bottom: 28px;">
            <span style="font-size: 1.2rem; font-weight: 800; color: var(--ha-gold-dark);">+${xpEarned} XP Awarded</span>
          </div>

          <div style="display: flex; justify-content: center; gap: 14px; flex-wrap: wrap;">
            <button class="btn btn-outline" id="btn-comp-another-act" style="display: inline-flex; align-items: center; gap: 8px;">
              ${gamepadIcon(16)} Other Activities
            </button>
            <button class="btn btn-primary" id="btn-comp-goto-test" style="background: var(--ha-navy); display: inline-flex; align-items: center; gap: 8px;">
              ${graduationCapIcon(16)} Take Full Grammar Test
            </button>
          </div>
        </div>
      </div>
    `;

    container.querySelector('#btn-comp-another-act')?.addEventListener('click', () => {
      sound.playClick();
      currentActivity = null;
      render();
      window.scrollTo(0, 0);
    });

    container.querySelector('#btn-comp-goto-test')?.addEventListener('click', () => {
      sound.playClick();
      if (onNavigate) onNavigate('full-test');
    });
  }

  // Initial render
  render();
}
