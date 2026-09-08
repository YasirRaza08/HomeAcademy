// Home Academy Achievements & Badges Component
import { stateManager } from '../state.js';

export function renderAchievements(container, onNavigate) {
  const student = stateManager.getCurrentStudent();
  const achievements = stateManager.state.achievements;
  const unlockedIds = student.unlockedAchievements || [];

  function getProgress(ach) {
    let current = 0;
    switch (ach.type) {
      case 'streak': current = student.streak || 0; break;
      case 'xp': current = student.xp || 0; break;
      case 'words_learned': current = student.stats?.wordsLearned || 0; break;
      case 'speaking_count': current = student.stats?.speakingCompleted || 0; break;
      case 'listening_count': current = student.stats?.listeningCompleted || 0; break;
      case 'grammar_count': current = student.stats?.grammarCompleted || 0; break;
      case 'games_played': current = student.stats?.gamesPlayed || 0; break;
      case 'correct_answers': current = student.stats?.correctAnswers || 0; break;
      case 'rank_one':
        const rank = stateManager.getStudentRank(student.id).rank;
        current = rank === 1 ? 1 : 0;
        break;
      case 'speed_correct': current = Math.min(ach.requirement, student.stats?.correctAnswers || 0); break;
      case 'perfect_quiz': current = unlockedIds.includes(ach.id) ? 1 : 0; break;
      default: current = 0;
    }
    const percent = Math.min(100, Math.round((current / ach.requirement) * 100));
    return { current, requirement: ach.requirement, percent };
  }

  const unlockedList = achievements.filter(a => unlockedIds.includes(a.id));
  const lockedList = achievements.filter(a => !unlockedIds.includes(a.id));

  container.innerHTML = `
    <div class="container" style="padding-top: 24px; padding-bottom: 40px;">
      <div style="text-align: center; margin-bottom: 32px;">
        <span class="badge badge-gold" style="margin-bottom: 8px;">Badge Showcase</span>
        <h1 style="font-size: 2.2rem; color: var(--ha-navy); margin-bottom: 6px;">Achievements & Honors</h1>
        <p style="font-size: 1rem; color: var(--ha-text-muted);">
          Unlocked: <strong>${unlockedList.length} of ${achievements.length}</strong> badges
        </p>
      </div>

      <!-- Unlocked Section -->
      <div style="margin-bottom: 36px;">
        <h2 style="font-size: 1.4rem; color: var(--ha-navy); margin-bottom: 16px; display: flex; align-items: center; gap: 8px;">
          <span>⭐</span> Unlocked Badges (${unlockedList.length})
        </h2>

        ${unlockedList.length === 0 ? `
          <div class="ha-card" style="text-align: center; padding: 36px;">
            <span style="font-size: 3rem;">🚀</span>
            <h3 style="color: var(--ha-navy); margin: 12px 0;">Complete your first challenge to unlock a badge!</h3>
            <p>Practice vocabulary, finish a daily challenge, or start a streak to earn your first reward.</p>
          </div>
        ` : `
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px;">
            ${unlockedList.map(ach => `
              <div class="ha-card" style="border-top: 4px solid var(--ha-gold); background: #FFFFFF;">
                <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 12px;">
                  <div style="font-size: 2.5rem; background: var(--ha-gold-light); width: 60px; height: 60px; border-radius: var(--radius-pill); display: flex; align-items: center; justify-content: center;">
                    ${ach.icon}
                  </div>
                  <div>
                    <h3 style="font-size: 1.15rem; color: var(--ha-navy);">${ach.title}</h3>
                    <span class="badge badge-success" style="font-size: 0.72rem;">UNLOCKED ✓</span>
                  </div>
                </div>
                <p style="font-size: 0.88rem; color: var(--ha-text-muted); margin-bottom: 12px;">
                  ${ach.description}
                </p>
                <div style="font-size: 0.8rem; font-weight: 700; color: var(--ha-gold-dark);">
                  +${ach.xpReward} Bonus XP Earned
                </div>
              </div>
            `).join('')}
          </div>
        `}
      </div>

      <!-- Locked Section -->
      <div>
        <h2 style="font-size: 1.4rem; color: var(--ha-navy); margin-bottom: 16px; display: flex; align-items: center; gap: 8px;">
          <span>🔒</span> In Progress & Locked (${lockedList.length})
        </h2>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px;">
          ${lockedList.map(ach => {
            const prog = getProgress(ach);
            return `
              <div class="ha-card" style="background: #FAFAFA; border: 1.5px dashed var(--ha-border);">
                <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 12px;">
                  <div style="font-size: 2.2rem; filter: grayscale(1); opacity: 0.5;">
                    ${ach.icon}
                  </div>
                  <div>
                    <h3 style="font-size: 1.1rem; color: var(--ha-navy);">${ach.title}</h3>
                    <span class="badge" style="background: #E2E8F0; color: var(--ha-text-muted); font-size: 0.72rem;">
                      LOCKED
                    </span>
                  </div>
                </div>
                <p style="font-size: 0.85rem; color: var(--ha-text-muted); margin-bottom: 12px;">
                  ${ach.description}
                </p>
                
                <div>
                  <div style="display: flex; justify-content: space-between; font-size: 0.75rem; font-weight: 700; margin-bottom: 4px;">
                    <span style="color: var(--ha-text-muted);">Progress</span>
                    <span style="color: var(--ha-navy);">${prog.current} / ${prog.requirement} (${prog.percent}%)</span>
                  </div>
                  <div class="progress-container">
                    <div class="progress-bar-fill" style="width: ${prog.percent}%;"></div>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

    </div>
  `;
}