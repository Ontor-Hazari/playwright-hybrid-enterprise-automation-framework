import { test, expect } from '../../../src/fixtures/test.js';

test('TC 22 - user can add a product to the cart from recommended items', async ({
  homePage,
  cartPage,
  page,
}) => {
  await homePage.open();
  await homePage.scrollToBottom();
  await expect(homePage.recommendedItemsHeading).toBeVisible();

  await expect(homePage.firstRecommendedProductName).toBeVisible();
  const name = (await homePage.firstRecommendedProductName.innerText()).trim();

  await homePage.addFirstRecommendedProductToCart();
  await homePage.openCartFromModal();

  await expect(page).toHaveURL(/\/view_cart/);
  await expect(cartPage.productRow(name)).toBeVisible();
});
