// Home Academy Progress Dashboard Component
import { stateManager } from '../state.js';

export function renderProgress(container, onNavigate) {
  const student = stateManager.getCurrentStudent();

  const vocabPercent = Math.min(100, Math.round(((student.stats?.wordsLearned || 0) / 45) * 100));
  const grammarPercent = Math.min(100, Math.round(((student.stats?.grammarCompleted || 0) / 12) * 100));
  const listeningPercent = Math.min(100, Math.round(((student.stats?.listeningCompleted || 0) / 10) * 100));
  const speakingPercent = Math.min(100, Math.round(((student.stats?.speakingCompleted || 0) / 10) * 100));

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const weeklyXP = student.weeklyXP || [30, 60, 90, 120, 80, 150, 40];
  const maxXP = Math.max(100, ...weeklyXP);

  container.innerHTML = `
    <div class="container" style="padding-top: 24px; padding-bottom: 40px; max-width: 900px;">
      <div style="text-align: center; margin-bottom: 32px;">
        <span class="badge badge-navy" style="margin-bottom: 8px;">Learning Analytics</span>
        <h1 style="font-size: 2.2rem; color: var(--ha-navy); margin-bottom: 6px;">Your Learning Progress</h1>
        <p style="font-size: 1rem; color: var(--ha-text-muted);">
          Detailed breakdown of your English skills at Home Academy.
        </p>
      </div>

      <!-- 4 Core Skills Progress Cards -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 32px;">
        
        <!-- Vocab -->
        <div class="ha-card" style="border-top: 4px solid var(--ha-red);">
          <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
            <span style="font-size: 1.8rem;">📚</span>
            <span style="font-size: 1.4rem; font-weight: 800; color: var(--ha-red);">${vocabPercent}%</span>
          </div>
          <div style="font-weight: 800; color: var(--ha-navy); font-size: 1.05rem; margin-bottom: 4px;">Vocabulary</div>
          <div style="font-size: 0.8rem; color: var(--ha-text-muted); margin-bottom: 12px;">
            ${student.stats?.wordsLearned || 0} words mastered
          </div>
          <div class="progress-container">
            <div class="progress-bar-fill red" style="width: ${vocabPercent}%;"></div>
          </div>
        </div>

        <!-- Grammar -->
        <div class="ha-card" style="border-top: 4px solid var(--ha-navy);">
          <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
            <span style="font-size: 1.8rem;">✍️</span>
            <span style="font-size: 1.4rem; font-weight: 800; color: var(--ha-navy);">${grammarPercent}%</span>
          </div>
          <div style="font-weight: 800; color: var(--ha-navy); font-size: 1.05rem; margin-bottom: 4px;">Grammar</div>
          <div style="font-size: 0.8rem; color: var(--ha-text-muted); margin-bottom: 12px;">
            ${student.stats?.grammarCompleted || 0}/12 lessons done
          </div>
          <div class="progress-container">
            <div class="progress-bar-fill navy" style="width: ${grammarPercent}%;"></div>
          </div>
        </div>

        <!-- Listening -->
        <div class="ha-card" style="border-top: 4px solid var(--ha-gold);">
          <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
            <span style="font-size: 1.8rem;">🎧</span>
            <span style="font-size: 1.4rem; font-weight: 800; color: var(--ha-gold-dark);">${listeningPercent}%</span>
          </div>
          <div style="font-weight: 800; color: var(--ha-navy); font-size: 1.05rem; margin-bottom: 4px;">Listening</div>
          <div style="font-size: 0.8rem; color: var(--ha-text-muted); margin-bottom: 12px;">
            ${student.stats?.listeningCompleted || 0} drills done
          </div>
          <div class="progress-container">
            <div class="progress-bar-fill" style="width: ${listeningPercent}%;"></div>
          </div>
        </div>

        <!-- Speaking -->
        <div class="ha-card" style="border-top: 4px solid var(--ha-red);">
          <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
            <span style="font-size: 1.8rem;">🗣️</span>
            <span style="font-size: 1.4rem; font-weight: 800; color: var(--ha-red);">${speakingPercent}%</span>
          </div>
          <div style="font-weight: 800; color: var(--ha-navy); font-size: 1.05rem; margin-bottom: 4px;">Speaking</div>
          <div style="font-size: 0.8rem; color: var(--ha-text-muted); margin-bottom: 12px;">
            ${student.stats?.speakingCompleted || 0} sentences spoken
          </div>
          <div class="progress-container">
            <div class="progress-bar-fill red" style="width: ${speakingPercent}%;"></div>
          </div>
        </div>

      </div>

      <!-- Weekly Activity Chart (Mon-Sun) -->
      <div class="ha-card" style="padding: 28px; margin-bottom: 30px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
          <div>
            <h3 style="font-size: 1.25rem; color: var(--ha-navy);">Weekly XP Activity</h3>
            <p style="font-size: 0.85rem; color: var(--ha-text-muted);">Points earned each day this week</p>
          </div>
          <span class="badge badge-gold">🔥 Streak: ${student.streak} Days</span>
        </div>

        <!-- Bar visual -->
        <div style="display: flex; align-items: flex-end; justify-content: space-between; height: 160px; padding-top: 20px; gap: 8px;">
          ${days.map((day, idx) => {
            const xpVal = weeklyXP[idx] || 0;
            const barH = Math.max(10, Math.round((xpVal / maxXP) * 120));
            return `
              <div style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 8px;">
                <div style="font-size: 0.75rem; font-weight: 700; color: var(--ha-navy);">${xpVal}</div>
                <div style="width: 100%; max-width: 38px; height: ${barH}px; background: linear-gradient(180deg, var(--ha-navy-light), var(--ha-navy)); border-radius: var(--radius-sm); transition: height 0.4s ease;"></div>
                <div style="font-size: 0.78rem; font-weight: 700; color: var(--ha-text-muted);">${day}</div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <div style="text-align: center;">
        <button class="btn btn-primary btn-lg" id="prog-dash-btn">Back to Dashboard</button>
      </div>

    </div>
  `;

  container.querySelector('#prog-dash-btn')?.addEventListener('click', () => onNavigate('dashboard'));
}