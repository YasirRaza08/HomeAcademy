// Home Academy Admin / Teacher Organizer Panel
// 11 Core Management Sections, Real-Time Notifications & Student Dossier Modal
// Strictly for Home Academy English Language Program (Sir Zubair)

import { stateManager } from '../state.js';
import { sound } from '../audio.js';
import { AVATARS } from '../data/initial-data.js';
import { apiClient } from '../services/apiClient.js';
import {
  lockIcon,
  trashIcon,
  pencilIcon,
  plusIcon,
  refreshIcon,
  usersIcon,
  bookIcon,
  sparkIcon,
  schoolIcon,
  roleplayIcon,
  checkIcon
} from './icons.js';

let currentAdminTab = 'overview';

export async function renderAdmin(container, onNavigate) {
  // Password protection check
  if (!stateManager.state.isAdmin) {
    if (onNavigate) onNavigate('home');
    window.dispatchEvent(new CustomEvent('ha:open-join-modal', { detail: 'teacher' }));
    return;
  }

  // Fetch real students roster and test results from database
  let testSummary = {
    totalStudents: 0,
    testsCompleted: 0,
    averageScore: 0,
    highestScore: 0
  };
  let testAttempts = [];
  try {
    const [rosterRes, testResultsRes] = await Promise.all([
      apiClient.adminGetRoster().catch(() => null),
      apiClient.adminGetTestResults().catch(() => null)
    ]);
    if (rosterRes && Array.isArray(rosterRes.students)) {
      stateManager.state.students = rosterRes.students.map(s => ({ ...s }));
    }
    if (testResultsRes && testResultsRes.stats) {
      testSummary = testResultsRes.stats;
      testAttempts = testResultsRes.attempts || [];
    }
  } catch (e) {}

  const classInfo = stateManager.state.classInfo || { name: 'Home Academy: English Language Program', code: 'HOME-ENGLISH', teacher: 'Sir Zubair' };
  const students = stateManager.state.students || [];
  const curriculumTopics = stateManager.state.curriculumTopics || [];
  const roleplays = stateManager.state.roleplays || [];

  // Fetch real notifications from database
  let notifications = [];
  try {
    const notifRes = await apiClient.adminGetNotifications(25);
    if (notifRes && notifRes.notifications) {
      notifications = notifRes.notifications;
    }
  } catch (e) {}

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const totalStudents = students.length;
  const totalClassXP = students.reduce((sum, s) => sum + (s.xp || 0), 0);
  const activeTopicsCount = curriculumTopics.filter(t => t.active !== false).length;

  container.innerHTML = `
    <div class="container" style="padding-top: 24px; padding-bottom: 60px; max-width: 1100px;">
      
      <!-- Admin Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 14px;">
        <div>
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 6px;">
            <span class="badge badge-red">Class Teacher: ${classInfo.teacher || 'Sir Zubair'}</span>
            <span class="badge badge-navy">Class Code: ${classInfo.code}</span>
            ${unreadCount > 0 ? `<span class="badge" style="background: #ef4444; color: #fff; font-weight: 800;">🔔 ${unreadCount} New Notification${unreadCount > 1 ? 's' : ''}</span>` : ''}
          </div>
          <h1 style="font-size: 2rem; color: var(--ha-navy); margin: 0 0 4px;">Faculty Management Console</h1>
          <p style="font-size: 0.92rem; color: var(--ha-text-muted); margin: 0;">
            Managing <strong>${classInfo.name}</strong> • Real database persistence & live student telemetry
          </p>
        </div>

        <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
          <button class="btn btn-primary btn-sm" id="admin-switch-dash">
            View Student Dashboard →
          </button>

          <!-- Professional Teacher/Admin Account Menu (Section 21) -->
          <div style="position: relative;" id="admin-account-menu-wrapper">
            <button id="admin-account-btn" type="button" class="btn btn-outline btn-sm"
              style="display: inline-flex; align-items: center; gap: 8px; background: #fff; border: 1.5px solid var(--ha-border); border-radius: var(--radius-md); padding: 5px 12px; cursor: pointer;">
              <span style="font-size: 1.1rem;">👨‍🏫</span>
              <div style="text-align: left; line-height: 1.15;">
                <div style="font-size: 0.82rem; font-weight: 800; color: var(--ha-navy);">${classInfo.teacher || 'Sir Zubair'}</div>
                <div style="font-size: 0.68rem; color: var(--ha-text-muted);">Teacher / Admin</div>
              </div>
              <span style="font-size: 0.65rem; color: var(--ha-text-muted); margin-left: 2px;">▼</span>
            </button>

            <!-- Dropdown Popover -->
            <div id="admin-account-dropdown" style="display: none; position: absolute; right: 0; top: calc(100% + 6px); width: 220px; background: #ffffff; border: 1.5px solid var(--ha-border); border-radius: var(--radius-md); box-shadow: 0 10px 25px -5px rgba(0,0,0,0.15); z-index: 1000; overflow: hidden; padding: 4px 0;">
              <div style="padding: 10px 14px; background: #f8fafc; border-bottom: 1px solid var(--ha-border);">
                <div style="font-weight: 800; font-size: 0.86rem; color: var(--ha-navy); display: flex; align-items: center; gap: 6px;">
                  <span>👤</span> ${classInfo.teacher || 'Sir Zubair'}
                </div>
                <div style="font-size: 0.72rem; color: var(--ha-text-muted); margin-top: 2px;">Teacher / Admin Portal</div>
              </div>
              <button type="button" class="admin-drop-btn" id="menu-go-security" style="width: 100%; display: flex; align-items: center; gap: 8px; padding: 8px 14px; border: none; background: transparent; cursor: pointer; font-size: 0.82rem; font-weight: 700; color: var(--ha-navy); text-align: left;">
                <span>⚙️</span> Security
              </button>
              <button type="button" class="admin-drop-btn" id="menu-go-changepass" style="width: 100%; display: flex; align-items: center; gap: 8px; padding: 8px 14px; border: none; background: transparent; cursor: pointer; font-size: 0.82rem; font-weight: 700; color: var(--ha-navy); text-align: left;">
                <span>🔑</span> Change Password
              </button>
              <div style="height: 1px; background: var(--ha-border); margin: 3px 0;"></div>
              <button type="button" class="admin-drop-btn text-danger" id="menu-logout-all" style="width: 100%; display: flex; align-items: center; gap: 8px; padding: 8px 14px; border: none; background: transparent; cursor: pointer; font-size: 0.82rem; font-weight: 700; color: var(--ha-red); text-align: left;">
                <span>📱</span> Log out of all devices
              </button>
              <button type="button" class="admin-drop-btn text-danger" id="menu-admin-logout" style="width: 100%; display: flex; align-items: center; gap: 8px; padding: 8px 14px; border: none; background: transparent; cursor: pointer; font-size: 0.82rem; font-weight: 700; color: var(--ha-red); text-align: left;">
                <span>🚪</span> Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 11-Section Secondary Navigation Bar -->
      <div class="admin-tab-bar">
        <button class="admin-tab-btn ${currentAdminTab === 'overview' ? 'active' : ''}" data-tab="overview">📊 Overview</button>
        <button class="admin-tab-btn ${currentAdminTab === 'students' ? 'active' : ''}" data-tab="students">👥 Students (${totalStudents})</button>
        <button class="admin-tab-btn ${currentAdminTab === 'curriculum' ? 'active' : ''}" data-tab="curriculum">📚 Curriculum (${activeTopicsCount})</button>
        <button class="admin-tab-btn ${currentAdminTab === 'questions' ? 'active' : ''}" data-tab="questions">❓ Questions</button>
        <button class="admin-tab-btn ${currentAdminTab === 'quizzes' ? 'active' : ''}" data-tab="quizzes">📝 Quizzes</button>
        <button class="admin-tab-btn ${currentAdminTab === 'activities' ? 'active' : ''}" data-tab="activities">🎮 Activities</button>
        <button class="admin-tab-btn ${currentAdminTab === 'roleplays' ? 'active' : ''}" data-tab="roleplays">🎭 Roleplays (${roleplays.length})</button>
        <button class="admin-tab-btn ${currentAdminTab === 'messages' ? 'active' : ''}" data-tab="messages">💬 Messages</button>
        <button class="admin-tab-btn ${currentAdminTab === 'leaderboard' ? 'active' : ''}" data-tab="leaderboard">🏆 Leaderboard</button>
        <button class="admin-tab-btn ${currentAdminTab === 'notifications' ? 'active' : ''}" data-tab="notifications">🔔 Notifications ${unreadCount > 0 ? `(${unreadCount})` : ''}</button>
        <button class="admin-tab-btn ${currentAdminTab === 'settings' ? 'active' : ''}" data-tab="settings">⚙️ Settings</button>
        <button class="admin-tab-btn ${currentAdminTab === 'security' ? 'active' : ''}" data-tab="security">🔒 Security</button>
      </div>

      <!-- Tab Content Area -->
      <div id="admin-tab-content"></div>

      <!-- Student Detail Modal Mount -->
      <div id="student-dossier-modal-container"></div>
    </div>
  `;

  // Inject tab styling if not present
  if (!document.getElementById('admin-tab-styles')) {
    const style = document.createElement('style');
    style.id = 'admin-tab-styles';
    style.textContent = `
      .admin-tab-bar {
        display: flex;
        gap: 6px;
        overflow-x: auto;
        padding: 8px;
        background: #ffffff;
        border: 1.5px solid var(--ha-border);
        border-radius: var(--radius-lg);
        margin-bottom: 24px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
        scrollbar-width: none;
        -ms-overflow-style: none;
      }
      .admin-tab-bar::-webkit-scrollbar {
        display: none;
      }
      .admin-tab-btn {
        padding: 9px 16px;
        background: transparent;
        border: none;
        border-radius: var(--radius-md);
        font-size: 0.86rem;
        font-weight: 700;
        color: var(--ha-text-muted);
        cursor: pointer;
        white-space: nowrap;
        transition: all 0.15s ease;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        flex-shrink: 0;
      }
      .admin-tab-btn:hover {
        background: var(--ha-navy-subtle);
        color: var(--ha-navy);
      }
      .admin-tab-btn.active {
        background: var(--ha-navy);
        color: #fff;
        box-shadow: 0 2px 8px rgba(10, 37, 88, 0.25);
      }
      .admin-table {
        width: 100%;
        border-collapse: collapse;
        text-align: left;
        font-size: 0.9rem;
      }
      .admin-table th {
        background: var(--ha-navy-subtle);
        padding: 13px 16px;
        color: var(--ha-navy);
        font-weight: 800;
        font-size: 0.8rem;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        border-bottom: 2px solid var(--ha-border);
        white-space: nowrap;
        vertical-align: middle;
      }
      .admin-table td {
        padding: 14px 16px;
        border-bottom: 1px solid var(--ha-border);
        vertical-align: middle;
      }
      .admin-table tbody tr {
        transition: background 0.15s ease;
      }
      .admin-table tbody tr:hover {
        background: #f8fafc;
      }
      .admin-level-badge {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 4px 12px;
        border-radius: 9999px;
        background: var(--ha-navy-subtle);
        color: var(--ha-navy);
        font-size: 0.72rem;
        font-weight: 800;
        letter-spacing: 0.03em;
        text-transform: uppercase;
        white-space: nowrap;
      }
      .admin-actions-cell {
        display: inline-flex;
        align-items: center;
        justify-content: flex-end;
        gap: 6px;
        white-space: nowrap;
      }
      .admin-actions-cell button {
        margin: 0 !important;
      }
    `;
    document.head.appendChild(style);
  }

  // Setup tab switcher
  const tabContent = container.querySelector('#admin-tab-content');
  const switchTab = (tab) => {
    currentAdminTab = tab;
    const currentStudents = stateManager.state.students || [];
    const currentClassXP = currentStudents.reduce((sum, s) => sum + (s.xp || 0), 0);
    container.querySelectorAll('.admin-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tab);
    });
    renderActiveTab(tab, tabContent, container, onNavigate, {
      students: currentStudents,
      classInfo,
      curriculumTopics,
      roleplays,
      notifications,
      totalStudents: currentStudents.length,
      totalClassXP: currentClassXP,
      activeTopicsCount,
      testSummary,
      testAttempts
    });
  };

  container.querySelectorAll('.admin-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      sound.playClick();
      switchTab(btn.dataset.tab);
    });
  });

  // Render initial active tab
  switchTab(currentAdminTab);

  // Header button & dropdown handlers
  const accountBtn = container.querySelector('#admin-account-btn');
  const accountDropdown = container.querySelector('#admin-account-dropdown');

  accountBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    sound.playClick();
    if (accountDropdown) {
      accountDropdown.style.display = accountDropdown.style.display === 'block' ? 'none' : 'block';
    }
  });

  document.addEventListener('click', () => {
    if (accountDropdown) accountDropdown.style.display = 'none';
  });

  accountDropdown?.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  container.querySelector('#menu-go-security')?.addEventListener('click', () => {
    sound.playClick();
    if (accountDropdown) accountDropdown.style.display = 'none';
    switchTab('security');
  });

  container.querySelector('#menu-go-changepass')?.addEventListener('click', () => {
    sound.playClick();
    if (accountDropdown) accountDropdown.style.display = 'none';
    switchTab('security');
    setTimeout(() => {
      container.querySelector('#sec-curr-pass')?.focus();
    }, 100);
  });

  container.querySelector('#menu-admin-logout')?.addEventListener('click', async () => {
    sound.playClick();
    if (accountDropdown) accountDropdown.style.display = 'none';
    await stateManager.logoutAdmin();
    if (onNavigate) onNavigate('home');
    window.dispatchEvent(new CustomEvent('ha:open-join-modal', { detail: 'teacher' }));
  });

  container.querySelector('#menu-logout-all')?.addEventListener('click', () => {
    sound.playClick();
    if (accountDropdown) accountDropdown.style.display = 'none';
    showLogoutAllModal();
  });

  function showLogoutAllModal() {
    let modal = document.getElementById('ha-logout-all-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'ha-logout-all-modal';
      modal.innerHTML = `
        <div class="ha-modal-backdrop" id="logout-all-backdrop" style="position: fixed; inset: 0; background: rgba(10, 37, 88, 0.6); z-index: 9999; display: flex; align-items: center; justify-content: center;">
          <div class="ha-modal-dialog" style="max-width: 440px; width: 92%; background: #fff; border-radius: var(--radius-lg); padding: 26px; text-align: center; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.2);">
            <div style="font-size: 2.5rem; margin-bottom: 8px;">📱</div>
            <h3 style="font-size: 1.25rem; color: var(--ha-navy); margin: 0 0 8px; font-weight: 800;">Log out from all other devices?</h3>
            <p style="font-size: 0.88rem; color: var(--ha-text-muted); margin: 0 0 22px; line-height: 1.45;">
              This will revoke all active teacher sessions across all browsers and devices. You will need to log in again.
            </p>
            <div style="display: flex; gap: 10px; justify-content: center;">
              <button type="button" class="btn btn-outline" id="btn-cancel-logout-all" style="flex: 1; padding: 10px; font-weight: 700;">Cancel</button>
              <button type="button" class="btn btn-secondary" id="btn-confirm-logout-all" style="flex: 1; padding: 10px; font-weight: 800; background: var(--ha-red); border-color: var(--ha-red);">Confirm Logout</button>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(modal);

      modal.querySelector('#btn-cancel-logout-all')?.addEventListener('click', () => {
        modal.style.display = 'none';
      });

      modal.querySelector('#logout-all-backdrop')?.addEventListener('click', (e) => {
        if (e.target.id === 'logout-all-backdrop') modal.style.display = 'none';
      });

      modal.querySelector('#btn-confirm-logout-all')?.addEventListener('click', async () => {
        modal.style.display = 'none';
        await stateManager.logoutAdminAllDevices();
        if (onNavigate) onNavigate('home');
        window.dispatchEvent(new CustomEvent('ha:open-join-modal', { detail: 'teacher' }));
      });
    }
    modal.style.display = 'block';
  }

  container.querySelector('#admin-switch-dash')?.addEventListener('click', () => {
    sound.playClick();
    if (onNavigate) onNavigate('dashboard');
  });

  // Real-time synchronization: Update faculty console when any student earns XP or joins
  const unsubAdmin = stateManager.subscribe((event) => {
    if (!container.isConnected) {
      if (unsubAdmin) unsubAdmin();
      return;
    }
    if (event === 'LEADERBOARD_UPDATED' || event === 'STUDENT_UPDATED' || event === 'STUDENT_JOINED' || event === 'XP_GAINED') {
      switchTab(currentAdminTab);
    }
  });
}

/**
 * Render the chosen tab content
 */
async function renderActiveTab(tab, contentMount, mainContainer, onNavigate, data) {
  const { students, classInfo, curriculumTopics, roleplays, notifications, totalStudents, totalClassXP, activeTopicsCount, testSummary, testAttempts } = data;

  switch (tab) {
    case 'overview':
      renderOverviewTab(contentMount, { totalStudents, totalClassXP, activeTopicsCount, students, notifications, testSummary });
      break;
    case 'students':
      renderStudentsTab(contentMount, mainContainer, students, classInfo);
      break;
    case 'curriculum':
      renderCurriculumTab(contentMount, curriculumTopics, mainContainer, onNavigate);
      break;
    case 'questions':
      renderQuestionsTab(contentMount, curriculumTopics);
      break;
    case 'quizzes':
      renderQuizzesTab(contentMount, curriculumTopics, students, testSummary, testAttempts);
      break;
    case 'activities':
      renderActivitiesTab(contentMount, curriculumTopics, students);
      break;
    case 'roleplays':
      renderRoleplaysTab(contentMount, roleplays, mainContainer, onNavigate);
      break;
    case 'messages':
      renderMessagesTab(contentMount);
      break;
    case 'leaderboard':
      renderLeaderboardTab(contentMount, students);
      break;
    case 'notifications':
      renderNotificationsTab(contentMount, notifications, mainContainer);
      break;
    case 'settings':
      renderSettingsTab(contentMount, classInfo);
      break;
    case 'security':
      renderSecurityTab(contentMount);
      break;
    default:
      renderOverviewTab(contentMount, data);
  }
}

// --------------------------------------------------------------------------
// 1. OVERVIEW TAB
// --------------------------------------------------------------------------
function renderOverviewTab(mount, { totalStudents, totalClassXP, activeTopicsCount, students, notifications, testSummary }) {
  const summary = testSummary || {};
  const recentNotifications = (notifications || []).slice(0, 5);

  mount.innerHTML = `
    <!-- 4 Primary Summary Cards -->
    <div style="font-size: 0.85rem; font-weight: 800; color: var(--ha-navy); text-transform: uppercase; margin-bottom: 12px; letter-spacing: 0.04em;">
      Classroom Performance Overview:
    </div>

    <div class="stats-grid" style="grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 16px; margin-bottom: 24px;">
      <div class="stat-pill-card">
        <div class="stat-icon-bubble navy">${usersIcon(22)}</div>
        <div class="stat-content">
          <div class="stat-label">TOTAL STUDENTS</div>
          <div class="stat-value">${summary.totalStudents !== undefined ? summary.totalStudents : totalStudents} Enrolled</div>
          <div style="font-size: 0.75rem; color: var(--ha-text-muted);">Real persistent student accounts</div>
        </div>
      </div>

      <div class="stat-pill-card">
        <div class="stat-icon-bubble gold" style="font-size: 1.25rem;">📝</div>
        <div class="stat-content">
          <div class="stat-label">TESTS COMPLETED</div>
          <div class="stat-value">${summary.testsCompleted || 0} Attempts</div>
          <div style="font-size: 0.75rem; color: var(--ha-text-muted);">From quizzes & grammar tests</div>
        </div>
      </div>

      <div class="stat-pill-card">
        <div class="stat-icon-bubble navy" style="color: var(--ha-success); font-size: 1.25rem;">🎯</div>
        <div class="stat-content">
          <div class="stat-label">AVERAGE SCORE</div>
          <div class="stat-value" style="color: var(--ha-success);">${summary.averageScore || 0}%</div>
          <div style="font-size: 0.75rem; color: var(--ha-text-muted);">Overall class accuracy</div>
        </div>
      </div>

      <div class="stat-pill-card">
        <div class="stat-icon-bubble red" style="color: var(--ha-gold-dark); font-size: 1.25rem;">🏆</div>
        <div class="stat-content">
          <div class="stat-label">HIGHEST SCORE</div>
          <div class="stat-value" style="color: var(--ha-gold-dark);">${summary.highestScore || 0}%</div>
          <div style="font-size: 0.75rem; color: var(--ha-text-muted);">Top test score attained</div>
        </div>
      </div>
    </div>

    <!-- Secondary Telemetry Badges -->
    <div style="display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 24px;">
      <div style="background: #F8FAFC; border: 1.5px solid var(--ha-border); padding: 10px 18px; border-radius: var(--radius-md); display: flex; align-items: center; gap: 10px;">
        <span style="font-size: 1.2rem;">⚡</span>
        <div>
          <div style="font-size: 0.7rem; font-weight: 800; color: var(--ha-text-muted); text-transform: uppercase;">TOTAL CLASS XP</div>
          <strong style="color: var(--ha-navy); font-size: 1.1rem;">${totalClassXP} XP</strong>
        </div>
      </div>

      <div style="background: #F8FAFC; border: 1.5px solid var(--ha-border); padding: 10px 18px; border-radius: var(--radius-md); display: flex; align-items: center; gap: 10px;">
        <span style="font-size: 1.2rem;">📚</span>
        <div>
          <div style="font-size: 0.7rem; font-weight: 800; color: var(--ha-text-muted); text-transform: uppercase;">ACTIVE TOPICS</div>
          <strong style="color: var(--ha-navy); font-size: 1.1rem;">${activeTopicsCount} Topics Active</strong>
        </div>
      </div>
    </div>

    <!-- Live Activity & Notification Feed -->
    <div class="ha-card" style="padding: 24px; margin-bottom: 24px; border-top: 4px solid var(--ha-navy);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
        <h3 style="margin: 0; font-size: 1.15rem; color: var(--ha-navy);">🔔 Live Classroom Notification Feed</h3>
        <span class="badge badge-gold" style="font-size: 0.75rem;">Real-Time Database Stream</span>
      </div>

      ${recentNotifications.length === 0 ? `
        <p style="font-size: 0.9rem; color: var(--ha-text-muted); margin: 0; padding: 16px; text-align: center; background: #f8fafc; border-radius: var(--radius-md);">
          No notifications recorded yet. When students join or complete milestones, live alerts appear here automatically.
        </p>
      ` : `
        <div style="display: flex; flex-direction: column; gap: 10px;">
          ${recentNotifications.map(n => `
            <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px 14px; background: #f8fafc; border-radius: var(--radius-md); border-left: 4px solid ${n.type === 'new_student' ? 'var(--ha-navy)' : 'var(--ha-gold)'};">
              <div>
                <strong style="color: var(--ha-navy); font-size: 0.92rem; display: block;">${n.title}</strong>
                <span style="font-size: 0.85rem; color: var(--ha-text-muted);">${n.message}</span>
              </div>
              <span style="font-size: 0.75rem; color: var(--ha-text-muted); white-space: nowrap;">${new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          `).join('')}
        </div>
      `}
    </div>
  `;
}

// --------------------------------------------------------------------------
// 2. STUDENTS TAB & DOSSIER MODAL
// --------------------------------------------------------------------------
function renderStudentsTab(mount, mainContainer, students, classInfo) {
  mount.innerHTML = `
    <div class="ha-card" style="padding: 24px; border-top: 4px solid var(--ha-navy);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 14px;">
        <div>
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 4px;">
            <h2 style="font-size: 1.3rem; color: var(--ha-navy); margin: 0;">Enrolled Student Roster</h2>
            <span class="badge badge-navy" style="font-size: 0.75rem;">${students.length} Total</span>
          </div>
          <p style="font-size: 0.88rem; color: var(--ha-text-muted); margin: 0;">
            Click any student row or "View Dossier" to inspect full audit history, quiz results, and roleplay telemetry.
          </p>
        </div>

        <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
          <input type="text" id="admin-student-search-input" placeholder="🔍 Search by student name or email..." style="padding: 7px 14px; border: 1.5px solid var(--ha-border); border-radius: var(--radius-md); font-size: 0.88rem; min-width: 260px;" />
          <button class="btn btn-outline btn-sm" id="btn-export-csv" style="display: inline-flex; align-items: center; gap: 6px;">
            <span>📥</span> Export CSV
          </button>
          <button class="btn btn-primary btn-sm" id="btn-admin-add-student-modal" style="display: inline-flex; align-items: center; gap: 6px;">
            <span>➕</span> Enroll Student
          </button>
        </div>
      </div>

      ${students.length === 0 ? `
        <div style="padding: 48px 20px; text-align: center; background: #f8fafc; border-radius: var(--radius-lg); border: 1.5px dashed var(--ha-border);">
          <span style="font-size: 2.5rem; display: inline-block; margin-bottom: 8px;">👥</span>
          <strong style="font-size: 1.1rem; color: var(--ha-navy); display: block; margin-bottom: 6px;">No students enrolled yet</strong>
          <p style="font-size: 0.9rem; color: var(--ha-text-muted); max-width: 450px; margin: 0 auto;">
            Students will automatically appear here the instant they join with Class Code <strong>${classInfo.code}</strong>.
          </p>
        </div>
      ` : `
        <div class="table-responsive-wrapper" style="overflow-x: auto; border: 1.5px solid var(--ha-border); border-radius: var(--radius-lg); box-shadow: 0 1px 3px rgba(0,0,0,0.03);">
          <table class="admin-table">
            <thead>
              <tr>
                <th style="min-width: 170px;">Student</th>
                <th style="min-width: 210px;">Email</th>
                <th style="text-align: center; min-width: 100px;">XP</th>
                <th style="text-align: center; min-width: 150px;">Level Title</th>
                <th style="text-align: center; min-width: 90px;">Streak</th>
                <th style="text-align: center; min-width: 120px;">Roleplay %</th>
                <th style="text-align: right; min-width: 210px;">Actions</th>
              </tr>
            </thead>
            <tbody>
              ${students.map(s => `
                <tr class="student-row" data-id="${s.id}" style="cursor: pointer;">
                  <td style="white-space: nowrap; font-weight: 700; color: var(--ha-navy);">
                    <div style="display: inline-flex; align-items: center; gap: 10px;">
                      <span style="font-size: 1.35rem; line-height: 1; flex-shrink: 0;">${s.avatar || '🦁'}</span>
                      <span style="white-space: nowrap;">${s.name}</span>
                    </div>
                  </td>
                  <td style="white-space: nowrap; color: var(--ha-text-muted); font-size: 0.85rem;" title="${s.email || ''}">
                    ${s.email || 'N/A'}
                  </td>
                  <td style="text-align: center; white-space: nowrap;">
                    <span style="font-weight: 800; color: #b45309; font-variant-numeric: tabular-nums;">⚡ ${s.xp || 0} XP</span>
                  </td>
                  <td style="text-align: center; white-space: nowrap;">
                    <span class="admin-level-badge">${s.levelTitle || `Level ${s.level || 1}`}</span>
                  </td>
                  <td style="text-align: center; white-space: nowrap; font-weight: 700; color: var(--ha-navy);">
                    🔥 ${s.streak || 0}d
                  </td>
                  <td style="text-align: center; white-space: nowrap;">
                    <div style="display: inline-flex; align-items: center; gap: 6px; justify-content: center;">
                      <div style="width: 44px; height: 6px; background: #e2e8f0; border-radius: 999px; overflow: hidden; display: inline-block;">
                        <div style="width: ${Math.min(100, s.roleplayProgressPercent || 0)}%; height: 100%; background: var(--ha-gold); border-radius: 999px;"></div>
                      </div>
                      <span style="font-size: 0.8rem; font-weight: 700; color: var(--ha-navy); min-width: 28px;">${s.roleplayProgressPercent || 0}%</span>
                    </div>
                  </td>
                  <td style="text-align: right; white-space: nowrap;" onclick="event.stopPropagation();">
                    <div class="admin-actions-cell">
                      <button class="btn btn-outline btn-xs btn-view-dossier" data-id="${s.id}">Dossier</button>
                      <button class="btn btn-outline btn-xs btn-award-xp" data-id="${s.id}" data-name="${s.name}">+XP</button>
                      <button class="btn btn-danger btn-xs btn-delete-student" data-id="${s.id}">Delete</button>
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `}
    </div>
  `;

  // Attach student row and dossier click handlers
  mount.querySelectorAll('.student-row, .btn-view-dossier').forEach(el => {
    el.addEventListener('click', () => {
      sound.playClick();
      const studentId = el.dataset.id;
      showStudentDossierModal(studentId, mainContainer);
    });
  });

  // Search filter for students table
  mount.querySelector('#admin-student-search-input')?.addEventListener('input', (e) => {
    const term = (e.target.value || '').toLowerCase().trim();
    mount.querySelectorAll('.student-row').forEach(row => {
      const name = (row.querySelector('td:nth-child(1)')?.textContent || '').toLowerCase();
      const email = (row.querySelector('td:nth-child(2)')?.textContent || '').toLowerCase();
      if (!term || name.includes(term) || email.includes(term)) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  });

  // Award XP prompt
  mount.querySelectorAll('.btn-award-xp').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const studentId = btn.dataset.id;
      const studentName = btn.dataset.name;
      const amountStr = prompt(`Enter bonus XP to award to ${studentName}:`, '25');
      if (!amountStr) return;
      const amount = parseInt(amountStr, 10);
      if (isNaN(amount) || amount <= 0) return alert('Please enter a valid positive number.');
      const reason = prompt('Reason for bonus XP (optional):', 'Great classroom participation') || 'Faculty Award';
      try {
        await apiClient.adminAwardXP(studentId, amount, reason);
        sound.playSuccess();
        alert(`Awarded +${amount} XP to ${studentName}!`);
        window.dispatchEvent(new CustomEvent('ha:navigate', { detail: 'admin' }));
      } catch (err) {
        alert(err.message);
      }
    });
  });

  // Delete student handler
  mount.querySelectorAll('.btn-delete-student').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const studentId = btn.dataset.id;
      if (confirm('Are you sure you want to permanently remove this student from the class database?')) {
        try {
          await apiClient.adminDeleteStudent(studentId);
          stateManager.adminDeleteStudent(studentId);
          sound.playClick();
          window.dispatchEvent(new CustomEvent('ha:navigate', { detail: 'admin' }));
        } catch (err) {
          alert(err.message);
        }
      }
    });
  });

  // Enroll student prompt
  mount.querySelector('#btn-admin-add-student-modal')?.addEventListener('click', async () => {
    const name = prompt('Enter student full name to enroll:');
    if (!name || !name.trim()) return;
    const email = prompt('Enter student email address:') || `${name.toLowerCase().replace(/[^a-z0-9]/g, '')}@gmail.com`;
    const password = prompt('Enter student login password:', 'password123');
    try {
      await stateManager.registerStudent({
        name: name.trim(),
        email: email.trim(),
        password,
        classCode: classInfo.code,
        avatar: AVATARS[Math.floor(Math.random() * AVATARS.length)]
      });
      sound.playSuccess();
      window.dispatchEvent(new CustomEvent('ha:navigate', { detail: 'admin' }));
    } catch (err) {
      alert(err.message);
    }
  });
}

/**
 * Detailed Student Profile / Dossier Modal (Section 12)
 */
async function showStudentDossierModal(studentId, mainContainer) {
  const mount = mainContainer.querySelector('#student-dossier-modal-container');
  if (!mount) return;

  // Fetch complete profile from API
  let profileData = null;
  try {
    const res = await apiClient.adminGetStudentProfile(studentId);
    if (res && res.profile) profileData = res.profile;
  } catch (e) {}

  if (!profileData) {
    const fallback = stateManager.state.students.find(s => s.id === studentId);
    if (!fallback) return alert('Student not found.');
    profileData = { student: fallback, quizHistory: [], activityHistory: [], roleplayHistory: [], xpLedger: [] };
  }

  const { student, quizHistory, activityHistory, roleplayHistory, xpLedger } = profileData;

  mount.innerHTML = `
    <div class="modal-overlay active" id="dossier-modal" style="display: flex; align-items: center; justify-content: center; position: fixed; inset: 0; background: rgba(10, 37, 88, 0.65); z-index: 9999; padding: 20px;">
      <div class="modal-content" style="background: #fff; border-radius: var(--radius-lg); max-width: 780px; width: 100%; max-height: 90vh; overflow-y: auto; padding: 28px; box-shadow: 0 20px 40px rgba(0,0,0,0.25);">
        
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; border-bottom: 2px solid var(--ha-navy-subtle); padding-bottom: 16px;">
          <div style="display: flex; align-items: center; gap: 14px;">
            <div style="font-size: 2.5rem; background: var(--ha-navy-subtle); padding: 8px 12px; border-radius: 50%;">${student.avatar || '🦁'}</div>
            <div>
              <h2 style="font-size: 1.4rem; color: var(--ha-navy); margin: 0 0 4px;">${student.name || student.fullName}</h2>
              <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                <span class="badge badge-navy">${student.levelTitle || `Level ${student.level || 1}`}</span>
                <span class="badge badge-gold">XP: ${student.xp || 0}</span>
                <span class="badge badge-outline">Email: ${student.email}</span>
                <span class="badge badge-outline">Enrolled: ${student.joinDate || 'Today'}</span>
              </div>
            </div>
          </div>
          <button class="btn btn-outline btn-sm" id="btn-close-dossier">✕ Close</button>
        </div>

        <!-- Metric Highlights -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 10px; margin-bottom: 20px;">
          <div style="padding: 12px; background: #f8fafc; border-radius: var(--radius-md); text-align: center;">
            <div style="font-size: 0.72rem; color: var(--ha-text-muted); font-weight: 800;">DAILY STREAK</div>
            <div style="font-size: 1.25rem; font-weight: 800; color: #ef4444;">🔥 ${student.streak || 0} Days</div>
          </div>
          <div style="padding: 12px; background: #f8fafc; border-radius: var(--radius-md); text-align: center;">
            <div style="font-size: 0.72rem; color: var(--ha-text-muted); font-weight: 800;">QUIZZES PASSED</div>
            <div style="font-size: 1.25rem; font-weight: 800; color: var(--ha-navy);">${student.stats?.topicsCompleted || 0} / 6</div>
          </div>
          <div style="padding: 12px; background: #f8fafc; border-radius: var(--radius-md); text-align: center;">
            <div style="font-size: 0.72rem; color: var(--ha-text-muted); font-weight: 800;">GAMES PLAYED</div>
            <div style="font-size: 1.25rem; font-weight: 800; color: #10b981;">🎮 ${student.stats?.gamesPlayed || 0}</div>
          </div>
          <div style="padding: 12px; background: #f8fafc; border-radius: var(--radius-md); text-align: center;">
            <div style="font-size: 0.72rem; color: var(--ha-text-muted); font-weight: 800;">ROLEPLAY MASTERY</div>
            <div style="font-size: 1.25rem; font-weight: 800; color: #8b5cf6;">🎭 ${student.roleplayProgressPercent || 0}%</div>
          </div>
        </div>

        <!-- Topic Progress Breakdown -->
        <div style="margin-bottom: 22px;">
          <h4 style="margin: 0 0 10px; font-size: 1rem; color: var(--ha-navy);">Curriculum Topic Mastery</h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 8px;">
            ${Object.entries(student.topicProgress || {}).map(([tId, p]) => `
              <div style="padding: 10px; border: 1px solid var(--ha-border); border-radius: var(--radius-md); font-size: 0.82rem; background: ${p.passed ? 'rgba(16,185,129,0.06)' : '#fff'};">
                <strong style="color: var(--ha-navy); display: block; text-transform: capitalize;">${tId.replace(/_/g, ' ')}</strong>
                <div style="display: flex; justify-content: space-between; margin-top: 4px; color: var(--ha-text-muted);">
                  <span>Learned: ${p.learned ? '✓' : '—'}</span>
                  <span>Quiz: ${p.quizScore || 0}%</span>
                  <span style="font-weight: 700; color: ${p.passed ? '#10b981' : '#f59e0b'};">${p.passed ? 'Passed' : 'In Progress'}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Quiz Attempts History -->
        <div style="margin-bottom: 22px;">
          <h4 style="margin: 0 0 10px; font-size: 1rem; color: var(--ha-navy);">Quiz Submissions History</h4>
          ${(!quizHistory || quizHistory.length === 0) ? `
            <p style="font-size: 0.85rem; color: var(--ha-text-muted); margin: 0;">No quizzes taken yet.</p>
          ` : `
            <div style="max-height: 160px; overflow-y: auto;">
              <table style="width: 100%; border-collapse: collapse; font-size: 0.82rem;">
                <thead>
                  <tr style="background: #f1f5f9; text-align: left;">
                    <th style="padding: 6px 8px;">Topic</th>
                    <th style="padding: 6px 8px;">Score</th>
                    <th style="padding: 6px 8px;">Percent</th>
                    <th style="padding: 6px 8px;">XP Earned</th>
                    <th style="padding: 6px 8px;">Date</th>
                  </tr>
                </thead>
                <tbody>
                  ${quizHistory.map(q => `
                    <tr style="border-bottom: 1px solid var(--ha-border);">
                      <td style="padding: 6px 8px; font-weight: 700;">${q.topic_id}</td>
                      <td style="padding: 6px 8px;">${q.score} / ${q.total_questions}</td>
                      <td style="padding: 6px 8px; color: ${q.percentage >= 80 ? '#10b981' : '#ef4444'}; font-weight: 700;">${q.percentage}%</td>
                      <td style="padding: 6px 8px; color: #b45309;">+${q.xp_earned} XP</td>
                      <td style="padding: 6px 8px; color: var(--ha-text-muted);">${new Date(q.completed_at).toLocaleDateString()}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          `}
        </div>

        <!-- XP Transaction Ledger -->
        <div>
          <h4 style="margin: 0 0 10px; font-size: 1rem; color: var(--ha-navy);">Auditable XP Transaction Ledger</h4>
          ${(!xpLedger || xpLedger.length === 0) ? `
            <p style="font-size: 0.85rem; color: var(--ha-text-muted); margin: 0;">No XP transactions logged yet.</p>
          ` : `
            <div style="max-height: 140px; overflow-y: auto;">
              <table style="width: 100%; border-collapse: collapse; font-size: 0.8rem;">
                <tbody>
                  ${xpLedger.map(tx => `
                    <tr style="border-bottom: 1px solid var(--ha-border);">
                      <td style="padding: 4px 6px; font-weight: 700; color: #b45309;">+${tx.amount} XP</td>
                      <td style="padding: 4px 6px; color: var(--ha-navy);">${tx.source}</td>
                      <td style="padding: 4px 6px; color: var(--ha-text-muted); font-size: 0.75rem;">${tx.created_at}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          `}
        </div>

      </div>
    </div>
  `;

  mount.querySelector('#btn-close-dossier')?.addEventListener('click', () => {
    mount.innerHTML = '';
  });
}

// --------------------------------------------------------------------------
// 3. CURRICULUM TAB
// --------------------------------------------------------------------------
function renderCurriculumTab(mount, topics, mainContainer, onNavigate) {
  mount.innerHTML = `
    <div class="ha-card" style="padding: 24px; border-top: 4px solid var(--ha-navy);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; flex-wrap: wrap; gap: 10px;">
        <div>
          <h2 style="font-size: 1.25rem; color: var(--ha-navy); margin: 0 0 4px;">Curriculum Topics Manager</h2>
          <p style="font-size: 0.88rem; color: var(--ha-text-muted); margin: 0;">
            Activate, deactivate, renumber or delete topics. Physical class taught by Sir Zubair.
          </p>
        </div>
        <button class="btn btn-outline btn-sm" id="btn-admin-reset-curriculum">Reset to Official Topics</button>
      </div>

      <div style="display: flex; flex-direction: column; gap: 10px;">
        ${topics.map(t => `
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 14px 16px; border: 1.5px solid var(--ha-border); border-radius: var(--radius-md); background: ${t.active !== false ? '#fff' : '#f8fafc'}; opacity: ${t.active !== false ? '1' : '0.6'};">
            <div>
              <div style="display: flex; align-items: center; gap: 8px;">
                <span class="badge badge-navy">${t.number}</span>
                <strong style="font-size: 1rem; color: var(--ha-navy);">${t.title}</strong>
                ${t.active !== false ? '<span class="badge badge-green">Active</span>' : '<span class="badge badge-outline">Inactive</span>'}
              </div>
              <p style="font-size: 0.85rem; color: var(--ha-text-muted); margin: 4px 0 0;">${t.subtitle || t.summary || ''}</p>
            </div>
            <div style="display: flex; gap: 8px;">
              <button class="btn btn-outline btn-xs btn-toggle-topic" data-id="${t.id}">${t.active !== false ? 'Deactivate' : 'Activate'}</button>
              <button class="btn btn-danger btn-xs btn-delete-topic" data-id="${t.id}">Delete</button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  mount.querySelectorAll('.btn-toggle-topic').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.dataset.id;
      try {
        await apiClient.adminToggleCurriculum(id);
        stateManager.adminToggleTopic(id);
        sound.playClick();
        window.dispatchEvent(new CustomEvent('ha:navigate', { detail: 'admin' }));
      } catch (err) {
        alert(err.message);
      }
    });
  });

  mount.querySelectorAll('.btn-delete-topic').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.dataset.id;
      if (confirm(`Delete topic "${id}"? Remaining topics will be renumbered automatically.`)) {
        try {
          await apiClient.adminDeleteCurriculum(id);
          stateManager.adminDeleteTopic(id);
          sound.playClick();
          window.dispatchEvent(new CustomEvent('ha:navigate', { detail: 'admin' }));
        } catch (err) {
          alert(err.message);
        }
      }
    });
  });

  mount.querySelector('#btn-admin-reset-curriculum')?.addEventListener('click', async () => {
    if (confirm('Reset curriculum to the 6 official class topics?')) {
      try {
        await apiClient.adminResetCurriculum();
        stateManager.adminResetCurriculum();
        sound.playSuccess();
        window.dispatchEvent(new CustomEvent('ha:navigate', { detail: 'admin' }));
      } catch (err) {
        alert(err.message);
      }
    }
  });
}

// --------------------------------------------------------------------------
// 4. QUESTIONS TAB (DATABASE EXPLORER)
// --------------------------------------------------------------------------
async function renderQuestionsTab(mount, topics) {
  mount.innerHTML = `
    <div class="ha-card" style="padding: 24px; border-top: 4px solid var(--ha-navy);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; flex-wrap: wrap; gap: 10px;">
        <div>
          <h2 style="font-size: 1.25rem; color: var(--ha-navy); margin: 0 0 4px;">Server-Side Questions Database</h2>
          <p style="font-size: 0.88rem; color: var(--ha-text-muted); margin: 0;">
            Real question records stored in the SQLite database. Dynamically sampled during practice & quizzes.
          </p>
        </div>
        <div style="display: flex; gap: 8px;">
          <select id="q-filter-topic" style="padding: 6px 12px; border: 1.5px solid var(--ha-border); border-radius: var(--radius-md); font-size: 0.85rem;">
            <option value="">All Topics</option>
            ${topics.map(t => `<option value="${t.id}">${t.title}</option>`).join('')}
          </select>
          <button class="btn btn-primary btn-sm" id="btn-add-question">+ Add Question</button>
        </div>
      </div>

      <div id="questions-list-mount">
        <p style="padding: 20px; text-align: center; color: var(--ha-text-muted);">Loading questions from database...</p>
      </div>
    </div>
  `;

  const qListMount = mount.querySelector('#questions-list-mount');
  const loadQuestions = async (topicId = null) => {
    try {
      const res = await apiClient.adminGetQuestions(topicId);
      const questions = res.questions || [];
      if (questions.length === 0) {
        qListMount.innerHTML = `<p style="padding: 20px; text-align: center; color: var(--ha-text-muted);">No questions found.</p>`;
        return;
      }
      qListMount.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 10px; max-height: 500px; overflow-y: auto;">
          ${questions.map((q, idx) => `
            <div style="padding: 12px 14px; border: 1px solid var(--ha-border); border-radius: var(--radius-md); background: #fff;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <span class="badge badge-navy" style="font-size: 0.72rem;">#${idx + 1} • ${q.topicId}</span>
                <span class="badge badge-outline" style="font-size: 0.7rem;">Diff: ${q.difficulty} | +${q.xpReward} XP</span>
              </div>
              <strong style="color: var(--ha-navy); font-size: 0.95rem; display: block; margin-bottom: 6px;">${q.question}</strong>
              <div style="display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 6px;">
                ${q.options.map((opt, oIdx) => `
                  <span style="padding: 3px 8px; border-radius: var(--radius-sm); font-size: 0.78rem; background: ${oIdx === q.answer ? '#d1fae5; color: #065f46; font-weight: 700;' : '#f1f5f9; color: var(--ha-navy);'};">
                    ${opt} ${oIdx === q.answer ? '✓' : ''}
                  </span>
                `).join('')}
              </div>
              ${q.explanation ? `<p style="font-size: 0.8rem; color: var(--ha-text-muted); margin: 0;"><em>Explanation: ${q.explanation}</em></p>` : ''}
            </div>
          `).join('')}
        </div>
      `;
    } catch (e) {
      qListMount.innerHTML = `<p style="color: #ef4444;">Failed to load questions: ${e.message}</p>`;
    }
  };

  loadQuestions();
  mount.querySelector('#q-filter-topic')?.addEventListener('change', (e) => {
    loadQuestions(e.target.value);
  });

  mount.querySelector('#btn-add-question')?.addEventListener('click', async () => {
    const topicId = prompt('Enter topic ID (e.g. adjectives, genitive_s, whose):', 'adjectives');
    if (!topicId) return;
    const question = prompt('Enter question text:');
    if (!question) return;
    const optStr = prompt('Enter 4 options separated by comma (e.g. red, blue, green, yellow):');
    if (!optStr) return;
    const options = optStr.split(',').map(s => s.trim());
    const answer = parseInt(prompt('Index of correct option (0, 1, 2, or 3):', '0'), 10) || 0;
    const explanation = prompt('Explanation (optional):') || '';
    try {
      await apiClient.adminCreateQuestion({ topicId, question, options, correctAnswer: answer, explanation });
      sound.playSuccess();
      alert('Question created in persistent database!');
      loadQuestions();
    } catch (err) {
      alert(err.message);
    }
  });
}

// --------------------------------------------------------------------------
// 5. QUIZZES TAB
// --------------------------------------------------------------------------
function renderQuizzesTab(mount, topics, students, testSummary, testAttempts) {
  const summary = testSummary || {};
  const attempts = testAttempts || [];

  mount.innerHTML = `
    <div style="margin-bottom: 24px;">
      <!-- 4 Summary Metric Cards as Requested -->
      <div style="font-size: 0.85rem; font-weight: 800; color: var(--ha-navy); text-transform: uppercase; margin-bottom: 12px; letter-spacing: 0.04em;">
        Curriculum Exam Performance Summary:
      </div>

      <div class="stats-grid" style="grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 16px; margin-bottom: 24px;">
        <div class="stat-pill-card">
          <div class="stat-icon-bubble navy">${usersIcon(22)}</div>
          <div class="stat-content">
            <div class="stat-label">TOTAL STUDENTS</div>
            <div class="stat-value">${summary.totalStudents !== undefined ? summary.totalStudents : students.length}</div>
            <div style="font-size: 0.75rem; color: var(--ha-text-muted);">Enrolled in class</div>
          </div>
        </div>

        <div class="stat-pill-card">
          <div class="stat-icon-bubble gold" style="font-size: 1.25rem;">📝</div>
          <div class="stat-content">
            <div class="stat-label">TESTS COMPLETED</div>
            <div class="stat-value">${summary.testsCompleted || attempts.length}</div>
            <div style="font-size: 0.75rem; color: var(--ha-text-muted);">Total attempts logged</div>
          </div>
        </div>

        <div class="stat-pill-card">
          <div class="stat-icon-bubble navy" style="color: var(--ha-success); font-size: 1.25rem;">🎯</div>
          <div class="stat-content">
            <div class="stat-label">AVERAGE SCORE</div>
            <div class="stat-value" style="color: var(--ha-success);">${summary.averageScore || 0}%</div>
            <div style="font-size: 0.75rem; color: var(--ha-text-muted);">Average score across tests</div>
          </div>
        </div>

        <div class="stat-pill-card">
          <div class="stat-icon-bubble red" style="color: var(--ha-gold-dark); font-size: 1.25rem;">🏆</div>
          <div class="stat-content">
            <div class="stat-label">HIGHEST SCORE</div>
            <div class="stat-value" style="color: var(--ha-gold-dark);">${summary.highestScore || 0}%</div>
            <div style="font-size: 0.75rem; color: var(--ha-text-muted);">Highest score achieved</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Detailed Student Test Results Dossier -->
    <div class="ha-card" style="padding: 24px; border-top: 4px solid var(--ha-navy); margin-bottom: 24px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; flex-wrap: wrap; gap: 12px;">
        <div>
          <h2 style="font-size: 1.3rem; color: var(--ha-navy); margin: 0 0 4px;">Student Test Results Dossier</h2>
          <p style="font-size: 0.88rem; color: var(--ha-text-muted); margin: 0;">
            Comprehensive audit log of all individual student test attempts, scores, percentages, and timestamps.
          </p>
        </div>

        <div>
          <input type="text" id="filter-quiz-attempts-input" placeholder="🔍 Search student or topic..."
            style="padding: 7px 14px; border: 1.5px solid var(--ha-border); border-radius: var(--radius-md); font-size: 0.88rem; min-width: 250px;" />
        </div>
      </div>

      ${attempts.length === 0 ? `
        <div style="padding: 32px 20px; text-align: center; background: #f8fafc; border-radius: var(--radius-md); border: 1.5px dashed var(--ha-border);">
          <div style="font-size: 2rem; margin-bottom: 6px;">📝</div>
          <strong style="color: var(--ha-navy); display: block; margin-bottom: 4px;">No test attempts recorded yet</strong>
          <p style="font-size: 0.88rem; color: var(--ha-text-muted); margin: 0;">
            As students take quizzes and the Full Grammar Test, their results will appear here with full scores and timestamps.
          </p>
        </div>
      ` : `
        <div class="table-responsive-wrapper" style="overflow-x: auto; border: 1.5px solid var(--ha-border); border-radius: var(--radius-lg); box-shadow: 0 1px 3px rgba(0,0,0,0.03);">
          <table class="admin-table" style="width: 100%; border-collapse: collapse; font-size: 0.88rem;">
            <thead>
              <tr style="background: #F1F5F9; text-align: left;">
                <th style="padding: 12px 16px; color: var(--ha-navy); font-weight: 800; font-size: 0.78rem; text-transform: uppercase;">Student</th>
                <th style="padding: 12px 16px; color: var(--ha-navy); font-weight: 800; font-size: 0.78rem; text-transform: uppercase;">Assessment / Topic</th>
                <th style="padding: 12px 16px; color: var(--ha-navy); font-weight: 800; font-size: 0.78rem; text-transform: uppercase; text-align: center;">Score</th>
                <th style="padding: 12px 16px; color: var(--ha-navy); font-weight: 800; font-size: 0.78rem; text-transform: uppercase; text-align: center;">Percentage</th>
                <th style="padding: 12px 16px; color: var(--ha-navy); font-weight: 800; font-size: 0.78rem; text-transform: uppercase; text-align: center;">Status</th>
                <th style="padding: 12px 16px; color: var(--ha-navy); font-weight: 800; font-size: 0.78rem; text-transform: uppercase; text-align: right;">Date & Time</th>
              </tr>
            </thead>
            <tbody>
              ${attempts.map(a => {
                const isFull = a.topic_id === 'full_grammar_test';
                const topicLabel = isFull ? 'Full Grammar Test' : (a.topic_id ? a.topic_id.replace(/_/g, ' ') : 'Quiz');
                const isPassed = a.passed || a.percentage >= 80;
                const studentName = a.student_name || 'Enrolled Student';
                const studentAvatar = a.student_avatar || '🦁';

                return `
                  <tr class="attempt-audit-row" style="border-bottom: 1px solid var(--ha-border); transition: background 0.15s;">
                    <td style="padding: 12px 16px; font-weight: 700; color: var(--ha-navy);">
                      <div style="display: flex; align-items: center; gap: 8px;">
                        <span style="font-size: 1.2rem;">${studentAvatar}</span>
                        <div>
                          <div style="white-space: nowrap;">${studentName}</div>
                          ${a.student_email ? `<div style="font-size: 0.75rem; color: var(--ha-text-muted); font-weight: normal;">${a.student_email}</div>` : ''}
                        </div>
                      </div>
                    </td>
                    <td style="padding: 12px 16px; font-weight: 600; color: var(--ha-navy); text-transform: capitalize;">
                      ${isFull ? '🎓 ' : '📝 '}${topicLabel}
                    </td>
                    <td style="padding: 12px 16px; text-align: center; font-weight: 700; color: var(--ha-navy); font-variant-numeric: tabular-nums;">
                      ${a.score} / ${a.total_questions}
                    </td>
                    <td style="padding: 12px 16px; text-align: center;">
                      <span class="badge ${isPassed ? 'badge-success' : 'badge-navy'}" style="font-weight: 800;">
                        ${a.percentage}%
                      </span>
                    </td>
                    <td style="padding: 12px 16px; text-align: center;">
                      <span style="font-weight: 800; color: ${isPassed ? 'var(--ha-success)' : 'var(--ha-red)'}; font-size: 0.82rem;">
                        ${isPassed ? '✓ Passed' : 'Needs Review'}
                      </span>
                    </td>
                    <td style="padding: 12px 16px; text-align: right; color: var(--ha-text-muted); font-size: 0.82rem; white-space: nowrap;">
                      ${a.completed_at ? new Date(a.completed_at).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }) : 'Recent'}
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      `}
    </div>

    <!-- Topic Benchmark Progress -->
    <div class="ha-card" style="padding: 24px; border-top: 4px solid var(--ha-navy);">
      <h3 style="font-size: 1.15rem; color: var(--ha-navy); margin: 0 0 6px;">Topic Mastery Benchmarks</h3>
      <p style="font-size: 0.85rem; color: var(--ha-text-muted); margin: 0 0 18px;">
        Curriculum topic pass rates across all active students.
      </p>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 14px;">
        ${topics.map(t => {
          const passCount = students.filter(s => s.topicProgress && s.topicProgress[t.id] && s.topicProgress[t.id].passed).length;
          const passRate = students.length > 0 ? Math.round((passCount / students.length) * 100) : 0;
          return `
            <div style="padding: 16px; border: 1.5px solid var(--ha-border); border-radius: var(--radius-md); background: #fff;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <strong style="color: var(--ha-navy); font-size: 0.95rem;">${t.title}</strong>
                <span class="badge badge-navy">${passCount} / ${students.length} Passed</span>
              </div>
              <div class="progress-bar-bg" style="height: 8px; background: #e2e8f0; border-radius: 4px; overflow: hidden; margin-bottom: 8px;">
                <div style="height: 100%; width: ${passRate}%; background: var(--ha-navy);"></div>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: var(--ha-text-muted);">
                <span>Passing Standard: 80%</span>
                <span>Pass Rate: ${passRate}%</span>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;

  // Search filter for quiz attempts table
  mount.querySelector('#filter-quiz-attempts-input')?.addEventListener('input', (e) => {
    const term = (e.target.value || '').toLowerCase().trim();
    mount.querySelectorAll('.attempt-audit-row').forEach(row => {
      const student = (row.querySelector('td:nth-child(1)')?.textContent || '').toLowerCase();
      const topic = (row.querySelector('td:nth-child(2)')?.textContent || '').toLowerCase();
      if (!term || student.includes(term) || topic.includes(term)) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  });
}

// --------------------------------------------------------------------------
// 6. ACTIVITIES TAB
// --------------------------------------------------------------------------
function renderActivitiesTab(mount, topics, students) {
  const totalGames = students.reduce((sum, s) => sum + (s.stats?.gamesPlayed || 0), 0);

  mount.innerHTML = `
    <div class="ha-card" style="padding: 24px; border-top: 4px solid var(--ha-navy);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
        <h2 style="font-size: 1.25rem; color: var(--ha-navy); margin: 0;">Interactive Game Center Telemetry</h2>
        <span class="badge badge-green" style="font-size: 0.8rem;">Total Plays: ${totalGames}</span>
      </div>
      <p style="font-size: 0.88rem; color: var(--ha-text-muted); margin: 0 0 20px;">
        Tracking Sentence Scramble, Word Match, Sentence Builder, and True/False across topics.
      </p>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px;">
        <div style="padding: 16px; background: #f8fafc; border-radius: var(--radius-md); border-left: 4px solid #3b82f6;">
          <strong style="display: block; color: var(--ha-navy);">Sentence Scramble</strong>
          <span style="font-size: 0.82rem; color: var(--ha-text-muted);">Syntax & Word Order</span>
        </div>
        <div style="padding: 16px; background: #f8fafc; border-radius: var(--radius-md); border-left: 4px solid #10b981;">
          <strong style="display: block; color: var(--ha-navy);">Sentence Builder</strong>
          <span style="font-size: 0.82rem; color: var(--ha-text-muted);">Grammar Construction</span>
        </div>
        <div style="padding: 16px; background: #f8fafc; border-radius: var(--radius-md); border-left: 4px solid #f59e0b;">
          <strong style="display: block; color: var(--ha-navy);">Word Match</strong>
          <span style="font-size: 0.82rem; color: var(--ha-text-muted);">Vocabulary Associations</span>
        </div>
        <div style="padding: 16px; background: #f8fafc; border-radius: var(--radius-md); border-left: 4px solid #8b5cf6;">
          <strong style="display: block; color: var(--ha-navy);">True / False Drills</strong>
          <span style="font-size: 0.82rem; color: var(--ha-text-muted);">Rapid Comprehension</span>
        </div>
      </div>
    </div>
  `;
}

// --------------------------------------------------------------------------
// 7. ROLEPLAYS TAB
// --------------------------------------------------------------------------
function renderRoleplaysTab(mount, roleplays, mainContainer, onNavigate) {
  mount.innerHTML = `
    <div class="ha-card" style="padding: 24px; border-top: 4px solid var(--ha-navy);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; flex-wrap: wrap; gap: 10px;">
        <div>
          <h2 style="font-size: 1.25rem; color: var(--ha-navy); margin: 0 0 4px;">Physical Class Roleplay Presentations</h2>
          <p style="font-size: 0.88rem; color: var(--ha-text-muted); margin: 0;">
            The 5 official spoken presentations taught by Sir Zubair.
          </p>
        </div>
        <button class="btn btn-outline btn-sm" id="btn-admin-reset-rp">Reset to 5 Official Roleplays</button>
      </div>

      <div style="display: flex; flex-direction: column; gap: 12px;">
        ${roleplays.map(rp => `
          <div style="padding: 16px; border: 1.5px solid var(--ha-border); border-radius: var(--radius-md); background: ${rp.active !== false ? '#fff' : '#f8fafc'}; opacity: ${rp.active !== false ? '1' : '0.6'};">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <span class="badge badge-navy">Roleplay ${rp.number}</span>
                <strong style="font-size: 1.05rem; color: var(--ha-navy);">${rp.title}</strong>
              </div>
              <div style="display: flex; gap: 8px;">
                <button class="btn btn-outline btn-xs btn-toggle-rp" data-id="${rp.id}">${rp.active !== false ? 'Deactivate' : 'Activate'}</button>
                <button class="btn btn-outline btn-xs btn-edit-rp" data-id="${rp.id}">Edit</button>
              </div>
            </div>
            <p style="font-size: 0.85rem; color: var(--ha-text-muted); margin: 0 0 4px;"><strong>Scenario:</strong> ${rp.scenario}</p>
            <p style="font-size: 0.8rem; color: var(--ha-navy); margin: 0;"><strong>Grammar Focus:</strong> ${Array.isArray(rp.grammarFocus) ? rp.grammarFocus.join(', ') : (rp.grammarFocus || '')}</p>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  mount.querySelectorAll('.btn-toggle-rp').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.dataset.id;
      try {
        await apiClient.adminToggleRoleplay(id);
        stateManager.adminToggleRoleplayActive(id);
        sound.playClick();
        window.dispatchEvent(new CustomEvent('ha:navigate', { detail: 'admin' }));
      } catch (err) {
        alert(err.message);
      }
    });
  });

  mount.querySelectorAll('.btn-edit-rp').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.dataset.id;
      const rp = roleplays.find(r => r.id === id);
      if (!rp) return;
      const title = prompt('Edit title:', rp.title);
      if (!title) return;
      const scenario = prompt('Edit scenario:', rp.scenario);
      if (!scenario) return;
      try {
        await apiClient.adminUpdateRoleplay(id, { title, scenario });
        stateManager.adminUpdateRoleplay(id, { title, scenario });
        sound.playSuccess();
        window.dispatchEvent(new CustomEvent('ha:navigate', { detail: 'admin' }));
      } catch (err) {
        alert(err.message);
      }
    });
  });

  mount.querySelector('#btn-admin-reset-rp')?.addEventListener('click', async () => {
    if (confirm('Reset to the 5 official roleplay presentations?')) {
      try {
        await apiClient.adminResetRoleplays();
        stateManager.adminResetRoleplays();
        sound.playSuccess();
        window.dispatchEvent(new CustomEvent('ha:navigate', { detail: 'admin' }));
      } catch (err) {
        alert(err.message);
      }
    }
  });
}

// --------------------------------------------------------------------------
// 8. LEADERBOARD TAB
// --------------------------------------------------------------------------
function renderLeaderboardTab(mount, students) {
  const sorted = [...students].sort((a, b) => (b.xp || 0) - (a.xp || 0));

  mount.innerHTML = `
    <div class="ha-card" style="padding: 24px; border-top: 4px solid var(--ha-navy);">
      <h2 style="font-size: 1.25rem; color: var(--ha-navy); margin: 0 0 6px;">Real Class Leaderboard</h2>
      <p style="font-size: 0.88rem; color: var(--ha-text-muted); margin: 0 0 18px;">
        Live database ranking by XP and level. Zero fake students.
      </p>

      ${sorted.length === 0 ? `
        <p style="padding: 20px; text-align: center; color: var(--ha-text-muted);">No students have joined the class yet.</p>
      ` : `
        <div class="table-responsive-wrapper" style="overflow-x: auto; border: 1.5px solid var(--ha-border); border-radius: var(--radius-lg); box-shadow: 0 1px 3px rgba(0,0,0,0.03);">
          <table class="admin-table">
            <thead>
              <tr>
                <th style="text-align: center; min-width: 80px;">Rank</th>
                <th style="min-width: 170px;">Student</th>
                <th style="text-align: center; min-width: 150px;">Level Title</th>
                <th style="text-align: center; min-width: 90px;">Streak</th>
                <th style="text-align: right; min-width: 120px;">Total XP</th>
              </tr>
            </thead>
            <tbody>
              ${sorted.map((s, idx) => `
                <tr>
                  <td style="text-align: center; font-weight: 800; color: ${idx === 0 ? '#b45309' : 'var(--ha-navy)'}; white-space: nowrap;">
                    ${idx === 0 ? '🥇 1' : (idx === 1 ? '🥈 2' : (idx === 2 ? '🥉 3' : `#${idx + 1}`))}
                  </td>
                  <td style="white-space: nowrap; font-weight: 700; color: var(--ha-navy);">
                    <div style="display: inline-flex; align-items: center; gap: 10px;">
                      <span style="font-size: 1.35rem; line-height: 1; flex-shrink: 0;">${s.avatar || '🦁'}</span>
                      <span style="white-space: nowrap;">${s.name}</span>
                    </div>
                  </td>
                  <td style="text-align: center; white-space: nowrap;">
                    <span class="admin-level-badge">${s.levelTitle || `Level ${s.level || 1}`}</span>
                  </td>
                  <td style="text-align: center; white-space: nowrap; font-weight: 700; color: var(--ha-navy);">🔥 ${s.streak || 0}d</td>
                  <td style="text-align: right; white-space: nowrap; font-weight: 800; color: #b45309;">⚡ ${s.xp || 0} XP</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `}
    </div>
  `;
}

// --------------------------------------------------------------------------
// 9. STUDENT ↔ TEACHER CHAT (MESSAGES) TAB
// --------------------------------------------------------------------------
async function renderMessagesTab(mount) {
  mount.innerHTML = `
    <div class="ha-card" style="padding: 24px; border-top: 4px solid var(--ha-navy);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; flex-wrap: wrap; gap: 10px;">
        <div>
          <h2 style="font-size: 1.25rem; color: var(--ha-navy); margin: 0 0 4px;">💬 Student Questions & Messages</h2>
          <p style="font-size: 0.88rem; color: var(--ha-text-muted); margin: 0;">
            Live questions sent by students through the Ask Sir Zubair chat box. Reply directly to assist them.
          </p>
        </div>
        <button class="btn btn-outline btn-sm" id="btn-refresh-messages">🔄 Refresh Messages</button>
      </div>

      <div id="messages-list-container">
        <p style="padding: 30px; text-align: center; color: var(--ha-text-muted);">Loading student questions...</p>
      </div>
    </div>
  `;

  async function loadAndRender() {
    const listMount = mount.querySelector('#messages-list-container');
    if (!listMount) return;
    try {
      const res = await apiClient.adminGetMessages();
      const messages = res?.messages || [];

      if (messages.length === 0) {
        listMount.innerHTML = `
          <div style="padding: 36px 20px; text-align: center; background: #f8fafc; border-radius: var(--radius-md);">
            <div style="font-size: 2rem; margin-bottom: 8px;">💬</div>
            <p style="font-size: 0.92rem; color: var(--ha-text-muted); margin: 0;">No student questions yet. When students ask questions via the chat box, they will appear here.</p>
          </div>
        `;
        return;
      }

      listMount.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 14px;">
          ${messages.map(m => `
            <div class="message-card-admin" style="padding: 16px 18px; background: #ffffff; border: 1.5px solid var(--ha-border); border-radius: var(--radius-md); box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                <div>
                  <span style="font-weight: 800; color: var(--ha-navy); font-size: 0.95rem;">👤 ${m.senderName || 'Student'}</span>
                  ${m.studentEmail ? `<span style="font-size: 0.76rem; color: var(--ha-text-muted); margin-left: 6px;">(${m.studentEmail})</span>` : ''}
                </div>
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span style="font-size: 0.72rem; color: var(--ha-text-muted);">${m.createdAt ? new Date(m.createdAt).toLocaleString() : ''}</span>
                  <button type="button" class="btn btn-outline btn-xs btn-delete-msg" data-id="${m.messageId}" style="padding: 2px 6px; font-size: 0.7rem; color: var(--ha-red);">🗑️</button>
                </div>
              </div>
              <div style="font-size: 0.92rem; color: #1e293b; background: #f8fafc; padding: 10px 14px; border-radius: 8px; border-left: 3px solid var(--ha-navy); margin-bottom: 10px;">
                ${m.content}
              </div>

              ${m.replyText ? `
                <div style="background: #eff6ff; padding: 10px 14px; border-radius: 8px; border-left: 3px solid #3b82f6; margin-bottom: 8px;">
                  <div style="font-size: 0.75rem; font-weight: 800; color: #1d4ed8; margin-bottom: 3px;">
                    👨‍🏫 Your Reply:
                  </div>
                  <div style="font-size: 0.88rem; color: #1e293b;">${m.replyText}</div>
                </div>
              ` : `
                <div class="reply-form-mount" style="margin-top: 10px;">
                  <div style="display: flex; gap: 8px;">
                    <input type="text" class="input-reply-text" placeholder="Type your reply to ${m.senderName}..." style="flex: 1; padding: 8px 12px; font-size: 0.85rem; border: 1.5px solid var(--ha-border); border-radius: var(--radius-md); outline: none;" />
                    <button type="button" class="btn btn-secondary btn-sm btn-send-reply" data-id="${m.messageId}">Reply</button>
                  </div>
                </div>
              `}
            </div>
          `).join('')}
        </div>
      `;

      // Bind replies
      listMount.querySelectorAll('.btn-send-reply').forEach(btn => {
        btn.addEventListener('click', async () => {
          const id = btn.dataset.id;
          const input = btn.closest('.reply-form-mount')?.querySelector('.input-reply-text');
          const replyText = input?.value?.trim();
          if (!replyText) return alert('Please enter reply text');
          btn.disabled = true;
          btn.textContent = 'Sending...';
          try {
            await apiClient.adminReplyMessage(id, replyText);
            sound.playSuccess();
            loadAndRender();
          } catch (e) {
            alert(e.message);
            btn.disabled = false;
            btn.textContent = 'Reply';
          }
        });
      });

      // Bind deletes
      listMount.querySelectorAll('.btn-delete-msg').forEach(btn => {
        btn.addEventListener('click', async () => {
          const id = btn.dataset.id;
          if (!confirm('Delete this message?')) return;
          try {
            await apiClient.adminDeleteMessage(id);
            sound.playSuccess();
            loadAndRender();
          } catch (e) {
            alert(e.message);
          }
        });
      });

    } catch (err) {
      listMount.innerHTML = `<p style="color: var(--ha-red); padding: 20px;">Failed to load messages: ${err.message}</p>`;
    }
  }

  mount.querySelector('#btn-refresh-messages')?.addEventListener('click', () => {
    sound.playClick();
    loadAndRender();
  });

  loadAndRender();
}

// --------------------------------------------------------------------------
// 10. NOTIFICATIONS TAB
// --------------------------------------------------------------------------
function renderNotificationsTab(mount, notifications, mainContainer) {
  mount.innerHTML = `
    <div class="ha-card" style="padding: 24px; border-top: 4px solid var(--ha-navy);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px;">
        <div>
          <h2 style="font-size: 1.25rem; color: var(--ha-navy); margin: 0 0 4px;">Classroom Notifications Feed</h2>
          <p style="font-size: 0.88rem; color: var(--ha-text-muted); margin: 0;">
            Persisted notifications generated by student enrollments and academic milestones.
          </p>
        </div>
        <button class="btn btn-outline btn-sm" id="btn-mark-all-read">Mark All Read</button>
      </div>

      ${(!notifications || notifications.length === 0) ? `
        <p style="padding: 30px; text-align: center; color: var(--ha-text-muted);">No notifications yet.</p>
      ` : `
        <div style="display: flex; flex-direction: column; gap: 10px;">
          ${notifications.map(n => `
            <div style="padding: 14px 16px; border-radius: var(--radius-md); background: ${n.isRead ? '#f8fafc' : '#eff6ff'}; border-left: 4px solid ${n.isRead ? 'var(--ha-border)' : 'var(--ha-navy)'}; display: flex; justify-content: space-between; align-items: center;">
              <div>
                <strong style="color: var(--ha-navy); font-size: 0.95rem; display: block;">${n.title}</strong>
                <span style="font-size: 0.88rem; color: var(--ha-text-muted);">${n.message}</span>
              </div>
              <span style="font-size: 0.75rem; color: var(--ha-text-muted);">${new Date(n.createdAt).toLocaleString()}</span>
            </div>
          `).join('')}
        </div>
      `}
    </div>
  `;

  mount.querySelector('#btn-mark-all-read')?.addEventListener('click', async () => {
    try {
      await apiClient.adminMarkNotificationsRead();
      sound.playSuccess();
      window.dispatchEvent(new CustomEvent('ha:navigate', { detail: 'admin' }));
    } catch (e) {
      alert(e.message);
    }
  });
}

// --------------------------------------------------------------------------
// 10. SETTINGS TAB
// --------------------------------------------------------------------------
function renderSettingsTab(mount, classInfo) {
  mount.innerHTML = `
    <div class="ha-card" style="padding: 24px; max-width: 600px; border-top: 4px solid var(--ha-navy);">
      <h2 style="font-size: 1.25rem; color: var(--ha-navy); margin: 0 0 6px;">Classroom Settings</h2>
      <p style="font-size: 0.88rem; color: var(--ha-text-muted); margin: 0 0 20px;">
        Update the class title, private class code, or instructor name.
      </p>

      <form id="form-class-settings" style="display: flex; flex-direction: column; gap: 14px;">
        <div>
          <label style="display: block; font-size: 0.8rem; font-weight: 800; color: var(--ha-navy); margin-bottom: 4px;">CLASS NAME</label>
          <input type="text" id="set-class-name" value="${classInfo.name || ''}" required style="width: 100%; padding: 10px 12px; border: 1.5px solid var(--ha-border); border-radius: var(--radius-md);" />
        </div>
        <div>
          <label style="display: block; font-size: 0.8rem; font-weight: 800; color: var(--ha-navy); margin-bottom: 4px;">CLASS CODE (Used by students to join)</label>
          <input type="text" id="set-class-code" value="${classInfo.code || ''}" required style="width: 100%; padding: 10px 12px; border: 1.5px solid var(--ha-border); border-radius: var(--radius-md); text-transform: uppercase;" />
        </div>
        <div>
          <label style="display: block; font-size: 0.8rem; font-weight: 800; color: var(--ha-navy); margin-bottom: 4px;">CLASS TEACHER</label>
          <input type="text" id="set-class-teacher" value="${classInfo.teacher || ''}" required style="width: 100%; padding: 10px 12px; border: 1.5px solid var(--ha-border); border-radius: var(--radius-md);" />
        </div>
        <button type="submit" class="btn btn-primary" style="margin-top: 8px;">Save Settings</button>
      </form>
    </div>
  `;

  mount.querySelector('#form-class-settings')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = mount.querySelector('#set-class-name').value;
    const code = mount.querySelector('#set-class-code').value;
    const teacher = mount.querySelector('#set-class-teacher').value;
    try {
      await apiClient.adminUpdateSettings({ name, code, teacher });
      stateManager.updateClassSettings({ name, code, teacher });
      sound.playSuccess();
      alert('Class settings updated successfully!');
      window.dispatchEvent(new CustomEvent('ha:navigate', { detail: 'admin' }));
    } catch (err) {
      alert(err.message);
    }
  });
}

// --------------------------------------------------------------------------
// 11. SECURITY TAB
// --------------------------------------------------------------------------
function renderSecurityTab(mount) {
  mount.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 20px; max-width: 620px;">
      
      <!-- Card 1: Change Password -->
      <div class="ha-card" style="padding: 24px; border-top: 4px solid var(--ha-red);">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
          <span style="font-size: 1.3rem;">🔑</span>
          <h2 style="font-size: 1.25rem; color: var(--ha-navy); margin: 0; font-weight: 800;">Change Teacher Password</h2>
        </div>
        <p style="font-size: 0.86rem; color: var(--ha-text-muted); margin: 0 0 18px;">
          Update the Teacher Portal password. Current password verification and bcrypt hashing (cost 10) are enforced server-side.
        </p>

        <div id="sec-feedback-success" style="display: none; padding: 11px 14px; background: rgba(34, 197, 94, 0.12); color: #166534; border-radius: var(--radius-sm); font-size: 0.86rem; font-weight: 700; border-left: 4px solid #22c55e; margin-bottom: 14px;">
          ✓ Your password has been changed successfully.
        </div>

        <div id="sec-feedback-error" style="display: none; padding: 11px 14px; background: var(--ha-red-light); color: var(--ha-red); border-radius: var(--radius-sm); font-size: 0.86rem; font-weight: 700; border-left: 4px solid var(--ha-red); margin-bottom: 14px;"></div>

        <form id="form-admin-password" style="display: flex; flex-direction: column; gap: 14px;">
          <div>
            <label for="sec-curr-pass" style="display: block; font-size: 0.78rem; font-weight: 800; color: var(--ha-navy); margin-bottom: 4px; letter-spacing: 0.03em;">
              CURRENT PASSWORD *
            </label>
            <div style="position: relative;">
              <input type="password" id="sec-curr-pass" required autocomplete="current-password"
                placeholder="Enter current teacher password"
                style="width: 100%; padding: 11px 38px 11px 12px; border: 1.5px solid var(--ha-border); border-radius: var(--radius-md); font-size: 0.92rem; outline: none;" />
              <button type="button" class="toggle-pass-inline" data-target="sec-curr-pass"
                style="position: absolute; right: 8px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; font-size: 1rem; color: var(--ha-text-muted); padding: 4px;">
                👁️
              </button>
            </div>
          </div>

          <div>
            <label for="sec-new-pass" style="display: block; font-size: 0.78rem; font-weight: 800; color: var(--ha-navy); margin-bottom: 4px; letter-spacing: 0.03em;">
              NEW PASSWORD * (Minimum 6 characters)
            </label>
            <div style="position: relative;">
              <input type="password" id="sec-new-pass" minlength="6" required autocomplete="new-password"
                placeholder="Create new secure password"
                style="width: 100%; padding: 11px 38px 11px 12px; border: 1.5px solid var(--ha-border); border-radius: var(--radius-md); font-size: 0.92rem; outline: none;" />
              <button type="button" class="toggle-pass-inline" data-target="sec-new-pass"
                style="position: absolute; right: 8px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; font-size: 1rem; color: var(--ha-text-muted); padding: 4px;">
                👁️
              </button>
            </div>
          </div>

          <div>
            <label for="sec-conf-pass" style="display: block; font-size: 0.78rem; font-weight: 800; color: var(--ha-navy); margin-bottom: 4px; letter-spacing: 0.03em;">
              CONFIRM NEW PASSWORD *
            </label>
            <div style="position: relative;">
              <input type="password" id="sec-conf-pass" minlength="6" required autocomplete="new-password"
                placeholder="Re-enter new password"
                style="width: 100%; padding: 11px 38px 11px 12px; border: 1.5px solid var(--ha-border); border-radius: var(--radius-md); font-size: 0.92rem; outline: none;" />
              <button type="button" class="toggle-pass-inline" data-target="sec-conf-pass"
                style="position: absolute; right: 8px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; font-size: 1rem; color: var(--ha-text-muted); padding: 4px;">
                👁️
              </button>
            </div>
          </div>

          <button type="submit" id="btn-submit-change-pass" class="btn btn-secondary" style="background: var(--ha-red); border-color: var(--ha-red); margin-top: 6px; padding: 11px; font-weight: 800;">
            Change Password
          </button>
        </form>
      </div>

      <!-- Card 2: Active Sessions & Multi-Device Security -->
      <div class="ha-card" style="padding: 22px; border-top: 4px solid var(--ha-navy);">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
          <span style="font-size: 1.3rem;">📱</span>
          <h2 style="font-size: 1.15rem; color: var(--ha-navy); margin: 0; font-weight: 800;">Session & Device Management</h2>
        </div>
        <p style="font-size: 0.85rem; color: var(--ha-text-muted); margin: 0 0 16px; line-height: 1.4;">
          Your login session is securely maintained with persistent HTTP-only cookies in Turso Cloud. If you used other devices, you can revoke them here.
        </p>

        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
          <button type="button" class="btn btn-outline" id="btn-sec-logout-all" style="border-color: var(--ha-red); color: var(--ha-red); font-weight: 700;">
            <span>📱</span> Log out of all devices
          </button>
        </div>
      </div>

    </div>
  `;

  // Password visibility toggle helpers
  mount.querySelectorAll('.toggle-pass-inline').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetInput = mount.querySelector(`#${btn.dataset.target}`);
      if (targetInput) {
        if (targetInput.type === 'password') {
          targetInput.type = 'text';
          btn.textContent = '🙈';
        } else {
          targetInput.type = 'password';
          btn.textContent = '👁️';
        }
      }
    });
  });

  // Change password form submission
  mount.querySelector('#form-admin-password')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const currInput = mount.querySelector('#sec-curr-pass');
    const newInput = mount.querySelector('#sec-new-pass');
    const confInput = mount.querySelector('#sec-conf-pass');
    const successBox = mount.querySelector('#sec-feedback-success');
    const errorBox = mount.querySelector('#sec-feedback-error');
    const submitBtn = mount.querySelector('#btn-submit-change-pass');

    if (successBox) successBox.style.display = 'none';
    if (errorBox) errorBox.style.display = 'none';

    const currentPassword = currInput?.value;
    const newPassword = newInput?.value;
    const confirmPassword = confInput?.value;

    if (newPassword !== confirmPassword) {
      if (errorBox) {
        errorBox.textContent = 'New passwords do not match. Please re-enter.';
        errorBox.style.display = 'block';
      }
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>⏳</span> Changing password...';
    }

    try {
      await stateManager.updateTeacherPassword(currentPassword, newPassword, confirmPassword);
      sound.playSuccess();
      if (successBox) {
        successBox.textContent = 'Your password has been changed successfully.';
        successBox.style.display = 'block';
      }
      if (currInput) currInput.value = '';
      if (newInput) newInput.value = '';
      if (confInput) confInput.value = '';
    } catch (err) {
      sound.playWrong();
      if (errorBox) {
        errorBox.textContent = err.message || 'Failed to change password.';
        errorBox.style.display = 'block';
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Change Password';
      }
    }
  });

  // Log out of all devices button
  mount.querySelector('#btn-sec-logout-all')?.addEventListener('click', () => {
    sound.playClick();
    const trigger = document.getElementById('menu-logout-all');
    if (trigger) trigger.click();
  });
}