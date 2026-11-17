import { test, expect } from '../../../src/fixtures/test.js';

test('TC 12 - user can add products to the cart', async ({
  homePage,
  productsPage,
  cartPage,
  page,
}) => {
  await homePage.open();
  await expect(homePage.logo).toBeVisible();

  await homePage.openProducts();
  await expect(productsPage.allProductsHeading).toBeVisible();

  const firstName = (await productsPage.productName(0).innerText()).trim();
  const firstPrice = (await productsPage.productPrice(0).innerText()).trim();
  const secondName = (await productsPage.productName(1).innerText()).trim();
  const secondPrice = (await productsPage.productPrice(1).innerText()).trim();

  await productsPage.addProductToCart(0);
  await expect(productsPage.continueShoppingButton).toBeVisible();
  await productsPage.continueShopping();

  await productsPage.addProductToCart(1);
  await expect(productsPage.viewCartLink).toBeVisible();
  await productsPage.openCartFromModal();

  await expect(page).toHaveURL('https://automationexercise.com/view_cart');
  await expect(cartPage.rows).toHaveCount(2);

  await expect(cartPage.productRow(firstName)).toBeVisible();
  await expect(cartPage.price(firstName)).toHaveText(firstPrice);
  await expect(cartPage.quantity(firstName)).toHaveText('1');
  await expect(cartPage.total(firstName)).toHaveText(firstPrice);

  await expect(cartPage.productRow(secondName)).toBeVisible();
  await expect(cartPage.price(secondName)).toHaveText(secondPrice);
  await expect(cartPage.quantity(secondName)).toHaveText('1');
  await expect(cartPage.total(secondName)).toHaveText(secondPrice);
});
