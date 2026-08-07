const STORAGE_KEY = "app-settings";

const DEFAULT_SETTINGS = {
  displayName: "",
  email: "",
  theme: "light",
  language: "en",
  timezone: "UTC",
  emailNotifications: true,
  pushNotifications: false,
  weeklyDigest: true,
  profileVisibility: "public",
};

const form = document.getElementById("settings-form");
const statusEl = document.getElementById("form-status");
const resetBtn = document.getElementById("reset-btn");

function loadSettings() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? { ...DEFAULT_SETTINGS, ...JSON.parse(stored) } : { ...DEFAULT_SETTINGS };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

function saveSettings(settings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

function applyTheme(theme) {
  document.body.dataset.theme = theme === "dark" ? "dark" : "";
}

function populateForm(settings) {
  form.displayName.value = settings.displayName;
  form.email.value = settings.email;
  form.theme.value = settings.theme;
  form.language.value = settings.language;
  form.timezone.value = settings.timezone;
  form.emailNotifications.checked = settings.emailNotifications;
  form.pushNotifications.checked = settings.pushNotifications;
  form.weeklyDigest.checked = settings.weeklyDigest;
  form.profileVisibility.value = settings.profileVisibility;

  applyTheme(settings.theme);
}

function getFormData() {
  return {
    displayName: form.displayName.value.trim(),
    email: form.email.value.trim(),
    theme: form.theme.value,
    language: form.language.value,
    timezone: form.timezone.value,
    emailNotifications: form.emailNotifications.checked,
    pushNotifications: form.pushNotifications.checked,
    weeklyDigest: form.weeklyDigest.checked,
    profileVisibility: form.profileVisibility.value,
  };
}

function validateEmail(email) {
  if (!email) return true;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showStatus(message, type = "success") {
  statusEl.textContent = message;
  statusEl.className = `form-status form-status--${type}`;
}

function clearFieldErrors() {
  form.querySelectorAll(".field__input--error").forEach((el) => {
    el.classList.remove("field__input--error");
  });
  form.querySelectorAll(".field__error").forEach((el) => {
    el.textContent = "";
  });
}

function setFieldError(fieldName, message) {
  const input = form.elements[fieldName];
  const errorEl = form.querySelector(`[data-error-for="${fieldName}"]`);
  input.classList.add("field__input--error");
  if (errorEl) errorEl.textContent = message;
}

function validateForm(data) {
  clearFieldErrors();
  let isValid = true;

  if (data.displayName.length > 50) {
    setFieldError("displayName", "Display name must be 50 characters or fewer.");
    isValid = false;
  }

  if (!validateEmail(data.email)) {
    setFieldError("email", "Please enter a valid email address.");
    isValid = false;
  }

  return isValid;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = getFormData();

  if (!validateForm(data)) {
    showStatus("Please fix the errors above.", "error");
    return;
  }

  saveSettings(data);
  applyTheme(data.theme);
  showStatus("Settings saved successfully.");
});

resetBtn.addEventListener("click", () => {
  populateForm(DEFAULT_SETTINGS);
  saveSettings(DEFAULT_SETTINGS);
  showStatus("Settings reset to defaults.");
});

form.theme.addEventListener("change", () => {
  applyTheme(form.theme.value);
});

const settings = loadSettings();
populateForm(settings);
