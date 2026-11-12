import { test, expect } from '../../../src/fixtures/test.js';
import { buildRegistrationUser } from '../../../src/data/builders/RegistrationBuilder.js';

test('TC 1 - user can register and delete their account', async ({
  homePage,
  loginPage,
  registrationPage,
  accountPage,
  page,
}) => {
  const user = buildRegistrationUser();
  let accountCreated = false;
  let accountDeleted = false;

  await homePage.open();
  await expect(homePage.logo).toBeVisible();
  await expect(page).toHaveTitle('Automation Exercise');

  await homePage.openSignupLogin();
  await expect(loginPage.newUserSignupHeading).toBeVisible();
  await loginPage.signup(user.name, user.email);

  await expect(registrationPage.accountInformationHeading).toBeVisible();
  await expect(registrationPage.accountNameInput).toHaveValue(user.name);
  await expect(registrationPage.accountEmailInput).toHaveValue(user.email);

  await registrationPage.fillAccountInformation(
    user.title,
    user.password,
    user.dateOfBirth,
  );
  await registrationPage.fillAddressDetails(user.address);

  try {
    await registrationPage.createAccount();
    accountCreated = true;

    await expect(accountPage.accountCreatedHeading).toBeVisible();
    await accountPage.continue();
    await expect(accountPage.loggedInAsUser).toContainText(user.name);

    await accountPage.deleteAccount();
    accountDeleted = true;
    await expect(accountPage.accountDeletedHeading).toBeVisible();
    await accountPage.continue();
    await expect(homePage.logo).toBeVisible();
  } finally {
    if (accountCreated && !accountDeleted) {
      if (await accountPage.accountDeletedHeading.isVisible()) {
        await accountPage.continue();
      } else {
        if (await accountPage.accountCreatedHeading.isVisible()) {
          await accountPage.continue();
        }
        await accountPage.deleteAccount();
        await expect(accountPage.accountDeletedHeading).toBeVisible();
        await accountPage.continue();
      }
    }
  }
});
