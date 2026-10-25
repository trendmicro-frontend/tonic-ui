import { expect, test } from '@playwright/test';
import { events, open, visit } from '../helpers.mjs';

test('Popover honors closeOnEsc=false without disabling outside dismissal', { tag: ['@popover', '@interact-outside', '@keyboard'] }, async ({ page }) => {
  const scope = await visit(page, 'popover', { noCloseOnEsc: '' });
  await open(scope);
  await scope.getByTestId('content').press('Escape');
  await expect(scope.getByTestId('content')).toBeVisible();
  expect(await events(scope, 'close')).toEqual([]);
  await scope.getByTestId('outside').click();
  await expect(scope.getByTestId('content')).toBeHidden();
});

test('Popover preserves hover trigger-to-content movement and leave dismissal', { tag: ['@popover', '@hover'] }, async ({ page }) => {
  const scope = await visit(page, 'popover', { hover: '' });
  await scope.getByTestId('trigger').hover();
  await expect(scope.getByTestId('content')).toBeVisible();
  await scope.getByTestId('inside').hover();
  await expect(scope.getByTestId('content')).toBeVisible();
  await scope.getByTestId('outside').hover();
  await expect(scope.getByTestId('content')).toBeHidden();
  expect(await events(scope, 'outside')).toEqual([]);
});

test('Popover preserves hover-triggered keyboard focus and blur', { tag: ['@popover', '@hover', '@focus'] }, async ({ page }) => {
  const scope = await visit(page, 'popover', { hover: '' });
  await scope.getByTestId('trigger').focus();
  await expect(scope.getByTestId('content')).toBeVisible();
  await scope.getByTestId('focus-target').focus();
  await expect(scope.getByTestId('content')).toBeHidden();
  expect(await events(scope, 'outside')).toEqual([]);
});

test('Popover does not report outside clicks in hover mode', { tag: ['@popover', '@hover', '@interact-outside'] }, async ({ page }) => {
  const scope = await visit(page, 'popover', { hover: '', controlled: '', holdOpen: '', initiallyOpen: '' });
  await scope.getByTestId('outside').click();
  await expect(scope.getByTestId('content')).toBeVisible();
  expect(await events(scope, 'outside')).toEqual([]);
});

test('Popover suppresses rendering and outside callbacks while disabled', { tag: ['@popover', '@interact-outside'] }, async ({ page }) => {
  const scope = await visit(page, 'popover', { disabled: '', initiallyOpen: '' });
  await expect(scope.getByTestId('content')).toHaveCount(0);
  await scope.getByTestId('outside').click();
  expect(await events(scope, 'outside')).toEqual([]);
  expect(await events(scope, 'close')).toEqual([]);
});
