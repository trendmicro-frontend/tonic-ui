/* eslint-disable react/jsx-no-bind */
import { act, render, screen } from '@testing-library/react';
import { createPopper } from '@popperjs/core';
import React from 'react';
import { EnvironmentProvider } from '../../environment';
import Popper from '../Popper';

// Mock @popperjs/core
jest.mock('@popperjs/core', () => ({
  createPopper: jest.fn(() => ({
    destroy: jest.fn(),
    forceUpdate: jest.fn(),
    update: jest.fn(),
  })),
}));

const getPopperModifiers = (callIndex = 0) => createPopper.mock.calls[callIndex][2].modifiers;
const getPopperInstance = (callIndex = 0) => createPopper.mock.results[callIndex].value;
const findPopperModifier = (name, callIndex = 0) => getPopperModifiers(callIndex).find((modifier) => modifier.name === name);
const reportPopperPlacement = (placement, callIndex = 0) => {
  findPopperModifier('handlePopperUpdate', callIndex).fn({
    state: {
      elements: {},
      placement,
    },
  });
};

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

  it('should render in Portal when portalled is true', () => {
    const anchorEl = document.createElement('div');
    const container = document.createElement('div');
    document.body.appendChild(anchorEl);
    document.body.appendChild(container);

    const containerRef = { current: container };
    render(
      <Popper
        isOpen={true}
        anchorEl={anchorEl}
        portalled={true}
        portalProps={{ containerRef }}
      >
        <PopperContent />
      </Popper>
    );

    const popperContent = screen.getByTestId('popper-content');
    const portalDiv = popperContent.parentElement.parentElement;
    expect(portalDiv).toHaveClass('tonic-ui-portal');
    expect(portalDiv.parentElement).toBe(containerRef.current);

    document.body.removeChild(anchorEl);
    document.body.removeChild(container);
  });

  it('should render in Portal when portalled is false but usePortal is true (backward compat)', () => {
    // Regression: portalled=false (explicitly set, e.g. from a Menu context default)
    // must not block usePortal=true from activating the portal.
    const anchorEl = document.createElement('div');
    const container = document.createElement('div');
    document.body.appendChild(anchorEl);
    document.body.appendChild(container);

    const containerRef = { current: container };
    render(
      <Popper
        isOpen={true}
        anchorEl={anchorEl}
        portalled={false}
        usePortal={true}
        portalProps={{ containerRef }}
      >
        <PopperContent />
      </Popper>
    );

    const popperContent = screen.getByTestId('popper-content');
    const portalDiv = popperContent.parentElement.parentElement;
    expect(portalDiv).toHaveClass('tonic-ui-portal');
    expect(portalDiv.parentElement).toBe(containerRef.current);

    document.body.removeChild(anchorEl);
    document.body.removeChild(container);
  });

  it('should not render in Portal when both portalled and usePortal are false', () => {
    const anchorEl = document.createElement('div');
    document.body.appendChild(anchorEl);

    render(
      <Popper
        isOpen={true}
        anchorEl={anchorEl}
        portalled={false}
        usePortal={false}
      >
        <PopperContent />
      </Popper>
    );

    const popperContent = screen.getByTestId('popper-content');
    expect(popperContent.parentElement.parentElement).not.toHaveClass('tonic-ui-portal');

    document.body.removeChild(anchorEl);
  });

  it('should re-run the update cycle when the popper element changes size', () => {
    const observe = jest.fn();
    const disconnect = jest.fn();
    let resizeCallback;
    const EnvResizeObserver = jest.fn((callback) => {
      resizeCallback = callback;
      return { observe, disconnect };
    });
    const envDocument = {
      nodeType: Node.DOCUMENT_NODE,
      defaultView: { ResizeObserver: EnvResizeObserver },
    };
    const referenceRef = { current: document.createElement('div') };
    const modifiers = [];

    render(
      <EnvironmentProvider value={() => envDocument}>
        <Popper
          data-testid="popper-box"
          modifiers={modifiers}
          referenceRef={referenceRef}
        >
          <PopperContent />
        </Popper>
      </EnvironmentProvider>
    );

    const popperElement = screen.getByTestId('popper-box');
    const popperInstance = getPopperInstance();
    const modifier = findPopperModifier('observePopperResize');

    // The modifier effect is owned by popper.js, so it is invoked explicitly here.
    const cleanup = modifier.effect({
      state: { elements: { popper: popperElement } },
      instance: popperInstance,
    });

    // The observer must come from the environment window, not the global window.
    expect(EnvResizeObserver).toHaveBeenCalledTimes(1);
    expect(observe).toHaveBeenCalledWith(popperElement);

    act(() => {
      resizeCallback();
    });
    expect(popperInstance.update).toHaveBeenCalledTimes(1);

    expect(cleanup).toEqual(expect.any(Function));
    cleanup();
    expect(disconnect).toHaveBeenCalledTimes(1);
  });

  it('should not observe the popper element when the environment has no ResizeObserver', () => {
    const envDocument = {
      nodeType: Node.DOCUMENT_NODE,
      defaultView: {},
    };
    const referenceRef = { current: document.createElement('div') };
    const modifiers = [];

    render(
      <EnvironmentProvider value={() => envDocument}>
        <Popper
          data-testid="popper-box"
          modifiers={modifiers}
          referenceRef={referenceRef}
        >
          <PopperContent />
        </Popper>
      </EnvironmentProvider>
    );

    const popperElement = screen.getByTestId('popper-box');
    const modifier = findPopperModifier('observePopperResize');
    const cleanup = modifier.effect({
      state: { elements: { popper: popperElement } },
      instance: getPopperInstance(),
    });

    expect(cleanup).toBeUndefined();
  });

  it('should not recreate the popper instance when the environment value changes identity', () => {
    const envDocument = {
      nodeType: Node.DOCUMENT_NODE,
      defaultView: {},
    };
    const referenceRef = { current: document.createElement('div') };
    const modifiers = [];
    const renderPopper = () => (
      <EnvironmentProvider value={() => envDocument}>
        <Popper modifiers={modifiers} referenceRef={referenceRef}>
          <PopperContent />
        </Popper>
      </EnvironmentProvider>
    );

    const { rerender } = render(renderPopper());
    rerender(renderPopper());
    rerender(renderPopper());

    expect(createPopper).toHaveBeenCalledTimes(1);
  });

  it('should destroy the popper instance and clear the popperRef when the popper element is detached', () => {
    const referenceRef = { current: document.createElement('div') };
    const popperRef = { current: null };
    const renderPopper = (isOpen) => (
      <Popper
        isOpen={isOpen}
        unmountOnExit={true}
        willUseTransition={false}
        referenceRef={referenceRef}
        popperRef={popperRef}
      >
        <PopperContent />
      </Popper>
    );

    const { rerender } = render(renderPopper(true));
    const popperInstance = getPopperInstance();
    expect(popperRef.current).toBe(popperInstance);

    rerender(renderPopper(false));

    expect(popperInstance.destroy).toHaveBeenCalledTimes(1);
    expect(popperRef.current).toBeNull();
  });

  it('should report the computed placement to children while keeping the preferred placement as the createPopper input', () => {
    const referenceRef = { current: document.createElement('div') };
    const modifiers = [];

    render(
      <Popper modifiers={modifiers} referenceRef={referenceRef}>
        {({ placement }) => <div data-testid="popper-placement">{placement}</div>}
      </Popper>
    );

    expect(screen.getByTestId('popper-placement')).toHaveTextContent('bottom-start');

    act(() => {
      reportPopperPlacement('top-start');
    });

    expect(screen.getByTestId('popper-placement')).toHaveTextContent('top-start');
    expect(createPopper).toHaveBeenCalledTimes(1);
    expect(createPopper.mock.calls[0][2].placement).toBe('bottom-start');
  });

  it('should report the computed placement to children when the placement prop is set', () => {
    const referenceRef = { current: document.createElement('div') };
    const modifiers = [];

    render(
      <Popper placement="bottom-start" modifiers={modifiers} referenceRef={referenceRef}>
        {({ placement }) => <div data-testid="popper-placement">{placement}</div>}
      </Popper>
    );

    act(() => {
      reportPopperPlacement('top-start');
    });

    expect(screen.getByTestId('popper-placement')).toHaveTextContent('top-start');
    expect(createPopper).toHaveBeenCalledTimes(1);
    expect(createPopper.mock.calls[0][2].placement).toBe('bottom-start');
  });

  it('should recreate the popper instance with the new preferred placement when the placement prop changes', () => {
    const referenceRef = { current: document.createElement('div') };
    const modifiers = [];
    const renderPopper = (placement) => (
      <Popper placement={placement} modifiers={modifiers} referenceRef={referenceRef}>
        {({ placement: computedPlacement }) => <div data-testid="popper-placement">{computedPlacement}</div>}
      </Popper>
    );

    const { rerender } = render(renderPopper('bottom-start'));
    expect(createPopper).toHaveBeenCalledTimes(1);

    rerender(renderPopper('left-start'));
    expect(createPopper).toHaveBeenCalledTimes(2);
    expect(createPopper.mock.calls[1][2].placement).toBe('left-start');
    expect(screen.getByTestId('popper-placement')).toHaveTextContent('left-start');

    act(() => {
      reportPopperPlacement('right-start', 1);
    });

    expect(screen.getByTestId('popper-placement')).toHaveTextContent('right-start');
    expect(createPopper).toHaveBeenCalledTimes(2);
  });

  it('should not recreate the popper instance when the popper re-renders without a modifiers prop', () => {
    const referenceRef = { current: document.createElement('div') };
    const renderPopper = () => (
      <Popper referenceRef={referenceRef}>
        <PopperContent />
      </Popper>
    );

    const { rerender } = render(renderPopper());
    rerender(renderPopper());

    expect(createPopper).toHaveBeenCalledTimes(1);
  });
});
