/* eslint-disable react/jsx-no-bind */
import React, { useRef, useState } from 'react';
import { Popper } from '../../../../src';

const PopperFixture = ({ params, record }) => {
  const [isOpen, setIsOpen] = useState(params.has('initiallyOpen'));
  const triggerRef = useRef(null);
  const boundaryRef = useRef(null);
  const [grown, setGrown] = useState(false);
  const bounded = params.has('boundary');
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
    <div ref={boundaryRef} data-testid="boundary" style={bounded ? { position: 'relative', margin: 80, width: 360, height: 400, overflow: 'hidden' } : undefined}>
      {params.has('edge') ? (
        <div style={{ position: 'fixed', left: 200, bottom: 48 }}>
          {trigger}
        </div>
      ) : bounded ? <div style={{ position: 'absolute', top: 220, left: 48 }}>{trigger}</div> : trigger}
      {params.has('resize') && <button type="button" data-testid="grow" onClick={() => setGrown(!grown)} style={{ position: 'fixed', top: 8, left: 8 }}>Resize content</button>}
      <Popper
        data-testid="content"
        isOpen={isOpen}
        matchWidth={params.has('matchWidth')}
        placement={placement}
        portalled={params.has('portalled')}
        referenceRef={triggerRef}
        {...(bounded
          ? { modifiers: [
              { name: 'flip', options: { boundary: boundaryRef.current || 'clippingParents', padding: 8 } },
              { name: 'preventOverflow', options: { boundary: boundaryRef.current || 'clippingParents', padding: 8 } },
            ] }
          : {})}
        unmountOnExit
      >
        {({ computedPlacement }) => (
          <>
            <button type="button" data-testid="inside" data-computed-placement={computedPlacement}>
              Popper content
            </button>
            <div style={{ height: grown ? 180 : 48 }}>Spacer</div>
          </>
        )}
      </Popper>
    </div>
  );
};

export default PopperFixture;
