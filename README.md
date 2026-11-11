# Reusable Playwright Hybrid Framework — Enterprise Starter

TypeScript + Playwright Test for UI, API, contract, and hybrid tests in one repository.

## Important
This is a **template**, not a working test suite against a live product. Example URLs, `/health`, `/v1/users`, selectors and credentials must be adapted to your system. Tests intentionally fail when an app/endpoint is not available.

## Start

```bash
npm install
npx playwright install
cp .env.example .env.staging
# Edit .env.staging and provide real test app URLs/credentials.
TEST_ENV=staging npm run test:api
```

Windows PowerShell: `$env:TEST_ENV='staging'; npm run test:api`.

## Layout
- `config`: typed environment validation and centralized production mutation policy.
- `src/pages`: POM, feature-specific page objects, shared UI components.
- `src/api`: API transport, feature controllers, models and Zod response schemas.
- `src/fixtures`: lazily injected page objects, API controllers, data with cleanup.
- `src/data/builders`: unique deterministic-shape test payloads.
- `tests/ui`, `tests/api`, `tests/contract`, `tests/hybrid`: separate suites sharing infrastructure.
- `tests/setup`: preflight environment health check (project dependency).
- `.github/workflows`: PR smoke suite and nightly regression.

## Modify for a new project
1. Change app URLs and secrets in local `.env.<name>` or protected CI variables.
2. Adapt selectors in `src/pages` to your app.
3. Replace `/v1/users` endpoints and model/schema with actual API contract.
4. Replace `/health` with your environment health endpoint or remove project dependency if not available.
5. Add one `features` group per domain and its UI/API tests; avoid duplicate transport or fixture logic.
6. Use app-specific sandbox accounts or per-worker storageState for stateful authenticated parallel tests.
7. Keep production read-only. The `ALLOW_PROD_WRITE` escape hatch must be limited by CI protected environments and approval. Prefer removing it entirely in tightly regulated applications.

After the first dependency installation, commit the generated `package-lock.json`, then switch CI from `npm install` to `npm ci` for deterministic installs.

## Quality gates
```bash
npm run typecheck
npm run lint
npm run format:check
npm run test:smoke
```

## Auth design
API uses independent `APIRequestContext` with optional bearer token. UI login sample uses page-level credentials. Implement `storageState` setup for auth-required suites; use separate worker accounts when tests mutate server state. Do not share stored auth files in Git.

## Test policy
Test-scoped resource factory with automatic cleanup; unique payloads; no arbitrary sleeps; locator assertions; contracts validated at runtime; low-level API controller contains no `expect` calls. For token/error log redaction add a central request metadata wrapper if your system requires request auditing.

## CI caveat
GitHub runners must reach the target application; staging secrets/vars must be configured. Pin actions to full commit SHA for security-sensitive enterprise environments, and use automated dependency updates.
