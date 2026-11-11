import type { Locator, Page } from '@playwright/test';
import { BasePage } from '../base/BasePage.js';
import { HeaderComponent } from '../components/HeaderComponent.js';

export class HomePage extends BasePage {
  private readonly header: HeaderComponent;

  constructor(page: Page) {
    super(page);
    this.header = new HeaderComponent(page);
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
}
