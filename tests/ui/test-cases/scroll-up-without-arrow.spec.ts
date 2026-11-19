import { test, expect } from '../../../src/fixtures/test.js';
import { catalogTestData } from '../../../src/data/test-data/catalog.data.js';

test('TC 26 - user can scroll up without the arrow button', async ({ homePage }) => {
  await homePage.open();
  await expect(homePage.logo).toBeVisible();

  await homePage.scrollToBottom();
  await expect(homePage.subscription.heading).toBeVisible();

  await homePage.scrollToTop();

  await expect(homePage.heroHeading).toHaveText(catalogTestData.heroText);
  await expect(homePage.heroHeading).toBeInViewport();
});
