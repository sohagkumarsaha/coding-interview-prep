// Editor: wraps CodeMirror 5 (Python mode) when available, falling back to a
// plain <textarea> if the CDN script did not load, so the IDE never breaks.
const OptimusEditor = {
  create(container, initialCode) {
    container.innerHTML = "";
    if (typeof CodeMirror !== "undefined") {
      const cm = CodeMirror(container, {
        value: initialCode || "",
        mode: "python",
        theme: document.documentElement.getAttribute("data-theme") === "dark" ? "material-darker" : "default",
        lineNumbers: true,
        indentUnit: 4,
        tabSize: 4,
        indentWithTabs: false,
        viewportMargin: Infinity,
        extraKeys: { Tab: (cm) => cm.replaceSelection("    ", "end") },
      });
      const applyTheme = () => {
        cm.setOption("theme", document.documentElement.getAttribute("data-theme") === "dark" ? "material-darker" : "default");
      };
      document.querySelectorAll(".theme-toggle").forEach((btn) => btn.addEventListener("click", () => setTimeout(applyTheme, 0)));
      return {
        getValue: () => cm.getValue(),
        setValue: (code) => cm.setValue(code || ""),
        focus: () => cm.focus(),
        refresh: () => cm.refresh(),
      };
    }
    // Fallback: plain textarea
    const ta = document.createElement("textarea");
    ta.className = "plain-editor";
    ta.spellcheck = false;
    ta.value = initialCode || "";
    ta.addEventListener("keydown", (e) => {
      if (e.key === "Tab") {
        e.preventDefault();
        const start = ta.selectionStart, end = ta.selectionEnd;
        ta.value = ta.value.slice(0, start) + "    " + ta.value.slice(end);
        ta.selectionStart = ta.selectionEnd = start + 4;
      }
    });
    container.appendChild(ta);
    return {
      getValue: () => ta.value,
      setValue: (code) => { ta.value = code || ""; },
      focus: () => ta.focus(),
      refresh: () => {},
    };
  },
};
