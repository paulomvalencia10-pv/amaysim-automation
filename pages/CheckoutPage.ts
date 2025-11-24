import { Page, Locator, expect } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async waitForCheckoutReady() {
    console.log('Waiting for checkout page to finish loading...');

    const unlimitedLabel = this.page.getByText(/UNLIMITED\s+10GB/i).first();
    const mobileNumberLabel = this.page.getByText(/your mobile number/i);

    await expect(unlimitedLabel).toBeVisible({ timeout: 20000 });
    await expect(mobileNumberLabel).toBeVisible({ timeout: 20000 });

    console.log('Checkout page fully loaded.');
  }


  async pickNewNumber() {
    const pickNewNumberLabel = this.page.locator('label', { hasText: 'pick a new number' }).first();
    const radioInput = pickNewNumberLabel.locator('input[type="radio"]');

    await expect(pickNewNumberLabel).toBeVisible({ timeout: 15000 });

    const isChecked = await radioInput.isChecked();

    if (!isChecked) {
      await pickNewNumberLabel.click();
      console.log('Picked a new number.');
    } else {
      console.log('Pick a new number was already selected.');
    }
  }

  async choosePhysicalSim() {
    const physicalSim = this.page.getByText('Physical SIM').locator('..').locator('..');

    await physicalSim.scrollIntoViewIfNeeded();
    await expect(physicalSim).toBeVisible({ timeout: 20000 });

    const radio = physicalSim.locator('input[type="radio"]');

    const isChecked = await radio.isChecked();
    if (!isChecked) {
      console.log('Selecting Physical SIM...');
      await radio.check({ force: true });
    } else {
      console.log('Physical SIM already selected.');
    }
  }

  async checkout() {
    console.log('Attempting to click Checkout...');

    const checkoutBtn = this.page.getByTestId('product-checkout-button');

    await checkoutBtn.scrollIntoViewIfNeeded();
    await expect(checkoutBtn).toBeVisible({ timeout: 10000 });

    await checkoutBtn.waitFor({ state: 'visible' });

    await checkoutBtn.click();

    console.log('Clicked Checkout.');
  }


  async selectNewCustomer() {
    console.log("Validating new customer selection...");

    const header = this.page.locator('[data-already-with-amaysim]');
    await expect(header).toBeVisible({ timeout: 10000 });
    console.log('Header "already with amaysim?" is visible.');

    const newCustomer = this.page.getByTestId('existing-user-no');   // "I'm new to amaysim"
    const existingCustomer = this.page.getByTestId('existing-user-yes'); // "I'm already with amaysim"

    await expect(newCustomer).toBeVisible();
    await expect(existingCustomer).toBeVisible();

    const isChecked = await newCustomer.isChecked();

    if (isChecked) {
      console.log('"I am new to amaysim" is already selected. No action needed.');
      return;
    }
    await newCustomer.check();
    console.log('Selected: "I am new to amaysim".');
  }

  async enterPersonalDetails(data: {
    firstName: string;
    lastName: string;
    dob: string;
    email: string;
    password: string;
    contactNumber: string;
  }) {
    console.log('Entering customer details...');

    const fields: { locator: Locator; value: string; name: string }[] = [
      { locator: this.page.getByRole('textbox', { name: 'first name' }), value: data.firstName, name: 'First Name' },
      { locator: this.page.getByRole('textbox', { name: 'last name' }), value: data.lastName, name: 'Last Name' },
      { locator: this.page.getByRole('textbox', { name: 'date of birth' }), value: data.dob, name: 'Date of Birth' },
      { locator: this.page.getByRole('textbox', { name: 'email address' }), value: data.email, name: 'Email Address' },
      { locator: this.page.getByRole('textbox', { name: 'create a password' }), value: data.password, name: 'Password' },
      { locator: this.page.getByRole('textbox', { name: 'contact number' }), value: data.contactNumber, name: 'Contact Number' },
    ];

    for (const field of fields) {
      await expect(field.locator).toBeVisible({ timeout: 15000 });
      await field.locator.scrollIntoViewIfNeeded();
      await field.locator.fill(field.value);
      console.log(`Filled ${field.name}`);
      await this.page.waitForTimeout(100);
    }

    console.log('All personal details entered.');
  }

  async enterAddress(address: string) {
    console.log('Entering address...');

    const addressInput = this.page.getByRole('textbox', { name: 'home or work address' });
    
    await expect(addressInput).toBeVisible({ timeout: 15000 });
    await addressInput.scrollIntoViewIfNeeded();

    await addressInput.fill(address);

    const suggestion = this.page.getByRole('option', { name: address }).first();
    await expect(suggestion).toBeVisible({ timeout: 15000 });

    await suggestion.click();

    console.log(`Address selected: ${address}`);
  }

  async setDeliverySameAsResidential() {
    const deliveryCheckbox = this.page.getByLabel('My residential address is the same');

    await expect(deliveryCheckbox).toBeVisible({ timeout: 10000 });
    await deliveryCheckbox.scrollIntoViewIfNeeded();
    await deliveryCheckbox.check();

    console.log('Set delivery same as residential.');
  }

  // async enterCardDetails(card: { number: string; expiry: string; cvv: string }) {
  //   console.log('Entering card details...');

  //   // Stripe iframe
  //   const frame = await this.page.frameLocator('iframe[name="__privateStripeFrame2505"]');
  //   const cardInput = frame.getByTestId('card');

  //   await expect(cardInput).toBeVisible({ timeout: 15000 });
  //   await cardInput.scrollIntoViewIfNeeded();

  //   // Fill card details in one string format (depends on how Stripe input is configured)
  //   await cardInput.fill(`${card.number} ${card.expiry} ${card.cvv}`);

  //   console.log('Card details entered.');
  // }

  async scrollIntoView(selectorOrLocator: string | Locator) {
    const loc = typeof selectorOrLocator === 'string'
      ? this.page.locator(selectorOrLocator)
      : selectorOrLocator;

    await loc.scrollIntoViewIfNeeded();
  }

}
