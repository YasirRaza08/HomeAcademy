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

        <div style="display: flex; gap: 10px;">
          <button class="btn btn-outline btn-sm" id="admin-lock-btn" style="display: inline-flex; align-items: center; gap: 6px;">
            ${lockIcon(14)} Lock Portal
          </button>
          <button class="btn btn-primary btn-sm" id="admin-switch-dash">
            View Student Dashboard →
          </button>
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
    container.querySelectorAll('.admin-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tab);
    });
    renderActiveTab(tab, tabContent, container, onNavigate, { students, classInfo, curriculumTopics, roleplays, notifications, totalStudents, totalClassXP, activeTopicsCount });
  };

  container.querySelectorAll('.admin-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      sound.playClick();
      switchTab(btn.dataset.tab);
    });
  });

  // Render initial active tab
  switchTab(currentAdminTab);

  // Header button handlers
  container.querySelector('#admin-lock-btn')?.addEventListener('click', () => {
    sound.playClick();
    stateManager.setAdmin(false);
    if (onNavigate) onNavigate('home');
  });

  container.querySelector('#admin-switch-dash')?.addEventListener('click', () => {
    sound.playClick();
    if (onNavigate) onNavigate('dashboard');
  });
}

/**
 * Render the chosen tab content
 */
async function renderActiveTab(tab, contentMount, mainContainer, onNavigate, data) {
  const { students, classInfo, curriculumTopics, roleplays, notifications, totalStudents, totalClassXP, activeTopicsCount } = data;

  switch (tab) {
    case 'overview':
      renderOverviewTab(contentMount, { totalStudents, totalClassXP, activeTopicsCount, students, notifications });
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
      renderQuizzesTab(contentMount, curriculumTopics, students);
      break;
    case 'activities':
      renderActivitiesTab(contentMount, curriculumTopics, students);
      break;
    case 'roleplays':
      renderRoleplaysTab(contentMount, roleplays, mainContainer, onNavigate);
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
function renderOverviewTab(mount, { totalStudents, totalClassXP, activeTopicsCount, students, notifications }) {
  const recentNotifications = (notifications || []).slice(0, 5);

  mount.innerHTML = `
    <div class="stats-grid" style="margin-bottom: 24px;">
      <div class="stat-pill-card">
        <div class="stat-icon-bubble navy">${usersIcon(20)}</div>
        <div class="stat-content">
          <div class="stat-label">ENROLLED STUDENTS</div>
          <div class="stat-value">${totalStudents} Active</div>
          <div style="font-size: 0.75rem; color: var(--ha-text-muted);">Real persistent database records</div>
        </div>
      </div>

      <div class="stat-pill-card">
        <div class="stat-icon-bubble gold">${sparkIcon(20)}</div>
        <div class="stat-content">
          <div class="stat-label">TOTAL CLASS XP</div>
          <div class="stat-value">${totalClassXP} XP</div>
          <div style="font-size: 0.75rem; color: var(--ha-text-muted);">From real practice & quizzes</div>
        </div>
      </div>

      <div class="stat-pill-card">
        <div class="stat-icon-bubble red">${bookIcon(20)}</div>
        <div class="stat-content">
          <div class="stat-label">ACTIVE TOPICS</div>
          <div class="stat-value">${activeTopicsCount} Active</div>
          <div style="font-size: 0.75rem; color: var(--ha-text-muted);">Taught by Sir Zubair</div>
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

        <div style="display: flex; gap: 8px; align-items: center;">
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
function renderQuizzesTab(mount, topics, students) {
  mount.innerHTML = `
    <div class="ha-card" style="padding: 24px; border-top: 4px solid var(--ha-navy);">
      <h2 style="font-size: 1.25rem; color: var(--ha-navy); margin: 0 0 6px;">Curriculum Quizzes Performance</h2>
      <p style="font-size: 0.88rem; color: var(--ha-text-muted); margin: 0 0 20px;">
        Topic quiz mastery benchmarks across enrolled students.
      </p>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 14px;">
        ${topics.map(t => {
          const passCount = students.filter(s => s.topicProgress && s.topicProgress[t.id] && s.topicProgress[t.id].passed).length;
          const passRate = students.length > 0 ? Math.round((passCount / students.length) * 100) : 0;
          return `
            <div style="padding: 16px; border: 1.5px solid var(--ha-border); border-radius: var(--radius-md); background: #fff;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <strong style="color: var(--ha-navy); font-size: 1rem;">${t.title}</strong>
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
// 9. NOTIFICATIONS TAB
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
    <div class="ha-card" style="padding: 24px; max-width: 600px; border-top: 4px solid var(--ha-red);">
      <h2 style="font-size: 1.25rem; color: var(--ha-navy); margin: 0 0 6px;">Faculty Security & Password</h2>
      <p style="font-size: 0.88rem; color: var(--ha-text-muted); margin: 0 0 20px;">
        Update the Teacher Portal password. Changes are verified and hashed server-side.
      </p>

      <form id="form-admin-password" style="display: flex; flex-direction: column; gap: 14px;">
        <div>
          <label style="display: block; font-size: 0.8rem; font-weight: 800; color: var(--ha-navy); margin-bottom: 4px;">CURRENT PASSWORD</label>
          <input type="password" id="sec-curr-pass" required style="width: 100%; padding: 10px 12px; border: 1.5px solid var(--ha-border); border-radius: var(--radius-md);" />
        </div>
        <div>
          <label style="display: block; font-size: 0.8rem; font-weight: 800; color: var(--ha-navy); margin-bottom: 4px;">NEW PASSWORD (Min 6 chars)</label>
          <input type="password" id="sec-new-pass" minlength="6" required style="width: 100%; padding: 10px 12px; border: 1.5px solid var(--ha-border); border-radius: var(--radius-md);" />
        </div>
        <div>
          <label style="display: block; font-size: 0.8rem; font-weight: 800; color: var(--ha-navy); margin-bottom: 4px;">CONFIRM NEW PASSWORD</label>
          <input type="password" id="sec-conf-pass" minlength="6" required style="width: 100%; padding: 10px 12px; border: 1.5px solid var(--ha-border); border-radius: var(--radius-md);" />
        </div>
        <button type="submit" class="btn btn-secondary" style="background: var(--ha-red); border-color: var(--ha-red); margin-top: 8px;">Change Password</button>
      </form>
    </div>
  `;

  mount.querySelector('#form-admin-password')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const currentPassword = mount.querySelector('#sec-curr-pass').value;
    const newPassword = mount.querySelector('#sec-new-pass').value;
    const confirmPassword = mount.querySelector('#sec-conf-pass').value;

    if (newPassword !== confirmPassword) {
      return alert('New passwords do not match. Please re-enter.');
    }

    try {
      await apiClient.adminChangePassword(newPassword);
      stateManager.updateTeacherPassword(currentPassword, newPassword);
      sound.playSuccess();
      alert('Teacher password updated successfully!');
      mount.querySelector('#sec-curr-pass').value = '';
      mount.querySelector('#sec-new-pass').value = '';
      mount.querySelector('#sec-conf-pass').value = '';
    } catch (err) {
      alert(err.message);
    }
  });
}