// Renders the Learn page: tabbed accordions for DSA, RL, System Design, Q&A.
document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".learn-tab");
  const panels = document.querySelectorAll(".learn-panel");
  const searchInput = document.getElementById("learn-search");

  function activateTab(name) {
    tabs.forEach((t) => t.classList.toggle("active", t.dataset.tab === name));
    panels.forEach((p) => p.toggleAttribute("hidden", p.dataset.panel !== name));
    if (searchInput) searchInput.value = "";
    filterPanel();
    history.replaceState(null, "", "#" + name);
  }

  tabs.forEach((t) => t.addEventListener("click", () => activateTab(t.dataset.tab)));

  function filterPanel() {
    const q = (searchInput && searchInput.value || "").trim().toLowerCase();
    const activePanel = document.querySelector(".learn-panel:not([hidden])");
    if (!activePanel) return;
    activePanel.querySelectorAll(".acc-item").forEach((item) => {
      const hay = item.dataset.search || "";
      item.style.display = !q || hay.includes(q) ? "" : "none";
    });
  }
  if (searchInput) searchInput.addEventListener("input", filterPanel);

  // Shared body renderer: Problem, Example, Technique, Approach, Solution, Complexity + why.
  function renderProblemBody(p, opts) {
    opts = opts || {};
    const codeLabel = opts.codeLabel || "Python Solution";
    return `
      <div><h5>Problem</h5><p class="prose">${escapeHtml(p.prompt)}</p></div>
      ${p.example ? `<div><h5>Example</h5><pre class="example">${escapeHtml(p.example)}</pre></div>` : ""}
      <div><h5>Technique</h5><p class="prose"><span class="tag tag-signal" style="margin-right:6px;">${escapeHtml(p.pattern || p.category)}</span></p></div>
      <div><h5>Approach</h5><p class="prose">${escapeHtml(p.approach)}</p></div>
      <div><h5>${escapeHtml(codeLabel)}</h5>${renderCodeBlock(p.solution)}</div>
      <div class="callout"><strong>Complexity —</strong> ${escapeHtml(p.complexity)}</div>
      ${p.whyComplexity ? `<div class="callout"><strong>Why —</strong> ${escapeHtml(p.whyComplexity)}</div>` : ""}
    `;
  }

  // ---- Renderers ----
  function dsaAccordion() {
    return DSA_PROBLEMS.map((p, i) => `
      <details class="acc-item" data-search="${escapeHtml((p.title + ' ' + p.pattern).toLowerCase())}">
        <summary>
          <span class="num">P-${String(i + 1).padStart(2, "0")}</span>
          <span class="ttl">${escapeHtml(p.title)}</span>
          <span class="tag tag-signal">${escapeHtml(p.pattern)}</span>
          <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 6l6 6-6 6"/></svg>
        </summary>
        <div class="acc-body">${renderProblemBody(p)}</div>
      </details>
    `).join("");
  }

  function rlAccordion() {
    return RL_PROBLEMS.map((p, i) => `
      <details class="acc-item" data-search="${escapeHtml((p.title + ' ' + p.pattern).toLowerCase())}">
        <summary>
          <span class="num">R-${String(i + 1).padStart(2, "0")}</span>
          <span class="ttl">${escapeHtml(p.title)}</span>
          <span class="tag tag-amber">${escapeHtml(p.pattern)}</span>
          ${p.torch ? '<span class="tag tag-torch">PyTorch</span>' : '<span class="tag tag-torch">Runnable</span>'}
          <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 6l6 6-6 6"/></svg>
        </summary>
        <div class="acc-body">${renderProblemBody(p, { codeLabel: "Reference Implementation" })}</div>
      </details>
    `).join("");
  }

  function sysDesignAccordion() {
    return SYSDESIGN_PROBLEMS.map((p, i) => `
      <details class="acc-item" data-search="${escapeHtml(p.title.toLowerCase())}">
        <summary>
          <span class="num">S-${String(i + 1).padStart(2, "0")}</span>
          <span class="ttl">${escapeHtml(p.title)}</span>
          <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 6l6 6-6 6"/></svg>
        </summary>
        <div class="acc-body">
          <p class="prose">${escapeHtml(p.prompt)}</p>
          <div>
            <h5>Clarifying Questions</h5>
            <ul style="padding-left:18px; list-style: disc; display:flex; flex-direction:column; gap:6px;">
              ${p.clarify.map((c) => `<li class="prose">${escapeHtml(c)}</li>`).join("")}
            </ul>
          </div>
          <div>
            <h5>Core Components</h5>
            <ul style="padding-left:18px; list-style: disc; display:flex; flex-direction:column; gap:6px;">
              ${p.components.map((c) => `<li class="prose">${escapeHtml(c)}</li>`).join("")}
            </ul>
          </div>
          <div>
            <h5>Tradeoffs to Raise Unprompted</h5>
            <ul style="padding-left:18px; list-style: disc; display:flex; flex-direction:column; gap:6px;">
              ${p.tradeoffs.map((c) => `<li class="prose">${escapeHtml(c)}</li>`).join("")}
            </ul>
          </div>
        </div>
      </details>
    `).join("");
  }

  function qaAccordion() {
    return QA_BANK.map((group, gi) => `
      <div style="margin-bottom:26px;">
        <div class="group-label" style="padding-left:0;">${escapeHtml(group.category)}</div>
        ${group.items.map((item, ii) => `
          <details class="acc-item" data-search="${escapeHtml((group.category + ' ' + item.q).toLowerCase())}">
            <summary>
              <span class="num">Q${gi + 1}.${ii + 1}</span>
              <span class="ttl">${escapeHtml(item.q)}</span>
              <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 6l6 6-6 6"/></svg>
            </summary>
            <div class="acc-body">
              <p class="prose">${escapeHtml(item.a)}</p>
            </div>
          </details>
        `).join("")}
      </div>
    `).join("");
  }

  function blind75Accordion() {
    const categories = [];
    BLIND75_PROBLEMS.forEach((p) => { if (!categories.includes(p.category)) categories.push(p.category); });
    return categories.map((cat) => {
      const items = BLIND75_PROBLEMS.filter((p) => p.category === cat);
      return `
        <div style="margin-bottom:26px;">
          <div class="group-label" style="padding-left:0;">${escapeHtml(cat)} &middot; ${items.length}</div>
          ${items.map((p) => `
            <details class="acc-item" data-search="${escapeHtml((p.title + ' ' + p.category).toLowerCase())}">
              <summary>
                <span class="num">${escapeHtml(p.id.replace('b75-', 'B-'))}</span>
                <span class="ttl">${escapeHtml(p.title)}</span>
                <span class="tag tag-amber">${escapeHtml(p.category)}</span>
                <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 6l6 6-6 6"/></svg>
              </summary>
              <div class="acc-body">${renderProblemBody(p)}</div>
            </details>
          `).join("")}
        </div>
      `;
    }).join("");
  }

  function faangAccordion() {
    const combined = [...FAANG_EXTRA_PROBLEMS, ...NEETCODE_EXTRA_PROBLEMS];
    const categories = [];
    combined.forEach((p) => { if (!categories.includes(p.category)) categories.push(p.category); });
    return categories.map((cat) => {
      const items = combined.filter((p) => p.category === cat);
      return `
        <div style="margin-bottom:26px;">
          <div class="group-label" style="padding-left:0;">${escapeHtml(cat)} &middot; ${items.length}</div>
          ${items.map((p) => `
            <details class="acc-item" data-search="${escapeHtml((p.title + ' ' + p.category).toLowerCase())}">
              <summary>
                <span class="num">${escapeHtml(p.id.replace('fx-', 'X-').replace('nc-', 'N-'))}</span>
                <span class="ttl">${escapeHtml(p.title)}</span>
                <span class="tag tag-signal">${escapeHtml(p.category)}</span>
                <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 6l6 6-6 6"/></svg>
              </summary>
              <div class="acc-body">${renderProblemBody(p)}</div>
            </details>
          `).join("")}
        </div>
      `;
    }).join("");
  }

  function pythonMasteryAccordion() {
    return PYTHON_MASTERY.map((tier, ti) => `
      <div style="margin-bottom:30px;">
        <div class="group-label" style="padding-left:0; font-size:13px;">${escapeHtml(tier.tier)}</div>
        ${tier.items.map((item, ii) => `
          <details class="acc-item" data-search="${escapeHtml((tier.tier + ' ' + item.q).toLowerCase())}">
            <summary>
              <span class="num">${ti + 1}.${ii + 1}</span>
              <span class="ttl">${escapeHtml(item.q)}</span>
              <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 6l6 6-6 6"/></svg>
            </summary>
            <div class="acc-body">
              <p class="prose">${escapeHtml(item.a)}</p>
              ${item.example ? renderCodeBlock(item.example) : ""}
              ${item.followups && item.followups.length ? `
                <div>
                  <h5>Follow-ups</h5>
                  <div style="display:flex; flex-direction:column; gap:10px;">
                    ${item.followups.map((f) => `
                      <div style="border-left:2px solid var(--line-strong); padding-left:12px;">
                        <div style="font-size:13.5px; font-weight:600; margin-bottom:3px;">${escapeHtml(f.q)}</div>
                        <div class="prose" style="font-size:13.5px;">${escapeHtml(f.a)}</div>
                      </div>
                    `).join("")}
                  </div>
                </div>
              ` : ""}
            </div>
          </details>
        `).join("")}
      </div>
    `).join("");
  }

  function grind75PlanAccordion() {
    // Combined lookup across every problem pool so plan items can resolve
    // title/category/id-prefix regardless of which set they came from.
    const lookup = {};
    DSA_PROBLEMS.forEach((p, i) => { lookup[p.id] = { ...p, label: "P-" + String(i + 1).padStart(2, "0") }; });
    BLIND75_PROBLEMS.forEach((p) => { lookup[p.id] = { ...p, pattern: p.category, label: p.id.replace("b75-", "B-") }; });
    FAANG_EXTRA_PROBLEMS.forEach((p) => { lookup[p.id] = { ...p, pattern: p.category, label: p.id.replace("fx-", "X-") }; });
    NEETCODE_EXTRA_PROBLEMS.forEach((p) => { lookup[p.id] = { ...p, pattern: p.category, label: p.id.replace("nc-", "N-") }; });

    let progress = {};
    try { progress = JSON.parse(localStorage.getItem("optimus-prep-progress")) || {}; } catch (e) { progress = {}; }

    const totalMinutes = GRIND75_PLAN.reduce((s, w) => s + w.items.reduce((s2, it) => s2 + it.minutes, 0), 0);
    const totalItems = GRIND75_PLAN.reduce((s, w) => s + w.items.length, 0);
    const totalSolved = GRIND75_PLAN.reduce((s, w) => s + w.items.filter((it) => progress[it.id]).length, 0);

    const intro = `
      <div class="callout" style="margin-bottom:22px;">
        <strong>Why this isn't just another copy of Blind 75 —</strong>
        Grind 75 and Blind 75 overlap on the large majority of their problems; Grind 75's real value-add is prioritization and pacing, not a different problem set. This is that pacing, applied to the problems already in this site: ${totalItems} problems across 8 weeks (~${Math.round(totalMinutes / 60)} hours total), ordered so each week's patterns build on the last. Progress here mirrors your Practice tab automatically — solve a problem there and it checks off here too.
        <div style="margin-top:10px; font-family:var(--font-mono); font-size:12.5px; color:var(--ink-soft);">${totalSolved} / ${totalItems} complete</div>
      </div>
    `;

    const weeks = GRIND75_PLAN.map((w) => {
      const solvedCount = w.items.filter((it) => progress[it.id]).length;
      const pct = Math.round((solvedCount / w.items.length) * 100);
      const weekMinutes = w.items.reduce((s, it) => s + it.minutes, 0);
      return `
        <details class="acc-item" data-search="${escapeHtml(("week " + w.week + " " + w.focus).toLowerCase())}">
          <summary>
            <span class="num">Wk ${w.week}</span>
            <span class="ttl">${escapeHtml(w.focus)}</span>
            <span class="tag tag-signal">~${Math.round(weekMinutes / 60 * 10) / 10}h</span>
            <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 6l6 6-6 6"/></svg>
          </summary>
          <div class="acc-body">
            <div class="plan-week-head">
              <span style="font-family:var(--font-mono); font-size:12px; color:var(--ink-faint);">${solvedCount} / ${w.items.length} solved</span>
              <span class="progress-track"><span class="progress-fill" style="width:${pct}%;"></span></span>
            </div>
            <div>
              ${w.items.map((it) => {
                const p = lookup[it.id];
                if (!p) return "";
                const isSolved = !!progress[it.id];
                return `
                  <a class="plan-item ${isSolved ? "solved" : ""}" href="practice.html#${it.id}">
                    <span class="check">${isSolved ? "\u2713" : ""}</span>
                    <span class="plan-item-title">${escapeHtml(p.title)}</span>
                    <span class="tag" style="flex:none;">${escapeHtml(p.pattern || p.category)}</span>
                    <span class="mins">${it.minutes} min</span>
                  </a>
                `;
              }).join("")}
            </div>
          </div>
        </details>
      `;
    }).join("");

    return intro + weeks;
  }

  const dsaPanel = document.querySelector('[data-panel="dsa"]');
  const blind75Panel = document.querySelector('[data-panel="blind75"]');
  const faangPanel = document.querySelector('[data-panel="faang"]');
  const pythonPanel = document.querySelector('[data-panel="python"]');
  const rlPanel = document.querySelector('[data-panel="rl"]');
  const sdPanel = document.querySelector('[data-panel="sysdesign"]');
  const qaPanel = document.querySelector('[data-panel="qa"]');
  const planPanel = document.querySelector('[data-panel="plan"]');
  if (dsaPanel) dsaPanel.innerHTML = dsaAccordion();
  if (blind75Panel) blind75Panel.innerHTML = blind75Accordion();
  if (faangPanel) faangPanel.innerHTML = faangAccordion();
  if (pythonPanel) pythonPanel.innerHTML = pythonMasteryAccordion();
  if (rlPanel) rlPanel.innerHTML = rlAccordion();
  if (sdPanel) sdPanel.innerHTML = sysDesignAccordion();
  if (qaPanel) qaPanel.innerHTML = qaAccordion();
  if (planPanel) planPanel.innerHTML = grind75PlanAccordion();
  highlightCode();

  // Activate tab from URL hash, default to dsa
  const initial = (location.hash || "#dsa").slice(1);
  activateTab(["dsa", "blind75", "faang", "python", "rl", "sysdesign", "qa", "plan"].includes(initial) ? initial : "dsa");
});
