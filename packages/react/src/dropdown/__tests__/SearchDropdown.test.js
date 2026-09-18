/* eslint-disable react/jsx-no-bind */
/**
 * Modern `SearchDropdown` usage (fixture: `SearchDropdown.js`).
 *
 * Pins the current recipe: the wrapper owns the search state and injects the
 * search input through `renderContent`, filters items client-side, and leaves
 * the toggle to the consumer through `renderToggle`.
 *
 * Legacy counterpart: `SearchDropdownShim.test.js` pins the same recipe written
 * with the legacy shim ergonomics (`slots.toggle` / `slotProps.toggle` /
 * `children`) — both must stay migratable to each other.
 */
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '@tonic-ui/react/test-utils/render';
import {
  Box,
  DropdownButton,
} from '@tonic-ui/react/src';
import React from 'react';
import SearchDropdown from './SearchDropdown';

const items = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
];

// The default toggle calls `renderItem(null)` before any selection, so the
// consumer-owned toggle guards the empty value.
const renderToggle = ({ renderItem, value }) => (
  <DropdownButton>
    {value ? renderItem(value) : 'Select…'}
  </DropdownButton>
);

const openMenu = async (user) => {
  await user.click(screen.getByRole('button'));
  return screen.findByRole('menu');
};

const waitForCloseTransition = async () => {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
  });
};

describe('SearchDropdown (modern usage)', () => {
  it('renders the search layout; typing filters items and renderItem receives searchKeyword', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <SearchDropdown
        items={items}
        renderToggle={renderToggle}
        renderItem={(item, { searchKeyword }) => (
          <Box
            data-keyword={searchKeyword}
            data-testid={`item-${item.value}`}
          >
            {item.label}
          </Box>
        )}
      />
    );

    await openMenu(user);
    const searchInput = container.querySelector('input');
    expect(searchInput).toBeInTheDocument();
    expect(screen.getByTestId('item-apple')).toHaveAttribute('data-keyword', '');

    await user.type(searchInput, 'app');
    expect(screen.getByTestId('item-apple')).toHaveAttribute('data-keyword', 'app');
    expect(screen.queryByTestId('item-banana')).not.toBeInTheDocument();
  });

  it('shows the empty state when no item matches the search keyword', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <SearchDropdown
        items={items}
        renderToggle={renderToggle}
      />
    );

    await openMenu(user);
    expect(screen.queryByText('No options')).not.toBeInTheDocument();

    await user.type(container.querySelector('input'), 'zzz');
    expect(screen.getByText('No options')).toBeInTheDocument();
    expect(screen.queryByText('Apple')).not.toBeInTheDocument();
    expect(screen.queryByText('Banana')).not.toBeInTheDocument();
  });

  it('resets the search keyword when the menu closes; reopening shows all items', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <SearchDropdown
        items={items}
        renderToggle={renderToggle}
      />
    );

    await openMenu(user);
    await user.type(container.querySelector('input'), 'app');
    expect(screen.queryByText('Banana')).not.toBeInTheDocument();

    await user.keyboard('{Escape}');
    await waitForCloseTransition();
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();

    await openMenu(user);
    expect(container.querySelector('input')).toHaveValue('');
    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('Banana')).toBeInTheDocument();
  });

  it('closeOnSelect={false} keeps the menu open after selecting', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(
      <SearchDropdown
        items={items}
        closeOnSelect={false}
        defaultValue={items[0]}
        onChange={onChange}
        renderToggle={renderToggle}
      />
    );

    await openMenu(user);
    await user.click(screen.getByText('Banana'));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(await screen.findByRole('menu')).toBeInTheDocument();
  });

  it('forwards renderToggle so the consumer-owned toggle stays wired to the menu', async () => {
    const user = userEvent.setup();
    render(
      <SearchDropdown
        items={items}
        defaultValue={items[0]}
        renderToggle={({ renderItem, value }) => (
          <DropdownButton data-recipe="yes">
            {value ? renderItem(value) : 'Select…'}
          </DropdownButton>
        )}
      />
    );

    const toggle = screen.getByRole('button');
    expect(toggle).toHaveTextContent('Apple');
    expect(toggle).toHaveAttribute('data-recipe', 'yes');
    expect(toggle).not.toHaveAttribute('aria-expanded', 'true');

    await openMenu(user);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
  });
});
