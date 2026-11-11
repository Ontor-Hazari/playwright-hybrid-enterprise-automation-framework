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
  async openTestCases(): Promise<void> {
    await this.testCasesLink.click();
  }
}
