import { Page, expect } from '@playwright/test';
import { getBaseUrl } from '../config/envConfig';

export class HomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(path: string) {
    const url = `${getBaseUrl()}${path || ''}`;
    console.log(`Navigating to ${url}`);
    await this.page.goto(url);

    const headerLogo = this.page.locator('header.navbar a.logo');
    await expect(headerLogo).toBeVisible({ timeout: 30000 });
    console.log('Home Page loaded.');
  }

  async hoverSimPlans() {
    const simPlansMenu = this.page.getByRole('link', { name: 'SIM plans' });
    await simPlansMenu.hover();
    console.log('Hovered over SIM Plans.');
  }

  async click7DayPlans() {
    const sevenDayPlan = this.page.getByRole('link', { name: '7 day SIM plans' });
    await sevenDayPlan.click();
    console.log('Clicked 7 day SIM plans.');
  }
}
