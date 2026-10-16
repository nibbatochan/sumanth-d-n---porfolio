import { test, expect } from '@playwright/test';

test.describe('NoBroker Restructured Case Study Page', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate directly to restructured case page hash
    await page.goto('http://localhost:4173/#/project/nobroker-restructured');
    // Wait for the main heading to appear
    await expect(page.locator('h1')).toContainText('Ending the rental app-hopping loop');
  });

  test('verifies intro, meta-rail and diagnostic summary cards', async ({ page }) => {
    // Check Meta Rail elements
    await expect(page.getByText('Product Designer & Researcher')).toBeVisible();
    await expect(page.getByText('37 Surveyed · 11 In-Depth Interviews')).toBeVisible();

    // Check 3 Summary Cards
    await expect(page.getByText('The Root Frictions')).toBeVisible();
    await expect(page.getByText('Three Systemic Interventions')).toBeVisible();
    await expect(page.getByText('Measured Search Efficiency')).toBeVisible();

    // Check Core Challenge Banner
    await expect(page.getByText('Core Design Challenge')).toBeVisible();
  });

  test('verifies all 3 challenge sections and illustrations loading', async ({ page }) => {
    // Challenge 1: PS2
    const ps2Section = page.locator('#challenge-ps2');
    await ps2Section.scrollIntoViewIfNeeded();
    await expect(page.locator('#challenge-ps2 h2')).toContainText('distance is a lie');
    const ps2Img = page.locator('img[src="/illustrations/ps2-journey-flow.png"]');
    await expect(ps2Img).toBeVisible();
    const ps2ImgLoaded = await ps2Img.evaluate((img) => img.complete && img.naturalWidth > 0);
    expect(ps2ImgLoaded).toBe(true);

    // Challenge 2: PS1
    const ps1Section = page.locator('#challenge-ps1');
    await ps1Section.scrollIntoViewIfNeeded();
    await expect(page.locator('#challenge-ps1 h2')).toContainText('verified daylight photos');
    const ps1Img = page.locator('img[src="/illustrations/ps1-journey-flow.jpg"]');
    await expect(ps1Img).toBeVisible();
    const ps1ImgLoaded = await ps1Img.evaluate((img) => img.complete && img.naturalWidth > 0);
    expect(ps1ImgLoaded).toBe(true);

    // Challenge 3: PS4
    const ps4Section = page.locator('#challenge-ps4');
    await ps4Section.scrollIntoViewIfNeeded();
    await expect(page.locator('#challenge-ps4 h2')).toContainText('silenced all non-essential alerts');
    const ps4Img = page.locator('img[src="/illustrations/ps4-journey-flow.jpg"]');
    await expect(ps4Img).toBeVisible();
    const ps4ImgLoaded = await ps4Img.evaluate((img) => img.complete && img.naturalWidth > 0);
    expect(ps4ImgLoaded).toBe(true);
  });

  test('verifies interactive tab switching within challenges', async ({ page }) => {
    // In PS2, switch to "Decisions & Tradeoffs"
    const ps2DecisionsBtn = page.locator('#challenge-ps2 button', { hasText: 'Decisions & Tradeoffs' });
    await ps2DecisionsBtn.click();
    await expect(page.locator('#challenge-ps2')).toContainText('Anchor Search Around "Your Place"');

    // In PS2, switch to "Live Prototype"
    const ps2ProtoBtn = page.locator('#challenge-ps2 button', { hasText: 'Live Prototype' });
    await ps2ProtoBtn.click();
    await expect(page.locator('#challenge-ps2 iframe')).toBeVisible();

    // In PS1, switch to "Decisions & Tradeoffs"
    const ps1DecisionsBtn = page.locator('#challenge-ps1 button', { hasText: 'Decisions & Tradeoffs' });
    await ps1DecisionsBtn.click();
    await expect(page.locator('#challenge-ps1')).toContainText('Crowdsource from Disliking Visitors');

    // In PS4, switch to "Decisions & Tradeoffs"
    const ps4DecisionsBtn = page.locator('#challenge-ps4 button', { hasText: 'Decisions & Tradeoffs' });
    await ps4DecisionsBtn.click();
    await expect(page.locator('#challenge-ps4')).toContainText('Genuinely Fresh Matches Only');
  });

  test('verifies view toggle between Restructured and Timeline views', async ({ page }) => {
    // Click "Switch to Timeline View"
    const switchBtn = page.getByRole('button', { name: /Timeline View/i }).first();
    await expect(switchBtn).toBeVisible();
    await switchBtn.click();

    // Expect hash to change to #/project/nobroker and timeline elements to appear
    await expect(page).toHaveURL(/#\/project\/nobroker$/);
    await expect(page.getByText('Open Hi-Fi Lab')).toBeVisible();

    // In timeline view, click "Restructured View"
    const backToRestructuredBtn = page.getByRole('button', { name: /Restructured View/i });
    if (await backToRestructuredBtn.isVisible()) {
      await backToRestructuredBtn.click();
      await expect(page).toHaveURL(/#\/project\/nobroker-restructured$/);
    }
  });

  test('verifies Section 5: Testing, Results, Learnings & Whats Next', async ({ page }) => {
    const section = page.locator('#testing-results');
    await section.scrollIntoViewIfNeeded();

    // Check heading
    await expect(section.locator('h2')).toContainText('Testing, Results, Learnings & What');

    // Check stats
    await expect(section).toContainText('97.2%');
    await expect(section).toContainText('4.57 / 5');
    await expect(section).toContainText('~2 mins');

    // Check decision cards
    await expect(section).toContainText('Peak Rush Hour Transparency');
    await expect(section).toContainText('Two-Hour WhatsApp Photo Window');
    await expect(section).toContainText('Resolving the Failed Alert Task');

    // Check future scope cards
    await expect(section).toContainText('Live Transit & Store Integrations');
    await expect(section).toContainText('Community Renter Trust Badges');
    await expect(section).toContainText('Owner Availability Heartbeat');
  });

  test('verifies mobile responsive layout without horizontal overflow', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('http://localhost:3000/#/project/nobroker-restructured');
    
    // Check that header is visible
    await expect(page.locator('h1')).toBeVisible();

    // Ensure document width matches viewport without excessive overflow
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2);
  });
});
