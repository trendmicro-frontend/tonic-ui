/* eslint-disable react/jsx-no-bind */
import React, { useRef, useState } from 'react';
import { Popper } from '../../../src';

const PopperFixture = ({ params, record }) => {
  const [isOpen, setIsOpen] = useState(params.has('initiallyOpen'));
  const triggerRef = useRef(null);
  const placement = params.get('placement') || 'bottom-start';

  const toggle = () => {
    record({ type: isOpen ? 'close' : 'open' });
    setIsOpen(!isOpen);
  };

  const trigger = (
    <button
      ref={triggerRef}
      type="button"
      data-testid="trigger"
      onClick={toggle}
      style={{ width: 240 }}
    >
      Toggle popper
    </button>
  );

  return (
    <div>
      {params.has('edge') ? (
        <div style={{ position: 'fixed', left: 200, bottom: 48 }}>
          {trigger}
        </div>
      ) : trigger}
      <Popper
        data-testid="content"
        isOpen={isOpen}
        matchWidth={params.has('matchWidth')}
        placement={placement}
        portalled={params.has('portalled')}
        referenceRef={triggerRef}
        unmountOnExit
      >
        {({ computedPlacement }) => (
          <>
            <button type="button" data-testid="inside" data-computed-placement={computedPlacement}>
              Popper content
            </button>
            <div style={{ height: 48 }}>Spacer</div>
          </>
        )}
      </Popper>
    </div>
  );
};

export default PopperFixture;
