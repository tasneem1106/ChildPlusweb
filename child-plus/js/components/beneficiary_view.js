/**
 * Child Plus - Beneficiary (Parent/Guardian) Dashboard Component
 * Playful, clear visual interface for parents to monitor child growth, daily nutrition, and home learning games.
 * Supports 1-click English ⇄ Kannada translation.
 */

class BeneficiaryView {
  render(containerEl, currentUser) {
    const t = (k) => window.I18n.t(k);
    const childId = currentUser.childId || "child_aarav";
    const child = window.DB.getChildById(childId) || window.DB.getChildren()[0];
    const risk = window.AIRiskEngine.assessChildRisk(child);

    containerEl.innerHTML = `
      <div class="dashboard-page">
        <!-- Parent Banner -->
        <div class="dash-banner parent-banner">
          <div class="banner-info">
            <span class="user-avatar-large">${child.photo}</span>
            <div>
              <h2>${child.name}'s ${t('parentHubTitle')}</h2>
              <p class="banner-subtitle">👨‍👩‍👧 ${t('parentNameLbl')}: ${child.parentName} | ${t('centerLbl')}: ${child.centerName}</p>
            </div>
          </div>
          <div class="banner-stats">
            <div class="stat-pill">
              <span class="stat-num">${child.cognitiveScore}%</span>
              <span class="stat-lbl">${t('cognitiveStars')}</span>
            </div>
            <div class="stat-pill">
              <span class="stat-num">${child.attendanceRate}%</span>
              <span class="stat-lbl">${t('attendanceLbl')}</span>
            </div>
          </div>
        </div>

        <!-- Child Overview Cards -->
        <div class="parent-grid">
          <!-- Growth Trajectory Card -->
          <div class="section-card">
            <div class="card-title-row">
              <h3>${t('growthStatusTitle')}</h3>
              <span class="badge badge-green">Last Logged: ${child.lastCheckup}</span>
            </div>

            <div class="growth-stats-grid">
              <div class="g-stat-box">
                <span class="g-label">${t('currentHeight')}</span>
                <span class="g-val">${child.currentHeight} cm</span>
                <span class="g-target">${t('expectedLbl')}: ${risk.expectedHeight} cm</span>
              </div>
              <div class="g-stat-box">
                <span class="g-label">${t('currentWeight')}</span>
                <span class="g-val">${child.currentWeight} kg</span>
                <span class="g-target">${t('expectedLbl')}: ${risk.expectedWeight} kg</span>
              </div>
              <div class="g-stat-box">
                <span class="g-label">${t('muacMetric')}</span>
                <span class="g-val">${child.muac || 14.0} cm</span>
                <span class="g-target">${t('standardLbl')}: &gt; 12.5 cm</span>
              </div>
            </div>

            <div class="growth-chart-container">
              <canvas id="growthCanvas" height="180"></canvas>
            </div>
          </div>

          <!-- Nutritional Meal & Advice Card -->
          <div class="section-card">
            <div class="card-title-row">
              <h3>${t('dailyNutritionPlan')}</h3>
              <span class="badge badge-orange">Anganwadi Diet</span>
            </div>

            <div class="nutrition-advice-box">
              <div class="advice-icon">💡</div>
              <div>
                <h4>${t('smartAdviceTitle')}</h4>
                <p>${child.nutritionalPlan ? child.nutritionalPlan.advice : "Provide balanced daily meals with fresh fruits and green vegetables."}</p>
              </div>
            </div>

            <div class="meal-checklist">
              <div class="meal-item ${child.nutritionalPlan?.hotMealAttended ? 'checked' : ''}">
                <span class="m-icon">🍲</span>
                <span>Hot Cooked Meal at Center</span>
                <span class="m-status">${child.nutritionalPlan?.hotMealAttended ? '✅ Provided' : '⏳ Pending'}</span>
              </div>

              <div class="meal-item ${child.nutritionalPlan?.supplementaryEgg ? 'checked' : ''}">
                <span class="m-icon">🥚</span>
                <span>Protein Egg Supplement</span>
                <span class="m-status">${child.nutritionalPlan?.supplementaryEgg ? '✅ Provided' : '⏳ Pending'}</span>
              </div>

              <div class="meal-item ${child.nutritionalPlan?.thrDistributed ? 'checked' : ''}">
                <span class="m-icon">📦</span>
                <span>Monthly Take Home Ration (THR)</span>
                <span class="m-status">${child.nutritionalPlan?.thrDistributed ? '✅ Distributed' : '⏳ Pending'}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Interactive Children's Educational Activities Hub -->
        <div class="section-container">
          <div class="section-header">
            <h3>${t('playLearnHub')}</h3>
            <span class="badge badge-purple">Earn Stars & Badges!</span>
          </div>

          <div class="game-select-grid">
            <div class="game-teaser-card" id="btnPlayFruit">
              <div class="teaser-icon">🍎</div>
              <h4>Fruit Counter</h4>
              <p>Count fresh fruits to boost early math and quantity skills.</p>
              <button class="btn btn-sm btn-primary">${t('btnPlay')}</button>
            </div>

            <div class="game-teaser-card teaser-cyan" id="btnPlayShape">
              <div class="teaser-icon">🔷</div>
              <h4>Shape Sorter</h4>
              <p>Sort circles, squares, and stars to develop fine motor skills.</p>
              <button class="btn btn-sm btn-accent">${t('btnPlay')}</button>
            </div>

            <div class="game-teaser-card teaser-pink" id="btnPlayColor">
              <div class="teaser-icon">🎨</div>
              <h4>Color Matcher</h4>
              <p>Identify bright colors and sounds for audio-visual recognition.</p>
              <button class="btn btn-sm btn-secondary">${t('btnPlay')}</button>
            </div>
          </div>

          <div id="gamePlayContainer" class="game-play-area" style="display:none; margin-top:20px;"></div>
        </div>

        <!-- Achievement Star Badges -->
        <div class="section-container">
          <div class="section-header">
            <h3>${t('badgesTitle')}</h3>
          </div>

          <div class="badges-row">
            <div class="badge-item unlocked">
              <span class="b-icon">🌟</span>
              <span class="b-title">Math Wizard</span>
              <span class="b-sub">Passed Fruit Counter</span>
            </div>

            <div class="badge-item unlocked">
              <span class="b-icon">🥗</span>
              <span class="b-title">Healthy Eater</span>
              <span class="b-sub">100% Meal Attendance</span>
            </div>

            <div class="badge-item unlocked">
              <span class="b-icon">🎨</span>
              <span class="b-title">Color Master</span>
              <span class="b-sub">Shape & Color Hero</span>
            </div>

            <div class="badge-item locked">
              <span class="b-icon">🚀</span>
              <span class="b-title">Super Growth</span>
              <span class="b-sub">Reach 100 cm Height</span>
            </div>
          </div>
        </div>
      </div>
    `;

    this.bindEvents(containerEl, currentUser, child);
    this.renderGrowthChart(containerEl, child);
  }

  renderGrowthChart(containerEl, child) {
    const canvas = containerEl.querySelector("#growthCanvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const history = child.growthHistory || [];

    const width = canvas.width = canvas.parentElement.clientWidth || 600;
    const height = canvas.height = 180;

    ctx.clearRect(0, 0, width, height);

    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = 1;
    for (let y = 30; y < height; y += 40) {
      ctx.beginPath();
      ctx.moveTo(40, y);
      ctx.lineTo(width - 20, y);
      ctx.stroke();
    }

    if (!history.length) return;

    ctx.strokeStyle = "#0047a5";
    ctx.lineWidth = 3;
    ctx.beginPath();
    history.forEach((h, i) => {
      const x = 50 + (i / Math.max(1, history.length - 1)) * (width - 100);
      const y = height - 30 - ((h.height - 70) / 40) * (height - 60);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    history.forEach((h, i) => {
      const x = 50 + (i / Math.max(1, history.length - 1)) * (width - 100);
      const y = height - 30 - ((h.height - 70) / 40) * (height - 60);
      
      ctx.fillStyle = "#00a8cc";
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = "#1e293b";
      ctx.font = "bold 12px Inter, sans-serif";
      ctx.fillText(`${h.height}cm`, x - 14, y - 12);
    });
  }

  bindEvents(containerEl, currentUser, child) {
    const gameContainer = containerEl.querySelector("#gamePlayContainer");

    containerEl.querySelector("#btnPlayFruit").onclick = () => {
      gameContainer.style.display = "block";
      gameContainer.scrollIntoView({ behavior: "smooth" });
      window.ChildrenGames.renderFruitCounter(gameContainer, (result) => {
        window.DB.addActivityLog(child.id, result);
        alert(`🎉 Awesome job! Activity score saved to ${child.name}'s profile.`);
        gameContainer.style.display = "none";
        this.render(containerEl, currentUser);
      });
    };

    containerEl.querySelector("#btnPlayShape").onclick = () => {
      gameContainer.style.display = "block";
      gameContainer.scrollIntoView({ behavior: "smooth" });
      window.ChildrenGames.renderShapeSorter(gameContainer, (result) => {
        window.DB.addActivityLog(child.id, result);
        alert(`🎉 Awesome job! Activity score saved to ${child.name}'s profile.`);
        gameContainer.style.display = "none";
        this.render(containerEl, currentUser);
      });
    };

    containerEl.querySelector("#btnPlayColor").onclick = () => {
      gameContainer.style.display = "block";
      gameContainer.scrollIntoView({ behavior: "smooth" });
      window.ChildrenGames.renderColorMatcher(gameContainer, (result) => {
        window.DB.addActivityLog(child.id, result);
        alert(`🎉 Awesome job! Activity score saved to ${child.name}'s profile.`);
        gameContainer.style.display = "none";
        this.render(containerEl, currentUser);
      });
    };
  }
}

window.BeneficiaryView = new BeneficiaryView();
