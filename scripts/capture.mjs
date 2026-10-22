import Chromium, { inflate, setupLambdaEnvironment } from '@sparticuz/chromium';
import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';

await inflate(new URL('../node_modules/@sparticuz/chromium/bin/al2023.tar.br', import.meta.url).pathname);
setupLambdaEnvironment('/tmp/al2023/lib');
const baseURL = process.env.BASE_URL || 'http://127.0.0.1:5173';
const out = new URL('../test-results/visual/', import.meta.url);
await fs.mkdir(out, { recursive: true });
const browser = await chromium.launch({
  executablePath: await Chromium.executablePath(),
  headless: true,
  args: [...Chromium.args.filter((arg) => arg !== '--single-process'), '--no-sandbox'],
});
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const errors = [];
page.on('pageerror', (error) => errors.push(error.message));
page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
await page.goto(baseURL, { waitUntil: 'networkidle' });
await page.locator('.preloader').waitFor({ state: 'detached', timeout: 8000 });
await page.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; });
await page.screenshot({ path: new URL('desktop-01-awakening.png', out).pathname });
for (const [index, id] of ['design', 'anatomy', 'performance', 'aerodynamics', 'racing', 'command', 'reveal'].entries()) {
  await page.evaluate((chapterId) => {
    const section = document.getElementById(chapterId);
    if (!section) return;
    const top = section.getBoundingClientRect().top + window.scrollY;
    window.scrollTo(0, top + window.innerHeight * (['aerodynamics', 'racing', 'command'].includes(chapterId) ? 0.55 : 0.85));
  }, id);
  await page.waitForTimeout(900);
  await page.screenshot({ path: new URL(`desktop-0${index + 2}-${id}.png`, out).pathname });
}
await page.evaluate(() => {
  const section = document.getElementById('reveal');
  if (section) window.scrollTo(0, section.getBoundingClientRect().top + window.scrollY + window.innerHeight * 1.75);
});
await page.waitForTimeout(1000);
await page.screenshot({ path: new URL('desktop-08-reveal-actions.png', out).pathname });

const metrics = await page.evaluate(() => ({
  scrollWidth: document.documentElement.scrollWidth,
  innerWidth: window.innerWidth,
  scrollHeight: document.documentElement.scrollHeight,
  chapters: document.querySelectorAll('main > section').length,
  pinSpacers: document.querySelectorAll('.pin-spacer').length,
}));
console.log(JSON.stringify({ metrics, errors }, null, 2));
const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
mobile.on('pageerror', (error) => errors.push(error.message));
mobile.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
await mobile.goto(baseURL, { waitUntil: 'networkidle' });
await mobile.locator('.preloader').waitFor({ state: 'detached', timeout: 8000 });
await mobile.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; });
await mobile.screenshot({ path: new URL('mobile-01-awakening.png', out).pathname });
for (const id of ['design', 'anatomy', 'performance', 'command', 'reveal']) {
  await mobile.evaluate((chapterId) => {
    const section = document.getElementById(chapterId);
    if (!section) return;
    const top = section.getBoundingClientRect().top + window.scrollY;
    window.scrollTo(0, top + window.innerHeight * (chapterId === 'command' ? 0.45 : 0.65));
  }, id);
  await mobile.waitForTimeout(900);
  await mobile.screenshot({ path: new URL(`mobile-${id}.png`, out).pathname });
}
await mobile.evaluate(() => {
  const section = document.getElementById('reveal');
  if (section) window.scrollTo(0, section.getBoundingClientRect().top + window.scrollY + window.innerHeight * 1.35);
});
await mobile.waitForTimeout(1000);
await mobile.screenshot({ path: new URL('mobile-reveal-actions.png', out).pathname });
console.log('mobile', await mobile.evaluate(() => ({ scrollWidth: document.documentElement.scrollWidth, innerWidth: window.innerWidth })), { errors });
await browser.close();
