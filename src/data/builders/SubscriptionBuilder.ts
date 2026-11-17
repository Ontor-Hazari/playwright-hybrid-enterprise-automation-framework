import { randomUUID } from 'node:crypto';

export function buildSubscriptionEmail(): string {
  return `qa-subscribe-${randomUUID()}@example.test`;
}
