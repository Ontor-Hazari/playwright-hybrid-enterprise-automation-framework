import { test, expect } from '../../../src/fixtures/test.js';
import { catalogTestData } from '../../../src/data/test-data/catalog.data.js';
import { buildReviewEmail } from '../../../src/data/builders/ReviewBuilder.js';

test('TC 21 - user can add a review on a product', async ({
  homePage,
  productsPage,
  productDetailsPage,
  page,
}) => {
  const { name, text, successMessage } = catalogTestData.review;

  await homePage.open();
  await homePage.openProducts();
  await expect(productsPage.allProductsHeading).toBeVisible();

  await productsPage.viewFirstProduct();
  await expect(page).toHaveURL(/\/product_details\/\d+/);
  await expect(productDetailsPage.writeYourReviewHeading).toBeVisible();

  await productDetailsPage.submitReview(name, buildReviewEmail(), text);

  await expect(productDetailsPage.reviewSuccessMessage).toBeVisible();
  await expect(productDetailsPage.reviewSuccessMessage).toHaveText(successMessage);
});
