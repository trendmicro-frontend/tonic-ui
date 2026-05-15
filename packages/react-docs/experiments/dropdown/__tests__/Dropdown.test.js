import { useState } from 'react';
import { render, screen, waitFor } from '../../../test-utils/render';
import userEvent from '@testing-library/user-event';
import { Dropdown, MenuButtonToggle, TagToggle } from '../index';

const items = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry', props: { disabled: true } },
];

describe('Dropdown', () => {
  describe('default toggle (no renderToggle)', () => {
    it('renders a button by default', () => {
      render(<Dropdown items={items} />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('shows the defaultValue label in the default toggle', () => {
      render(<Dropdown items={items} defaultValue={items[0]} />);
      expect(screen.getByRole('button')).toHaveTextContent('Apple');
    });

    it('opens the menu when the default toggle is clicked', async () => {
      const user = userEvent.setup();
      render(<Dropdown items={items} />);
      await user.click(screen.getByRole('button'));
      expect(await screen.findByRole('menu')).toBeInTheDocument();
    });
  });

  describe('renderToggle (recommended usage)', () => {
    it('overrides the default toggle', () => {
      render(
        <Dropdown
          items={items}
          renderToggle={({ getToggleProps }) => (
            <MenuButtonToggle {...getToggleProps({ 'data-testid': 'custom-toggle' })}>Custom</MenuButtonToggle>
          )}
        />
      );
      expect(screen.getByTestId('custom-toggle')).toBeInTheDocument();
    });

    it('receives value and renderItem reflecting defaultValue', () => {
      render(
        <Dropdown
          items={items}
          defaultValue={items[1]}
          renderToggle={({ getToggleProps, value, renderItem }) => (
            <MenuButtonToggle {...getToggleProps({ 'data-testid': 'toggle' })}>
              {value ? renderItem(value) : 'None'}
            </MenuButtonToggle>
          )}
        />
      );
      expect(screen.getByTestId('toggle')).toHaveTextContent('Banana');
    });

    it('getToggleProps() returns props that open the menu', async () => {
      const user = userEvent.setup();
      render(
        <Dropdown
          items={items}
          renderToggle={({ getToggleProps }) => (
            <MenuButtonToggle {...getToggleProps()} data-testid="toggle">Select</MenuButtonToggle>
          )}
        />
      );
      await user.click(screen.getByTestId('toggle'));
      expect(await screen.findByRole('menu')).toBeInTheDocument();
    });

    it('getToggleProps({ disabled: true }) disables the toggle and prevents menu open', async () => {
      const user = userEvent.setup();
      render(
        <Dropdown
          items={items}
          renderToggle={({ getToggleProps }) => (
            <MenuButtonToggle {...getToggleProps({ 'data-testid': 'toggle', disabled: true })}>
              Select
            </MenuButtonToggle>
          )}
        />
      );
      const toggle = screen.getByTestId('toggle');
      expect(toggle).toBeDisabled();
      await user.click(toggle);
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });
  });

  describe('value management', () => {
    it('uncontrolled: updates toggle label and calls onChange after selection', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();
      render(
        <Dropdown
          items={items}
          onChange={onChange}
          renderToggle={({ getToggleProps, value, renderItem }) => (
            <MenuButtonToggle {...getToggleProps({ 'data-testid': 'toggle' })}>
              {value ? renderItem(value) : 'None'}
            </MenuButtonToggle>
          )}
        />
      );
      await user.click(screen.getByTestId('toggle'));
      await screen.findByRole('menu');
      await user.click(screen.getByText('Banana'));
      expect(onChange).toHaveBeenCalledWith(items[1]);
      await waitFor(() => {
        expect(screen.getByTestId('toggle')).toHaveTextContent('Banana');
      });
    });

    it('controlled: toggle reflects value prop and calls onChange on selection', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();
      const ControlledDropdown = () => {
        const [value, setValue] = useState(items[0]);
        return (
          <Dropdown
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
      render(<ControlledDropdown />);
      expect(screen.getByTestId('toggle')).toHaveTextContent('Apple');
      await user.click(screen.getByTestId('toggle'));
      await screen.findByRole('menu');
      await user.click(screen.getByText('Banana'));
      expect(onChange).toHaveBeenCalledWith(items[1]);
      await waitFor(() => {
        expect(screen.getByTestId('toggle')).toHaveTextContent('Banana');
      });
    });
  });

  describe('backward compatibility', () => {
    it('children prop appears inside the default MenuButtonToggle', () => {
      render(
        <Dropdown items={items}>
          My Static Label
        </Dropdown>
      );
      expect(screen.getByRole('button')).toHaveTextContent('My Static Label');
    });

    it('slots.toggle renders TagToggle as the toggle with children inside', async () => {
      const user = userEvent.setup();
      render(
        <Dropdown items={items} slots={{ toggle: TagToggle }}>
          Slot Label
        </Dropdown>
      );
      // TagToggle receives role="button" via getToggleProps()
      const toggle = screen.getByRole('button');
      expect(toggle).toHaveTextContent('Slot Label');
      await user.click(toggle);
      expect(await screen.findByRole('menu')).toBeInTheDocument();
    });

    it('slotProps.toggle props are forwarded into getToggleProps and appear on the toggle element', () => {
      render(
        <Dropdown
          items={items}
          slotProps={{ toggle: { 'data-testid': 'toggle-via-slot-props' } }}
        />
      );
      expect(screen.getByTestId('toggle-via-slot-props')).toBeInTheDocument();
    });
  });
});
