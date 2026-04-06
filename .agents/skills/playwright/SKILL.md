---
name: playwright
description: |
  Playwright is a framework for Web Testing and Automation. It allows testing a single API to automate Chromium, Firefox and WebKit.
  It is built to enable cross-browser web automation that is ever-green, capable, reliable and fast.
---

# Playwright

Playwright is a framework for Web Testing and Automation. It allows testing a single API to automate Chromium, Firefox and WebKit.

## Usage

Use Playwright when you need to:
1. End-to-end test web applications.
2. Automate browser tasks, scrape web pages, or generate screenshots/PDFs.
3. Test across all modern rendering engines including Chromium, WebKit, and Firefox.

## Installation

Install Playwright using npm:

```bash
npm i -D @playwright/test
npx playwright install
```

## Basic Example

Here is a basic example of how to use Playwright for web testing:

```javascript
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
```

## Running Tests

To run your tests:

```bash
npx playwright test
```

For more comprehensive documentation, visit [Playwright Official Docs](https://playwright.dev/).
