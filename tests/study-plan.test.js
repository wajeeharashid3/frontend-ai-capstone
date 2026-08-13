import test from "node:test";
import assert from "node:assert/strict";

function validateStudyPlanInput({ goal, deadline, hours }) {
if (!goal || !deadline || hours === undefined || hours === null || hours === "") {    return "Please provide a goal, deadline, and available study hours.";
  }

  if (Number(hours) < 1 || Number(hours) > 12) {
    return "Study hours must be between 1 and 12.";
  }

  return null;
}

test("accepts valid study planner input", () => {
  const result = validateStudyPlanInput({
    goal: "Biology exam",
    deadline: "2026-08-27",
    hours: 2,
  });

  assert.equal(result, null);
});

test("rejects missing study goal", () => {
  const result = validateStudyPlanInput({
    goal: "",
    deadline: "2026-08-27",
    hours: 2,
  });

  assert.equal(
    result,
    "Please provide a goal, deadline, and available study hours."
  );
});

test("rejects missing deadline", () => {
  const result = validateStudyPlanInput({
    goal: "Biology exam",
    deadline: "",
    hours: 2,
  });

  assert.equal(
    result,
    "Please provide a goal, deadline, and available study hours."
  );
});

test("rejects zero study hours", () => {
  const result = validateStudyPlanInput({
    goal: "Biology exam",
    deadline: "2026-08-27",
    hours: 0,
  });

  assert.equal(result, "Study hours must be between 1 and 12.");
});

test("rejects more than twelve study hours", () => {
  const result = validateStudyPlanInput({
    goal: "Biology exam",
    deadline: "2026-08-27",
    hours: 13,
  });

  assert.equal(result, "Study hours must be between 1 and 12.");
});