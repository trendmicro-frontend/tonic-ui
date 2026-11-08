/* eslint-disable react/jsx-no-bind */
import React, { useRef, useState } from 'react';
import { Box, Button, Popper } from '../../../../src';

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
    <Button
      ref={triggerRef}
      data-testid="trigger"
      onClick={toggle}
      sx={{ width: 240 }}
    >
      Toggle popper
    </Button>
  );

  return (
    <Box
      ref={boundaryRef}
      data-testid="boundary"
      sx={bounded ? { position: 'relative', m: '20x', width: 360, height: 400, overflow: 'hidden' } : undefined}
    >
      {params.has('edge') ? (
        <Box sx={{ position: 'fixed', left: 600, bottom: '12x' }}>
          {trigger}
        </Box>
      ) : bounded ? <Box sx={{ position: 'absolute', top: 220, left: '12x' }}>{trigger}</Box> : trigger}
      {params.has('resize') && <Button data-testid="grow" onClick={() => setGrown(!grown)} sx={{ position: 'fixed', top: '2x', left: '2x' }}>Resize content</Button>}
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
            <Button data-testid="inside" data-computed-placement={computedPlacement}>
              Popper content
            </Button>
            <Box sx={{ height: grown ? 180 : 48 }}>Spacer</Box>
          </>
        )}
      </Popper>
    </Box>
  );
};

export default PopperFixture;
