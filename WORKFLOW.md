# FE-04 Workflow Comparison

## Feature

The feature used for this comparison was the StudyFlow AI settings form. I built it twice from independent Git branches to compare a vague AI workflow with a specification-driven workflow.

## Round 1: Vague Prompt

Round 1 used a single vague prompt to create the settings form. The result was functional and included profile settings, preferences, notifications, email validation, saving, resetting, and keyboard navigation. Manual testing showed that valid information could be saved and invalid email input produced an error.

However, Round 1 required more review and fixing from me. There was no dedicated test file, so verification depended mainly on manual testing. The implementation also contained duplicated event-handler logic in `js/settings.js`, including repeated reset and theme-change handlers. I identified this AI-generated duplication while comparing the implementations.

## Round 2: Specification + Verification

Round 2 used a detailed prompt with file references, required fields, validation rules, accessibility requirements, example behavior, constraints, and an explicit verification step. The implementation separated validation into functions such as `validateFormData()` and `isValidEmail()` and added `js/settings.test.js`.

The branch comparison shows substantial changes to `js/settings.js` and the addition of 121 lines of tests. The automated suite contained 11 tests covering required fields, email validation, defaults, required controls, accessible labels, and keyboard-related markup. Running `node --test js/settings.test.js` produced 11 passing tests and 0 failures. Manual testing also confirmed successful submission, reset behavior, invalid-email validation, and keyboard navigation.

## Comparison

Round 2 required more upfront prompting, but Round 1 required more review and fixing overall. The detailed workflow produced clearer validation logic and automated verification, making correctness easier to check. It also made edge cases and accessibility requirements explicit instead of leaving them entirely to the model.

The comparison shows that AI output quality depends heavily on the workflow used to direct and verify it. The vague prompt was faster to write, but the specification-driven approach produced stronger evidence and reduced uncertainty during review. For future StudyFlow AI work, I will use file references, explicit constraints, examples, and a verification step instead of relying on a broad implementation request.
