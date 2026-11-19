import type { Page, Locator } from '@playwright/test';
export class HeaderComponent {
  constructor(private readonly page: Page) {}
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
  get cartLink(): Locator {
    return this.page.getByRole('banner').getByRole('link', { name: /Cart/ });
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
  async openTestCases(): Promise<void> {
    await this.testCasesLink.click();
  }
  async openProducts(): Promise<void> {
    await this.productsLink.click();
  }
  async openCart(): Promise<void> {
    await this.cartLink.click();
  }
  async openSignupLogin(): Promise<void> {
    await this.signupLoginLink.click();
  }
  async openContactUs(): Promise<void> {
    await this.contactUsLink.click();
  }
}

