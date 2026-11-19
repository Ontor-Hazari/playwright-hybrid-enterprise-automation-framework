import { test, expect } from '../../../../src/fixtures/test.js';
import { subscriptionTestData } from '../../../../src/data/test-data/subscription.data.js';
import { buildSubscriptionEmail } from '../../../../src/data/builders/SubscriptionBuilder.js';

test('TC 10 - verify subscription in home page @subscription', async ({ homePage, page }) => {
  await homePage.open();
  await expect(homePage.logo).toBeVisible();
  await expect(page).toHaveTitle('Automation Exercise');

  await homePage.subscription.scrollToFooter();
  await expect(homePage.subscription.heading).toBeVisible();

  await homePage.subscription.subscribe(buildSubscriptionEmail());

  await expect(homePage.subscription.successMessage).toBeVisible();
  await expect(homePage.subscription.successMessage).toHaveText(
    subscriptionTestData.successMessage,
  );
});
