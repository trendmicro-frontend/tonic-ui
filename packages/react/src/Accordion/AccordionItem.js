import { useConst } from '@tonic-ui/react-hooks';
import { ensureFunction } from 'ensure-type';
import memoize from 'micro-memoize';
import React, { forwardRef, useCallback, useEffect, useState } from 'react';
import Box from '../Box';
import config from '../shared/config';
import runIfFn from '../utils/runIfFn';
import { createUniqueId } from '../utils/uniqueid';
import { AccordionItemContext } from './context';
import useAccordion from './useAccordion';

const getMemoizedState = memoize(state => ({ ...state }));

const uniqueId = createUniqueId();

const AccordionItem = forwardRef((
  {
    children,
    disabled,
    id: idProp,
    isExpanded: isExpandedProp,
    defaultIsExpanded: defaultIsExpandedProp,
    onToggle: onToggleProp,
    ...rest
  },
  ref,
) => {
  const accordionContext = useAccordion();
  const id = useConst(() => uniqueId());
  const itemId = idProp ?? `${config.name}:accordion-item-${id}`;
  const headerId = `${itemId}-header`;
  const bodyId = `${itemId}-body`;
  const [isExpanded, setIsExpanded] = useState(isExpandedProp ?? defaultIsExpandedProp);

  useEffect(() => {
    const isControlled = (isExpandedProp !== undefined);
    if (isControlled) {
      setIsExpanded(isExpandedProp);
    }
  }, [isExpandedProp]);

  const onToggle = useCallback(() => {
    const isControlled = (isExpandedProp !== undefined);
    if (!isControlled) {
      setIsExpanded(!isExpanded);
    }

    ensureFunction(onToggleProp)({
      isExpanded: !isExpanded,
    });
  }, [isExpanded, isExpandedProp, onToggleProp]);

  const context = getMemoizedState({
    variant: accordionContext?.variant,
    bodyId,
    disabled,
    headerId,
    isExpanded,
    onToggle,
  });

  return (
    <AccordionItemContext.Provider value={context}>
      <Box
        ref={ref}
        {...rest}
      >
        {runIfFn(children, context)}
      </Box>
    </AccordionItemContext.Provider>
  );
});

AccordionItem.displayName = 'AccordionItem';

export default AccordionItem;
