/**
 * Child Plus - Interactive Educational Games Component
 * Age-appropriate learning games for early childhood cognitive development:
 * 1. Fruit Counter (Math & Quantity recognition)
 * 2. Shape Sorter (Fine Motor & Spatial Awareness)
 * 3. Color & Sound Matcher (Language & Audio-Visual association)
 */

class ChildrenGamesManager {
  constructor() {
    this.activeGame = null;
  }

  renderFruitCounter(containerEl, onComplete) {
    let score = 0;
    let targetCount = 5;
    let currentCount = 0;
    const fruits = ["🍎", "🍌", "🥭", "🍇", "🍊"];
    const currentFruit = fruits[Math.floor(Math.random() * fruits.length)];

    containerEl.innerHTML = `
      <div class="game-card">
        <div class="game-header">
          <h3>🍎 Fruit Counter Game</h3>
          <span class="badge badge-purple">Math & Counting</span>
        </div>
        <p class="game-instruction">Tap and collect exactly <strong>${targetCount} ${currentFruit}</strong> to complete today's snack basket!</p>
        
        <div class="game-basket-container">
          <div class="basket-counter">
            <span class="basket-icon">🧺</span>
            <span class="counter-text" id="counterDisplay">0 / ${targetCount}</span>
          </div>
        </div>

        <div class="fruit-grid" id="fruitGrid">
          ${Array.from({ length: 9 }).map((_, i) => `
            <button class="fruit-btn" data-index="${i}">
              ${Math.random() > 0.3 ? currentFruit : "🌸"}
            </button>
          `).join('')}
        </div>

        <div class="game-footer">
          <button class="btn btn-secondary" id="btnRestartGame">🔄 Restart</button>
        </div>
      </div>
    `;

    const counterDisplay = containerEl.querySelector("#counterDisplay");
    const fruitGrid = containerEl.querySelector("#fruitGrid");

    fruitGrid.addEventListener("click", (e) => {
      const btn = e.target.closest(".fruit-btn");
      if (!btn || btn.disabled) return;

      if (btn.textContent.trim() === currentFruit) {
        currentCount++;
        score += 20;
        btn.innerHTML = "✅";
        btn.classList.add("correct-animation");
        btn.disabled = true;
        counterDisplay.textContent = `${currentCount} / ${targetCount}`;

        if (currentCount >= targetCount) {
          setTimeout(() => {
            containerEl.innerHTML = `
              <div class="game-card game-success">
                <div class="success-icon">🎉 🌟 🏆</div>
                <h2>Fantastic Job!</h2>
                <p>You collected all ${targetCount} ${currentFruit}! You earned 3 Stars!</p>
                <div class="star-rating">⭐⭐⭐</div>
                <button class="btn btn-primary" id="btnFinishGame">Save Score & Exit</button>
              </div>
            `;
            containerEl.querySelector("#btnFinishGame").onclick = () => {
              if (onComplete) onComplete({ name: "Fruit Counter", category: "Math & Counting", score: 100, stars: 3 });
            };
          }, 600);
        }
      } else {
        btn.classList.add("shake-animation");
        setTimeout(() => btn.classList.remove("shake-animation"), 400);
      }
    });

    containerEl.querySelector("#btnRestartGame").onclick = () => {
      this.renderFruitCounter(containerEl, onComplete);
    };
  }

  renderShapeSorter(containerEl, onComplete) {
    const shapes = [
      { name: "Circle", emoji: "🔴", match: "⭕" },
      { name: "Square", emoji: "🟦", match: "⬛" },
      { name: "Star", emoji: "⭐", match: "🌟" },
      { name: "Heart", emoji: "💖", match: "💗" }
    ];

    let matchedCount = 0;

    containerEl.innerHTML = `
      <div class="game-card">
        <div class="game-header">
          <h3>🔷 Shape Sorter Game</h3>
          <span class="badge badge-cyan">Cognitive & Motor</span>
        </div>
        <p class="game-instruction">Tap each shape on the top to match it with its outline below!</p>
        
        <div class="shape-match-area">
          <div class="shape-targets" id="shapeTargets">
            ${shapes.map(s => `
              <div class="shape-target-box" data-name="${s.name}">
                <span class="target-outline">${s.match}</span>
                <span class="target-label">${s.name}</span>
              </div>
            `).join('')}
          </div>

          <div class="shape-source-pool" id="shapePool">
            ${[...shapes].sort(() => Math.random() - 0.5).map(s => `
              <button class="shape-source-btn" data-name="${s.name}">
                ${s.emoji}
              </button>
            `).join('')}
          </div>
        </div>

        <div class="game-footer">
          <button class="btn btn-secondary" id="btnRestartShape">🔄 Restart</button>
        </div>
      </div>
    `;

    let selectedShape = null;
    const pool = containerEl.querySelector("#shapePool");
    const targets = containerEl.querySelector("#shapeTargets");

    pool.addEventListener("click", (e) => {
      const btn = e.target.closest(".shape-source-btn");
      if (!btn) return;
      pool.querySelectorAll(".shape-source-btn").forEach(b => b.classList.remove("selected-shape"));
      btn.classList.add("selected-shape");
      selectedShape = btn.dataset.name;
    });

    targets.addEventListener("click", (e) => {
      const box = e.target.closest(".shape-target-box");
      if (!box || !selectedShape) return;

      if (box.dataset.name === selectedShape) {
        matchedCount++;
        const sourceBtn = pool.querySelector(`[data-name="${selectedShape}"]`);
        if (sourceBtn) sourceBtn.remove();
        
        box.classList.add("matched-box");
        box.innerHTML = `<span class="target-matched">✅ ${selectedShape}</span>`;
        selectedShape = null;

        if (matchedCount >= shapes.length) {
          setTimeout(() => {
            containerEl.innerHTML = `
              <div class="game-card game-success">
                <div class="success-icon">🎨 ✨ 🏆</div>
                <h2>Brilliant Motor Skills!</h2>
                <p>All shapes sorted perfectly!</p>
                <div class="star-rating">⭐⭐⭐</div>
                <button class="btn btn-primary" id="btnFinishShape">Save Score & Exit</button>
              </div>
            `;
            containerEl.querySelector("#btnFinishShape").onclick = () => {
              if (onComplete) onComplete({ name: "Shape Sorter", category: "Cognitive Motor", score: 95, stars: 3 });
            };
          }, 600);
        }
      }
    });

    containerEl.querySelector("#btnRestartShape").onclick = () => {
      this.renderShapeSorter(containerEl, onComplete);
    };
  }

  renderColorMatcher(containerEl, onComplete) {
    const colors = [
      { name: "Red", color: "#e91e63", icon: "🍎" },
      { name: "Blue", color: "#0047a5", icon: "🐳" },
      { name: "Yellow", color: "#ff9f1c", icon: "🐥" },
      { name: "Green", color: "#4caf50", icon: "🐸" }
    ];

    const target = colors[Math.floor(Math.random() * colors.length)];

    containerEl.innerHTML = `
      <div class="game-card">
        <div class="game-header">
          <h3>🎨 Color Matcher Game</h3>
          <span class="badge badge-pink">Visual Recognition</span>
        </div>
        <p class="game-instruction">Which card has the color <strong><span style="color:${target.color}">${target.name}</span></strong>?</p>
        
        <div class="color-card-grid" id="colorGrid">
          ${colors.map(c => `
            <button class="color-tile-btn" data-name="${c.name}" style="background: ${c.color}">
              <span class="color-tile-icon">${c.icon}</span>
              <span class="color-tile-name">${c.name}</span>
            </button>
          `).join('')}
        </div>
      </div>
    `;

    containerEl.querySelector("#colorGrid").addEventListener("click", (e) => {
      const btn = e.target.closest(".color-tile-btn");
      if (!btn) return;

      if (btn.dataset.name === target.name) {
        containerEl.innerHTML = `
          <div class="game-card game-success">
            <div class="success-icon">🌈 🎯 ⭐</div>
            <h2>Correct Answer!</h2>
            <p>You correctly matched ${target.name}!</p>
            <button class="btn btn-primary" id="btnFinishColor">Save Score & Exit</button>
          </div>
        `;
        containerEl.querySelector("#btnFinishColor").onclick = () => {
          if (onComplete) onComplete({ name: "Color & Sound Matcher", category: "Language & Audio", score: 90, stars: 3 });
        };
      } else {
        btn.classList.add("shake-animation");
        setTimeout(() => btn.classList.remove("shake-animation"), 400);
      }
    });
  }
}

window.ChildrenGames = new ChildrenGamesManager();
