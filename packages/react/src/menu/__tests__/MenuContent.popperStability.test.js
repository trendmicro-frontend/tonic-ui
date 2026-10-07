/**
 * @jest-environment jsdom
 */
/* eslint-disable react/jsx-no-bind */
import { fireEvent, render, screen } from '@testing-library/react';
import React, { useMemo, useRef, useState } from 'react';
import { Box } from '../../box';
import { TonicProvider } from '../../provider';
import MenuContent from '../MenuContent';

// Reproduction for the per-render popper instance churn triggered by the
// `observePopperResize` modifier (#550).
//
// `MenuContent` rebuilds the popper `modifiers` array inline on every render:
// `[...popperModifiers, ...ensureArray(popperSlotProps?.modifiers)]`. `Popper`
// fed that array into `setupPopper`'s dependency list, so a new array identity
// re-ran `setupPopper`, which changed the `refUpdater` handed to the popper
// element. React therefore detached and re-attached that ref on every parent
// render, destroying the instance and creating a new one — and each new instance
// re-installed the resize observer, whose callback calls `instance.update()`,
// which reports a placement through `setPlacementState`.
//
// The observable consequence pinned here: popper instances must not multiply
// with parent renders. A fake instance is used because jsdom has no layout; the
// churn is driven by the ref lifecycle, not by geometry.
const createdInstances = [];

jest.mock('@popperjs/core', () => ({
  createPopper: jest.fn((reference, popper, options) => {
    const instance = {
      options,
      destroy: jest.fn(),
      forceUpdate: jest.fn(),
      update: jest.fn(),
    };
    createdInstances.push(instance);
    return instance;
  }),
}));

const observedModifiers = [];

const ModifierProbePopper = React.forwardRef(({ children, modifiers }, _ref) => {
  observedModifiers.push(modifiers);
  return typeof children === 'function'
    ? children({
        computedPlacement: 'bottom-start',
        placement: 'bottom-start',
        transition: { in: true, onEnter: () => {}, onExited: () => {} },
      })
    : children;
});
ModifierProbePopper.displayName = 'ModifierProbePopper';

// Holds the toggle's own state and the stable refs, so a re-render here changes
// nothing about the popper inputs. Rebuilding a `referenceRef` inline would be a
// genuine dependency change and would (correctly) recreate the instance.
const Harness = ({ children }) => {
  const [tick, setTick] = useState(0);
  const menuContentRef = useRef(null);
  const menuToggleRef = useRef(null);
  const referenceRef = useMemo(() => ({ current: document.createElement('div') }), []);

  return (
    <TonicProvider colorMode={{ value: 'light' }}>
      <Box data-testid="tick" onMouseEnter={() => setTick(t => t + 1)}>
        {tick}
        {children({ menuContentRef, menuToggleRef, referenceRef })}
      </Box>
    </TonicProvider>
  );
};

describe('MenuContent popper instance stability', () => {
  beforeEach(() => {
    createdInstances.length = 0;
    jest.clearAllMocks();
    observedModifiers.length = 0;
  });

  it('should not create a popper instance on every parent render', () => {
    const { rerender } = render(
      <Harness>
        {({ menuContentRef, menuToggleRef, referenceRef }) => (
          <MenuContent
            isOpen
            placement="bottom-start"
            referenceRef={referenceRef}
            menuContentRef={menuContentRef}
            menuToggleRef={menuToggleRef}
          >
            <Box data-testid="menu-content">Menu Content</Box>
          </MenuContent>
        )}
      </Harness>
    );

    expect(screen.getByTestId('menu-content')).toBeInTheDocument();
    const afterMount = createdInstances.length;
    expect(afterMount).toBe(1);

    // Re-render the parent repeatedly. Nothing about the popper's inputs
    // changes, so the instance must survive.
    for (let i = 0; i < 5; i++) {
      rerender(
        <Harness>
          {({ menuContentRef, menuToggleRef, referenceRef }) => (
            <MenuContent
              isOpen
              placement="bottom-start"
              referenceRef={referenceRef}
              menuContentRef={menuContentRef}
              menuToggleRef={menuToggleRef}
            >
              <Box data-testid="menu-content">Menu Content</Box>
            </MenuContent>
          )}
        </Harness>
      );
    }

    expect(createdInstances.length).toBe(afterMount);
  });

  it('should preserve merged modifiers until a modifier input changes', () => {
    const renderMenu = (modifiers) => (
      <Harness>
        {({ menuContentRef, menuToggleRef, referenceRef }) => (
          <MenuContent
            isOpen
            placement="bottom-start"
            referenceRef={referenceRef}
            menuContentRef={menuContentRef}
            menuToggleRef={menuToggleRef}
            slots={{ popper: ModifierProbePopper }}
            slotProps={{ popper: { modifiers } }}
          >
            <Box data-testid="menu-content">Menu Content</Box>
          </MenuContent>
        )}
      </Harness>
    );
    const initialInput = [{ name: 'flip', enabled: true }];
    const { rerender } = render(renderMenu(initialInput));
    const initialMergedModifiers = observedModifiers.at(-1);

    fireEvent.mouseEnter(screen.getByTestId('tick'));
    expect(observedModifiers.at(-1)).toBe(initialMergedModifiers);

    const changedInput = [{ name: 'flip', enabled: false }];
    rerender(renderMenu(changedInput));

    expect(observedModifiers.at(-1)).not.toBe(initialMergedModifiers);
    expect(observedModifiers.at(-1).at(-1)).toBe(changedInput[0]);
  });
});
