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
function renderCodeBlock(code) {
  const escaped = code.replace(/&/g, "&amp;").replace(/</g, "&lt;");
  return '<div class="code-block"><button class="copy-btn" type="button">Copy</button><pre>' + escaped + "</pre></div>";
}

function escapeHtml(str) {
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
