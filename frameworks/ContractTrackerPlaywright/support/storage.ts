import { Page } from '@playwright/test';

export async function clearLocalStorage(page: Page) {
  await page.evaluate(() => {
    window.localStorage.clear();
    // Prevent sample data from loading
    window.localStorage.setItem('negotiation-tracker-contracts', '[]');
    window.localStorage.setItem('negotiation-tracker-contracts-version', '5');
    // Prevent welcome modal
    window.localStorage.setItem('negotiation-tracker-onboarding', JSON.stringify({
      hasSeenWelcome: true,
      hasCompletedTour: true,
      currentTourStep: 0,
      isTourActive: false,
      dismissedTips: [],
      discoveredFeatures: [],
      hideHelpWidget: true
    }));
  });
}
