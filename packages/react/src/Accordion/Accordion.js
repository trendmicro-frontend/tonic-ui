import memoize from 'micro-memoize';
import React, { forwardRef } from 'react';
import Box from '../Box';
import { AccordionContext } from './context';
import { useAccordionStyle } from './styles';

const getMemoizedState = memoize(state => ({ ...state }));

const Accordion = forwardRef((props, ref) => {
  const context = getMemoizedState({
    // TODO
  });
  const styleProps = useAccordionStyle();

  return (
    <AccordionContext.Provider value={context}>
      <Box
        ref={ref}
        {...styleProps}
        {...props}
      />
    </AccordionContext.Provider>
  );
});

Accordion.displayName = 'Accordion';

export default Accordion;
