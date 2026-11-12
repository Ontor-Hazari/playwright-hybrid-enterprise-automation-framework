import type { Locator, Page } from '@playwright/test';
import { BasePage } from '../base/BasePage.js';
export class LoginPage extends BasePage {
  constructor(page: Page) { super(page); }

  get newUserSignupHeading(): Locator {
    return this.page.getByRole('heading', { name: 'New User Signup!' });
  }

  private get signupForm(): Locator {
    return this.page
      .locator('form')
      .filter({ has: this.page.getByRole('button', { name: 'Signup' }) });
  }

  private get signupNameInput(): Locator {
    return this.signupForm.getByRole('textbox', { name: 'Name' });
  }

  private get signupEmailInput(): Locator {
    return this.signupForm.getByPlaceholder('Email Address');
  }

  private get signupButton(): Locator {
    return this.signupForm.getByRole('button', { name: 'Signup' });
  }

  async open(): Promise<void> { await this.visit('/login'); }

  async signup(name: string, email: string): Promise<void> {
    await this.signupNameInput.fill(name);
    await this.signupEmailInput.fill(email);
    await this.signupButton.click();
  }

  async login(username: string, password: string): Promise<void> {
    await this.page.getByLabel('Username').fill(username);
    await this.page.getByLabel('Password').fill(password);
    await this.page.getByRole('button', { name: 'Sign in' }).click();
  }
}
