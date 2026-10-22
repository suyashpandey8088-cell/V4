import { expect, test } from '@playwright/test';

async function openExperience(page: import('@playwright/test').Page) {
  await page.goto('/');
  await expect(page.locator('.preloader')).toHaveCount(0, { timeout: 9000 });
  await page.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; });
}

async function jumpTo(page: import('@playwright/test').Page, id: string, offset = 0) {
  await page.evaluate(({ id, offset }) => {
    const section = document.getElementById(id);
    if (section) window.scrollTo(0, section.getBoundingClientRect().top + window.scrollY + window.innerHeight * offset);
  }, { id, offset });
  await page.waitForTimeout(1100);
}

test('desktop: eight chapters, clean loading, real progress and verified destinations', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
  await openExperience(page);

  await expect(page.locator('main > section')).toHaveCount(8);
  await expect(page.locator('.pin-spacer')).toHaveCount(5);
  await expect(page.locator('h1')).toContainText('NOT BUILT TO FOLLOW.');

  await jumpTo(page, 'design', 0.4);
  const scale = await page.locator('.scroll-progress__bar').evaluate((element) => new DOMMatrixReadOnly(getComputedStyle(element).transform).m11);
  expect(scale).toBeGreaterThan(0.05);
  expect(await page.locator('img[loading="eager"]').evaluateAll((images) => images.every((image) => image.complete && image.naturalWidth > 0))).toBe(true);

  const links = await page.locator('.final-scene__actions a').evaluateAll((anchors) => anchors.map((anchor) => anchor.getAttribute('href')));
  expect(links).toEqual([
    'https://www.ducati.com/gb/en/bikes/panigale/panigale-v4-2027',
    'https://www.ducati.com/gb/en/bikes/panigale/panigale-v4-2027/insights?tab=Tech%20Specs',
  ]);
  expect(errors).toEqual([]);
});

test('chapter menu, keyboard escape and optional sound work', async ({ page }) => {
  await openExperience(page);
  const sound = page.getByRole('button', { name: 'Turn ambient sound on' });
  await expect(sound).toHaveAttribute('aria-pressed', 'false');
  await sound.click();
  await expect(page.getByRole('button', { name: 'Turn ambient sound off' })).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: 'Turn ambient sound off' }).click();
  await expect(page.getByRole('button', { name: 'Turn ambient sound on' })).toHaveAttribute('aria-pressed', 'false');

  await page.getByRole('button', { name: 'Open chapter menu' }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await page.getByRole('button', { name: 'Open chapter menu' }).click();
  await page.locator('.chapter-menu__list button').filter({ hasText: 'Anatomy of a Beast' }).click();
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(page.locator('.chapter-status__title')).toHaveText('Anatomy of a Beast');
});

test('scroll animations reverse and the exploded view reassembles', async ({ page }) => {
  await openExperience(page);
  await jumpTo(page, 'awakening', 2.15);
  await expect(page.locator('.hero-scene__side')).toHaveCSS('opacity', '1');
  await jumpTo(page, 'awakening', 0);
  expect(Number(await page.locator('.hero-scene__side').evaluate((element) => getComputedStyle(element).opacity))).toBeLessThan(0.05);

  await jumpTo(page, 'anatomy', 1.3);
  const separatedX = await page.locator('.exploded-bike__part--tank').evaluate((element) => new DOMMatrixReadOnly(getComputedStyle(element).transform).m41);
  expect(Math.abs(separatedX)).toBeGreaterThan(5);
  await jumpTo(page, 'anatomy', 2.6);
  const assembledX = await page.locator('.exploded-bike__part--tank').evaluate((element) => new DOMMatrixReadOnly(getComputedStyle(element).transform).m41);
  expect(Math.abs(assembledX)).toBeLessThan(1);
  await expect(page.locator('.exploded-bike__base')).toHaveCSS('opacity', '1');
});

test('cockpit explorer and final calls to action are usable', async ({ page }) => {
  await openExperience(page);
  await jumpTo(page, 'command', 0.9);
  await page.locator('.cockpit-scene__systems button').filter({ hasText: 'DWC / DVO' }).click();
  await expect(page.locator('.cockpit-scene__display-main strong')).toHaveText('Ducati Wheelie Control');
  await expect(page.locator('.cockpit-scene__display-main p')).toContainText('MY2027');

  await jumpTo(page, 'reveal', 1.75);
  await expect(page.locator('.final-scene__actions')).toBeVisible();
  await expect(page.getByRole('link', { name: 'EXPLORE THE OFFICIAL MODEL' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'DISCOVER TECHNICAL SPECIFICATIONS' })).toBeVisible();
});

test.describe('tablet and touch mobile', () => {
  test('tablet has no horizontal overflow', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await openExperience(page);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await jumpTo(page, 'performance', 0.8);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  });

  test('fresh mobile session supports touch navigation without overflow', async ({ browser }) => {
    const context = await browser.newContext({ baseURL: 'http://127.0.0.1:5173', viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
    const page = await context.newPage();
    await openExperience(page);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await page.getByRole('button', { name: 'Open chapter menu' }).tap();
    await page.locator('.chapter-menu__list button').filter({ hasText: "The Rider's Command" }).tap();
    await expect(page.locator('.chapter-status__title')).toHaveText("The Rider's Command");
    await jumpTo(page, 'command', 0.9);
    await page.locator('.cockpit-scene__systems button').filter({ hasText: 'DEB' }).tap();
    await expect(page.locator('.cockpit-scene__display-main strong')).toHaveText('Dynamic Engine Brake');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await jumpTo(page, 'reveal', 1.35);
    await expect(page.getByRole('link', { name: 'EXPLORE THE OFFICIAL MODEL' })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await context.close();
  });
});

test('critical image failure resolves to the accessible local fallback', async ({ page }) => {
  await page.route('**/images/panigale-front.webp', (route) => route.abort());
  await openExperience(page);
  const image = page.locator('.hero-scene__front');
  await expect(image).toHaveAttribute('src', '/images/bike-fallback.svg');
  await expect(image).toHaveClass(/bike-image--fallback/);
  await expect(image).toHaveAttribute('alt', /Schematic fallback shown/);
  await expect.poll(() => image.evaluate((element) => element.complete && element.naturalWidth > 0)).toBe(true);
});

test.describe('reduced motion', () => {
  test.use({ reducedMotion: 'reduce' });

  test('essential content remains available without pinned animation', async ({ page }) => {
    await openExperience(page);
    await expect(page.locator('html')).toHaveClass(/reduced-motion/);
    await expect(page.locator('main > section')).toHaveCount(8);
    await expect(page.locator('.pin-spacer')).toHaveCount(0);
    await expect(page.locator('.final-scene__front')).toBeVisible();
    await expect(page.locator('.final-scene__actions')).toBeVisible();
    await expect(page.locator('.exploded-bike__base')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  });
});
