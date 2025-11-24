import { Page, expect } from '@playwright/test';

export class PlanPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async verifyPlanPage() {
    console.log('Verifying 7-day SIM plans page.');

    const heading = this.page.getByRole('heading', { name: /7 day sim plans/i });
    await expect(heading).toBeVisible({ timeout: 15000 });
    console.log('Plan page heading is visible.');

    const buyNowButton = this.page.getByRole('link', { name: 'Buy now' });
    await buyNowButton.scrollIntoViewIfNeeded();
    await expect(buyNowButton).toBeVisible({ timeout: 15000 });
    console.log('Buy Now button is visible.');
  }

  async clickBuyNow() {
    console.log('Clicking Buy Now button.');
    await this.page.getByRole('link', { name: 'Buy now' }).click();
  }
}
