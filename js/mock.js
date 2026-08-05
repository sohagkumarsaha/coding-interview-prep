// Mock Interview page: pick a track + duration, get a random problem cold,
// code against a countdown timer, then self-grade against the reference
// solution. Session history persists in localStorage.
document.addEventListener("DOMContentLoaded", () => {
  const HISTORY_KEY = "optimus-prep-mock-history";

  const setupScreen = document.getElementById("setup-screen");
  const sessionScreen = document.getElementById("session-screen");
  const reviewPanel = document.getElementById("review-panel");

  const trackOptions = document.querySelectorAll("#track-options .option-btn");
  const durationOptions = document.querySelectorAll("#duration-options .option-btn");
  const startBtn = document.getElementById("start-session-btn");

  const titleEl = document.getElementById("mock-problem-title");
  const patternEl = document.getElementById("mock-problem-pattern");
  const promptEl = document.getElementById("mock-problem-prompt");
  const exampleWrap = document.getElementById("mock-problem-example-wrap");
  const exampleEl = document.getElementById("mock-problem-example");
  const editorContainer = document.getElementById("mock-editor-container");
  const runBtn = document.getElementById("mock-run-btn");
  const endBtn = document.getElementById("mock-end-btn");
  const consoleEl = document.getElementById("mock-console-output");
  const testResultsEl = document.getElementById("mock-test-results");
  const statusEl = document.getElementById("mock-status");
  const timerEl = document.getElementById("timer-readout");
  const timerNum = timerEl.querySelector(".num");

  const reviewSolution = document.getElementById("review-solution");
  const reviewComplexity = document.getElementById("review-complexity");
  const reviewApproach = document.getElementById("review-approach");
  const ratingButtons = document.querySelectorAll("#rating-options .option-btn");
  const saveSessionBtn = document.getElementById("save-session-btn");
  const newSessionBtn = document.getElementById("new-session-btn");
  const historyBody = document.getElementById("history-table-body");

  let selectedTrack = "dsa";
  let selectedDuration = 1500; // seconds
  let selectedRating = null;
  let editor = null;
  let currentProblem = null;
  let timerId = null;
  let secondsRemaining = 0;
  let elapsedSeconds = 0;

  function selectOption(group, chosenBtn, dataAttr) {
    group.forEach((b) => b.classList.remove("selected"));
    chosenBtn.classList.add("selected");
    return chosenBtn.dataset[dataAttr];
  }
  trackOptions.forEach((btn) => btn.addEventListener("click", () => {
    selectedTrack = selectOption(trackOptions, btn, "track");
  }));
  durationOptions.forEach((btn) => btn.addEventListener("click", () => {
    selectedDuration = parseInt(selectOption(durationOptions, btn, "duration"), 10);
  }));

  function taggedDsa() { return DSA_PROBLEMS.map((p, i) => ({ ...p, source: "dsa", label: "P-" + String(i + 1).padStart(2, "0") })); }
  function taggedBlind75() { return BLIND75_PROBLEMS.map((p) => ({ ...p, pattern: p.category, source: "blind75", label: p.id.replace("b75-", "B-") })); }
  function taggedFaang() { return FAANG_EXTRA_PROBLEMS.map((p) => ({ ...p, pattern: p.category, source: "faang", label: p.id.replace("fx-", "X-") })); }
  function taggedRl() { return RL_PROBLEMS.filter((p) => !p.torch).map((p, i) => ({ ...p, source: "rl", label: "R-" + String(i + 1).padStart(2, "0") })); }

  function pickRandomProblem(track) {
    let pool = [];
    if (track === "dsa") pool = taggedDsa();
    else if (track === "blind75") pool = taggedBlind75();
    else if (track === "faang") pool = taggedFaang();
    else if (track === "rl") pool = taggedRl();
    else pool = [...taggedDsa(), ...taggedBlind75(), ...taggedFaang(), ...taggedRl()];
    return pool[Math.floor(Math.random() * pool.length)];
  }

  function formatTime(sec) {
    const s = Math.max(0, sec);
    const m = Math.floor(s / 60);
    const r = s % 60;
    return String(m).padStart(2, "0") + ":" + String(r).padStart(2, "0");
  }

  function tick() {
    secondsRemaining -= 1;
    elapsedSeconds += 1;
    timerNum.textContent = formatTime(secondsRemaining);
    timerEl.classList.remove("warn", "over");
    if (secondsRemaining <= 0) {
      timerEl.classList.add("over");
      timerNum.textContent = "TIME UP";
    } else if (secondsRemaining <= selectedDuration * 0.2) {
      timerEl.classList.add("warn");
    }
  }

  function startTimer() {
    clearInterval(timerId);
    secondsRemaining = selectedDuration;
    elapsedSeconds = 0;
    timerEl.classList.remove("warn", "over");
    timerNum.textContent = formatTime(secondsRemaining);
    timerId = setInterval(tick, 1000);
  }
  function stopTimer() {
    clearInterval(timerId);
    timerId = null;
  }

  function setStatus(state) {
    statusEl.classList.remove("ready", "busy");
    if (state === "loading") { statusEl.classList.add("busy"); statusEl.querySelector(".label").textContent = "Loading Python runtime\u2026"; }
    else if (state === "ready") { statusEl.classList.add("ready"); statusEl.querySelector(".label").textContent = "Python 3.11 \u00b7 Pyodide ready"; }
    else if (state === "busy") { statusEl.classList.add("busy"); statusEl.querySelector(".label").textContent = "Running\u2026"; }
    else if (state === "error") { statusEl.querySelector(".label").textContent = "Runtime failed to load"; }
  }
  PyRunner.onStatus(setStatus);

  startBtn.addEventListener("click", () => {
    currentProblem = pickRandomProblem(selectedTrack);
    titleEl.textContent = currentProblem.title;
    patternEl.textContent = currentProblem.pattern;
    promptEl.textContent = currentProblem.prompt;
    if (currentProblem.example) {
      exampleWrap.hidden = false;
      exampleEl.textContent = currentProblem.example;
    } else {
      exampleWrap.hidden = true;
    }
    consoleEl.innerHTML = '<span class="placeholder">Run your code to see output here.</span>';
    testResultsEl.innerHTML = "";
    editor = OptimusEditor.create(editorContainer, currentProblem.starter);

    setupScreen.hidden = true;
    reviewPanel.hidden = true;
    sessionScreen.hidden = false;

    setStatus("loading");
    PyRunner.load().catch(() => setStatus("error"));
    startTimer();
  });

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
      } else {
        const output = await PyRunner.run(code);
        consoleEl.textContent = output && output.trim() ? output : "(no stdout output)";
      }
    } catch (err) {
      consoleEl.innerHTML = '<span class="line-err">' + escapeHtml(String(err)) + "</span>";
    } finally {
      runBtn.disabled = false;
      setStatus("ready");
    }
  });

  endBtn.addEventListener("click", () => {
    stopTimer();
    sessionScreen.hidden = true;
    reviewPanel.hidden = false;
    reviewApproach.textContent = currentProblem.approach;
    reviewSolution.innerHTML = renderCodeBlock(currentProblem.solution);
    reviewComplexity.textContent = currentProblem.complexity;
    selectedRating = null;
    ratingButtons.forEach((b) => b.classList.remove("selected"));
  });

  ratingButtons.forEach((btn) => btn.addEventListener("click", () => {
    selectedRating = selectOption(ratingButtons, btn, "rating");
  }));

  function loadHistory() {
    try { return JSON.parse(localStorage.getItem(HISTORY_KEY)) || []; } catch (e) { return []; }
  }
  function saveHistory(list) {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(list));
  }
  function renderHistory() {
    const list = loadHistory();
    if (!list.length) {
      historyBody.innerHTML = '<tr><td colspan="5" style="color:var(--ink-faint);">No sessions yet. Your first mock interview will show up here.</td></tr>';
      return;
    }
    historyBody.innerHTML = list.slice().reverse().map((s) => `
      <tr>
        <td>${escapeHtml(s.date)}</td>
        <td>${escapeHtml(s.problem)}</td>
        <td>${escapeHtml(s.track)}</td>
        <td>${formatTime(s.elapsedSeconds)} / ${formatTime(s.durationSeconds)}</td>
        <td>${escapeHtml(s.rating || "\u2014")}</td>
      </tr>
    `).join("");
  }

  saveSessionBtn.addEventListener("click", () => {
    const list = loadHistory();
    list.push({
      date: new Date().toLocaleString(),
      problem: currentProblem.title,
      track: currentProblem.source === "dsa" ? "DSA" : currentProblem.source === "blind75" ? "Blind 75" : currentProblem.source === "faang" ? "FAANG Ext." : "RL",
      durationSeconds: selectedDuration,
      elapsedSeconds: Math.min(elapsedSeconds, selectedDuration),
      rating: selectedRating,
    });
    saveHistory(list);
    renderHistory();
    resetToSetup();
  });

  function resetToSetup() {
    reviewPanel.hidden = true;
    sessionScreen.hidden = true;
    setupScreen.hidden = false;
  }
  newSessionBtn.addEventListener("click", resetToSetup);

  renderHistory();
});
