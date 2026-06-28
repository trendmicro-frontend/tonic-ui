import { runIfFn } from '@tonic-ui/utils';
import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import useShallowMemo from '../utils/useShallowMemo';
import { AccordionContext } from './context';
import { useAccordionStyle } from './styles';

/**
 * @typedef {Object} AccordionProps
 * @property {React.ReactNode | ((context: {}) => React.ReactNode)} [children] - A function child can be used intead of a React element. This function is called with the context object.
 */

/**
 * @type {ForwardRefComponent<'div', AccordionProps>}
 */
const Accordion = forwardRef((inProps, ref) => {
  const {
    children,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'Accordion' });
  const shallowMemo = useShallowMemo();
  const context = shallowMemo({
    // TODO
  });
  const styleProps = useAccordionStyle();

  return (
    <AccordionContext.Provider value={context}>
      <Box
        ref={ref}
        {...styleProps}
        {...rest}
      >
        {runIfFn(children, context)}
      </Box>
    </AccordionContext.Provider>
  );
});

Accordion.displayName = 'Accordion';

export default Accordion;
