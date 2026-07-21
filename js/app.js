/**
 * Child Plus - Core Application Controller & Router
 * Manages user login, role routing, language toggling, and main dashboard mounting.
 */

class AppController {
  constructor() {
    this.container = document.getElementById("appContainer");
    this.navUserArea = document.getElementById("navUserArea");
    this.navUserAvatar = document.getElementById("navUserAvatar");
    this.navUserName = document.getElementById("navUserName");
    this.navUserRole = document.getElementById("navUserRole");
    this.btnLogout = document.getElementById("btnLogout");
    this.btnLangToggle = document.getElementById("btnLangToggle");

    this.init();
  }

  init() {
    this.btnLogout.addEventListener("click", () => window.API.logout());

    document.getElementById("btnGoHome").addEventListener("click", () => {
      this.route();
    });

    this.btnLangToggle.addEventListener("click", () => {
      const current = window.I18n.getLang();
      const nextLang = current === "en" ? "kn" : "en";
      window.I18n.setLang(nextLang);
      this.updateLangBtnText();
    });

    this.updateLangBtnText();
    this.route();
  }

  updateLangBtnText() {
    const current = window.I18n.getLang();
    const langText = document.getElementById("langText");
    if (langText) {
      langText.textContent = current === "en" ? "ಕನ್ನಡ (Kannada)" : "English 🇬🇧";
    }
  }

  route() {
    const user = window.API.getCurrentUser();

    if (!user) {
      this.navUserArea.style.display = "none";
      this.renderLogin();
      return;
    }

    // Show Header User Chip
    this.navUserArea.style.display = "flex";
    this.navUserAvatar.textContent = user.avatar || "👤";
    this.navUserName.textContent = user.name;
    this.navUserRole.textContent = user.role;
    this.navUserRole.className = `role-badge role-${user.role.toLowerCase()}`;

    // Render Dashboard according to Role
    if (user.role === "WORKER") {
      window.AnganwadiWorkerView.render(this.container, user);
    } else if (user.role === "SUPERVISOR") {
      window.SupervisorView.render(this.container, user);
    } else if (user.role === "BENEFICIARY") {
      window.BeneficiaryView.render(this.container, user);
    } else {
      this.renderLogin();
    }
  }

  renderLogin() {
    const t = (k) => window.I18n.t(k);

    this.container.innerHTML = `
      <div class="login-wrapper">
        <div class="login-card">
          <div class="login-header">
            <img src="logo.jpg" alt="Child Plus Logo" class="login-logo" />
            <h2>${t('loginWelcome')}</h2>
            <p style="color:var(--text-muted); font-size:0.9rem; margin-top:4px;">${t('loginSub')}</p>
          </div>

          <!-- Quick Role Demo Switcher Buttons -->
          <div style="margin-bottom:20px; text-align:center;">
            <p style="font-size:0.8rem; color:var(--primary-cyan); font-weight:700; margin-bottom:8px;">${t('demoTag')}</p>
            <div style="display:flex; gap:8px; justify-content:center;">
              <button class="btn btn-sm btn-primary" id="demoWorker">👩‍⚕️ ${t('roleWorker')}</button>
              <button class="btn btn-sm btn-accent" id="demoSupervisor">👨‍🏫 ${t('roleSupervisor')}</button>
              <button class="btn btn-sm btn-secondary" id="demoParent">👩 ${t('roleParent')}</button>
            </div>
          </div>

          <div class="role-switcher" id="loginRoleTabs">
            <button class="role-tab active" data-username="worker" data-password="worker123">${t('roleWorker')}</button>
            <button class="role-tab" data-username="supervisor" data-password="super123">${t('roleSupervisor')}</button>
            <button class="role-tab" data-username="parent" data-password="parent123">${t('roleParent')}</button>
          </div>

          <form id="loginForm">
            <div class="form-group">
              <label>Username</label>
              <input type="text" id="loginUsername" class="form-control" value="worker" required />
            </div>

            <div class="form-group">
              <label>Password</label>
              <input type="password" id="loginPassword" class="form-control" value="worker123" required />
            </div>

            <button type="submit" class="btn btn-primary" style="width:100%; justify-content:center;">
              ${t('signIn')}
            </button>
          </form>
        </div>
      </div>
    `;

    const tabs = this.container.querySelectorAll(".role-tab");
    const userInput = this.container.querySelector("#loginUsername");
    const passInput = this.container.querySelector("#loginPassword");

    tabs.forEach(tab => {
      tab.onclick = () => {
        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        userInput.value = tab.dataset.username;
        passInput.value = tab.dataset.password;
      };
    });

    // Demo Quick Buttons
    this.container.querySelector("#demoWorker").onclick = () => this.doLogin("worker", "worker123");
    this.container.querySelector("#demoSupervisor").onclick = () => this.doLogin("supervisor", "super123");
    this.container.querySelector("#demoParent").onclick = () => this.doLogin("parent", "parent123");

    this.container.querySelector("#loginForm").onsubmit = (e) => {
      e.preventDefault();
      this.doLogin(userInput.value, passInput.value);
    };
  }

  async doLogin(username, password) {
    const result = await window.API.login(username, password);
    if (result.success) {
      this.route();
    } else {
      alert(result.message);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.App = new AppController();
});
