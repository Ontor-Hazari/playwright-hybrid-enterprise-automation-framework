import type { Locator, Page } from '@playwright/test';
import { BasePage } from '../base/BasePage.js';

export class TestCasesPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get heading(): Locator {
    return this.page.getByRole('heading', { name: 'Test Cases', level: 2 });
  }
}
