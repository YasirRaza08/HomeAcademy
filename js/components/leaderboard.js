// Home Academy Classroom Leaderboard Component
// Strictly real students only - Clean empty state when 0 students

import { stateManager } from '../state.js';
import { sound } from '../audio.js';
import { apiClient } from '../services/apiClient.js';

export function renderLeaderboard(container, onNavigate) {
  let unsub = null;

  function renderContent() {
    if (!container.isConnected) {
      if (unsub) unsub();
      return;
    }

    const currentStudent = stateManager.getCurrentStudent();
    const students = stateManager.getLeaderboard();

    // Empty state handling
    if (students.length === 0) {
      container.innerHTML = `
        <div class="container" style="padding-top: 40px; padding-bottom: 60px; max-width: 680px; text-align: center;">
          <div class="ha-card" style="padding: 48px 32px; border-top: 6px solid var(--ha-gold);">
            <span style="font-size: 4rem; display: inline-block; margin-bottom: 12px;">🏆</span>
            <h1 style="font-size: 2rem; color: var(--ha-navy); margin-bottom: 8px;">Classroom Leaderboard</h1>
            <p style="font-size: 1.05rem; color: var(--ha-text-muted); margin-bottom: 24px;">
              No students have joined yet.
            </p>
            <div style="background: var(--ha-navy-subtle); border-radius: var(--radius-md); padding: 18px; margin-bottom: 28px;">
              <p style="font-size: 0.95rem; color: var(--ha-navy); font-weight: 600; margin-bottom: 6px;">
                Be the first student to join <strong>${stateManager.state.classInfo.name}</strong>!
              </p>
              <div style="font-size: 0.88rem; color: var(--ha-text-muted);">
                Use Class Code: <strong>${stateManager.state.classInfo.code}</strong> and claim the #1 spot!
              </div>
            </div>
            <button class="btn btn-primary btn-lg" id="btn-leaderboard-join">
              <span>🏫</span> Join Class Now
            </button>
          </div>
        </div>
      `;

      container.querySelector('#btn-leaderboard-join')?.addEventListener('click', () => {
        sound.playClick();
        window.dispatchEvent(new CustomEvent('ha:open-join-modal'));
      });
      return;
    }

    const rankInfo = currentStudent ? stateManager.getStudentRank(currentStudent.id) : null;
    const champion = students[0];

    container.innerHTML = `
      <div class="container" style="padding-top: 24px; padding-bottom: 50px;">
        
        <!-- Leaderboard Header -->
        <div style="text-align: center; margin-bottom: 32px;">
          <span class="badge badge-gold" style="margin-bottom: 8px;">Official Class Competition</span>
          <h1 style="font-size: 2.2rem; color: var(--ha-navy); margin-bottom: 6px;">Classroom Leaderboard</h1>
          <p style="font-size: 1rem; color: var(--ha-text-muted);">
            Private rankings for <strong>${stateManager.state.classInfo.name}</strong> (${students.length} Joined)
          </p>
        </div>

        <!-- Current Class Champion Banner -->
        <div style="background: linear-gradient(135deg, #F5A623 0%, #D4880E 100%); border-radius: var(--radius-xl); padding: clamp(16px, 3.5vw, 28px); color: #FFFFFF; display: flex; align-items: center; justify-content: space-between; margin-bottom: 32px; box-shadow: var(--ha-shadow-md); flex-wrap: wrap; gap: 16px;">
          <div style="display: flex; align-items: center; gap: clamp(10px, 3vw, 18px);">
            <div style="font-size: clamp(2rem, 5vw, 3rem); background: rgba(255,255,255,0.25); border-radius: var(--radius-pill); width: clamp(52px, 12vw, 68px); height: clamp(52px, 12vw, 68px); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
              🏆
            </div>
            <div>
              <span class="badge" style="background: #FFFFFF; color: var(--ha-navy); font-weight: 800; margin-bottom: 4px; font-size: 0.72rem;">
                CURRENT CLASS LEADER
              </span>
              <div style="font-size: clamp(1.2rem, 4vw, 1.6rem); font-weight: 800; word-break: break-word;">
                ${champion.avatar} ${champion.name} (${champion.xp || 0} XP)
              </div>
              <div style="font-size: 0.85rem; opacity: 0.95;">
                Level ${champion.level || 1} • Streak: ${champion.streak || 0} days
              </div>
            </div>
          </div>

          <div>
            <button class="btn btn-primary" id="btn-compete-now" style="background: var(--ha-navy);">
              Practice to Earn XP →
            </button>
          </div>
        </div>

        <!-- User Position Banner (if logged in) -->
        ${currentStudent && rankInfo ? `
          <div style="background: var(--ha-navy-subtle); border: 2px solid var(--ha-navy); border-radius: var(--radius-lg); padding: 16px 20px; display: flex; align-items: center; justify-content: space-between; margin-bottom: 28px; flex-wrap: wrap; gap: 12px;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <div style="font-size: 2rem; flex-shrink: 0;">${currentStudent.avatar}</div>
              <div>
                <div style="font-size: 0.78rem; font-weight: 700; color: var(--ha-red); text-transform: uppercase;">
                  YOUR POSITION
                </div>
                <div style="font-size: 1.15rem; font-weight: 800; color: var(--ha-navy);">
                  Rank #${rankInfo.rank} — ${currentStudent.name}
                </div>
              </div>
            </div>

            <div style="display: flex; align-items: center; gap: 16px; flex-wrap: wrap;">
              <div>
                <div style="font-size: 0.72rem; color: var(--ha-text-muted); font-weight: 600;">TOTAL XP</div>
                <div style="font-size: 1.15rem; font-weight: 800; color: var(--ha-navy);">${currentStudent.xp || 0} XP</div>
              </div>
              ${rankInfo.xpToNextRank > 0 ? `
                <div class="badge badge-gold" style="font-size: 0.8rem; padding: 5px 12px;">
                  ${rankInfo.xpToNextRank} XP to pass ${rankInfo.nextStudent?.name}
                </div>
              ` : `
                <div class="badge badge-gold" style="font-size: 0.8rem; padding: 5px 12px;">
                  👑 You are #1 in class!
                </div>
              `}
            </div>
          </div>
        ` : ''}

        <!-- Podium for Top 3 (if 2 or more students) -->
        ${students.length >= 2 ? `
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 180px), 1fr)); gap: 14px; margin-bottom: 30px;">
            ${students.slice(0, 3).map((s, idx) => {
              const medals = ['🥇 1st Place', '🥈 2nd Place', '🥉 3rd Place'];
              const borders = ['var(--ha-gold)', '#94A3B8', '#D97706'];
              const isMe = currentStudent && s.id === currentStudent.id;
              return `
                <div class="ha-card" style="text-align: center; border-top: 4px solid ${borders[idx]}; padding: 20px 14px; background: ${isMe ? '#FFFDF5' : '#FFF'};">
                  <div style="font-size: 0.82rem; font-weight: 800; color: var(--ha-navy); margin-bottom: 6px;">
                    ${medals[idx]}
                  </div>
                  <div style="font-size: 2.6rem; margin-bottom: 6px;">${s.avatar}</div>
                  <h3 style="font-size: 1.15rem; color: var(--ha-navy); margin-bottom: 4px;">
                    ${s.name} ${isMe ? '<span style="color: var(--ha-red); font-size: 0.78rem;">(YOU)</span>' : ''}
                  </h3>
                  <div style="font-size: 1.1rem; font-weight: 800; color: var(--ha-red); margin-bottom: 4px;">
                    ${s.xp || 0} <span style="font-size: 0.8rem; color: var(--ha-navy);">XP</span>
                  </div>
                  <div style="font-size: 0.78rem; color: var(--ha-text-muted);">
                    Level ${s.level || 1} • Streak ${s.streak || 0}d
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        ` : ''}

        <!-- Complete Student Roster Rankings Table -->
        <div class="ha-card" style="padding: 0; overflow: hidden;">
          <div style="padding: 14px 18px; background: var(--ha-navy-subtle); border-bottom: 1px solid var(--ha-border); display: flex; justify-content: space-between; align-items: center;">
            <h3 style="font-size: 1.05rem; color: var(--ha-navy);">Full Class Roster (${students.length} Students)</h3>
            <span style="font-size: 0.76rem; font-weight: 700; color: var(--ha-text-muted);">RANKED BY XP</span>
          </div>

          <div style="display: flex; flex-direction: column;">
            ${students.map((s, idx) => {
              const isMe = currentStudent && s.id === currentStudent.id;
              return `
                <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; border-bottom: 1px solid var(--ha-border); background: ${isMe ? 'rgba(245, 166, 35, 0.08)' : '#FFF'}; flex-wrap: wrap; gap: 8px;">
                  <div style="display: flex; align-items: center; gap: 12px; min-width: 0;">
                    <span style="font-size: 1rem; font-weight: 800; color: ${idx < 3 ? 'var(--ha-red)' : 'var(--ha-text-muted)'}; min-width: 24px;">
                      #${idx + 1}
                    </span>
                    <span style="font-size: 1.5rem; flex-shrink: 0;">${s.avatar}</span>
                    <div style="min-width: 0;">
                      <strong style="color: var(--ha-navy); font-size: 0.95rem; word-break: break-word;">
                        ${s.name} ${isMe ? '<span style="color: var(--ha-red); font-size: 0.75rem;">(YOU)</span>' : ''}
                      </strong>
                      <div style="font-size: 0.75rem; color: var(--ha-text-muted);">
                        Level ${s.level || 1} • 🔥 ${s.streak || 0}d Streak
                      </div>
                    </div>
                  </div>

                  <div style="text-align: right; flex-shrink: 0;">
                    <div style="font-size: 1.1rem; font-weight: 800; color: var(--ha-navy);">
                      ${s.xp || 0} <span style="font-size: 0.75rem; color: var(--ha-text-muted);">XP</span>
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

      </div>
    `;

    container.querySelector('#btn-compete-now')?.addEventListener('click', () => {
      sound.playClick();
      onNavigate('topics');
    });
  }

  // Initial render
  renderContent();

  // Fresh authoritative fetch from Turso DB
  apiClient.getLeaderboard(100).then(res => {
    if (res && Array.isArray(res.leaderboard)) {
      stateManager.state.students = res.leaderboard.map(s => ({ ...s }));
      const current = stateManager.getCurrentStudent();
      if (current && !stateManager.state.students.some(s => s.id === current.id)) {
        stateManager.state.students.push(current);
      }
      renderContent();
    }
  }).catch(() => {});

  // Subscribe to real-time events across all devices (SSE & state changes)
  unsub = stateManager.subscribe((event) => {
    if (!container.isConnected) {
      if (unsub) unsub();
      return;
    }
    if (event === 'LEADERBOARD_UPDATED' || event === 'XP_GAINED' || event === 'STUDENT_UPDATED' || event === 'STUDENT_JOINED') {
      renderContent();
    }
  });
}