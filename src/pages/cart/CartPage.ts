import type { Locator, Page } from '@playwright/test';
import { BasePage } from '../base/BasePage.js';
import { SubscriptionComponent } from '../components/SubscriptionComponent.js';

export class CartPage extends BasePage {
  readonly subscription: SubscriptionComponent;

  constructor(page: Page) {
    super(page);
    this.subscription = new SubscriptionComponent(page);
  }

  get rows(): Locator {
    return this.page.locator('#cart_info_table tbody tr');
  }

  private row(productName: string): Locator {
    return this.rows.filter({ has: this.page.getByRole('link', { name: productName, exact: true }) });
  }

  get cartInfoTable(): Locator {
    return this.page.locator('#cart_info_table');
  }

  get emptyCartMessage(): Locator {
    return this.page.getByText('Cart is empty!');
  }

  get registerLoginLink(): Locator {
    return this.page.getByRole('link', { name: 'Register / Login' });
  }

  async proceedToCheckout(): Promise<void> {
    // The button is an href-less anchor wired up by page scripts; an early click is a no-op.
    await this.page.waitForLoadState('load');
    await this.page.getByText('Proceed To Checkout').click();
  }

  async openRegisterLogin(): Promise<void> {
    await this.registerLoginLink.click();
  }

  async removeProduct(productName: string): Promise<void> {
    await this.row(productName).locator('.cart_quantity_delete').click();
  }

  productRow(productName: string): Locator {
    return this.row(productName);
  }

  price(productName: string): Locator {
    return this.row(productName).locator('.cart_price');
  }

  quantity(productName: string): Locator {
    return this.row(productName).locator('.cart_quantity');
  }

  total(productName: string): Locator {
    return this.row(productName).locator('.cart_total');
  }
}
