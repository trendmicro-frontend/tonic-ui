/* eslint-disable react/jsx-no-bind */
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { render } from '@tonic-ui/react/test-utils/render';
import {
  Autocomplete,
  Box,
  Button,
  Menu,
  MenuButton,
  MenuContent,
  MenuItem,
  MenuList,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Submenu,
  SubmenuContent,
  SubmenuTrigger,
  Tooltip,
} from '@tonic-ui/react/src';
import DatePickerContent from '@tonic-ui/react/src/date-pickers/DatePicker/DatePickerContent';
import { DatePickerProvider } from '@tonic-ui/react/src/date-pickers/DatePicker/context';
import React, { useRef, useState } from 'react';

const RerenderHarness = ({ children }) => {
  const [tick, setTick] = useState(0);
  return (
    <>
      <button data-testid="rerender" type="button" onClick={() => setTick(value => value + 1)}>
        {tick}
      </button>
      {children()}
    </>
  );
};

const createModifierProbe = (placement = 'bottom-start') => {
  const received = [];
  const ModifierProbe = React.forwardRef(({ children, modifiers }, _ref) => {
    received.push(modifiers);
    return typeof children === 'function'
      ? children({
          computedPlacement: placement,
          placement,
          transition: { in: true, onEnter: () => {}, onExited: () => {} },
        })
      : children;
  });
  ModifierProbe.displayName = 'ModifierProbe';
  return { ModifierProbe, received };
};

const expectStableAfterParentRender = async (received) => {
  await waitFor(() => expect(received.length).toBeGreaterThan(0));
  const initialModifiers = received.at(-1);

  fireEvent.click(screen.getByTestId('rerender'));

  expect(received.at(-1)).toBe(initialModifiers);
};

describe('Popper-based overlay modifier composition', () => {
  it('keeps AutocompleteList modifiers stable', async () => {
    const { ModifierProbe, received } = createModifierProbe();
    const modifiers = [{ name: 'flip', enabled: true }];

    render(
      <RerenderHarness>
        {() => (
          <Autocomplete
            defaultIsOpen
            items={[{ id: 1, label: 'Item 1' }]}
            slotProps={{ content: { slots: { popper: ModifierProbe }, slotProps: { popper: { modifiers } } } }}
          />
        )}
      </RerenderHarness>
    );

    await expectStableAfterParentRender(received);
  });

  it('keeps DatePickerContent modifiers stable', async () => {
    const { ModifierProbe, received } = createModifierProbe();
    const modifiers = [{ name: 'flip', enabled: true }];

    const DatePickerFixture = () => {
      const datePickerContentRef = useRef(null);
      const datePickerToggleRef = useRef(null);
      return (
        <DatePickerProvider
          value={{
            isOpen: true,
            offset: [0, 0],
            onClose: () => {},
            placement: 'bottom-start',
            datePickerContentId: 'date-picker-content',
            datePickerContentRef,
            datePickerToggleId: 'date-picker-toggle',
            datePickerToggleRef,
          }}
        >
          <DatePickerContent
            slots={{ popper: ModifierProbe }}
            slotProps={{ popper: { modifiers } }}
          >
            calendar
          </DatePickerContent>
        </DatePickerProvider>
      );
    };

    render(<RerenderHarness>{() => <DatePickerFixture />}</RerenderHarness>);

    await expectStableAfterParentRender(received);
  });

  it('keeps MenuContent modifiers stable', async () => {
    const { ModifierProbe, received } = createModifierProbe();
    const modifiers = [{ name: 'flip', enabled: true }];

    render(
      <RerenderHarness>
        {() => (
          <Menu defaultIsOpen>
            <MenuButton>Open</MenuButton>
            <MenuContent slots={{ popper: ModifierProbe }} slotProps={{ popper: { modifiers } }}>
              <MenuItem>Item</MenuItem>
            </MenuContent>
          </Menu>
        )}
      </RerenderHarness>
    );

    await expectStableAfterParentRender(received);
  });

  it('keeps SubmenuContent modifiers stable', async () => {
    const { ModifierProbe, received } = createModifierProbe('right-start');
    const modifiers = [{ name: 'flip', enabled: true }];

    render(
      <RerenderHarness>
        {() => (
          <Menu defaultIsOpen>
            <MenuButton>Open</MenuButton>
            <MenuList>
              <Submenu defaultIsOpen>
                <SubmenuTrigger>Submenu</SubmenuTrigger>
                <SubmenuContent slots={{ popper: ModifierProbe }} slotProps={{ popper: { modifiers } }}>
                  <MenuItem>Nested item</MenuItem>
                </SubmenuContent>
              </Submenu>
            </MenuList>
          </Menu>
        )}
      </RerenderHarness>
    );

    await expectStableAfterParentRender(received);
  });

  it('keeps PopoverContent modifiers stable', async () => {
    const { ModifierProbe, received } = createModifierProbe();
    const modifiers = [{ name: 'flip', enabled: true }];

    render(
      <RerenderHarness>
        {() => (
          <Popover defaultIsOpen>
            <PopoverTrigger><Button>Open</Button></PopoverTrigger>
            <PopoverContent slots={{ popper: ModifierProbe }} slotProps={{ popper: { modifiers } }}>
              Popover body
            </PopoverContent>
          </Popover>
        )}
      </RerenderHarness>
    );

    await expectStableAfterParentRender(received);
  });

  it('keeps TooltipContent modifiers stable', async () => {
    const { ModifierProbe, received } = createModifierProbe();
    const modifiers = [{ name: 'flip', enabled: true }];

    render(
      <RerenderHarness>
        {() => (
          <Tooltip
            defaultIsOpen
            label="Tooltip body"
            slots={{ popper: ModifierProbe }}
            slotProps={{ popper: { modifiers } }}
          >
            <Box>Trigger</Box>
          </Tooltip>
        )}
      </RerenderHarness>
    );

    await expectStableAfterParentRender(received);
  });
});
