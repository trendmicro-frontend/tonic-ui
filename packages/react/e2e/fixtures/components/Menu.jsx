/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import { Menu, MenuButton, MenuContent, MenuItem, Submenu, SubmenuContent, SubmenuTrigger } from '../../../src';

const MenuFixture = ({ params, record }) => {
  const [isOpen, setIsOpen] = useState(params.has('initiallyOpen'));
  const [dismiss, setDismiss] = useState(params.has('dismiss') ? params.get('dismiss') === 'true' : params.has('optOut') ? false : undefined);
  const [cancel, setCancel] = useState(params.has('cancel'));
  const [submenu, setSubmenu] = useState(false);
  const legacyProps = params.has('legacy') ? { closeOnBlur: params.get('legacyValue') !== 'false' } : {};

  return (
    <Menu
      {...(params.get('legacy') !== 'content' ? legacyProps : {})}
      {...(params.has('controlled') ? { isOpen } : {})}
      defaultIsOpen={params.has('initiallyOpen')}
      closeOnInteractOutside={dismiss}
      closeOnSelect={params.has('closeOnSelect')}
      portalled={params.has('portalled')}
      returnFocusOnClose={!params.has('noReturnFocus')}
      onOpen={() => {
        record({ type: 'open' });
        setIsOpen(true);
      }}
      onClose={() => {
        record({ type: 'close' });
        if (!params.has('holdOpen')) {
          setIsOpen(false);
        }
      }}
      onInteractOutside={event => {
        if (cancel) {
          event.preventDefault();
        }
        record({ type: 'outside', eventType: event.type, target: event.target.dataset.testid, cancelable: event.cancelable, defaultPrevented: event.defaultPrevented });
      }}
    >
      <MenuButton data-testid="trigger">Open menu</MenuButton>
      <MenuContent
        {...(params.get('legacy') !== 'root' ? legacyProps : {})}
        data-testid="content"
        onBlur={() => record({ type: 'blur' })}
        onKeyDown={event => params.has('cancelEsc') && event.preventDefault()}
        slotProps={{ transition: { timeout: 0 } }}
      >
        <MenuItem data-testid="inside">Inside item</MenuItem>
        <label>
          <input type="checkbox" aria-label="Dismiss on outside click" checked={dismiss !== false} onChange={event => setDismiss(event.target.checked)} />
          Dismiss on outside click
        </label>
        <label>
          <input type="checkbox" aria-label="Cancel outside dismissal" checked={cancel} onChange={event => setCancel(event.target.checked)} />
          Cancel outside dismissal
        </label>
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
      </MenuContent>
    </Menu>
  );
};

export default MenuFixture;
