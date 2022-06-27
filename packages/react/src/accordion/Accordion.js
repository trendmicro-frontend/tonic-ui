import {
  runIfFn,
} from '@tonic-ui/utils';
import memoize from 'micro-memoize';
import React, { forwardRef } from 'react';
import { Box } from '../box';
import { AccordionContext } from './context';
import { useAccordionStyle } from './styles';

const getMemoizedState = memoize(state => ({ ...state }));

const Accordion = forwardRef((
  {
    children,
    ...rest
  },
  ref,
) => {
  const context = getMemoizedState({
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
