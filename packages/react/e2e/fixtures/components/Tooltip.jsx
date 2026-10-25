/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import { Box, OverflowTooltip, Tooltip } from '../../../src';

const LONG_TEXT = 'This label is intentionally long enough to overflow the narrow container that holds it';
const SHORT_TEXT = 'Short label';

const TooltipFixture = ({ params, record }) => {
  const [isOpen, setIsOpen] = useState(params.has('initiallyOpen'));
  const useOverflowTooltip = params.get('component') === 'overflow-tooltip' || params.has('overflow');

  // Tooltip defaults: closeOnClick, closeOnPointerDown, closeOnEsc and openOnFocus are all true.
  const tooltipProps = {
    closeOnClick: !params.has('noCloseOnClick') && !params.has('optOut'),
    closeOnPointerDown: !params.has('noCloseOnPointerDown') && !params.has('optOut'),
    closeOnEsc: !params.has('noCloseOnEsc'),
    defaultIsOpen: params.has('initiallyOpen'),
    disabled: params.has('disabled'),
    enterDelay: 0,
    leaveDelay: 0,
    openOnFocus: !params.has('noOpenOnFocus'),
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
      {useOverflowTooltip ? (
        <Box data-testid="overflow-container" width="120px">
          <Box data-testid="trigger">
            <OverflowTooltip data-testid="content" label="Overflow tooltip" {...tooltipProps}>
              {params.has('noOverflow') ? SHORT_TEXT : LONG_TEXT}
            </OverflowTooltip>
          </Box>
        </Box>
      ) : (
        <Tooltip
          data-testid="content"
          label={<span data-testid="inside">Tooltip label</span>}
          {...tooltipProps}
        >
          <button type="button" data-testid="trigger">Tooltip trigger</button>
        </Tooltip>
      )}
      <button type="button" data-testid="controlled-toggle" onClick={toggleControlled}>
        Toggle isOpen
      </button>
    </div>
  );
};

export default TooltipFixture;
