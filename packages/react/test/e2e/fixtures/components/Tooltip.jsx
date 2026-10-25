/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import { Box, OverflowTooltip, Tooltip } from '../../../../src';

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
    <div>
      {params.has('scrollable') && (
        <div data-testid="spacer-top" style={{ height: 400 }} />
      )}
      {useOverflowTooltip ? (
        <Box data-testid="overflow-container" width={overflowContainerWidth}>
          <Box data-testid="trigger">
            <OverflowTooltip data-testid="content" label="Overflow tooltip" {...tooltipProps}>
              {params.has('fractional') ? ({ ref, style }) => (
                <div ref={ref} style={{ ...style, textOverflow: 'clip' }}>
                  <span data-testid="fractional-content" style={{ display: 'inline-block', width: '120.4px' }}>
                    Fractional
                  </span>
                </div>
              ) : params.has('noOverflow') ? SHORT_TEXT : LONG_TEXT}
            </OverflowTooltip>
          </Box>
        </Box>
      ) : (
        <Tooltip
          data-testid="content"
          label={<span data-testid="inside">Tooltip label</span>}
          {...tooltipProps}
        >
          <button
            type="button"
            data-testid="trigger"
            style={params.has('nearBottom') ? { position: 'fixed', left: 200, bottom: 8, zIndex: 100000 } : undefined}
          >
            Tooltip trigger
          </button>
        </Tooltip>
      )}
      <button type="button" data-testid="controlled-toggle" onClick={toggleControlled}>
        Toggle isOpen
      </button>
      {params.has('resizable') && (
        <button type="button" data-testid="resize" onClick={() => setIsWide(previous => !previous)}>
          Resize container
        </button>
      )}
      {params.has('scrollable') && (
        <div data-testid="spacer-bottom" style={{ height: 1200 }} />
      )}
    </div>
  );
};

export default TooltipFixture;
