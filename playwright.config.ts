import { defineConfig, devices } from '@playwright/test';

const baseURL = process.env.BASE_URL || 'https://www.amaysim.com.au/';

export default defineConfig({
  timeout: 120000,
  testDir: 'tests',
  use: {
    baseURL,
    headless: false,
    actionTimeout: 10_000,
    navigationTimeout: 30_000,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    video: 'retain-on-failure'
  },
  projects: [
    {
        //name: 'Chrome',
        //use: { browserName: 'chromium', channel: 'chrome' }
      name: 'Chrome',
      use: {
        channel: 'chrome', // this runs Chrome (not just Chromium)
        headless: false,
        screenshot: 'only-on-failure',  // ensure it's also set per project
        trace: 'on-first-retry',
        video: 'retain-on-failure',
        launchOptions: {
          slowMo: 1000,
          args: ['--start-maximized'],
        },
      },
    },
    {
      name: 'Webkit',
      use: { ...devices['Desktop Safari'] }
    }
  ]
});