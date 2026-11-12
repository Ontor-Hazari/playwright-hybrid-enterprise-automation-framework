import { fileURLToPath } from 'node:url';
import { test, expect } from '../../../src/fixtures/test.js';
import { contactUsTestData } from '../../../src/data/test-data/contact-us.data.js';

const attachmentPath = fileURLToPath(
  new URL('../../fixtures/contact-us-upload.txt', import.meta.url),
);

test('TC 6 - user can submit the Contact Us form', async ({
  homePage,
  contactUsPage,
  page,
}) => {
  await homePage.open();
  await expect(homePage.logo).toBeVisible();
  await expect(page).toHaveTitle('Automation Exercise');

  await homePage.openContactUs();
  await expect(contactUsPage.heading).toBeVisible();

  await contactUsPage.fillContactForm(
    contactUsTestData.name,
    contactUsTestData.email,
    contactUsTestData.subject,
    contactUsTestData.message,
  );
  await contactUsPage.uploadFile(attachmentPath);

  page.once('dialog', (dialog) => dialog.accept());
  await contactUsPage.submit();

  await expect(contactUsPage.successMessage).toBeVisible();
  await contactUsPage.homeButton.click();
  await expect(page).toHaveURL('https://automationexercise.com/');
  await expect(homePage.logo).toBeVisible();
});
