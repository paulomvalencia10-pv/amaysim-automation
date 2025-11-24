[README.md](https://github.com/user-attachments/files/23708798/README.md)
# Amaysim Automation Test Suite (Playwright + TypeScript)

This repository contains an automated end-to-end test suite for
validating the Amaysim purchase flow, including positive and negative
card payment scenarios. The project is built using **Playwright**,
**TypeScript**, and supports execution across **multiple environments**
(Production, Dev, QA, UAT, etc.).

------------------------------------------------------------------------

## Features

-   Playwright + TypeScript test automation\
-   Environment-based URL switching (`TEST_ENV=dev`, `TEST_ENV=staging`, `TEST_ENV=prod`,
    etc.)\
-   Modular Page Object Model (POM) implementation\
-   Stripe iframe handling (card number, expiry, CVV)\
-   Negative test validation (declined card flow)\
-   Ready for CI/CD pipeline execution\
-   Easily executable via CLI or CI agents

------------------------------------------------------------------------

## Project Structure

    amaysim-automation/
    │
    ├── pages/                # Page Object Models
    │   ├── HomePage.ts
    │   ├── PaymentPage.ts
    │   └── ...
    │
    ├── tests/                # Test specs
    │   └── purchase-failed-payment.spec.ts
    │
    ├── testData/             # Test data files
    │   ├── customerData.ts
    │   └── envConfig.ts
    │
    ├── utils/                # Helpers and utilities
    │   └── ...
    │
    ├── playwright.config.ts  # Playwright global config
    ├── package.json
    └── README.md

------------------------------------------------------------------------

## Installation

### 1. Clone the repository:

``` bash
git clone https://github.com/paulomvalencia10-pv/amaysim-automation.git
cd amaysim-automation
```

### 2. Install dependencies:

``` bash
npm install
```

### 3. Install Playwright browsers:

``` bash
npx playwright install
```

------------------------------------------------------------------------

## Running Tests

### **Run using Production (default):**

``` bash
npx playwright test
```

### **Run using Dev environment:**

``` bash
TEST_ENV=dev npx playwright test
```

### **Run a single test file:**

``` bash
npx playwright test tests/purchase-failed-payment.spec.ts
```

### **Run using a specific browser:**

``` bash
npx playwright test --project=Chrome
```

------------------------------------------------------------------------

## Environment Configuration

Environments are configured in:

    testData/envConfig.ts

Example:

``` ts
export const envConfig = {
  prod: 'https://www.amaysim.com.au/',
  dev: 'https://dev.amaysim.com.au/',
  uat: 'https://staging.amaysim.com.au/'
};

export function getBaseUrl() {
  return envConfig[process.env.TEST_ENV || 'prod'];
}
```

------------------------------------------------------------------------

## Sample Command for CI/CD

``` bash
npm ci
npx playwright install --with-deps
TEST_ENV=dev npx playwright test --reporter=list
```

------------------------------------------------------------------------

## Playwright Report

Generate an interactive HTML report:

``` bash
npx playwright show-report
```
