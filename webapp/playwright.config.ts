import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [process.env.CI ? ['github'] : ['list', { printSteps: true }], ['html', { open: 'never' }]],
  use: { screenshot: 'on', trace: 'on-first-retry', baseURL: 'http://localhost:3000' },
  projects: [
    { name: 'desktop', use: devices['Desktop Chrome'] },
    { name: 'mobile', use: devices['iPhone X'] },
  ],
  webServer: [
    { command: 'npm run dev:anvil', url: 'http://localhost:8545' },
    { command: 'npm run e2e:next', url: 'http://localhost:3000', timeout: 666_666 },
  ],
  expect: { timeout: 6_666 },
  timeout: 66_666,
});
