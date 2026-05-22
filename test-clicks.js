const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: "new", args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  
  // Try to find the language switcher button (en)
  const btn = await page.evaluateHandle(() => {
    return Array.from(document.querySelectorAll('button')).find(b => b.textContent.trim() === 'EN');
  });

  if (btn) {
    const isClickable = await page.evaluate((el) => {
      const rect = el.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      const topEl = document.elementFromPoint(x, y);
      return {
        text: el.textContent,
        x, y,
        topElementTag: topEl ? topEl.tagName : null,
        topElementClass: topEl ? topEl.className : null,
        isSame: topEl === el || el.contains(topEl)
      };
    }, btn);
    console.log("Language Switcher Clickable:", isClickable);
  } else {
    console.log("Language switcher button not found.");
  }

  await browser.close();
})();
