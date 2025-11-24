import { Page, expect } from '@playwright/test';

export class PaymentPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async chooseCardPayment() {
    console.log('Validating payment method label.');

    const label = this.page.locator('span.css-cj8r64', { hasText: 'Choose a payment method' });
    await expect(label).toBeVisible({ timeout: 15000 });

    console.log('Payment method label is visible.');

    await this.page.waitForTimeout(2000);

    const frames = this.page.frames();
    let paymentFrame = null;

    for (const frame of frames) {
      const cardTab = frame.getByRole('tab', { name: /Card/i });
      if (await cardTab.count() > 0) {
        paymentFrame = frame;
        break;
      }
    }

    if (!paymentFrame) {
      console.log('Frames:', frames.map(f => f.name()));
      throw new Error('Could not find Stripe iframe that contains card tab');
    }

    console.log('Payment iframe found:', paymentFrame.name());

    const cardTab = paymentFrame.getByRole('tab', { name: /Card/i });

    await cardTab.waitFor({ state: 'attached', timeout: 15000 });

    // Click using JS to bypass scroll/visibility issues
    await paymentFrame.evaluate(() => {
      const tab = document.querySelector('[role="tab"][aria-controls*="card"]');
      if (tab) (tab as HTMLElement).click();
    });

    console.log('Clicked Card tab.');
  }


  async enterCardDetails(card: any) {
    console.log('Entering card details.');

    await this.page.waitForTimeout(2000);

    // Find the iframe containing the card number textbox
    const frames = this.page.frames();
    let paymentFrame = null;

    for (const frame of frames) {
      const cardNumber = frame.getByRole('textbox', { name: 'Card number' });
      if (await cardNumber.count() > 0) {
        paymentFrame = frame;
        break;
      }
    }

    if (!paymentFrame) {
      throw new Error('Could not find Stripe card input iframe');
    }

    console.log('Card input iframe:', paymentFrame.name());

    // Get locators inside the iframe
    const cardNumber = paymentFrame.getByRole('textbox', { name: 'Card number' });
    const expiry = paymentFrame.getByRole('textbox', { name: 'Expiration date MM / YY' });
    const cvv = paymentFrame.getByRole('textbox', { name: 'Security code' });

    // Fill fields using type() to avoid Stripe masking issues
    await cardNumber.click();
    await cardNumber.pressSequentially(card.number, { delay: 50 });

    await expiry.click();
    await expiry.pressSequentially(card.expiry, { delay: 50 });

    await cvv.click();
    await cvv.pressSequentially(card.cvv, { delay: 50 });

    console.log('Card details entered.');
  }

  async acknowledgeTerms() {
    // Locate the main label containing the checkbox
    const label = this.page.locator('label.css-1ne7y3i', {
      hasText: 'I acknowledge that I have read'
    });

    // Scroll it into view
    await label.scrollIntoViewIfNeeded();

    // Click the styled checkbox inside the label
    const checkbox = label.locator('div.css-1417z9a');
    await expect(checkbox).toBeVisible({ timeout: 10000 });
    await checkbox.click({ force: true });

    console.log('Acknowledged terms.');
  }

  async payNow() {
    const payNowButton = this.page.getByRole('button', { name: 'Pay now' });
    await payNowButton.scrollIntoViewIfNeeded();
    await payNowButton.click();
    console.log('Clicked Pay Now.');
  }

  async expectDeclinedMessage() {
    // Locate by part of the visible message
    const declinedMsg = this.page.getByText('Your attempt to pay via Credit Card has failed', { exact: false });

    // Scroll into view
    await declinedMsg.scrollIntoViewIfNeeded();

    // Assert visibility
    await expect(declinedMsg).toBeVisible({ timeout: 10000 });

    console.log('Payment declined message is displayed.');
  }

}
