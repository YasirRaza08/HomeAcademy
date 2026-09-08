// Home Academy Student Profile Component
// Displays Name, Email (private), Avatar, Level, XP, Streak, Achievements, Progress & Logout

import { stateManager } from '../state.js';
import { AVATARS } from '../data/initial-data.js';
import { getLevelInfo } from '../utils/helpers.js';
import { sound } from '../audio.js';

export function renderProfile(container, onNavigate) {
  const student = stateManager.getCurrentStudent();

  if (!student) {
    container.innerHTML = `
      <div class="container" style="padding-top: 50px; padding-bottom: 70px; text-align: center; max-width: 600px;">
        <div class="ha-card" style="padding: 40px 24px; border-top: 6px solid var(--ha-navy);">
          <span style="font-size: 3.5rem; display: block; margin-bottom: 12px;">👤</span>
          <h2 style="font-size: 1.8rem; color: var(--ha-navy); margin-bottom: 8px;">No Student Enrolled</h2>
          <p style="font-size: 0.95rem; color: var(--ha-text-muted); margin-bottom: 20px;">
            Please join the class with your name, email, and class code <strong>HOME-ENGLISH</strong> to access your profile.
          </p>
          <button class="btn btn-primary" id="profile-empty-join">Join Class Now</button>
        </div>
      </div>
    `;
    container.querySelector('#profile-empty-join')?.addEventListener('click', () => {
      sound.playClick();
      window.dispatchEvent(new CustomEvent('ha:open-join-modal'));
    });
    return;
  }

  const levelInfo = getLevelInfo(student.xp || 0);
  const totalQ = student.stats?.totalQuestions || 0;
  const correctQ = student.stats?.correctAnswers || 0;
  const accuracy = totalQ > 0 ? Math.round((correctQ / totalQ) * 100) : 0;
  const activeTopics = stateManager.getActiveCurriculum();
  const completedTopics = Object.values(student.topicProgress || {}).filter(p => p.passed || (p.quizScore && p.quizScore >= 80)).length;
  const overallPercent = activeTopics.length > 0 ? Math.round((completedTopics / activeTopics.length) * 100) : 0;

  container.innerHTML = `
    <div class="container" style="padding-top: 24px; padding-bottom: 60px; max-width: 820px;">
      
      <!-- Top Breadcrumb & Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 12px;">
        <div>
          <span class="badge badge-navy" style="margin-bottom: 6px;">Personal Student Account</span>
          <h1 style="font-size: 2.2rem; color: var(--ha-navy);">My Profile</h1>
          <p style="font-size: 0.92rem; color: var(--ha-text-muted);">
            Class: <strong>${stateManager.state.classInfo.name}</strong> • Class Teacher: <strong>${stateManager.state.classInfo.teacher || 'Sir Zubair'}</strong> • Code: <strong>${student.classCode || 'HOME-ENGLISH'}</strong>
          </p>
        </div>

        <div style="display: flex; gap: 10px;">
          <button class="btn btn-outline btn-sm" id="btn-profile-back-dash">
            ← Back to Dashboard
          </button>
          <button class="btn btn-secondary btn-sm" id="btn-profile-logout" style="background: var(--ha-red);">
            <span>🚪</span> Logout
          </button>
        </div>
      </div>

      <!-- Main Identity Card -->
      <div class="ha-card" style="padding: 32px; margin-bottom: 24px; border-top: 6px solid var(--ha-navy);">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 20px; margin-bottom: 24px;">
          <div style="display: flex; align-items: center; gap: 20px;">
            <div style="font-size: 3.8rem; width: 92px; height: 92px; border-radius: var(--radius-pill); background: var(--ha-navy-subtle); display: flex; align-items: center; justify-content: center; border: 3px solid var(--ha-navy); box-shadow: var(--ha-shadow-sm);">
              ${student.avatar}
            </div>
            <div>
              <h2 style="font-size: 1.85rem; color: var(--ha-navy); margin-bottom: 4px;">${student.name}</h2>
              <div style="font-size: 0.9rem; color: var(--ha-text-muted); margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
                <span>📧</span> <strong>${student.email || 'No email attached'}</strong>
                <span class="badge badge-navy" style="font-size: 0.7rem; padding: 2px 6px;">Private</span>
              </div>
              <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
                <span class="badge badge-gold">Level ${levelInfo.level} — ${levelInfo.title}</span>
                <span class="badge badge-red">🔥 ${student.streak || 0} Day Streak</span>
                <span style="font-size: 0.75rem; color: var(--ha-text-light);">ID: ${student.id}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Avatar Icon Selector -->
        <div style="padding: 16px 20px; background: #F8FAFC; border-radius: var(--radius-lg); margin-bottom: 24px; border: 1px solid var(--ha-border);">
          <div style="font-size: 0.82rem; font-weight: 700; color: var(--ha-navy); margin-bottom: 10px;">
            CHANGE YOUR AVATAR:
          </div>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            ${AVATARS.map(av => `
              <button class="profile-avatar-btn" data-av="${av}"
                style="font-size: 1.4rem; width: 44px; height: 44px; border-radius: var(--radius-md); border: 2px solid ${av === student.avatar ? 'var(--ha-navy)' : 'var(--ha-border)'}; background: ${av === student.avatar ? 'var(--ha-navy-subtle)' : '#FFF'}; cursor: pointer; transition: transform 0.15s;">
                ${av}
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Overall Progress Meter -->
        <div style="margin-bottom: 28px;">
          <div style="display: flex; justify-content: space-between; font-size: 0.88rem; font-weight: 700; color: var(--ha-navy); margin-bottom: 6px;">
            <span>Overall Curriculum Mastery (${completedTopics} / ${activeTopics.length} Topics)</span>
            <span style="color: var(--ha-gold-dark);">${overallPercent}%</span>
          </div>
          <div class="progress-container" style="height: 10px;">
            <div class="progress-bar-fill" style="width: ${overallPercent}%;"></div>
          </div>
        </div>

        <!-- Key Metrics Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 14px;">
          <div style="background: var(--ha-navy-subtle); padding: 16px; border-radius: var(--radius-md); text-align: center;">
            <div style="font-size: 0.75rem; font-weight: 700; color: var(--ha-text-muted);">TOTAL XP</div>
            <div style="font-size: 1.6rem; font-weight: 800; color: var(--ha-navy);">${student.xp || 0}</div>
          </div>
          <div style="background: var(--ha-navy-subtle); padding: 16px; border-radius: var(--radius-md); text-align: center;">
            <div style="font-size: 0.75rem; font-weight: 700; color: var(--ha-text-muted);">QUIZ ACCURACY</div>
            <div style="font-size: 1.6rem; font-weight: 800; color: var(--ha-success);">${accuracy}%</div>
          </div>
          <div style="background: var(--ha-navy-subtle); padding: 16px; border-radius: var(--radius-md); text-align: center;">
            <div style="font-size: 0.75rem; font-weight: 700; color: var(--ha-text-muted);">QUIZZES TAKEN</div>
            <div style="font-size: 1.6rem; font-weight: 800; color: var(--ha-red);">${student.stats?.quizzesTaken || 0}</div>
          </div>
          <div style="background: var(--ha-navy-subtle); padding: 16px; border-radius: var(--radius-md); text-align: center;">
            <div style="font-size: 0.75rem; font-weight: 700; color: var(--ha-text-muted);">GAMES PLAYED</div>
            <div style="font-size: 1.6rem; font-weight: 800; color: var(--ha-gold-dark);">${student.stats?.gamesPlayed || 0}</div>
          </div>
        </div>
      </div>

      <!-- Unlocked Badges & Achievements -->
      <div class="ha-card" style="padding: 28px; margin-bottom: 24px;">
        <h3 style="font-size: 1.25rem; color: var(--ha-navy); margin-bottom: 16px;">
          Achievements & Badges (${student.unlockedAchievements?.length || 0})
        </h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px;">
          ${(stateManager.state.achievements || []).map(ach => {
            const isUnlocked = student.unlockedAchievements?.includes(ach.id);
            return `
              <div style="padding: 14px; border-radius: var(--radius-md); border: 1.5px solid ${isUnlocked ? 'var(--ha-gold)' : 'var(--ha-border)'}; background: ${isUnlocked ? 'var(--ha-gold-light)' : '#F8FAFC'}; opacity: ${isUnlocked ? '1' : '0.55'}; display: flex; align-items: center; gap: 12px;">
                <span style="font-size: 2rem;">${ach.icon}</span>
                <div>
                  <div style="font-size: 0.92rem; font-weight: 800; color: var(--ha-navy);">${ach.title}</div>
                  <div style="font-size: 0.75rem; color: var(--ha-text-muted);">${ach.description}</div>
                  ${isUnlocked ? `<span style="font-size: 0.72rem; font-weight: 800; color: var(--ha-gold-dark);">+${ach.xpReward} XP Unlocked</span>` : ''}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Account Settings & Logout -->
      <div class="ha-card" style="padding: 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; border: 1px solid var(--ha-border);">
        <div>
          <h4 style="font-size: 1.05rem; color: var(--ha-navy); margin-bottom: 2px;">Session Management</h4>
          <p style="font-size: 0.85rem; color: var(--ha-text-muted);">
            Logging out will end your current session on this device. You can log back in anytime using your email.
          </p>
        </div>
        <button class="btn btn-outline" id="btn-settings-logout" style="color: var(--ha-red); border-color: var(--ha-red); font-weight: 700;">
          <span>🚪</span> Logout of Account
        </button>
      </div>

    </div>
  `;

  // Avatar switcher
  container.querySelectorAll('.profile-avatar-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const newAv = btn.dataset.av;
      stateManager.updateAvatar(newAv);
      sound.playClick();
      renderProfile(container, onNavigate);
    });
  });

  // Navigation
  container.querySelector('#btn-profile-back-dash')?.addEventListener('click', () => {
    sound.playClick();
    onNavigate('dashboard');
  });

  // Logout Handlers
  const handleLogout = () => {
    sound.playClick();
    if (confirm(`Log out of ${student.name}'s account? You will need your email and password to log back in.`)) {
      stateManager.logout();
      onNavigate('home');
    }
  };

  container.querySelector('#btn-profile-logout')?.addEventListener('click', handleLogout);
  container.querySelector('#btn-settings-logout')?.addEventListener('click', handleLogout);
}