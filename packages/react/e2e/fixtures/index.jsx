/* eslint-disable react/jsx-no-bind */
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import React, { useCallback, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { createRoot } from 'react-dom/client';
import { createTheme, Drawer, DrawerContent, Modal, ModalContent, ModalOverlay, TonicProvider } from '../../src';
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
};

const FixturePage = () => {
  const [entries, setEntries] = useState([]);
  const [mounted, setMounted] = useState(true);
  const record = entry => setEntries(previous => [...previous, entry]);
  const Fixture = params.has('nestedAction') ? NestedOutsideAction : fixtures[component];
  const boundary = params.get('boundary');
  const fixture = mounted ? <Fixture params={params} record={record} /> : null;
  const sibling = <button type="button" data-testid="boundary-outside" style={{ marginTop: 200 }}>Sibling inside dialog</button>;

  return (
    <main data-testid="fixture" data-component={component} style={{ padding: 32 }}>
      <h1>{component} browser fixture</h1>
      {!['modal', 'drawer'].includes(component) && (
        <div
          data-testid="outside"
          role="presentation"
          onMouseDown={event => event.preventDefault()}
          style={{ position: 'fixed', right: 24, top: 24, padding: 24, border: '1px solid' }}
        >
          Outside without focus movement
        </div>
      )}
      {boundary === 'modal' ? (
        <Modal isOpen>
          <ModalOverlay />
          <ModalContent width={600}>
            {fixture}
            {sibling}
          </ModalContent>
        </Modal>
      ) : boundary === 'drawer'
        ? (
            <Drawer isOpen>
              <DrawerContent width={600}>
                {fixture}
                {sibling}
              </DrawerContent>
            </Drawer>
          )
        : fixture}
      <div style={{ position: 'fixed', bottom: 16, left: 16, zIndex: 99999 }}>
        <button type="button" data-testid="page-outside">Outside the overlay container</button>
        <button type="button" data-testid="focus-target">Outside focus target</button>
        <button type="button" data-testid="unmount" onClick={() => setMounted(false)}>Unmount component</button>
        <button type="button" data-testid="remount" onClick={() => setMounted(true)}>Remount component</button>
        <output data-testid="events">{JSON.stringify(entries)}</output>
      </div>
    </main>
  );
};

const App = () => {
  const [container, setContainer] = useState(null);
  const environment = params.get('environment') || 'document';
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
      <TonicProvider theme={theme} environment={{ value: () => container || document.body }}>
        <FixturePage />
      </TonicProvider>
    </CacheProvider>
  );

  if (environment === 'shadow') {
    return <><div data-testid="shadow-host" ref={mountShadow} />{container ? createPortal(fixture, container) : null}</>;
  }
  if (environment === 'iframe') {
    return (
      <>
        <iframe title="Component frame" sandbox="allow-same-origin" ref={mountFrame} style={{ width: '100%', height: 700 }} />
        {container ? createPortal(fixture, container) : null}
      </>
    );
  }
  return fixture;
};

createRoot(document.getElementById('root')).render(<App />);
