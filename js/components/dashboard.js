// Home Academy Student Dashboard Component
// Persistent Personal Profile, Welcome Back Experience, and 6-Topic Progress

import { stateManager } from '../state.js';
import { getLevelInfo } from '../utils/helpers.js';
import { sound } from '../audio.js';
import { generateDailyDrill } from '../data/curriculum.js';
import { 
  keyIcon, schoolIcon, bookIcon, roleplayIcon, puzzleIcon, graduationCapIcon, 
  trophyIcon, userIcon, sparkIcon, refreshIcon, checkCircleIcon, pencilIcon, dashboardIcon, 
  gamepadIcon, infoIcon 
} from './icons.js';

export function renderDashboard(container, onNavigate) {
  const student = stateManager.getCurrentStudent();

  // If no student is logged in, show clean inviting empty state
  if (!student) {
    container.innerHTML = `
      <div class="container" style="padding-top: 50px; padding-bottom: 70px; text-align: center; max-width: 650px;">
        <div class="ha-card" style="padding: 48px 32px; border-top: 6px solid var(--ha-navy);">
          <img src="assets/logo.png" alt="Home Academy Logo" style="height: 75px; width: auto; object-fit: contain; margin-bottom: 20px;" />
          <h2 style="font-size: 1.8rem; color: var(--ha-navy); margin-bottom: 10px;">Welcome to Home Academy</h2>
          <p style="font-size: 1rem; color: var(--ha-text-muted); margin-bottom: 24px; line-height: 1.6;">
            English Language Program taught by <strong>Sir Zubair</strong>. Log in with your email and password, or join the class with code <strong>HOME-ENGLISH</strong> to access your personal dashboard and track your learning progress.
          </p>
          <div style="display: flex; justify-content: center; gap: 14px; flex-wrap: wrap;">
            <button class="btn btn-primary btn-lg" id="dash-empty-login-btn" style="display: inline-flex; align-items: center; gap: 8px;">
              ${keyIcon(18)} Student Log In
            </button>
            <button class="btn btn-secondary btn-lg" id="dash-empty-join-btn" style="display: inline-flex; align-items: center; gap: 8px;">
              ${schoolIcon(18)} Join Class
            </button>
            <button class="btn btn-outline btn-lg" id="dash-empty-explore-btn" style="display: inline-flex; align-items: center; gap: 8px;">
              ${bookIcon(18)} Preview Curriculum
            </button>
          </div>
        </div>
      </div>
    `;

    container.querySelector('#dash-empty-login-btn')?.addEventListener('click', () => {
      sound.playClick();
      window.dispatchEvent(new CustomEvent('ha:open-join-modal', { detail: { tab: 'login' } }));
    });

    container.querySelector('#dash-empty-join-btn')?.addEventListener('click', () => {
      sound.playClick();
      window.dispatchEvent(new CustomEvent('ha:open-join-modal', { detail: { tab: 'register' } }));
    });

    container.querySelector('#dash-empty-explore-btn')?.addEventListener('click', () => {
      sound.playClick();
      onNavigate('topics');
    });

    return;
  }

  const levelInfo = getLevelInfo(student.xp || 0);
  const rankInfo = stateManager.getStudentRank(student.id);
  const activeTopics = stateManager.getActiveCurriculum();
  const studentTopicProg = student.topicProgress || {};
  const roleplayProg = stateManager.getStudentRoleplayProgress(student.id);

  // Welcome Back Experience
  const isReturning = (student.xp > 0 || (student.topicProgress && Object.keys(student.topicProgress).length > 0));
  const welcomeHeadline = isReturning ? `Welcome back, ${student.name}!` : `Welcome, ${student.name}!`;
  const welcomeSubtext = isReturning 
    ? "Ready to continue your English practice?" 
    : "Your personal learning account is ready. Let's start with your first class topic!";

  // Count mastered topics for this specific student
  const masteredCount = activeTopics.filter(t => {
    const p = studentTopicProg[t.id];
    return p && (p.passed || (p.quizScore && p.quizScore >= 80));
  }).length;

  container.innerHTML = `
    <div class="container" style="padding-top: 24px; padding-bottom: 50px;">
      
      <!-- Welcome Back Experience Banner -->
      <div style="background: linear-gradient(135deg, #0A2558 0%, #163B7C 100%); color: #FFFFFF; border-radius: var(--radius-xl); padding: 26px 30px; margin-bottom: 28px; box-shadow: var(--ha-shadow-md); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 18px;">
        <div style="display: flex; align-items: center; gap: 18px;">
          <div style="font-size: 2.2rem; background: rgba(255,255,255,0.15); border: 2px solid rgba(255,255,255,0.3); border-radius: var(--radius-pill); width: 64px; height: 64px; display: flex; align-items: center; justify-content: center; color: #FFF;">
            ${userIcon(32)}
          </div>
          <div>
            <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap; margin-bottom: 4px;">
              <h1 style="font-size: 1.85rem; color: #FFFFFF; font-weight: 800; line-height: 1.2;">${welcomeHeadline}</h1>
              <span class="badge" style="background: var(--ha-gold); color: #061838; font-weight: 800;">Level ${student.level} • ${levelInfo.title}</span>
            </div>
            <p style="font-size: 0.95rem; color: #E2E8F0;">
              ${welcomeSubtext} • Class Teacher: <strong>Sir Zubair</strong>
            </p>
          </div>
        </div>

        <!-- Top-Right Actions: Continue Learning, My Profile, Logout -->
        <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
          <button class="btn btn-accent btn-sm" id="btn-welcome-continue" style="display: inline-flex; align-items: center; gap: 6px;">
            ${sparkIcon(14)} CONTINUE LEARNING
          </button>
          <button class="btn btn-outline btn-sm" id="btn-dash-profile" style="background: rgba(255,255,255,0.15); color: #FFF; border-color: rgba(255,255,255,0.4); display: inline-flex; align-items: center; gap: 6px;">
            ${userIcon(14)} My Profile
          </button>
          <button class="btn btn-outline btn-sm" id="btn-dash-logout" style="background: rgba(200,16,46,0.25); color: #FFF; border-color: rgba(200,16,46,0.6); display: inline-flex; align-items: center; gap: 6px;" title="Log out of this account">
            ${keyIcon(14)} Logout
          </button>
        </div>
      </div>

      <!-- Stats Overview Grid -->
      <div class="stats-grid">
        <div class="stat-pill-card">
          <div class="stat-icon-bubble gold" style="display: flex; align-items: center; justify-content: center; color: var(--ha-gold-dark);">
            ${trophyIcon(22)}
          </div>
          <div class="stat-content">
            <div class="stat-label">CURRENT LEVEL</div>
            <div class="stat-value">Level ${levelInfo.level}</div>
            <div style="font-size: 0.78rem; font-weight: 700; color: var(--ha-gold-dark);">
              ${levelInfo.title}
            </div>
          </div>
        </div>

        <div class="stat-pill-card">
          <div class="stat-icon-bubble navy" style="display: flex; align-items: center; justify-content: center; color: var(--ha-navy);">
            ${sparkIcon(22)}
          </div>
          <div class="stat-content">
            <div class="stat-label">TOTAL XP</div>
            <div class="stat-value">${student.xp || 0} XP</div>
            <div style="font-size: 0.78rem; color: var(--ha-text-muted);">
              ${levelInfo.xpToNext} XP to next level
            </div>
          </div>
        </div>

        <div class="stat-pill-card">
          <div class="stat-icon-bubble red" style="display: flex; align-items: center; justify-content: center; color: var(--ha-red);">
            ${checkCircleIcon(22)}
          </div>
          <div class="stat-content">
            <div class="stat-label">DAY STREAK</div>
            <div class="stat-value">${student.streak || 0} Days</div>
            <div style="font-size: 0.78rem; font-weight: 700; color: var(--ha-red);">
              ${student.streak > 0 ? 'Active streak!' : 'Practice today to begin!'}
            </div>
          </div>
        </div>

        <div class="stat-pill-card">
          <div class="stat-icon-bubble gold" style="display: flex; align-items: center; justify-content: center; color: var(--ha-gold-dark);">
            ${trophyIcon(22)}
          </div>
          <div class="stat-content">
            <div class="stat-label">CLASS RANK</div>
            <div class="stat-value">Rank #${rankInfo.rank || 1}</div>
            <div style="font-size: 0.78rem; color: var(--ha-text-muted);">
              Out of ${rankInfo.totalStudents} classmates
            </div>
          </div>
        </div>
      </div>

      <!-- Today's English Practice Drill (6 Topics) -->
      <div class="challenge-hero-card" id="todays-drill-section" style="margin-bottom: 36px;">
        <div style="max-width: 650px;">
          <div class="challenge-badge-row">
            <span class="badge badge-gold">Daily English Practice</span>
            <span class="badge" style="background: rgba(255,255,255,0.2); color: #fff;">+50 Bonus XP</span>
          </div>
          <h2 class="challenge-title">Today's Practice</h2>
          <p class="challenge-desc">
            Complete your daily 6-question quick drill drawn from each of the 6 active topics:
            <em>Adjectives, Genitive 's, Question Words, Whose, Possessive Adjectives, and What Color.</em>
          </p>
          <button class="btn btn-accent btn-lg" id="btn-start-daily-drill" style="display: inline-flex; align-items: center; gap: 8px;">
            ${sparkIcon(16)} START TODAY'S PRACTICE
          </button>
        </div>
      </div>

      <!-- Pillar 1: Topic Practice (The 6 Active Class Topics) -->
      <div style="margin-bottom: 40px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; flex-wrap: wrap; gap: 10px;">
          <div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span class="badge badge-navy">Pillar 1</span>
              <h2 style="font-size: 1.5rem; color: var(--ha-navy); margin: 0; display: flex; align-items: center; gap: 8px;">
                <span style="color: var(--ha-navy);">${bookIcon(22)}</span> Topic Practice
              </h2>
            </div>
            <p style="font-size: 0.88rem; color: var(--ha-text-muted); margin-top: 4px;">
              Master lessons taught in class by <strong>Sir Zubair</strong> (${masteredCount} of ${activeTopics.length} Mastered) • Fresh questions every time!
            </p>
          </div>
          <button class="btn btn-outline btn-sm" id="btn-view-all-topics">
            Open Topics Library →
          </button>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 18px;">
          ${activeTopics.map(topic => {
            const prog = studentTopicProg[topic.id] || {};
            const isMastered = prog.passed || (prog.quizScore && prog.quizScore >= 80);
            const inProgress = prog.learned || (prog.practiceCount && prog.practiceCount > 0);
            
            let statusText = 'Not Started';
            let statusBadge = 'badge-navy';
            let percent = 0;

            if (isMastered) {
              statusText = 'Mastered';
              statusBadge = 'badge-success';
              percent = 100;
            } else if (inProgress) {
              statusText = 'In Practice';
              statusBadge = 'badge-gold';
              percent = prog.learned && prog.practiceCount ? 60 : 30;
            }

            return `
              <div class="ha-card topic-dash-card" data-id="${topic.id}" style="padding: 20px; cursor: pointer; border-top: 4px solid ${topic.color}; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                  <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
                    <div style="display: flex; align-items: center; gap: 10px;">
                      <span style="font-size: 1.5rem; color: ${topic.color};">${bookIcon(24)}</span>
                      <div>
                        <span style="font-size: 0.75rem; font-weight: 800; color: ${topic.color}; text-transform: uppercase;">Topic ${topic.number}</span>
                        <h3 style="font-size: 1.1rem; color: var(--ha-navy);">${topic.title}</h3>
                      </div>
                    </div>
                    <span class="badge ${statusBadge}">${statusText}</span>
                  </div>

                  <p style="font-size: 0.82rem; color: var(--ha-text-muted); margin-bottom: 14px; line-height: 1.4;">
                    ${topic.subtitle}
                  </p>
                </div>

                <div>
                  <div style="display: flex; justify-content: space-between; font-size: 0.78rem; font-weight: 700; color: var(--ha-navy); margin-bottom: 4px;">
                    <span>Progress</span>
                    <span style="color: ${percent === 100 ? 'var(--ha-success)' : 'var(--ha-navy)'};">${percent}%</span>
                  </div>
                  <div class="progress-container" style="height: 7px; margin-bottom: 12px;">
                    <div class="progress-bar-fill" style="width: ${percent}%; background: ${topic.color};"></div>
                  </div>
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-size: 0.75rem; color: var(--ha-text-muted);">5-Step Mastery</span>
                    <button class="btn btn-primary btn-sm" style="background: ${topic.color}; padding: 4px 12px; font-size: 0.8rem;">
                      ${isMastered ? 'Review →' : 'Practice →'}
                    </button>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Pillar 2: Grammar Activities Hub -->
      <div style="margin-bottom: 40px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; flex-wrap: wrap; gap: 10px;">
          <div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span class="badge badge-gold">Pillar 2</span>
              <h2 style="font-size: 1.5rem; color: var(--ha-navy); margin: 0; display: flex; align-items: center; gap: 8px;">
                <span style="color: #059669;">${gamepadIcon(22)}</span> Grammar Activities
              </h2>
            </div>
            <p style="font-size: 0.88rem; color: var(--ha-text-muted); margin-top: 4px;">
              Interactive skill activities for every topic: matching, scrambles, true/false, and sentence building!
            </p>
          </div>
          <button class="btn btn-secondary btn-sm" id="btn-open-activities-hub">
            View All Activities Hub →
          </button>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 18px;">
          
          <div class="ha-card dash-activity-card" data-activity="scramble" style="cursor: pointer; border-top: 4px solid #2563eb; padding: 20px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
              <span style="color: #2563eb;">${puzzleIcon(24)}</span>
              <span class="badge badge-navy">+25 XP</span>
            </div>
            <h3 style="font-size: 1.15rem; color: var(--ha-navy); margin-bottom: 4px;">Sentence Scramble</h3>
            <p style="font-size: 0.82rem; color: var(--ha-text-muted); line-height: 1.4; margin-bottom: 14px;">
              Unscramble words to construct grammatically correct class sentences.
            </p>
            <button class="btn btn-primary btn-sm" style="width: 100%; background: #2563eb;">Play Scramble →</button>
          </div>

          <div class="ha-card dash-activity-card" data-activity="matching" style="cursor: pointer; border-top: 4px solid #059669; padding: 20px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
              <span style="color: #059669;">${refreshIcon(24)}</span>
              <span class="badge badge-success">+30 XP</span>
            </div>
            <h3 style="font-size: 1.15rem; color: var(--ha-navy); margin-bottom: 4px;">Pair Matching</h3>
            <p style="font-size: 0.82rem; color: var(--ha-text-muted); line-height: 1.4; margin-bottom: 14px;">
              Match opposites, owner-possessions, and question-word targets.
            </p>
            <button class="btn btn-primary btn-sm" style="width: 100%; background: #059669;">Play Matching →</button>
          </div>

          <div class="ha-card dash-activity-card" data-activity="true_false" style="cursor: pointer; border-top: 4px solid #d97706; padding: 20px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
              <span style="color: #d97706;">${checkCircleIcon(24)}</span>
              <span class="badge badge-gold">+20 XP</span>
            </div>
            <h3 style="font-size: 1.15rem; color: var(--ha-navy); margin-bottom: 4px;">True or False</h3>
            <p style="font-size: 0.82rem; color: var(--ha-text-muted); line-height: 1.4; margin-bottom: 14px;">
              Test grammar rules and learn with Sir Zubair's explanations.
            </p>
            <button class="btn btn-primary btn-sm" style="width: 100%; background: #d97706;">Play True/False →</button>
          </div>

          <div class="ha-card dash-activity-card" data-activity="builder" style="cursor: pointer; border-top: 4px solid #7c3aed; padding: 20px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
              <span style="color: #7c3aed;">${pencilIcon(24)}</span>
              <span class="badge badge-navy">+25 XP</span>
            </div>
            <h3 style="font-size: 1.15rem; color: var(--ha-navy); margin-bottom: 4px;">Sentence Builder</h3>
            <p style="font-size: 0.82rem; color: var(--ha-text-muted); line-height: 1.4; margin-bottom: 14px;">
              Assemble word chips in proper English grammar order.
            </p>
            <button class="btn btn-primary btn-sm" style="width: 100%; background: #7c3aed;">Build Sentences →</button>
          </div>

        </div>
      </div>

      <!-- Pillar 3: Full Grammar Test (Comprehensive Assessment Zone) -->
      <div style="margin-bottom: 42px;">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 14px;">
          <span class="badge badge-red">Pillar 3</span>
          <h2 style="font-size: 1.5rem; color: var(--ha-navy); margin: 0; display: flex; align-items: center; gap: 8px;">
            <span style="color: var(--ha-red);">${graduationCapIcon(22)}</span> Full Grammar Test
          </h2>
        </div>

        <div style="background: linear-gradient(135deg, #0A2558 0%, #163B7C 100%); border-radius: var(--radius-xl); padding: 30px; color: #FFFFFF; box-shadow: var(--ha-shadow-md); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 24px;">
          <div style="max-width: 600px;">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
              <span class="badge badge-gold">Mastery Exam</span>
              <span style="font-size: 0.8rem; color: #E2E8F0;">Covers all ${activeTopics.length} Active Topics</span>
            </div>
            <h3 style="font-size: 1.65rem; color: #FFFFFF; font-weight: 800; margin: 0 0 8px; line-height: 1.25;">
              Official Full Grammar Assessment
            </h3>
            <p style="font-size: 0.92rem; color: #E2E8F0; line-height: 1.5; margin-bottom: 18px;">
              One combined exam testing all 6 active grammar topics taught by <strong>Sir Zubair</strong>.
              Generates a <strong>fresh set of randomized questions every single attempt</strong>.
            </p>
            <div style="display: flex; gap: 14px; flex-wrap: wrap;">
              <div style="background: rgba(255,255,255,0.12); padding: 8px 14px; border-radius: var(--radius-md); border: 1px solid rgba(255,255,255,0.2);">
                <div style="font-size: 0.72rem; text-transform: uppercase; color: #CBD5E1;">BEST SCORE</div>
                <div style="font-size: 1.3rem; font-weight: 800; color: var(--ha-gold);">${student.stats?.bestFullTestScore || 0}%</div>
              </div>
              <div style="background: rgba(255,255,255,0.12); padding: 8px 14px; border-radius: var(--radius-md); border: 1px solid rgba(255,255,255,0.2);">
                <div style="font-size: 0.72rem; text-transform: uppercase; color: #CBD5E1;">TESTS TAKEN</div>
                <div style="font-size: 1.3rem; font-weight: 800; color: #FFFFFF;">${(student.fullTestHistory || []).length}</div>
              </div>
              <div style="background: rgba(255,255,255,0.12); padding: 8px 14px; border-radius: var(--radius-md); border: 1px solid rgba(255,255,255,0.2);">
                <div style="font-size: 0.72rem; text-transform: uppercase; color: #CBD5E1;">PASS REWARD</div>
                <div style="font-size: 1.3rem; font-weight: 800; color: #34D399;">+75 XP</div>
              </div>
            </div>
          </div>

          <div>
            <button class="btn btn-accent btn-lg" id="btn-launch-full-test" style="padding: 16px 28px; font-size: 1.1rem; box-shadow: 0 4px 14px rgba(245, 158, 11, 0.4); font-weight: 800; display: inline-flex; align-items: center; gap: 10px;">
              ${graduationCapIcon(20)} START FULL GRAMMAR TEST
            </button>
          </div>
        </div>
      </div>

      <!-- Roleplay Presentations Module -->
      <div style="margin-bottom: 42px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 10px;">
          <div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span class="badge badge-red">Speaking & Real Class</span>
              <h2 style="font-size: 1.5rem; color: var(--ha-navy); margin: 0; display: flex; align-items: center; gap: 8px;">
                <span style="color: var(--ha-red);">${roleplayIcon(22)}</span> Roleplay Presentations
              </h2>
            </div>
            <p style="font-size: 0.88rem; color: var(--ha-text-muted); margin-top: 4px;">
              Practice the real-life conversations and presentations you've already performed in class with <strong>Sir Zubair</strong>.
            </p>
          </div>
          <button class="btn btn-primary btn-sm" id="btn-dash-open-roleplays">
            Practice Roleplays →
          </button>
        </div>

        <div class="ha-card" style="padding: 24px; border-radius: var(--radius-xl); border-left: 6px solid var(--ha-navy); background: #FFFFFF; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px;">
          <div style="max-width: 580px;">
            <h3 style="font-size: 1.25rem; color: var(--ha-navy); font-weight: 800; margin: 0 0 6px;">
              5 Real Classroom Presentations
            </h3>
            <p style="font-size: 0.9rem; color: var(--ha-text-muted); line-height: 1.5; margin-bottom: 12px;">
              Build spoken fluency, explore teacher expressions, create your own sentences, and engage in interactive dialogues across all 5 physical class presentations.
            </p>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
              <span class="badge" style="background: var(--ha-navy-subtle); color: var(--ha-navy); font-weight: 700;">01. Friend's House</span>
              <span class="badge" style="background: var(--ha-navy-subtle); color: var(--ha-navy); font-weight: 700;">02. Police Officer</span>
              <span class="badge" style="background: var(--ha-navy-subtle); color: var(--ha-navy); font-weight: 700;">03. Family & Jobs</span>
              <span class="badge" style="background: var(--ha-navy-subtle); color: var(--ha-navy); font-weight: 700;">04. Lost Children</span>
              <span class="badge" style="background: var(--ha-navy-subtle); color: var(--ha-navy); font-weight: 700;">05. New School / College</span>
            </div>
          </div>

          <div style="background: var(--ha-navy-subtle); border-radius: var(--radius-lg); padding: 18px 24px; min-width: 210px; text-align: center;">
            <div style="font-size: 0.75rem; font-weight: 800; color: var(--ha-text-muted); text-transform: uppercase; margin-bottom: 4px;">
              ROLEPLAY PROGRESS
            </div>
            <div style="font-size: 2rem; font-weight: 800; color: var(--ha-navy); margin-bottom: 2px;">
              ${roleplayProg.completedCount} / ${roleplayProg.totalCount}
            </div>
            <div style="font-size: 0.82rem; font-weight: 700; color: var(--ha-gold-dark); margin-bottom: 8px;">
              ${roleplayProg.overallPercent}% Completed
            </div>
            <div class="progress-container" style="height: 6px; width: 140px; margin: 0 auto; background: #CBD5E1;">
              <div class="progress-bar-fill" style="width: ${roleplayProg.overallPercent}%;"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions Grid -->
      <div>
        <h2 style="font-size: 1.3rem; color: var(--ha-navy); margin-bottom: 16px;">Quick Actions</h2>
        <div class="quick-play-grid">
          <div class="quick-play-card" id="qa-topics">
            <span class="quick-play-icon" style="color: var(--ha-navy);">${bookIcon(28)}</span>
            <div class="quick-play-title">Class Topics</div>
            <div class="quick-play-meta">Study the 6 physical class topics</div>
          </div>

          <div class="quick-play-card" id="qa-roleplays">
            <span class="quick-play-icon" style="color: var(--ha-red);">${roleplayIcon(28)}</span>
            <div class="quick-play-title">Roleplays</div>
            <div class="quick-play-meta">5 real class speaking presentations</div>
          </div>

          <div class="quick-play-card" id="qa-activities">
            <span class="quick-play-icon" style="color: #059669;">${puzzleIcon(28)}</span>
            <div class="quick-play-title">Activities Hub</div>
            <div class="quick-play-meta">Sentence Scramble, Matching, True/False</div>
          </div>

          <div class="quick-play-card" id="qa-fulltest">
            <span class="quick-play-icon" style="color: var(--ha-navy);">${graduationCapIcon(28)}</span>
            <div class="quick-play-title">Full Grammar Test</div>
            <div class="quick-play-meta">Comprehensive combined assessment</div>
          </div>

          <div class="quick-play-card" id="qa-leaderboard">
            <span class="quick-play-icon" style="color: var(--ha-gold-dark);">${trophyIcon(28)}</span>
            <div class="quick-play-title">Class Leaderboard</div>
            <div class="quick-play-meta">See your rank among classmates</div>
          </div>

          <div class="quick-play-card" id="qa-profile">
            <span class="quick-play-icon" style="color: var(--ha-navy);">${userIcon(28)}</span>
            <div class="quick-play-title">My Account</div>
            <div class="quick-play-meta">View profile, email & settings</div>
          </div>
        </div>
      </div>

      <!-- Mount for Today's Drill Modal -->
      <div id="daily-drill-mount"></div>

    </div>
  `;

  // Attach Event Listeners
  container.querySelector('#btn-welcome-continue')?.addEventListener('click', () => {
    sound.playClick();
    const drillSection = container.querySelector('#todays-drill-section');
    if (drillSection) {
      drillSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      onNavigate('topics');
    }
  });

  container.querySelector('#btn-dash-profile')?.addEventListener('click', () => {
    sound.playClick();
    onNavigate('profile');
  });

  container.querySelector('#btn-dash-logout')?.addEventListener('click', () => {
    sound.playClick();
    if (confirm(`Are you sure you want to log out of ${student.name}'s account?`)) {
      stateManager.logout();
      onNavigate('home');
    }
  });

  container.querySelector('#btn-view-all-topics')?.addEventListener('click', () => {
    sound.playClick();
    onNavigate('topics');
  });

  container.querySelectorAll('.topic-dash-card').forEach(card => {
    card.addEventListener('click', () => {
      sound.playClick();
      const topicId = card.dataset.id;
      onNavigate('topics');
      window.dispatchEvent(new CustomEvent('ha:open-topic', { detail: topicId }));
    });
  });

  container.querySelector('#btn-open-activities-hub')?.addEventListener('click', () => {
    sound.playClick();
    onNavigate('activities');
  });

  container.querySelectorAll('.dash-activity-card').forEach(card => {
    card.addEventListener('click', () => {
      sound.playClick();
      const activityType = card.dataset.activity;
      onNavigate('activities');
      window.dispatchEvent(new CustomEvent('ha:open-activity', {
        detail: { activityType }
      }));
    });
  });

  container.querySelector('#btn-launch-full-test')?.addEventListener('click', () => {
    sound.playClick();
    onNavigate('full-test');
  });

  container.querySelector('#btn-dash-open-roleplays')?.addEventListener('click', () => {
    sound.playClick();
    onNavigate('roleplays');
  });

  container.querySelector('#qa-topics')?.addEventListener('click', () => onNavigate('topics'));
  container.querySelector('#qa-roleplays')?.addEventListener('click', () => onNavigate('roleplays'));
  container.querySelector('#qa-activities')?.addEventListener('click', () => onNavigate('activities'));
  container.querySelector('#qa-fulltest')?.addEventListener('click', () => onNavigate('full-test'));
  container.querySelector('#qa-leaderboard')?.addEventListener('click', () => onNavigate('leaderboard'));
  container.querySelector('#qa-profile')?.addEventListener('click', () => onNavigate('profile'));

  // Today's Practice 6-Question Drill Modal Launcher
  container.querySelector('#btn-start-daily-drill')?.addEventListener('click', () => {
    sound.playClick();
    launchDailyDrill(container.querySelector('#daily-drill-mount'));
  });

  function launchDailyDrill(mount) {
    const drillQuestions = generateDailyDrill(activeTopics);
    let drillIndex = 0;
    let drillScore = 0;

    function renderDrillStep() {
      if (drillIndex >= drillQuestions.length) {
        sound.playLevelUp();
        stateManager.addXP(50, 'daily_drill_complete');
        stateManager.recordActivityStats('practiceRounds', 1);

        mount.innerHTML = `
          <div class="ha-modal-backdrop" style="display: flex;">
            <div class="ha-modal-dialog" style="text-align: center;">
              <div style="display: flex; justify-content: center; margin-bottom: 16px; color: var(--ha-gold);">
                ${trophyIcon(60)}
              </div>
              <h2 style="font-size: 1.8rem; color: var(--ha-navy); margin: 10px 0;">Daily Practice Complete!</h2>
              <p style="font-size: 1rem; color: var(--ha-text-muted); margin-bottom: 16px;">
                Great work! You completed today's practice drill across all 6 topics! You scored <strong>${drillScore} / ${drillQuestions.length}</strong> and earned <strong>+50 Bonus XP</strong>!
              </p>
              <button class="btn btn-primary" id="btn-close-drill">Return to Dashboard</button>
            </div>
          </div>
        `;
        mount.querySelector('#btn-close-drill')?.addEventListener('click', () => {
          mount.innerHTML = '';
          renderDashboard(container, onNavigate);
        });
        return;
      }

      const q = drillQuestions[drillIndex];

      mount.innerHTML = `
        <div class="ha-modal-backdrop" style="display: flex;">
          <div class="ha-modal-dialog">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
              <span class="badge badge-navy" style="display: inline-flex; align-items: center; gap: 6px;">
                ${bookIcon(14)} ${q.topicTitle}
              </span>
              <span style="font-size: 0.85rem; font-weight: 700; color: var(--ha-navy);">Question ${drillIndex + 1} of ${drillQuestions.length}</span>
            </div>

            <h3 style="font-size: 1.25rem; color: var(--ha-navy); margin-bottom: 20px;">
              ${q.question}
            </h3>

            <div style="display: grid; grid-template-columns: 1fr; gap: 10px; margin-bottom: 20px;" id="drill-options">
              ${(q.options || []).map((opt, idx) => `
                <button class="drill-opt-btn" data-index="${idx}" data-text="${opt}"
                  style="padding: 12px 16px; font-size: 0.95rem; font-weight: 700; color: var(--ha-navy); background: #F8FAFC; border: 1.5px solid var(--ha-border); border-radius: var(--radius-md); text-align: left; cursor: pointer;">
                  ${opt}
                </button>
              `).join('')}
            </div>

            <div id="drill-feedback" style="display: none; padding: 12px; border-radius: var(--radius-sm); margin-bottom: 16px; font-size: 0.9rem; font-weight: 700;"></div>

            <div style="display: flex; justify-content: flex-end;">
              <button class="btn btn-primary" id="btn-drill-next" style="display: none;">Next →</button>
            </div>
          </div>
        </div>
      `;

      const optBtns = mount.querySelectorAll('.drill-opt-btn');
      const feedback = mount.querySelector('#drill-feedback');
      const nextBtn = mount.querySelector('#btn-drill-next');

      optBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          optBtns.forEach(b => b.disabled = true);
          const chosen = btn.dataset.text;
          const chosenIdx = parseInt(btn.dataset.index);
          const isCorrect = q.type === 'fill' ? chosen.toLowerCase() === q.answer.toLowerCase() : chosenIdx === q.answer;

          if (isCorrect) {
            drillScore++;
            sound.playCorrect();
            btn.style.borderColor = 'var(--ha-success)';
            btn.style.background = 'var(--ha-success-bg)';
            btn.style.color = 'var(--ha-success)';
            feedback.style.background = 'var(--ha-success-bg)';
            feedback.style.color = 'var(--ha-success)';
            feedback.innerHTML = `<span style="display: inline-flex; align-items: center; gap: 6px;">${checkCircleIcon(16)} Correct!</span>`;
          } else {
            sound.playWrong();
            btn.style.borderColor = 'var(--ha-error)';
            btn.style.background = 'var(--ha-red-light)';
            btn.style.color = 'var(--ha-red)';
            feedback.style.background = 'var(--ha-red-light)';
            feedback.style.color = 'var(--ha-red)';
            feedback.innerHTML = `<span style="display: inline-flex; align-items: center; gap: 6px;">${infoIcon(16)} ${q.explanation || 'Incorrect'}</span>`;
          }

          feedback.style.display = 'block';
          nextBtn.style.display = 'inline-flex';
        });
      });

      nextBtn.addEventListener('click', () => {
        sound.playClick();
        drillIndex++;
        renderDrillStep();
      });
    }

    renderDrillStep();
  }
}