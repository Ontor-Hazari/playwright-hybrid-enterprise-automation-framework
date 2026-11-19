import { test, expect } from '../../../../src/fixtures/test.js';
import { catalogTestData } from '../../../../src/data/test-data/catalog.data.js';

test('TC 18 - user can view category products @catalog', async ({
  homePage,
  productsPage,
  page,
}) => {
  const { women, men } = catalogTestData.categories;

  await homePage.open();
  await expect(homePage.logo).toBeVisible();
  await expect(homePage.sidebar.categories).toBeVisible();

  await homePage.sidebar.openCategory(women.group, women.subCategory);
  await expect(page).toHaveURL(/\/category_products\/\d+/);
  await expect(productsPage.listingTitle).toHaveText(women.expectedTitle);

  await homePage.sidebar.openCategory(men.group, men.subCategory);
  await expect(page).toHaveURL(/\/category_products\/\d+/);
  await expect(productsPage.listingTitle).toHaveText(men.expectedTitle);
});
