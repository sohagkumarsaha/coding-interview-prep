# Optimus Prep

**Live at [sohagkumarsaha.github.io/coding-interview-prep](https://sohagkumarsaha.github.io/coding-interview-prep/)**

A self-contained interview lab for the Tesla Optimus Reinforcement Learning Engineer, Policy role: a pattern library (DSA, the complete Blind 75, a FAANG-extended set, RL implementation, system design, a Python Q&A curriculum from Hello World to advanced, and a rapid-fire bank), a live in-browser Python IDE, and a timed mock-interview mode.

Everything runs client-side. Python execution is powered by [Pyodide](https://pyodide.org) (real CPython compiled to WebAssembly) — there is no backend, no login, and no data ever leaves the browser. Progress and mock-interview history are stored in `localStorage` on your own machine.

## Redeploying after changes

The site is already live, pushed from a folder named `coding-interview-prep` at the root of the `sohagkumarsaha.github.io` repository. To ship an update:

```bash
cd path/to/sohagkumarsaha.github.io
git pull
# copy the updated coding-interview-prep/ folder in, overwriting the old one
git add coding-interview-prep
git commit -m "Update Optimus Prep site"
git push origin main
```

Give it 30–60 seconds after pushing, then refresh **https://sohagkumarsaha.github.io/coding-interview-prep/** (a hard refresh — Ctrl/Cmd+Shift+R — helps if the browser cached the old CSS/JS).

## Setting it up from scratch elsewhere

All internal links and asset paths in this project are relative (`css/styles.css`, `js/theme.js`, `data/dsa.js`, ...), so it works identically whether it's the root of its own repository or nested in a subfolder, under any folder name — no code changes needed either way.

### Option A — a dedicated repo (simplest)

GitHub Pages serves a project repo automatically at `https://<username>.github.io/<repo-name>/`. Naming the repo itself `coding-interview-prep` lands exactly on that URL:

1. Create a new empty repository on GitHub named `coding-interview-prep`. Don't add a README/gitignore from the GitHub UI — you're pushing this project's own files.
2. From inside this project folder:
   ```bash
   git init
   git add .
   git commit -m "Optimus interview prep site"
   git branch -M main
   git remote add origin https://github.com/sohagkumarsaha/coding-interview-prep.git
   git push -u origin main
   ```
3. On GitHub: repo → **Settings → Pages** → Source: **Deploy from a branch** → Branch: **main**, folder **/(root)** → **Save**.
4. Wait about a minute, then visit **https://sohagkumarsaha.github.io/coding-interview-prep/**.

### Option B — nested inside your `sohagkumarsaha.github.io` repo (what's actually deployed)

1. Clone `sohagkumarsaha.github.io` (the repo that serves your root site).
2. Copy this project's contents into a `coding-interview-prep/` folder inside it, so you end up with `sohagkumarsaha.github.io/coding-interview-prep/index.html`, `sohagkumarsaha.github.io/coding-interview-prep/css/…`, etc.
3. Commit and push to whichever branch that repo's Pages is configured to serve (usually `main`).
4. Visit **https://sohagkumarsaha.github.io/coding-interview-prep/**.

## Testing locally before you push

Opening `index.html` directly by double-clicking it will mostly work, but the most reliable match for production is a tiny local server:

```bash
cd coding-interview-prep
python3 -m http.server 8000
# then open http://localhost:8000 in your browser
```

Any modern browser (WebAssembly support required — anything from the last several years) works. There's nothing to `npm install`; CodeMirror and Pyodide load from CDNs (jsDelivr / cdnjs) at runtime.

## Project structure

```
coding-interview-prep/
├── index.html          Landing page
├── learn.html           Reference library (DSA / Blind 75 / FAANG Extended / Python Mastery / RL / system design / Q&A)
├── practice.html        Problem browser + live Python IDE
├── mock.html             Timed mock-interview mode + session history
├── css/
│   └── styles.css        Design system (light + dark theme tokens)
├── js/
│   ├── theme.js           Day/night mode toggle, persisted in localStorage
│   ├── editor.js           CodeMirror wrapper with a plain-textarea fallback
│   ├── pyodide-runner.js    Runs Python + evaluates test assertions via Pyodide
│   ├── main.js              Shared helpers (copy-to-clipboard, escaping)
│   ├── learn.js              Renders the Learn page accordions
│   ├── practice.js            Practice page logic
│   └── mock.js                 Mock interview flow, timer, history
└── data/
    ├── dsa.js             22 curated DSA problems: prompt, approach, solution, tests
    ├── blind75.js           All 75 Blind 75 problems, by category, original write-ups
    ├── faang_extra.js         26 problems covering Advanced Graphs, 2D DP, Greedy, Math & Geometry, Bit Manipulation, and FAANG staples Blind 75 skips
    ├── python_mastery.js       107 Python Q&A items (66 main + 41 follow-ups) across 9 tiers, Hello World to Google-level
    ├── rl.js               10 RL implementation problems
    ├── sysdesign.js         14 system design problems (RL/robotics-specific + classic FAANG staples)
    └── qa.js                 Rapid-fire Q&A bank
```

## Adding or editing problems

Each entry in `data/dsa.js` / `data/blind75.js` / `data/rl.js` is a plain JS object. Blind 75 entries use a `category` field (Array, Binary, Dynamic Programming, Graph, Interval, Linked List, Matrix, String, Tree, Heap — the list's own standard categories) instead of `pattern`, but are otherwise identical in shape:

```js
{
  id: "dsa-23",
  title: "Your Problem",
  pattern: "Category shown as a tag",
  prompt: "The problem statement.",
  example: "Optional worked example.",
  approach: "The reasoning to say out loud.",
  starter: "def solve():\n    pass\n",
  solution: "def solve():\n    return 42\n",
  complexity: "O(...) time, O(...) space.",
  tests: [ { call: "solve()", expected: "42" } ]
}
```

`tests[].expected` is compared against Python's `repr()` of whatever `call` evaluates to, so format expected values the way Python would print them (`'True'`, `'[0, 1]'`, `"{'a': 1}"`, and so on). RL problems that require PyTorch should be marked `torch: true` — the Practice and Mock Interview pages disable live execution for those (PyTorch isn't available in the in-browser runtime) and route straight to the reference solution instead.

## Notes on the Python runtime

Pyodide ships the standard library plus NumPy; it does **not** include PyTorch. Problems that need PyTorch (the PPO loss, REINFORCE loss, and the actor-critic network definition) are marked accordingly and are meant for reading/whiteboard practice in this tool — copy them into a local environment with `torch` installed to actually run them.

## About the Blind 75 set

`data/blind75.js` covers the full Blind 75 — the curated list originated by Yangshun Tay (see [techinterviewhandbook.org/grind75](https://www.techinterviewhandbook.org/grind75) for the author's newer, customizable successor, Grind 75). The category breakdown (Array 10, Binary 5, Dynamic Programming 11, Graph 8, Interval 5, Linked List 6, Matrix 4, String 10, Tree 14, Heap 2 net-new) matches the original list; every prompt, approach explanation, and solution here is written from scratch for this site rather than copied from LeetCode. All 75 solutions were validated end to end against real Python before shipping.

## About the FAANG Extended set

`data/faang_extra.js` fills in the highest-value gaps Blind 75 leaves open — the categories NeetCode 150 adds beyond it: Advanced Graphs (Dijkstra/Bellman-Ford variants), 2D Dynamic Programming, Greedy, Math & Geometry, deeper Bit Manipulation and Backtracking — plus a few universally-cited FAANG staples (Trapping Rain Water, Rotting Oranges, Merge Sorted Array). 26 problems, all validated the same way as Blind 75.

## About the Python Mastery tab

`data/python_mastery.js` is a Q&A-driven curriculum, not a coding-challenge set — 9 tiers running from Hello World basics through Google-level systems questions (implementing an LRU cache or a thread-safe Singleton from scratch, the GIL, descriptors, metaclasses). Every entry has a concise answer, an example where one clarifies, and short follow-up Q&As, the same way an interviewer actually probes a topic. All Python code examples were checked for valid syntax before shipping.
