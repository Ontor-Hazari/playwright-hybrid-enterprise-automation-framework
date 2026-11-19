import { test, expect } from '../../../../src/fixtures/test.js';
import { catalogTestData } from '../../../../src/data/test-data/catalog.data.js';

test('TC 19 - user can view brand products @catalog', async ({
  homePage,
  productsPage,
  page,
}) => {
  const { first, second } = catalogTestData.brands;

  await homePage.open();
  await homePage.openProducts();
  await expect(productsPage.sidebar.brandsHeading).toBeVisible();

  await productsPage.sidebar.openBrand(first.name);
  await expect(page).toHaveURL(/\/brand_products\//);
  await expect(productsPage.listingTitle).toHaveText(first.expectedTitle);
  await expect(productsPage.searchResults.first()).toBeVisible();

  await productsPage.sidebar.openBrand(second.name);
  await expect(page).toHaveURL(/\/brand_products\//);
  await expect(productsPage.listingTitle).toHaveText(second.expectedTitle);
  await expect(productsPage.searchResults.first()).toBeVisible();
});
