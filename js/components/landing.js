// Home Academy Landing Page Component - Official Brand Identity & Comprehensive Platform
// Modern, Professional, Mobile-Friendly Learning Platform

import { stateManager } from '../state.js';
import { sound } from '../audio.js';
import { 
  bookIcon, schoolIcon, trophyIcon, gamepadIcon, keyIcon, usersIcon, 
  checkCircleIcon, infoIcon, roleplayIcon, sparkIcon, dashboardIcon, graduationCapIcon, arrowLeftIcon
} from './icons.js';

export function renderLanding(container, onNavigate) {
  const currentStudent = stateManager.getCurrentStudent();
  const students = stateManager.getLeaderboard();
  const activeTopics = stateManager.getActiveCurriculum();

  container.innerHTML = `
    <!-- 1. Hero Section -->
    <section class="hero-section" style="padding: clamp(30px, 5vw, 60px) 0; background: linear-gradient(180deg, #FFFFFF 0%, var(--ha-bg) 100%);">
      <div class="container hero-grid">
        <div class="hero-content">
          <div class="hero-brand-tag" style="margin-bottom: 14px;">
            <span class="ha-nav-icon" style="color: var(--ha-gold); font-size: 1.1rem;">${sparkIcon(16)}</span> Official Online Learning Platform • Sir Zubair
          </div>
          <h1 class="hero-title" style="margin-bottom: 16px; font-weight: 900; line-height: 1.15;">
            Learn English.<br>
            <span style="color: var(--ha-red);">Play.</span> 
            <span style="color: var(--ha-gold-dark);">Improve.</span>
          </h1>
          <p class="hero-subtitle" style="font-size: 1.05rem; line-height: 1.6; color: var(--ha-text-muted); margin-bottom: 22px;">
            Welcome to <strong>Home Academy</strong> — the modern digital learning platform for students of the <strong>English Language Program</strong> taught by <strong>Sir Zubair</strong>. Master core grammar topics, practice real-world speaking roleplays, play interactive learning games, and track verified academic results.
          </p>

          <!-- 3 Clear Primary CTA Buttons as Requested -->
          <div class="hero-buttons" style="display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 18px;">
            <button class="btn btn-primary btn-lg" id="hero-cta-start-learning" style="display: inline-flex; align-items: center; gap: 8px; font-weight: 800;">
              ${bookIcon(20)} Start Learning
            </button>
            <button class="btn btn-secondary btn-lg" id="hero-cta-grammar-test" style="display: inline-flex; align-items: center; gap: 8px; background: var(--ha-red); border-color: var(--ha-red); font-weight: 800;">
              ${graduationCapIcon(20)} Grammar Test
            </button>
            <button class="btn btn-outline btn-lg" id="hero-cta-activities" style="display: inline-flex; align-items: center; gap: 8px; font-weight: 800;">
              ${gamepadIcon(20)} Activities
            </button>
          </div>

          <!-- Secondary Student Authentication Strip -->
          <div style="margin-bottom: 24px; padding: 12px 16px; background: #FFFFFF; border: 1px solid var(--ha-border); border-radius: var(--radius-md); display: inline-flex; align-items: center; gap: 12px; flex-wrap: wrap;">
            ${currentStudent ? `
              <span style="font-size: 0.88rem; color: var(--ha-navy); font-weight: 700; display: inline-flex; align-items: center; gap: 6px;">
                <span>${currentStudent.avatar || '🎓'}</span> Welcome back, <strong>${currentStudent.name}</strong> (Level ${currentStudent.level})
              </span>
              <button class="btn btn-sm btn-primary" id="hero-auth-dash-btn" style="padding: 4px 12px; font-size: 0.8rem;">
                Open Dashboard →
              </button>
            ` : `
              <span style="font-size: 0.84rem; color: var(--ha-text-muted);">Class Member?</span>
              <button class="btn btn-outline btn-sm" id="hero-login-link" style="padding: 4px 10px; font-size: 0.8rem;">
                Student Login
              </button>
              <button class="btn btn-secondary btn-sm" id="hero-join-link" style="padding: 4px 10px; font-size: 0.8rem;">
                Join with Code
              </button>
            `}
          </div>

          <div class="hero-highlights">
            <div class="hero-highlight-item"><span style="color: var(--ha-navy);">${schoolIcon(16)}</span> Instructor: <strong>Sir Zubair</strong></div>
            <div class="hero-highlight-item"><span style="color: var(--ha-red);">${bookIcon(16)}</span> <strong>${activeTopics.length}</strong> Grammar Topics</div>
            <div class="hero-highlight-item"><span style="color: var(--ha-gold-dark);">${keyIcon(16)}</span> Code: <strong>HOME-ENGLISH</strong></div>
            <div class="hero-highlight-item"><span style="color: #059669;">${gamepadIcon(16)}</span> 5 Interactive Activities</div>
          </div>
        </div>

        <!-- Official Logo & Showcase Card -->
        <div class="hero-preview-card" style="text-align: center;">
          <div style="padding: 10px 0 16px;">
            <img src="assets/logo.png" alt="Home Academy English Language Program" 
              style="max-width: 220px; width: 100%; height: auto; object-fit: contain; margin: 0 auto; display: block; filter: drop-shadow(0 4px 12px rgba(10,37,88,0.1));" />
          </div>

          ${currentStudent ? `
            <div style="background: var(--ha-navy-subtle); border-radius: var(--radius-lg); padding: 16px; margin-bottom: 18px; text-align: left;">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
                <div style="display: flex; align-items: center; gap: 10px;">
                  <span style="font-size: 2rem; background: #fff; width: 44px; height: 44px; border-radius: var(--radius-pill); display: flex; align-items: center; justify-content: center; box-shadow: var(--ha-shadow-xs);">${currentStudent.avatar}</span>
                  <div>
                    <strong style="color: var(--ha-navy); font-size: 1.05rem;">${currentStudent.name}</strong>
                    <div style="font-size: 0.76rem; font-weight: 700; color: var(--ha-gold-dark);">Level ${currentStudent.level} Student</div>
                  </div>
                </div>
                <span class="badge badge-gold">${currentStudent.xp || 0} XP</span>
              </div>
              <div class="progress-container" style="height: 6px;">
                <div class="progress-bar-fill" style="width: ${Math.min(100, (currentStudent.xp || 0) % 500 / 5)}%;"></div>
              </div>
            </div>
          ` : `
            <div style="background: var(--ha-navy-subtle); border-radius: var(--radius-lg); padding: 16px; margin-bottom: 18px; text-align: center;">
              <div style="font-size: 0.82rem; font-weight: 800; color: var(--ha-navy); text-transform: uppercase; margin-bottom: 4px;">
                Classroom Platform • Sir Zubair
              </div>
              <p style="font-size: 0.86rem; color: var(--ha-text-muted); margin-bottom: 10px;">
                Enter your class enrollment code to join:
              </p>
              <div style="display: inline-block; background: #FFFFFF; border: 2px dashed var(--ha-navy); padding: 6px 16px; border-radius: var(--radius-md); font-weight: 800; color: var(--ha-navy); font-size: 1.05rem; letter-spacing: 0.08em;">
                HOME-ENGLISH
              </div>
            </div>
          `}

          <!-- Live Sample Question -->
          <div class="hero-mini-quiz-card" style="text-align: left;">
            <div style="font-size: 0.75rem; font-weight: 800; color: var(--ha-red); text-transform: uppercase; margin-bottom: 6px; display: flex; align-items: center; gap: 6px;">
              <span>${sparkIcon(14)}</span> Quick Grammar Check (Polite Requests)
            </div>
            <div class="hero-quiz-question">"______ you please pass the salt?"</div>
            <div class="hero-quiz-options">
              <button class="hero-option-btn" data-answer="Could" id="hero-correct-opt">Could ✓</button>
              <button class="hero-option-btn" data-answer="Did">Did</button>
              <button class="hero-option-btn" data-answer="Are">Are</button>
              <button class="hero-option-btn" data-answer="Was">Was</button>
            </div>
            <div id="hero-quiz-feedback" style="display: none; margin-top: 10px; font-size: 0.85rem; font-weight: 700;"></div>
          </div>

          <div style="display: flex; align-items: center; justify-content: space-between; padding-top: 12px; border-top: 1px solid var(--ha-border); font-size: 0.84rem;">
            <span style="font-weight: 700; color: var(--ha-navy); display: inline-flex; align-items: center; gap: 6px;">
              ${usersIcon(16)} Active Students: <strong>${students.length}</strong>
            </span>
            <button class="btn btn-secondary btn-sm" id="hero-open-app-btn">
              ${currentStudent ? 'My Dashboard →' : 'Join Classroom →'}
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- 2. Attractive 4 Feature Showcase Cards (Class Topics, Roleplays, Activities, Grammar Test) -->
    <section style="padding: clamp(36px, 6vw, 64px) 0; background: #FFFFFF; border-top: 1px solid var(--ha-border); border-bottom: 1px solid var(--ha-border);">
      <div class="container">
        <div style="text-align: center; max-width: 680px; margin: 0 auto clamp(24px, 4vw, 44px);">
          <span class="badge badge-navy" style="margin-bottom: 10px;">CORE LEARNING PILLARS</span>
          <h2 style="font-size: clamp(1.6rem, 4vw, 2.2rem); color: var(--ha-navy); font-weight: 800; margin-bottom: 10px;">
            Everything You Need to Master English
          </h2>
          <p style="font-size: clamp(0.92rem, 2.5vw, 1.02rem); color: var(--ha-text-muted); line-height: 1.6;">
            A complete educational platform designed around classroom instruction, speaking confidence, and verifiable academic progress.
          </p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr)); gap: 22px;">
          
          <!-- Pillar 1: Class Topics -->
          <div class="ha-card showcase-pillar-card" style="border-top: 5px solid #0A2558; display: flex; flex-direction: column; justify-content: space-between; transition: all 0.25s;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 14px;">
                <div style="width: 48px; height: 48px; border-radius: var(--radius-md); background: var(--ha-navy-subtle); display: flex; align-items: center; justify-content: center; color: var(--ha-navy);">
                  ${bookIcon(24)}
                </div>
                <span class="badge badge-navy">${activeTopics.length} Topics</span>
              </div>
              <h3 style="font-size: 1.25rem; color: var(--ha-navy); font-weight: 800; margin-bottom: 8px;">Class Topics</h3>
              <p style="font-size: 0.9rem; color: var(--ha-text-muted); line-height: 1.5; margin-bottom: 16px;">
                Master grammar rules taught by Sir Zubair with structured 5-step learning paths: Rule breakdown, classroom examples, interactive practice, and topic quizzes.
              </p>
            </div>
            <button class="btn btn-primary btn-sm" id="showcase-topics-btn" style="width: 100%;">
              Explore Topics →
            </button>
          </div>

          <!-- Pillar 2: Roleplays -->
          <div class="ha-card showcase-pillar-card" style="border-top: 5px solid #0D9488; display: flex; flex-direction: column; justify-content: space-between; transition: all 0.25s;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 14px;">
                <div style="width: 48px; height: 48px; border-radius: var(--radius-md); background: #CCFBF1; display: flex; align-items: center; justify-content: center; color: #0D9488;">
                  ${roleplayIcon(24)}
                </div>
                <span class="badge badge-teal">Speaking Practice</span>
              </div>
              <h3 style="font-size: 1.25rem; color: var(--ha-navy); font-weight: 800; margin-bottom: 8px;">Roleplays</h3>
              <p style="font-size: 0.9rem; color: var(--ha-text-muted); line-height: 1.5; margin-bottom: 16px;">
                Practice everyday spoken conversations: At a Restaurant, At the Airport, Shopping, Job Interview, and Meeting Someone New with native audio pronunciation.
              </p>
            </div>
            <button class="btn btn-primary btn-sm" id="showcase-roleplays-btn" style="width: 100%; background: #0D9488; border-color: #0D9488;">
              Practice Roleplays →
            </button>
          </div>

          <!-- Pillar 3: Activities Hub -->
          <div class="ha-card showcase-pillar-card" style="border-top: 5px solid #059669; display: flex; flex-direction: column; justify-content: space-between; transition: all 0.25s;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 14px;">
                <div style="width: 48px; height: 48px; border-radius: var(--radius-md); background: #ECFDF5; display: flex; align-items: center; justify-content: center; color: #059669;">
                  ${gamepadIcon(24)}
                </div>
                <span class="badge badge-success">Interactive Drills</span>
              </div>
              <h3 style="font-size: 1.25rem; color: var(--ha-navy); font-weight: 800; margin-bottom: 8px;">Activities</h3>
              <p style="font-size: 0.9rem; color: var(--ha-text-muted); line-height: 1.5; margin-bottom: 16px;">
                Sharpen your skills through 5 mobile-optimized drills: Vocabulary practice, Fill in the blanks, Sentence building chips, MCQs, and Speaking drills.
              </p>
            </div>
            <button class="btn btn-primary btn-sm" id="showcase-activities-btn" style="width: 100%; background: #059669; border-color: #059669;">
              Start Activities →
            </button>
          </div>

          <!-- Pillar 4: Grammar Test -->
          <div class="ha-card showcase-pillar-card" style="border-top: 5px solid var(--ha-red); display: flex; flex-direction: column; justify-content: space-between; transition: all 0.25s;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 14px;">
                <div style="width: 48px; height: 48px; border-radius: var(--radius-md); background: var(--ha-red-light); display: flex; align-items: center; justify-content: center; color: var(--ha-red);">
                  ${graduationCapIcon(24)}
                </div>
                <span class="badge badge-red">Mastery Exam</span>
              </div>
              <h3 style="font-size: 1.25rem; color: var(--ha-navy); font-weight: 800; margin-bottom: 8px;">Grammar Test</h3>
              <p style="font-size: 0.9rem; color: var(--ha-text-muted); line-height: 1.5; margin-bottom: 16px;">
                Take the comprehensive interactive exam covering all topics. Get immediate score calculation (e.g. 17/20), mistake analysis, and persistent database storage.
              </p>
            </div>
            <button class="btn btn-secondary btn-sm" id="showcase-fulltest-btn" style="width: 100%; font-weight: 800;">
              Take Grammar Test →
            </button>
          </div>

        </div>
      </div>
    </section>

    <!-- 3. Class Topics Section with Modern Cards -->
    <section style="padding: clamp(36px, 6vw, 70px) 0; background: var(--ha-bg);">
      <div class="container">
        <div style="text-align: center; max-width: 680px; margin: 0 auto clamp(24px, 4vw, 44px);">
          <span class="badge badge-gold" style="margin-bottom: 10px;">CURRICULUM BLUEPRINTS</span>
          <h2 style="font-size: clamp(1.6rem, 4vw, 2.2rem); margin-bottom: 10px; color: var(--ha-navy); font-weight: 800;">
            Class Topics Taught by Sir Zubair
          </h2>
          <p style="font-size: clamp(0.92rem, 2.5vw, 1.02rem); color: var(--ha-text-muted); line-height: 1.6;">
            Each topic has clear grammatical rules, Urdu/English explanations, authentic classroom examples, and a 5-question mastery quiz.
          </p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr)); gap: 20px;">
          ${activeTopics.map(t => `
            <div class="ha-card topic-overview-card" data-id="${t.id}" style="border-top: 5px solid ${t.color}; display: flex; flex-direction: column; justify-content: space-between; cursor: pointer; transition: all 0.2s;">
              <div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                  <span class="badge badge-navy" style="font-weight: 800;">Topic ${t.number}</span>
                  <span style="font-size: 0.8rem; font-weight: 800; color: var(--ha-gold-dark);">+50 XP</span>
                </div>
                <h3 style="font-size: 1.25rem; color: var(--ha-navy); margin-bottom: 8px; font-weight: 800;">${t.title}</h3>
                <p style="font-size: 0.88rem; color: var(--ha-text-muted); margin-bottom: 16px; line-height: 1.5;">
                  ${t.subtitle || t.summary || 'Master this foundational English language topic.'}
                </p>
              </div>
              <div style="border-top: 1px solid var(--ha-border); padding-top: 12px; display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 0.8rem; font-weight: 700; color: ${t.color};">5-Step Master Path</span>
                <button class="btn btn-primary btn-sm btn-view-topic" data-id="${t.id}" style="background: ${t.color};">
                  View Topic →
                </button>
              </div>
            </div>
          `).join('')}
        </div>

        <div style="text-align: center; margin-top: 36px;">
          <button class="btn btn-primary btn-lg" id="landing-curriculum-explore-btn">
            View All ${activeTopics.length} Topics in Depth →
          </button>
        </div>
      </div>
    </section>
  `;

  // --- Attach Event Listeners ---
  // Primary CTA Buttons
  container.querySelector('#hero-cta-start-learning')?.addEventListener('click', () => {
    sound.playClick();
    onNavigate('topics');
  });

  container.querySelector('#hero-cta-grammar-test')?.addEventListener('click', () => {
    sound.playClick();
    onNavigate('full-test');
  });

  container.querySelector('#hero-cta-activities')?.addEventListener('click', () => {
    sound.playClick();
    onNavigate('activities');
  });

  // Showcase Cards Buttons
  container.querySelector('#showcase-topics-btn')?.addEventListener('click', () => {
    sound.playClick();
    onNavigate('topics');
  });

  container.querySelector('#showcase-roleplays-btn')?.addEventListener('click', () => {
    sound.playClick();
    onNavigate('roleplays');
  });

  container.querySelector('#showcase-activities-btn')?.addEventListener('click', () => {
    sound.playClick();
    onNavigate('activities');
  });

  container.querySelector('#showcase-fulltest-btn')?.addEventListener('click', () => {
    sound.playClick();
    onNavigate('full-test');
  });

  container.querySelector('#hero-auth-dash-btn')?.addEventListener('click', () => {
    sound.playClick();
    onNavigate('dashboard');
  });

  container.querySelector('#hero-login-link')?.addEventListener('click', () => {
    sound.playClick();
    window.dispatchEvent(new CustomEvent('ha:open-join-modal', { detail: { tab: 'login' } }));
  });

  container.querySelector('#hero-join-link')?.addEventListener('click', () => {
    sound.playClick();
    window.dispatchEvent(new CustomEvent('ha:open-join-modal', { detail: { tab: 'register' } }));
  });

  container.querySelector('#landing-curriculum-explore-btn')?.addEventListener('click', () => {
    sound.playClick();
    onNavigate('topics');
  });

  container.querySelector('#hero-open-app-btn')?.addEventListener('click', () => {
    sound.playClick();
    if (currentStudent) {
      onNavigate('dashboard');
    } else {
      window.dispatchEvent(new CustomEvent('ha:open-join-modal'));
    }
  });

  // Topic card click handler
  container.querySelectorAll('.topic-overview-card, .btn-view-topic').forEach(el => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      sound.playClick();
      const id = el.dataset.id || el.closest('.topic-overview-card')?.dataset.id;
      if (id) {
        window.dispatchEvent(new CustomEvent('ha:open-topic', { detail: { topicId: id } }));
      } else {
        onNavigate('topics');
      }
    });
  });

  // Hero mini-quiz interactive behavior
  const correctOpt = container.querySelector('#hero-correct-opt');
  const feedback = container.querySelector('#hero-quiz-feedback');
  container.querySelectorAll('.hero-option-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const isCorrect = btn === correctOpt;
      if (isCorrect) {
        sound.playCorrect();
        btn.classList.add('correct');
        feedback.style.color = 'var(--ha-success)';
        feedback.innerHTML = `<span style="display: inline-flex; align-items: center; gap: 6px;">${checkCircleIcon(16)} Correct! "Could you please..." is the polite way to ask.</span>`;
      } else {
        sound.playWrong();
        btn.style.borderColor = 'var(--ha-error)';
        btn.style.color = 'var(--ha-error)';
        feedback.style.color = 'var(--ha-error)';
        feedback.innerHTML = `<span style="display: inline-flex; align-items: center; gap: 6px;">${infoIcon(16)} Use "Could" for polite classroom requests: Could you please pass the salt?</span>`;
      }
      feedback.style.display = 'block';
    });
  });
}
