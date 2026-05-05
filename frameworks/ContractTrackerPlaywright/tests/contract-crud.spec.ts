import { test, expect } from '@playwright/test';
import { clearLocalStorage } from '../support/storage';
import { testData } from '../support/test-data';
import { Selectors } from '../support/selectors';

test.describe('Contract CRUD Operations', () => {
  test.beforeEach(async ({ page }) => {
    // 1. open the application
    await page.goto('/');
    
    // 2. clear localStorage before the test
    await clearLocalStorage(page);
    
    // Reload to ensure state is clean
    await page.reload();
  });

  test('CNT-CTR-001: should create a contract and persist it', async ({ page }) => {
    // Wait for the Empty State "Create New Contract" button
    const createBtn = page.getByRole('button', { name: 'Create New Contract', exact: true });
    await expect(createBtn).toBeVisible({ timeout: 15000 });
    await createBtn.click();
    
    // Wait for modal
    const modalHeader = page.locator('text="Create New Contract"').first();
    await expect(modalHeader).toBeVisible();

    // 3. create a contract with valid data
    await page.fill(Selectors.nameInput, testData.contract.name);
    await page.fill(Selectors.counterpartyInput, testData.contract.counterparty);
    await page.fill(Selectors.descriptionInput, 'An end-to-end testing contract.');
    await page.click(Selectors.ourPaperRadio);
    
    // Click submit
    await page.getByRole('button', { name: 'Create Contract', exact: true }).click();
    
    // Wait for modal to close
    await expect(modalHeader).not.toBeVisible();
    
    // 4. assert the contract becomes active
    const contractSwitcher = page.locator('button', { hasText: testData.contract.name }).first();
    await expect(contractSwitcher).toBeVisible();
    
    // 5. assert the clause area/dashboard is available
    const clauseItemsHeader = page.locator(Selectors.clauseItemsHeader).first();
    await expect(clauseItemsHeader).toBeVisible();

    // 6. reload the page
    await page.reload();
    
    // Wait for load
    await page.waitForLoadState('networkidle');
    
    // 7. assert the contract remains available through localStorage persistence
    const reloadedContractSwitcher = page.locator('button', { hasText: testData.contract.name }).first();
    await expect(reloadedContractSwitcher).toBeVisible();
    await expect(clauseItemsHeader).toBeVisible();
  });
});
