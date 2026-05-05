import { test, expect, Page } from '@playwright/test';
import { clearLocalStorage } from '../support/storage';

async function setup(page: Page) {
  await page.goto('/');
  await clearLocalStorage(page);
  await page.reload();
}

async function createContract(page: Page, name = 'Filters Test Contract') {
  const createBtn = page.getByRole('button', { name: 'Create New Contract', exact: true });
  await expect(createBtn).toBeVisible({ timeout: 15000 });
  await createBtn.click();

  await page.fill('#name', name);
  await page.fill('#counterparty', 'Test Counterparty');
  await page.getByRole('button', { name: 'Create Contract', exact: true }).click();
  await expect(page.locator('button', { hasText: name }).first()).toBeVisible();
}

async function addClause(page: Page, data: {
  clauseNumber: string;
  topic: string;
  issue: string;
  status?: string;
  priority?: string;
  theirPosition?: string;
  rationale?: string;
}) {
  // Open the form only if it is not already visible.
  // handleSubmit keeps the form open after saving a new clause to allow batch entry,
  // so on the second+ call the form is already mounted.
  const formTitle = page.getByText('Add New Clause').first();
  if (!(await formTitle.isVisible())) {
    await page.getByRole('button', { name: 'Add Clause' }).click();
    await expect(formTitle).toBeVisible();
  }

  await page.fill('#clauseNumber', data.clauseNumber);
  await page.fill('#topic', data.topic);
  await page.fill('#issue', data.issue);

  if (data.theirPosition) await page.fill('#theirPosition', data.theirPosition);
  if (data.rationale) await page.fill('#rationale', data.rationale);

  if (data.status && data.status !== 'No Changes') {
    await page.getByRole('combobox').filter({ hasText: 'No Changes' }).click();
    await page.getByRole('option', { name: data.status }).click();
  }

  // Scope to the Priority container div to avoid ambiguity with the Risk Level select,
  // which also defaults to "Medium".
  if (data.priority && data.priority !== 'Medium') {
    await page.locator('div.space-y-2')
      .filter({ has: page.locator('label', { hasText: 'Priority' }) })
      .getByRole('combobox')
      .click();
    await page.getByRole('option', { name: data.priority }).click();
  }

  await page.locator('form').getByRole('button', { name: 'Add Clause' }).click();

  // The form resets but stays open (by design) for batch entry.
  // Wait for the clause to appear in the table to confirm the save was processed.
  await expect(page.getByText(data.clauseNumber)).toBeVisible({ timeout: 10000 });

  // Close the form via the X button in the ClauseForm card header.
  // Scope to the specific card that contains "Add New Clause" to avoid matching
  // other card-headers on the page (e.g. Timeline's "Add Event" button).
  await page
    .locator('[data-slot="card"]')
    .filter({ has: page.getByText('Add New Clause') })
    .locator('[data-slot="card-header"]')
    .getByRole('button')
    .click();
  await expect(formTitle).not.toBeVisible({ timeout: 5000 });
}

test.describe('Filters Module', () => {
  test.beforeEach(async ({ page }) => {
    await setup(page);
  });

  test('CNT-FLT-001: search filter applies across issue, rationale and position fields', async ({ page }) => {
    await createContract(page);

    await addClause(page, {
      clauseNumber: '1.1',
      topic: 'Coverage',
      issue: 'Liability exposure must be capped',
    });
    await addClause(page, {
      clauseNumber: '2.1',
      topic: 'Indemnity',
      issue: 'Scope of coverage',
      rationale: 'Indemnification obligation must be bilateral',
    });
    await addClause(page, {
      clauseNumber: '3.1',
      topic: 'Payment',
      issue: 'Payment schedule dispute',
      theirPosition: 'Net 60 payment terms are required by counterparty',
    });

    const searchInput = page.getByPlaceholder('Search clauses...');

    // Search by issue field
    await searchInput.fill('Liability exposure');
    await expect(page.getByText('1.1')).toBeVisible();
    await expect(page.getByText('2.1')).not.toBeVisible();
    await expect(page.getByText('3.1')).not.toBeVisible();

    // Clear — all rows return
    await searchInput.clear();
    await expect(page.getByText('1.1')).toBeVisible();
    await expect(page.getByText('2.1')).toBeVisible();
    await expect(page.getByText('3.1')).toBeVisible();

    // Search by rationale field
    await searchInput.fill('Indemnification obligation');
    await expect(page.getByText('2.1')).toBeVisible();
    await expect(page.getByText('1.1')).not.toBeVisible();
    await expect(page.getByText('3.1')).not.toBeVisible();

    // Clear — all rows return
    await searchInput.clear();

    // Search by theirPosition field
    await searchInput.fill('Net 60');
    await expect(page.getByText('3.1')).toBeVisible();
    await expect(page.getByText('1.1')).not.toBeVisible();
    await expect(page.getByText('2.1')).not.toBeVisible();

    // Clear — all rows return
    await searchInput.clear();
    await expect(page.getByText('1.1')).toBeVisible();
    await expect(page.getByText('2.1')).toBeVisible();
    await expect(page.getByText('3.1')).toBeVisible();
  });

  test('CNT-FLT-002: dashboard status card click applies status filter and preserves total count', async ({ page }) => {
    await createContract(page);

    await addClause(page, { clauseNumber: '1.1', topic: 'Alpha', issue: 'Alpha clause', status: 'In Discussion' });
    await addClause(page, { clauseNumber: '2.1', topic: 'Beta', issue: 'Beta clause', status: 'Agreed' });
    await addClause(page, { clauseNumber: '3.1', topic: 'Gamma', issue: 'Gamma clause' });

    await expect(page.locator('tbody tr')).toHaveCount(3);

    // Click "In Discussion" card in DashboardStats
    await page.locator('[data-tour="dashboard-stats"] .cursor-pointer')
      .filter({ hasText: 'In Discussion' })
      .click();

    // Table is filtered to only In Discussion clauses
    await expect(page.locator('tbody tr')).toHaveCount(1);
    await expect(page.getByText('1.1')).toBeVisible();
    await expect(page.getByText('2.1')).not.toBeVisible();

    // DashboardStats total count is unchanged (uses raw items, not filteredItems)
    await expect(
      page.locator('[data-tour="dashboard-stats"]').getByText('Total Clauses').locator('../..').getByText('3')
    ).toBeVisible();

    // Reset via FilterBar Clear button
    await page.getByRole('button', { name: /clear/i }).click();
    await expect(page.locator('tbody tr')).toHaveCount(3);
  });

  test('CNT-FLT-003: combining status and priority filters intersects results', async ({ page }) => {
    await createContract(page);

    await addClause(page, { clauseNumber: '1.1', topic: 'Alpha', issue: 'Alpha clause', status: 'Blocked', priority: 'High' });
    await addClause(page, { clauseNumber: '2.1', topic: 'Beta', issue: 'Beta clause', status: 'Blocked', priority: 'Low' });
    await addClause(page, { clauseNumber: '3.1', topic: 'Gamma', issue: 'Gamma clause', status: 'Agreed', priority: 'High' });

    // Set Status = Blocked → 2 rows
    await page.getByRole('combobox').filter({ hasText: 'All Statuses' }).click();
    await page.getByRole('option', { name: 'Blocked' }).click();
    await expect(page.locator('tbody tr')).toHaveCount(2);
    await expect(page.getByText('1.1')).toBeVisible();
    await expect(page.getByText('2.1')).toBeVisible();
    await expect(page.getByText('3.1')).not.toBeVisible();

    // Also set Priority = High → 1 row
    await page.getByRole('combobox').filter({ hasText: 'All Priorities' }).click();
    await page.getByRole('option', { name: 'High' }).click();
    await expect(page.locator('tbody tr')).toHaveCount(1);
    await expect(page.getByText('1.1')).toBeVisible();
    await expect(page.getByText('2.1')).not.toBeVisible();

    // Click Clear → all 3 rows and Clear button disappears
    await page.getByRole('button', { name: /clear/i }).click();
    await expect(page.locator('tbody tr')).toHaveCount(3);
    await expect(page.getByRole('button', { name: /clear/i })).not.toBeVisible();
  });

  test('CNT-FLT-004: clause number column uses natural numeric sorting', async ({ page }) => {
    await createContract(page);

    // Add out-of-order to prove sorting works
    await addClause(page, { clauseNumber: '10.1', topic: 'Ten', issue: 'Ten issue' });
    await addClause(page, { clauseNumber: '2.1', topic: 'Two', issue: 'Two issue' });
    await addClause(page, { clauseNumber: '1.1', topic: 'One', issue: 'One issue' });

    const rows = page.locator('tbody tr');
    const sortBtn = page.locator('th button').filter({ hasText: 'Clause #' });

    // Sort ascending: 1.1, 2.1, 10.1
    await sortBtn.click();
    await expect(rows.first()).toContainText('1.1');
    await expect(rows.nth(1)).toContainText('2.1');
    await expect(rows.last()).toContainText('10.1');

    // Sort descending: 10.1, 2.1, 1.1
    await sortBtn.click();
    await expect(rows.first()).toContainText('10.1');
    await expect(rows.nth(1)).toContainText('2.1');
    await expect(rows.last()).toContainText('1.1');
  });

  test('CNT-FLT-005: custom owner added via filter bar persists across reload', async ({ page }) => {
    await createContract(page);

    // Open the Owner filter combobox
    await page.getByRole('combobox').filter({ hasText: 'All Owners' }).click();

    // Click "Add new..."
    await page.getByRole('option', { name: /add new/i }).click();

    // Fill the dialog
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.fill('#new-owner-name', 'External Counsel');
    await page.getByRole('button', { name: 'Add Owner' }).click();
    await expect(page.getByRole('dialog')).not.toBeVisible();

    // Verify in localStorage
    const owners: string[] = await page.evaluate(() => {
      const stored = window.localStorage.getItem('negotiation-tracker-owners');
      return stored ? JSON.parse(stored) : [];
    });
    expect(owners).toContain('External Counsel');

    // Open dropdown again — new owner is available
    await page.getByRole('combobox').filter({ hasText: 'All Owners' }).click();
    await expect(page.getByRole('option', { name: 'External Counsel' })).toBeVisible();
    await page.keyboard.press('Escape');

    // Reload and verify persistence
    await page.reload();
    await page.waitForLoadState('networkidle');

    await page.getByRole('combobox').filter({ hasText: 'All Owners' }).click();
    await expect(page.getByRole('option', { name: 'External Counsel' })).toBeVisible();
    await page.keyboard.press('Escape');
  });

  test('CNT-FLT-006: empty state appears when filters yield no results', async ({ page }) => {
    await createContract(page);
    await addClause(page, { clauseNumber: '1.1', topic: 'Test Clause', issue: 'Test issue summary' });

    await expect(page.getByText('1.1')).toBeVisible();

    // Search for a string that guarantees no matches
    await page.getByPlaceholder('Search clauses...').fill('xyz123abc_notfound');

    // Empty state appears with the filter-specific message
    await expect(page.getByText('No clauses found')).toBeVisible();
    await expect(page.getByText('Try adjusting your filters to see more results.')).toBeVisible();
    await expect(page.getByText('1.1')).not.toBeVisible();

    // Clear search — clause row returns
    await page.getByPlaceholder('Search clauses...').clear();
    await expect(page.getByText('1.1')).toBeVisible();
    await expect(page.getByText('No clauses found')).not.toBeVisible();
  });
});
