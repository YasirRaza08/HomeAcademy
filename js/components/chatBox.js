// Home Academy - Floating Student ↔ Teacher Chat Box Component
// Provides direct student-to-teacher inquiry, instant advice from Sir Zubair, and persistent cloud storage.

import { apiClient } from '../services/apiClient.js';
import { stateManager } from '../state.js';
import { sound } from '../audio.js';

class ChatBox {
  constructor() {
    this.isOpen = false;
    this.messages = [];
    this.unreadCount = 0;
    this.isSending = false;
    this.container = null;
  }

  init() {
    if (document.getElementById('ha-chat-widget')) return;

    this.container = document.createElement('div');
    this.container.id = 'ha-chat-widget';
    document.body.appendChild(this.container);

    this.render();
    this.loadMessages();
    this.setupListeners();
  }

  setupListeners() {
    // Listen for SSE real-time chat updates
    apiClient.subscribeEvents((type, data) => {
      if (type === 'new_chat_message') {
        if (!this.messages.some(m => m.messageId === data.messageId)) {
          this.messages.push(data);
          if (!this.isOpen) {
            this.unreadCount++;
            this.updateBadge();
          }
          this.renderMessages();
        }
      } else if (type === 'chat_message_replied') {
        const msg = this.messages.find(m => m.messageId === data.messageId);
        if (msg) {
          msg.replyText = data.replyText;
          msg.replyAt = new Date().toISOString();
          this.renderMessages();
        }
      }
    });

    // Update student info if student logs in
    stateManager.subscribe('STUDENT_LOGGED_IN', () => {
      this.render();
    });
    stateManager.subscribe('STUDENT_JOINED', () => {
      this.render();
    });
  }

  async loadMessages() {
    try {
      const res = await apiClient.getChatMessages();
      if (res && Array.isArray(res.messages)) {
        this.messages = res.messages;
        this.renderMessages();
      }
    } catch (e) {
      // Graceful fallback
    }
  }

  toggle() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.unreadCount = 0;
      this.updateBadge();
      sound.playClick();
    }
    const panel = this.container.querySelector('#ha-chat-panel');
    const fab = this.container.querySelector('#ha-chat-fab');
    if (panel) panel.style.display = this.isOpen ? 'flex' : 'none';
    if (fab) {
      fab.style.display = this.isOpen ? 'none' : 'flex';
    }
    if (this.isOpen) {
      setTimeout(() => {
        this.scrollToBottom();
        const input = this.container.querySelector('#chat-input-text');
        if (input) input.focus();
      }, 100);
    }
  }

  updateBadge() {
    const badge = this.container.querySelector('#chat-fab-badge');
    if (badge) {
      if (this.unreadCount > 0) {
        badge.textContent = this.unreadCount;
        badge.style.display = 'flex';
      } else {
        badge.style.display = 'none';
      }
    }
  }

  scrollToBottom() {
    const msgList = this.container.querySelector('#chat-messages-list');
    if (msgList) {
      msgList.scrollTop = msgList.scrollHeight;
    }
  }

  async sendMessage(text, studentNameOverride = null) {
    const content = (text || '').trim();
    if (!content || this.isSending) return;

    const currentStudent = stateManager.getCurrentStudent();
    const nameInput = this.container.querySelector('#chat-guest-name');
    const senderName = currentStudent?.name || studentNameOverride || nameInput?.value?.trim() || 'Student';

    this.isSending = true;
    const sendBtn = this.container.querySelector('#chat-send-btn');
    if (sendBtn) sendBtn.disabled = true;

    // Optimistic UI push
    const tempId = 'temp_' + Date.now();
    const optMsg = {
      messageId: tempId,
      senderRole: 'student',
      senderName,
      studentId: currentStudent?.id || null,
      content,
      replyText: null,
      createdAt: new Date().toISOString()
    };
    this.messages.push(optMsg);
    this.renderMessages();
    this.scrollToBottom();
    sound.playClick();

    const textInput = this.container.querySelector('#chat-input-text');
    if (textInput) textInput.value = '';

    try {
      const res = await apiClient.sendChatMessage({
        senderName,
        content,
        studentId: currentStudent?.id || null,
        studentEmail: currentStudent?.email || null
      });

      if (res && res.message) {
        const idx = this.messages.findIndex(m => m.messageId === tempId);
        if (idx !== -1) {
          this.messages[idx] = res.message;
          this.renderMessages();
        }
      }
    } catch (err) {
      console.warn('Chat send error:', err);
    } finally {
      this.isSending = false;
      if (sendBtn) sendBtn.disabled = false;
      this.scrollToBottom();
    }
  }

  render() {
    const currentStudent = stateManager.getCurrentStudent();
    const isTeacher = stateManager.state.isAdmin;

    this.container.innerHTML = `
      <style>
        #ha-chat-widget {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 99999;
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        @media (max-width: 768px) {
          #ha-chat-widget {
            bottom: 74px !important;
            right: 14px !important;
          }
          .chat-window-panel {
            width: calc(100vw - 28px) !important;
            height: 70vh !important;
          }
        }

        .chat-fab-button {
          display: flex;
          align-items: center;
          gap: 10px;
          background: linear-gradient(135deg, var(--ha-navy, #0A2558) 0%, #1e3a8a 100%);
          color: #ffffff;
          padding: 13px 20px;
          border-radius: 999px;
          border: 2px solid rgba(255,255,255,0.25);
          box-shadow: 0 10px 25px -4px rgba(10, 37, 88, 0.45), 0 0 0 1px rgba(0,0,0,0.06);
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          user-select: none;
        }

        .chat-fab-button:hover {
          transform: translateY(-3px) scale(1.03);
          box-shadow: 0 16px 32px -4px rgba(10, 37, 88, 0.55);
        }

        .chat-fab-pulse {
          width: 10px;
          height: 10px;
          background: #10b981;
          border-radius: 50%;
          box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
          animation: chatPulse 2s infinite;
        }

        @keyframes chatPulse {
          0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
          70% { box-shadow: 0 0 0 8px rgba(16, 185, 129, 0); }
          100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
        }

        .chat-fab-badge {
          position: absolute;
          top: -4px;
          right: -4px;
          background: var(--ha-red, #D90429);
          color: #ffffff;
          font-size: 0.72rem;
          font-weight: 800;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          display: none;
          align-items: center;
          justify-content: center;
          border: 2px solid #ffffff;
        }

        .chat-window-panel {
          width: 380px;
          max-width: calc(100vw - 32px);
          height: 540px;
          max-height: calc(100vh - 100px);
          background: #ffffff;
          border-radius: 20px;
          box-shadow: 0 24px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1.5px rgba(0, 0, 0, 0.08);
          display: none;
          flex-direction: column;
          overflow: hidden;
          animation: chatSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes chatSlideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .chat-header {
          background: linear-gradient(135deg, var(--ha-navy, #0A2558) 0%, #1e3a8a 100%);
          color: #ffffff;
          padding: 16px 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .chat-messages-container {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          background: #F8FAFC;
        }

        .chat-bubble-student {
          align-self: flex-end;
          background: var(--ha-navy, #0A2558);
          color: #ffffff;
          padding: 10px 14px;
          border-radius: 16px 16px 2px 16px;
          max-width: 82%;
          font-size: 0.88rem;
          line-height: 1.45;
          box-shadow: 0 2px 4px rgba(0,0,0,0.06);
          word-break: break-word;
        }

        .chat-bubble-teacher {
          align-self: flex-start;
          background: #ffffff;
          color: var(--ha-navy, #0A2558);
          border: 1.5px solid var(--ha-border, #E2E8F0);
          padding: 11px 14px;
          border-radius: 16px 16px 16px 2px;
          max-width: 85%;
          font-size: 0.88rem;
          line-height: 1.45;
          box-shadow: 0 2px 6px rgba(0,0,0,0.04);
          word-break: break-word;
        }

        .chat-quick-chip {
          background: #ffffff;
          border: 1.5px solid #CBD5E1;
          color: var(--ha-navy, #0A2558);
          padding: 6px 12px;
          border-radius: 999px;
          font-size: 0.76rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.15s ease;
          text-align: left;
        }

        .chat-quick-chip:hover {
          background: #EFF6FF;
          border-color: #3B82F6;
          transform: translateY(-1px);
        }

        .chat-footer {
          padding: 12px 14px;
          background: #ffffff;
          border-top: 1.5px solid var(--ha-border, #E2E8F0);
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        @media (max-width: 640px) {
          #ha-chat-widget {
            bottom: 74px; /* Above mobile bottom nav */
            right: 14px;
          }
          .chat-window-panel {
            width: calc(100vw - 28px);
            height: calc(100vh - 160px);
          }
        }
      </style>

      <!-- FLOATING ACTION BUTTON (FAB) -->
      <div class="chat-fab-button" id="ha-chat-fab" title="Chat with Sir Zubair">
        <div class="chat-fab-pulse"></div>
        <span style="font-size: 1.15rem;">💬</span>
        <div style="display: flex; flex-direction: column; line-height: 1.1;">
          <span style="font-weight: 800; font-size: 0.88rem; letter-spacing: 0.02em;">Ask Sir Zubair</span>
          <span style="font-size: 0.68rem; opacity: 0.85;">Online Help Desk</span>
        </div>
        <div class="chat-fab-badge" id="chat-fab-badge">0</div>
      </div>

      <!-- CHAT WINDOW PANEL -->
      <div class="chat-window-panel" id="ha-chat-panel">
        <!-- HEADER -->
        <div class="chat-header">
          <div style="display: flex; align-items: center; gap: 10px;">
            <div style="width: 36px; height: 36px; border-radius: 50%; background: #ffffff; display: flex; align-items: center; justify-content: center; font-size: 1.25rem; border: 2px solid #FCD34D;">
              👨‍🏫
            </div>
            <div>
              <div style="font-weight: 800; font-size: 0.95rem; display: flex; align-items: center; gap: 6px;">
                Sir Zubair
                <span style="background: #10B981; color: #fff; font-size: 0.62rem; padding: 1px 6px; border-radius: 999px; font-weight: 700;">ONLINE</span>
              </div>
              <div style="font-size: 0.72rem; opacity: 0.85;">Home Academy Faculty Portal</div>
            </div>
          </div>
          <button type="button" id="chat-close-btn" style="background: rgba(255,255,255,0.15); border: none; color: #fff; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 0.9rem; font-weight: bold;" title="Close Chat">
            ✕
          </button>
        </div>

        <!-- MESSAGES LIST -->
        <div class="chat-messages-container" id="chat-messages-list">
          <!-- GREETING MESSAGE -->
          <div class="chat-bubble-teacher">
            <div style="font-size: 0.7rem; font-weight: 800; color: var(--ha-red, #D90429); margin-bottom: 4px; display: flex; align-items: center; gap: 4px;">
              <span>👨‍🏫</span> Sir Zubair
            </div>
            <div>Assalam-o-Alaikum! Welcome to Home Academy. Ask me any question about your English grammar topics, quizzes, or vocabulary!</div>
          </div>

          <!-- QUICK QUESTIONS -->
          <div id="chat-quick-suggestions" style="display: flex; flex-direction: column; gap: 6px; margin: 4px 0;">
            <div style="font-size: 0.68rem; font-weight: 800; text-transform: uppercase; color: #64748B; letter-spacing: 0.05em;">Suggested Questions:</div>
            <button type="button" class="chat-quick-chip" data-q="Sir, what are the 6 main grammar topics in our course?">
              📖 What are the 6 main grammar topics?
            </button>
            <button type="button" class="chat-quick-chip" data-q="Sir, how is my quiz score and XP calculated?">
              ⭐ How is my quiz score and XP calculated?
            </button>
            <button type="button" class="chat-quick-chip" data-q="Sir, can you help me practice English conversation for Topic 1?">
              🗣️ How do I practice Topic 1 Roleplay?
            </button>
          </div>

          <div id="dynamic-chat-messages"></div>
        </div>

        <!-- FOOTER INPUT -->
        <div class="chat-footer">
          ${!currentStudent && !isTeacher ? `
            <div style="display: flex; gap: 6px; align-items: center;">
              <input type="text" id="chat-guest-name" placeholder="Your Name (e.g. Ali)" 
                style="flex: 1; padding: 6px 10px; font-size: 0.78rem; border: 1.5px solid #CBD5E1; border-radius: 8px; outline: none;" />
            </div>
          ` : ''}
          <form id="chat-input-form" style="display: flex; gap: 8px; align-items: center;">
            <input type="text" id="chat-input-text" placeholder="Type your message for Sir Zubair..." required autocomplete="off"
              style="flex: 1; padding: 10px 14px; font-size: 0.88rem; border: 1.5px solid #CBD5E1; border-radius: 999px; outline: none;" />
            <button type="submit" id="chat-send-btn" style="background: var(--ha-navy, #0A2558); color: #fff; border: none; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 1rem; transition: transform 0.15s ease;" title="Send Message">
              ➤
            </button>
          </form>
        </div>
      </div>
    `;

    // Bind event listeners
    this.container.querySelector('#ha-chat-fab')?.addEventListener('click', () => this.toggle());
    this.container.querySelector('#chat-close-btn')?.addEventListener('click', () => this.toggle());

    // Quick chips
    this.container.querySelectorAll('.chat-quick-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        const q = btn.dataset.q;
        if (q) this.sendMessage(q);
      });
    });

    // Form submit
    this.container.querySelector('#chat-input-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = this.container.querySelector('#chat-input-text')?.value;
      this.sendMessage(text);
    });

    this.renderMessages();
  }

  renderMessages() {
    const mount = this.container?.querySelector('#dynamic-chat-messages');
    if (!mount) return;

    if (this.messages.length === 0) {
      mount.innerHTML = '';
      return;
    }

    mount.innerHTML = this.messages.map(m => {
      const isTeacherMsg = m.senderRole === 'teacher';
      const timeStr = m.createdAt ? new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';

      let html = '';
      if (isTeacherMsg) {
        html += `
          <div class="chat-bubble-teacher">
            <div style="font-size: 0.7rem; font-weight: 800; color: var(--ha-red, #D90429); margin-bottom: 2px;">
              👨‍🏫 Sir Zubair <span style="font-size: 0.65rem; color: #94A3B8; font-weight: normal; margin-left: 4px;">${timeStr}</span>
            </div>
            <div>${this.escapeHtml(m.content)}</div>
          </div>
        `;
      } else {
        html += `
          <div class="chat-bubble-student">
            <div style="font-size: 0.68rem; opacity: 0.85; margin-bottom: 2px;">
              ${this.escapeHtml(m.senderName || 'Student')} <span style="font-size: 0.62rem; opacity: 0.7; margin-left: 4px;">${timeStr}</span>
            </div>
            <div>${this.escapeHtml(m.content)}</div>
          </div>
        `;

        if (m.replyText) {
          const replyTime = m.replyAt ? new Date(m.replyAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
          html += `
            <div class="chat-bubble-teacher" style="margin-top: 4px; border-left: 3px solid var(--ha-navy);">
              <div style="font-size: 0.7rem; font-weight: 800; color: var(--ha-navy); margin-bottom: 2px;">
                👨‍🏫 Sir Zubair (Teacher Reply) <span style="font-size: 0.65rem; color: #94A3B8; font-weight: normal; margin-left: 4px;">${replyTime}</span>
              </div>
              <div>${this.escapeHtml(m.replyText)}</div>
            </div>
          `;
        }
      }
      return html;
    }).join('');

    this.scrollToBottom();
  }

  escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}

export const chatBox = new ChatBox();
