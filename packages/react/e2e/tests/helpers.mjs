import { expect } from '@playwright/test';

export const visit = async (page, component, options = {}) => {
  const query = new URLSearchParams({ component, ...options });
  await page.goto(`?${query}`);
  const scope = options.environment === 'iframe' ? page.frameLocator('iframe') : page;
  await expect(scope.getByTestId('events')).toBeVisible();
  return scope;
};

export const events = async (scope, type) => {
  const entries = JSON.parse(await scope.getByTestId('events').textContent());
  return type ? entries.filter(entry => entry.type === type) : entries;
};

// Menu and click-triggered Popover move focus after opening in an animation frame.
export const open = async (scope) => {
  await scope.getByTestId('trigger').click();
  await expect(scope.getByTestId('content')).toBeVisible();
  await expect(scope.getByTestId('content')).toBeFocused();
};
