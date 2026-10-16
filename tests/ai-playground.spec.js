import { test, expect } from '@playwright/test';

test.describe('AI Playground Feature Suite', () => {
  test('verifies navbar navigation, playground landing, and sub-pages', async ({ page }) => {
    // 1. Visit homepage
    await page.goto('http://localhost:4173/#/');
    await expect(page.locator('header')).toBeVisible();

    // 2. Verify "About" is removed and "AI Playground" is present in desktop nav
    const playgroundLink = page.locator('nav[aria-label="Main navigation"]').getByRole('link', { name: /AI Playground/i });
    await expect(playgroundLink).toBeVisible();
    await expect(page.locator('nav[aria-label="Main navigation"]')).not.toContainText('About');

    // 3. Click AI Playground link
    await playgroundLink.click();
    await expect(page).toHaveURL(/#\/playground$/);

    // 4. Verify AI Playground Landing Page contents
    await expect(page.locator('h1')).toContainText('Where agentic AI meets');
    await expect(page.getByText('AI EXPERIMENTAL LAB')).toBeVisible();

    // Verify both project cards are rendered
    const flowsyCard = page.locator('article').filter({ hasText: 'What’s the point of Flowsy?' });
    const namegeniusCard = page.locator('article').filter({ hasText: 'NameGenius' });
    await expect(flowsyCard).toBeVisible();
    await expect(namegeniusCard).toBeVisible();

    // Verify Vercel links exist
    await expect(flowsyCard.getByRole('link', { name: /Launch Live App/i })).toHaveAttribute('href', 'https://talkflow-mvp.vercel.app');
    await expect(namegeniusCard.getByRole('link', { name: /Launch Live App/i })).toHaveAttribute('href', 'https://namegenius-lilac.vercel.app');

    // 5. Navigate to Flowsy sub-page
    await flowsyCard.getByRole('button', { name: /Details/i }).click();
    await expect(page).toHaveURL(/#\/playground\/flowsy$/);

    // Verify Flowsy sub-page
    await expect(page.locator('h1')).toHaveText('Flowsy');
    await expect(page.getByText('Silence-Based Coaching')).toBeVisible();
    await expect(page.getByText('Clipsy ASCII Character')).toBeVisible();
    await expect(page.getByRole('link', { name: /Launch Flowsy/i })).toHaveAttribute('href', 'https://talkflow-mvp.vercel.app');

    // 6. Navigate back to Playground
    await page.getByRole('button', { name: /Back to Playground/i }).click();
    await expect(page).toHaveURL(/#\/playground$/);

    // 7. Navigate to NameGenius sub-page
    await page.locator('article').filter({ hasText: 'NameGenius' }).getByRole('button', { name: /Details/i }).click();
    await expect(page).toHaveURL(/#\/playground\/namegenius$/);

    // Verify NameGenius sub-page
    await expect(page.locator('h1')).toHaveText('NameGenius');
    await expect(page.getByText('Generate-Then-Verify Pipeline')).toBeVisible();
    await expect(page.getByText('Tactile NG-01 Handheld Console')).toBeVisible();
    await expect(page.getByText('Vedic & Vastu Compliance Mode')).toBeVisible();
    await expect(page.getByRole('link', { name: /Launch NameGenius/i })).toHaveAttribute('href', 'https://namegenius-lilac.vercel.app');

    // 8. Navigate back to Playground, then back to Home
    await page.getByRole('button', { name: /Back to Playground/i }).click();
    await expect(page).toHaveURL(/#\/playground$/);
    await page.getByRole('button', { name: /Back to Portfolio/i }).click();
    await expect(page.locator('#work')).toBeVisible();
  });
});
