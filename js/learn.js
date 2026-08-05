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
        <div class="acc-body">
          <div>
            <h5>Problem</h5>
            <p class="prose">${escapeHtml(p.prompt)}</p>
          </div>
          ${p.example ? `<div><h5>Example</h5><pre class="example">${escapeHtml(p.example)}</pre></div>` : ""}
          <div>
            <h5>Approach</h5>
            <p class="prose">${escapeHtml(p.approach)}</p>
          </div>
          <div>
            <h5>Python Solution</h5>
            ${renderCodeBlock(p.solution)}
          </div>
          <div class="callout"><strong>Complexity —</strong> ${escapeHtml(p.complexity)}</div>
        </div>
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
        <div class="acc-body">
          <div>
            <h5>Problem</h5>
            <p class="prose">${escapeHtml(p.prompt)}</p>
          </div>
          <div>
            <h5>Approach</h5>
            <p class="prose">${escapeHtml(p.approach)}</p>
          </div>
          <div>
            <h5>Reference Implementation</h5>
            ${renderCodeBlock(p.solution)}
          </div>
          <div class="callout"><strong>Complexity —</strong> ${escapeHtml(p.complexity)}</div>
        </div>
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
              <div class="acc-body">
                <div><h5>Problem</h5><p class="prose">${escapeHtml(p.prompt)}</p></div>
                ${p.example ? `<div><h5>Example</h5><pre class="example">${escapeHtml(p.example)}</pre></div>` : ""}
                <div><h5>Approach</h5><p class="prose">${escapeHtml(p.approach)}</p></div>
                <div><h5>Python Solution</h5>${renderCodeBlock(p.solution)}</div>
                <div class="callout"><strong>Complexity —</strong> ${escapeHtml(p.complexity)}</div>
              </div>
            </details>
          `).join("")}
        </div>
      `;
    }).join("");
  }

  const dsaPanel = document.querySelector('[data-panel="dsa"]');
  const blind75Panel = document.querySelector('[data-panel="blind75"]');
  const rlPanel = document.querySelector('[data-panel="rl"]');
  const sdPanel = document.querySelector('[data-panel="sysdesign"]');
  const qaPanel = document.querySelector('[data-panel="qa"]');
  if (dsaPanel) dsaPanel.innerHTML = dsaAccordion();
  if (blind75Panel) blind75Panel.innerHTML = blind75Accordion();
  if (rlPanel) rlPanel.innerHTML = rlAccordion();
  if (sdPanel) sdPanel.innerHTML = sysDesignAccordion();
  if (qaPanel) qaPanel.innerHTML = qaAccordion();

  // Activate tab from URL hash, default to dsa
  const initial = (location.hash || "#dsa").slice(1);
  activateTab(["dsa", "blind75", "rl", "sysdesign", "qa"].includes(initial) ? initial : "dsa");
});
