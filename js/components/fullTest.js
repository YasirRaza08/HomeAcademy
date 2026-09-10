// Home Academy - Full Grammar Test Component
// Comprehensive assessment across ALL currently active grammar topics
// Taught by Sir Zubair • Randomized questions & fresh combinations every time

import { stateManager } from '../state.js';
import { sound } from '../audio.js';
import { fireConfetti } from '../confetti.js';
import { generateFullGrammarTest } from '../data/topic-activities.js';
import { apiClient } from '../services/apiClient.js';

export function renderFullTest(container, onNavigate) {
  const student = stateManager.getCurrentStudent();
  const activeTopics = stateManager.getActiveCurriculum();

  // If no student logged in, invite them to login
  if (!student) {
    container.innerHTML = `
      <div class="container" style="padding-top: 50px; padding-bottom: 70px; text-align: center; max-width: 620px;">
        <div class="ha-card" style="padding: 40px 24px; border-top: 6px solid var(--ha-navy);">
          <span style="font-size: 3.5rem; display: block; margin-bottom: 12px;">🎓</span>
          <h2 style="font-size: 1.8rem; color: var(--ha-navy); margin-bottom: 8px;">Full Grammar Test</h2>
          <p style="font-size: 0.95rem; color: var(--ha-text-muted); margin-bottom: 24px;">
            Please log in or join the class with code <strong>HOME-ENGLISH</strong> to take the Comprehensive Full Grammar Test and record your score on the leaderboard.
          </p>
          <button class="btn btn-primary btn-lg" id="btn-fulltest-login">
            🔑 Log In to Take Test
          </button>
        </div>
      </div>
    `;

    container.querySelector('#btn-fulltest-login')?.addEventListener('click', () => {
      sound.playClick();
      window.dispatchEvent(new CustomEvent('ha:open-join-modal', { detail: { tab: 'login' } }));
    });
    return;
  }

  // Active state for current test session
  let testState = 'intro'; // 'intro' | 'testing' | 'results'
  let currentQuestions = [];
  let currentIndex = 0;
  let userAnswers = [];
  let submissionToken = null;
  let testResult = null;
  let saveStatus = 'saving'; // 'saving' | 'saved' | 'error'
  let saveErrorMessage = '';

  function initTest() {
    submissionToken = 'sub_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);
    saveStatus = 'saving';
    saveErrorMessage = '';
    // Gather all seen questions across topics
    let allSeen = [];
    activeTopics.forEach(t => {
      const seen = stateManager.getSeenQuestionIds(t.id);
      allSeen = allSeen.concat(seen);
    });

    // Generate fresh test (2 questions per active topic = 12 questions for 6 topics)
    const { questions } = generateFullGrammarTest(activeTopics, allSeen, 2);
    currentQuestions = questions;
    currentIndex = 0;
    userAnswers = [];
    testResult = null;
    testState = 'testing';
    render();
    window.scrollTo(0, 0);
  }

  function render() {
    if (testState === 'intro') {
      renderIntro();
    } else if (testState === 'testing') {
      renderQuestion();
    } else if (testState === 'results') {
      renderResults();
    }
  }

  // Screen 1: Intro / Setup
  function renderIntro() {
    const history = student.fullTestHistory || [];
    const bestScore = student.stats?.bestFullTestScore || 0;
    const totalTaken = history.length;
    const totalQuestions = activeTopics.length * 2;

    container.innerHTML = `
      <div class="container" style="padding-top: 28px; padding-bottom: 60px; max-width: 820px;">
        
        <!-- Breadcrumb / Header -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 10px;">
          <button class="btn btn-outline btn-sm" id="btn-test-back-dash">← Back to Dashboard</button>
          <div style="display: flex; gap: 8px;">
            <span class="badge badge-navy">Official Comprehensive Exam</span>
            <span class="badge badge-red">Sir Zubair</span>
          </div>
        </div>

        <!-- Hero Card -->
        <div class="ha-card topic-master-card" style="padding: 36px 30px; border-top: 6px solid var(--ha-navy); margin-bottom: 28px;">
          <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 16px; flex-wrap: wrap;">
            <span style="font-size: 3.5rem; background: var(--ha-navy-subtle); width: 72px; height: 72px; border-radius: var(--radius-pill); display: flex; align-items: center; justify-content: center;">
              🎓
            </span>
            <div>
              <h1 style="font-size: 2rem; color: var(--ha-navy); margin: 0 0 4px;">Full Grammar Test</h1>
              <p style="font-size: 0.95rem; color: var(--ha-text-muted); margin: 0;">
                One combined test covering <strong>all ${activeTopics.length} active grammar topics</strong> taught in class by Sir Zubair.
              </p>
            </div>
          </div>

          <!-- Quick Overview Metrics -->
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 14px; margin-bottom: 24px;">
            <div style="background: #F8FAFC; border: 1px solid var(--ha-border); border-radius: var(--radius-md); padding: 14px 16px;">
              <div style="font-size: 0.75rem; font-weight: 800; color: var(--ha-text-muted); text-transform: uppercase;">EXAM QUESTIONS</div>
              <div style="font-size: 1.4rem; font-weight: 800; color: var(--ha-navy);">${totalQuestions} Questions</div>
              <div style="font-size: 0.78rem; color: var(--ha-text-muted);">2 from each active topic</div>
            </div>

            <div style="background: #F8FAFC; border: 1px solid var(--ha-border); border-radius: var(--radius-md); padding: 14px 16px;">
              <div style="font-size: 0.75rem; font-weight: 800; color: var(--ha-text-muted); text-transform: uppercase;">PASSING CRITERIA</div>
              <div style="font-size: 1.4rem; font-weight: 800; color: var(--ha-success);">80% or Higher</div>
              <div style="font-size: 0.78rem; color: var(--ha-text-muted);">Mastery benchmark</div>
            </div>

            <div style="background: #F8FAFC; border: 1px solid var(--ha-border); border-radius: var(--radius-md); padding: 14px 16px;">
              <div style="font-size: 0.75rem; font-weight: 800; color: var(--ha-text-muted); text-transform: uppercase;">PASS REWARD</div>
              <div style="font-size: 1.4rem; font-weight: 800; color: var(--ha-gold-dark);">+75 XP ⚡</div>
              <div style="font-size: 0.78rem; color: var(--ha-text-muted);">Added to profile & rank</div>
            </div>

            <div style="background: #F8FAFC; border: 1px solid var(--ha-border); border-radius: var(--radius-md); padding: 14px 16px;">
              <div style="font-size: 0.75rem; font-weight: 800; color: var(--ha-text-muted); text-transform: uppercase;">YOUR BEST SCORE</div>
              <div style="font-size: 1.4rem; font-weight: 800; color: ${bestScore >= 80 ? 'var(--ha-success)' : 'var(--ha-navy)'};">${bestScore}%</div>
              <div style="font-size: 0.78rem; color: var(--ha-text-muted);">${totalTaken} attempts taken</div>
            </div>
          </div>

          <!-- Topics Included in Test -->
          <div style="margin-bottom: 26px;">
            <div style="font-size: 0.82rem; font-weight: 800; color: var(--ha-navy); text-transform: uppercase; margin-bottom: 10px; letter-spacing: 0.04em;">
              Active Topics Tested in this Exam:
            </div>
            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
              ${activeTopics.map(t => `
                <span class="badge" style="background: #F1F5F9; color: var(--ha-navy); border: 1px solid var(--ha-border); padding: 6px 12px; font-size: 0.85rem; font-weight: 700;">
                  <span>${t.icon}</span> Topic ${t.number}: ${t.title}
                </span>
              `).join('')}
            </div>
          </div>

          <!-- Features list -->
          <div style="background: var(--ha-navy-subtle); border-radius: var(--radius-md); padding: 16px 20px; margin-bottom: 26px;">
            <ul style="margin: 0; padding-left: 20px; font-size: 0.88rem; color: var(--ha-navy); display: flex; flex-direction: column; gap: 6px; font-weight: 600;">
              <li>🔄 <strong>Fresh Questions Every Time</strong>: Questions and choices are randomized on every test.</li>
              <li>🎯 <strong>Balanced Representation</strong>: Equal questions selected from each active topic.</li>
              <li>📊 <strong>Topic-by-Topic Breakdown</strong>: Detailed post-test review of your accuracy per grammar topic.</li>
              <li>🛡️ <strong>Anti-Duplicate Protection</strong>: Test results are securely validated so XP cannot be duplicated.</li>
            </ul>
          </div>

          <!-- Action Button -->
          <div style="text-align: center;">
            <button class="btn btn-primary btn-lg" id="btn-start-full-test" style="background: var(--ha-red); padding: 16px 36px; font-size: 1.15rem; box-shadow: 0 6px 20px rgba(200, 16, 46, 0.35);">
              <span>🚀</span> START FULL GRAMMAR TEST
            </button>
          </div>
        </div>

        <!-- Recent Attempts History -->
        ${history.length > 0 ? `
          <div class="ha-card" style="padding: 24px;">
            <h3 style="font-size: 1.15rem; color: var(--ha-navy); margin-bottom: 14px;">Your Test History</h3>
            <div style="display: flex; flex-direction: column; gap: 10px;">
              ${history.slice(0, 5).map(h => `
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; background: #F8FAFC; border-radius: var(--radius-sm); border: 1px solid var(--ha-border); flex-wrap: wrap; gap: 8px;">
                  <div>
                    <strong style="color: var(--ha-navy); font-size: 0.95rem;">Score: ${h.score} / ${h.total} (${h.percent}%)</strong>
                    <div style="font-size: 0.78rem; color: var(--ha-text-muted);">${new Date(h.date).toLocaleDateString()} at ${new Date(h.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                  </div>
                  <div style="display: flex; align-items: center; gap: 10px;">
                    <span class="badge ${h.passed ? 'badge-success' : 'badge-navy'}">
                      ${h.passed ? 'PASSED (80%+)' : 'Needs Practice'}
                    </span>
                    ${h.xpEarned ? `<span class="badge badge-gold">+${h.xpEarned} XP</span>` : ''}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

      </div>
    `;

    container.querySelector('#btn-test-back-dash')?.addEventListener('click', () => {
      sound.playClick();
      onNavigate('dashboard');
    });

    container.querySelector('#btn-start-full-test')?.addEventListener('click', () => {
      sound.playClick();
      initTest();
    });
  }

  // Screen 2: Individual Question
  function renderQuestion() {
    const total = currentQuestions.length;
    const q = currentQuestions[currentIndex];

    if (!q) {
      finishTest();
      return;
    }

    const progressPercent = ((currentIndex + 1) / total) * 100;

    container.innerHTML = `
      <div class="container" style="padding-top: 24px; padding-bottom: 50px; max-width: 760px;">
        
        <!-- Header status -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 8px;">
          <span class="badge badge-navy" style="font-size: 0.85rem;">
            ${q.topicIcon || '📖'} Topic ${q.topicNumber || ''}: ${q.topicTitle || 'Grammar'}
          </span>
          <span style="font-weight: 800; color: var(--ha-navy); font-size: 0.95rem;">
            Question ${currentIndex + 1} of ${total}
          </span>
        </div>

        <!-- Progress Bar -->
        <div class="progress-container" style="margin-bottom: 24px; height: 8px;">
          <div class="progress-bar-fill red" style="width: ${progressPercent}%;"></div>
        </div>

        <!-- Question Card -->
        <div class="ha-card topic-master-card" style="border-top: 5px solid ${q.topicColor || 'var(--ha-navy)'};">
          
          <div style="font-size: 0.78rem; font-weight: 800; color: ${q.topicColor || 'var(--ha-navy)'}; text-transform: uppercase; margin-bottom: 6px; letter-spacing: 0.04em;">
            Comprehensive Grammar Question
          </div>

          <h2 style="font-size: 1.45rem; color: var(--ha-navy); margin-bottom: 24px; line-height: 1.45;">
            ${q.question}
          </h2>

          <!-- Options Grid -->
          <div style="display: grid; grid-template-columns: 1fr; gap: 12px; margin-bottom: 24px;" id="ft-options-grid">
            ${(q.options || []).map((opt, idx) => `
              <button class="ft-opt-btn" data-index="${idx}" data-text="${opt}"
                style="padding: 14px 20px; font-size: 1rem; font-weight: 700; color: var(--ha-navy); background: #FFFFFF; border: 2px solid var(--ha-border); border-radius: var(--radius-md); text-align: left; cursor: pointer; transition: all 0.15s; display: flex; align-items: center;">
                <span style="display: inline-block; width: 28px; height: 28px; line-height: 28px; text-align: center; border-radius: var(--radius-pill); background: var(--ha-navy-subtle); margin-right: 12px; font-size: 0.85rem; flex-shrink: 0;">${String.fromCharCode(65 + idx)}</span>
                <span>${opt}</span>
              </button>
            `).join('')}
          </div>

          <!-- Feedback Box -->
          <div id="ft-feedback-box" style="display: none; padding: 16px; border-radius: var(--radius-md); margin-bottom: 20px;">
            <div id="ft-feedback-title" style="font-size: 1.05rem; font-weight: 800; margin-bottom: 4px;"></div>
            <div id="ft-feedback-text" style="font-size: 0.9rem;"></div>
          </div>

          <!-- Next Button -->
          <div style="display: flex; justify-content: flex-end;">
            <button class="btn btn-primary btn-lg" id="btn-next-ft-question" style="display: none; background: var(--ha-navy);">
              ${currentIndex === total - 1 ? 'Finish Exam & View Report →' : 'Next Question →'}
            </button>
          </div>
        </div>

      </div>
    `;

    const optButtons = container.querySelectorAll('.ft-opt-btn');
    const feedbackBox = container.querySelector('#ft-feedback-box');
    const feedbackTitle = container.querySelector('#ft-feedback-title');
    const feedbackText = container.querySelector('#ft-feedback-text');
    const nextBtn = container.querySelector('#btn-next-ft-question');

    optButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        optButtons.forEach(b => b.disabled = true);
        const chosenIdx = parseInt(btn.dataset.index);
        const chosenText = btn.dataset.text;
        const isCorrect = chosenIdx === q.answer;

        userAnswers.push({
          questionId: q.id,
          topicId: q.topicId,
          topicTitle: q.topicTitle,
          topicIcon: q.topicIcon,
          question: q.question,
          chosenText,
          correctText: q.options[q.answer],
          isCorrect,
          explanation: q.explanation
        });

        if (isCorrect) {
          sound.playCorrect();
          btn.style.borderColor = 'var(--ha-success)';
          btn.style.background = 'var(--ha-success-bg)';
          btn.style.color = 'var(--ha-success)';
          feedbackBox.style.background = 'var(--ha-success-bg)';
          feedbackBox.style.color = '#065F46';
          feedbackBox.style.border = '1px solid var(--ha-success)';
          feedbackTitle.innerHTML = '🎉 Correct!';
        } else {
          sound.playWrong();
          btn.style.borderColor = 'var(--ha-error)';
          btn.style.background = 'var(--ha-red-light)';
          btn.style.color = 'var(--ha-red)';
          feedbackBox.style.background = 'var(--ha-red-light)';
          feedbackBox.style.color = '#991B1B';
          feedbackBox.style.border = '1px solid var(--ha-red)';
          feedbackTitle.innerHTML = `❌ Incorrect (Correct: "${q.options[q.answer]}")`;
        }

        feedbackText.textContent = q.explanation || '';
        feedbackBox.style.display = 'block';
        nextBtn.style.display = 'inline-flex';
      });
    });

    nextBtn.addEventListener('click', () => {
      sound.playClick();
      currentIndex++;
      if (currentIndex >= total) {
        finishTest();
      } else {
        render();
        window.scrollTo(0, 0);
      }
    });
  }

  // Finalize & Calculate Score
  function finishTest() {
    const total = currentQuestions.length;
    const correctCount = userAnswers.filter(a => a.isCorrect).length;
    const percent = Math.round((correctCount / total) * 100);
    const passed = percent >= 80;
    const xpEarned = passed ? 75 : 20;

    // Build Topic-by-Topic Breakdown
    const breakdown = {};
    activeTopics.forEach(t => {
      const answersForTopic = userAnswers.filter(a => a.topicId === t.id);
      const correctForTopic = answersForTopic.filter(a => a.isCorrect).length;
      const totalForTopic = answersForTopic.length;
      const topicPercent = totalForTopic > 0 ? Math.round((correctForTopic / totalForTopic) * 100) : 0;

      breakdown[t.id] = {
        title: t.title,
        icon: t.icon,
        correct: correctForTopic,
        total: totalForTopic,
        percent: topicPercent
      };
    });

    // Record in StateManager with duplicate token protection
    const recordPayload = {
      submissionToken,
      score: correctCount,
      total,
      percent,
      xpEarned,
      topicBreakdown: breakdown,
      answers: userAnswers,
      questionIds: currentQuestions.map(q => ({ id: q.id, topicId: q.topicId }))
    };

    stateManager.recordFullTestResult(recordPayload);

    // Explicitly persist to database via backend API and track status
    saveStatus = 'saving';
    saveErrorMessage = '';

    const executeSave = () => {
      saveStatus = 'saving';
      updateSaveStatusUI();
      apiClient.recordFullGrammarTest({
        submissionToken,
        score: correctCount,
        total,
        percent,
        topicBreakdown: breakdown
      }).then(() => {
        saveStatus = 'saved';
        updateSaveStatusUI();
      }).catch(err => {
        console.error('Failed to save grammar test:', err);
        saveStatus = 'error';
        saveErrorMessage = err?.message || 'Network error';
        updateSaveStatusUI();
      });
    };

    executeSave();

    testResult = {
      correctCount,
      total,
      percent,
      passed,
      xpEarned,
      breakdown,
      answers: userAnswers,
      executeSave
    };

    if (passed) {
      sound.playLevelUp();
      fireConfetti(4000);
    } else {
      sound.playClick();
    }

    testState = 'results';
    render();
    window.scrollTo(0, 0);
  }

  function updateSaveStatusUI() {
    const mount = container.querySelector('#ft-save-status-mount');
    if (!mount) return;

    if (saveStatus === 'saving') {
      mount.innerHTML = `
        <div style="background: var(--ha-navy-subtle); border: 1.5px solid var(--ha-border); color: var(--ha-navy); padding: 12px 20px; border-radius: var(--radius-md); margin-bottom: 22px; display: inline-flex; align-items: center; gap: 10px; font-weight: 700; font-size: 0.95rem;">
          <span style="display: inline-block; width: 14px; height: 14px; border: 2px solid var(--ha-navy); border-top-color: transparent; border-radius: 50%; animation: spin 0.8s linear infinite;"></span>
          <span>Saving your test result to database...</span>
        </div>
      `;
    } else if (saveStatus === 'saved') {
      mount.innerHTML = `
        <div style="background: #ECFDF5; border: 1.5px solid #10B981; color: #065F46; padding: 12px 22px; border-radius: var(--radius-md); margin-bottom: 22px; display: inline-flex; align-items: center; gap: 10px; font-weight: 700; font-size: 0.95rem; box-shadow: 0 2px 6px rgba(16,185,129,0.12);">
          <span style="font-size: 1.25rem;">✓</span>
          <span>Your test result has been saved successfully.</span>
        </div>
      `;
    } else {
      mount.innerHTML = `
        <div style="background: #FEF2F2; border: 1.5px solid #EF4444; color: #991B1B; padding: 12px 20px; border-radius: var(--radius-md); margin-bottom: 22px; display: inline-flex; align-items: center; justify-content: space-between; gap: 14px; font-weight: 700; font-size: 0.95rem; flex-wrap: wrap;">
          <div style="display: inline-flex; align-items: center; gap: 8px;">
            <span style="font-size: 1.25rem;">⚠️</span>
            <span>Something went wrong. Please try again.</span>
          </div>
          <button class="btn btn-outline btn-xs" id="btn-retry-save-test" style="border-color: #EF4444; color: #991B1B; font-weight: 800; padding: 4px 10px;">
            Retry Saving
          </button>
        </div>
      `;
      mount.querySelector('#btn-retry-save-test')?.addEventListener('click', () => {
        sound.playClick();
        if (testResult && testResult.executeSave) testResult.executeSave();
      });
    }
  }

  // Screen 3: Results & Performance Summary
  function renderResults() {
    const res = testResult;
    if (!res) {
      testState = 'intro';
      render();
      return;
    }

    let performanceMessage = '';
    if (res.percent >= 90) {
      performanceMessage = `Outstanding achievement, <strong>${student.name}</strong>! You demonstrated comprehensive mastery across all ${activeTopics.length} class topics taught by <strong>Sir Zubair</strong> with top honors!`;
    } else if (res.percent >= 80) {
      performanceMessage = `Well done, <strong>${student.name}</strong>! You passed the comprehensive exam! Keep up the great work!`;
    } else if (res.percent >= 60) {
      performanceMessage = `Good effort, <strong>${student.name}</strong>! You scored ${res.percent}%. 80% is needed to pass. Review your mistakes below to reach complete mastery.`;
    } else {
      performanceMessage = `Keep practicing, <strong>${student.name}</strong>! You scored ${res.percent}%. Review the explanations and topic breakdown below, then take a fresh test to improve!`;
    }

    container.innerHTML = `
      <div class="container" style="padding-top: 30px; padding-bottom: 70px; max-width: 820px;">
        
        <!-- Score Banner Card -->
        <div class="ha-card topic-master-card" style="text-align: center; border-top: 6px solid ${res.passed ? 'var(--ha-gold)' : 'var(--ha-red)'}; margin-bottom: 30px;">
          <span style="font-size: 4.5rem; display: inline-block; margin-bottom: 12px;">
            ${res.passed ? '🏆' : '📚'}
          </span>
          
          <h1 style="font-size: 2.2rem; color: var(--ha-navy); margin-bottom: 6px;">
            ${res.passed ? 'Full Grammar Test Passed!' : 'Exam Completed — Review Mistakes'}
          </h1>

          <p style="font-size: 1.05rem; color: var(--ha-text-muted); max-width: 580px; margin: 0 auto 20px; line-height: 1.6;">
            ${performanceMessage}
          </p>

          <!-- Real-Time Save Confirmation Mount -->
          <div id="ft-save-status-mount"></div>

          <!-- Big Metric Badges: Explicit format e.g. 17/20 -->
          <div style="display: inline-flex; align-items: center; justify-content: center; gap: 20px; flex-wrap: wrap; background: var(--ha-navy-subtle); padding: 16px 26px; border-radius: var(--radius-lg); margin-bottom: 26px;">
            <div>
              <div style="font-size: 0.78rem; font-weight: 800; color: var(--ha-text-muted); text-transform: uppercase;">EXAM SCORE</div>
              <div style="font-size: 2.3rem; font-weight: 800; color: ${res.passed ? 'var(--ha-navy)' : 'var(--ha-red)'};">
                ${res.correctCount} / ${res.total} (${res.percent}%)
              </div>
            </div>

            <div style="border-left: 2px solid var(--ha-border); padding-left: 20px; text-align: left;">
              <div style="font-size: 0.78rem; font-weight: 800; color: var(--ha-gold-dark); text-transform: uppercase;">XP AWARDED</div>
              <div style="font-size: 1.8rem; font-weight: 800; color: var(--ha-gold-dark);">
                +${res.xpEarned} XP ⚡
              </div>
            </div>
          </div>

          <!-- Buttons -->
          <div style="display: flex; justify-content: center; gap: 14px; flex-wrap: wrap;">
            <button class="btn btn-primary btn-lg" id="btn-retake-fresh-test" style="background: var(--ha-red);">
              <span>🔄</span> Take Fresh Test (New Questions)
            </button>
            <button class="btn btn-outline btn-lg" id="btn-results-goto-dash">
              <span>📊</span> Return to Dashboard
            </button>
          </div>
        </div>

        <!-- Topic-by-Topic Performance Breakdown -->
        <div class="ha-card" style="padding: 26px; margin-bottom: 30px;">
          <h3 style="font-size: 1.25rem; color: var(--ha-navy); margin: 0 0 4px;">Topic-by-Topic Performance</h3>
          <p style="font-size: 0.88rem; color: var(--ha-text-muted); margin: 0 0 20px;">
            See how you performed across each individual grammar topic:
          </p>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px;">
            ${Object.entries(res.breakdown).map(([tId, info]) => `
              <div style="background: #F8FAFC; border: 1.5px solid var(--ha-border); border-radius: var(--radius-md); padding: 14px 16px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                  <span style="font-size: 1.3rem;">${info.icon}</span>
                  <span class="badge ${info.percent >= 80 ? 'badge-success' : 'badge-navy'}">
                    ${info.correct} / ${info.total} (${info.percent}%)
                  </span>
                </div>
                <strong style="color: var(--ha-navy); font-size: 0.92rem; display: block; margin-bottom: 8px;">${info.title}</strong>
                <div class="progress-container" style="height: 6px;">
                  <div class="progress-bar-fill" style="width: ${info.percent}%; background: ${info.percent >= 80 ? 'var(--ha-success)' : 'var(--ha-red)'};"></div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Mistakes & Answers Review -->
        <div class="ha-card" style="padding: 26px;">
          <h3 style="font-size: 1.25rem; color: var(--ha-navy); margin: 0 0 16px;">Question-by-Question Review</h3>
          <div style="display: flex; flex-direction: column; gap: 14px;">
            ${res.answers.map((ans, idx) => `
              <div style="padding: 14px 18px; border-radius: var(--radius-md); border: 1.5px solid ${ans.isCorrect ? 'var(--ha-success)' : 'var(--ha-red)'}; background: ${ans.isCorrect ? 'var(--ha-success-bg)' : 'var(--ha-red-light)'};">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; flex-wrap: wrap; gap: 6px;">
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <span style="background: var(--ha-navy); color: #fff; width: 24px; height: 24px; border-radius: var(--radius-pill); display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 800;">${idx + 1}</span>
                    <span class="badge badge-navy" style="font-size: 0.75rem;">${ans.topicIcon} ${ans.topicTitle}</span>
                  </div>
                  <span style="font-size: 0.8rem; font-weight: 800; color: ${ans.isCorrect ? 'var(--ha-success)' : 'var(--ha-red)'};">
                    ${ans.isCorrect ? '✓ CORRECT' : '✗ INCORRECT'}
                  </span>
                </div>
                <div style="font-size: 1rem; font-weight: 700; color: var(--ha-navy); margin-bottom: 6px;">
                  ${ans.question}
                </div>
                <div style="font-size: 0.88rem; margin-bottom: 4px;">
                  Your answer: <strong>${ans.chosenText}</strong>
                  ${!ans.isCorrect ? ` • Correct answer: <strong style="color: var(--ha-navy);">${ans.correctText}</strong>` : ''}
                </div>
                ${ans.explanation ? `<div style="font-size: 0.82rem; opacity: 0.9; font-style: italic;">💡 ${ans.explanation}</div>` : ''}
              </div>
            `).join('')}
          </div>
        </div>

      </div>
    `;

    container.querySelector('#btn-retake-fresh-test')?.addEventListener('click', () => {
      sound.playClick();
      initTest();
    });

    container.querySelector('#btn-results-goto-dash')?.addEventListener('click', () => {
      sound.playClick();
      onNavigate('dashboard');
    });

    updateSaveStatusUI();
  }

  // Initial render
  render();
}
