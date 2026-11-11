import type { APIRequestContext, APIResponse } from '@playwright/test';
/** Thin transport: extend only when cross-cutting behavior is needed. */
export class ApiClient {
  constructor(private readonly context: APIRequestContext) {}
  get(path: string): Promise<APIResponse> { return this.context.get(path); }
  post(path: string, data: unknown): Promise<APIResponse> { return this.context.post(path, { data }); }
  delete(path: string): Promise<APIResponse> { return this.context.delete(path); }
}
