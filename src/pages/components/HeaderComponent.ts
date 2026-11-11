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
  async openTestCases(): Promise<void> {
    await this.testCasesLink.click();
  }
  async openProducts(): Promise<void> {
    await this.productsLink.click();
  }
}
