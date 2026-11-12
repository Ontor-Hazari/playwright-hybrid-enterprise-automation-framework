import type { Locator, Page } from '@playwright/test';
import { BasePage } from '../base/BasePage.js';

export class ContactUsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private get contactSection(): Locator {
    return this.page.locator('#contact-page');
  }

  get heading(): Locator {
    return this.page.getByRole('heading', { name: 'Get In Touch', level: 2 });
  }

  get nameInput(): Locator {
    return this.page.getByRole('textbox', { name: 'Name' });
  }

  get emailInput(): Locator {
    return this.page.getByRole('textbox', { name: 'Email', exact: true });
  }

  get subjectInput(): Locator {
    return this.page.getByRole('textbox', { name: 'Subject' });
  }

  get messageInput(): Locator {
    return this.page.getByRole('textbox', { name: 'Your Message Here' });
  }

  private get fileInput(): Locator {
    return this.page.locator('input[type="file"]');
  }

  get submitButton(): Locator {
    return this.page.getByRole('button', { name: 'Submit' });
  }

  get successMessage(): Locator {
    return this.contactSection.getByText(
      'Success! Your details have been submitted successfully.',
      { exact: true },
    );
  }

  get homeButton(): Locator {
    return this.contactSection.getByRole('link', { name: /Home/ });
  }

  async fillContactForm(
    name: string,
    email: string,
    subject: string,
    message: string,
  ): Promise<void> {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.subjectInput.fill(subject);
    await this.messageInput.fill(message);
  }

  async uploadFile(filePath: string): Promise<void> {
    await this.fileInput.setInputFiles(filePath);
  }

  async submit(): Promise<void> {
    await this.submitButton.click();
  }
}
