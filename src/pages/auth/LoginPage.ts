import type { Locator, Page } from '@playwright/test';
import { BasePage } from '../base/BasePage.js';
export class LoginPage extends BasePage {
  constructor(page: Page) { super(page); }

  get newUserSignupHeading(): Locator {
    return this.page.getByRole('heading', { name: 'New User Signup!' });
  }

  get loginToAccountHeading(): Locator {
    return this.page.getByRole('heading', { name: 'Login to your account' });
  }

  get loginErrorMessage(): Locator {
    return this.loginForm.getByText(
      'Your email or password is incorrect!',
      { exact: true },
    );
  }

  private get signupForm(): Locator {
    return this.page
      .locator('form')
      .filter({ has: this.page.getByRole('button', { name: 'Signup' }) });
  }

  private get loginForm(): Locator {
    return this.page
      .locator('form')
      .filter({ has: this.page.getByRole('button', { name: 'Login' }) });
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

  private get loginEmailInput(): Locator {
    return this.loginForm.getByPlaceholder('Email Address');
  }

  private get loginPasswordInput(): Locator {
    return this.loginForm.getByPlaceholder('Password');
  }

  private get loginButton(): Locator {
    return this.loginForm.getByRole('button', { name: 'Login' });
  }

  async open(): Promise<void> { await this.visit('/login'); }

  async signup(name: string, email: string): Promise<void> {
    await this.signupNameInput.fill(name);
    await this.signupEmailInput.fill(email);
    await this.signupButton.click();
  }

  async login(email: string, password: string): Promise<void> {
    await this.loginEmailInput.fill(email);
    await this.loginPasswordInput.fill(password);
    await this.loginButton.click();
  }
}
