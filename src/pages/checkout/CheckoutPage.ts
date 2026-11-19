import type { Locator, Page } from '@playwright/test';
import { BasePage } from '../base/BasePage.js';

export class CheckoutPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get addressDetailsHeading(): Locator {
    return this.page.getByRole('heading', { name: 'Address Details' });
  }

  get reviewOrderHeading(): Locator {
    return this.page.getByRole('heading', { name: 'Review Your Order' });
  }

  get deliveryAddress(): Locator {
    return this.page.locator('#address_delivery');
  }

  get billingAddress(): Locator {
    return this.page.locator('#address_invoice');
  }

  get orderRows(): Locator {
    return this.page.locator('#cart_info tbody tr[id^="product-"]');
  }

  get commentInput(): Locator {
    return this.page.locator('textarea[name="message"]');
  }

  async placeOrder(comment: string): Promise<void> {
    await this.commentInput.fill(comment);
    await this.page.getByRole('link', { name: 'Place Order' }).click();
  }
}
