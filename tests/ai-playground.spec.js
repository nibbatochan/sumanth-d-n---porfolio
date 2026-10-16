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
    await expect(page.locator('h1')).toContainText('An experimental sandbox for');
    await expect(page.getByText('AI EXPERIMENTAL LAB')).not.toBeVisible();

    // Verify all 3 cards in the row are rendered
    const flowsyCard = page.locator('article').filter({ hasText: 'Flowsy' });
    const namegeniusCard = page.locator('article').filter({ hasText: 'NameGenius' });
    const comingSoonCard = page.locator('article').filter({ hasText: 'Coming Soon' });

    await expect(flowsyCard).toBeVisible();
    await expect(namegeniusCard).toBeVisible();
    await expect(comingSoonCard).toBeVisible();

    // Verify Flowsy card content: project name, small explanation, Launch Live App CTA
    await expect(flowsyCard.locator('h2')).toHaveText('Flowsy');
    await expect(flowsyCard.getByText(/Make better small talk with real-time scenarios/i)).toBeVisible();
    await expect(flowsyCard.getByRole('link', { name: /Launch Live App/i })).toHaveAttribute('href', 'https://talkflow-mvp.vercel.app');
    await expect(flowsyCard.getByRole('button', { name: /Details/i })).not.toBeVisible();

    // Verify NameGenius card content: project name, small explanation, Launch Live App CTA
    await expect(namegeniusCard.locator('h2')).toHaveText('NameGenius');
    await expect(namegeniusCard.getByText(/Brand names that you can actually own/i)).toBeVisible();
    await expect(namegeniusCard.getByRole('link', { name: /Launch Live App/i })).toHaveAttribute('href', 'https://namegenius-lilac.vercel.app');
    await expect(namegeniusCard.getByRole('button', { name: /Details/i })).not.toBeVisible();

    // 5. Navigate back to Home
    await page.getByRole('button', { name: /Back to Portfolio/i }).click();
    await expect(page.locator('#work')).toBeVisible();
  });
});
