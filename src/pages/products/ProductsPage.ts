import type { Locator, Page } from '@playwright/test';
import { BasePage } from '../base/BasePage.js';
import { SidebarComponent } from '../components/SidebarComponent.js';

export class ProductsPage extends BasePage {
  readonly sidebar: SidebarComponent;

  constructor(page: Page) {
    super(page);
    this.sidebar = new SidebarComponent(page);
  }

  get listingTitle(): Locator {
    return this.page.locator('.features_items .title');
  }

  get productNames(): Locator {
    return this.page.locator('.features_items .productinfo p');
  }

  async addAllProductsToCart(): Promise<void> {
    const count = await this.searchResults.count();
    for (let index = 0; index < count; index++) {
      await this.addProductToCart(index);
      await this.continueShopping();
    }
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

  get firstProductName(): Locator {
    return this.searchResults.first().locator('.productinfo p');
  }

  async viewFirstProduct(): Promise<void> {
    await this.searchResults
      .first()
      .getByRole('link', { name: 'View Product' })
      .click();
  }

  productCard(index: number): Locator {
    return this.searchResults.nth(index);
  }

  async addProductToCart(index: number): Promise<void> {
    const card = this.productCard(index);
    await card.hover();
    await card.locator('.product-overlay .add-to-cart').click();
  }

  productName(index: number): Locator {
    return this.productCard(index).locator('.productinfo p');
  }

  productPrice(index: number): Locator {
    return this.productCard(index).locator('.productinfo h2');
  }

  get continueShoppingButton(): Locator {
    return this.page.getByRole('button', { name: 'Continue Shopping' });
  }

  get viewCartLink(): Locator {
    return this.page.getByRole('link', { name: 'View Cart' });
  }

  async continueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }

  async openCartFromModal(): Promise<void> {
    await this.viewCartLink.click();
  }

  async searchProduct(productName: string): Promise<void> {
    await this.searchInput.fill(productName);
    await this.searchButton.click();
  }
}
