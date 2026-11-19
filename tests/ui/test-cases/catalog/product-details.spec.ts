import { test, expect } from '../../../../src/fixtures/test.js';

test('TC 8 - verify all products and product detail page @catalog', async ({
  homePage,
  page,
  productsPage,
  productDetailsPage,
}) => {
  await homePage.open();
  await expect(homePage.logo).toBeVisible();
  await expect(page).toHaveTitle('Automation Exercise');

  await homePage.openProducts();
  await expect(page).toHaveURL('https://automationexercise.com/products');
  await expect(productsPage.allProductsHeading).toBeVisible();
  await expect(productsPage.searchResults.first()).toBeVisible();

  const firstProductName = (await productsPage.firstProductName.innerText()).trim();
  await productsPage.viewFirstProduct();

  await expect(page).toHaveURL(/\/product_details\/\d+/);
  await expect(productDetailsPage.productName).toHaveText(firstProductName);
  await expect(productDetailsPage.category).toBeVisible();
  await expect(productDetailsPage.price).toBeVisible();
  await expect(productDetailsPage.availability).toBeVisible();
  await expect(productDetailsPage.condition).toBeVisible();
  await expect(productDetailsPage.brand).toBeVisible();
});
