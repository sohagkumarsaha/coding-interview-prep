// Shared, page-agnostic behavior.
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-year]").forEach((el) => { el.textContent = new Date().getFullYear(); });

  // Delegate copy-to-clipboard for any .code-block .copy-btn
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".copy-btn");
    if (!btn) return;
    const block = btn.closest(".code-block");
    const codeEl = block && block.querySelector("pre");
    if (!codeEl) return;
    navigator.clipboard.writeText(codeEl.textContent).then(() => {
      const original = btn.textContent;
      btn.textContent = "Copied";
      setTimeout(() => { btn.textContent = original; }, 1400);
    });
  });
});

// Helper to build a code block with a copy button, used by learn.js / practice.js / mock.js
// Wrapped in <code class="language-python"> so Prism.js can tokenize it for syntax highlighting.
function renderCodeBlock(code) {
  const escaped = code.replace(/&/g, "&amp;").replace(/</g, "&lt;");
  return '<div class="code-block"><button class="copy-btn" type="button">Copy</button><pre><code class="language-python">' + escaped + "</code></pre></div>";
}

function escapeHtml(str) {
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Call after inserting any new renderCodeBlock() output into the DOM.
// Safe no-op if Prism hasn't loaded (e.g. a slow CDN) — code still shows as plain text.
function highlightCode(container) {
  if (typeof Prism !== "undefined") {
    Prism.highlightAllUnder(container || document);
  }
}
