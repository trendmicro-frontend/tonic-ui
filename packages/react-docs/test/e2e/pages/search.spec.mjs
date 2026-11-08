// Documentation search: ranking, suggestions, keyboard behavior, and the
// highlight the target page applies to the query.
import { expect, test } from '@playwright/test';

// The query travels from the dialog to the target page through sessionStorage,
// so the URL stays clean and the highlight belongs to that page only.
const STORAGE_KEY = 'tonic-ui-docs:search-query';

// `Mark variant="highlight"` styles a match with the `_highlight` theme token.
// The docs render with `useCSSVariables`, so the rule is
// `background-color: var(--tonic-colors-_highlight)`. Read the variable the page
// resolves for the current colour mode instead of hard-coding a value.
const highlightColor = (page) => page.evaluate((variable) => {
  const value = getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
  const probe = document.createElement('span');
  probe.style.backgroundColor = value;
  document.body.appendChild(probe);
  const color = getComputedStyle(probe).backgroundColor;
  probe.remove();
  return color;
}, '--tonic-colors-_highlight');

const headerSearch = page => page.locator('[data-track="Search|open_search_modal"]');
const marks = page => page.locator('#main mark[data-tonic="Mark"]');

// The landing page has its own header entry point, so every test starts on a
// documentation page that carries the shared header search.
const ENTRY_PATH = '/components/link/';

const openSearch = async (page) => {
  await page.goto(ENTRY_PATH);
  await headerSearch(page).click();

  const dialog = page.getByRole('dialog');
  const input = dialog.getByRole('textbox', { name: 'Search documentation' });
  await expect(input).toBeVisible();

  return { dialog, input };
};

const getResults = (dialog) => dialog.locator('[data-search-result="true"]');
const getSuggestions = (dialog) => dialog.locator('[data-search-suggestion="true"]');
const getStatus = (dialog) => dialog.locator('[role="status"]');

// Type key by key: the docs search input drops characters when a whole string
// arrives in a single input event, and the highlight tests assert on the exact
// query text that reaches the target page.
const typeQuery = (input, query) => input.pressSequentially(query, { delay: 50 });

const openFirstResult = async (page, dialog) => {
  const result = getResults(dialog).first();
  const href = await result.getAttribute('href');
  await result.click();
  await expect(page).toHaveURL(new RegExp(href.split('#')[0]));
  return href;
};

const searchAndOpenResult = async (page, query) => {
  const { dialog, input } = await openSearch(page);
  await typeQuery(input, query);
  return openFirstResult(page, dialog);
};

test.describe('documentation search', { tag: ['@docs', '@search'] }, () => {
  test('loads the generated search manifest and index', async ({ page }) => {
    const manifestResponse = page.waitForResponse(response =>
      new URL(response.url()).pathname.endsWith('/search/manifest.json'));
    const indexResponse = page.waitForResponse(response =>
      /\/search\/index\.[0-9a-f]+\.json$/.test(new URL(response.url()).pathname));

    const { dialog, input } = await openSearch(page);
    await input.fill('Button');
    await expect(getResults(dialog).first()).toContainText('Button');

    const manifest = await manifestResponse;
    const index = await indexResponse;
    expect(manifest.ok()).toBe(true);
    expect(index.ok()).toBe(true);
    expect(new URL(index.url()).pathname.endsWith(`/search/${(await manifest.json()).file}`)).toBe(true);
  });

  test('ranks exact, prefix, and typo queries', async ({ page }) => {
    const { dialog, input } = await openSearch(page);

    await input.fill('Button');
    await expect(getStatus(dialog)).toContainText('results found');
    await expect(getResults(dialog).first()).toContainText('Button');

    await input.fill('butt');
    await expect(getResults(dialog).first()).toContainText('Button');

    await input.fill('useColrMode');
    await expect(getResults(dialog).first()).toContainText('useColorMode');

    await input.fill('onInteractOutside');
    await expect(getResults(dialog).first()).toContainText('onInteractOutside');
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
    const href = await openFirstResult(page, dialog);
    const anchor = href.split('#')[1];
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

  test('keeps the query on the target page without a query string', async ({ page }) => {
    await searchAndOpenResult(page, 'icon button');

    await expect(page).not.toHaveURL(/\?q=/);
    await expect(marks(page).first()).toBeVisible();
    await expect(marks(page).first()).toHaveCSS('background-color', await highlightColor(page));
    await expect(headerSearch(page).locator('input')).toHaveValue('icon button');
    await expect.poll(() => page.evaluate(key => window.sessionStorage.getItem(key), STORAGE_KEY)).toBeNull();
    await expect(marks(page).first()).toBeInViewport();
  });

  test('clears the query and the highlight from the header close button', async ({ page }) => {
    await searchAndOpenResult(page, 'icon button');

    await expect(marks(page).first()).toBeVisible();

    await headerSearch(page).locator('button').click();

    await expect(marks(page)).toHaveCount(0);
    await expect(headerSearch(page).locator('input')).toHaveValue('');
  });

  test('clears the highlight when navigating to another page', async ({ page }) => {
    await searchAndOpenResult(page, 'icon button');

    await expect(marks(page).first()).toBeVisible();

    await page.locator('#sidenav a[href="/components/drawer/"]').click();

    await expect(page).toHaveURL(/\/components\/drawer\/$/);
    await expect(marks(page)).toHaveCount(0);
    await expect(headerSearch(page).locator('input')).toHaveValue('');
  });
});
