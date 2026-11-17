import type { Locator, Page } from '@playwright/test';
import { BasePage } from '../base/BasePage.js';
import { HeaderComponent } from '../components/HeaderComponent.js';
import { SubscriptionComponent } from '../components/SubscriptionComponent.js';

export class HomePage extends BasePage {
  private readonly header: HeaderComponent;
  readonly subscription: SubscriptionComponent;

  constructor(page: Page) {
    super(page);
    this.header = new HeaderComponent(page);
    this.subscription = new SubscriptionComponent(page);
  }

  get logo(): Locator {
    return this.page.getByRole('link', {
      name: 'Website for automation practice',
    });
  }

  async open(): Promise<void> {
    await this.page.goto('http://automationexercise.com/');
  }

  async openTestCases(): Promise<void> {
    await this.header.openTestCases();
  }

  async openProducts(): Promise<void> {
    await this.header.openProducts();
  }

  async openCart(): Promise<void> {
    await this.header.openCart();
  }

  async openSignupLogin(): Promise<void> {
    await this.header.openSignupLogin();
  }

  async openContactUs(): Promise<void> {
    await this.header.openContactUs();
  }
}

