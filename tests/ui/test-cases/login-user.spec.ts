import { test, expect } from '../../../src/fixtures/test.js';
import { buildRegistrationUser } from '../../../src/data/builders/RegistrationBuilder.js';

test('TC 2 - user can log in with valid credentials and delete their account', async ({
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
  await expect(loginPage.loginToAccountHeading).toBeVisible();
  await expect(loginPage.newUserSignupHeading).toBeVisible();
  await loginPage.signup(user.name, user.email);

  await expect(registrationPage.accountInformationHeading).toBeVisible();
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

    await accountPage.logout();
    await expect(loginPage.loginToAccountHeading).toBeVisible();

    await loginPage.login(user.email, user.password);
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
        if (!(await accountPage.loggedInAsUser.isVisible())) {
          if (!(await loginPage.loginToAccountHeading.isVisible())) {
            await homePage.openSignupLogin();
          }
          await loginPage.login(user.email, user.password);
        }
        await accountPage.deleteAccount();
        await expect(accountPage.accountDeletedHeading).toBeVisible();
        await accountPage.continue();
      }
    }
  }
});
