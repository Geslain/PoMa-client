import { defineConfig } from '@playwright/test';

export default defineConfig({
  timeout: 30000,
  globalTimeout: 600000,
  reporter: 'html',
  testDir: './tests',
  webServer: {
    command: 'npm run dev',
    port: 3000,
    reuseExistingServer: !process.env.CI,
  },
});
