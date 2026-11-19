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

  get quantityInput(): Locator {
    return this.page.locator('#quantity');
  }

  get viewCartLink(): Locator {
    return this.page.getByRole('link', { name: 'View Cart' });
  }

  get writeYourReviewHeading(): Locator {
    return this.page.getByRole('link', { name: 'Write Your Review' });
  }

  get reviewSuccessMessage(): Locator {
    return this.page.locator('#review-section').getByText('Thank you for your review.');
  }

  async setQuantity(quantity: number): Promise<void> {
    await this.quantityInput.fill(String(quantity));
  }

  async addToCart(): Promise<void> {
    await this.page.getByRole('button', { name: 'Add to cart' }).click();
  }

  async openCartFromModal(): Promise<void> {
    await this.viewCartLink.click();
  }

  async submitReview(name: string, email: string, review: string): Promise<void> {
    await this.page.getByPlaceholder('Your Name').fill(name);
    await this.page.locator('#review-form').getByPlaceholder('Email Address').fill(email);
    await this.page.getByPlaceholder('Add Review Here!').fill(review);
    await this.page.getByRole('button', { name: 'Submit' }).click();
  }
}
