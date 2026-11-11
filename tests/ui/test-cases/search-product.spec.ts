import { test, expect } from '../../../src/fixtures/test.js';

test('TC 9 - user can search for a product', async ({
  homePage,
  page,
  productsPage,
}) => {
  await homePage.open();
  await expect(homePage.logo).toBeVisible();
  await expect(page).toHaveTitle('Automation Exercise');

  await homePage.openProducts();
  await expect(page).toHaveURL('https://automationexercise.com/products');
  await expect(productsPage.allProductsHeading).toBeVisible();

  await productsPage.searchProduct('Blue Top');

  await expect(page).toHaveURL(
    'https://automationexercise.com/products?search=Blue%20Top',
  );
  await expect(productsPage.searchedProductsHeading).toBeVisible();
  await expect(productsPage.searchResults).toHaveCount(1);
  await expect(productsPage.searchResults.first()).toBeVisible();
  await expect(productsPage.searchResults.first()).toContainText('Blue Top');
});
