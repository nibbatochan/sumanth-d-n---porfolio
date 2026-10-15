import { test, expect } from '@playwright/test';

test.describe('NoBroker Timeline Case Page (Original File)', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate directly to original case page hash
    await page.goto('http://localhost:3000/#/project/nobroker');
    await expect(page.locator('#header-section')).toBeVisible();
  });

  test('verifies Section 06: Validation & Results', async ({ page }) => {
    const section = page.locator('#validation-section');
    await section.scrollIntoViewIfNeeded();

    // Check heading
    await expect(section.locator('h2')).toContainText('Testing & Results');

    // Check the testing loop steps
    await expect(section).toContainText('12 Bangalore Renters');
    await expect(section).toContainText('Mobile + High-Fidelity Lab Prototypes');
    await expect(section).toContainText('Three Practical Tasks');

    // Check 3 Pillar Outputs
    await expect(section).toContainText('Commute Spine');
    await expect(section).toContainText('4.7');
    await expect(section).toContainText('Reality Verification');
    await expect(section).toContainText('4.4');
    await expect(section).toContainText('Calm Alerts');
    await expect(section).toContainText('4.8');
  });

  test('verifies Section 07: Learnings & Signals', async ({ page }) => {
    const section = page.locator('#learnings-section');
    await section.scrollIntoViewIfNeeded();

    await expect(section.locator('h2')).toContainText('Frictions observed and user signals for future solving');

    // Check 3 Quote Signals
    await expect(section).toContainText('is that right now or during Monday 9 AM office traffic?');
    await expect(section).toContainText('Opening my camera right there felt awkward');
    await expect(section).toContainText('I saw another house right below the box');
  });

  test('verifies Section 08: Learnings reflection', async ({ page }) => {
    const section = page.locator('#next-steps-section');
    await section.scrollIntoViewIfNeeded();

    await expect(section.locator('h2')).toContainText('Learnings');

    // Check unboxed Learnings reflection copy
    await expect(section).toContainText('I started with a hypothesis');
    await expect(section).toContainText('agentic workflows');
  });
});
