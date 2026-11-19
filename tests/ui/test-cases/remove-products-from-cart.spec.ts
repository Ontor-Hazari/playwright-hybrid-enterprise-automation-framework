import { test, expect } from '../../../src/fixtures/test.js';

test('TC 17 - user can remove a product from the cart', async ({
  homePage,
  productsPage,
  cartPage,
  page,
}) => {
  await homePage.open();
  await expect(homePage.logo).toBeVisible();

  await homePage.openProducts();
  const name = (await productsPage.productName(0).innerText()).trim();
  await productsPage.addProductToCart(0);
  await productsPage.openCartFromModal();

  await expect(page).toHaveURL(/\/view_cart/);
  await expect(cartPage.cartInfoTable).toBeVisible();
  await expect(cartPage.productRow(name)).toBeVisible();

  await cartPage.removeProduct(name);

  await expect(cartPage.productRow(name)).toHaveCount(0);
  await expect(cartPage.emptyCartMessage).toBeVisible();
});
