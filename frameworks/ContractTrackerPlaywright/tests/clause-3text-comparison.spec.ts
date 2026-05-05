import { test, expect } from '@playwright/test';
import { clearLocalStorage } from '../support/storage';

test.describe('Clause 3-Text Model and Comparison', () => {
  test.beforeEach(async ({ page }) => {
    // 1. open the application
    await page.goto('/');
    
    // 2. clear localStorage before the test
    await clearLocalStorage(page);
    
    // Reload to ensure state is clean
    await page.reload();
  });

  test('CNT-CLA-001 & CNT-CMP-001: should add a 3-text clause and verify comparison diff', async ({ page }) => {
    // 3. create a contract
    const createBtn = page.getByRole('button', { name: 'Create New Contract', exact: true });
    await expect(createBtn).toBeVisible({ timeout: 15000 });
    await createBtn.click();
    
    await page.fill('#name', 'Test Contract For Clauses');
    await page.fill('#counterparty', 'Acme Corp');
    await page.fill('#description', 'Testing 3-text model');
    await page.getByRole('button', { name: 'Create Contract', exact: true }).click();
    
    // Wait for the active contract
    await expect(page.locator('button', { hasText: 'Test Contract For Clauses' }).first()).toBeVisible();

    // 4. add a clause
    await page.getByRole('button', { name: 'Add Clause' }).click();

    // Wait for modal
    await expect(page.getByText('Add New Clause').first()).toBeVisible();

    // 5. fill clause number, topic, baselineText, theirPosition, ourPosition, issue
    await page.fill('#clauseNumber', '7.1');
    await page.fill('#topic', 'Limitation of Liability');
    await page.fill('#baselineText', 'The company shall be fully liable for all damages.');
    await page.fill('#theirPosition', 'The company shall not be liable for any damages whatsoever.');
    await page.fill('#ourPosition', 'The company shall be liable only for direct damages.');
    await page.fill('#issue', 'They want no liability, we want capped liability.');

    // 6. save the clause (the button inside the form is 'Add Clause')
    // Using strict locator to match the submit button at the bottom of the form
    await page.locator('form').getByRole('button', { name: 'Add Clause' }).click();

    // 7. assert the clause appears in the table
    // It should show up with clause number 7.1
    await expect(page.getByText('7.1')).toBeVisible();
    await expect(page.getByText('Limitation of Liability')).toBeVisible();

    // 8. open the comparison modal
    await page.locator('[data-tour="clause-actions"]').click();
    await page.getByRole('menuitem', { name: /Compare Text/i }).click();

    // Wait for Comparison Modal
    const comparisonModal = page.getByRole('dialog');
    await expect(comparisonModal).toBeVisible();
    
    // 9. verify baseline vs their position comparison is available and stats display
    // By default, it opens Baseline vs Theirs. Check for specific texts.
    await expect(page.getByRole('button', { name: 'Baseline ↔ Theirs' })).toBeVisible();
    
    // diff statistics badges
    await expect(page.getByText(/added/)).toBeVisible();
    await expect(page.getByText(/removed/)).toBeVisible();
    
    // check text content inside the modal (checking the highlighted diff)
    // The removed text "fully" and "all" should be present in the diff, as well as added "not" "any" "whatsoever"
    await expect(comparisonModal.getByText('whatsoever.')).toBeVisible();
    await expect(comparisonModal.getByText('fully')).toBeVisible();

    // Close the modal
    await comparisonModal.getByRole('button').first().click(); // The X button
    // Actually we can just hit Escape
    await page.keyboard.press('Escape');
    await expect(comparisonModal).not.toBeVisible();

    // 10. reload and verify persistence
    await page.reload();
    await page.waitForLoadState('networkidle');

    // Assert the clause is still in the table
    await expect(page.getByText('7.1')).toBeVisible();
    await expect(page.getByText('Limitation of Liability')).toBeVisible();
  });
});
