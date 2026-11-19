import { test, expect } from '../../../../src/fixtures/test.js';
import { buildRegistrationUser } from '../../../../src/data/builders/RegistrationBuilder.js';
import { catalogTestData } from '../../../../src/data/test-data/catalog.data.js';
import {
  cleanupAccount,
  deleteOwnAccount,
  newAccountState,
  registerUser,
} from '../../../../src/flows/account-flow.js';

test('TC 20 - searched products stay in the cart after login @cart', async ({
  homePage,
  productsPage,
  cartPage,
  loginPage,
  registrationPage,
  accountPage,
  page,
}) => {
  const user = buildRegistrationUser();
  const state = newAccountState();
  const pages = { loginPage, registrationPage, accountPage };

  await homePage.open();

  try {
    // Precondition: a disposable registered account owned by this test.
    await homePage.openSignupLogin();
    await registerUser(pages, user, state);
    await accountPage.logout();
    await expect(loginPage.loginToAccountHeading).toBeVisible();

    await homePage.openProducts();
    await expect(productsPage.allProductsHeading).toBeVisible();

    await productsPage.searchProduct(catalogTestData.search.term);
    await expect(productsPage.searchedProductsHeading).toBeVisible();
    await expect(productsPage.searchResults.first()).toBeVisible();

    const names = (await productsPage.productNames.allInnerTexts()).map((n) => n.trim());
    expect(names.length).toBeGreaterThan(0);
    await expect(productsPage.searchResults).toHaveCount(names.length);

    await productsPage.addAllProductsToCart();

    await homePage.openCart();
    await expect(page).toHaveURL(/\/view_cart/);
    for (const name of names) {
      await expect(cartPage.productRow(name)).toBeVisible();
    }

    await homePage.openSignupLogin();
    await loginPage.login(user.email, user.password);
    await expect(accountPage.loggedInAsUser).toContainText(user.name);

    await homePage.openCart();
    await expect(page).toHaveURL(/\/view_cart/);
    for (const name of names) {
      await expect(cartPage.productRow(name)).toBeVisible();
    }

    await deleteOwnAccount(pages, user, state);
  } finally {
    await cleanupAccount(pages, user, state);
  }
});
