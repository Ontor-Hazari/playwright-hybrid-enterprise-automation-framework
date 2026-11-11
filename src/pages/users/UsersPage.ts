import type { Locator, Page } from '@playwright/test';
import { BasePage } from '../base/BasePage.js';
export class UsersPage extends BasePage {
  constructor(page: Page) { super(page); }
  async open(): Promise<void> { await this.visit('/users'); }
  async search(email: string): Promise<void> { await this.page.getByPlaceholder('Search users').fill(email); }
  userRow(email: string): Locator { return this.page.getByRole('row').filter({ hasText: email }); }
}
