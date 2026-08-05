# Optimus Prep

**Live at [sohagkumarsaha.github.io/coding-interview-prep](https://sohagkumarsaha.github.io/coding-interview-prep/)**

A self-contained interview lab for the Tesla Optimus Reinforcement Learning Engineer, Policy role: a pattern library (DSA, the complete Blind 75, RL implementation, system design, Q&A), a live in-browser Python IDE, and a timed mock-interview mode.

Everything runs client-side. Python execution is powered by [Pyodide](https://pyodide.org) (real CPython compiled to WebAssembly) — there is no backend, no login, and no data ever leaves the browser. Progress and mock-interview history are stored in `localStorage` on your own machine.

## Hosting at `sohagkumarsaha.github.io/coding`

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

1. Clone `sohagkumarsaha.github.io` (the repo that already serves your root site).
2. Copy this project's contents into a `coding/` folder inside it, so you end up with `sohagkumarsaha.github.io/coding/index.html`, `sohagkumarsaha.github.io/coding/css/…`, etc.
3. Commit and push to whichever branch that repo's Pages is configured to serve (usually `main`).
4. Visit **https://sohagkumarsaha.github.io/coding/** — same URL, same result.

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
├── learn.html           Reference library (DSA / Blind 75 / RL / system design / Q&A)
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
    ├── rl.js               10 RL implementation problems
    ├── sysdesign.js         6 system design problems
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
