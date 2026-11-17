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
