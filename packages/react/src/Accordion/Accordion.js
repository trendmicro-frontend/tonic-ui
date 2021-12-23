import memoize from 'micro-memoize';
import React from 'react';
import { AccordionContext } from './context';

const getMemoizedState = memoize(state => ({ ...state }));

const Accordion = ({
  children,
  variant,
}) => {
  const context = getMemoizedState({
    variant,
  });

  return (
    <AccordionContext.Provider value={context}>
      {children}
    </AccordionContext.Provider>
  );
};

Accordion.displayName = 'Accordion';

export default Accordion;
