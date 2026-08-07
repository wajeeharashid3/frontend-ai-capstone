# Claude Project Rules

## Stack

- HTML
- CSS
- JavaScript
- Node.js

## Coding Style

- Use ES6 syntax
- Write clean code
- Explain major changes
- Follow Conventional Commits

## Git

Commit often.

Use descriptive commit messages.

Always ask before deleting files.
## FE-04 Project Rules

1. **Validate settings before saving:** The settings form must validate required fields and email format before writing settings to storage. Invalid submissions must not be saved.

2. **Keep validation testable:** Form validation logic should be separated into reusable functions such as `validateFormData()` so it can be tested independently from browser DOM code.

3. **Test settings behavior before committing:** Changes to the settings form must include automated tests for required fields, email validation, default values, form controls, and accessibility-related requirements. Run the tests before committing.

4. **Avoid duplicated event handlers:** Each settings action, such as reset and theme changes, should have one event handler. Do not register the same event listener more than once.

5. **Preserve keyboard accessibility:** All settings controls must remain reachable with normal keyboard navigation and must not use unnecessary `tabindex="-1"` values.
