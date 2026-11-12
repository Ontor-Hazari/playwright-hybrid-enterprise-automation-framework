import { test, expect } from '../../../src/fixtures/test.js';
import { productTestData } from '../../../src/data/test-data/products.data.js';

test('TC 9 - user can search for a product @smoke', async ({
  homePage,
  page,
  productsPage,
}) => {
  const { existingProduct, expectedResultCount } = productTestData.search;

  await homePage.open();
  await expect(homePage.logo).toBeVisible();
  await expect(page).toHaveTitle('Automation Exercise');

  await homePage.openProducts();
  await expect(page).toHaveURL('https://automationexercise.com/products');
  await expect(productsPage.allProductsHeading).toBeVisible();

  await productsPage.searchProduct(existingProduct);

  await expect(page).toHaveURL(
    `https://automationexercise.com/products?search=${encodeURIComponent(existingProduct)}`,
  );
  await expect(productsPage.searchedProductsHeading).toBeVisible();
  await expect(productsPage.searchResults).toHaveCount(expectedResultCount);
  await expect(productsPage.searchResults.first()).toBeVisible();
  await expect(productsPage.searchResults.first()).toContainText(existingProduct);
});
