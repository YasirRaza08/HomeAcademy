// Home Academy Side-by-Side Dual Authentication Component
// LEFT: Student Login (Email + Password -> Student Dashboard)
// RIGHT: Teacher Portal (Teacher Email/Username + Teacher Password -> Teacher Dashboard)

import { stateManager } from '../state.js';
import { AVATARS } from '../data/initial-data.js';
import { sound } from '../audio.js';

export function setupAuthModal(modalContainer, onStudentJoined) {
  let selectedAvatar = '🦁';
  let viewMode = 'dual'; // 'dual' | 'register'

  function renderModalContent() {
    const students = stateManager.state.students || [];

    modalContainer.innerHTML = `
      <div class="ha-modal-backdrop hidden" id="auth-modal-backdrop">
        <div class="ha-modal-dialog" style="max-width: 860px; width: 96%; padding: 26px;">
          <button class="modal-close-btn" id="auth-close-btn" title="Close modal">&times;</button>
          
          <!-- Official Logo Presentation -->
          <div style="text-align: center; margin-bottom: 16px;">
            <img src="assets/logo.png" alt="Home Academy English Language Program" 
              style="max-width: 190px; width: 100%; height: auto; object-fit: contain; margin: 0 auto 6px; display: block;" />
            <h2 style="font-size: 1.35rem; color: var(--ha-navy); margin-bottom: 3px;">Home Academy Access Portal</h2>
            <p style="font-size: 0.85rem; color: var(--ha-text-muted); margin: 0;">
              English Language Program • Select your access portal below
            </p>
          </div>

          <!-- DUAL SIDE-BY-SIDE VIEW -->
          <div id="side-by-side-view">
            <!-- Mobile Segmented Tabs (Shown only on small screens <= 768px) -->
            <div class="auth-mobile-tabs" id="auth-mobile-tabs">
              <button type="button" class="auth-tab-btn active" id="btn-tab-student">
                <span>🎓</span> Student Login
              </button>
              <button type="button" class="auth-tab-btn" id="btn-tab-teacher">
                <span>👨‍🏫</span> Teacher Portal
              </button>
            </div>

            <div class="auth-dual-grid">
              
              <!-- LEFT PANEL: STUDENT LOGIN -->
              <div class="auth-box-student" id="auth-box-student" style="display: flex; flex-direction: column; justify-content: space-between; background: #F8FAFC; border: 1.5px solid var(--ha-border); border-radius: var(--radius-lg); padding: 22px;">
                <div>
                  <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 14px;">
                    <div style="width: 38px; height: 38px; border-radius: var(--radius-md); background: var(--ha-navy); color: #fff; display: flex; align-items: center; justify-content: center; font-size: 1.3rem;">🎓</div>
                    <div>
                      <h3 style="font-size: 1.15rem; color: var(--ha-navy); margin: 0; font-weight: 800;">Student Login</h3>
                      <span style="font-size: 0.76rem; color: var(--ha-text-muted);">Personal Dashboard & Learning Progress</span>
                    </div>
                  </div>

                  <form id="student-side-login-form" style="display: flex; flex-direction: column; gap: 12px;">
                    <div>
                      <label for="student-side-email" style="display: block; font-size: 0.76rem; font-weight: 800; color: var(--ha-navy); margin-bottom: 4px; letter-spacing: 0.03em;">
                        EMAIL *
                      </label>
                      <input type="email" id="student-side-email" placeholder="e.g. student@gmail.com" required autocomplete="email"
                        style="width: 100%; padding: 11px 12px; border: 1.5px solid var(--ha-border); border-radius: var(--radius-md); font-size: 0.92rem; outline: none; background: #fff;" />
                    </div>

                    <div>
                      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                        <label for="student-side-password" style="font-size: 0.76rem; font-weight: 800; color: var(--ha-navy); letter-spacing: 0.03em;">
                          PASSWORD *
                        </label>
                      </div>
                      <div style="position: relative;">
                        <input type="password" id="student-side-password" placeholder="Enter your password" required autocomplete="current-password"
                          style="width: 100%; padding: 11px 38px 11px 12px; border: 1.5px solid var(--ha-border); border-radius: var(--radius-md); font-size: 0.92rem; outline: none; background: #fff;" />
                        <button type="button" class="toggle-password-btn" data-target="student-side-password"
                          style="position: absolute; right: 8px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; font-size: 1rem; color: var(--ha-text-muted); padding: 4px;" title="Show or hide password">
                          👁️
                        </button>
                      </div>
                    </div>

                    <div id="student-side-error" style="display: none; padding: 9px 12px; background: var(--ha-red-light); color: var(--ha-red); border-radius: var(--radius-sm); font-size: 0.82rem; font-weight: 700; border-left: 3px solid var(--ha-red);"></div>

                    <button type="submit" id="student-side-submit-btn" class="btn btn-primary" style="width: 100%; padding: 12px; font-weight: 800; letter-spacing: 0.04em;">
                      LOGIN
                    </button>
                  </form>

                  <!-- Quick account select chips -->
                  ${students.length > 0 ? `
                    <div style="margin-top: 14px; padding-top: 10px; border-top: 1px dashed var(--ha-border);">
                      <div style="font-size: 0.72rem; font-weight: 700; color: var(--ha-text-muted); text-transform: uppercase; margin-bottom: 6px;">
                        Select Profile:
                      </div>
                      <div style="display: flex; flex-wrap: wrap; gap: 5px;">
                        ${students.map(s => `
                          <button type="button" class="side-quick-chip" data-email="${s.email || ''}" data-name="${s.name}"
                            style="display: inline-flex; align-items: center; gap: 4px; padding: 4px 10px; background: #fff; border: 1px solid var(--ha-border); border-radius: var(--radius-pill); font-size: 0.78rem; font-weight: 700; color: var(--ha-navy); cursor: pointer;" title="Log in as ${s.name}">
                            <span>${s.avatar}</span> ${s.name}
                          </button>
                        `).join('')}
                      </div>
                    </div>
                  ` : ''}
                </div>

                <div style="margin-top: 14px; text-align: center; font-size: 0.82rem; color: var(--ha-text-muted); padding-top: 8px;">
                  New student? <a href="#" id="link-open-registration" style="color: var(--ha-navy); font-weight: 800; text-decoration: underline;">Join Class & Register</a>
                </div>
              </div>

              <!-- MIDDLE SEPARATOR -->
              <div class="auth-separator" style="display: flex; align-items: center; justify-content: center; position: relative;">
                <div style="width: 1px; height: 100%; background: var(--ha-border);"></div>
                <div style="position: absolute; background: #fff; border: 1px solid var(--ha-border); border-radius: 50%; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; font-size: 0.7rem; font-weight: 800; color: var(--ha-text-muted);">
                  OR
                </div>
              </div>

              <!-- RIGHT PANEL: TEACHER PORTAL -->
              <div class="auth-box-teacher mobile-hidden" id="auth-box-teacher" style="display: flex; flex-direction: column; justify-content: space-between; background: #FFF9F7; border: 1.5px solid rgba(217,4,41,0.25); border-radius: var(--radius-lg); padding: 22px;">
                <div>
                  <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 14px;">
                    <div style="width: 38px; height: 38px; border-radius: var(--radius-md); background: var(--ha-red); color: #fff; display: flex; align-items: center; justify-content: center; font-size: 1.3rem;">👨‍🏫</div>
                    <div>
                      <div style="display: flex; align-items: center; gap: 6px;">
                        <h3 style="font-size: 1.15rem; color: var(--ha-navy); margin: 0; font-weight: 800;">Teacher Portal</h3>
                        <span class="badge badge-red" style="font-size: 0.65rem; padding: 2px 5px;">Sir Zubair</span>
                      </div>
                      <span style="font-size: 0.76rem; color: var(--ha-text-muted);">Class Teacher: <strong>Sir Zubair</strong></span>
                    </div>
                  </div>

                  <form id="teacher-side-login-form" style="display: flex; flex-direction: column; gap: 12px;">
                    <div>
                      <label for="teacher-side-identifier" style="display: block; font-size: 0.76rem; font-weight: 800; color: var(--ha-navy); margin-bottom: 4px; letter-spacing: 0.03em;">
                        TEACHER USERNAME OR EMAIL *
                      </label>
                      <input type="text" id="teacher-side-identifier" placeholder="e.g. teacher or teacher@homeacademy.com" value="teacher" required autocomplete="username"
                        style="width: 100%; padding: 11px 12px; border: 1.5px solid var(--ha-border); border-radius: var(--radius-md); font-size: 0.92rem; outline: none; background: #fff;" />
                    </div>

                    <div>
                      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                        <label for="teacher-side-password" style="font-size: 0.76rem; font-weight: 800; color: var(--ha-navy); letter-spacing: 0.03em;">
                          TEACHER PASSWORD *
                        </label>
                      </div>
                      <div style="position: relative;">
                        <input type="password" id="teacher-side-password" placeholder="Enter teacher password" required autocomplete="current-password"
                          style="width: 100%; padding: 11px 38px 11px 12px; border: 1.5px solid var(--ha-border); border-radius: var(--radius-md); font-size: 0.92rem; outline: none; background: #fff;" />
                        <button type="button" class="toggle-password-btn" data-target="teacher-side-password"
                          style="position: absolute; right: 8px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; font-size: 1rem; color: var(--ha-text-muted); padding: 4px;" title="Show or hide password">
                          👁️
                        </button>
                      </div>
                    </div>

                    <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.8rem; color: var(--ha-text-muted);">
                      <label style="display: flex; align-items: center; gap: 6px; cursor: pointer; user-select: none;">
                        <input type="checkbox" id="teacher-side-remember" checked style="accent-color: var(--ha-red); width: 15px; height: 15px; cursor: pointer;" />
                        <span>Keep me logged in (30 days)</span>
                      </label>
                    </div>

                    <div id="teacher-side-error" style="display: none; padding: 9px 12px; background: var(--ha-red-light); color: var(--ha-red); border-radius: var(--radius-sm); font-size: 0.82rem; font-weight: 700; border-left: 3px solid var(--ha-red);"></div>

                    <button type="submit" id="teacher-side-submit-btn" class="btn btn-secondary" style="width: 100%; padding: 12px; font-weight: 800; letter-spacing: 0.04em; background: var(--ha-red); border-color: var(--ha-red);">
                      TEACHER LOGIN
                    </button>
                  </form>
                </div>

                <div style="margin-top: 14px; padding: 9px 11px; background: rgba(217,4,41,0.06); border-radius: var(--radius-sm); font-size: 0.74rem; color: var(--ha-text-muted); line-height: 1.4;">
                  🔒 <strong>Protected Faculty Portal</strong>: Manage students, monitor XP & quizzes, manage curriculum, update class code, and adjust security settings.
                </div>
              </div>

            </div>
          </div>

          <!-- NEW STUDENT REGISTRATION VIEW -->
          <div id="register-student-view" style="display: none;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
              <button type="button" id="btn-back-to-dual" class="btn btn-outline btn-sm" style="display: inline-flex; align-items: center; gap: 6px;">
                ← Back to Login Portals
              </button>
              <span class="badge badge-navy" style="font-size: 0.78rem;">New Student Registration</span>
            </div>

            <form id="new-student-enroll-form" style="display: flex; flex-direction: column; gap: 12px; max-width: 500px; margin: 0 auto;">
              <div>
                <label for="enroll-name" style="display: block; font-size: 0.76rem; font-weight: 800; color: var(--ha-navy); margin-bottom: 4px;">
                  FULL NAME *
                </label>
                <input type="text" id="enroll-name" placeholder="e.g. Yasir Ahmad" required autocomplete="name"
                  style="width: 100%; padding: 10px 12px; border: 1.5px solid var(--ha-border); border-radius: var(--radius-md); font-size: 0.92rem; outline: none;" />
              </div>

              <div>
                <label for="enroll-email" style="display: block; font-size: 0.76rem; font-weight: 800; color: var(--ha-navy); margin-bottom: 4px;">
                  EMAIL ADDRESS * (Used to save your personal dashboard & log in)
                </label>
                <input type="email" id="enroll-email" placeholder="e.g. student@gmail.com" required autocomplete="email"
                  style="width: 100%; padding: 10px 12px; border: 1.5px solid var(--ha-border); border-radius: var(--radius-md); font-size: 0.92rem; outline: none;" />
              </div>

              <div>
                <label for="enroll-password" style="display: block; font-size: 0.76rem; font-weight: 800; color: var(--ha-navy); margin-bottom: 4px;">
                  CREATE PASSWORD * (Minimum 4 characters)
                </label>
                <div style="position: relative;">
                  <input type="password" id="enroll-password" placeholder="Create your login password" minlength="4" required autocomplete="new-password"
                    style="width: 100%; padding: 10px 38px 10px 12px; border: 1.5px solid var(--ha-border); border-radius: var(--radius-md); font-size: 0.92rem; outline: none;" />
                  <button type="button" class="toggle-password-btn" data-target="enroll-password"
                    style="position: absolute; right: 8px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; font-size: 1rem; color: var(--ha-text-muted); padding: 4px;" title="Show or hide password">
                    👁️
                  </button>
                </div>
              </div>

              <div>
                <label for="enroll-code" style="display: block; font-size: 0.76rem; font-weight: 800; color: var(--ha-navy); margin-bottom: 4px;">
                  CLASS CODE *
                </label>
                <input type="text" id="enroll-code" value="${stateManager.state.classInfo?.code || 'HOME-ENGLISH'}" required
                  style="width: 100%; padding: 10px 12px; border: 1.5px solid var(--ha-border); border-radius: var(--radius-md); font-size: 0.92rem; font-weight: 700; color: var(--ha-navy); background: #F8FAFC;" />
              </div>

              <div>
                <label style="display: block; font-size: 0.76rem; font-weight: 800; color: var(--ha-navy); margin-bottom: 4px;">
                  SELECT AVATAR
                </label>
                <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 8px;">
                  ${AVATARS.map(av => `
                    <div class="avatar-option ${av === selectedAvatar ? 'active' : ''}" data-avatar="${av}"
                      style="font-size: 1.3rem; width: 38px; height: 38px; display: flex; align-items: center; justify-content: center; border-radius: var(--radius-md); border: 2px solid ${av === selectedAvatar ? 'var(--ha-navy)' : 'var(--ha-border)'}; cursor: pointer; background: ${av === selectedAvatar ? 'var(--ha-navy-subtle)' : '#FFF'};">
                      ${av}
                    </div>
                  `).join('')}
                </div>
              </div>

              <div id="enroll-error-msg" style="display: none; padding: 9px 12px; background: var(--ha-red-light); color: var(--ha-red); border-radius: var(--radius-sm); font-size: 0.82rem; font-weight: 700; border-left: 3px solid var(--ha-red);"></div>

              <button type="submit" id="enroll-submit-btn" class="btn btn-secondary btn-lg" style="width: 100%; margin-top: 4px;">
                <span>✨</span> CREATE ACCOUNT & JOIN
              </button>
            </form>
          </div>

        </div>
      </div>
    `;

    attachEvents();
  }

  function setViewMode(mode) {
    viewMode = mode;
    const dualView = modalContainer.querySelector('#side-by-side-view');
    const regView = modalContainer.querySelector('#register-student-view');

    if (dualView) dualView.style.display = mode === 'dual' ? 'block' : 'none';
    if (regView) regView.style.display = mode === 'register' ? 'block' : 'none';

    // Clear any error messages
    const stuErr = modalContainer.querySelector('#student-side-error');
    const teaErr = modalContainer.querySelector('#teacher-side-error');
    const enrErr = modalContainer.querySelector('#enroll-error-msg');
    if (stuErr) stuErr.style.display = 'none';
    if (teaErr) teaErr.style.display = 'none';
    if (enrErr) enrErr.style.display = 'none';
  }

  function attachEvents() {
    const backdrop = modalContainer.querySelector('#auth-modal-backdrop');
    const closeBtn = modalContainer.querySelector('#auth-close-btn');

    closeBtn?.addEventListener('click', closeModal);
    backdrop?.addEventListener('click', (e) => {
      if (e.target === backdrop) closeModal();
    });

    // Mobile tabs switcher (Student vs Teacher)
    const btnTabStudent = modalContainer.querySelector('#btn-tab-student');
    const btnTabTeacher = modalContainer.querySelector('#btn-tab-teacher');
    const boxStudent = modalContainer.querySelector('#auth-box-student');
    const boxTeacher = modalContainer.querySelector('#auth-box-teacher');

    btnTabStudent?.addEventListener('click', () => {
      sound.playClick();
      btnTabStudent.classList.add('active');
      btnTabTeacher?.classList.remove('active', 'teacher-active');
      boxStudent?.classList.remove('mobile-hidden');
      boxTeacher?.classList.add('mobile-hidden');
    });

    btnTabTeacher?.addEventListener('click', () => {
      sound.playClick();
      btnTabTeacher.classList.add('active', 'teacher-active');
      btnTabStudent?.classList.remove('active');
      boxTeacher?.classList.remove('mobile-hidden');
      boxStudent?.classList.add('mobile-hidden');
    });

    // View switching
    modalContainer.querySelector('#link-open-registration')?.addEventListener('click', (e) => {
      e.preventDefault();
      sound.playClick();
      setViewMode('register');
    });

    modalContainer.querySelector('#btn-back-to-dual')?.addEventListener('click', () => {
      sound.playClick();
      setViewMode('dual');
    });

    // Toggle password buttons
    modalContainer.querySelectorAll('.toggle-password-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.dataset.target;
        const input = modalContainer.querySelector(`#${targetId}`);
        if (input) {
          if (input.type === 'password') {
            input.type = 'text';
            btn.textContent = '🙈';
          } else {
            input.type = 'password';
            btn.textContent = '👁️';
          }
        }
      });
    });

    // Avatar selector
    modalContainer.querySelectorAll('.avatar-option').forEach(el => {
      el.addEventListener('click', () => {
        selectedAvatar = el.dataset.avatar;
        modalContainer.querySelectorAll('.avatar-option').forEach(opt => {
          const isCurrent = opt.dataset.avatar === selectedAvatar;
          opt.style.borderColor = isCurrent ? 'var(--ha-navy)' : 'var(--ha-border)';
          opt.style.background = isCurrent ? 'var(--ha-navy-subtle)' : '#FFF';
        });
      });
    });

    // Quick chip prefill
    modalContainer.querySelectorAll('.side-quick-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        sound.playClick();
        const email = btn.dataset.email;
        const name = btn.dataset.name;
        const emailInput = modalContainer.querySelector('#student-side-email');
        const passInput = modalContainer.querySelector('#student-side-password');
        if (emailInput && email) {
          emailInput.value = email;
        }
        if (passInput) {
          passInput.focus();
          passInput.placeholder = `Enter password for ${name}`;
        }
      });
    });

    // 1. LEFT — Student Login Form
    const studentForm = modalContainer.querySelector('#student-side-login-form');
    studentForm?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = modalContainer.querySelector('#student-side-email')?.value.trim();
      const password = modalContainer.querySelector('#student-side-password')?.value;
      const errorMsg = modalContainer.querySelector('#student-side-error');
      const submitBtn = modalContainer.querySelector('#student-side-submit-btn');

      if (errorMsg) errorMsg.style.display = 'none';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>⏳</span> Logging in...';
      }

      try {
        const student = await stateManager.loginStudent({ email, password });
        sound.playSuccess();
        closeModal();
        if (onStudentJoined) onStudentJoined(student, true);
      } catch (err) {
        sound.playWrong();
        if (errorMsg) {
          errorMsg.textContent = err.message || 'Login failed. Please check your email and password.';
          errorMsg.style.display = 'block';
        }
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = 'LOGIN';
        }
      }
    });

    // 2. RIGHT — Teacher Portal Form (Real Server Authentication)
    const teacherForm = modalContainer.querySelector('#teacher-side-login-form');
    teacherForm?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const identifier = modalContainer.querySelector('#teacher-side-identifier')?.value?.trim();
      const password = modalContainer.querySelector('#teacher-side-password')?.value;
      const rememberMe = modalContainer.querySelector('#teacher-side-remember')?.checked;
      const errorMsg = modalContainer.querySelector('#teacher-side-error');
      const submitBtn = modalContainer.querySelector('#teacher-side-submit-btn');

      if (errorMsg) errorMsg.style.display = 'none';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>⏳</span> Verifying credentials...';
      }

      try {
        await stateManager.verifyTeacherLogin({ identifier, password, rememberMe });
        sound.playCorrect();
        closeModal();
        window.dispatchEvent(new CustomEvent('ha:navigate', { detail: 'admin' }));
      } catch (err) {
        sound.playWrong();
        if (errorMsg) {
          errorMsg.textContent = err.message || 'Incorrect password. Please try again.';
          errorMsg.style.display = 'block';
        }
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = 'TEACHER LOGIN';
        }
      }
    });

    // 3. New Student Registration Form
    const enrollForm = modalContainer.querySelector('#new-student-enroll-form');
    enrollForm?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = modalContainer.querySelector('#enroll-name')?.value.trim();
      const email = modalContainer.querySelector('#enroll-email')?.value.trim();
      const password = modalContainer.querySelector('#enroll-password')?.value;
      const code = modalContainer.querySelector('#enroll-code')?.value.trim();
      const errorMsg = modalContainer.querySelector('#enroll-error-msg');
      const submitBtn = modalContainer.querySelector('#enroll-submit-btn');

      if (errorMsg) errorMsg.style.display = 'none';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>⏳</span> Creating Account...';
      }

      try {
        const student = await stateManager.registerStudent({
          name,
          email,
          password,
          classCode: code,
          avatar: selectedAvatar
        });
        sound.playSuccess();
        closeModal();
        if (onStudentJoined) onStudentJoined(student, false);
      } catch (err) {
        sound.playWrong();
        if (errorMsg) {
          errorMsg.textContent = err.message || 'Registration failed.';
          errorMsg.style.display = 'block';
        }
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<span>✨</span> CREATE ACCOUNT & JOIN';
        }
      }
    });
  }

  function openModal(mode) {
    renderModalContent();
    const backdrop = modalContainer.querySelector('#auth-modal-backdrop');
    if (backdrop) {
      backdrop.classList.remove('hidden');
      backdrop.style.display = 'flex';
    }

    if (mode === 'register') {
      setViewMode('register');
    } else {
      setViewMode('dual');
      // If requested focus on teacher
      if (mode === 'teacher' || mode === 'admin') {
        setTimeout(() => {
          modalContainer.querySelector('#teacher-side-password')?.focus();
        }, 100);
      } else {
        setTimeout(() => {
          modalContainer.querySelector('#student-side-email')?.focus();
        }, 100);
      }
    }
  }

  function closeModal() {
    const backdrop = modalContainer.querySelector('#auth-modal-backdrop');
    if (backdrop) {
      backdrop.classList.add('hidden');
      backdrop.style.display = 'none';
    }
  }

  window.addEventListener('ha:open-join-modal', (e) => {
    let mode = 'dual';
    if (e && e.detail) {
      if (typeof e.detail === 'string') mode = e.detail;
      else if (e.detail.tab) mode = e.detail.tab;
    }
    openModal(mode);
  });

  renderModalContent();

  return { openModal, closeModal };
}