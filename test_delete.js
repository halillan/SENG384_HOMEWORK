const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({headless: 'new'});
  const page = await browser.newPage();
  
  page.on('dialog', async dialog => {
    console.log('Got dialog:', dialog.message());
    await dialog.accept(); // click OK
  });
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));
  page.on('response', response => {
    if (response.url().includes('/api/people')) {
      console.log('NETWORK:', response.request().method(), response.url(), response.status());
    }
  });

  await page.goto('http://localhost:5173/people');
  await new Promise(r => setTimeout(r, 1000));
  
  console.log('Clicking delete form...');
  const elements = await page.$$('.btn-delete');
  if (elements.length > 0) {
    await elements[0].click();
    await new Promise(r => setTimeout(r, 2000));
  } else {
    console.log('No delete buttons found');
  }
  
  await browser.close();
})();
