import { randomUUID } from 'node:crypto';
import type { CreateUserRequest } from '../../api/models/User.js';
export function buildUser(overrides: Partial<CreateUserRequest> = {}): CreateUserRequest {
  return { name: 'Automated QA User', email: `qa-${randomUUID()}@example.test`, ...overrides };
}
