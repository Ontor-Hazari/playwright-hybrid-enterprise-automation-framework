import { test, expect } from '../../../../src/fixtures/test.js';
import { buildRegistrationUser } from '../../../../src/data/builders/RegistrationBuilder.js';
import {
  cleanupAccount,
  deleteOwnAccount,
  newAccountState,
  registerUser,
} from '../../../../src/flows/account-flow.js';

test('TC 23 - checkout addresses match the registration address @checkout', async ({
  homePage,
  productsPage,
  cartPage,
  loginPage,
  registrationPage,
  accountPage,
  checkoutPage,
  page,
}) => {
  const user = buildRegistrationUser();
  const state = newAccountState();
  const pages = { loginPage, registrationPage, accountPage };
  const { address } = user;
  const expectedLines = [
    `${address.firstName} ${address.lastName}`,
    address.company,
    address.address,
    address.address2,
    `${address.city} ${address.state} ${address.zipcode}`,
    address.country,
    address.mobileNumber,
  ];

  await homePage.open();
  await expect(homePage.logo).toBeVisible();

  try {
    await homePage.openSignupLogin();
    await registerUser(pages, user, state);

    await homePage.openProducts();
    await productsPage.addProductToCart(0);
    await productsPage.openCartFromModal();
    await expect(page).toHaveURL(/\/view_cart/);
    await expect(cartPage.cartInfoTable).toBeVisible();

    await cartPage.proceedToCheckout();
    await expect(checkoutPage.addressDetailsHeading).toBeVisible();

    for (const line of expectedLines) {
      await expect(checkoutPage.deliveryAddress).toContainText(line);
      await expect(checkoutPage.billingAddress).toContainText(line);
    }

    await deleteOwnAccount(pages, user, state);
  } finally {
    await cleanupAccount(pages, user, state);
  }
});
