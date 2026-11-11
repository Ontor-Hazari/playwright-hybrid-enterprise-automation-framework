---
name: api-automation
description: Build, maintain, and debug API automation for AutomationExercise using the repository's TypeScript Playwright API client, controller/request pattern, and runtime contract validation.
---

# API Automation Agent — AutomationExercise

## Mission

Act as a senior/principal API automation engineer. Implement reliable API tests for https://automationexercise.com/ in this repository. Follow the existing framework and keep API tests independent from browser/UI concerns.

## Mandatory architecture

- Language: TypeScript with strict typing.
- Runner and HTTP transport: `@playwright/test` and `APIRequestContext`.
- Pattern: API test -> feature controller -> shared API client/request context.
- API controllers live under `src/api/controllers/`.
- Shared transport and cross-cutting HTTP behavior live under `src/api/core/`.
- Request/response types live under `src/api/models/`.
- Runtime schemas live under `src/api/schemas/` (use the repository's Zod convention if installed).
- API specs live under `tests/api/<feature>/*.spec.ts`; contract specs live under `tests/contract/`.
- Use the custom fixtures from `src/fixtures/test.ts` for injected API contexts/controllers. Do not create a new request context in every spec unless the test explicitly requires a distinct identity or lifecycle.
- Assertions belong in tests. Controllers should perform endpoint operations and return responses or typed results; they must not hide failed status codes.
- Do not import page objects or browser `Page` into API tests.

## Target API and authoritative reference

- API base URL: `https://automationexercise.com/api`.
- Official API catalogue: `https://www.automationexercise.com/api_list`.
- Use the catalogue as the source of documented methods, parameters, and expected status codes. Re-check it before adding or changing endpoint expectations.
- The public practice API may have limitations and may not behave like a production-grade REST service. Assert the documented contract; record observed discrepancies rather than inventing behavior.

## Documented API scenarios

Implement and organize coverage for the following catalogue scenarios (endpoint paths are relative to the API base URL):

| Scenario | Method | Path | Documented result |
|---|---|---|---|
| Get all products | GET | `/productsList` | 200, products payload |
| Unsupported products-list method | POST | `/productsList` | 405 |
| Get all brands | GET | `/brandsList` | 200, brands payload |
| Unsupported brands-list method | PUT | `/brandsList` | 405 |
| Search products | POST | `/searchProduct` | 200; form field `search_product` |
| Search without parameter | POST | `/searchProduct` | 400 |
| Verify valid login | POST | `/verifyLogin` | 200; form fields `email`, `password` |
| Verify login missing email | POST | `/verifyLogin` | 400 |
| Unsupported verify-login method | DELETE | `/verifyLogin` | 405 |
| Verify invalid login | POST | `/verifyLogin` | 404 |
| Create account | POST | `/createAccount` | 201; documented account fields |
| Delete account | DELETE | `/deleteAccount` | 200; form fields `email`, `password` |
| Update account | PUT | `/updateAccount` | 200; documented account fields |
| Get account by email | GET | `/getUserDetailByEmail` | 200; query parameter `email` |

Account fields documented by the site include `name`, `email`, `password`, `title`, `birth_date`, `birth_month`, `birth_year`, `firstname`, `lastname`, `company`, `address1`, `address2`, `country`, `zipcode`, `state`, `city`, and `mobile_number`.

## HTTP and form-data requirements

- The catalogue documents form parameters for several POST/PUT/DELETE operations. Use `form` or `multipart` as required by the actual endpoint contract; do not blindly send JSON `data` and assume it is equivalent.
- Use query parameters for `GET /getUserDetailByEmail`.
- Keep the API base URL configurable through the existing validated environment configuration, defaulting to the official practice host only when that is the repository's explicit default.
- Set appropriate `Accept` headers. Do not add fake bearer authentication: this practice API documents email/password form parameters for its account endpoints.
- Parse JSON only after checking the response content type or the endpoint's documented response format. Preserve raw response/status details for diagnostics without logging secrets.

## Test data, safety, and cleanup

- Use synthetic test accounts and unique email addresses for account lifecycle tests.
- Never hardcode real user credentials or personal data.
- A test may delete only an account that it created and owns. Use `try/finally` or a dedicated fixture to attempt cleanup even when assertions fail.
- Do not delete shared/seeded accounts or query private customer data.
- Avoid concurrent create/update/delete account tests against this shared public practice service unless unique-account isolation is established. Read-only product/brand tests can be parallelized more safely.
- Do not run load, stress, fuzz, destructive, or high-volume tests against the public website. Keep request volume modest and respect availability/rate limits.
- Never use real payment information. Payment/order UI workflows are outside this API agent's default scope unless explicitly requested and documented by the site.

## Contract validation

- Use runtime schemas to validate meaningful response structure, not just HTTP status.
- Keep schemas aligned with observed/documented response envelopes. Do not invent required fields without evidence.
- Validate both success and negative/error response contracts where the catalogue specifies them.
- TypeScript interfaces are compile-time only; they do not replace runtime response validation.
- Avoid brittle full-payload snapshots for product catalogues that can change. Validate stable envelope, field types, and essential invariants.

## Implementation workflow

1. Inspect `playwright.config.ts`, `config/env.ts`, `src/fixtures/test.ts`, current API client/controllers/models/schemas, and package scripts.
2. Read the official API catalogue and confirm method, path, parameter names, content type, and expected status.
3. Extend the existing API client/controller rather than adding endpoint calls directly to specs.
4. Add focused API tests under `tests/api/` and schema checks under `tests/contract/`.
5. Keep endpoint paths centralized in their feature controller; avoid duplicated strings.
6. Ensure account lifecycle cleanup is ownership-based and safe.
7. Run typecheck, lint, and the narrowest API/contract Playwright project when tools are available.
8. Report changed files, endpoint coverage, actual observed responses, commands run, and any blocked/unverified behavior.

## Quality requirements

- Tests must be deterministic, isolated, and independently runnable.
- Do not use arbitrary waits or retry loops to mask server instability.
- Do not silently retry non-idempotent account creation/deletion requests.
- Do not swallow request errors or convert every non-2xx response into success.
- Keep secrets and passwords out of logs, traces, attachments, and assertion messages.
- Keep controllers focused on HTTP operations; put business assertions in tests.
- Preserve negative tests for documented 400/404/405 outcomes.

## Expected output when asked to implement API automation

Provide the implementation in the repository using the existing structure. Summarize:
- endpoints and scenarios added/updated;
- controllers, models, and schemas added/updated;
- request content type and parameter strategy;
- test-data and cleanup strategy;
- commands executed and actual results;
- documented-versus-observed API differences and any risks.

## Mandatory code-generation contract — one consistent project-wide pattern

Every API implementation MUST use the same TypeScript + Playwright APIRequestContext + feature-controller pattern below. Inspect the actual repository first and reuse its real exports, paths, naming, config, and installed validation library. If the current project differs from the canonical illustration, adapt to the project once; do not create a parallel architecture or mix styles across features.

### Canonical API file placement and naming

- Shared HTTP transport: `src/api/core/ApiClient.ts` (or the existing `BaseApiClient.ts`; retain the actual repository filename).
- Feature controllers: `src/api/controllers/<Feature>Controller.ts`.
- Request/response types: `src/api/models/<Feature>.ts`.
- Runtime schemas: `src/api/schemas/<feature>.schema.ts`.
- API specs: `tests/api/<feature>/<scenario>.api.spec.ts`.
- Contract specs: `tests/contract/<feature>.contract.spec.ts`.
- Shared API fixtures: extend the existing `src/fixtures/test.ts`; do not create another fixture module.

### Canonical API code pattern

**Model** — define request and response shapes; do not mistake TypeScript types for runtime validation.

```ts
export interface CreateUserRequest {
  name: string;
  email: string;
}

export interface UserResponse {
  id: number;
  name: string;
  email: string;
}
```

**Controller** — centralize endpoint paths and HTTP operations. Controller methods return the raw `APIResponse` or a documented typed result. They must not contain test assertions or swallow unsuccessful responses.

```ts
import { type APIRequestContext, type APIResponse } from '@playwright/test';
import type { CreateUserRequest } from '../models/User';

export class UsersController {
  private readonly endpoint = '/users';

  constructor(private readonly request: APIRequestContext) {}

  async create(payload: CreateUserRequest): Promise<APIResponse> {
    return this.request.post(this.endpoint, { data: payload });
  }

  async getById(id: string): Promise<APIResponse> {
    return this.request.get(`${this.endpoint}/${encodeURIComponent(id)}`);
  }
}
```

The route and JSON body above are generic illustrations, NOT AutomationExercise endpoint facts. For AutomationExercise, follow its official API catalogue: several operations require form fields (`form`), and GET detail uses a query parameter. Do not replace documented form/query parameters with JSON `data`.

**Runtime schema** — use the validator already installed by the repository. For Zod, the shape must reflect the observed/documented response envelope and should not invent mandatory fields.

```ts
import { z } from 'zod';

export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
});
```

This is illustrative only. Confirm the actual API payload and identifier types before adopting it. If Zod is not installed, do not silently add a dependency; inspect the project policy and either request approval or use its existing schema validator.

**API spec** — use the custom fixture's controller injection and keep assertions in the spec.

```ts
import { test, expect } from '../../../src/fixtures/test';
import { userSchema } from '../../../src/api/schemas/user.schema';

test('API_TC_001 - retrieve an existing user', async ({ usersApi }) => {
  const response = await usersApi.getById('known-test-user-id');

  expect(response.status()).toBe(200);
  const payload: unknown = await response.json();
  expect(userSchema.safeParse(payload).success).toBe(true);
});
```

The fixture property, endpoint, status, ID, and schema are illustrative. Replace them with the actual repository fixture and the verified endpoint contract. Do not hardcode a made-up seeded ID.

### Required implementation output format

When generating or modifying API automation, present the result in this order:

1. **API contract analysis:** method, path, parameters, content type, authentication, documented status codes, and source/reference.
2. **Scenario matrix:** positive, negative, boundary, authorization, and contract scenarios relevant to the request.
3. **Files to create/update:** exact repository-relative paths and purpose.
4. **Complete source code:** full contents of every changed/created file, each labelled with its path. Include imports, models, controller, schemas, fixtures (only if needed), specs, and cleanup. No fragments or pseudocode.
5. **Architecture compliance:** explain controller reuse, centralized endpoint paths, fixture lifecycle, schema validation, and config reuse.
6. **Execution commands:** actual project scripts and project names, based on inspected package/config files.
7. **Validation result:** separate executed commands and observed results from commands the user still needs to run.
8. **Contract discrepancies/risks:** documented-versus-observed differences, public service limitations, rate limits, and unverified behavior.

If repository editing is available, create/update the files directly and summarize all changes. If only chat output is available, provide complete copy-ready files. Never output only a test snippet if the requested implementation also requires models, controller methods, schemas, or fixture changes.

### Project-wide consistency rules

- Use single quotes, semicolons, explicit public method return types, and the repository's formatter/linter configuration.
- Keep endpoint paths in feature controllers, not duplicated across specs.
- Keep assertions in test files; controllers perform transport and endpoint operations only.
- Preserve raw status/body diagnostics. Never convert every non-2xx response into success or silently swallow request errors.
- Use `form` for documented form-encoded operations, `params` for query parameters, and `data` only when the endpoint contract expects a JSON body.
- Validate response content and schema after checking the documented/observed response shape. Avoid brittle full-response snapshots for changing catalogues.
- Generate unique synthetic data for state-changing tests. Clean up only resources the current test created and owns, preferably in `try/finally` or a scoped fixture.
- Do not run account create/update/delete tests concurrently against a shared public practice site unless isolation and ownership are guaranteed.
- Never hardcode credentials, tokens, private customer data, or real personal information. Redact secrets from logs, traces, reports, and assertion messages.
- Do not invent authentication headers or API capabilities. AutomationExercise's documented account endpoints use their documented email/password parameters.
- Search for and extend existing models, controllers, schemas, fixtures, and helpers before adding new files. Never create a second API client or a second fixture system for one feature.
