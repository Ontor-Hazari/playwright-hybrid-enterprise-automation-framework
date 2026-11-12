import { test, expect } from '../../../src/fixtures/test.js';
import { buildUnregisteredLoginCredentials } from '../../../src/data/builders/LoginCredentialsBuilder.js';

test('TC 3 - user sees an error with incorrect login credentials', async ({
  homePage,
  loginPage,
  page,
}) => {
  const credentials = buildUnregisteredLoginCredentials();

  await homePage.open();
  await expect(homePage.logo).toBeVisible();
  await expect(page).toHaveTitle('Automation Exercise');

  await homePage.openSignupLogin();
  await expect(loginPage.loginToAccountHeading).toBeVisible();

  await loginPage.login(credentials.email, credentials.password);

  await expect(loginPage.loginErrorMessage).toBeVisible();
});
