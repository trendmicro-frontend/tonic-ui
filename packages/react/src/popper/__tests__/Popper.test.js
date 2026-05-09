import { render, screen } from '@testing-library/react';
import { createPopper } from '@popperjs/core';
import Popper from '../Popper';

// Mock @popperjs/core
jest.mock('@popperjs/core', () => ({
  createPopper: jest.fn(() => ({
    destroy: jest.fn(),
    forceUpdate: jest.fn(),
  })),
}));

describe('Popper', () => {
  const PopperContent = () => <div data-testid="popper-content">Popper Content</div>;

  beforeEach(() => {
    // Clear mock calls between tests
    jest.clearAllMocks();
  });

  it('should render nothing when isOpen is false and unmountOnExit is true', () => {
    const anchorEl = document.createElement('div');

    render(
      <Popper
        isOpen={false}
        unmountOnExit={true}
        anchorEl={anchorEl}
      >
        <PopperContent />
      </Popper>
    );

    expect(screen.queryByTestId('popper-content')).not.toBeInTheDocument();
  });

  it('should render content when isOpen is true', () => {
    const anchorEl = document.createElement('div');

    render(
      <Popper
        isOpen={true}
        anchorEl={anchorEl}
      >
        <PopperContent />
      </Popper>
    );

    expect(screen.getByTestId('popper-content')).toBeInTheDocument();
  });

  it('should create popper instance with correct config', () => {
    const anchorEl = document.createElement('div');
    const placement = 'top';
    const modifiers = [{ name: 'offset', options: { offset: [0, 8] } }];

    render(
      <Popper
        isOpen={true}
        anchorEl={anchorEl}
        placement={placement}
        modifiers={modifiers}
      >
        <PopperContent />
      </Popper>
    );

    expect(createPopper).toHaveBeenCalledWith(
      anchorEl,
      expect.any(HTMLElement),
      expect.objectContaining({
        placement,
        modifiers: expect.arrayContaining([
          expect.objectContaining({ name: 'arrow' }),
          expect.objectContaining({ name: 'handlePopperUpdate' }),
          ...modifiers,
        ]),
      })
    );
  });

  it('should handle function as anchorEl', () => {
    const anchorEl = document.createElement('div');
    const getAnchorEl = jest.fn(() => anchorEl);

    render(
      <Popper
        isOpen={true}
        anchorEl={getAnchorEl}
      >
        <PopperContent />
      </Popper>
    );

    expect(getAnchorEl).toHaveBeenCalled();
    expect(createPopper).toHaveBeenCalledWith(
      anchorEl,
      expect.any(HTMLElement),
      expect.any(Object)
    );
  });

  it('should handle placement updates', () => {
    const anchorEl = document.createElement('div');
    const { rerender } = render(
      <Popper
        isOpen={true}
        anchorEl={anchorEl}
        placement="bottom"
      >
        <PopperContent />
      </Popper>
    );

    expect(createPopper).toHaveBeenCalledWith(
      expect.any(HTMLElement),
      expect.any(HTMLElement),
      expect.objectContaining({
        placement: 'bottom',
      })
    );

    rerender(
      <Popper
        isOpen={true}
        anchorEl={anchorEl}
        placement="top"
      >
        <PopperContent />
      </Popper>
    );

    // Should create a new popper instance with updated placement
    expect(createPopper).toHaveBeenCalledWith(
      expect.any(HTMLElement),
      expect.any(HTMLElement),
      expect.objectContaining({
        placement: 'top',
      })
    );
  });

  it('should cleanup popper instance on unmount', () => {
    const anchorEl = document.createElement('div');
    const destroy = jest.fn();
    createPopper.mockImplementationOnce(() => ({
      destroy,
      forceUpdate: jest.fn(),
    }));

    const { unmount } = render(
      <Popper
        isOpen={true}
        anchorEl={anchorEl}
      >
        <PopperContent />
      </Popper>
    );

    unmount();
    expect(destroy).toHaveBeenCalled();
  });

  it('should forward refs correctly', () => {
    const anchorEl = document.createElement('div');
    const ref = jest.fn();
    const popperRef = jest.fn();

    render(
      <Popper
        isOpen={true}
        anchorEl={anchorEl}
        ref={ref}
        popperRef={popperRef}
      >
        <PopperContent />
      </Popper>
    );

    expect(ref).toHaveBeenCalledWith(expect.any(HTMLElement));
    expect(popperRef).toHaveBeenCalledWith(expect.objectContaining({
      destroy: expect.any(Function),
      forceUpdate: expect.any(Function),
    }));
  });

  it('should render in Portal when usePortal is true', () => {
    const anchorEl = document.createElement('div');
    const container = document.createElement('div');
    document.body.appendChild(anchorEl);
    document.body.appendChild(container);

    const containerRef = { current: container };
    render(
      <Popper
        isOpen={true}
        anchorEl={anchorEl}
        usePortal={true}
        portalProps={{ containerRef }}
      >
        <PopperContent />
      </Popper>
    );

    const popperContent = screen.getByTestId('popper-content');
    expect(popperContent).toBeInTheDocument();

    // Verify Portal wrapper has the correct class
    const portalDiv = popperContent.parentElement.parentElement;
    expect(portalDiv).toHaveClass('tonic-ui-portal');

    // Verify Portal is rendered in the correct container
    expect(portalDiv.parentElement).toBe(containerRef.current);

    // Cleanup
    document.body.removeChild(anchorEl);
    document.body.removeChild(container);
  });
});
