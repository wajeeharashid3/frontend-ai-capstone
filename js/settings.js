const STORAGE_KEY = "studyflow-settings";

export const DEFAULT_SETTINGS = {
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

export const VALIDATION_MESSAGES = {
  displayNameRequired: "Display name is required.",
  displayNameTooLong: "Display name must be 50 characters or fewer.",
  emailRequired: "Email is required.",
  emailInvalid: "Please enter a valid email address.",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email) {
  return EMAIL_PATTERN.test(email);
}

export function validateFormData(data) {
  const errors = {};
  const displayName = data.displayName.trim();
  const email = data.email.trim();

  if (!displayName) {
    errors.displayName = VALIDATION_MESSAGES.displayNameRequired;
  } else if (displayName.length > 50) {
    errors.displayName = VALIDATION_MESSAGES.displayNameTooLong;
  }

  if (!email) {
    errors.email = VALIDATION_MESSAGES.emailRequired;
  } else if (!isValidEmail(email)) {
    errors.email = VALIDATION_MESSAGES.emailInvalid;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

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

function initSettingsForm() {
  const form = document.getElementById("settings-form");
  const statusEl = document.getElementById("form-status");
  const resetBtn = document.getElementById("reset-btn");

  if (!form || !statusEl || !resetBtn) {
    return;
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

  function showStatus(message, type = "success") {
    statusEl.textContent = message;
    statusEl.className = `form-status form-status--${type}`;
  }

  function clearFieldErrors() {
    form.querySelectorAll(".field__input--error").forEach((el) => {
      el.classList.remove("field__input--error");
      el.removeAttribute("aria-invalid");
      el.removeAttribute("aria-describedby");
    });
    form.querySelectorAll(".field__error").forEach((el) => {
      el.textContent = "";
    });
  }

  function setFieldError(fieldName, message) {
    const input = form.elements[fieldName];
    const errorEl = form.querySelector(`[data-error-for="${fieldName}"]`);

    input.classList.add("field__input--error");
    input.setAttribute("aria-invalid", "true");
    if (errorEl) {
      input.setAttribute("aria-describedby", errorEl.id || `error-${fieldName}`);
      errorEl.textContent = message;
    }
  }

  function applyValidationErrors(errors) {
    clearFieldErrors();
    Object.entries(errors).forEach(([fieldName, message]) => {
      setFieldError(fieldName, message);
    });
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = getFormData();
    const result = validateFormData(data);

    if (!result.isValid) {
      applyValidationErrors(result.errors);
      showStatus("Please fix the errors above.", "error");
      const firstInvalid = form.querySelector(".field__input--error");
      firstInvalid?.focus();
      return;
    }

    clearFieldErrors();
    saveSettings(data);
    applyTheme(data.theme);
    showStatus("Settings saved successfully.");
  });

  resetBtn.addEventListener("click", () => {
    populateForm({ ...DEFAULT_SETTINGS });
    clearFieldErrors();
    saveSettings({ ...DEFAULT_SETTINGS });
    applyTheme(DEFAULT_SETTINGS.theme);
    showStatus("Settings reset to defaults.");
  });

  form.theme.addEventListener("change", () => {
    applyTheme(form.theme.value);
  });

  populateForm(loadSettings());
}

if (typeof document !== "undefined") {
  initSettingsForm();
}
