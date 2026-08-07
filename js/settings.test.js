import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import assert from "node:assert/strict";

import {
  DEFAULT_SETTINGS,
  VALIDATION_MESSAGES,
  isValidEmail,
  validateFormData,
} from "./settings.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const settingsHtml = readFileSync(join(__dirname, "..", "settings.html"), "utf8");

const validData = {
  displayName: "Wajeeha",
  email: "wajeeha@example.com",
  theme: "light",
  language: "en",
  timezone: "UTC",
  emailNotifications: true,
  pushNotifications: false,
  weeklyDigest: true,
  profileVisibility: "public",
};

test("validateFormData rejects empty display name", () => {
  const result = validateFormData({ ...validData, displayName: "" });
  assert.equal(result.isValid, false);
  assert.equal(result.errors.displayName, VALIDATION_MESSAGES.displayNameRequired);
});

test("validateFormData rejects whitespace-only display name", () => {
  const result = validateFormData({ ...validData, displayName: "   " });
  assert.equal(result.isValid, false);
  assert.equal(result.errors.displayName, VALIDATION_MESSAGES.displayNameRequired);
});

test("validateFormData rejects empty email", () => {
  const result = validateFormData({ ...validData, email: "" });
  assert.equal(result.isValid, false);
  assert.equal(result.errors.email, VALIDATION_MESSAGES.emailRequired);
});

test("validateFormData rejects invalid email format", () => {
  const result = validateFormData({ ...validData, email: "hello" });
  assert.equal(result.isValid, false);
  assert.equal(result.errors.email, VALIDATION_MESSAGES.emailInvalid);
});

test("validateFormData accepts valid name and email", () => {
  const result = validateFormData(validData);
  assert.equal(result.isValid, true);
  assert.deepEqual(result.errors, {});
});

test("isValidEmail validates common email formats", () => {
  assert.equal(isValidEmail("user@example.com"), true);
  assert.equal(isValidEmail("hello"), false);
  assert.equal(isValidEmail(""), false);
});

test("DEFAULT_SETTINGS contains expected default values", () => {
  assert.deepEqual(DEFAULT_SETTINGS, {
    displayName: "",
    email: "",
    theme: "light",
    language: "en",
    timezone: "UTC",
    emailNotifications: true,
    pushNotifications: false,
    weeklyDigest: true,
    profileVisibility: "public",
  });
});

test("settings.html includes all required form controls", () => {
  const requiredFields = [
    "displayName",
    "email",
    "profileVisibility",
    "theme",
    "language",
    "timezone",
    "emailNotifications",
    "pushNotifications",
    "weeklyDigest",
  ];

  requiredFields.forEach((name) => {
    assert.match(settingsHtml, new RegExp(`name="${name}"`));
  });
});

test("settings.html provides accessible labels for every control", () => {
  assert.match(settingsHtml, /for="displayName"/);
  assert.match(settingsHtml, /for="email"/);
  assert.match(settingsHtml, /for="profileVisibility"/);
  assert.match(settingsHtml, /for="theme"/);
  assert.match(settingsHtml, /for="language"/);
  assert.match(settingsHtml, /for="timezone"/);
  assert.match(settingsHtml, /id="emailNotifications-label"/);
  assert.match(settingsHtml, /id="pushNotifications-label"/);
  assert.match(settingsHtml, /id="weeklyDigest-label"/);
  assert.match(settingsHtml, /aria-labelledby="emailNotifications-label"/);
  assert.match(settingsHtml, /aria-labelledby="pushNotifications-label"/);
  assert.match(settingsHtml, /aria-labelledby="weeklyDigest-label"/);
});

test("settings.html supports keyboard navigation with native focusable controls", () => {
  assert.match(settingsHtml, /type="submit"/);
  assert.match(settingsHtml, /id="reset-btn"/);
  assert.doesNotMatch(settingsHtml, /tabindex="-1"/);
});

test("settings.html marks required fields for assistive technology", () => {
  assert.match(settingsHtml, /name="displayName"[\s\S]*?aria-required="true"/);
  assert.match(settingsHtml, /name="email"[\s\S]*?aria-required="true"/);
});
