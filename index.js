import pw from "playwright";
import retry from "async-retry";

async function main() {
  const browser = await pw.chromium.launch({ headless: false });
  console.log("Connecting to browser...");
  const page = await browser.newPage();

  console.log("Waiting for the page to load...");
  await page.goto("https://www.amazon.com/", { timeout: 60000 });

  // select search input
  await page.fill("#twotabsearchtextbox", "nike shoes");

  // click search
  await page.click("#nav-search-submit-button");

  // wait 5 seconds for the page to load
  await page.waitForTimeout(5000);

  console.log("Page loaded.");
  await page.screenshot({ path: "screenshots/screenshot.png", fullPage: true });
  await browser.close();
}

await retry(main, { retries: 3, onRetry: () => console.log("Retrying...") });
