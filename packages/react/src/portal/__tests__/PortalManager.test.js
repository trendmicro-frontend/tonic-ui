import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '@tonic-ui/react/test-utils/render';
import { Box, Button, PortalManager, usePortalManager } from '@tonic-ui/react/src';
import React, { useCallback, useRef } from 'react';

describe('PortalManager', () => {
  it('should add a portal to the PortalManager and later removed by calling the close function', async () => {
    const user = userEvent.setup();

    const TestComponent = () => {
      const portal = usePortalManager();
      const addPortal = useCallback(() => {
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

    const portalComponent = screen.getByTestId('portal-component');
    expect(portalComponent).toBeInTheDocument();

    await user.click(await screen.findByTestId('btn-remove-portal'));

    expect(portalComponent).not.toBeInTheDocument();
  });

  it('should add a portal to the PortalManager and later removed by passing the portal\'s id', async () => {
    const user = userEvent.setup();

    const TestComponent = () => {
      const portalIdRef = useRef(null);
      const portal = usePortalManager();
      const handleClickAddPortal = useCallback((event) => {
        const id = portal(() => (
          <Box data-testid="portal-component">
            This is a portal component
          </Box>
        ));
        portalIdRef.current = id;
      }, [portal]);
      const handleClickRemovePortal = useCallback((event) => {
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

    const portalComponent = screen.getByTestId('portal-component');
    expect(portalComponent).toBeInTheDocument();

    await user.click(await screen.findByTestId('btn-remove-portal'));

    expect(portalComponent).not.toBeInTheDocument();
  });
});
