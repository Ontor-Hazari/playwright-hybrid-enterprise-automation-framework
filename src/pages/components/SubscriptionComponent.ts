import type { Locator, Page } from '@playwright/test';

export class SubscriptionComponent {
  constructor(private readonly page: Page) {}

  private get footer(): Locator {
    return this.page.getByRole('contentinfo');
  }

  get heading(): Locator {
    return this.footer.getByRole('heading', { name: 'Subscription' });
  }

  get emailInput(): Locator {
    return this.footer.getByPlaceholder('Your email address');
  }

  get successMessage(): Locator {
    return this.footer.getByText('You have been successfully subscribed!');
  }

  async scrollToFooter(): Promise<void> {
    await this.heading.scrollIntoViewIfNeeded();
  }

  async subscribe(email: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.footer.getByRole('button').click();
  }
}
