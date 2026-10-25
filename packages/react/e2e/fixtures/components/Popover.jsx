/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../../../src';

const PopoverFixture = ({ params, record }) => {
  const [isOpen, setIsOpen] = useState(params.has('initiallyOpen'));
  const [dismiss, setDismiss] = useState(params.has('dismiss') ? params.get('dismiss') === 'true' : params.has('optOut') ? false : undefined);
  const [cancel, setCancel] = useState(params.has('cancel'));
  const legacyProps = params.has('legacy') ? { closeOnBlur: params.get('legacyValue') !== 'false' } : {};

  return (
    <Popover
      {...(params.get('legacy') !== 'content' ? legacyProps : {})}
      {...(params.has('controlled') ? { isOpen } : {})}
      defaultIsOpen={params.has('initiallyOpen')}
      closeOnInteractOutside={dismiss}
      portalled={params.has('portalled')}
      returnFocusOnClose={!params.has('noReturnFocus')}
      trigger={params.has('hover') ? 'hover' : 'click'}
      disabled={params.has('disabled')}
      closeOnEsc={!params.has('noCloseOnEsc')}
      enterDelay={0}
      leaveDelay={0}
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
      <PopoverTrigger data-testid="trigger"><button type="button">Open popover</button></PopoverTrigger>
      <PopoverContent
        {...(params.get('legacy') !== 'root' ? legacyProps : {})}
        data-testid="content"
        onBlur={() => record({ type: 'blur' })}
        onKeyDown={event => params.has('cancelEsc') && event.preventDefault()}
        slotProps={{ transition: { timeout: 0 } }}
      >
        <button type="button" data-testid="inside">Inside button</button>
        <label>
          <input type="checkbox" aria-label="Dismiss on outside click" checked={dismiss !== false} onChange={event => setDismiss(event.target.checked)} />
          Dismiss on outside click
        </label>
        <label>
          <input type="checkbox" aria-label="Cancel outside dismissal" checked={cancel} onChange={event => setCancel(event.target.checked)} />
          Cancel outside dismissal
        </label>
      </PopoverContent>
    </Popover>
  );
};

export default PopoverFixture;
