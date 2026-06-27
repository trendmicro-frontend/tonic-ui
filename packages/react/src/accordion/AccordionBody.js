import { forwardRef } from 'react';
import { useDefaultProps } from '../default-props';
import AccordionContent from './AccordionContent';
import { useAccordionBodyStyle } from './styles';

/**
 * @typedef {Object} AccordionBodyProps
 * @property {React.ReactNode} [children] - The content of the accordion body.
 */

/**
 * @type {ForwardRefComponent<'div', AccordionBodyProps>}
 */
const AccordionBody = forwardRef((inProps, ref) => {
  const props = useDefaultProps({ props: inProps, name: 'AccordionBody' });
  const styleProps = useAccordionBodyStyle();

  return (
    <AccordionContent
      ref={ref}
      {...styleProps}
      {...props}
    />
  );
});

AccordionBody.displayName = 'AccordionBody';

export default AccordionBody;
