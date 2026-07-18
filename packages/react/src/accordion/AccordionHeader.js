import { ensureBoolean } from 'ensure-type';
import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import AccordionToggle from './AccordionToggle';
import AccordionToggleIcon from './AccordionToggleIcon';
import useAccordionItem from './useAccordionItem';
import { useAccordionHeaderStyle } from './styles';

/**
 * @typedef {Object} AccordionHeaderProps
 * @property {React.ReactNode} [children] - The content of the accordion header.
 */

/**
 * @type {ForwardRefComponent<'button', AccordionHeaderProps>}
 */
const AccordionHeader = forwardRef((inProps, ref) => {
  const {
    children,
    disabled: disabledProp,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'AccordionHeader' });
  const context = useAccordionItem(); // context might be an undefined value
  const disabled = ensureBoolean(disabledProp ?? context?.disabled);
  const styleProps = useAccordionHeaderStyle();

  return (
    <AccordionToggle
      ref={ref}
      disabled={disabled}
      {...styleProps}
      {...rest}
    >
      <Box>{children}</Box>
      <AccordionToggleIcon />
    </AccordionToggle>
  );
});

AccordionHeader.displayName = 'AccordionHeader';

export default AccordionHeader;
