import { randomUUID } from 'node:crypto';

export function buildReviewEmail(): string {
  return `qa-review-${randomUUID()}@example.test`;
}
