import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { testA11y } from '@tonic-ui/react/test-utils/accessibility';
import { render } from '@tonic-ui/react/test-utils/render';
import {
  Dropdown,
} from '@tonic-ui/react/src';
import React from 'react';
import DropdownChip from '../DropdownChip';

const items = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
];

// The pill is the toggle; the close button is a sibling overlay next to it.
const getPill = (container) => container.querySelector('[role="button"]');
const getCloseButton = (container) => container.querySelector('[data-tonic="TagCloseButton"]');

const renderChipToggle = (chipProps) => ({ renderItem, value }) => (
  <DropdownChip {...chipProps}>
    {value ? renderItem(value) : 'Select…'}
  </DropdownChip>
);

describe('DropdownChip', () => {
  it('opens the menu and matches the snapshot, with no a11y violations', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Dropdown
        items={items}
        defaultValue={items[0]}
        renderToggle={renderChipToggle()}
      />
    );
    expect(getPill(container)).toHaveTextContent('Apple');

    await user.click(getPill(container));
    expect(await screen.findByRole('menu')).toBeInTheDocument();
    await act(() => new Promise((resolve) => setTimeout(resolve, 300)));

    expect(container).toMatchSnapshot();
    await testA11y(container);
  });

  it('makes the whole pill the toggle, with the close button as a sibling, and no a11y violations', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Dropdown
        items={items}
        defaultValue={items[0]}
        renderToggle={renderChipToggle({ isClosable: true, onClose: () => {} })}
      />
    );

    const pill = getPill(container);
    const closeButton = getCloseButton(container);
    expect(pill.tagName).toBe('DIV');
    expect(pill).toHaveAttribute('tabindex', '0');
    expect(closeButton.tagName).toBe('BUTTON');
    expect(pill).not.toContainElement(closeButton);

    // The whole pill is the toggle: pointer cursor across the chip, and the
    // white keyboard focus ring (not the blue `Tag` outline).
    expect(pill).toHaveStyleRule('cursor', 'pointer');
    expect(pill).toHaveStyleRule('border-color', 'var(--tonic-colors-_component-keyboardFocused-outerFocusRing)', { target: ':focus-visible' });
    expect(pill).toHaveStyleRule('box-shadow', 'inset 0 0 0 .0625rem #ffffff,inset 0 0 0 .125rem #000000', { target: ':focus-visible' });
    expect(pill).toHaveStyleRule('outline', 'none', { target: ':focus-visible' });
    // A z-index on the focused pill would paint it above the overlay and hide the
    // close button; stacking stays on DOM order instead.
    expect(pill).not.toHaveStyleRule('z-index', '1', { target: ':focus-visible' });

    await user.click(pill);
    expect(await screen.findByRole('menu')).toBeInTheDocument();
    await act(() => new Promise((resolve) => setTimeout(resolve, 300)));

    expect(container).toMatchSnapshot();
    await testA11y(container);
  });

  it('updates the chip label when an item is selected', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Dropdown
        items={items}
        defaultValue={items[0]}
        renderToggle={renderChipToggle()}
      />
    );

    await user.click(getPill(container));
    await user.click(await screen.findByRole('menuitem', { name: 'Banana' }));
    expect(getPill(container)).toHaveTextContent('Banana');
  });

  it('does not open the menu when disabled', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Dropdown
        items={items}
        renderToggle={renderChipToggle({ disabled: true })}
      />
    );

    const pill = getPill(container);
    expect(pill).toHaveAttribute('aria-disabled', 'true');
    expect(pill).toHaveStyleRule('cursor', 'not-allowed');
    await user.click(pill);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('isClosable calls onClose without toggling the menu', async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();
    const { container } = render(
      <Dropdown
        items={items}
        defaultValue={items[0]}
        renderToggle={renderChipToggle({ isClosable: true, onClose })}
      />
    );

    await user.click(getPill(container));
    expect(await screen.findByRole('menu')).toBeInTheDocument();

    await user.click(getCloseButton(container));
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('menu')).toBeInTheDocument();
  });
});
