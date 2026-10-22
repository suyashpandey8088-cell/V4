import { defineConfig } from '@playwright/test';
import Chromium, { inflate, setupLambdaEnvironment } from '@sparticuz/chromium';

await inflate(new URL('./node_modules/@sparticuz/chromium/bin/al2023.tar.br', import.meta.url).pathname);
setupLambdaEnvironment('/tmp/al2023/lib');
const executablePath = await Chromium.executablePath();

export default defineConfig({
  testDir: './tests',
  timeout: 90000,
  expect: { timeout: 12000 },
  fullyParallel: false,
  workers: 1,
  reporter: 'list',
  use: {
    baseURL: 'http://127.0.0.1:5173',
    viewport: { width: 1440, height: 900 },
    headless: true,
    launchOptions: { executablePath, args: [...Chromium.args.filter((arg) => arg !== '--single-process'), '--no-sandbox'] },
    screenshot: 'only-on-failure',
    trace: 'off',
  },
  webServer: {
    command: 'npm run dev -- --port 5173',
    url: 'http://127.0.0.1:5173',
    reuseExistingServer: true,
    timeout: 30000,
  },
});
