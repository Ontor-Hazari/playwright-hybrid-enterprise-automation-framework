import type { Page, Locator } from '@playwright/test';
export class HeaderComponent {
  constructor(private readonly page: Page) {}
  get profileButton(): Locator {
    return this.page.getByRole('button', { name: 'Profile' });
  }
  get testCasesLink(): Locator {
    return this.page
      .getByRole('banner')
      .getByRole('link', { name: /Test Cases/ });
  }
  get productsLink(): Locator {
    return this.page
      .getByRole('banner')
      .getByRole('link', { name: /Products/ });
  }
  get signupLoginLink(): Locator {
    return this.page
      .getByRole('banner')
      .getByRole('link', { name: /Signup \/ Login/ });
  }
  get contactUsLink(): Locator {
    return this.page
      .getByRole('banner')
      .getByRole('link', { name: /Contact us/i });
  }
  get loggedInAsUser(): Locator {
    return this.page.getByRole('banner').getByText(/Logged in as/);
  }
  get deleteAccountLink(): Locator {
    return this.page
      .getByRole('banner')
      .getByRole('link', { name: /Delete Account/ });
  }
  async openTestCases(): Promise<void> {
    await this.testCasesLink.click();
  }
  async openProducts(): Promise<void> {
    await this.productsLink.click();
  }
  async openSignupLogin(): Promise<void> {
    await this.signupLoginLink.click();
  }
  async openContactUs(): Promise<void> {
    await this.contactUsLink.click();
  }
}
