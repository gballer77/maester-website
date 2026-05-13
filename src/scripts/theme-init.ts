// Inline pre-paint theme initializer.
//
// Runs synchronously inside the document <head>, before the page paints,
// so visitors never see a flash of the wrong theme. Reads the user's
// stored preference (if any) from localStorage and falls back to the
// operating system's color-scheme preference.
//
// Wired into the page by BaseLayout.astro via:
//   <script is:inline set:html={themeInitScript} />
//
// Per gspec/features/dark-mode.md §4 (P0): "Pages load in the correct
// theme with no visible flash of the wrong theme."

export const themeInitScript = `
(function () {
  try {
    var KEY = 'maester-theme';
    var stored = null;
    try { stored = localStorage.getItem(KEY); } catch (_) {}
    var prefersDark = window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme;
    if (stored === 'light' || stored === 'dark') {
      theme = stored;
    } else {
      theme = prefersDark ? 'dark' : 'light';
    }
    document.documentElement.setAttribute('data-theme', theme);
  } catch (_) {
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();
`;
