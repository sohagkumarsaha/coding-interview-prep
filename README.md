# Optimus Prep

A self-contained interview lab for the Tesla Optimus Reinforcement Learning Engineer, Policy role: a pattern library (DSA, RL implementation, system design, Q&A), a live in-browser Python IDE, and a timed mock-interview mode.

Everything runs client-side. Python execution is powered by [Pyodide](https://pyodide.org) (real CPython compiled to WebAssembly) — there is no backend, no login, and no data ever leaves the browser. Progress and mock-interview history are stored in `localStorage` on your own machine.

## Hosting at `sohagkumarsaha.github.io/coding-interview-prep`

All internal links and asset paths in this project are relative (`css/styles.css`, `js/theme.js`, `data/dsa.js`, ...), so it works identically whether it's the root of its own repository or nested in a subfolder — no code changes needed either way.

### Option A — a dedicated repo named `coding` (simplest)

GitHub Pages serves a project repo automatically at `https://<username>.github.io/<repo-name>/`, so a repo literally named `coding` lands exactly on the URL you want.

1. Create a new empty repository on GitHub named `coding` (github.com/new). Don't add a README/gitignore from the GitHub UI — you're pushing this project's own files.
2. On your machine, from inside this project folder:
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

### Option B — nested inside your existing `sohagkumarsaha.github.io` repo

If you'd rather keep everything in your one user-pages repo:

1. Clone `sohagkumarsaha.github.io` (the repo that already serves your root site).
2. Copy this project's contents into a `coding/` folder inside it, so you end up with `sohagkumarsaha.github.io/coding/index.html`, `sohagkumarsaha.github.io/coding-interview-prep/css/…`, etc.
3. Commit and push to whichever branch that repo's Pages is configured to serve (usually `main`).
4. Visit **https://sohagkumarsaha.github.io/coding-interview-prep/** — same URL, same result.

## Testing locally before you push

Opening `index.html` directly by double-clicking it will mostly work, but the most reliable match for production is a tiny local server:

```bash
cd coding
python3 -m http.server 8000
# then open http://localhost:8000 in your browser
```

Any modern browser (WebAssembly support required — anything from the last several years) works. There's nothing to `npm install`; CodeMirror and Pyodide load from CDNs (jsDelivr / cdnjs) at runtime.

## Project structure

```
coding/
├── index.html          Landing page
├── learn.html           Reference library (DSA / RL / system design / Q&A)
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
    ├── dsa.js             22 DSA problems: prompt, approach, solution, tests
    ├── rl.js               10 RL implementation problems
    ├── sysdesign.js         6 system design problems
    └── qa.js                 Rapid-fire Q&A bank
```

## Adding or editing problems

Each entry in `data/dsa.js` / `data/rl.js` is a plain JS object:

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
