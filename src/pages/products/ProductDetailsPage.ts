import type { Locator, Page } from '@playwright/test';
import { BasePage } from '../base/BasePage.js';

export class ProductDetailsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private get information(): Locator {
    return this.page.locator('.product-information');
  }

  get productName(): Locator {
    return this.information.getByRole('heading', { level: 2 });
  }

  get category(): Locator {
    return this.information.getByText('Category:');
  }

  get price(): Locator {
    return this.information.getByText(/^Rs\. \d+/);
  }

  get availability(): Locator {
    return this.information.getByText('Availability:');
  }

  get condition(): Locator {
    return this.information.getByText('Condition:');
  }

  get brand(): Locator {
    return this.information.getByText('Brand:');
  }
}
