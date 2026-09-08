// Home Academy - Real-Time API Client Service
// Manages HTTP requests, persistent Bearer tokens, and Server-Sent Events (SSE)

const TOKEN_KEY = 'home_academy_auth_token';
const ADMIN_TOKEN_KEY = 'home_academy_admin_token';

class ApiClient {
  constructor() {
    this.token = this.loadToken(TOKEN_KEY);
    this.adminToken = this.loadToken(ADMIN_TOKEN_KEY);
    this.eventSource = null;
    this.eventListeners = new Set();
  }

  loadToken(key) {
    try {
      if (typeof localStorage !== 'undefined') {
        return localStorage.getItem(key);
      }
    } catch (e) {}
    return null;
  }

  setToken(token) {
    this.token = token;
    try {
      if (typeof localStorage !== 'undefined') {
        if (token) localStorage.setItem(TOKEN_KEY, token);
        else localStorage.removeItem(TOKEN_KEY);
      }
    } catch (e) {}
  }

  setAdminToken(token) {
    this.adminToken = token;
    try {
      if (typeof localStorage !== 'undefined') {
        if (token) localStorage.setItem(ADMIN_TOKEN_KEY, token);
        else localStorage.removeItem(ADMIN_TOKEN_KEY);
      }
    } catch (e) {}
  }

  async request(path, options = {}) {
    const headers = {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    };

    // Attach student or admin token
    if (options.isAdmin && this.adminToken) {
      headers['Authorization'] = `Bearer ${this.adminToken}`;
    } else if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const config = {
      ...options,
      headers
    };

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }

    const baseUrl = typeof window !== 'undefined' ? '' : (process.env.API_BASE_URL || 'http://localhost:3000');
    const fullUrl = path.startsWith('http') ? path : `${baseUrl}${path}`;

    try {
      const response = await fetch(fullUrl, config);
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        const error = new Error(data.error || `HTTP ${response.status}: Request failed`);
        error.status = response.status;
        error.data = data;
        throw error;
      }

      return data;
    } catch (err) {
      // Re-throw with descriptive context
      throw err;
    }
  }

  // ------------------------------------------------------------------------
  // AUTHENTICATION
  // ------------------------------------------------------------------------

  async getClassInfo() {
    return this.request('/api/class-info');
  }

  async register({ name, email, password, avatar, classCode }) {
    const res = await this.request('/api/auth/register', {
      method: 'POST',
      body: { name, email, password, avatar, classCode }
    });
    if (res.token) this.setToken(res.token);
    return res;
  }

  async login({ email, password }) {
    const res = await this.request('/api/auth/login', {
      method: 'POST',
      body: { email, password }
    });
    if (res.token) this.setToken(res.token);
    return res;
  }

  async getMe() {
    if (!this.token) return null;
    try {
      const res = await this.request('/api/auth/me');
      return res.student;
    } catch (err) {
      if (err.status === 401) {
        this.setToken(null);
      }
      return null;
    }
  }

  async logout() {
    try {
      await this.request('/api/auth/logout', { method: 'POST' });
    } catch (e) {}
    this.setToken(null);
  }

  // ------------------------------------------------------------------------
  // TEACHER / ADMIN
  // ------------------------------------------------------------------------

  async adminLogin(password) {
    const res = await this.request('/api/admin/login', {
      method: 'POST',
      body: { password }
    });
    if (res.token) this.setAdminToken(res.token);
    return res;
  }

  async adminGetMe() {
    if (!this.adminToken) return false;
    try {
      const res = await this.request('/api/admin/me', { isAdmin: true });
      return Boolean(res.authenticated);
    } catch (e) {
      this.setAdminToken(null);
      return false;
    }
  }

  async adminLogout() {
    try {
      await this.request('/api/admin/logout', { method: 'POST', isAdmin: true });
    } catch (e) {}
    this.setAdminToken(null);
  }

  async adminGetRoster() {
    return this.request('/api/admin/students', { isAdmin: true });
  }

  async adminGetStudentProfile(studentId) {
    return this.request(`/api/admin/students/${encodeURIComponent(studentId)}`, { isAdmin: true });
  }

  async adminAwardXP(studentId, amount, reason) {
    return this.request('/api/admin/award-xp', {
      method: 'POST',
      isAdmin: true,
      body: { studentId, amount, reason }
    });
  }

  async adminDeleteStudent(studentId) {
    return this.request(`/api/admin/students/${encodeURIComponent(studentId)}`, {
      method: 'DELETE',
      isAdmin: true
    });
  }

  async adminGetQuestions(topicId = null) {
    const query = topicId ? `?topicId=${encodeURIComponent(topicId)}` : '';
    return this.request(`/api/admin/questions${query}`, { isAdmin: true });
  }

  async adminCreateQuestion(data) {
    return this.request('/api/admin/questions', {
      method: 'POST',
      isAdmin: true,
      body: data
    });
  }

  async adminDeleteQuestion(questionId) {
    return this.request(`/api/admin/questions/${encodeURIComponent(questionId)}`, {
      method: 'DELETE',
      isAdmin: true
    });
  }

  async adminGetNotifications(limit = 50) {
    return this.request(`/api/admin/notifications?limit=${limit}`, { isAdmin: true });
  }

  async adminMarkNotificationsRead() {
    return this.request('/api/admin/notifications/read', {
      method: 'PATCH',
      isAdmin: true
    });
  }

  async adminGetSettings() {
    return this.request('/api/admin/settings', { isAdmin: true });
  }

  async adminUpdateSettings(settings) {
    return this.request('/api/admin/settings', {
      method: 'PUT',
      isAdmin: true,
      body: settings
    });
  }

  async adminChangePassword(newPassword) {
    return this.request('/api/admin/change-password', {
      method: 'POST',
      isAdmin: true,
      body: { newPassword }
    });
  }

  async adminGetCurriculum() {
    return this.request('/api/admin/curriculum', { isAdmin: true });
  }

  async adminToggleCurriculum(topicId) {
    return this.request(`/api/admin/curriculum/${encodeURIComponent(topicId)}/toggle`, {
      method: 'PATCH',
      isAdmin: true
    });
  }

  async adminDeleteCurriculum(topicId) {
    return this.request(`/api/admin/curriculum/${encodeURIComponent(topicId)}`, {
      method: 'DELETE',
      isAdmin: true
    });
  }

  async adminResetCurriculum() {
    return this.request('/api/admin/curriculum/reset', {
      method: 'POST',
      isAdmin: true
    });
  }

  async adminGetRoleplays() {
    return this.request('/api/admin/roleplays', { isAdmin: true });
  }

  async adminToggleRoleplay(id) {
    return this.request(`/api/admin/roleplays/${encodeURIComponent(id)}/toggle`, {
      method: 'PATCH',
      isAdmin: true
    });
  }

  async adminUpdateRoleplay(id, data) {
    return this.request(`/api/admin/roleplays/${encodeURIComponent(id)}`, {
      method: 'PUT',
      isAdmin: true,
      body: data
    });
  }

  async adminDeleteRoleplay(id) {
    return this.request(`/api/admin/roleplays/${encodeURIComponent(id)}`, {
      method: 'DELETE',
      isAdmin: true
    });
  }

  async adminResetRoleplays() {
    return this.request('/api/admin/roleplays/reset', {
      method: 'POST',
      isAdmin: true
    });
  }

  // ------------------------------------------------------------------------
  // LEARNING, PROGRESS & SERVER-VERIFIED XP
  // ------------------------------------------------------------------------

  async getCurriculum() {
    return this.request('/api/curriculum');
  }

  async getRoleplays() {
    return this.request('/api/roleplays');
  }

  async getLeaderboard(limit = 50) {
    return this.request(`/api/leaderboard?limit=${limit}`);
  }

  async recordTopicLearn(topicId) {
    return this.request(`/api/curriculum/${encodeURIComponent(topicId)}/learn`, {
      method: 'POST'
    });
  }

  async recordTopicPractice(topicId, count = 1) {
    return this.request(`/api/curriculum/${encodeURIComponent(topicId)}/practice`, {
      method: 'POST',
      body: { count }
    });
  }

  async recordTopicQuiz(topicId, quizData) {
    return this.request(`/api/curriculum/${encodeURIComponent(topicId)}/quiz`, {
      method: 'POST',
      body: quizData
    });
  }

  async recordFullGrammarTest(testData) {
    return this.request('/api/full-test/submit', {
      method: 'POST',
      body: testData
    });
  }

  async recordActivityCompletion(activityData) {
    return this.request('/api/activities/submit', {
      method: 'POST',
      body: activityData
    });
  }

  async recordRoleplayCompletion(roleplayId, percent = 100) {
    return this.request(`/api/roleplays/${encodeURIComponent(roleplayId)}/complete`, {
      method: 'POST',
      body: { percent }
    });
  }

  // ------------------------------------------------------------------------
  // REAL-TIME SERVER-SENT EVENTS (SSE)
  // ------------------------------------------------------------------------

  subscribeEvents(listener) {
    this.eventListeners.add(listener);
    if (!this.eventSource && typeof window !== 'undefined' && window.EventSource) {
      this.initEventSource();
    }
    return () => {
      this.eventListeners.delete(listener);
    };
  }

  initEventSource() {
    try {
      this.eventSource = new EventSource('/api/events');

      const dispatch = (type, data) => {
        for (const listener of this.eventListeners) {
          try {
            listener(type, data);
          } catch (e) {
            console.error('SSE listener error:', e);
          }
        }
      };

      this.eventSource.addEventListener('leaderboard_update', (e) => {
        try { dispatch('leaderboard_update', JSON.parse(e.data)); } catch (err) {}
      });

      this.eventSource.addEventListener('student_joined', (e) => {
        try { dispatch('student_joined', JSON.parse(e.data)); } catch (err) {}
      });

      this.eventSource.addEventListener('curriculum_updated', (e) => {
        try { dispatch('curriculum_updated', JSON.parse(e.data)); } catch (err) {}
      });

      this.eventSource.addEventListener('roleplay_updated', (e) => {
        try { dispatch('roleplay_updated', JSON.parse(e.data)); } catch (err) {}
      });

      this.eventSource.addEventListener('settings_updated', (e) => {
        try { dispatch('settings_updated', JSON.parse(e.data)); } catch (err) {}
      });

      this.eventSource.onerror = () => {
        // SSE automatically reconnects, no crash
      };
    } catch (e) {
      console.warn('SSE not initialized:', e);
    }
  }
}

export const apiClient = new ApiClient();
