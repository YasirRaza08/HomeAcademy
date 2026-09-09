// Home Academy Main Application Controller - Official Class Program Architecture
import { stateManager } from './state.js';
import { sound } from './audio.js';
import { renderLanding } from './components/landing.js';
import { renderDashboard } from './components/dashboard.js';
import { renderCurriculumZone } from './components/curriculumZone.js';
import { renderGameCenter } from './components/gameCenter.js';
import { renderLeaderboard } from './components/leaderboard.js';
import { renderProfile } from './components/profile.js';
import { renderAdmin } from './components/admin.js';
import { setupAuthModal } from './components/auth.js';
import { renderFullTest } from './components/fullTest.js';
import { renderActivitiesHub } from './components/activitiesHub.js';
import { renderRoleplaysHub, renderRoleplayRunner } from './components/roleplayView.js';

class App {
  constructor() {
    this.currentRoute = 'home';
    this.container = document.getElementById('view-container');
    this.authModalContainer = document.getElementById('auth-modal-container');
    this.celebrationMount = document.getElementById('celebration-modal-mount');
  }

  init() {
    // Initialize Auth modal
    this.authModal = setupAuthModal(this.authModalContainer, (student, isReturning) => {
      this.updateNavbarUser();
      this.navigate('dashboard');
    });

    // Setup navbar & bottom nav
    this.setupNavigation();
    this.setupSoundToggle();
    this.setupGlobalEvents();

    // Dismiss loading screen
    setTimeout(() => {
      const loader = document.getElementById('ha-loading-screen');
      if (loader) {
        loader.classList.add('fade-out');
        setTimeout(() => loader.style.display = 'none', 500);
      }
    }, 1000);

    // Initial navigation: Auto-login returning student if session exists
    const student = stateManager.getCurrentStudent();
    if (student) {
      this.navigate('dashboard');
    } else {
      this.navigate('home');
    }
  }

  setupNavigation() {
    // Desktop items
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', async () => {
        sound.playClick();
        const route = item.dataset.route;
        if (route === 'admin' && !stateManager.state.isAdmin) {
          try {
            const isValid = await apiClient.adminGetMe();
            if (isValid) {
              stateManager.setAdmin(true);
              this.navigate('admin');
              return;
            }
          } catch (e) {}
          window.dispatchEvent(new CustomEvent('ha:open-join-modal', { detail: 'teacher' }));
          return;
        }
        this.navigate(route);
      });
    });

    // Mobile items
    document.querySelectorAll('.mobile-nav-item').forEach(item => {
      item.addEventListener('click', async () => {
        sound.playClick();
        const route = item.dataset.route;
        if (route === 'admin' && !stateManager.state.isAdmin) {
          try {
            const isValid = await apiClient.adminGetMe();
            if (isValid) {
              stateManager.setAdmin(true);
              this.navigate('admin');
              return;
            }
          } catch (e) {}
          window.dispatchEvent(new CustomEvent('ha:open-join-modal', { detail: 'teacher' }));
          return;
        }
        this.navigate(route);
      });
    });

    // Brand logo link to home
    document.getElementById('nav-brand-link')?.addEventListener('click', () => {
      sound.playClick();
      this.navigate('home');
    });

    // Navbar Login and Join Class buttons
    document.getElementById('nav-login-btn')?.addEventListener('click', () => {
      sound.playClick();
      window.dispatchEvent(new CustomEvent('ha:open-join-modal', { detail: { tab: 'login' } }));
    });

    document.getElementById('nav-join-btn')?.addEventListener('click', () => {
      sound.playClick();
      window.dispatchEvent(new CustomEvent('ha:open-join-modal', { detail: { tab: 'register' } }));
    });

    // User pill clicks to open student profile
    document.getElementById('nav-user-pill')?.addEventListener('click', () => {
      sound.playClick();
      this.navigate('profile');
    });

    // Scroll listener for dynamic navbar elevation
    window.addEventListener('scroll', () => {
      const navbar = document.querySelector('.ha-navbar');
      if (navbar) {
        navbar.classList.toggle('scrolled', window.scrollY > 12);
      }
    }, { passive: true });

    this.updateNavbarUser();
  }

  setupSoundToggle() {
    const soundBtn = document.getElementById('nav-sound-btn');
    if (!soundBtn) return;

    const updateBtnUI = () => {
      const muted = sound.isMuted();
      soundBtn.className = `audio-toggle-btn ${muted ? 'muted' : ''}`;
      soundBtn.innerHTML = `<span>${muted ? '🔇' : '🔊'}</span> <span class="sound-text">${muted ? 'Sound Off' : 'Sound On'}</span>`;
    };

    updateBtnUI();

    soundBtn.addEventListener('click', () => {
      sound.toggleMute();
      sound.playClick();
      updateBtnUI();
    });
  }

  updateNavbarUser() {
    const student = stateManager.getCurrentStudent();
    const userPill = document.getElementById('nav-user-pill');
    const authButtons = document.getElementById('nav-auth-buttons');
    const joinBtn = document.getElementById('nav-join-btn');

    if (student) {
      if (authButtons) authButtons.style.display = 'none';
      if (joinBtn) joinBtn.style.display = 'none';
      if (userPill) {
        userPill.style.display = 'flex';
        userPill.title = `Logged in as ${student.name} • Click to open Profile`;
        userPill.innerHTML = `
          <div class="user-nav-avatar">${student.avatar}</div>
          <div class="user-nav-name">${student.name}</div>
          <div class="user-nav-level">Lv.${student.level || 1} • ${student.xp || 0} XP</div>
        `;
      }
    } else {
      if (authButtons) authButtons.style.display = 'flex';
      if (joinBtn) joinBtn.style.display = 'inline-flex';
      if (userPill) userPill.style.display = 'none';
    }
  }

  triggerViewTransition() {
    if (!this.container) return;
    this.container.classList.remove('view-animated-entry');
    void this.container.offsetWidth;
    this.container.classList.add('view-animated-entry');
  }

  setupGlobalEvents() {
    window.addEventListener('ha:navigate', (e) => {
      this.navigate(e.detail);
    });

    window.addEventListener('ha:open-topic', (e) => {
      this.currentRoute = 'topics';
      this.updateActiveNavIndicators('topics');
      this.triggerViewTransition();
      renderCurriculumZone(this.container, (route) => this.navigate(route), e.detail);
      window.scrollTo(0, 0);
    });

    window.addEventListener('ha:launch-game', (e) => {
      this.currentRoute = 'games';
      this.updateActiveNavIndicators('games');
      this.triggerViewTransition();
      renderGameCenter(this.container, (route) => this.navigate(route), e.detail);
      window.scrollTo(0, 0);
    });

    window.addEventListener('ha:open-activity', (e) => {
      this.currentRoute = 'activities';
      this.updateActiveNavIndicators('activities');
      this.triggerViewTransition();
      const { topicId, activityType } = e.detail || {};
      renderActivitiesHub(this.container, (route) => this.navigate(route), topicId, activityType);
      window.scrollTo(0, 0);
    });

    window.addEventListener('ha:open-roleplay', (e) => {
      this.currentRoute = 'roleplays';
      this.updateActiveNavIndicators('roleplays');
      this.triggerViewTransition();
      const roleplayId = e.detail;
      renderRoleplayRunner(this.container, (route) => this.navigate(route), roleplayId);
      window.scrollTo(0, 0);
    });

    // Level up notification modal & session updates
    stateManager.subscribe((event, payload) => {
      if (event === 'LEVEL_UP') {
        this.showLevelUpModal(payload);
      } else if (event === 'ACHIEVEMENT_UNLOCKED') {
        this.showAchievementModal(payload);
      } else if (event === 'STUDENT_LOGGED_OUT') {
        this.updateNavbarUser();
        this.navigate('home');
      } else if (event === 'STUDENT_LOGGED_IN' || event === 'STUDENT_JOINED' || event === 'STUDENT_SWITCHED') {
        this.updateNavbarUser();
      }
      this.updateNavbarUser();
    });
  }

  showLevelUpModal({ student, oldLevel, newLevel }) {
    this.celebrationMount.innerHTML = `
      <div class="ha-modal-backdrop" id="levelup-backdrop">
        <div class="ha-modal-dialog" style="text-align: center; border-top: 6px solid var(--ha-gold);">
          <span style="font-size: 4.5rem; display: inline-block; animation: flameWiggle 1.5s infinite;">👑</span>
          <h2 style="font-size: 2.2rem; color: var(--ha-navy); margin: 10px 0;">LEVEL UP!</h2>
          <div class="badge badge-gold" style="font-size: 1.1rem; padding: 6px 18px; margin-bottom: 16px;">
            ${newLevel.icon} Level ${newLevel.level} — ${newLevel.title}
          </div>
          <p style="font-size: 1.05rem; color: var(--ha-text-muted); margin-bottom: 24px;">
            Congratulations, <strong>${student.name}</strong>! You leveled up to <strong>${newLevel.title}</strong>!
          </p>
          <button class="btn btn-primary btn-lg" id="close-levelup-btn">Continue Learning 🚀</button>
        </div>
      </div>
    `;

    this.celebrationMount.querySelector('#close-levelup-btn')?.addEventListener('click', () => {
      this.celebrationMount.innerHTML = '';
    });
  }

  showAchievementModal({ student, achievement }) {
    this.celebrationMount.innerHTML = `
      <div class="ha-modal-backdrop" id="ach-unlocked-backdrop">
        <div class="ha-modal-dialog" style="text-align: center; border-top: 6px solid var(--ha-red);">
          <span style="font-size: 4.5rem;">🌟</span>
          <h2 style="font-size: 2rem; color: var(--ha-navy); margin: 10px 0;">Badge Unlocked!</h2>
          <div style="font-size: 3rem; margin-bottom: 8px;">${achievement.icon}</div>
          <h3 style="font-size: 1.3rem; color: var(--ha-navy); margin-bottom: 6px;">${achievement.title}</h3>
          <p style="font-size: 0.95rem; color: var(--ha-text-muted); margin-bottom: 16px;">
            ${achievement.description}
          </p>
          <div class="badge badge-gold" style="margin-bottom: 20px;">
            +${achievement.xpReward} Bonus XP Added!
          </div>
          <div>
            <button class="btn btn-secondary" id="close-ach-btn">Awesome!</button>
          </div>
        </div>
      </div>
    `;

    this.celebrationMount.querySelector('#close-ach-btn')?.addEventListener('click', () => {
      this.celebrationMount.innerHTML = '';
    });
  }

  navigate(route) {
    this.currentRoute = route;
    this.updateActiveNavIndicators(route);
    this.triggerViewTransition();
    window.scrollTo(0, 0);

    const onNav = (target) => this.navigate(target);

    switch (route) {
      case 'home':
        renderLanding(this.container, onNav);
        break;
      case 'dashboard':
        renderDashboard(this.container, onNav);
        break;
      case 'topics':
      case 'curriculum':
      case 'vocabulary':
      case 'grammar':
      case 'listening':
      case 'speaking':
        renderCurriculumZone(this.container, onNav);
        break;
      case 'roleplays':
      case 'roleplay':
      case 'presentations':
        renderRoleplaysHub(this.container, onNav);
        break;
      case 'activities':
        renderActivitiesHub(this.container, onNav);
        break;
      case 'full-test':
      case 'test':
      case 'exam':
        renderFullTest(this.container, onNav);
        break;
      case 'games':
        renderGameCenter(this.container, onNav);
        break;
      case 'leaderboard':
        renderLeaderboard(this.container, onNav);
        break;
      case 'profile':
        renderProfile(this.container, onNav);
        break;
      case 'admin':
        if (!stateManager.state.isAdmin) {
          apiClient.adminGetMe().then(isValid => {
            if (isValid) {
              stateManager.setAdmin(true);
              renderAdmin(this.container, onNav);
            } else {
              this.navigate('home');
              window.dispatchEvent(new CustomEvent('ha:open-join-modal', { detail: 'teacher' }));
            }
          }).catch(() => {
            this.navigate('home');
            window.dispatchEvent(new CustomEvent('ha:open-join-modal', { detail: 'teacher' }));
          });
          return;
        }
        renderAdmin(this.container, onNav);
        break;
      default:
        renderLanding(this.container, onNav);
    }
  }

  updateActiveNavIndicators(route) {
    const matchRoute = ['vocabulary', 'grammar', 'listening', 'speaking', 'curriculum'].includes(route) ? 'topics' :
      ['roleplay', 'presentations'].includes(route) ? 'roleplays' : route;

    document.querySelectorAll('.nav-item').forEach(el => {
      el.classList.toggle('active', el.dataset.route === matchRoute);
    });

    document.querySelectorAll('.mobile-nav-item').forEach(el => {
      el.classList.toggle('active', el.dataset.route === matchRoute);
    });
  }
}

// Instantiate on DOM ready or immediately if document is already loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.init();
  });
} else {
  const app = new App();
  app.init();
}