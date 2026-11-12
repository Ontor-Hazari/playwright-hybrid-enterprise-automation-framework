import type { Locator, Page } from '@playwright/test';
import { BasePage } from '../base/BasePage.js';

type DateOfBirth = {
  day: string;
  month: string;
  year: string;
};

type AddressDetails = {
  firstName: string;
  lastName: string;
  company: string;
  address: string;
  address2: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobileNumber: string;
};

export class RegistrationPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get accountInformationHeading(): Locator {
    return this.page.getByRole('heading', {
      name: 'Enter Account Information',
      exact: true,
    });
  }

  get accountNameInput(): Locator {
    return this.page.getByRole('textbox', { name: 'Name *', exact: true });
  }

  get accountEmailInput(): Locator {
    return this.page.getByRole('textbox', { name: 'Email *' });
  }

  get createAccountButton(): Locator {
    return this.page.getByRole('button', { name: 'Create Account' });
  }

  async fillAccountInformation(
    title: 'Mr.' | 'Mrs.',
    password: string,
    dateOfBirth: DateOfBirth,
  ): Promise<void> {
    await this.page.getByRole('radio', { name: title }).check();
    await this.page.getByRole('textbox', { name: 'Password *' }).fill(password);
    await this.page.locator('#days').selectOption({ label: dateOfBirth.day });
    await this.page.locator('#months').selectOption({ label: dateOfBirth.month });
    await this.page.locator('#years').selectOption({ label: dateOfBirth.year });
    await this.page
      .getByRole('checkbox', { name: 'Sign up for our newsletter!' })
      .check();
    await this.page
      .getByRole('checkbox', {
        name: 'Receive special offers from our partners!',
      })
      .check();
  }

  async fillAddressDetails(details: AddressDetails): Promise<void> {
    await this.page.getByRole('textbox', { name: 'First name *' }).fill(details.firstName);
    await this.page.getByRole('textbox', { name: 'Last name *' }).fill(details.lastName);
    await this.page
      .getByRole('textbox', { name: 'Company', exact: true })
      .fill(details.company);
    await this.page
      .getByRole('textbox', {
        name: 'Address * (Street address, P.O. Box, Company name, etc.)',
        exact: true,
      })
      .fill(details.address);
    await this.page.getByRole('textbox', { name: 'Address 2' }).fill(details.address2);
    await this.page
      .getByRole('combobox', { name: 'Country *' })
      .selectOption({ label: details.country });
    await this.page.getByRole('textbox', { name: 'State *' }).fill(details.state);
    await this.page.locator('#city').fill(details.city);
    await this.page.locator('#zipcode').fill(details.zipcode);
    await this.page
      .getByRole('textbox', { name: 'Mobile Number *' })
      .fill(details.mobileNumber);
  }

  async createAccount(): Promise<void> {
    await this.createAccountButton.click();
  }
}
