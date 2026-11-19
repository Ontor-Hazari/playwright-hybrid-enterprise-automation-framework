import { test, expect } from '../../../src/fixtures/test.js';
import { buildRegistrationUser } from '../../../src/data/builders/RegistrationBuilder.js';
import { checkoutTestData } from '../../../src/data/test-data/checkout.data.js';
import {
  cleanupAccount,
  deleteOwnAccount,
  newAccountState,
  registerUser,
} from '../../../src/flows/account-flow.js';

test('TC 24 - user can download the invoice after purchase', async ({
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

  await homePage.openProducts();
  await productsPage.addProductToCart(0);
  await productsPage.openCartFromModal();
  await expect(page).toHaveURL(/\/view_cart/);
  await expect(cartPage.cartInfoTable).toBeVisible();

  await cartPage.proceedToCheckout();
  await cartPage.openRegisterLogin();

  try {
    await registerUser(pages, user, state);

    await homePage.openCart();
    await cartPage.proceedToCheckout();
    await expect(checkoutPage.addressDetailsHeading).toBeVisible();
    await expect(checkoutPage.reviewOrderHeading).toBeVisible();

    await checkoutPage.placeOrder(checkoutTestData.comment);
    await paymentPage.fillPaymentDetails(checkoutTestData.payment);
    await paymentPage.payAndConfirm();
    await expect(paymentPage.orderPlacedHeading).toBeVisible();
    await expect(paymentPage.orderConfirmedMessage).toBeVisible();

    const download = await paymentPage.downloadInvoice();
    expect(download.suggestedFilename()).toMatch(/invoice/i);
    expect(await download.failure()).toBeNull();

    await paymentPage.continue();
    await expect(page).toHaveURL('https://automationexercise.com/');

    await deleteOwnAccount(pages, user, state);
  } finally {
    await cleanupAccount(pages, user, state);
  }
});
