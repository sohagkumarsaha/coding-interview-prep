// Theme: persisted in localStorage, falls back to OS preference on first visit.
(function () {
  const STORAGE_KEY = "optimus-prep-theme";

  function getInitialTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_KEY, theme);
    document.querySelectorAll(".theme-toggle").forEach((btn) => {
      btn.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
      btn.setAttribute("aria-label", theme === "dark" ? "Switch to day mode" : "Switch to night mode");
    });
  }

  // Apply immediately (before paint) to avoid a flash of the wrong theme.
  applyTheme(getInitialTheme());

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".theme-toggle").forEach((btn) => {
      btn.addEventListener("click", () => {
        const current = document.documentElement.getAttribute("data-theme");
        applyTheme(current === "dark" ? "light" : "dark");
      });
    });

    // Mobile nav toggle
    const menuBtn = document.querySelector(".menu-btn");
    const navLinks = document.querySelector(".nav-links");
    if (menuBtn && navLinks) {
      menuBtn.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("mobile-open");
        menuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
      });
    }
  });
})();
