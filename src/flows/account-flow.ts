import { expect } from '@playwright/test';
import type { AccountPage } from '../pages/auth/AccountPage.js';
import type { LoginPage } from '../pages/auth/LoginPage.js';
import type { RegistrationPage } from '../pages/auth/RegistrationPage.js';
import type { buildRegistrationUser } from '../data/builders/RegistrationBuilder.js';

export type RegistrationUser = ReturnType<typeof buildRegistrationUser>;

export type AccountFlowPages = {
  loginPage: LoginPage;
  registrationPage: RegistrationPage;
  accountPage: AccountPage;
};

export type AccountState = { created: boolean; deleted: boolean };

export function newAccountState(): AccountState {
  return { created: false, deleted: false };
}

/** Signs up a disposable user starting from the login page and ends logged in. */
export async function registerUser(
  { loginPage, registrationPage, accountPage }: AccountFlowPages,
  user: RegistrationUser,
  state: AccountState,
): Promise<void> {
  await expect(loginPage.newUserSignupHeading).toBeVisible();
  await loginPage.signup(user.name, user.email);
  await expect(registrationPage.accountInformationHeading).toBeVisible();
  await registrationPage.fillAccountInformation(
    user.title,
    user.password,
    user.dateOfBirth,
  );
  await registrationPage.fillAddressDetails(user.address);
  await registrationPage.createAccount();
  state.created = true;
  await expect(accountPage.accountCreatedHeading).toBeVisible();
  await accountPage.continue();
  await expect(accountPage.loggedInAsUser).toContainText(user.name);
}

/** Deletes the account owned by this test, logging in first when needed. */
export async function deleteOwnAccount(
  { loginPage, accountPage }: AccountFlowPages,
  user: RegistrationUser,
  state: AccountState,
): Promise<void> {
  if (!(await accountPage.loggedInAsUser.isVisible())) {
    await loginPage.open();
    await loginPage.login(user.email, user.password);
    await expect(accountPage.loggedInAsUser).toBeVisible();
  }
  await accountPage.deleteAccount();
  await expect(accountPage.accountDeletedHeading).toBeVisible();
  state.deleted = true;
  await accountPage.continue();
}

export async function cleanupAccount(
  pages: AccountFlowPages,
  user: RegistrationUser,
  state: AccountState,
): Promise<void> {
  if (state.created && !state.deleted) {
    await deleteOwnAccount(pages, user, state);
  }
}
