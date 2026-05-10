import { useState } from 'react';
import { render, screen, waitFor } from '../../../test-utils/render';
import userEvent from '@testing-library/user-event';
import { MenuButtonToggle, TagToggle } from '../../dropdown';
import { SearchDropdown } from '../index';

const items = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry', props: { disabled: true } },
];

// The search input has role="menuitem" for menu keyboard navigation (per SearchDropdown
// implementation), so we locate it by element type rather than ARIA role.
const getSearchInput = () => document.querySelector('input');

// The clear (×) button lives inside the SearchInput component
const getClearButton = () => document.querySelector('[data-tonic="SearchInput"] button');

const defaultRenderToggle = ({ getToggleProps }) => (
  <MenuButtonToggle {...getToggleProps({ 'data-testid': 'toggle' })}>Select</MenuButtonToggle>
);

const openMenu = async (user) => {
  await user.click(screen.getByTestId('toggle'));
  return screen.findByRole('menu');
};

describe('SearchDropdown', () => {
  describe('default layout', () => {
    it('renders a search input inside the menu content when open', async () => {
      const user = userEvent.setup();
      render(<SearchDropdown items={items} renderToggle={defaultRenderToggle} />);
      await openMenu(user);
      expect(getSearchInput()).toBeInTheDocument();
    });

    it('renders all items initially with no filter applied', async () => {
      const user = userEvent.setup();
      render(<SearchDropdown items={items} renderToggle={defaultRenderToggle} />);
      await openMenu(user);
      expect(screen.getByText('Apple')).toBeInTheDocument();
      expect(screen.getByText('Banana')).toBeInTheDocument();
      expect(screen.getByText('Cherry')).toBeInTheDocument();
    });
  });

  describe('filtering', () => {
    it('filters items by label when typing in the search input', async () => {
      const user = userEvent.setup();
      render(<SearchDropdown items={items} renderToggle={defaultRenderToggle} />);
      await openMenu(user);
      await user.type(getSearchInput(), 'an');
      await waitFor(() => {
        expect(screen.queryByText('Apple')).not.toBeInTheDocument();
        expect(screen.getByText('Banana')).toBeInTheDocument();
        expect(screen.queryByText('Cherry')).not.toBeInTheDocument();
      });
    });

    it('shows no items when no label matches the search keyword', async () => {
      const user = userEvent.setup();
      render(<SearchDropdown items={items} renderToggle={defaultRenderToggle} />);
      await openMenu(user);
      await user.type(getSearchInput(), 'xyz');
      await waitFor(() => {
        expect(screen.queryByText('Apple')).not.toBeInTheDocument();
        expect(screen.queryByText('Banana')).not.toBeInTheDocument();
        expect(screen.queryByText('Cherry')).not.toBeInTheDocument();
      });
    });

    it('filters case-insensitively', async () => {
      const user = userEvent.setup();
      render(<SearchDropdown items={items} renderToggle={defaultRenderToggle} />);
      await openMenu(user);
      await user.type(getSearchInput(), 'APPLE');
      await waitFor(() => {
        expect(screen.getByText('Apple')).toBeInTheDocument();
        expect(screen.queryByText('Banana')).not.toBeInTheDocument();
      });
    });

    it('trims whitespace from the keyword before matching', async () => {
      const user = userEvent.setup();
      render(<SearchDropdown items={items} renderToggle={defaultRenderToggle} />);
      await openMenu(user);
      // Leading/trailing spaces are trimmed, so '  apple  ' still matches 'Apple'
      await user.type(getSearchInput(), '  apple  ');
      await waitFor(() => {
        expect(screen.getByText('Apple')).toBeInTheDocument();
        expect(screen.queryByText('Banana')).not.toBeInTheDocument();
      });
    });

    it('filters by label only — item.value is not searched', async () => {
      const user = userEvent.setup();
      const labelOnlyItems = [
        { value: 'unique-value-xyz', label: 'Apple' },
        { value: 'banana', label: 'Banana' },
      ];
      render(<SearchDropdown items={labelOnlyItems} renderToggle={defaultRenderToggle} />);
      await openMenu(user);
      await user.type(getSearchInput(), 'unique-value-xyz');
      await waitFor(() => {
        // Apple's label does not contain 'unique-value-xyz', so it is filtered out
        expect(screen.queryByText('Apple')).not.toBeInTheDocument();
        expect(screen.queryByText('Banana')).not.toBeInTheDocument();
      });
    });

    it('restores all items when the search input is cleared', async () => {
      const user = userEvent.setup();
      render(<SearchDropdown items={items} renderToggle={defaultRenderToggle} />);
      await openMenu(user);
      await user.type(getSearchInput(), 'ban');
      await waitFor(() => expect(screen.queryByText('Apple')).not.toBeInTheDocument());
      await user.clear(getSearchInput());
      await waitFor(() => {
        expect(screen.getByText('Apple')).toBeInTheDocument();
        expect(screen.getByText('Banana')).toBeInTheDocument();
        expect(screen.getByText('Cherry')).toBeInTheDocument();
      });
    });
  });

  describe('search input clear button', () => {
    it('clicking the × button resets the search and shows all items', async () => {
      const user = userEvent.setup();
      render(<SearchDropdown items={items} renderToggle={defaultRenderToggle} />);
      await openMenu(user);
      await user.type(getSearchInput(), 'ban');
      await waitFor(() => expect(screen.queryByText('Apple')).not.toBeInTheDocument());

      await user.click(getClearButton());

      await waitFor(() => {
        expect(screen.getByText('Apple')).toBeInTheDocument();
        expect(screen.getByText('Banana')).toBeInTheDocument();
        expect(screen.getByText('Cherry')).toBeInTheDocument();
      });
    });
  });

  describe('search reset on close', () => {
    it('clears the search keyword when the menu closes and shows all items on reopen', async () => {
      const user = userEvent.setup();
      render(<SearchDropdown items={items} renderToggle={defaultRenderToggle} />);
      await openMenu(user);
      await user.type(getSearchInput(), 'ban');
      await waitFor(() => expect(screen.queryByText('Apple')).not.toBeInTheDocument());

      // The search input's onKeyDown calls stopPropagation for all keys including Escape,
      // so close the menu by clicking outside instead.
      await user.click(document.body);
      await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument());

      // Reopen — all items should be visible again (onClose cleared the keyword)
      await openMenu(user);
      expect(screen.getByText('Apple')).toBeInTheDocument();
      expect(screen.getByText('Banana')).toBeInTheDocument();
      expect(screen.getByText('Cherry')).toBeInTheDocument();
    });
  });

  describe('value management', () => {
    it('uncontrolled: shows defaultValue label in the toggle on initial render', () => {
      render(
        <SearchDropdown
          items={items}
          defaultValue={items[0]}
          renderToggle={({ getToggleProps, value, renderItem }) => (
            <MenuButtonToggle {...getToggleProps({ 'data-testid': 'toggle' })}>
              {value ? renderItem(value) : 'None'}
            </MenuButtonToggle>
          )}
        />
      );
      expect(screen.getByTestId('toggle')).toHaveTextContent('Apple');
    });

    it('uncontrolled: calls onChange with the clicked item', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();
      render(
        <SearchDropdown
          items={items}
          onChange={onChange}
          renderToggle={defaultRenderToggle}
        />
      );
      await openMenu(user);
      await user.click(screen.getByText('Banana'));
      expect(onChange).toHaveBeenCalledWith(items[1]);
    });

    it('uncontrolled: toggle reflects new selection after clicking an item', async () => {
      const user = userEvent.setup();
      render(
        <SearchDropdown
          items={items}
          defaultValue={items[0]}
          renderToggle={({ getToggleProps, value, renderItem }) => (
            <MenuButtonToggle {...getToggleProps({ 'data-testid': 'toggle' })}>
              {value ? renderItem(value) : 'None'}
            </MenuButtonToggle>
          )}
        />
      );
      expect(screen.getByTestId('toggle')).toHaveTextContent('Apple');
      await openMenu(user);
      await user.click(screen.getByText('Banana'));
      await waitFor(() => {
        expect(screen.getByTestId('toggle')).toHaveTextContent('Banana');
      });
    });

    it('controlled: toggle reflects the value prop', () => {
      render(
        <SearchDropdown
          items={items}
          value={items[2]}
          renderToggle={({ getToggleProps, value, renderItem }) => (
            <MenuButtonToggle {...getToggleProps({ 'data-testid': 'toggle' })}>
              {value ? renderItem(value) : 'None'}
            </MenuButtonToggle>
          )}
        />
      );
      expect(screen.getByTestId('toggle')).toHaveTextContent('Cherry');
    });

    it('controlled: calls onChange on item click but does not update the toggle without a parent state change', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();
      render(
        <SearchDropdown
          items={items}
          value={items[0]}
          onChange={onChange}
          renderToggle={({ getToggleProps, value, renderItem }) => (
            <MenuButtonToggle {...getToggleProps({ 'data-testid': 'toggle' })}>
              {value ? renderItem(value) : 'None'}
            </MenuButtonToggle>
          )}
        />
      );
      await openMenu(user);
      await user.click(screen.getByText('Banana'));
      expect(onChange).toHaveBeenCalledWith(items[1]);
      // Controlled value is fixed — toggle still shows Apple
      expect(screen.getByTestId('toggle')).toHaveTextContent('Apple');
    });

    it('controlled: toggle updates when the parent state changes', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();
      const ControlledSearchDropdown = () => {
        const [value, setValue] = useState(items[0]);
        return (
          <SearchDropdown
            items={items}
            value={value}
            onChange={(item) => {
              setValue(item);
              onChange(item);
            }}
            renderToggle={({ getToggleProps, value: v, renderItem }) => (
              <MenuButtonToggle {...getToggleProps({ 'data-testid': 'toggle' })}>
                {v ? renderItem(v) : 'None'}
              </MenuButtonToggle>
            )}
          />
        );
      };
      render(<ControlledSearchDropdown />);
      expect(screen.getByTestId('toggle')).toHaveTextContent('Apple');
      await openMenu(user);
      await user.click(screen.getByText('Banana'));
      expect(onChange).toHaveBeenCalledWith(items[1]);
      await waitFor(() => {
        expect(screen.getByTestId('toggle')).toHaveTextContent('Banana');
      });
    });
  });

  describe('callbacks', () => {
    it('calls the user-provided onClose when the menu closes', async () => {
      const user = userEvent.setup();
      const onClose = jest.fn();
      render(
        <SearchDropdown
          items={items}
          renderToggle={defaultRenderToggle}
          onClose={onClose}
        />
      );
      await openMenu(user);
      await user.click(document.body);
      await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument());
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('renderToggle', () => {
    it('renders MenuButtonToggle and reflects the selected value', async () => {
      const user = userEvent.setup();
      render(
        <SearchDropdown
          items={items}
          defaultValue={items[0]}
          renderToggle={({ getToggleProps, value, renderItem }) => (
            <MenuButtonToggle {...getToggleProps({ 'data-testid': 'toggle' })}>
              {value ? renderItem(value) : 'None'}
            </MenuButtonToggle>
          )}
        />
      );
      expect(screen.getByTestId('toggle')).toHaveTextContent('Apple');
      await openMenu(user);
      await user.click(screen.getByText('Banana'));
      await waitFor(() => {
        expect(screen.getByTestId('toggle')).toHaveTextContent('Banana');
      });
    });

    it('renders TagToggle as the custom toggle', async () => {
      const user = userEvent.setup();
      render(
        <SearchDropdown
          items={items}
          renderToggle={({ getToggleProps, value, renderItem }) => (
            <TagToggle {...getToggleProps({ 'data-testid': 'toggle' })}>
              {value ? renderItem(value) : 'Select'}
            </TagToggle>
          )}
        />
      );
      await openMenu(user);
      expect(screen.getByRole('menu')).toBeInTheDocument();
    });
  });

  describe('custom renderContent', () => {
    it('receives renderSearchInput, searchKeyword, items, and renderItems', async () => {
      const user = userEvent.setup();
      const renderContent = jest.fn(({ renderSearchInput, items, renderItems }) => (
        <>
          {renderSearchInput()}
          {renderItems(items)}
        </>
      ));
      render(
        <SearchDropdown
          items={items}
          renderToggle={defaultRenderToggle}
          renderContent={renderContent}
        />
      );
      await openMenu(user);
      expect(renderContent).toHaveBeenCalledWith(
        expect.objectContaining({
          renderSearchInput: expect.any(Function),
          searchKeyword: expect.any(String),
          items: expect.any(Array),
          renderItems: expect.any(Function),
        })
      );
      // renderSearchInput() renders the controlled search input
      expect(getSearchInput()).toBeInTheDocument();
    });

    it('searchKeyword in renderContent updates as the user types', async () => {
      const user = userEvent.setup();
      render(
        <SearchDropdown
          items={items}
          renderToggle={defaultRenderToggle}
          renderContent={({ renderSearchInput, searchKeyword, items, renderItems }) => (
            <>
              {renderSearchInput()}
              <div data-testid="keyword">{searchKeyword}</div>
              {renderItems(items)}
            </>
          )}
        />
      );
      await openMenu(user);
      await user.type(getSearchInput(), 'ban');
      await waitFor(() => {
        expect(screen.getByTestId('keyword')).toHaveTextContent('ban');
      });
    });

    it('items in renderContent is the pre-filtered list', async () => {
      const user = userEvent.setup();
      let capturedItems = null;
      render(
        <SearchDropdown
          items={items}
          renderToggle={defaultRenderToggle}
          renderContent={({ renderSearchInput, items: receivedItems, renderItems }) => {
            capturedItems = receivedItems;
            return (
              <>
                {renderSearchInput()}
                {renderItems(receivedItems)}
              </>
            );
          }}
        />
      );
      await openMenu(user);
      await user.type(getSearchInput(), 'app');
      await waitFor(() => {
        expect(capturedItems).toHaveLength(1);
        expect(capturedItems[0].label).toBe('Apple');
      });
    });
  });

  describe('custom renderItem', () => {
    it('receives (item, { searchKeyword }) as arguments', async () => {
      const user = userEvent.setup();
      const renderItem = jest.fn((item, { searchKeyword }) => (
        <span data-testid={`item-${item.value}`} data-keyword={searchKeyword}>
          {item.label}
        </span>
      ));
      render(
        <SearchDropdown
          items={items}
          renderToggle={defaultRenderToggle}
          renderItem={renderItem}
        />
      );
      await openMenu(user);
      // Type to filter — only Apple remains and renderItem is called with the keyword
      await user.type(getSearchInput(), 'app');
      await waitFor(() => {
        expect(screen.getByTestId('item-apple')).toHaveAttribute('data-keyword', 'app');
      });
    });

    it('defaults to item.label when no renderItem prop is provided', async () => {
      const user = userEvent.setup();
      render(<SearchDropdown items={items} renderToggle={defaultRenderToggle} />);
      await openMenu(user);
      expect(screen.getByText('Apple')).toBeInTheDocument();
      expect(screen.getByText('Banana')).toBeInTheDocument();
      expect(screen.getByText('Cherry')).toBeInTheDocument();
    });

    it('falls back to item.value when item has no label', async () => {
      const user = userEvent.setup();
      const itemsWithoutLabel = [{ value: 'apple-only-value' }];
      render(<SearchDropdown items={itemsWithoutLabel} renderToggle={defaultRenderToggle} />);
      await openMenu(user);
      expect(screen.getByText('apple-only-value')).toBeInTheDocument();
    });
  });

  describe('backward compatibility', () => {
    it('slotProps.toggle props are forwarded to the toggle element', () => {
      render(
        <SearchDropdown
          items={items}
          slotProps={{ toggle: { 'data-testid': 'toggle-via-slot-props' } }}
          renderToggle={({ getToggleProps }) => (
            <MenuButtonToggle {...getToggleProps()}>Select</MenuButtonToggle>
          )}
        />
      );
      expect(screen.getByTestId('toggle-via-slot-props')).toBeInTheDocument();
    });
  });
});
