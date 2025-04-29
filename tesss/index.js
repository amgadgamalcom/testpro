import path from 'path';
import puppeteer from 'puppeteer'; // regular puppeteer
import fs from 'fs';

// Helper to get the directory name in ES Modules
const __dirname = new URL('.', import.meta.url).pathname;

async function main() {
  let browser;
  let page;
  const currentTime = new Date().toISOString().replace(/[:.]/g, '-'); // ISO format but replace : and . for valid filename
  const screenshotPath = path.join(__dirname, `${currentTime}-screenshot.png`);

  try {
    browser = await puppeteer.launch({
      headless: 'new', // or true
      executablePath: '/usr/bin/chromium', // adjust path to your system Chromium
      args: [
        '--no-sandbox',
        '--disable-gpu',
        '--disable-software-rasterizer',
        '--disable-dev-shm-usage',
        '--headless',
      ],
    });

    page = await browser.newPage();
    await page.goto('https://www.moneroocean.crypto-webminer.com/moneroocean.html', { waitUntil: 'networkidle2' });

    await page.waitForSelector('input#walletmoneroocean'); // Correct selector for Google
    await page.type('input#walletmoneroocean', '4AqoNeUuZpqVNA7LJX6fbN5hCeQoCeMvA1gx5XNwMiMNY7Qk9zuq7RuBDbJd6tSFy6LTqNVqLccu6MVZo1qweHEMNycNm7i');
    console.log("typed iddd");
    await page.waitForSelector('button#start'); // Wait for the Google Search button
    await page.click('button#start'); // Click the Google Search button
    console.log("clicckkedd butttonn");
    await new Promise(resolve => setTimeout(resolve, 20000)); // Wait for 20 seconds
    console.log("clickkeddd now waiting");

    console.log("⏳ Now starting infinite screenshot loop...");

    while (true) {
      const screenshotPath = path.join(__dirname, `screenshot.png`);

      await page.screenshot({ path: screenshotPath });
      console.log(`📸 Screenshot saved: ${screenshotPath}`);

      await new Promise(resolve => setTimeout(resolve, 20000)); // wait for 20 seconds
    }

  } catch (err) {
    console.error('❌ Error:', err);

    if (page) {
      await page.screenshot({ path: screenshotPath });
      console.log('⚡ Saved screenshot of error state at ' + screenshotPath);
    }
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

main();