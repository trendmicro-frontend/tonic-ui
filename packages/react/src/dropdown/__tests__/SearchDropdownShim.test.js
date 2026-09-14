/* eslint-disable react/jsx-no-bind */
/**
 * Legacy `SearchDropdown` usage (fixture: `SearchDropdownShim.js`).
 *
 * Pins the recipe legacy consumers use today on top of the shim ergonomics —
 * the wrapper owns `renderSearchInput` and injects it (plus `searchKeyword`)
 * into the consumer's `renderContent`, the toggle comes from `slots.toggle` /
 * `slotProps.toggle` / `children`, and filtering plus keyword reset live inside
 * the wrapper.
 *
 * Modern counterpart: `SearchDropdown.test.js` pins the same recipe written
 * against `renderToggle` / `renderContent` — both must stay migratable to each
 * other.
 */
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '@tonic-ui/react/test-utils/render';
import {
  Box,
  DropdownButton,
} from '@tonic-ui/react/src';
import React from 'react';
import SearchDropdownShim from './SearchDropdownShim';

const items = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
];

const openMenu = async (user) => {
  await user.click(screen.getByRole('button'));
  return screen.findByRole('menu');
};

const waitForCloseTransition = async () => {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
  });
};

describe('SearchDropdownShim (legacy usage)', () => {
  it('renders the default search layout; typing filters items and renderItem receives searchKeyword', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <SearchDropdownShim
        items={items}
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

  it('consumer renderContent override receives renderSearchInput and searchKeyword (legacy contract)', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <SearchDropdownShim
        items={items}
        renderContent={({ items: contentItems, renderItems, renderSearchInput, searchKeyword }) => (
          <>
            <div data-testid="custom-layout">{renderSearchInput()}</div>
            <div data-testid="keyword">{searchKeyword}</div>
            {renderItems(contentItems)}
          </>
        )}
      />
    );

    await openMenu(user);
    const searchInput = container.querySelector('input');
    expect(screen.getByTestId('custom-layout')).toContainElement(searchInput);
    expect(screen.getByTestId('keyword')).toHaveTextContent('');

    await user.type(searchInput, 'ban');
    expect(screen.getByTestId('keyword')).toHaveTextContent('ban');
    expect(screen.queryByText('Apple')).not.toBeInTheDocument();
    expect(screen.getByText('Banana')).toBeInTheDocument();
  });

  it('resets the search keyword when the menu closes; reopening shows all items', async () => {
    const user = userEvent.setup();
    const { container } = render(<SearchDropdownShim items={items} />);

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

  it('closeOnSelect={false} keeps the menu open after selecting through the chain', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(
      <SearchDropdownShim
        items={items}
        closeOnSelect={false}
        defaultValue={items[0]}
        onChange={onChange}
      />
    );

    await openMenu(user);
    await user.click(screen.getByText('Banana'));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(await screen.findByRole('menu')).toBeInTheDocument();
  });

  it('children and the toggle slot pass through the recipe to the toggle', async () => {
    const user = userEvent.setup();
    render(
      <SearchDropdownShim
        items={items}
        slots={{ toggle: DropdownButton }}
        slotProps={{ toggle: { 'data-recipe': 'yes' } }}
      >
        Filter
      </SearchDropdownShim>
    );

    const toggle = screen.getByRole('button');
    expect(toggle).toHaveTextContent('Filter');
    expect(toggle).toHaveAttribute('data-recipe', 'yes');
    await openMenu(user);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
  });
});
