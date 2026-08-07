const STORAGE_KEY = "app-settings";

function applySavedTheme() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return;

    const { theme } = JSON.parse(stored);
    document.body.dataset.theme = theme === "dark" ? "dark" : "";
  } catch {
    /* ignore invalid stored settings */
  }
}

applySavedTheme();
