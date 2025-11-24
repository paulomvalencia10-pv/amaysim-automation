import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { PlanPage } from '../pages/PlanPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { PaymentPage } from '../pages/PaymentPage';
import { customerData, cardDeclined, address } from '../testData/customerData';

test('Declined card shows payment failure message', async ({ page }) => {
  const homePage = new HomePage(page);
  const planPage = new PlanPage(page);
  const checkoutPage = new CheckoutPage(page);
  const paymentPage = new PaymentPage(page);

  await homePage.goto('');
  await homePage.hoverSimPlans();
  await homePage.click7DayPlans();

  await planPage.verifyPlanPage();
  await planPage.clickBuyNow();

  await checkoutPage.waitForCheckoutReady();
  await checkoutPage.pickNewNumber();
  await checkoutPage.choosePhysicalSim();
  await checkoutPage.checkout();

  await checkoutPage.selectNewCustomer();
  await checkoutPage.enterPersonalDetails(customerData);
  await checkoutPage.enterAddress(address);
  await checkoutPage.setDeliverySameAsResidential();

  await paymentPage.chooseCardPayment();
  await paymentPage.enterCardDetails(cardDeclined);
  await paymentPage.acknowledgeTerms();
  await paymentPage.payNow();

  await paymentPage.expectDeclinedMessage();
});
