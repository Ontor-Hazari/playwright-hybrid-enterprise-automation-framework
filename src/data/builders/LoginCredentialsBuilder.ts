import { randomUUID } from 'node:crypto';

export function buildUnregisteredLoginCredentials() {
  const identifier = randomUUID();

  return {
    email: `qa-invalid-${identifier}@example.test`,
    password: `Invalid-${identifier}!1`,
  };
}
