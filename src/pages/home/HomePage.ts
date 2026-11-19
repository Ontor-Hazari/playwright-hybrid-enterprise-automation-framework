import type { Locator, Page } from '@playwright/test';
import { BasePage } from '../base/BasePage.js';
import { HeaderComponent } from '../components/HeaderComponent.js';
import { SidebarComponent } from '../components/SidebarComponent.js';
import { SubscriptionComponent } from '../components/SubscriptionComponent.js';

export class HomePage extends BasePage {
  private readonly header: HeaderComponent;
  readonly subscription: SubscriptionComponent;

  constructor(page: Page) {
    super(page);
    this.header = new HeaderComponent(page);
    this.subscription = new SubscriptionComponent(page);
  }

  get logo(): Locator {
    return this.page.getByRole('link', {
      name: 'Website for automation practice',
    });
  }

  get sidebar(): SidebarComponent {
    return new SidebarComponent(this.page);
  }

  get heroHeading(): Locator {
    return this.page.locator('#slider-carousel .item.active h2');
  }

  get scrollUpArrow(): Locator {
    return this.page.locator('#scrollUp');
  }

  get recommendedItemsHeading(): Locator {
    return this.page.locator('.recommended_items').getByRole('heading', {
      name: 'Recommended Items',
      level: 2,
    });
  }

  get viewCartLink(): Locator {
    return this.page.getByRole('link', { name: 'View Cart' });
  }

  private get firstRecommendedCard(): Locator {
    return this.page
      .locator('.recommended_items .item.active .product-image-wrapper')
      .first();
  }

  get firstRecommendedProductName(): Locator {
    return this.firstRecommendedCard.locator('.productinfo p');
  }

  async scrollToBottom(): Promise<void> {
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  }

  async scrollToTop(): Promise<void> {
    await this.page.evaluate(() => window.scrollTo(0, 0));
  }

  async clickScrollUpArrow(): Promise<void> {
    await this.scrollUpArrow.click();
  }

  async addFirstRecommendedProductToCart(): Promise<void> {
    await this.firstRecommendedCard.getByText('Add to cart').click();
  }

  async openCartFromModal(): Promise<void> {
    await this.viewCartLink.click();
  }

  async open(): Promise<void> {
    await this.page.goto('http://automationexercise.com/');
  }

  async openTestCases(): Promise<void> {
    await this.header.openTestCases();
  }

  async openProducts(): Promise<void> {
    await this.header.openProducts();
  }

  async openCart(): Promise<void> {
    await this.header.openCart();
  }

  async openSignupLogin(): Promise<void> {
    await this.header.openSignupLogin();
  }

  async viewProduct(index: number): Promise<void> {
    await this.page
      .locator('.features_items .product-image-wrapper')
      .nth(index)
      .getByRole('link', { name: 'View Product' })
      .click();
  }

  async openContactUs(): Promise<void> {
    await this.header.openContactUs();
  }
}

