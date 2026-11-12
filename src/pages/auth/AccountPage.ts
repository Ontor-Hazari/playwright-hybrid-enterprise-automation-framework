import type { Locator, Page } from '@playwright/test';
import { BasePage } from '../base/BasePage.js';

export class AccountPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get accountCreatedHeading(): Locator {
    return this.page.getByRole('heading', { name: 'Account Created!' });
  }

  get accountDeletedHeading(): Locator {
    return this.page.getByRole('heading', { name: 'Account Deleted!' });
  }

  get continueLink(): Locator {
    return this.page.getByRole('link', { name: 'Continue' });
  }

  get loggedInAsUser(): Locator {
    return this.page.getByRole('banner').getByText(/Logged in as/);
  }

  private get deleteAccountLink(): Locator {
    return this.page
      .getByRole('banner')
      .getByRole('link', { name: /Delete Account/ });
  }

  async continue(): Promise<void> {
    await this.continueLink.click();
  }

  async deleteAccount(): Promise<void> {
    await this.deleteAccountLink.click();
  }
}
