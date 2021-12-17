import React, { forwardRef } from 'react';
import ButtonBase from '../ButtonBase';
import { useAccordionItem } from './context';

const AccordionHeader = forwardRef((
  {
    onClick,
    ...rest
  },
  ref
) => {
  const {
    panelId,
    headerId,
    isDisabled,
    onToggle,
  } = useAccordionItem();

  return (
    <ButtonBase
      ref={ref}
      width="100%"
      transition="all 0.2s"
      disabled={isDisabled}
      onClick={event => {
        onToggle();
        if (onClick) {
          onClick(event);
        }
      }}
      id={headerId}
      aria-controls={panelId}
      textAlign="left"
      cursor={isDisabled ? 'default' : 'pointer'}
      {...rest}
    />
  );
});

AccordionHeader.displayName = 'AccordionHeader';

export default AccordionHeader;
