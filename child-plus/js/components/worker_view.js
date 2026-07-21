/**
 * Child Plus - Anganwadi Worker Dashboard Component
 * Designed specifically for low-literacy, rapid visual entry by Anganwadi workers in rural centers.
 * Supports 1-Click English ⇄ Kannada Translation (Anekal, Karnataka).
 */

class AnganwadiWorkerView {
  render(containerEl, currentUser) {
    const t = (k) => window.I18n.t(k);
    const children = window.DB.getChildren(currentUser.centerId || "c_anekal_12");
    
    containerEl.innerHTML = `
      <div class="dashboard-page">
        <!-- Worker Header & Quick Actions -->
        <div class="dash-banner worker-banner">
          <div class="banner-info">
            <span class="user-avatar-large">${currentUser.avatar || "👩‍⚕️"}</span>
            <div>
              <h2>${t('welcomeWorker')}, ${currentUser.name}!</h2>
              <p class="banner-subtitle">📍 ${currentUser.centerName || t('centerLocation')} | ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
            </div>
          </div>
          <div class="banner-stats">
            <div class="stat-pill">
              <span class="stat-num">${children.length}</span>
              <span class="stat-lbl">${t('childrenCountLbl')}</span>
            </div>
            <div class="stat-pill stat-yellow">
              <span class="stat-num">${children.filter(c => c.currentStatus === 'MAM').length}</span>
              <span class="stat-lbl">MAM</span>
            </div>
            <div class="stat-pill stat-red">
              <span class="stat-num">${children.filter(c => c.currentStatus === 'SAM').length}</span>
              <span class="stat-lbl">SAM</span>
            </div>
          </div>
        </div>

        <!-- Quick Icon Action Hub for Low-Literacy Daily Entry -->
        <div class="section-container">
          <div class="section-header">
            <h3>${t('quickLoggerTitle')}</h3>
            <span class="badge badge-blue">${t('quickLoggerSub')}</span>
          </div>

          <div class="icon-quick-actions">
            <button class="action-card-btn" id="btnLogGrowth">
              <span class="action-icon">⚖️</span>
              <span class="action-title">${t('logWeightHeight')}</span>
              <span class="action-sub">${t('growthTracker')}</span>
            </button>

            <button class="action-card-btn action-green" id="btnLogMeals">
              <span class="action-icon">🍲</span>
              <span class="action-title">${t('hotMealsEgg')}</span>
              <span class="action-sub">${t('dailyNutrition')}</span>
            </button>

            <button class="action-card-btn action-orange" id="btnLogTHR">
              <span class="action-icon">📦</span>
              <span class="action-title">${t('thrRations')}</span>
              <span class="action-sub">${t('distributionLog')}</span>
            </button>

            <button class="action-card-btn action-purple" id="btnLogMilestone">
              <span class="action-icon">🧩</span>
              <span class="action-title">${t('milestoneCheck')}</span>
              <span class="action-sub">${t('cognitiveActivity')}</span>
            </button>
          </div>
        </div>

        <!-- Children Roster Table & Cards -->
        <div class="section-container">
          <div class="section-header">
            <h3>${t('rosterTitle')}</h3>
            <div class="filter-tab-group" id="statusFilters">
              <button class="tab-btn active" data-filter="ALL">${t('filterAll')} (${children.length})</button>
              <button class="tab-btn" data-filter="NORMAL">${t('filterHealthy')}</button>
              <button class="tab-btn" data-filter="MAM">${t('filterMAM')}</button>
              <button class="tab-btn" data-filter="STUNTING_RISK">${t('filterStunting')}</button>
            </div>
          </div>

          <div class="children-grid" id="childrenGrid">
            ${this.renderChildrenCards(children)}
          </div>
        </div>
      </div>

      <!-- Modal Container -->
      <div class="modal-overlay" id="workerModalOverlay" style="display:none;">
        <div class="modal-card" id="workerModalContent"></div>
      </div>
    `;

    this.bindEvents(containerEl, currentUser);
  }

  renderChildrenCards(children) {
    const t = (k) => window.I18n.t(k);
    if (!children.length) return `<div class="empty-state">No children registered in this center yet.</div>`;

    return children.map(c => {
      const risk = window.AIRiskEngine.assessChildRisk(c);
      let statusBadge = `<span class="badge badge-green">🟢 Normal</span>`;
      if (c.currentStatus === 'MAM') statusBadge = `<span class="badge badge-yellow">🟡 MAM Alert</span>`;
      if (c.currentStatus === 'SAM') statusBadge = `<span class="badge badge-red">🔴 SAM Critical</span>`;
      if (c.currentStatus === 'STUNTING_RISK') statusBadge = `<span class="badge badge-orange">🟠 Stunting Risk</span>`;

      return `
        <div class="child-card" data-id="${c.id}">
          <div class="child-card-header">
            <span class="child-photo">${c.photo}</span>
            <div class="child-basic">
              <h4>${c.name}</h4>
              <span class="child-meta">DOB: ${c.dob} (${risk.ageMonths}m) | ${c.gender}</span>
            </div>
            ${statusBadge}
          </div>

          <div class="child-metrics-row">
            <div class="metric-box">
              <span class="m-label">Height</span>
              <span class="m-val">${c.currentHeight} cm</span>
            </div>
            <div class="metric-box">
              <span class="m-label">Weight</span>
              <span class="m-val">${c.currentWeight} kg</span>
            </div>
            <div class="metric-box">
              <span class="m-label">MUAC</span>
              <span class="m-val">${c.muac || 14.0} cm</span>
            </div>
            <div class="metric-box">
              <span class="m-label">Cognitive</span>
              <span class="m-val">${c.cognitiveScore || 85}%</span>
            </div>
          </div>

          ${risk.alerts.length > 0 ? `
            <div class="risk-alert-box alert-${risk.overallRiskLevel.toLowerCase()}">
              <strong>⚠️ ${risk.alerts[0].title}:</strong> ${risk.alerts[0].message}
            </div>
          ` : ''}

          <div class="child-card-actions">
            <button class="btn btn-sm btn-outline btnQuickLog" data-id="${c.id}">${t('btnQuickLog')}</button>
            <button class="btn btn-sm btn-primary btnViewProfile" data-id="${c.id}">${t('btnViewDetails')}</button>
          </div>
        </div>
      `;
    }).join('');
  }

  bindEvents(containerEl, currentUser) {
    // Filter Buttons
    const filterGroup = containerEl.querySelector("#statusFilters");
    filterGroup.addEventListener("click", (e) => {
      const btn = e.target.closest(".tab-btn");
      if (!btn) return;
      filterGroup.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;
      const allChildren = window.DB.getChildren(currentUser.centerId);
      const filtered = filter === "ALL" ? allChildren : allChildren.filter(c => c.currentStatus === filter);
      containerEl.querySelector("#childrenGrid").innerHTML = this.renderChildrenCards(filtered);
      this.bindCardButtons(containerEl, currentUser);
    });

    // Quick Action Header Buttons
    containerEl.querySelector("#btnLogGrowth").onclick = () => this.openGrowthModal(containerEl, currentUser);
    containerEl.querySelector("#btnLogMeals").onclick = () => this.openMealModal(containerEl, currentUser);
    containerEl.querySelector("#btnLogTHR").onclick = () => this.openTHRModal(containerEl, currentUser);
    containerEl.querySelector("#btnLogMilestone").onclick = () => this.openMilestoneModal(containerEl, currentUser);

    this.bindCardButtons(containerEl, currentUser);
  }

  bindCardButtons(containerEl, currentUser) {
    containerEl.querySelectorAll(".btnQuickLog").forEach(btn => {
      btn.onclick = () => this.openGrowthModal(containerEl, currentUser, btn.dataset.id);
    });

    containerEl.querySelectorAll(".btnViewProfile").forEach(btn => {
      btn.onclick = () => this.openChildProfileModal(containerEl, currentUser, btn.dataset.id);
    });
  }

  openGrowthModal(containerEl, currentUser, preselectedChildId = null) {
    const children = window.DB.getChildren(currentUser.centerId);
    const modalOverlay = containerEl.querySelector("#workerModalOverlay");
    const modalContent = containerEl.querySelector("#workerModalContent");

    const targetChild = preselectedChildId ? children.find(c => c.id === preselectedChildId) : children[0];

    modalContent.innerHTML = `
      <div class="modal-header">
        <h3>⚖️ Icon Growth Logger</h3>
        <button class="modal-close" id="btnCloseModal">&times;</button>
      </div>

      <form id="growthForm" class="modal-body">
        <div class="form-group">
          <label>Select Child:</label>
          <select id="childSelect" class="form-control">
            ${children.map(c => `<option value="${c.id}" ${c.id === targetChild.id ? 'selected' : ''}>${c.photo} ${c.name} (${c.dob})</option>`).join('')}
          </select>
        </div>

        <div class="icon-input-row">
          <div class="icon-input-group">
            <span class="big-icon">📏</span>
            <label>Height (cm):</label>
            <input type="number" step="0.1" id="inputHeight" value="${targetChild.currentHeight}" class="form-control" required />
          </div>

          <div class="icon-input-group">
            <span class="big-icon">⚖️</span>
            <label>Weight (kg):</label>
            <input type="number" step="0.1" id="inputWeight" value="${targetChild.currentWeight}" class="form-control" required />
          </div>

          <div class="icon-input-group">
            <span class="big-icon">💪</span>
            <label>MUAC (cm):</label>
            <input type="number" step="0.1" id="inputMUAC" value="${targetChild.muac || 14.0}" class="form-control" required />
          </div>
        </div>

        <div class="form-group">
          <label>Checkup Date:</label>
          <input type="date" id="inputDate" class="form-control" value="${new Date().toISOString().split('T')[0]}" required />
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" id="btnCancelModal">Cancel</button>
          <button type="submit" class="btn btn-primary">✅ Save Growth Record</button>
        </div>
      </form>
    `;

    modalOverlay.style.display = "flex";

    const closeModal = () => { modalOverlay.style.display = "none"; };
    modalContent.querySelector("#btnCloseModal").onclick = closeModal;
    modalContent.querySelector("#btnCancelModal").onclick = closeModal;

    modalContent.querySelector("#growthForm").onsubmit = (e) => {
      e.preventDefault();
      const childId = modalContent.querySelector("#childSelect").value;
      const height = parseFloat(modalContent.querySelector("#inputHeight").value);
      const weight = parseFloat(modalContent.querySelector("#inputWeight").value);
      const muac = parseFloat(modalContent.querySelector("#inputMUAC").value);
      const date = modalContent.querySelector("#inputDate").value;

      const childObj = window.DB.getChildById(childId);
      childObj.currentHeight = height;
      childObj.currentWeight = weight;
      childObj.muac = muac;

      const risk = window.AIRiskEngine.assessChildRisk(childObj);
      let newStatus = "NORMAL";
      if (risk.wastingRisk === "SAM") newStatus = "SAM";
      else if (risk.wastingRisk === "MAM") newStatus = "MAM";
      else if (risk.stuntingRisk !== "NORMAL") newStatus = "STUNTING_RISK";

      window.DB.addGrowthRecord(childId, { date, height, weight, muac, status: newStatus });

      alert(`✅ Checkup logged successfully! AI Status updated to: ${newStatus}`);
      closeModal();
      this.render(containerEl, currentUser);
    };
  }

  openMealModal(containerEl, currentUser) {
    const modalOverlay = containerEl.querySelector("#workerModalOverlay");
    const modalContent = containerEl.querySelector("#workerModalContent");

    modalContent.innerHTML = `
      <div class="modal-header">
        <h3>🍲 Daily Meal & Egg Attendance</h3>
        <button class="modal-close" id="btnCloseModal">&times;</button>
      </div>
      <div class="modal-body">
        <p>Log today's hot cooked meal and boiled egg distribution for center children.</p>
        <div class="meal-check-list">
          <div class="meal-row">
            <span>🥚 Boiled Eggs Served:</span>
            <input type="number" class="form-control" value="22" style="width:100px;" />
          </div>
          <div class="meal-row">
            <span>🍲 Hot Kichadi Meals:</span>
            <input type="number" class="form-control" value="24" style="width:100px;" />
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-primary" id="btnSaveMeal">✅ Record Attendance & Meals</button>
      </div>
    `;

    modalOverlay.style.display = "flex";
    modalContent.querySelector("#btnCloseModal").onclick = () => modalOverlay.style.display = "none";
    modalContent.querySelector("#btnSaveMeal").onclick = () => {
      alert("✅ Daily meals recorded for Anekal Center!");
      modalOverlay.style.display = "none";
    };
  }

  openTHRModal(containerEl, currentUser) {
    alert("📦 Take Home Ration (THR) distribution logged for 24 registered mothers & children!");
  }

  openMilestoneModal(containerEl, currentUser) {
    const children = window.DB.getChildren(currentUser.centerId);
    this.openChildProfileModal(containerEl, currentUser, children[0].id);
  }

  openChildProfileModal(containerEl, currentUser, childId) {
    const child = window.DB.getChildById(childId);
    const risk = window.AIRiskEngine.assessChildRisk(child);
    const modalOverlay = containerEl.querySelector("#workerModalOverlay");
    const modalContent = containerEl.querySelector("#workerModalContent");

    modalContent.innerHTML = `
      <div class="modal-header">
        <h3>📊 ${child.photo} ${child.name} - Detailed Health Profile</h3>
        <button class="modal-close" id="btnCloseModal">&times;</button>
      </div>

      <div class="modal-body modal-scroll">
        <div class="profile-summary-grid">
          <div class="p-card">
            <span>Age & Gender</span>
            <strong>${risk.ageMonths} months (${child.gender})</strong>
          </div>
          <div class="p-card">
            <span>Current Status</span>
            <strong class="text-${risk.overallRiskLevel.toLowerCase()}">${child.currentStatus}</strong>
          </div>
          <div class="p-card">
            <span>Height / Weight</span>
            <strong>${child.currentHeight} cm / ${child.currentWeight} kg</strong>
          </div>
          <div class="p-card">
            <span>Cognitive Index</span>
            <strong>${child.cognitiveScore}%</strong>
          </div>
        </div>

        <div class="ai-recommendations-section">
          <h4>🤖 AI Risk Assessment & Interventions</h4>
          ${risk.alerts.map(a => `<div class="alert-box alert-${a.type.toLowerCase()}">${a.message}</div>`).join('')}
          <ul class="rec-list">
            ${risk.recommendations.map(r => `<li>💡 ${r}</li>`).join('')}
          </ul>
        </div>

        <div class="milestones-section">
          <h4>🧩 Early Milestone Checklist</h4>
          <div class="milestone-grid">
            <label class="m-checkbox"><input type="checkbox" ${child.milestones.grossMotor ? 'checked' : ''} /> Gross Motor (Jumping/Walking)</label>
            <label class="m-checkbox"><input type="checkbox" ${child.milestones.fineMotor ? 'checked' : ''} /> Fine Motor (Pencil/Blocks)</label>
            <label class="m-checkbox"><input type="checkbox" ${child.milestones.speechLanguage ? 'checked' : ''} /> Speech & Words</label>
            <label class="m-checkbox"><input type="checkbox" ${child.milestones.socialEmotional ? 'checked' : ''} /> Social Play</label>
            <label class="m-checkbox"><input type="checkbox" ${child.milestones.cognitiveProblemSolving ? 'checked' : ''} /> Problem Solving</label>
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <button class="btn btn-secondary" id="btnCloseProfile">Close</button>
      </div>
    `;

    modalOverlay.style.display = "flex";
    modalContent.querySelector("#btnCloseModal").onclick = () => modalOverlay.style.display = "none";
    modalContent.querySelector("#btnCloseProfile").onclick = () => modalOverlay.style.display = "none";
  }
}

window.AnganwadiWorkerView = new AnganwadiWorkerView();
