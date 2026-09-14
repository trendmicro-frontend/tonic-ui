/* eslint-disable react/jsx-no-bind */
/**
 * Toggle-wiring contracts for `Dropdown` and the library
 * compatibility shim `DropdownShim` (legacy ergonomics: `slots.toggle`,
 * `slotProps.toggle`, `children` as toggle content).
 * `DropdownShim` is the sanctioned shim built on the public context-aware
 * toggle components, mirroring the wrapper chains in the V1E apps
 * (Multiselect → SearchDropdown → Dropdown).
 *
 * Patterns pinned:
 *   1. `renderToggle` onto the default `DropdownToggle`-style toggle
 *   2. `renderToggle` onto `DropdownButton` (legacy-style toggle component swap)
 *   3. `DropdownShim` — `slots.toggle` / `slotProps.toggle` / `children`
 *   4. A two-level wrapper chain where an outer wrapper injects a local default toggle
 *   5. Non-button content inside a context-aware toggle (Tag-like)
 *
 * The raw `Dropdown` default toggle calls `renderItem(value)` with the raw
 * value (`null` before any selection) — non-null-safe `renderItem`
 * implementations throw — `DropdownShim` mirrors this behavior (no extra
 * guard): pass a null-safe `renderItem` or provide `children`.
 * `children` passed directly to `Dropdown` are ignored (the library layer does
 * not consume them; children ergonomics are wrapper-owned).
 */
import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '@tonic-ui/react/test-utils/render';
import {
  Box,
  Dropdown,
  DropdownButton,
  DropdownToggle,
} from '@tonic-ui/react/src';
import React, { forwardRef } from 'react';
import DropdownShim from './DropdownShim';

const items = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
];

// Pattern 4 fixture: an outer wrapper injecting its OWN local default toggle
// when the consumer does not provide one (the Multiselect shape:
// `slots={{...slots, toggle: slots?.toggle ?? LocalDefault}}`).
const OuterWrapperWithLocalDefault = forwardRef(
  ({ children, slots = {}, slotProps = {}, ...rest }, ref) => (
    <DropdownShim
      ref={ref}
      slots={{ ...slots, toggle: slots?.toggle ?? DropdownButton }}
      slotProps={slotProps}
      {...rest}
    >
      {children}
    </DropdownShim>
  )
);
OuterWrapperWithLocalDefault.displayName = 'OuterWrapperWithLocalDefault';

const openMenu = async (user) => {
  await user.click(screen.getByRole('button'));
  return screen.findByRole('menu');
};

describe('Dropdown toggle-wiring compat patterns', () => {
  describe('pattern 1: renderToggle onto the default DropdownToggle-style toggle', () => {
    it('overrides the default toggle content and stays wired', async () => {
      const user = userEvent.setup();
      render(
        <Dropdown
          items={items}
          defaultValue={items[0]}
          renderToggle={({ renderItem, value }) => (
            <DropdownButton>
              {value ? renderItem(value) : 'Select…'}
            </DropdownButton>
          )}
        />
      );

      expect(screen.getByRole('button')).toHaveTextContent('Apple');
      const menu = await openMenu(user);
      expect(menu).toBeInTheDocument();
      expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('pattern 2: renderToggle onto DropdownButton', () => {
    it('wires the swap component to the menu', async () => {
      const user = userEvent.setup();
      render(
        <Dropdown
          items={items}
          renderToggle={() => (
            <DropdownButton>Options</DropdownButton>
          )}
        />
      );

      const toggle = screen.getByRole('button');
      expect(toggle).toHaveTextContent('Options');
      expect(toggle).toHaveAttribute('aria-haspopup', 'menu');
      await openMenu(user);
      expect(toggle).toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('DropdownShim: library compat shim (toggle slot / toggle props / children)', () => {
    it('slots.toggle swaps the toggle component and it is auto-wired to the menu', async () => {
      const user = userEvent.setup();
      render(<DropdownShim items={items} slots={{ toggle: DropdownButton }} />);

      const toggle = screen.getByRole('button');
      expect(toggle).toHaveAttribute('aria-haspopup', 'menu');

      const menu = await openMenu(user);
      expect(menu).toBeInTheDocument();
      expect(screen.getByText('Apple')).toBeInTheDocument();
      expect(toggle).toHaveAttribute('aria-expanded', 'true');
    });

    it('children override the toggle content; the selected value label is the fallback', () => {
      const { rerender } = render(
        <DropdownShim items={items} defaultValue={items[0]}>
          Custom Label
        </DropdownShim>
      );
      expect(screen.getByRole('button')).toHaveTextContent('Custom Label');

      rerender(<DropdownShim items={items} defaultValue={items[0]} />);
      expect(screen.getByRole('button')).toHaveTextContent('Apple');
    });

    it('defaults to a DropdownButton toggle with an empty label before any selection', () => {
      render(<DropdownShim items={items} />);
      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.getByRole('button')).toHaveTextContent('');
    });

    it('the value fallback mirrors the raw Dropdown: a non-null-safe renderItem throws before selection', () => {
      const nonNullSafeRenderItem = (item) => item.label ?? item.value;
      expect(() =>
        render(<DropdownShim items={items} renderItem={nonNullSafeRenderItem} />)
      ).toThrow();
    });

    it('slotProps.toggle.onClick chains: consumer handler fires AND the menu still opens', async () => {
      const user = userEvent.setup();
      const consumerOnClick = jest.fn();
      render(
        <DropdownShim
          items={items}
          slotProps={{ toggle: { onClick: consumerOnClick } }}
        />
      );

      await openMenu(user);
      expect(consumerOnClick).toHaveBeenCalledTimes(1);
      expect(await screen.findByRole('menu')).toBeInTheDocument();
    });

    it('preventDefault in slotProps.toggle.onClick vetoes the menu (callEventHandlers semantics)', async () => {
      const user = userEvent.setup();
      render(
        <DropdownShim
          items={items}
          slotProps={{ toggle: { onClick: (event) => event.preventDefault() } }}
        />
      );

      await user.click(screen.getByRole('button'));
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 300));
      });
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
      expect(screen.getByRole('button')).not.toHaveAttribute('aria-expanded', 'true');
    });

    it('slotProps.toggle data/style props land on the toggle element', () => {
      render(
        <DropdownShim
          items={items}
          slotProps={{ toggle: { 'data-foo': 'bar' } }}
        />
      );
      expect(screen.getByRole('button')).toHaveAttribute('data-foo', 'bar');
    });

    it('slotProps.toggle disabled gates interaction', async () => {
      const user = userEvent.setup();
      render(
        <DropdownShim
          items={items}
          slotProps={{ toggle: { disabled: true } }}
        />
      );

      const toggle = screen.getByRole('button');
      expect(toggle).toBeDisabled();
      await user.click(toggle);
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 300));
      });
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });

    it('popper/transition customization flows through slotProps.content (content passthrough)', async () => {
      const user = userEvent.setup();
      render(
        <DropdownShim
          items={items}
          slotProps={{ content: { slotProps: { popper: { 'data-popper-marker': 'yes' } } } }}
        />
      );

      const menu = await openMenu(user);
      await waitFor(() => {
        const popper = menu.closest('[data-popper-marker="yes"]');
        expect(popper).not.toBeNull();
      });
    });
  });

  describe('pattern 4: two-level wrapper chain with a local default toggle', () => {
    it('outer wrapper local default (DropdownButton) applies when the consumer passes no toggle slot', async () => {
      const user = userEvent.setup();

      render(<OuterWrapperWithLocalDefault items={items} defaultValue={items[0]} />);
      expect(screen.getByRole('button')).toHaveTextContent('Apple');
      await openMenu(user);
    });

    it('consumer slots.toggle wins through the chain and slotProps.toggle lands on the toggle', async () => {
      const user = userEvent.setup();

      render(
        <OuterWrapperWithLocalDefault
          items={items}
          slots={{ toggle: DropdownButton }}
          slotProps={{ toggle: { 'data-through-chain': 'yes' } }}
        />
      );
      const toggle = screen.getByRole('button');
      expect(toggle).toHaveAttribute('data-through-chain', 'yes');
      await openMenu(user);
      expect(toggle).toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('pattern 5: non-button toggle content (Tag-like)', () => {
    it('a Tag-like element inside DropdownToggle opens the menu on click', async () => {
      const user = userEvent.setup();
      render(
        <Dropdown
          items={items}
          renderToggle={() => (
            <DropdownToggle data-testid="tag-toggle">
              <Box as="span">Options</Box>
            </DropdownToggle>
          )}
        />
      );

      const toggle = screen.getByTestId('tag-toggle');
      expect(toggle).toHaveAttribute('role', 'button');
      await user.click(toggle);
      expect(await screen.findByRole('menu')).toBeInTheDocument();
    });

    it('disabled on DropdownToggle gates interaction', async () => {
      const user = userEvent.setup();
      render(
        <Dropdown
          items={items}
          renderToggle={() => (
            <DropdownToggle data-testid="tag-toggle" disabled>
              <Box as="span">Options</Box>
            </DropdownToggle>
          )}
        />
      );

      const toggle = screen.getByTestId('tag-toggle');
      expect(toggle).toHaveAttribute('aria-disabled', 'true');
      await user.click(toggle);
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });
  });

  describe('menu wiring integrity (default path)', () => {
    it('menu aria-labelledby points at the generated toggle id', async () => {
      const user = userEvent.setup();
      render(<DropdownShim items={items} />);

      const toggle = screen.getByRole('button');
      const menu = await openMenu(user);
      const labelledby = menu.getAttribute('aria-labelledby');
      expect(labelledby).toBeTruthy();
      expect(labelledby).toBe(toggle.id);
    });
  });

  describe('library behavior', () => {
    it('the raw Dropdown default toggle calls consumer renderItem with the raw value (null before selection) — non-null-safe renderItem throws', () => {
      const nonNullSafeRenderItem = (item) => item.label ?? item.value;
      expect(() =>
        render(<Dropdown items={items} renderItem={nonNullSafeRenderItem} />)
      ).toThrow();
    });

    it('children passed directly to Dropdown are ignored — children ergonomics belong to wrappers/DropdownShim', () => {
      render(
        <Dropdown items={items} defaultValue={items[0]}>
          Direct Children
        </Dropdown>
      );
      const toggle = screen.getByRole('button');
      expect(toggle).not.toHaveTextContent('Direct Children');
      expect(toggle).toHaveTextContent('Apple');
    });
  });
});
