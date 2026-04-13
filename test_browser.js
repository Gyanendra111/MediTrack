import { chromium } from 'playwright';
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  page.on('console', msg => console.log('BROWSER_CONSOLE:', msg.text()));
  page.on('pageerror', err => console.log('BROWSER_ERROR:', err.message));
  await page.goto('http://localhost:8080', { waitUntil: 'networkidle' });
  const html = await page.content();
  console.log('HTML ROOT:', html.substring(0, 500));
  await browser.close();
})();
