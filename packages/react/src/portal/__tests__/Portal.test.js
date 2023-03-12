import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '@tonic-ui/react/test-utils/render';
import { Box, Button, Portal, PortalManager, usePortalManager } from '@tonic-ui/react/src';
import React from 'react';

describe('Portal', () => {
  it('should render correctly', () => {
    const { container } = render(
      <Portal>
        This is a portal
        <Portal>This is another portal</Portal>
      </Portal>
    );

    expect(container).toMatchSnapshot();
  });

  it('should render nested portal', () => {
    const { baseElement } = render(
      <Portal>
        This is a portal
        <Portal appendToParentPortal={true}>This is a nested portal</Portal>
      </Portal>
    );

    const portals = Array.from(
      baseElement.querySelectorAll(Portal.selector)
    );

    const [parentPortal, childPortal] = portals;
    expect(parentPortal).toContainElement(childPortal);
  });

  it('should render in a different node', () => {
    render(
      <div data-testid="parent">
        <div data-testid="child-1">Child 1</div>
        <Portal>
          <div data-testid="child-2">Child 2</div>
        </Portal>
      </div>
    );

    const parent = screen.getByTestId('parent');
    const child1 = screen.getByTestId('child-1');
    const child2 = screen.getByTestId('child-2');

    expect(parent).toContainElement(child1);
    expect(parent).not.toContainElement(child2);
  });

  it('should render into a custom container', () => {
    const TestComponent = () => {
      const ref = React.useRef(null);
      return (
        <>
          <div data-testid="container" ref={ref} />
          <Portal containerRef={ref}>
            <div data-testid="content">Hello world</div>
          </Portal>
        </>
      );
    };

    render(<TestComponent />);

    const content = screen.getByTestId('content');
    const container = screen.getByTestId('container');
    expect(container).toContainElement(content);
  });
});

describe('PortalManager / usePortalManager', () => {
  it('should add a portal to the PortalManager and later removed by calling the close function', async () => {
    const user = userEvent.setup();

    const TestComponent = () => {
      const portal = usePortalManager();
      const addPortal = React.useCallback(() => {
        portal((close) => (
          <Box data-testid="portal-component">
            This is a portal component
            <Button data-testid="btn-remove-portal" onClick={close}>
              Remove Portal
            </Button>
          </Box>
        ));
      }, [portal]);

      return (
        <Button data-testid="btn-add-portal" onClick={addPortal}>
          Add Portal
        </Button>
      );
    };

    render(
      <PortalManager>
        <TestComponent />
      </PortalManager>
    );

    await user.click(await screen.findByTestId('btn-add-portal'));

    const portalComponent = await screen.getByTestId('portal-component');
    expect(portalComponent).toBeInTheDocument();

    await user.click(await screen.findByTestId('btn-remove-portal'));

    expect(portalComponent).not.toBeInTheDocument();
  });

  it('should add a portal to the PortalManager and later removed by passing the portal\'s id', async () => {
    const user = userEvent.setup();

    const TestComponent = () => {
      const portalIdRef = React.useRef(null);
      const portal = usePortalManager();
      const handleClickAddPortal = React.useCallback((event) => {
        const id = portal(() => (
          <Box data-testid="portal-component">
            This is a portal component
          </Box>
        ));
        portalIdRef.current = id;
      }, [portal]);
      const handleClickRemovePortal = React.useCallback((event) => {
        const id = portalIdRef.current;
        portal.remove(id);
      }, [portal]);

      return (
        <>
          <Button
            data-testid="btn-add-portal"
            onClick={handleClickAddPortal}
          >
            Add Portal
          </Button>
          <Button
            data-testid="btn-remove-portal"
            onClick={handleClickRemovePortal}
          >
            Remove Portal
          </Button>
        </>
      );
    };

    render(
      <PortalManager>
        <TestComponent />
      </PortalManager>
    );

    await user.click(await screen.findByTestId('btn-add-portal'));

    const portalComponent = await screen.getByTestId('portal-component');
    expect(portalComponent).toBeInTheDocument();

    await user.click(await screen.findByTestId('btn-remove-portal'));

    expect(portalComponent).not.toBeInTheDocument();
  });
});
