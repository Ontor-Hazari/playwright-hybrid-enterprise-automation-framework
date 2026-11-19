import type { Locator, Page } from '@playwright/test';

export class SidebarComponent {
  constructor(private readonly page: Page) {}

  get categories(): Locator {
    return this.page.locator('.category-products');
  }

  get brands(): Locator {
    return this.page.locator('.brands_products');
  }

  get brandsHeading(): Locator {
    return this.brands.getByRole('heading', { name: 'Brands' });
  }

  async openCategory(group: string, subCategory: string): Promise<void> {
    // The accordion toggle's accessible name includes an icon glyph and "Men" is a
    // substring of "Women", so target the toggle by its anchor instead of by name.
    await this.categories.locator(`a[href="#${group}"]`).click();
    await this.categories
      .locator(`#${group}`)
      .getByRole('link', { name: subCategory })
      .click();
  }

  async openBrand(brand: string): Promise<void> {
    await this.brands.getByRole('link', { name: brand }).click();
  }
}
