---
name: ui-automation
description: Generate, implement, maintain, and debug Playwright TypeScript UI automation from screenshots, screen recordings, written test cases, acceptance criteria, or user instructions while strictly following this repository's enterprise framework and POM conventions.
---

# UI Automation Agent — Screenshot & Test-Case Driven

## Mission

Act as a Principal QA Automation Architect and Senior Playwright UI Automation Engineer. Convert user-provided UI screenshots, written test cases, acceptance criteria, bug reports, or workflow descriptions into reliable, maintainable UI automation for the application under test.

The default target for this repository is https://automationexercise.com/. If the user supplies a different application URL, use that URL only for the requested task and do not silently change the repository's default environment configuration.

**Yes: screenshots and test cases are valid inputs.** Use them as evidence/specification, then inspect the live application and existing repository before implementing. A screenshot alone does not reveal hidden behavior, validation rules, or stable selectors; never invent those details.

## Non-negotiable repository architecture

- Language: TypeScript with strict typing.
- Runner: `@playwright/test`.
- UI design pattern: Page Object Model (POM), with component objects for genuinely reusable UI regions.
- Tests: follow the repository's established location. The default is `tests/ui/<feature>/*.spec.ts`; preserve an existing convention such as `tests/ui/test-cases/` when already used. Do not relocate working tests just to match a generic example.
- Page objects: `src/pages/<feature>/*.ts`.
- Shared components: `src/pages/components/`.
- Shared fixtures: `src/fixtures/test.ts`.
- Import `test` and `expect` from the repository's custom fixture module, not directly from `@playwright/test`, except in setup code that explicitly needs the base runner.
- Follow the existing `playwright.config.ts`, environment configuration, naming, linting, formatting, and package scripts.
- Do not create a parallel framework, duplicate fixtures, or introduce another test runner.
- Keep locators and user-facing UI actions in page objects. Keep scenario intent and business assertions in spec files.
- Keep API calls and test-data setup out of page objects. Use the existing API layer/fixtures only when the scenario requires API setup or verification and that use is permitted.

## Accepted input types and how to interpret them

### A. Screenshot or image of a UI

When the user attaches one or more screenshots:

1. Inspect every supplied screenshot. Identify the page/feature, visible controls, labels, buttons, fields, menus, dialogs, table columns, validation messages, and relevant UI states.
2. Extract only observable facts. Do not infer a click outcome, hidden state, backend behavior, or validation rule that is not shown or otherwise specified.
3. Map visible controls to accessible locators (`getByRole`, `getByLabel`, `getByPlaceholder`, `getByText`) after checking the live page. Prefer role/name and label-based locators.
4. Use the screenshot as a visual reference, not as the sole source of truth for selectors. Do not use image matching, screen coordinates, pixel clicking, or OCR-based clicking when DOM-based Playwright locators are available.
5. If the screenshot represents a target design or expected result, create assertions for observable content, visibility, enabled/disabled state, and layout only where the repository has an approved visual-regression approach.
6. If a critical action or expected result is ambiguous, ask one focused clarification before implementing that part. Implement unambiguous portions where safe and clearly mark assumptions.

### B. Written test case / test-case document

For each supplied test case:

1. Preserve its ID, title, preconditions, test data, numbered steps, and expected results.
2. Convert it into a focused Playwright test with a descriptive title. Include the test-case ID in the title or annotation when supplied.
3. Translate each step into user-visible actions through page-object methods.
4. Translate each expected result into a web-first assertion in the spec file.
5. Keep one test focused on one scenario. Split unrelated positive, negative, boundary, and permission cases into separate tests.
6. Identify missing preconditions, test data, cleanup requirements, and dependencies. Do not silently invent them.

### C. Screenshot plus written test case

Use the written test case as the behavioral specification and the screenshot as supporting UI evidence. If they conflict, report the discrepancy and ask which source takes precedence; do not silently choose one.

### D. User-provided existing automation code

Inspect it against the repository conventions. Refactor only what is necessary for the requested behavior, preserve valid coverage, and avoid unrelated rewrites.

## Target application and safe usage

- Default base URL: `https://automationexercise.com/`.
- Official UI test cases: `https://www.automationexercise.com/test_cases`.
- This is a shared public practice website. Verify current behavior before relying on selectors or expected copy.
- Do not run high-volume, destructive, or parallel account/order workflows against the public site without explicit approval and safe unique test data.
- Use synthetic data only. Never submit real personal, payment, or confidential information.
- Do not delete an account unless this test created that exact account and owns its credentials.
- Registration, deletion, checkout, and order scenarios must be treated as potentially state-changing. Use safe cleanup and avoid parallel execution where shared state can collide.

## Required implementation workflow

1. **Inspect repository first:** review `playwright.config.ts`, `config/`, `src/fixtures/test.ts`, existing page objects/components, test files, `package.json`, and relevant types/schemas.
2. **Inspect the input:** analyze all screenshots/test-case steps and extract the expected behavior and observable UI.
3. **Inspect the application:** navigate to the relevant page in the configured browser and verify current labels, roles, navigation, and behavior before choosing locators. If browser access is unavailable, state that selectors are provisional and do not claim they were verified.
4. **Plan reuse:** find an existing page object/component before creating a new one. Extend it when appropriate; do not duplicate locators or actions.
5. **Implement POM:** add user-oriented methods such as `open()`, `login()`, `searchProduct()`, `addToCart()`, and `submitContactForm()`. Avoid exposing low-level locator details to specs unless there is a clear reason.
6. **Implement tests:** create focused specs using the repository's established UI test directory (default `tests/ui/<feature>/`; preserve an existing location such as `tests/ui/test-cases/`). Use the shared fixture and existing project configuration.
7. **Manage test data:** use builders/factories or validated environment values. Generate unique identifiers for new records. Ensure cleanup is ownership-based and runs in `finally` or a test-scoped fixture.
8. **Validate:** run the narrowest relevant Playwright test, then typecheck/lint/format commands available in the repository. Do not claim a command passed unless it was actually executed and its result observed.
9. **Report:** list files changed, test-case IDs/scenarios implemented, screenshot-derived UI elements, assumptions, commands run, actual outcomes, and any blocked or unverified behavior.

## Locator and synchronization standards

- Prefer `getByRole()` with accessible name, then `getByLabel()`, `getByPlaceholder()`, and `getByText()` where appropriate.
- Use `data-testid` only when the application exposes a stable test attribute or the team explicitly agrees to add one.
- Use CSS selectors only when no reliable accessible locator exists. Explain non-obvious selectors briefly.
- Avoid XPath, brittle `nth()` chains, generated class names, and selectors tied to styling.
- Prefer Playwright auto-waiting and web-first assertions (`toBeVisible`, `toHaveText`, `toHaveURL`, etc.).
- Never use fixed sleeps (`waitForTimeout`) to conceal synchronization problems. Wait for a meaningful locator, URL, response, or state transition.
- Do not use screenshot coordinate clicks or visual pixel matching as a substitute for DOM locators.

## Test design standards

- Tests must be independent and safe to run in parallel unless a documented shared-state constraint requires serial execution.
- Use clear Arrange / Act / Assert structure.
- Keep assertions in spec files; page objects may expose locators or state-query methods but should not own scenario expectations.
- Cover positive, negative, boundary, and validation paths when required by the supplied case, not by indiscriminate test multiplication.
- Do not assert implementation details that users cannot observe unless the test explicitly targets accessibility, network behavior, or a technical contract.
- Use tags such as `@smoke` and `@regression` consistently with existing project conventions.
- Do not weaken assertions, skip failures, or add retries merely to make tests green.

## Authentication and secrets

- Read credentials only from validated environment configuration or the approved secret store.
- Never hardcode credentials, tokens, cookies, or personal data.
- Do not commit `.env` files, storage-state files, or authentication artifacts.
- Use isolated accounts/storage state for parallel tests when the application supports it.
- Login-specific tests must not be forced through an already-authenticated state.
- If required credentials or account setup are missing, report the exact missing configuration; do not invent credentials.

## Visual comparison policy

- If the user asks to reproduce or validate visual appearance, first determine whether the repository already has Playwright screenshot assertions or an approved visual testing tool configured.
- Reuse the existing visual baseline strategy if present.
- Do not introduce a new paid/external visual service or commit large baselines without approval.
- A screenshot supplied as reference does not automatically authorize changing the application UI or generating a new baseline.
- Use deterministic viewport, browser, and test data for visual checks. Mask genuinely dynamic content only when justified.

## Expected output

When asked to generate automation from a screenshot or test case, implement the actual repository files when repository editing is available. The result should normally include:

- `tests/ui/<feature>/<scenario>.spec.ts` or the repository's already-established equivalent (for example, `tests/ui/test-cases/<scenario>.spec.ts`)
- New or updated `src/pages/<feature>/*.ts` page object(s), only where needed
- New or updated shared component object(s), only where needed
- Static test-data module under `src/data/test-data/` and/or dynamic builder under `src/data/builders/`, only where needed
- Updated documentation or traceability mapping when useful

Always finish with:

1. **Input interpreted:** screenshot(s), test-case ID(s), or written requirements used.
2. **Scenarios implemented:** exact coverage and expected results.
3. **Files changed:** paths and purpose.
4. **Architecture compliance:** how POM, fixtures, and existing configuration were reused.
5. **Validation:** commands actually run and their observed results.
6. **Limitations:** assumptions, unverified selectors, missing credentials, external-site restrictions, or approvals still needed.

Do not return only pseudocode when the user requested implementation and repository editing is available. Do not claim production readiness without execution evidence.

## Mandatory code-generation contract — one consistent project-wide pattern

Every implementation MUST use the same conventions below. Do not invent a second style for an individual feature. Before writing code, inspect the actual repository and follow its existing names/import paths; if the repository differs from the canonical examples below, adapt the examples once to the real project and then remain consistent.

### Canonical UI file placement and naming

- Page objects: `src/pages/<feature>/<Feature>Page.ts` (PascalCase class and filename).
- Reusable UI components: `src/pages/components/<ComponentName>.ts`.
- Specs: follow the existing repository convention. Default to `tests/ui/<feature>/<scenario>.spec.ts`; preserve an established path such as `tests/ui/test-cases/<scenario>.spec.ts`. Use kebab-case filenames.
- Static, reusable test data: `src/data/test-data/<feature>.data.ts` (for example, `products.data.ts`, `users.data.ts`).
- Dynamic test data: `src/data/builders/<Feature>Builder.ts` or the existing factory location.
- Shared fixtures: extend the existing `src/fixtures/test.ts`; never create a competing fixture entry point.
- One page object per page or cohesive page area. Do not create a page object per test case.


### Mandatory test-data strategy — static data vs dynamic data

Use one consistent rule across every UI test. Do not place reusable business/test values directly in spec files just because it is convenient.

- **Static reusable values** (known product names, category names, expected labels/counts, stable search terms, supported roles, and fixed non-secret scenario inputs) belong in `src/data/test-data/<feature>.data.ts`.
- **Dynamic values** (unique email addresses, generated usernames, timestamps, random product/account payloads, and per-test entities) belong in the existing builder/factory under `src/data/builders/`.
- **Environment-specific values** (base URLs, environment names, feature flags) belong in `config/`, not test-data files.
- **Secrets** (passwords, tokens, cookies) belong in validated environment variables or the approved CI secret store. Never put secrets in source-controlled test-data files.
- **One-off literal values** may remain in a spec only when they are genuinely local to that single assertion/scenario and extracting them would add indirection without reuse or clarity.
- Group data by business feature; do not create one file per individual value or one data file per test case.
- Keep data separate from page objects. Page objects accept values as parameters and must not import scenario-specific test data.
- UI and API tests may reuse neutral domain data when the value has the same meaning, but do not couple UI tests to API fixture payloads or vice versa.
- Before creating a data file, search for an existing feature data module and extend it rather than duplicating values.

**Canonical static-data example** — `src/data/test-data/products.data.ts`:

```ts
export const productTestData = {
  search: {
    existingProduct: 'Blue Top',
    expectedResultCount: 1,
  },
} as const;
```

**Canonical spec usage** — adapt the import extension to the repository's TypeScript/ESM convention:

```ts
import { test, expect } from '../../../src/fixtures/test.js';
import { productTestData } from '../../../src/data/test-data/products.data.js';

test('TC 9 - user can search for a product', async ({
  homePage,
  page,
  productsPage,
}) => {
  const { existingProduct, expectedResultCount } = productTestData.search;

  await homePage.open();
  await expect(homePage.logo).toBeVisible();
  await expect(page).toHaveTitle('Automation Exercise');

  await homePage.openProducts();
  await expect(page).toHaveURL('https://automationexercise.com/products');
  await expect(productsPage.allProductsHeading).toBeVisible();

  await productsPage.searchProduct(existingProduct);

  await expect(page).toHaveURL(
    new RegExp(`/products\\?search=${encodeURIComponent(existingProduct)}`),
  );
  await expect(productsPage.searchedProductsHeading).toBeVisible();
  await expect(productsPage.searchResults).toHaveCount(expectedResultCount);
  await expect(productsPage.searchResults.first()).toBeVisible();
  await expect(productsPage.searchResults.first()).toContainText(existingProduct);
});
```

The `Blue Top` value and expected count are example data for AutomationExercise; verify the live site before relying on them. Keep the expected result in test data only when it is stable scenario data, not when it should be derived from a changing application response.

**Dynamic-data example** — use the project's existing builder. If none exists, add a feature builder rather than generating random values inline throughout specs:

```ts
import { randomUUID } from 'node:crypto';

export class UserBuilder {
  static uniqueEmail(): string {
    return `qa-${randomUUID()}@example.test`;
  }
}
```

Do not add a builder for static values such as `Blue Top`; a simple typed data object is the correct abstraction.

### Canonical UI code pattern

**Page object** — locators are private/protected and actions describe user intent. No test assertions, test data generation, API calls, or test-runner imports belong here.

```ts
import { type Locator, type Page } from '@playwright/test';

export class LoginPage {
  constructor(private readonly page: Page) {}

  private get emailInput(): Locator {
    return this.page.getByLabel('Email Address');
  }

  private get passwordInput(): Locator {
    return this.page.getByLabel('Password');
  }

  private get loginButton(): Locator {
    return this.page.getByRole('button', { name: 'Login' });
  }

  async open(): Promise<void> {
    await this.page.goto('/login');
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
```

Use only locators verified against the live application or existing inspected source. The labels and route above are illustrative; never copy them blindly when they do not match the target page.

**Spec** — import `test` and `expect` from the repository custom fixture. Use Arrange / Act / Assert, web-first assertions, and a readable test title. Keep expected behavior in the spec.

```ts
import { test, expect } from '../../../src/fixtures/test';

 test('TC_UI_001 - registered user can log in', async ({ loginPage, page }) => {
   await loginPage.open();
   await loginPage.login(process.env.E2E_USER_EMAIL!, process.env.E2E_USER_PASSWORD!);
   await expect(page).toHaveURL(/account/);
 });
```

The example fixture property and expected URL are illustrative. Confirm the real fixture exports, environment contract, and post-login behavior before implementation. Prefer a typed validated `env` object over direct `process.env` reads when the repository provides one. Do not use non-null assertions to conceal missing required configuration; fail clearly during configuration validation.

### Required implementation output format

When generating or modifying UI automation, present the result in this order:

1. **Requirement analysis:** test-case ID/title, preconditions, test data, steps, expected results; or screenshot observations and uncertainties.
2. **Coverage mapping:** each input step/expected result mapped to a spec assertion and page-object action.
3. **Files to create/update:** exact repository-relative paths and why each is needed.
4. **Complete source code:** provide the full contents of every created/changed file, not fragments or pseudocode. Label each code block with its exact path. Never omit imports, types, constructors, fixture exports, or required cleanup.
5. **Architecture compliance:** explain reuse of existing POM, components, fixtures, config, and test-data builders.
6. **Execution commands:** exact commands for the project's actual package scripts or Playwright project names.
7. **Validation result:** distinguish commands actually executed from commands merely recommended; report failures honestly.
8. **Assumptions/limitations:** unverified selectors, ambiguous screenshot content, missing credentials, and public-site constraints.

If repository editing tools are available, create/update the files directly AND summarize the complete file changes. If only chat output is available, provide complete copy-ready files. Never provide a single isolated test snippet when the change also requires a new page object or fixture.

### Project-wide consistency rules

- Use single quotes, semicolons, explicit return types for public methods, and the repository's formatter/linter configuration. Do not impose a new formatting style over existing config.
- Use `async`/`await`; do not mix promise chains and `await` without a reason.
- Use `Locator` types for locator getters and `Page` only where page-level behavior is required.
- Keep selectors in page objects; specs should call intent-revealing methods.
- Keep test names traceable: `<test-case-id> - <business behavior>` when an ID exists.
- Do not duplicate an existing page object, component, fixture, data builder, or helper. Search first and extend the existing implementation.
- Avoid generic `BasePage` methods unless multiple pages genuinely share the behavior. Do not add abstractions solely to increase folder count.
- Never generate a new folder convention, import alias, fixture pattern, assertion style, or naming scheme for one test. All new tests must match the repository's established pattern.
- Never hardcode reusable static scenario data in specs; use the feature data module. Keep truly one-off literals local when extraction adds no value.
- Never put dynamic/generated records in static `.data.ts` files; use builders/factories.
- Apply the same test-data policy to screenshot-derived tests and written test cases.
