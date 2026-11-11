import type { APIResponse } from '@playwright/test';
import { ApiClient } from '../core/ApiClient.js';
import type { CreateUserRequest } from '../models/User.js';
import { assertWritableEnvironment } from '../../../config/safety.js';
export class UsersController {
  private readonly path = '/v1/users';
  constructor(private readonly http: ApiClient) {}
  get(id: string): Promise<APIResponse> { return this.http.get(`${this.path}/${encodeURIComponent(id)}`); }
  create(data: CreateUserRequest): Promise<APIResponse> {
    assertWritableEnvironment();
    return this.http.post(this.path, data);
  }
  delete(id: string): Promise<APIResponse> {
    assertWritableEnvironment();
    return this.http.delete(`${this.path}/${encodeURIComponent(id)}`);
  }
}
