// Practice page: problem browser (DSA + RL) wired to a live Pyodide-backed
// Python IDE. Progress (solved problems) persists in localStorage.
document.addEventListener("DOMContentLoaded", () => {
  const PROGRESS_KEY = "optimus-prep-progress";

  const ALL_PROBLEMS = [
    ...DSA_PROBLEMS.map((p, i) => ({ ...p, source: "dsa", label: "P-" + String(i + 1).padStart(2, "0") })),
    ...BLIND75_PROBLEMS.map((p) => ({ ...p, pattern: p.category, source: "blind75", label: p.id.replace("b75-", "B-") })),
    ...RL_PROBLEMS.map((p, i) => ({ ...p, source: "rl", label: "R-" + String(i + 1).padStart(2, "0") })),
  ];

  const listEl = document.getElementById("problem-list");
  const searchEl = document.getElementById("problem-search");
  const chipsEl = document.getElementById("filter-chips");
  const titleEl = document.getElementById("problem-title");
  const patternTagEl = document.getElementById("problem-pattern-tag");
  const promptEl = document.getElementById("problem-prompt");
  const exampleWrap = document.getElementById("problem-example-wrap");
  const exampleEl = document.getElementById("problem-example");
  const editorContainer = document.getElementById("editor-container");
  const runBtn = document.getElementById("run-btn");
  const resetBtn = document.getElementById("reset-btn");
  const solutionBtn = document.getElementById("solution-btn");
  const solutionWrap = document.getElementById("solution-wrap");
  const torchNotice = document.getElementById("torch-notice");
  const consoleEl = document.getElementById("console-output");
  const testResultsEl = document.getElementById("test-results");
  const statusEl = document.getElementById("ide-status");
  const solvedCountEl = document.getElementById("solved-count");

  let activeFilter = "all";
  let currentProblem = null;
  let editor = null;

  function getProgress() {
    try { return JSON.parse(localStorage.getItem(PROGRESS_KEY)) || {}; } catch (e) { return {}; }
  }
  function setSolved(id) {
    const p = getProgress();
    p[id] = true;
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(p));
    renderList();
    updateSolvedCount();
  }
  function updateSolvedCount() {
    if (!solvedCountEl) return;
    const p = getProgress();
    const count = Object.keys(p).filter((k) => p[k]).length;
    solvedCountEl.textContent = count + " / " + ALL_PROBLEMS.length + " solved";
  }

  function renderList() {
    const q = (searchEl.value || "").trim().toLowerCase();
    const progress = getProgress();
    const filtered = ALL_PROBLEMS.filter((p) => {
      if (activeFilter !== "all" && p.source !== activeFilter) return false;
      if (q && !(p.title + " " + p.pattern).toLowerCase().includes(q)) return false;
      return true;
    });
    listEl.innerHTML = filtered.map((p) => `
      <li class="problem-item ${currentProblem && currentProblem.id === p.id ? "active" : ""} ${progress[p.id] ? "solved" : ""}" data-id="${p.id}">
        <span class="idx">${p.label}</span>
        <span>${escapeHtml(p.title)}</span>
      </li>
    `).join("") || '<li style="padding:10px; color:var(--ink-faint); font-size:13px;">No problems match.</li>';

    listEl.querySelectorAll(".problem-item[data-id]").forEach((el) => {
      el.addEventListener("click", () => selectProblem(el.dataset.id));
    });
  }

  function selectProblem(id) {
    const p = ALL_PROBLEMS.find((x) => x.id === id);
    if (!p) return;
    currentProblem = p;
    titleEl.textContent = p.title;
    patternTagEl.textContent = p.pattern;
    promptEl.textContent = p.prompt;
    if (p.example) {
      exampleWrap.hidden = false;
      exampleEl.textContent = p.example;
    } else {
      exampleWrap.hidden = true;
    }
    solutionWrap.hidden = true;
    solutionWrap.innerHTML = "";
    solutionBtn.textContent = "Show reference solution";
    consoleEl.innerHTML = '<span class="placeholder">Run your code to see output here.</span>';
    testResultsEl.innerHTML = "";

    editor = OptimusEditor.create(editorContainer, p.starter);

    const isTorch = !!p.torch;
    torchNotice.hidden = !isTorch;
    runBtn.disabled = isTorch;
    runBtn.title = isTorch ? "PyTorch is not available in the in-browser runtime — study the reference solution instead." : "";

    renderList();
    history.replaceState(null, "", "#" + id);
  }

  chipsEl.querySelectorAll(".chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      chipsEl.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      activeFilter = chip.dataset.filter;
      renderList();
    });
  });
  searchEl.addEventListener("input", renderList);

  resetBtn.addEventListener("click", () => {
    if (currentProblem) editor.setValue(currentProblem.starter);
  });

  solutionBtn.addEventListener("click", () => {
    if (!currentProblem) return;
    const showing = !solutionWrap.hidden;
    if (showing) {
      solutionWrap.hidden = true;
      solutionBtn.textContent = "Show reference solution";
    } else {
      solutionWrap.hidden = false;
      solutionWrap.innerHTML = renderCodeBlock(currentProblem.solution);
      solutionBtn.textContent = "Hide reference solution";
    }
  });

  function setStatus(state) {
    statusEl.classList.remove("ready", "busy");
    if (state === "loading") { statusEl.classList.add("busy"); statusEl.querySelector(".label").textContent = "Loading Python runtime\u2026"; }
    else if (state === "ready") { statusEl.classList.add("ready"); statusEl.querySelector(".label").textContent = "Python 3.11 \u00b7 Pyodide ready"; }
    else if (state === "busy") { statusEl.classList.add("busy"); statusEl.querySelector(".label").textContent = "Running\u2026"; }
    else if (state === "error") { statusEl.querySelector(".label").textContent = "Runtime failed to load"; }
  }
  PyRunner.onStatus(setStatus);
  setStatus("loading");
  PyRunner.load().catch(() => setStatus("error"));

  runBtn.addEventListener("click", async () => {
    if (!currentProblem) return;
    const code = editor.getValue();
    runBtn.disabled = true;
    setStatus("busy");
    testResultsEl.innerHTML = "";
    consoleEl.textContent = "";
    try {
      if (currentProblem.tests && currentProblem.tests.length) {
        const { output, results } = await PyRunner.runWithTests(code, currentProblem.tests);
        consoleEl.textContent = output && output.trim() ? output : "(no stdout output)";
        testResultsEl.innerHTML = results.map((r) => `
          <div class="test-row ${r.passed ? "pass" : "fail"}">
            <span class="mark">${r.passed ? "\u2713" : "\u2715"}</span>
            <span>Test ${r.index + 1}${r.error ? " — error: " + escapeHtml(r.error) : (r.passed ? " — passed" : " — got " + escapeHtml(String(r.actual)))}</span>
          </div>
        `).join("");
        const allPassed = results.length > 0 && results.every((r) => r.passed);
        if (allPassed) setSolved(currentProblem.id);
      } else {
        const output = await PyRunner.run(code);
        consoleEl.textContent = output && output.trim() ? output : "(no stdout output — code ran with no print statements)";
      }
    } catch (err) {
      consoleEl.innerHTML = '<span class="line-err">' + escapeHtml(String(err)) + "</span>";
    } finally {
      runBtn.disabled = !!(currentProblem && currentProblem.torch);
      setStatus("ready");
    }
  });

  renderList();
  updateSolvedCount();
  const initialId = (location.hash || "").slice(1);
  selectProblem(ALL_PROBLEMS.some((p) => p.id === initialId) ? initialId : ALL_PROBLEMS[0].id);
});
