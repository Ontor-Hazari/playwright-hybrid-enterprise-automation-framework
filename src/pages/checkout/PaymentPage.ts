import type { Download, Locator, Page } from '@playwright/test';
import { BasePage } from '../base/BasePage.js';

type PaymentDetails = {
  nameOnCard: string;
  cardNumber: string;
  cvc: string;
  expiryMonth: string;
  expiryYear: string;
};

export class PaymentPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get orderPlacedHeading(): Locator {
    return this.page.getByRole('heading', { name: 'Order Placed!' });
  }

  get orderConfirmedMessage(): Locator {
    return this.page.getByText('Congratulations! Your order has been confirmed!');
  }

  get downloadInvoiceLink(): Locator {
    return this.page.getByRole('link', { name: 'Download Invoice' });
  }

  get continueLink(): Locator {
    return this.page.getByRole('link', { name: 'Continue' });
  }

  async fillPaymentDetails(details: PaymentDetails): Promise<void> {
    await this.page.locator('[data-qa="name-on-card"]').fill(details.nameOnCard);
    await this.page.locator('[data-qa="card-number"]').fill(details.cardNumber);
    await this.page.locator('[data-qa="cvc"]').fill(details.cvc);
    await this.page.locator('[data-qa="expiry-month"]').fill(details.expiryMonth);
    await this.page.locator('[data-qa="expiry-year"]').fill(details.expiryYear);
  }

  async payAndConfirm(): Promise<void> {
    await this.page.getByRole('button', { name: 'Pay and Confirm Order' }).click();
  }

  async downloadInvoice(): Promise<Download> {
    const downloadPromise = this.page.waitForEvent('download');
    await this.downloadInvoiceLink.click();
    return downloadPromise;
  }

  async continue(): Promise<void> {
    await this.continueLink.click();
  }
}
