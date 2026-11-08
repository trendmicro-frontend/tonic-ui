/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import { Box, Button, OverflowTooltip, Tooltip } from '../../../../src';

const LONG_TEXT = 'This label is intentionally long enough to overflow the narrow container that holds it';
const SHORT_TEXT = 'Short label';

const TooltipFixture = ({ params, record }) => {
  const [isOpen, setIsOpen] = useState(params.has('initiallyOpen'));
  const [isWide, setIsWide] = useState(false);
  const useOverflowTooltip = params.get('component') === 'overflow-tooltip' || params.has('overflow');
  const overflowContainerWidth = params.has('resizable') ? (isWide ? '720px' : '120px') : '120px';

  // Tooltip defaults: closeOnClick, closeOnPointerDown, closeOnEsc and openOnFocus are all true.
  const tooltipProps = {
    closeOnClick: !params.has('noCloseOnClick') && !params.has('optOut'),
    closeOnPointerDown: !params.has('noCloseOnPointerDown') && !params.has('optOut'),
    closeOnEsc: !params.has('noCloseOnEsc'),
    defaultIsOpen: params.has('initiallyOpen'),
    disabled: params.has('disabled'),
    enterDelay: 0,
    followCursor: params.has('followCursor'),
    leaveDelay: 0,
    openOnFocus: !params.has('noOpenOnFocus'),
    placement: params.get('placement') || undefined,
    portalled: params.has('portalled'),
    ...(params.has('controlled') ? { isOpen } : {}),
    onOpen: () => {
      record({ type: 'open' });
      if (!params.has('holdOpen')) {
        setIsOpen(true);
      }
    },
    onClose: () => {
      record({ type: 'close' });
      if (!params.has('holdOpen')) {
        setIsOpen(false);
      }
    },
  };

  const toggleControlled = () => setIsOpen(previous => !previous);

  return (
    <Box>
      {params.has('scrollable') && (
        <Box data-testid="spacer-top" sx={{ height: 400 }} />
      )}
      {useOverflowTooltip ? (
        <Box data-testid="overflow-container" sx={{ width: overflowContainerWidth }}>
          <Box data-testid="trigger">
            <OverflowTooltip data-testid="content" label="Overflow tooltip" {...tooltipProps}>
              {params.has('fractional') ? ({ ref, style }) => (
                <Box ref={ref} sx={[style, { textOverflow: 'clip' }]}>
                  <Box as="span" data-testid="fractional-content" sx={{ display: 'inline-block', width: '120.4px' }}>
                    Fractional
                  </Box>
                </Box>
              ) : params.has('noOverflow') ? SHORT_TEXT : LONG_TEXT}
            </OverflowTooltip>
          </Box>
        </Box>
      ) : (
        <Tooltip
          data-testid="content"
          label={<Box as="span" data-testid="inside">Tooltip label</Box>}
          {...tooltipProps}
        >
          <Button
            data-testid="trigger"
            sx={params.has('nearBottom') ? { position: 'fixed', left: 600, bottom: '2x', zIndex: 100000 } : undefined}
          >
            Tooltip trigger
          </Button>
        </Tooltip>
      )}
      <Button data-testid="controlled-toggle" onClick={toggleControlled}>
        Toggle isOpen
      </Button>
      {params.has('resizable') && (
        <Button data-testid="resize" onClick={() => setIsWide(previous => !previous)}>
          Resize container
        </Button>
      )}
      {params.has('scrollable') && (
        <Box data-testid="spacer-bottom" sx={{ height: 1200 }} />
      )}
    </Box>
  );
};

export default TooltipFixture;
