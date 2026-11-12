import { test, expect } from '../../../src/fixtures/test.js';

test('TC 7 - verify the Test Cases page', async ({
  homePage,
  testCasesPage,
  page,
}) => {
  await homePage.open();
  await expect(homePage.logo).toBeVisible();
  await expect(page).toHaveTitle('Automation Exercise');

  await homePage.openTestCases();

  await expect(page).toHaveURL('https://automationexercise.com/test_cases');
  await expect(page).toHaveTitle(
    'Automation Practice Website for UI Testing - Test Cases',
  );
  await expect(testCasesPage.heading).toBeVisible();
});
