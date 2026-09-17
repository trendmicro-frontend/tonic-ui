/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/react';
import { Box } from '../../box';
import Popper from '../Popper';

// No @popperjs/core mock here: the real popper.js runs `runModifierEffects()`
// during `forceUpdate()`, which the Popper ref callback calls during commit.
const PopperContent = () => <Box data-testid="popper-content">Popper Content</Box>;

describe('Popper with the real popper.js', () => {
  it('should install the resize observer during the commit phase', () => {
    const observeSpy = jest.fn();
    const RealResizeObserver = window.ResizeObserver;
    class SpyResizeObserver {
      observe(...args) { observeSpy(...args); }
      disconnect() { /* noop */ }
      unobserve() { /* noop */ }
    }
    window.ResizeObserver = SpyResizeObserver;

    const referenceRef = { current: document.createElement('div') };
    const errors = [];
    const consoleError = jest.spyOn(console, 'error').mockImplementation((...args) => {
      errors.push(args.join(' '));
    });

    try {
      render(
        <Popper
          data-testid="popper-box"
          isOpen
          modifiers={[]}
          referenceRef={referenceRef}
        >
          <PopperContent />
        </Popper>
      );
    } catch (error) {
      errors.push(`THREW: ${error.message}`);
    }

    window.ResizeObserver = RealResizeObserver;
    consoleError.mockRestore();

    expect(errors).toEqual([]);
    expect(observeSpy).toHaveBeenCalledTimes(1);
  });
});
