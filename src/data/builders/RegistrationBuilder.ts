import { randomUUID } from 'node:crypto';
import { registrationTestData } from '../test-data/registration.data.js';

export function buildRegistrationUser() {
  const identifier = randomUUID();

  return {
    ...registrationTestData,
    email: `qa-${identifier}@example.test`,
    password: `Qa-${identifier}!1`,
  };
}
