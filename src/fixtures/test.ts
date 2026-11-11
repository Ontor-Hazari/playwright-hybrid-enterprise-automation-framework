import { test as base, expect, request as requestFactory, type APIRequestContext } from '@playwright/test';
import { env } from '../../config/env.js';
import { LoginPage } from '../pages/auth/LoginPage.js';
import { HomePage } from '../pages/home/HomePage.js';
import { TestCasesPage } from '../pages/test-cases/TestCasesPage.js';
import { UsersPage } from '../pages/users/UsersPage.js';
import { ApiClient } from '../api/core/ApiClient.js';
import { UsersController } from '../api/controllers/UsersController.js';
import { buildUser } from '../data/builders/UserBuilder.js';
import { userSchema } from '../api/schemas/user.schema.js';
import type { User } from '../api/models/User.js';

type Fixtures = {
  loginPage: LoginPage;
  homePage: HomePage;
  testCasesPage: TestCasesPage;
  usersPage: UsersPage;
  apiContext: APIRequestContext;
  usersApi: UsersController;
  createdUser: User;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => { await use(new LoginPage(page)); },
  homePage: async ({ page }, use) => { await use(new HomePage(page)); },
  testCasesPage: async ({ page }, use) => { await use(new TestCasesPage(page)); },
  usersPage: async ({ page }, use) => { await use(new UsersPage(page)); },
  apiContext: async ({}, use) => {
    const context = await requestFactory.newContext({
      baseURL: env.apiBaseURL,
      extraHTTPHeaders: { Accept: 'application/json', ...(env.apiToken ? { Authorization: `Bearer ${env.apiToken}` } : {}) },
    });
    try { await use(context); } finally { await context.dispose(); }
  },
  usersApi: async ({ apiContext }, use) => { await use(new UsersController(new ApiClient(apiContext))); },
  createdUser: async ({ usersApi }, use) => {
    const response = await usersApi.create(buildUser());
    if (response.status() !== 201) throw new Error(`Create user failed: ${response.status()}`);
    const user = userSchema.parse(await response.json());
    try { await use(user); } finally {
      const cleanup = await usersApi.delete(user.id);
      if (!cleanup.ok()) throw new Error(`User cleanup failed: ${cleanup.status()}`);
    }
  },
});
export { expect };
