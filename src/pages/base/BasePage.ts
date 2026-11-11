import type { Page } from '@playwright/test';
export abstract class BasePage {
  constructor(protected readonly page: Page) {}
  protected async visit(path: string): Promise<void> { await this.page.goto(path); }
}
