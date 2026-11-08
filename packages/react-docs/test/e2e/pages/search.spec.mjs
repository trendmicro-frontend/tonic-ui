import { test, expect } from '@playwright/test';
import { createTheme } from '@tonic-ui/theme';

// The search preview picks its own port, so Playwright exports the printed
// origin to the test process instead of resolving `baseURL` for this project.
const docsUrl = path => new URL(path, process.env.E2E_SEARCH_URL).href;

// The page highlight is `Mark variant="highlight"`, so its background comes from
// the theme token `_highlight`. Resolve the token instead of hard-coding the
// value: semantic tokens are written as references, e.g. `{yellow.100}`.
const theme = createTheme();
const themeColor = (token) => {
  const reference = typeof token === 'string' ? token.match(/^\{(.+)\}$/) : null;
  const value = reference
    ? reference[1].split('.').reduce((colors, key) => colors?.[key], theme.colors)
    : token;
  const hex = /^#([0-9a-f]{3,6})$/i.exec(String(value ?? ''));
  if (!hex) {
    return String(value);
  }
  const pairs = hex[1].length === 3 ? hex[1].split('').map(char => char + char) : hex[1].match(/.{2}/g);
  return `rgb(${pairs.map(pair => parseInt(pair, 16)).join(', ')})`;
};

const highlightColor = async (page) => {
  const colorMode = await page.evaluate(() => document.documentElement.dataset.colorScheme || 'light');
  return themeColor(theme.colors._highlight[`_${colorMode}`] ?? theme.colors._highlight._light);
};

const openSearch = async (page) => {
  await page.goto(docsUrl('/'));
  await page.locator('[data-track$="open_search_modal"]').click();

  const dialog = page.getByRole('dialog');
  const input = dialog.getByRole('textbox', { name: 'Search documentation' });
  await expect(input).toBeVisible();

  return { dialog, input };
};

const getResults = (dialog) => dialog.locator('[data-search-result="true"]');
const getSuggestions = (dialog) => dialog.locator('[data-search-suggestion="true"]');
const getStatus = (dialog) => dialog.locator('[role="status"]');

test.describe('documentation search', { tag: ['@docs', '@search'] }, () => {
  test('ranks exact, prefix, and typo queries', async ({ page }) => {
    const { dialog, input } = await openSearch(page);

    await input.fill('Button');
    await expect(getStatus(dialog)).toHaveText('50 results found');
    await expect(getResults(dialog).first()).toContainText('Button');

    await input.fill('butt');
    await expect(getResults(dialog).first()).toContainText('Button');

    await input.fill('useColrMode');
    await expect(getResults(dialog).first()).toContainText('useColorMode');

    await input.fill('onInteractOutside');
    await expect(getResults(dialog).first()).toContainText('outside interaction');
  });

  test('suggests document names and applies a suggestion', async ({ page }) => {
    const { dialog, input } = await openSearch(page);

    await input.fill('butt');
    const suggestion = getSuggestions(dialog).first();
    await expect(suggestion).toBeVisible();

    const label = (await suggestion.textContent()).trim();
    await suggestion.click();
    await expect(input).toHaveValue(label);
    await expect(getResults(dialog).first()).toContainText('Button');
  });

  test('navigates to the matched section anchor', async ({ page }) => {
    const { dialog, input } = await openSearch(page);

    await input.fill('onInteractOutside');
    const result = getResults(dialog).first();
    const href = await result.getAttribute('href');
    await result.click();

    await expect(page).toHaveURL(new RegExp(`${href.split('#')[0]}`));
    const anchor = page.url().split('#')[1];
    expect(anchor).toBeTruthy();
    await expect(page.locator(`#${anchor}`)).toBeVisible();
  });

  test('supports keyboard navigation and escape', async ({ page }) => {
    const { dialog, input } = await openSearch(page);

    await input.fill('Button');
    await expect(getSuggestions(dialog).first()).toBeVisible();
    await input.press('ArrowDown');
    await expect(getSuggestions(dialog).first()).toBeFocused();

    await page.keyboard.press('Escape');
    await expect(input).toBeHidden();
  });

  test('shows short-query and no-results states', async ({ page }) => {
    const { dialog, input } = await openSearch(page);

    await input.fill('b');
    await expect(dialog.getByText('Type at least 2 characters to search.')).toBeVisible();

    await input.fill('zzzzzz');
    await expect(dialog.getByText('No results found for "zzzzzz"')).toBeVisible();
  });
});

test.describe('documentation search highlight', { tag: ['@docs', '@search'] }, () => {
  // The docs layout shows the sidebar from the `lg` breakpoint (1440px).
  test.use({ viewport: { width: 1440, height: 900 } });

  const searchAndOpenResult = async (page, query) => {
    const { dialog, input } = await openSearch(page);
    // Type key by key: the docs search input drops characters when a whole
    // string arrives in a single input event, and these tests assert on the
    // exact query text that reaches the target page.
    await input.pressSequentially(query, { delay: 50 });
    const result = getResults(dialog).first();
    const href = await result.getAttribute('href');
    await result.click();
    await expect(page).toHaveURL(new RegExp(href.split('#')[0]));
    return href;
  };

  test('keeps the query on the target page without a query string', async ({ page }) => {
    await searchAndOpenResult(page, 'onInteractOutside');

    const headerSearch = page.locator('[data-track="Search|open_search_modal"]');
    const marks = page.locator('#main mark[data-tonic="Mark"]');

    await expect(page).not.toHaveURL(/\?q=/);
    await expect(marks.first()).toBeVisible();
    await expect(marks.first()).toHaveCSS('background-color', await highlightColor(page));
    await expect(headerSearch.locator('input')).toHaveValue('onInteractOutside');
    await expect.poll(() => page.evaluate(() => window.sessionStorage.getItem('tonic-ui-docs:search-query'))).toBeNull();
    await expect(marks.first()).toBeInViewport();
  });

  test('clears the query and the highlight from the header close button', async ({ page }) => {
    await searchAndOpenResult(page, 'onInteractOutside');

    const headerSearch = page.locator('[data-track="Search|open_search_modal"]');
    const marks = page.locator('#main mark[data-tonic="Mark"]');
    await expect(marks.first()).toBeVisible();

    await headerSearch.locator('button').click();

    await expect(marks).toHaveCount(0);
    await expect(headerSearch.locator('input')).toHaveValue('');
  });

  test('clears the highlight when navigating to another page', async ({ page }) => {
    await searchAndOpenResult(page, 'onInteractOutside');

    const marks = page.locator('#main mark[data-tonic="Mark"]');
    await expect(marks.first()).toBeVisible();

    await page.locator('#sidenav a[href="/components/button-base/"]').click();

    await expect(page).toHaveURL(/\/components\/button-base\/$/);
    await expect(marks).toHaveCount(0);
    await expect(page.locator('[data-track="Search|open_search_modal"] input')).toHaveValue('');
  });
});
