/* eslint-disable react/jsx-no-bind */
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Button, Menu, MenuButton, MenuItem, MenuList, Popover, PopoverContent, PopoverTrigger, PortalManager, ToastManager, TonicProvider, createTheme } from '../../../../src';

const OriginalOverlay = ({ component }) => {
  const [entries, setEntries] = useState([]);
  const recordOutside = () => setEntries(previous => [...previous, { type: 'outside' }]);

  return (
    <>
      {component === 'menu' ? (
        <Menu>
          <MenuButton data-testid="trigger">Open</MenuButton>
          <MenuList data-testid="content">
            <MenuItem>Menu item 1</MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <Popover defaultIsOpen portalled onInteractOutside={recordOutside}>
          <PopoverTrigger><Button>Open</Button></PopoverTrigger>
          <PopoverContent data-testid="content">Popover content</PopoverContent>
        </Popover>
      )}
      <output data-testid="events">{JSON.stringify(entries)}</output>
    </>
  );
};

// Match Testing Library's iframe container: a separate root, without an
// explicit environment value or a portal container override.
const OwnerDocumentFixture = ({ component }) => {
  const [frame, setFrame] = useState(null);

  useEffect(() => {
    if (!frame) {
      return undefined;
    }
    const doc = frame.contentDocument;
    doc.body.style.padding = '8px';
    doc.body.style.minHeight = '600px';
    const container = doc.createElement('div');
    doc.body.appendChild(container);
    const root = createRoot(container);
    const cache = createCache({ key: 'owner-document', container: doc.head });
    const theme = createTheme({ cssVariables: { prefix: 'tonic', rootSelector: ':root' } });

    root.render(
      <CacheProvider value={cache}>
        <TonicProvider colorMode={{ defaultValue: 'dark' }} theme={theme} useCSSVariables>
          <PortalManager>
            <ToastManager>
              <OriginalOverlay component={component} />
            </ToastManager>
          </PortalManager>
        </TonicProvider>
      </CacheProvider>
    );
    return () => {
      root.unmount();
      container.remove();
    };
  }, [component, frame]);

  return <iframe title="Original owning-document fixture" sandbox="allow-same-origin" ref={setFrame} style={{ width: '100%', height: 700 }} />;
};

export default OwnerDocumentFixture;
