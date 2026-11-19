import { test, expect } from '../../../../src/fixtures/test.js';
import { subscriptionTestData } from '../../../../src/data/test-data/subscription.data.js';
import { buildSubscriptionEmail } from '../../../../src/data/builders/SubscriptionBuilder.js';

test('TC 11 - verify subscription in cart page @subscription', async ({
  homePage,
  cartPage,
  page,
}) => {
  await homePage.open();
  await expect(homePage.logo).toBeVisible();
  await expect(page).toHaveTitle('Automation Exercise');

  await homePage.openCart();
  await expect(page).toHaveURL('https://automationexercise.com/view_cart');

  await cartPage.subscription.scrollToFooter();
  await expect(cartPage.subscription.heading).toBeVisible();

  await cartPage.subscription.subscribe(buildSubscriptionEmail());

  await expect(cartPage.subscription.successMessage).toBeVisible();
  await expect(cartPage.subscription.successMessage).toHaveText(
    subscriptionTestData.successMessage,
  );
});
