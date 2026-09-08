// Home Academy Centralized State Management - Persistent Student Profiles & Real Backend Integration
// Strictly for Home Academy English Language Program

import { INITIAL_CLASS, INITIAL_STUDENTS, ACHIEVEMENTS } from './data/initial-data.js';
import { OFFICIAL_TOPICS } from './data/curriculum.js';
import { OFFICIAL_ROLEPLAYS } from './data/roleplay-data.js';
import { getLevelInfo } from './utils/helpers.js';
import { sound } from './audio.js';
import { fireConfetti } from './confetti.js';
import { generateSalt, hashPassword, verifyPassword } from './utils/crypto.js';
import { apiClient } from './services/apiClient.js';

const STORAGE_KEY = 'home_academy_v3_production';
const SESSION_KEY = 'home_academy_active_session';

class StateManager {
  constructor() {
    this.listeners = [];
    this.state = this.loadState();

    // Asynchronously connect to persistent backend database and start real-time SSE sync
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        this.initBackend().catch(err => console.warn('Backend sync notice:', err));
      }, 0);
    }
  }

  loadState() {
    // Purge any legacy fake data or cached test students from localStorage
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem('home_academy_v1_state');
        localStorage.removeItem('home_academy_v2_clean');
        localStorage.removeItem('home_academy_test_state');
      }
    } catch (e) {}

    // Check if an active session exists
    let activeSessionId = null;
    try {
      if (typeof localStorage !== 'undefined') {
        activeSessionId = localStorage.getItem(SESSION_KEY);
      }
    } catch (e) {}

    const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        // Clean roster guarantee: students array defaults to empty if not an array
        if (!Array.isArray(parsed.students)) {
          parsed.students = [];
        }
        if (!parsed.classInfo) {
          parsed.classInfo = INITIAL_CLASS;
        } else if (!parsed.classInfo.teacher || parsed.classInfo.teacher === 'Home Academy Instructor') {
          parsed.classInfo.teacher = 'Sir Zubair';
        }
        if (!parsed.achievements) {
          parsed.achievements = ACHIEVEMENTS;
        }
        if (!Array.isArray(parsed.curriculumTopics)) {
          parsed.curriculumTopics = OFFICIAL_TOPICS;
        } else if (parsed.curriculumTopics.length === 0 && !parsed.curriculumCustomized) {
          parsed.curriculumTopics = OFFICIAL_TOPICS;
        }
        if (!Array.isArray(parsed.roleplays) || parsed.roleplays.length === 0) {
          parsed.roleplays = JSON.parse(JSON.stringify(OFFICIAL_ROLEPLAYS));
        }

        // Ensure all students have a clean roleplayProgress object
        if (Array.isArray(parsed.students)) {
          parsed.students.forEach(s => {
            if (!s.roleplayProgress) s.roleplayProgress = {};
          });
        }

        // Auto-login returning student if session ID is valid
        if (activeSessionId && parsed.students.length > 0) {
          const matched = parsed.students.find(s => s.id === activeSessionId);
          if (matched) {
            parsed.currentStudentId = matched.id;
          } else {
            parsed.currentStudentId = null;
          }
        } else {
          parsed.currentStudentId = null;
        }

        // Ensure teacher credentials exist with initial password pakistan786
        if (!parsed.teacherAuth) {
          parsed.teacherAuth = {
            username: 'teacher',
            email: 'teacher@homeacademy.com',
            password: 'pakistan786'
          };
        } else if (parsed.teacherAuth.password === 'admin123') {
          parsed.teacherAuth.password = 'pakistan786';
        }

        // Security rule: Never inherit admin privilege from previous browser sessions
        parsed.isAdmin = false;

        return parsed;
      } catch (e) {
        console.warn('Failed to parse stored state, initializing clean defaults:', e);
      }
    }

    // Default clean state: ZERO fake students!
    const defaultState = {
      currentStudentId: null,
      classInfo: INITIAL_CLASS,
      students: [], // EMPTY ROSTER
      curriculumTopics: JSON.parse(JSON.stringify(OFFICIAL_TOPICS)),
      curriculumCustomized: false,
      roleplays: JSON.parse(JSON.stringify(OFFICIAL_ROLEPLAYS)),
      achievements: ACHIEVEMENTS,
      teacherAuth: {
        username: 'teacher',
        email: 'teacher@homeacademy.com',
        password: 'pakistan786'
      },
      dailyChallenge: {
        id: 'dc_' + new Date().toISOString().split('T')[0],
        title: "Today's Academy Practice",
        description: 'Complete practice across the active class topics to earn +50 bonus XP!',
        targetTasks: 1,
        xpReward: 50,
        completedDate: null
      },
      todayActivityCount: 0,
      lastActiveDate: new Date().toISOString().split('T')[0],
      isAdmin: false
    };

    this.saveState(defaultState);
    return defaultState;
  }

  saveState(stateToSave = this.state) {
    try {
      if (typeof localStorage !== 'undefined') {
        const cleanState = { ...stateToSave, isAdmin: false };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cleanState));
      }
    } catch (e) {
      console.warn('Error saving state:', e);
    }
  }

  saveSession(studentId) {
    try {
      if (typeof localStorage !== 'undefined') {
        if (studentId) {
          localStorage.setItem(SESSION_KEY, studentId);
        } else {
          localStorage.removeItem(SESSION_KEY);
        }
      }
    } catch (e) {
      console.warn('Error saving session:', e);
    }
  }

  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(cb => cb !== callback);
    };
  }

  notify(event, payload) {
    this.saveState();
    this.listeners.forEach(cb => {
      try {
        cb(event, payload, this.state);
      } catch (err) {
        console.error('Listener callback error:', err);
      }
    });
  }

  // ------------------------------------------------------------------------
  // BACKEND REAL-TIME SYNCHRONIZATION
  // ------------------------------------------------------------------------

  async initBackend() {
    if (typeof window === 'undefined') return;

    try {
      // 1. Sync Class Info
      const classRes = await apiClient.getClassInfo().catch(() => null);
      if (classRes && classRes.success) {
        if (!this.state.classInfo) this.state.classInfo = {};
        this.state.classInfo.name = classRes.className || this.state.classInfo.name;
        this.state.classInfo.code = classRes.classCode || this.state.classInfo.code;
        this.state.classInfo.teacher = classRes.teacher || this.state.classInfo.teacher;
      }

      // 2. Sync Curriculum
      const currRes = await apiClient.getCurriculum().catch(() => null);
      if (currRes && Array.isArray(currRes.topics) && currRes.topics.length > 0) {
        this.state.curriculumTopics = currRes.topics;
      }

      // 3. Sync Roleplays
      const rpRes = await apiClient.getRoleplays().catch(() => null);
      if (rpRes && Array.isArray(rpRes.roleplays) && rpRes.roleplays.length > 0) {
        this.state.roleplays = rpRes.roleplays;
      }

      // 4. Sync Leaderboard / Roster from authoritative server database (Zero fake students)
      const lbRes = await apiClient.getLeaderboard(100).catch(() => null);
      if (lbRes && Array.isArray(lbRes.leaderboard)) {
        this.state.students = lbRes.leaderboard.map(s => ({ ...s }));
      }

      // 5. Restore Persistent Authenticated Student Session
      const me = await apiClient.getMe().catch(() => null);
      if (me) {
        this.state.currentStudentId = me.id;
        const idx = this.state.students.findIndex(s => s.id === me.id);
        if (idx >= 0) {
          this.state.students[idx] = { ...this.state.students[idx], ...me };
        } else {
          this.state.students.push(me);
        }
        this.saveSession(me.id);
        this.notify('STUDENT_LOGGED_IN', me);
      } else {
        // If not authenticated on server, invalidate local session
        this.state.currentStudentId = null;
        this.saveSession(null);
        apiClient.clearToken();
      }

      // 6. Check Admin Session
      const isAdmin = await apiClient.adminGetMe().catch(() => false);
      if (isAdmin) {
        this.state.isAdmin = true;
        this.notify('ADMIN_STATUS_CHANGED', true);
      }

      this.saveState();

      // 7. Subscribe to Server-Sent Events (SSE)
      apiClient.subscribeEvents(async (eventType, eventData) => {
        if (eventType === 'leaderboard_update' || eventType === 'student_joined') {
          const freshLb = await apiClient.getLeaderboard(100).catch(() => null);
          if (freshLb && Array.isArray(freshLb.leaderboard)) {
            this.state.students = freshLb.leaderboard.map(s => ({ ...s }));
            const current = this.getCurrentStudent();
            if (current && !this.state.students.some(s => s.id === current.id)) {
              this.state.students.push(current);
            }
            this.notify('LEADERBOARD_UPDATED', this.state.students);
          }
          if (this.state.currentStudentId) {
            const freshMe = await apiClient.getMe().catch(() => null);
            if (freshMe) {
              const idx = this.state.students.findIndex(s => s.id === freshMe.id);
              if (idx >= 0) this.state.students[idx] = freshMe;
              this.notify('STUDENT_UPDATED', freshMe);
            }
          }
        } else if (eventType === 'curriculum_updated') {
          const curr = await apiClient.getCurriculum().catch(() => null);
          if (curr && Array.isArray(curr.topics)) {
            this.state.curriculumTopics = curr.topics;
            this.notify('CURRICULUM_UPDATED', curr.topics);
          }
        } else if (eventType === 'roleplay_updated') {
          const rps = await apiClient.getRoleplays().catch(() => null);
          if (rps && Array.isArray(rps.roleplays)) {
            this.state.roleplays = rps.roleplays;
            this.notify('ROLEPLAYS_UPDATED', rps.roleplays);
          }
        } else if (eventType === 'settings_updated') {
          if (eventData) {
            this.state.classInfo = { ...this.state.classInfo, ...eventData };
            this.notify('CLASS_SETTINGS_UPDATED', this.state.classInfo);
          }
        }
      });
    } catch (err) {
      console.warn('Backend sync failed:', err);
    }
  }

  // ------------------------------------------------------------------------
  // STUDENT QUERIES & GETTERS
  // ------------------------------------------------------------------------

  getCurrentStudent() {
    if (!this.state.currentStudentId) return null;
    return this.state.students.find(s => s.id === this.state.currentStudentId) || null;
  }

  checkActiveSession() {
    return this.getCurrentStudent();
  }

  setCurrentStudent(studentId) {
    this.state.currentStudentId = studentId;
    this.saveSession(studentId);
    this.notify('STUDENT_SWITCHED', this.getCurrentStudent());
  }

  logout() {
    this.state.currentStudentId = null;
    this.state.isAdmin = false;
    this.saveSession(null);
    apiClient.logout().catch(() => {});
    apiClient.adminLogout().catch(() => {});
    this.notify('STUDENT_LOGGED_OUT', null);
  }

  logoutStudent() {
    this.logout();
  }

  setAdmin(isAdmin) {
    this.state.isAdmin = Boolean(isAdmin);
    if (!this.state.isAdmin) {
      apiClient.adminLogout().catch(() => {});
    }
    this.notify('ADMIN_STATUS_CHANGED', this.state.isAdmin);
  }

  // Teacher Authentication: Verify teacher password
  verifyTeacherLogin(passwordOrIdentifier, optionalPassword) {
    const password = optionalPassword !== undefined ? optionalPassword : passwordOrIdentifier;
    const cleanPass = (password || '').trim();

    if (!cleanPass) {
      throw new Error('Please enter the Teacher Password.');
    }

    const auth = this.state.teacherAuth || { password: 'pakistan786' };
    if (cleanPass !== auth.password) {
      throw new Error('Incorrect teacher password. Please verify and try again.');
    }

    this.setAdmin(true);

    // Concurrently authenticate against backend REST API session
    apiClient.adminLogin(cleanPass).catch(err => {
      console.warn('Backend admin login sync:', err.message);
    });

    return true;
  }

  // Teacher Security Settings: Change Teacher Portal Password
  updateTeacherPassword(currentPassword, newPassword) {
    const auth = this.state.teacherAuth || {
      username: 'teacher',
      email: 'teacher@homeacademy.com',
      password: 'pakistan786'
    };

    if (currentPassword !== auth.password) {
      throw new Error('Current teacher password does not match.');
    }

    if (!newPassword || newPassword.length < 6) {
      throw new Error('New teacher password must be at least 6 characters long.');
    }

    if (newPassword === currentPassword) {
      throw new Error('New password must be different from your current password.');
    }

    auth.password = newPassword;
    this.state.teacherAuth = auth;
    this.saveState();

    // Update backend database
    apiClient.adminChangePassword(newPassword).catch(err => {
      console.warn('Backend teacher password update:', err.message);
    });

    this.notify('TEACHER_PASSWORD_CHANGED', { updatedAt: new Date().toISOString() });
    return true;
  }

  // Teacher Management: Update Class Name, Private Class Code & Teacher Name
  updateClassSettings({ name, code, teacher }) {
    const cleanName = (name || '').trim();
    const cleanCode = (code || '').trim().toUpperCase();
    const cleanTeacher = (teacher || '').trim();

    if (!cleanName) throw new Error('Class name cannot be empty.');
    if (!cleanCode || cleanCode.length < 3) throw new Error('Class code must be at least 3 characters.');

    if (!this.state.classInfo) this.state.classInfo = {};
    this.state.classInfo.name = cleanName;
    this.state.classInfo.code = cleanCode;
    if (cleanTeacher) {
      this.state.classInfo.teacher = cleanTeacher;
    } else if (!this.state.classInfo.teacher) {
      this.state.classInfo.teacher = 'Sir Zubair';
    }

    this.saveState();

    // Update backend database
    apiClient.adminUpdateSettings({ name: cleanName, code: cleanCode, teacher: this.state.classInfo.teacher }).catch(err => {
      console.warn('Backend class settings update:', err.message);
    });

    this.notify('CLASS_SETTINGS_UPDATED', this.state.classInfo);
    return this.state.classInfo;
  }

  // ------------------------------------------------------------------------
  // STUDENT REGISTRATION & LOGIN
  // ------------------------------------------------------------------------

  async registerStudent({ name, email, password, classCode, avatar = '🦁' }) {
    const cleanCode = (classCode || '').trim().toUpperCase();
    const expectedCode = (this.state.classInfo?.code || 'HOME-ENGLISH').toUpperCase();

    if (cleanCode !== expectedCode) {
      throw new Error(`Invalid class code "${classCode}". Please enter the official class code: ${expectedCode}`);
    }

    const cleanName = (name || '').trim();
    if (!cleanName) throw new Error('Please enter your full name.');

    const cleanEmail = (email || '').trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      throw new Error('Please enter a valid email address.');
    }

    if (!password || password.length < 4) {
      throw new Error('Password must be at least 4 characters long.');
    }

    // Check if student with this email already exists locally
    const existing = this.state.students.find(s => s.email && s.email.toLowerCase() === cleanEmail);
    if (existing) {
      throw new Error('An account with this email already exists. Please switch to the "Student Login" tab to enter your password.');
    }

    // Attempt persistent backend registration
    let backendStudent = null;
    try {
      const res = await apiClient.register({
        name: cleanName,
        email: cleanEmail,
        password,
        avatar: avatar || '🦁',
        classCode: expectedCode
      });
      if (res && res.student) {
        backendStudent = res.student;
      }
    } catch (err) {
      // If server returns error, show it directly
      if (err.data && err.data.error) {
        throw new Error(err.data.error);
      }
      console.warn('Backend register fallback to local:', err.message);
    }

    const salt = generateSalt();
    const hash = await hashPassword(password, salt);

    const student = backendStudent || {
      id: 'ha_stu_' + Date.now() + '_' + Math.random().toString(36).substring(2, 8),
      name: cleanName,
      email: cleanEmail,
      passwordHash: hash,
      passwordSalt: salt,
      avatar: avatar || '🦁',
      classCode: expectedCode,
      level: 1,
      xp: 0,
      streak: 0,
      joinedAt: new Date().toISOString(),
      lastActiveDate: new Date().toISOString().split('T')[0],
      topicProgress: {},
      roleplayProgress: {},
      stats: {
        quizzesTaken: 0,
        correctAnswers: 0,
        totalQuestions: 0,
        topicsCompleted: 0,
        gamesPlayed: 0,
        practiceRounds: 0
      },
      unlockedAchievements: ['first_join'],
      weeklyXP: [0, 0, 0, 0, 0, 0, 0]
    };

    const existingIndex = this.state.students.findIndex(s => s.id === student.id || s.email === student.email);
    if (existingIndex >= 0) {
      this.state.students[existingIndex] = student;
    } else {
      this.state.students.push(student);
    }

    this.state.currentStudentId = student.id;
    this.saveSession(student.id);
    this.saveState();

    sound.playSuccess();
    fireConfetti(2000);
    this.notify('STUDENT_JOINED', student);
    return student;
  }

  async loginStudent({ email, password }) {
    const cleanEmail = (email || '').trim().toLowerCase();
    if (!cleanEmail) throw new Error('Please enter your email address.');
    if (!password) throw new Error('Please enter your password.');

    let backendStudent = null;
    try {
      const res = await apiClient.login({ email: cleanEmail, password });
      if (res && res.student) {
        backendStudent = res.student;
      }
    } catch (err) {
      if (err.data && err.data.error) {
        throw new Error(err.data.error);
      }
      console.warn('Backend login fallback to local:', err.message);
    }

    const student = backendStudent || this.state.students.find(s => s.email && s.email.toLowerCase() === cleanEmail);
    if (!student) {
      throw new Error('No student account found with this email. Please check your spelling or register under "New Student Join".');
    }

    if (!backendStudent) {
      if (student.passwordHash && student.passwordSalt) {
        const isValid = await verifyPassword(password, student.passwordHash, student.passwordSalt);
        if (!isValid) {
          throw new Error('Incorrect password. Please verify your password and try again.');
        }
      } else {
        const salt = generateSalt();
        student.passwordSalt = salt;
        student.passwordHash = await hashPassword(password, salt);
      }
    }

    const existingIndex = this.state.students.findIndex(s => s.id === student.id || s.email === student.email);
    if (existingIndex >= 0) {
      this.state.students[existingIndex] = student;
    } else {
      this.state.students.push(student);
    }

    this.state.currentStudentId = student.id;
    this.saveSession(student.id);
    this.saveState();

    sound.playSuccess();
    this.notify('STUDENT_LOGGED_IN', student);
    return student;
  }

  async registerOrLoginStudent({ name, email, password = null, classCode = 'HOME-ENGLISH', avatar = '🦁' }) {
    const cleanEmail = (email || '').trim().toLowerCase();
    const existing = this.state.students.find(s => s.email && s.email.toLowerCase() === cleanEmail);

    if (existing) {
      if (password && existing.passwordHash) {
        return { student: await this.loginStudent({ email: cleanEmail, password }), isReturning: true };
      }
      this.state.currentStudentId = existing.id;
      this.saveSession(existing.id);
      this.saveState();
      this.notify('STUDENT_LOGGED_IN', existing);
      return { student: existing, isReturning: true };
    }

    const effectivePass = password || 'student123';
    const student = await this.registerStudent({ name, email: cleanEmail, password: effectivePass, classCode, avatar });
    return { student, isReturning: false };
  }

  async joinClass(name, classCode, avatar = '🦁', email = null) {
    const autoEmail = email || `${name.toLowerCase().replace(/[^a-z0-9]/g, '') || 'student'}@homeacademy.edu`;
    const res = await this.registerOrLoginStudent({ name, email: autoEmail, password: 'password123', classCode, avatar });
    return res.student;
  }

  // ------------------------------------------------------------------------
  // XP, STREAKS & ACHIEVEMENTS
  // ------------------------------------------------------------------------

  addXP(amount, activityType = 'general') {
    const student = this.getCurrentStudent();
    if (!student) return;

    const prevXP = student.xp || 0;
    const prevLevelInfo = getLevelInfo(prevXP);

    student.xp = (student.xp || 0) + amount;
    const newLevelInfo = getLevelInfo(student.xp);
    student.level = newLevelInfo.level;

    // Track weekly XP (0=Monday ... 6=Sunday)
    const dayOfWeek = (new Date().getDay() + 6) % 7;
    if (!Array.isArray(student.weeklyXP)) student.weeklyXP = [0, 0, 0, 0, 0, 0, 0];
    student.weeklyXP[dayOfWeek] = (student.weeklyXP[dayOfWeek] || 0) + amount;

    // Check streak
    this.updateDailyStreak(student);

    // Track daily challenge
    this.state.todayActivityCount = (this.state.todayActivityCount || 0) + 1;
    if (this.state.todayActivityCount >= this.state.dailyChallenge.targetTasks && !this.state.dailyChallenge.completedDate) {
      this.state.dailyChallenge.completedDate = new Date().toISOString();
      student.xp += this.state.dailyChallenge.xpReward;
      this.notify('DAILY_CHALLENGE_COMPLETED', {
        title: this.state.dailyChallenge.title,
        reward: this.state.dailyChallenge.xpReward
      });
    }

    // Did student level up?
    if (newLevelInfo.level > prevLevelInfo.level) {
      sound.playLevelUp();
      fireConfetti(3500);
      this.notify('LEVEL_UP', {
        student,
        oldLevel: prevLevelInfo,
        newLevel: newLevelInfo
      });
    }

    this.checkAchievements(student);
    this.notify('XP_GAINED', { student, amount, activityType });
  }

  updateDailyStreak(student) {
    const today = new Date().toISOString().split('T')[0];
    if (student.lastActiveDate !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      if (student.lastActiveDate === yesterday) {
        student.streak = (student.streak || 0) + 1;
        student.xp = (student.xp || 0) + 20;
        this.notify('STREAK_INCREASED', { streak: student.streak });
      } else if (!student.lastActiveDate) {
        student.streak = 1;
      }
      student.lastActiveDate = today;
    }
  }

  // ------------------------------------------------------------------------
  // TOPIC & CURRICULUM PROGRESS
  // ------------------------------------------------------------------------

  recordTopicProgress(topicId, step, data = {}) {
    const student = this.getCurrentStudent();
    if (!student) return;

    if (!student.topicProgress) student.topicProgress = {};
    if (!student.topicProgress[topicId]) {
      student.topicProgress[topicId] = {
        learned: false,
        practiceCount: 0,
        quizScore: 0,
        passed: false,
        completedAt: null
      };
    }

    const prog = student.topicProgress[topicId];

    if (step === 'learn') {
      if (!prog.learned) {
        prog.learned = true;
        this.addXP(10, `learn_${topicId}`);
        apiClient.recordTopicLearn(topicId).catch(() => {});
      }
    } else if (step === 'practice') {
      prog.practiceCount = (prog.practiceCount || 0) + 1;
      const earnedXP = data.xp || 15;
      this.addXP(earnedXP, `practice_${topicId}`);
      if (!student.stats) student.stats = {};
      student.stats.practiceRounds = (student.stats.practiceRounds || 0) + 1;
      if (data.correctCount) {
        student.stats.correctAnswers = (student.stats.correctAnswers || 0) + data.correctCount;
        student.stats.totalQuestions = (student.stats.totalQuestions || 0) + (data.totalCount || data.correctCount);
      }
      apiClient.recordTopicPractice(topicId, 1).catch(() => {});
    } else if (step === 'quiz') {
      const scorePercent = data.scorePercent || 0;
      prog.quizScore = Math.max(prog.quizScore || 0, scorePercent);
      if (!student.stats) student.stats = {};
      student.stats.quizzesTaken = (student.stats.quizzesTaken || 0) + 1;
      if (data.correctCount) {
        student.stats.correctAnswers = (student.stats.correctAnswers || 0) + data.correctCount;
        student.stats.totalQuestions = (student.stats.totalQuestions || 0) + (data.totalCount || 5);
      }

      if (scorePercent >= 80) {
        const firstPass = !prog.passed;
        prog.passed = true;
        prog.completedAt = new Date().toISOString();
        if (firstPass) {
          student.stats.topicsCompleted = (student.stats.topicsCompleted || 0) + 1;
          this.addXP(50, `quiz_pass_${topicId}`);
        } else {
          this.addXP(20, `quiz_retake_${topicId}`);
        }
      }

      const submissionToken = data.submissionToken || ('qtok_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7));
      apiClient.recordTopicQuiz(topicId, {
        submissionToken,
        score: data.correctCount || 0,
        total: data.totalCount || 5,
        percent: scorePercent
      }).catch(() => {});
    }

    this.checkAchievements(student);
    this.notify('TOPIC_PROGRESS_UPDATED', { student, topicId, step, prog });
  }

  markQuestionsSeen(topicId, questionIds) {
    const student = this.getCurrentStudent();
    if (!student || !Array.isArray(questionIds)) return;
    if (!student.seenQuestionIds) student.seenQuestionIds = {};
    if (!Array.isArray(student.seenQuestionIds[topicId])) student.seenQuestionIds[topicId] = [];

    questionIds.forEach(id => {
      if (!student.seenQuestionIds[topicId].includes(id)) {
        student.seenQuestionIds[topicId].push(id);
      }
    });
    this.saveState();
  }

  getSeenQuestionIds(topicId) {
    const student = this.getCurrentStudent();
    if (!student || !student.seenQuestionIds) return [];
    return student.seenQuestionIds[topicId] || [];
  }

  // ------------------------------------------------------------------------
  // FULL GRAMMAR TEST
  // ------------------------------------------------------------------------

  recordFullTestResult(result) {
    const student = this.getCurrentStudent();
    if (!student) return { error: 'No active student' };

    if (!student.fullTestHistory) student.fullTestHistory = [];
    if (!student.stats) student.stats = {};

    const isDuplicate = student.fullTestHistory.some(h => h.submissionToken === result.submissionToken);
    if (isDuplicate) {
      return { success: false, duplicate: true, alreadyRecorded: true, xpEarned: 0 };
    }

    student.stats.fullTestsTaken = (student.stats.fullTestsTaken || 0) + 1;
    student.stats.bestFullTestScore = Math.max(student.stats.bestFullTestScore || 0, result.percent || 0);

    const submissionToken = result.submissionToken || ('tok_' + Date.now() + '_' + Math.random());
    const historyEntry = {
      id: 'ft_' + Date.now(),
      submissionToken,
      date: new Date().toISOString(),
      score: result.score || 0,
      total: result.total || 0,
      percent: result.percent || 0,
      passed: result.percent >= 80,
      xpEarned: result.xpEarned || 0,
      topicBreakdown: result.topicBreakdown || {},
      answers: result.answers || []
    };

    student.fullTestHistory.unshift(historyEntry);

    if (result.xpEarned && result.xpEarned > 0) {
      this.addXP(result.xpEarned, 'full_grammar_test');
    }

    // Persist to server
    apiClient.recordFullGrammarTest({
      submissionToken,
      score: result.score || 0,
      total: result.total || 0,
      percent: result.percent || 0,
      topicBreakdown: result.topicBreakdown || {}
    }).catch(() => {});

    if (Array.isArray(result.questionIds)) {
      result.questionIds.forEach(item => {
        if (item && item.topicId && item.id) {
          this.markQuestionsSeen(item.topicId, [item.id]);
        }
      });
    }

    this.checkAchievements(student);
    this.notify('FULL_TEST_COMPLETED', { student, result: historyEntry });
    return { success: true, xpEarned: result.xpEarned || 0, historyEntry };
  }

  // ------------------------------------------------------------------------
  // ACTIVITIES (GAMES)
  // ------------------------------------------------------------------------

  recordActivityCompletion(topicId, activityType, xpReward = 15) {
    const student = this.getCurrentStudent();
    if (!student) return;
    if (!student.activityHistory) student.activityHistory = [];
    if (!student.stats) student.stats = {};

    student.stats.activitiesCompleted = (student.stats.activitiesCompleted || 0) + 1;
    student.stats.gamesPlayed = (student.stats.gamesPlayed || 0) + 1;
    student.activityHistory.unshift({
      id: 'act_' + Date.now(),
      topicId,
      activityType,
      date: new Date().toISOString(),
      xpReward
    });

    this.addXP(xpReward, `activity_${topicId}_${activityType}`);

    // Persist to backend database
    apiClient.recordActivityCompletion({
      topicId,
      activityType,
      xpReward
    }).catch(() => {});

    this.checkAchievements(student);
    this.notify('ACTIVITY_COMPLETED', { student, topicId, activityType });
  }

  recordActivityStats(statKey, count = 1) {
    const student = this.getCurrentStudent();
    if (!student) return;

    if (!student.stats) student.stats = {};
    student.stats[statKey] = (student.stats[statKey] || 0) + count;
    this.checkAchievements(student);
    this.notify('STATS_UPDATED', student);
  }

  checkAchievements(student) {
    const newlyUnlocked = [];
    if (!Array.isArray(student.unlockedAchievements)) {
      student.unlockedAchievements = [];
    }

    this.state.achievements.forEach(ach => {
      if (student.unlockedAchievements.includes(ach.id)) return;
      let qualified = false;

      switch (ach.type) {
        case 'join':
          qualified = true;
          break;
        case 'streak':
          qualified = (student.streak || 0) >= ach.requirement;
          break;
        case 'xp':
          qualified = (student.xp || 0) >= ach.requirement;
          break;
        case 'games_played':
          qualified = (student.stats?.gamesPlayed || 0) >= ach.requirement;
          break;
        case 'topic_master_adjectives':
          qualified = student.topicProgress?.adjectives?.quizScore === 100;
          break;
        case 'topic_master_genitive_s':
          qualified = student.topicProgress?.genitive_s?.quizScore === 100;
          break;
        case 'topic_master_question_words':
          qualified = student.topicProgress?.question_words?.quizScore === 100;
          break;
        case 'topic_master_whose':
          qualified = student.topicProgress?.whose?.quizScore === 100;
          break;
        case 'topic_master_possessive_adjectives':
          qualified = student.topicProgress?.possessive_adjectives?.quizScore === 100;
          break;
        case 'topic_master_what_color_genitive_s':
          qualified = student.topicProgress?.what_color_genitive_s?.quizScore === 100;
          break;
        case 'perfect_quiz':
          qualified = Object.values(student.topicProgress || {}).some(p => p.quizScore === 100);
          break;
        case 'roleplay_complete':
          qualified = Boolean(student.roleplayProgress && ach.roleplayId && student.roleplayProgress[ach.roleplayId]?.completed);
          break;
      }

      if (qualified) {
        student.unlockedAchievements.push(ach.id);
        student.xp = (student.xp || 0) + (ach.xpReward || 0);
        newlyUnlocked.push(ach);
      }
    });

    if (newlyUnlocked.length > 0) {
      sound.playLevelUp();
      fireConfetti(3000);
      newlyUnlocked.forEach(ach => {
        this.notify('ACHIEVEMENT_UNLOCKED', { student, achievement: ach });
      });
    }
  }

  // ------------------------------------------------------------------------
  // LEADERBOARD
  // ------------------------------------------------------------------------

  getLeaderboard() {
    return [...this.state.students].sort((a, b) => (b.xp || 0) - (a.xp || 0));
  }

  getStudentRank(studentId = this.state.currentStudentId) {
    const list = this.getLeaderboard();
    const index = list.findIndex(s => s.id === studentId);
    if (index === -1) {
      return {
        rank: null,
        totalStudents: list.length,
        student: null,
        nextStudent: null,
        xpToNextRank: 0
      };
    }
    return {
      rank: index + 1,
      totalStudents: list.length,
      student: list[index],
      nextStudent: index > 0 ? list[index - 1] : null,
      xpToNextRank: index > 0 ? (list[index - 1].xp || 0) - (list[index].xp || 0) : 0
    };
  }

  updateAvatar(avatar) {
    const student = this.getCurrentStudent();
    if (student) {
      student.avatar = avatar;
      this.notify('AVATAR_UPDATED', student);
    }
  }

  // ------------------------------------------------------------------------
  // CURRICULUM
  // ------------------------------------------------------------------------

  getActiveCurriculum() {
    const list = this.state.curriculumTopics || OFFICIAL_TOPICS;
    return list.filter(t => t.active !== false);
  }

  // Admin capabilities
  adminDeleteStudent(studentId) {
    this.state.students = this.state.students.filter(s => s.id !== studentId);
    if (this.state.currentStudentId === studentId) {
      this.state.currentStudentId = this.state.students.length ? this.state.students[0].id : null;
      this.saveSession(this.state.currentStudentId);
    }
    apiClient.adminDeleteStudent(studentId).catch(() => {});
    this.notify('ADMIN_STUDENT_DELETED', studentId);
  }

  adminAddTopic(topicData) {
    if (!topicData.title) throw new Error('Topic title is required.');
    const newTopic = {
      id: topicData.id || 'topic_' + Date.now(),
      number: String((this.state.curriculumTopics.length + 1)).padStart(2, '0'),
      title: topicData.title,
      subtitle: topicData.subtitle || '',
      icon: topicData.icon || '📖',
      color: topicData.color || '#2563eb',
      active: topicData.active !== false,
      summary: topicData.summary || '',
      vocab: topicData.vocab || [],
      examples: topicData.examples || [],
      practiceQuestions: topicData.practiceQuestions || [],
      quizQuestions: topicData.quizQuestions || []
    };
    this.state.curriculumTopics.push(newTopic);
    this.notify('ADMIN_TOPIC_ADDED', newTopic);
    return newTopic;
  }

  adminToggleTopic(topicId) {
    const topic = this.state.curriculumTopics.find(t => t.id === topicId);
    if (topic) {
      topic.active = !topic.active;
      this.state.curriculumCustomized = true;
      apiClient.adminToggleCurriculum(topicId).catch(() => {});
      this.notify('ADMIN_TOPIC_TOGGLED', topic);
    }
  }

  adminDeleteTopic(topicId) {
    if (!topicId) throw new Error('Topic ID is required to delete.');
    const index = this.state.curriculumTopics.findIndex(t => t.id === topicId);
    if (index === -1) throw new Error('Topic not found in curriculum.');

    const deletedTopic = this.state.curriculumTopics[index];
    this.state.curriculumTopics = this.state.curriculumTopics.filter(t => t.id !== topicId);
    this.state.curriculumCustomized = true;

    this.state.curriculumTopics.forEach((t, i) => {
      t.number = String(i + 1).padStart(2, '0');
    });

    apiClient.adminDeleteCurriculum(topicId).catch(() => {});
    this.notify('ADMIN_TOPIC_DELETED', deletedTopic);
    return deletedTopic;
  }

  adminResetCurriculum() {
    this.state.curriculumTopics = JSON.parse(JSON.stringify(OFFICIAL_TOPICS));
    this.state.curriculumCustomized = false;
    apiClient.adminResetCurriculum().catch(() => {});
    this.notify('ADMIN_CURRICULUM_RESET', this.state.curriculumTopics);
    return this.state.curriculumTopics;
  }

  adminResetRoster() {
    this.state.students = [];
    this.state.currentStudentId = null;
    this.saveSession(null);
    this.notify('ADMIN_ROSTER_RESET', null);
  }

  // ------------------------------------------------------------------------
  // ROLEPLAY PRESENTATIONS
  // ------------------------------------------------------------------------

  getRoleplays() {
    const list = this.state.roleplays || OFFICIAL_ROLEPLAYS;
    return list.filter(r => r.active !== false);
  }

  getAllRoleplays() {
    return this.state.roleplays || OFFICIAL_ROLEPLAYS;
  }

  getRoleplayById(roleplayId) {
    const list = this.state.roleplays || OFFICIAL_ROLEPLAYS;
    return list.find(r => r.id === roleplayId) || null;
  }

  getStudentRoleplayProgress(studentId = this.state.currentStudentId) {
    const student = studentId ? this.state.students.find(s => s.id === studentId) : this.getCurrentStudent();
    if (!student) return { completedCount: 0, totalCount: 5, overallPercent: 0, items: {} };
    if (!student.roleplayProgress) student.roleplayProgress = {};

    const activeList = this.getRoleplays();
    let completedCount = 0;

    activeList.forEach(rp => {
      const prog = student.roleplayProgress[rp.id];
      if (prog && prog.completed) {
        completedCount++;
      }
    });

    const overallPercent = activeList.length > 0 ? Math.round((completedCount / activeList.length) * 100) : 0;
    return {
      completedCount,
      totalCount: activeList.length,
      overallPercent,
      percent: overallPercent,
      items: student.roleplayProgress
    };
  }

  recordRoleplayCompletion(roleplayId, result = {}) {
    if (typeof result === 'number') {
      result = { percent: result, score: result, submissionToken: arguments[2] };
    }

    const student = this.getCurrentStudent();
    if (!student) return { error: 'No active student' };

    if (!student.roleplayProgress) student.roleplayProgress = {};
    if (!student.stats) student.stats = {};

    const prevProg = student.roleplayProgress[roleplayId] || { completed: false, percent: 0, score: 0, attempts: 0 };
    
    if (result.submissionToken && prevProg.lastSubmissionToken === result.submissionToken) {
      return { success: false, duplicate: true, alreadyRecorded: true, xpEarned: 0 };
    }

    const isFirstTime = !prevProg.completed;
    const isPerfect = (result.percent || 0) >= 100;
    
    const xpReward = result.xpReward !== undefined 
      ? result.xpReward 
      : (isPerfect ? 50 : 25);

    const updatedProg = {
      completed: true,
      percent: Math.max(prevProg.percent || 0, result.percent || 100),
      score: Math.max(prevProg.score || 0, result.score || 0),
      totalQuestions: result.totalQuestions || 5,
      sentencesCreated: (prevProg.sentencesCreated || 0) + (result.sentencesCreated || 1),
      attempts: (prevProg.attempts || 0) + 1,
      lastCompletedDate: new Date().toISOString(),
      lastSubmissionToken: result.submissionToken || ('sub_rp_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6))
    };

    student.roleplayProgress[roleplayId] = updatedProg;
    student.stats.roleplaysCompleted = Object.values(student.roleplayProgress).filter(p => p.completed).length;

    let xpEarned = 0;
    if (isFirstTime) {
      xpEarned = xpReward;
      this.addXP(xpEarned, `roleplay_${roleplayId}`);
    } else if (isPerfect && (prevProg.percent || 0) < 100) {
      xpEarned = 25;
      this.addXP(xpEarned, `roleplay_${roleplayId}_perfection`);
    }

    // Persist to backend
    apiClient.recordRoleplayCompletion(roleplayId, updatedProg.percent).catch(() => {});

    this.checkAchievements(student);
    this.notify('ROLEPLAY_COMPLETED', { student, roleplayId, result: updatedProg, xpEarned });
    return { success: true, xpEarned, progress: updatedProg };
  }

  // Admin Roleplay Controls
  adminAddRoleplay(data) {
    if (!data.title) throw new Error('Roleplay title is required.');
    const nextNum = String(this.state.roleplays.length + 1).padStart(2, '0');
    const newRoleplay = {
      id: data.id || 'rp_' + Date.now(),
      number: data.number || nextNum,
      title: data.title,
      subtitle: data.subtitle || '',
      icon: data.icon || '🎭',
      color: data.color || '#0A2558',
      active: data.active !== false,
      scenario: data.scenario || '',
      grammarFocus: Array.isArray(data.grammarFocus) ? data.grammarFocus : [data.grammarFocus || 'General English'],
      grammarDescription: data.grammarDescription || '',
      spokenExpressions: Array.isArray(data.spokenExpressions) ? data.spokenExpressions : [],
      keyVocab: Array.isArray(data.keyVocab) ? data.keyVocab : [],
      practiceQuestions: Array.isArray(data.practiceQuestions) ? data.practiceQuestions : [],
      sentencePrompts: Array.isArray(data.sentencePrompts) ? data.sentencePrompts : [],
      speakingSentences: Array.isArray(data.speakingSentences) ? data.speakingSentences : []
    };
    this.state.roleplays.push(newRoleplay);
    this.notify('ADMIN_ROLEPLAY_ADDED', newRoleplay);
    return newRoleplay;
  }

  adminUpdateRoleplay(id, updateData) {
    const rp = this.state.roleplays.find(r => r.id === id);
    if (!rp) throw new Error('Roleplay not found.');
    Object.assign(rp, updateData);
    apiClient.adminUpdateRoleplay(id, updateData).catch(() => {});
    this.notify('ADMIN_ROLEPLAY_UPDATED', rp);
    return rp;
  }

  adminToggleRoleplayActive(id) {
    const rp = this.state.roleplays.find(r => r.id === id);
    if (rp) {
      rp.active = !rp.active;
      apiClient.adminToggleRoleplay(id).catch(() => {});
      this.notify('ADMIN_ROLEPLAY_TOGGLED', rp);
      return rp;
    }
  }

  adminDeleteRoleplay(id) {
    const index = this.state.roleplays.findIndex(r => r.id === id);
    if (index === -1) throw new Error('Roleplay not found.');
    const deleted = this.state.roleplays.splice(index, 1)[0];
    this.state.roleplays.forEach((r, i) => {
      r.number = String(i + 1).padStart(2, '0');
    });
    apiClient.adminDeleteRoleplay(id).catch(() => {});
    this.notify('ADMIN_ROLEPLAY_DELETED', deleted);
    return deleted;
  }

  adminResetRoleplays() {
    this.state.roleplays = JSON.parse(JSON.stringify(OFFICIAL_ROLEPLAYS));
    apiClient.adminResetRoleplays().catch(() => {});
    this.notify('ADMIN_ROLEPLAYS_RESET', this.state.roleplays);
    return this.state.roleplays;
  }
}

export { StateManager };
export const stateManager = new StateManager();