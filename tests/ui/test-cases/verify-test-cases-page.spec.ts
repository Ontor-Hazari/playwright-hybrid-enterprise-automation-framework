import { test, expect } from '../../../src/fixtures/test.js';

test('TC 7 - user can navigate to the Test Cases page', async ({
  homePage,
  testCasesPage,
  page,
}) => {
  await homePage.open();
  await expect(homePage.logo).toBeVisible();
  await expect(page).toHaveTitle('Automation Exercise');

  await homePage.openTestCases();

  await expect(page).toHaveURL('https://automationexercise.com/test_cases');
  await expect(testCasesPage.heading).toBeVisible();
});
