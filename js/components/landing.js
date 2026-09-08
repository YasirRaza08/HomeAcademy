// Home Academy Landing Page Component - Official Brand Identity & Real Class Flow
// Logo Presentation Source of Truth + Zero Fake Students

import { stateManager } from '../state.js';
import { sound } from '../audio.js';
import { getActiveTopics } from '../data/curriculum.js';
import { 
  bookIcon, schoolIcon, trophyIcon, gamepadIcon, keyIcon, usersIcon, 
  checkCircleIcon, infoIcon, roleplayIcon, sparkIcon, dashboardIcon, graduationCapIcon 
} from './icons.js';

export function renderLanding(container, onNavigate) {
  const currentStudent = stateManager.getCurrentStudent();
  const students = stateManager.getLeaderboard();
  const activeTopics = stateManager.getActiveCurriculum();

  container.innerHTML = `
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container hero-grid">
        <div class="hero-content">
          <div class="hero-brand-tag">
            <span class="ha-nav-icon" style="color: var(--ha-gold);">${sparkIcon(16)}</span> Official Online Learning Platform
          </div>
          <h1 class="hero-title">
            Learn English.<br>
            <span style="color: var(--ha-red);">Play.</span> 
            <span style="color: var(--ha-gold-dark);">Improve.</span>
          </h1>
          <p class="hero-subtitle">
            Welcome to the digital companion for the <strong>Home Academy English Language Program</strong> taught by <strong>Sir Zubair</strong>. 
            Master the 6 foundational grammar and speaking topics taught in class through daily drills, exercises, and interactive games.
          </p>
          <div class="hero-buttons">
            ${currentStudent ? `
              <button class="btn btn-primary btn-lg" id="landing-dash-btn" style="display: inline-flex; align-items: center; gap: 8px;">
                ${dashboardIcon(18)} GO TO MY DASHBOARD
              </button>
              <button class="btn btn-outline btn-lg" id="landing-topics-btn" style="display: inline-flex; align-items: center; gap: 8px;">
                ${bookIcon(18)} VIEW 6 TOPICS
              </button>
            ` : `
              <button class="btn btn-primary btn-lg" id="landing-login-btn" style="display: inline-flex; align-items: center; gap: 8px;">
                ${keyIcon(18)} STUDENT LOGIN
              </button>
              <button class="btn btn-secondary btn-lg" id="landing-join-btn" style="display: inline-flex; align-items: center; gap: 8px;">
                ${schoolIcon(18)} JOIN WITH CLASS CODE
              </button>
              <button class="btn btn-outline btn-lg" id="landing-explore-btn" style="display: inline-flex; align-items: center; gap: 8px;">
                ${bookIcon(18)} EXPLORE CURRICULUM
              </button>
            `}
          </div>
          <div class="hero-highlights">
            <div class="hero-highlight-item"><span style="color: var(--ha-navy);">${schoolIcon(16)}</span> Class Teacher: <strong>Sir Zubair</strong></div>
            <div class="hero-highlight-item"><span style="color: var(--ha-red);">${bookIcon(16)}</span> 6 Active Class Topics</div>
            <div class="hero-highlight-item"><span style="color: var(--ha-gold-dark);">${keyIcon(16)}</span> Class Code: <strong>HOME-ENGLISH</strong></div>
            <div class="hero-highlight-item"><span style="color: #059669;">${gamepadIcon(16)}</span> 6 Practice Activities</div>
          </div>
        </div>

        <!-- Official Logo & Active Student Hero Showcase Card -->
        <div class="hero-preview-card" style="text-align: center;">
          <div style="padding: 12px 0 20px;">
            <img src="assets/logo.png" alt="Home Academy English Language Program" 
              style="max-width: 240px; width: 100%; height: auto; object-fit: contain; margin: 0 auto; display: block; filter: drop-shadow(0 4px 12px rgba(10,37,88,0.1));" />
          </div>

          ${currentStudent ? `
            <div style="background: var(--ha-navy-subtle); border-radius: var(--radius-lg); padding: 18px; margin-bottom: 20px; text-align: left;">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
                <div style="display: flex; align-items: center; gap: 12px;">
                  <span style="font-size: 2.2rem; background: #fff; width: 48px; height: 48px; border-radius: var(--radius-pill); display: flex; align-items: center; justify-content: center; box-shadow: var(--ha-shadow-xs);">${currentStudent.avatar}</span>
                  <div>
                    <strong style="color: var(--ha-navy); font-size: 1.1rem;">${currentStudent.name}</strong>
                    <div style="font-size: 0.78rem; font-weight: 700; color: var(--ha-gold-dark);">Level ${currentStudent.level} Student</div>
                  </div>
                </div>
                <span class="badge badge-gold">${currentStudent.xp || 0} XP</span>
              </div>
              <div class="progress-container" style="height: 6px;">
                <div class="progress-bar-fill" style="width: ${Math.min(100, (currentStudent.xp || 0) % 500 / 5)}%;"></div>
              </div>
            </div>
          ` : `
            <div style="background: var(--ha-navy-subtle); border-radius: var(--radius-lg); padding: 18px; margin-bottom: 20px; text-align: center;">
              <div style="font-size: 0.85rem; font-weight: 800; color: var(--ha-navy); text-transform: uppercase; margin-bottom: 4px;">
                Private Classroom Platform • Sir Zubair
              </div>
              <p style="font-size: 0.88rem; color: var(--ha-text-muted); margin-bottom: 12px;">
                Taught by <strong>Sir Zubair</strong>. Enroll with your name & code:
              </p>
              <div style="display: inline-block; background: #FFFFFF; border: 2px dashed var(--ha-navy); padding: 6px 16px; border-radius: var(--radius-md); font-weight: 800; color: var(--ha-navy); font-size: 1.1rem; letter-spacing: 0.08em;">
                HOME-ENGLISH
              </div>
            </div>
          `}

          <!-- Live Sample Question from Topic 04: Whose -->
          <div class="hero-mini-quiz-card" style="text-align: left;">
            <div style="font-size: 0.75rem; font-weight: 800; color: var(--ha-red); text-transform: uppercase; margin-bottom: 6px; display: flex; align-items: center; gap: 6px;">
              <span>${sparkIcon(14)}</span> Quick Class Question (Whose)
            </div>
            <div class="hero-quiz-question">"Whose bag is this?" (Belongs to Tom)</div>
            <div class="hero-quiz-options">
              <button class="hero-option-btn" data-answer="Tom bag">Tom bag</button>
              <button class="hero-option-btn" data-answer="It is Tom's bag." id="hero-correct-opt">It is Tom's bag. ✓</button>
              <button class="hero-option-btn" data-answer="Bag of Tom">Bag of Tom</button>
              <button class="hero-option-btn" data-answer="Tom is bag">Tom is bag</button>
            </div>
            <div id="hero-quiz-feedback" style="display: none; margin-top: 10px; font-size: 0.85rem; font-weight: 700;"></div>
          </div>

          <div style="display: flex; align-items: center; justify-content: space-between; padding-top: 14px; border-top: 1px solid var(--ha-border); font-size: 0.85rem;">
            <span style="font-weight: 700; color: var(--ha-navy); display: inline-flex; align-items: center; gap: 6px;">
              ${usersIcon(16)} Joined Students: <strong>${students.length}</strong>
            </span>
            <button class="btn btn-secondary btn-sm" id="hero-open-app-btn">
              ${currentStudent ? 'Open Dashboard →' : 'Join Classroom →'}
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- The 6 Active Curriculum Topics Showcase -->
    <section style="padding: clamp(36px, 6vw, 70px) 0; background: #FFFFFF;">
      <div class="container">
        <div style="text-align: center; max-width: 680px; margin: 0 auto clamp(24px, 4vw, 50px);">
          <span class="badge badge-navy" style="margin-bottom: 12px;">Active Class Curriculum • Sir Zubair</span>
          <h2 style="font-size: clamp(1.6rem, 4vw, 2.2rem); margin-bottom: 14px; color: var(--ha-navy);">
            ${activeTopics.length > 0 ? `The ${activeTopics.length} Topics Taught in Class` : `Class Curriculum`}
          </h2>
          <p style="font-size: clamp(0.92rem, 2.5vw, 1.05rem); color: var(--ha-text-muted); line-height: 1.6;">
            Every topic taught by <strong>Sir Zubair</strong> has a dedicated 5-step learning path: Rule explanation, classroom examples, interactive practice, 5-question quiz, and real XP rewards!
          </p>
        </div>

        ${activeTopics.length === 0 ? `
          <div class="ha-card" style="padding: 40px 20px; text-align: center; max-width: 520px; margin: 0 auto; border-top: 4px solid var(--ha-navy);">
            <div style="display: flex; justify-content: center; margin-bottom: 10px; color: var(--ha-navy);">${bookIcon(42)}</div>
            <h3 style="font-size: 1.2rem; color: var(--ha-navy); margin-bottom: 8px;">Curriculum Under Update</h3>
            <p style="font-size: 0.9rem; color: var(--ha-text-muted); margin-bottom: 16px;">
              Sir Zubair is currently updating the active class curriculum. Check back shortly or join the practice games!
            </p>
          </div>
        ` : `
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr)); gap: 20px;">
            ${activeTopics.map(t => `
              <div class="ha-card" style="border-top: 5px solid ${t.color};">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                  <span style="font-size: 1.6rem; color: ${t.color};">${bookIcon(28)}</span>
                  <span class="badge badge-navy">Topic ${t.number}</span>
                </div>
                <h3 style="font-size: 1.25rem; color: var(--ha-navy); margin-bottom: 8px;">${t.title}</h3>
                <p style="font-size: 0.9rem; color: var(--ha-text-muted); margin-bottom: 16px; line-height: 1.5;">
                  ${t.subtitle}
                </p>
                <div style="border-top: 1px solid var(--ha-border); padding-top: 12px; display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-size: 0.8rem; font-weight: 700; color: ${t.color};">5-Step Master Path</span>
                  <span style="font-size: 0.85rem; font-weight: 800; color: var(--ha-gold-dark);">+50 XP</span>
                </div>
              </div>
            `).join('')}
          </div>

          <div style="text-align: center; margin-top: 36px;">
            <button class="btn btn-primary btn-lg" id="landing-curriculum-explore-btn">
              Explore All ${activeTopics.length} Class Topics →
            </button>
          </div>
        `}
      </div>
    </section>

    <!-- Why Home Academy Digital Companion -->
    <section style="padding: clamp(36px, 6vw, 70px) 0; background: var(--ha-bg);">
      <div class="container">
        <div style="text-align: center; max-width: 600px; margin: 0 auto 32px;">
          <span class="badge badge-gold" style="margin-bottom: 12px;">Student Experience</span>
          <h2 style="font-size: clamp(1.5rem, 4vw, 2rem); color: var(--ha-navy);">Built For Classroom Success</h2>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 250px), 1fr)); gap: 18px;">
          <div class="ha-card" style="text-align: center; padding: 26px 18px;">
            <div style="display: flex; justify-content: center; margin-bottom: 14px; color: var(--ha-red);">${bookIcon(42)}</div>
            <h3 style="font-size: 1.2rem; margin-bottom: 10px;">Zero Confusing Extras</h3>
            <p style="font-size: 0.92rem; color: var(--ha-text-muted);">
              Only the exact grammar and vocabulary lessons you learn in physical class. No irrelevant content.
            </p>
          </div>

          <div class="ha-card" style="text-align: center; padding: 32px 24px;">
            <div style="display: flex; justify-content: center; margin-bottom: 14px; color: var(--ha-gold);">${sparkIcon(42)}</div>
            <h3 style="font-size: 1.2rem; margin-bottom: 10px;">Daily 6-Topic Drill</h3>
            <p style="font-size: 0.92rem; color: var(--ha-text-muted);">
              A fresh 6-question quick drill drawn from all 6 active topics to keep your English sharp every single day.
            </p>
          </div>

          <div class="ha-card" style="text-align: center; padding: 26px 18px; border-top: 4px solid var(--ha-red);">
            <div style="display: flex; justify-content: center; margin-bottom: 14px; color: var(--ha-navy);">${roleplayIcon(42)}</div>
            <h3 style="font-size: 1.2rem; margin-bottom: 10px;">Roleplay Presentations</h3>
            <p style="font-size: 0.92rem; color: var(--ha-text-muted); margin-bottom: 16px;">
              Practice real conversations from your English class. Learn spoken expressions, create your own sentences, and build speaking confidence.
            </p>
            <button class="btn btn-primary btn-sm" id="landing-roleplays-btn">
              PRACTICE ROLEPLAYS →
            </button>
          </div>

          <div class="ha-card" style="text-align: center; padding: 32px 24px;">
            <div style="display: flex; justify-content: center; margin-bottom: 14px; color: var(--ha-gold-dark);">${trophyIcon(42)}</div>
            <h3 style="font-size: 1.2rem; margin-bottom: 10px;">Real Class Leaderboard</h3>
            <p style="font-size: 0.92rem; color: var(--ha-text-muted);">
              No fake or simulated students. Earn real XP through real practice and climb the classroom ranks.
            </p>
          </div>
        </div>
      </div>
    </section>
  `;

  // Attach event listeners
  container.querySelector('#landing-roleplays-btn')?.addEventListener('click', () => {
    sound.playClick();
    onNavigate('roleplays');
  });
  container.querySelector('#landing-dash-btn')?.addEventListener('click', () => {
    sound.playClick();
    onNavigate('dashboard');
  });

  container.querySelector('#landing-topics-btn')?.addEventListener('click', () => {
    sound.playClick();
    onNavigate('topics');
  });

  container.querySelector('#landing-login-btn')?.addEventListener('click', () => {
    sound.playClick();
    window.dispatchEvent(new CustomEvent('ha:open-join-modal', { detail: { tab: 'login' } }));
  });

  container.querySelector('#landing-join-btn')?.addEventListener('click', () => {
    sound.playClick();
    window.dispatchEvent(new CustomEvent('ha:open-join-modal', { detail: { tab: 'register' } }));
  });

  container.querySelector('#landing-explore-btn')?.addEventListener('click', () => {
    sound.playClick();
    onNavigate('topics');
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
        feedback.innerHTML = `<span style="display: inline-flex; align-items: center; gap: 6px;">${checkCircleIcon(16)} Correct! Genitive 's shows possession: It is Tom's bag.</span>`;
      } else {
        sound.playWrong();
        btn.style.borderColor = 'var(--ha-error)';
        btn.style.color = 'var(--ha-error)';
        feedback.style.color = 'var(--ha-error)';
        feedback.innerHTML = `<span style="display: inline-flex; align-items: center; gap: 6px;">${infoIcon(16)} Not quite. Rule: Use Tom's bag to show it belongs to Tom.</span>`;
      }
      feedback.style.display = 'block';
    });
  });
}