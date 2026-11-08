/* eslint-disable react/jsx-no-bind */
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import React, { useCallback, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { createRoot } from 'react-dom/client';
import { Box, Button, createTheme, Drawer, DrawerContent, Modal, ModalContent, ModalOverlay, TonicProvider } from '../../../src';
import MenuFixture from './components/Menu';
import PopoverFixture from './components/Popover';
import ModalFixture from './components/Modal';
import DrawerFixture from './components/Drawer';
import TooltipFixture from './components/Tooltip';
import PopperFixture from './components/Popper';
import AutocompleteFixture from './components/Autocomplete';
import DatePickerFixture from './components/DatePicker';
import DropdownFixture from './components/Dropdown';
import NestedOutsideAction from './components/NestedOutsideAction';
import OwnerDocumentFixture from './components/OwnerDocument';
import ColorModeFixture from './components/ColorMode';
import TableFixture from './components/Table';
import ResizeHandleFixture from './components/ResizeHandle';
import BrowserObserversFixture from './components/BrowserObservers';
import CollapseFixture from './components/Collapse';
import GrowFixture from './components/Grow';
import InputControlFixture from './components/InputControl';
import DateCalendarFixture from './components/DateCalendar';

const params = new URLSearchParams(window.location.search);
const component = params.get('component') || 'menu';
const theme = createTheme();
const fixtures = {
  menu: MenuFixture,
  popover: PopoverFixture,
  modal: ModalFixture,
  drawer: DrawerFixture,
  tooltip: TooltipFixture,
  'overflow-tooltip': TooltipFixture,
  popper: PopperFixture,
  autocomplete: AutocompleteFixture,
  'date-picker': DatePickerFixture,
  dropdown: DropdownFixture,
  'color-mode': ColorModeFixture,
  table: TableFixture,
  'resize-handle': ResizeHandleFixture,
  'browser-observers': BrowserObserversFixture,
  collapse: CollapseFixture,
  grow: GrowFixture,
  'input-control': InputControlFixture,
  'date-calendar': DateCalendarFixture,
};

const FixturePage = () => {
  const [entries, setEntries] = useState([]);
  const [mounted, setMounted] = useState(true);
  const record = entry => setEntries(previous => [...previous, entry]);
  const Fixture = params.has('nestedAction') ? NestedOutsideAction : fixtures[component];
  const boundary = params.get('boundary');
  const fixture = mounted ? <Fixture params={params} record={record} /> : null;
  const sibling = <Button data-testid="boundary-outside" sx={{ mt: 200 }}>Sibling inside dialog</Button>;

  return (
    <Box as="main" data-testid="fixture" data-component={component} sx={{ p: '8x' }}>
      <h1>{component} browser fixture</h1>
      {!['modal', 'drawer'].includes(component) && (
        <Box
          data-testid="outside"
          role="presentation"
          onMouseDown={event => event.preventDefault()}
          sx={{ position: 'fixed', right: '6x', top: '6x', p: '6x', border: 1 }}
        >
          Outside without focus movement
        </Box>
      )}
      {boundary === 'modal' ? (
        <Modal isOpen>
          <ModalOverlay />
          <ModalContent sx={{ width: 600 }}>
            {fixture}
            {sibling}
          </ModalContent>
        </Modal>
      ) : boundary === 'drawer'
        ? (
            <Drawer isOpen>
              <DrawerContent sx={{ width: 600 }}>
                {fixture}
                {sibling}
              </DrawerContent>
            </Drawer>
          )
        : fixture}
      <Box
        sx={{
          position: 'fixed',
          bottom: '4x',
          left: '4x',
          zIndex: 99999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '2x',
          maxWidth: 400,
        }}
      >
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '2x' }}>
          <Button data-testid="page-outside">Outside the overlay container</Button>
          <Button data-testid="focus-target">Outside focus target</Button>
          <Button data-testid="unmount" onClick={() => setMounted(false)}>Unmount component</Button>
          <Button data-testid="remount" onClick={() => setMounted(true)}>Remount component</Button>
        </Box>
        <Box
          as="output"
          data-testid="events"
          sx={{ display: 'block', maxWidth: 400, maxHeight: 120, overflow: 'auto', whiteSpace: 'nowrap', pointerEvents: 'none' }}
        >
          {JSON.stringify(entries)}
        </Box>
      </Box>
    </Box>
  );
};

const App = () => {
  const [container, setContainer] = useState(null);
  const environment = params.get('environment') || 'document';
  // Screenshots record every case in both modes; make the mode explicit so a
  // captured case is reproducible instead of inheriting the browser preference.
  const colorMode = params.get('colorMode') === 'dark' ? 'dark' : 'light';
  const mountShadow = useCallback((node) => {
    if (node) {
      setContainer(node.shadowRoot || node.attachShadow({ mode: 'open' }));
    }
  }, []);
  const mountFrame = useCallback((node) => {
    if (node) {
      setContainer(node.contentDocument.body);
    }
  }, []);
  // Emotion must insert the real component styles into the same DOM realm.
  const cache = useMemo(() => createCache({ key: 'e2e', container: container || document.head }), [container]);
  const fixture = (
    <CacheProvider value={cache}>
      <TonicProvider theme={theme} colorMode={{ value: colorMode }} environment={{ value: () => container || document.body }}>
        <FixturePage />
      </TonicProvider>
    </CacheProvider>
  );

  if (environment === 'shadow') {
    // The host node mounts before TonicProvider exists, so it must not rely on theme tokens.
    return <><Box data-testid="shadow-host" ref={mountShadow} />{container ? createPortal(fixture, container) : null}</>;
  }
  if (environment === 'iframe') {
    return (
      <>
        <Box as="iframe" title="Component frame" sandbox="allow-same-origin allow-scripts" ref={mountFrame} sx={{ width: '100%', height: 700 }} />
        {container ? createPortal(fixture, container) : null}
      </>
    );
  }
  return fixture;
};

createRoot(document.getElementById('root')).render(params.has('originalOwnerDocument') ? <OwnerDocumentFixture component={component} /> : <App />);
