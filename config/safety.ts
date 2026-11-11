import { env } from './env.js';
/** Central policy. Never rely only on test.skip to protect production. */
export function assertWritableEnvironment(): void {
  if (env.name === 'prod' && !env.allowProdWrite) {
    throw new Error('Write operation refused: production tests are read-only by default.');
  }
}
