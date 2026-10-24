/* eslint-disable react/jsx-no-bind */
import React, { useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import { createRoot } from 'react-dom/client';
import {
  EnvironmentProvider,
  Menu,
  MenuButton,
  MenuContent,
  MenuItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Submenu,
  SubmenuContent,
  SubmenuTrigger,
  TonicProvider,
} from '../src';

const params = new URLSearchParams(window.location.search);
const kind = params.get('kind') || 'menu';
const Root = kind === 'menu' ? Menu : Popover;
const Content = kind === 'menu' ? MenuContent : PopoverContent;

const OverlayFixture = () => {
  const [events, setEvents] = useState([]);
  const [mounted, setMounted] = useState(true);
  const [isOpen, setIsOpen] = useState(params.has('initiallyOpen'));
  const [dismiss, setDismiss] = useState(params.has('optOut') ? false : undefined);
  const [cancel, setCancel] = useState(params.has('cancel'));
  const [submenu, setSubmenu] = useState(false);
  const record = (event) => setEvents(previous => [...previous, event]);
  const legacyProps = params.has('legacy')
    ? { closeOnBlur: params.get('legacyValue') !== 'false' }
    : {};
  const rootProps = {
    ...(params.get('legacy') !== 'content' ? legacyProps : {}),
    closeOnInteractOutside: dismiss,
    defaultIsOpen: params.has('initiallyOpen'),
    portalled: params.has('portalled'),
    returnFocusOnClose: !params.has('noReturnFocus'),
    onOpen: () => {
      record({ type: 'open' });
      setIsOpen(true);
    },
    onClose: () => {
      record({ type: 'close' });
      if (!params.has('holdOpen')) {
        setIsOpen(false);
      }
    },
    onInteractOutside: (event) => {
      if (cancel) {
        event.preventDefault();
      }
      record({
        type: 'outside',
        eventType: event.type,
        target: event.target.dataset.testid,
        cancelable: event.cancelable,
        defaultPrevented: event.defaultPrevented,
      });
    },
    ...(params.has('controlled') ? { isOpen } : {}),
    ...(kind === 'menu'
      ? { closeOnSelect: params.has('closeOnSelect') }
      : {
          trigger: params.has('hover') ? 'hover' : 'click',
          disabled: params.has('disabled'),
          closeOnEsc: !params.has('noCloseOnEsc'),
          enterDelay: 0,
          leaveDelay: 0,
        }),
  };

  return (
    <main style={{ padding: 32 }}>
      <h1>{kind} interaction fixture</h1>
      <div
        data-testid="outside"
        role="presentation"
        onMouseDown={event => event.preventDefault()}
        style={{ position: 'fixed', right: 24, top: 24, padding: 24, border: '1px solid' }}
      >
        Outside without focus movement
      </div>
      {mounted ? (
        <Root {...rootProps}>
          {kind === 'menu'
            ? <MenuButton data-testid="trigger">Open menu</MenuButton>
            : <PopoverTrigger data-testid="trigger"><button type="button">Open popover</button></PopoverTrigger>}
          <Content
            {...(params.get('legacy') !== 'root' ? legacyProps : {})}
            data-testid="content"
            onBlur={() => record({ type: 'blur' })}
            onKeyDown={event => params.has('cancelEsc') && event.preventDefault()}
            slotProps={{ transition: { timeout: 0 } }}
          >
            {kind === 'menu'
              ? <MenuItem data-testid="inside">Inside item</MenuItem>
              : <button type="button" data-testid="inside">Inside button</button>}
            <label>
              <input
                type="checkbox"
                aria-label="Dismiss on outside click"
                checked={dismiss !== false}
                onChange={event => setDismiss(event.target.checked)}
              />
              Dismiss on outside click
            </label>
            <label>
              <input type="checkbox" aria-label="Cancel outside dismissal" checked={cancel} onChange={event => setCancel(event.target.checked)} />
              Cancel outside dismissal
            </label>
            {kind === 'menu' && (
              <>
                <label>
                  <input type="checkbox" aria-label="Mount submenu" checked={submenu} onChange={event => setSubmenu(event.target.checked)} />
                  Mount submenu
                </label>
                {submenu ? (
                  <Submenu portalled>
                    <SubmenuTrigger data-testid="submenu-trigger">More</SubmenuTrigger>
                    <SubmenuContent data-testid="submenu-content" slotProps={{ transition: { timeout: 0 } }}>
                      <MenuItem data-testid="submenu-item">Nested item</MenuItem>
                      <Submenu portalled>
                        <SubmenuTrigger data-testid="nested-trigger">More nested</SubmenuTrigger>
                        <SubmenuContent data-testid="nested-content" slotProps={{ transition: { timeout: 0 } }}>
                          <MenuItem data-testid="nested-item">Deep item</MenuItem>
                        </SubmenuContent>
                      </Submenu>
                    </SubmenuContent>
                  </Submenu>
                ) : null}
              </>
            )}
          </Content>
        </Root>
      ) : null}
      <div style={{ marginTop: 300 }}>
        <button type="button" data-testid="focus-target">Outside focus target</button>
        <button type="button" data-testid="unmount" onClick={() => setMounted(false)}>Unmount overlay</button>
        <button type="button" data-testid="remount" onClick={() => setMounted(true)}>Remount overlay</button>
      </div>
      <output data-testid="events">{JSON.stringify(events)}</output>
    </main>
  );
};

const App = () => {
  const [container, setContainer] = useState(null);
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
  const fixture = (
    <EnvironmentProvider value={() => container || document.body}>
      <TonicProvider>
        <OverlayFixture />
      </TonicProvider>
    </EnvironmentProvider>
  );

  if (params.get('environment') === 'shadow') {
    return <><div data-testid="shadow-host" ref={mountShadow} />{container ? createPortal(fixture, container) : null}</>;
  }
  if (params.get('environment') === 'iframe') {
    return (
      <>
        <iframe title="Overlay frame" sandbox="allow-same-origin" ref={mountFrame} style={{ width: '100%', height: 650 }} />
        {container ? createPortal(fixture, container) : null}
      </>
    );
  }
  return fixture;
};

createRoot(document.getElementById('root')).render(<App />);
