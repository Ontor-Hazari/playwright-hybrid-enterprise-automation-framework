import type { Page } from '@playwright/test';
import { BasePage } from '../base/BasePage.js';
export class LoginPage extends BasePage {
  constructor(page: Page) { super(page); }
  async open(): Promise<void> { await this.visit('/login'); }
  async login(username: string, password: string): Promise<void> {
    await this.page.getByLabel('Username').fill(username);
    await this.page.getByLabel('Password').fill(password);
    await this.page.getByRole('button', { name: 'Sign in' }).click();
  }
}
