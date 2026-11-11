import type { Locator, Page } from '@playwright/test';
import { BasePage } from '../base/BasePage.js';

export class ProductsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get allProductsHeading(): Locator {
    return this.page.getByRole('heading', { name: 'All Products', level: 2 });
  }

  get searchInput(): Locator {
    return this.page.getByRole('textbox', { name: 'Search Product' });
  }

  get searchButton(): Locator {
    return this.page.locator('#submit_search');
  }

  get searchedProductsHeading(): Locator {
    return this.page.getByRole('heading', {
      name: 'Searched Products',
      level: 2,
    });
  }

  get searchResults(): Locator {
    return this.page.locator('.features_items .product-image-wrapper');
  }

  async searchProduct(productName: string): Promise<void> {
    await this.searchInput.fill(productName);
    await this.searchButton.click();
  }
}
