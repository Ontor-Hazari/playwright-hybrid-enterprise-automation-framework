import { test, expect } from '../../../src/fixtures/test.js';

test('TC 13 - product quantity is kept in the cart', async ({
  homePage,
  productDetailsPage,
  cartPage,
  page,
}) => {
  const quantity = 4;

  await homePage.open();
  await expect(homePage.logo).toBeVisible();

  await homePage.viewProduct(0);
  await expect(page).toHaveURL(/\/product_details\/\d+/);
  await expect(productDetailsPage.productName).toBeVisible();
  const name = (await productDetailsPage.productName.innerText()).trim();

  await productDetailsPage.setQuantity(quantity);
  await productDetailsPage.addToCart();
  await productDetailsPage.openCartFromModal();

  await expect(page).toHaveURL(/\/view_cart/);
  await expect(cartPage.productRow(name)).toBeVisible();
  await expect(cartPage.quantity(name)).toHaveText(String(quantity));
});
