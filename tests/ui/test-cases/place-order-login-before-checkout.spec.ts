import { test, expect } from '../../../src/fixtures/test.js';
import { buildRegistrationUser } from '../../../src/data/builders/RegistrationBuilder.js';
import { checkoutTestData } from '../../../src/data/test-data/checkout.data.js';
import {
  cleanupAccount,
  deleteOwnAccount,
  newAccountState,
  registerUser,
} from '../../../src/flows/account-flow.js';

test('TC 16 - place order and login before checkout', async ({
  homePage,
  productsPage,
  cartPage,
  loginPage,
  registrationPage,
  accountPage,
  checkoutPage,
  paymentPage,
  page,
}) => {
  const user = buildRegistrationUser();
  const state = newAccountState();
  const pages = { loginPage, registrationPage, accountPage };

  await homePage.open();
  await expect(homePage.logo).toBeVisible();

  try {
    // Precondition: a disposable registered account owned by this test.
    await homePage.openSignupLogin();
    await registerUser(pages, user, state);
    await accountPage.logout();
    await expect(loginPage.loginToAccountHeading).toBeVisible();

    await loginPage.login(user.email, user.password);
    await expect(accountPage.loggedInAsUser).toContainText(user.name);

    await homePage.openProducts();
    await productsPage.addProductToCart(0);
    await productsPage.openCartFromModal();
    await expect(page).toHaveURL(/\/view_cart/);
    await expect(cartPage.cartInfoTable).toBeVisible();

    await cartPage.proceedToCheckout();
    await expect(checkoutPage.addressDetailsHeading).toBeVisible();
    await expect(checkoutPage.reviewOrderHeading).toBeVisible();
    await expect(checkoutPage.orderRows).toHaveCount(1);

    await checkoutPage.placeOrder(checkoutTestData.comment);
    await paymentPage.fillPaymentDetails(checkoutTestData.payment);
    await paymentPage.payAndConfirm();
    await expect(paymentPage.orderPlacedHeading).toBeVisible();
    await expect(paymentPage.orderConfirmedMessage).toBeVisible();

    await deleteOwnAccount(pages, user, state);
  } finally {
    await cleanupAccount(pages, user, state);
  }
});
