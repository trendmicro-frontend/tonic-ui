/**
 * Cascade-order proof tests for MenuButton's `__sx` migration.
 *
 * Why these tests matter:
 *   - Button routes its base styles through `__sx` (tier 0). The fold order for a
 *     MenuButton in the Box `__sx` array is:
 *       [buttonBaseStyle, buttonStyle, menuLayout, menuOverride, ...incomingMenuButton__sx]
 *   - Consumer `sx` (tier 4) is injected by Box AFTER `__sx`, so it always wins.
 *   - The menu override (`text.primary` on hover/active) must appear AFTER Button's
 *     `text.accent` hover rule in the generated stylesheet — same specificity, so
 *     source-order decides. These tests assert that CSS rule ordering.
 *
 * Token → CSS-variable mapping (dark mode, useCSSVariables):
 *   text.accent   → var(--tonic-colors-text-accent)
 *   text.primary  → var(--tonic-colors-text-primary)
 */
import React from 'react';
import { render } from '@tonic-ui/react/test-utils/render';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@tonic-ui/react/src';

const textAccentVar = 'var(--tonic-colors-text-accent)';
const textPrimaryVar = 'var(--tonic-colors-text-primary)';

/**
 * Collect all CSS text rules from all emotion <style data-emotion> sheets,
 * preserving their injection order (= cascade source order).
 */
const collectEmotionCssRules = () =>
  [...document.querySelectorAll('style[data-emotion]')]
    .flatMap((el) => (el.sheet ? [...el.sheet.cssRules].map((r) => r.cssText) : []));

const renderMenuButton = (props = {}) =>
  render(
    <Menu>
      <MenuButton variant="secondary" data-testid="btn" {...props}>
        Open
      </MenuButton>
      <MenuList>
        <MenuItem>Item 1</MenuItem>
      </MenuList>
    </Menu>
  );

describe('MenuButton __sx cascade order', () => {
  /**
   * (a) Override beats Button via `__sx`.
   *
   * MenuButton's `text.primary` hover rule must appear AFTER Button's `text.accent`
   * hover rule in the emotion stylesheet so that, at equal specificity (one
   * pseudo-class each), the primary color wins via source order.
   *
   * This assertion FAILS if:
   *   - the menuOverride is dropped from `__sx`, or
   *   - the fold order changes so that buttonStyle ends up after menuOverride
   *     (which would flip the cascade so text.accent wins again).
   */
  it('menu override (text.primary) appears AFTER Button base (text.accent) in CSS for hover — override wins', () => {
    renderMenuButton();

    const btn = document.querySelector('[data-testid="btn"]');
    const buttonClass = [...btn.classList].find((cls) => cls.startsWith('css-'));
    expect(buttonClass).toBeTruthy();

    const cssRules = collectEmotionCssRules();

    // Both color rules must exist in the stylesheet
    const accentHoverIndex = cssRules.findIndex(
      (r) => r.includes(`.${buttonClass}:hover`) && r.includes(textAccentVar)
    );
    const primaryHoverIndex = cssRules.findIndex(
      (r) => r.includes(`.${buttonClass}:hover`) && r.includes(textPrimaryVar)
    );

    // Both rules must be present — if either is missing the override is broken
    expect(accentHoverIndex).toBeGreaterThan(-1);
    expect(primaryHoverIndex).toBeGreaterThan(-1);

    // The menu override (text.primary) MUST come after Button's base (text.accent)
    // in source order. If this flips, text.accent wins on hover instead of text.primary.
    expect(primaryHoverIndex).toBeGreaterThan(accentHoverIndex);
  });

  /**
   * (b) Consumer `sx` still wins over the menu override.
   *
   * A consumer-supplied `sx` hover color must appear AFTER the menu override in
   * the stylesheet. `sx` is injected at tier 4 by Box, which is after `__sx`
   * (tier 0), so it should always win in source order.
   *
   * This assertion FAILS if:
   *   - Box stops honoring `sx` > `__sx` ordering, or
   *   - the consumer's `sx` is accidentally merged into `__sx` at a lower tier.
   */
  it('consumer sx hover color appears AFTER menu override (text.primary) — consumer wins', () => {
    // Use a raw color that is distinct from both text.accent and text.primary so
    // we can unambiguously locate each rule in the stylesheet.
    const consumerHoverColor = 'rgb(255, 0, 128)';

    renderMenuButton({
      sx: {
        '&:hover': { color: consumerHoverColor },
      },
    });

    const btn = document.querySelector('[data-testid="btn"]');
    const buttonClass = [...btn.classList].find((cls) => cls.startsWith('css-'));
    expect(buttonClass).toBeTruthy();

    const cssRules = collectEmotionCssRules();

    // The menu override rule (text.primary on hover) must exist
    const primaryHoverIndex = cssRules.findIndex(
      (r) => r.includes(`.${buttonClass}:hover`) && r.includes(textPrimaryVar)
    );
    // The consumer rule must exist
    const consumerHoverIndex = cssRules.findIndex(
      (r) => r.includes(`.${buttonClass}:hover`) && r.includes(consumerHoverColor)
    );

    expect(primaryHoverIndex).toBeGreaterThan(-1);
    expect(consumerHoverIndex).toBeGreaterThan(-1);

    // Consumer sx MUST appear after the menu override in source order.
    // If this flips, the consumer can no longer override a menu button's hover color.
    expect(consumerHoverIndex).toBeGreaterThan(primaryHoverIndex);
  });
});
