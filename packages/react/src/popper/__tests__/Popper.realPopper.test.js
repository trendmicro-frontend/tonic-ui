/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/react';
import { Box } from '../../box';
import { TonicProvider } from '../../provider';
import Popper from '../Popper';

// No @popperjs/core mock here: the real popper.js runs `runModifierEffects()`
// during `forceUpdate()`, which the Popper ref callback calls during commit.
const PopperContent = () => <Box data-testid="popper-content">Popper Content</Box>;

describe('Popper with the real popper.js', () => {
  it.each([
    ['with ResizeObserver', true],
    ['without ResizeObserver', false],
  ])('should clean up the resize observer when TonicProvider switches to an environment %s', (name, hasResizeObserver) => {
    const firstObserve = jest.fn();
    const firstDisconnect = jest.fn();
    const nextObserve = jest.fn();
    const nextDisconnect = jest.fn();
    const firstDocument = {
      nodeType: Node.DOCUMENT_NODE,
      defaultView: {
        ResizeObserver: jest.fn(() => ({ observe: firstObserve, disconnect: firstDisconnect })),
      },
    };
    const nextDocument = {
      nodeType: Node.DOCUMENT_NODE,
      defaultView: hasResizeObserver
        ? { ResizeObserver: jest.fn(() => ({ observe: nextObserve, disconnect: nextDisconnect })) }
        : {},
    };
    const referenceRef = { current: document.createElement('div') };
    const modifiers = [];
    const renderPopper = (value) => (
      <TonicProvider colorMode={{ value: 'light' }} environment={{ value }}>
        <Popper data-testid="popper-box" modifiers={modifiers} referenceRef={referenceRef}>
          <PopperContent />
        </Popper>
      </TonicProvider>
    );
    const { getByTestId, rerender, unmount } = render(renderPopper(firstDocument));
    const popperElement = getByTestId('popper-box');
    expect(firstObserve).toHaveBeenCalledTimes(1);
    expect(firstObserve).toHaveBeenCalledWith(popperElement);
    expect(nextObserve).not.toHaveBeenCalled();

    rerender(renderPopper(nextDocument));

    expect(firstDisconnect).toHaveBeenCalledTimes(1);
    expect(nextObserve).toHaveBeenCalledTimes(hasResizeObserver ? 1 : 0);
    if (hasResizeObserver) {
      expect(nextObserve).toHaveBeenCalledWith(popperElement);
    }
    expect(nextDisconnect).not.toHaveBeenCalled();

    unmount();

    expect(firstDisconnect).toHaveBeenCalledTimes(1);
    expect(nextDisconnect).toHaveBeenCalledTimes(hasResizeObserver ? 1 : 0);
  });

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
