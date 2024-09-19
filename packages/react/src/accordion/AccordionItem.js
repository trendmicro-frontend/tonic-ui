import { runIfFn } from '@tonic-ui/utils';
import { ensureFunction } from 'ensure-type';
import memoize from 'micro-memoize';
import React, { forwardRef, useCallback, useEffect, useState } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import config from '../shared/config';
import useAutoId from '../utils/useAutoId';
import { AccordionItemContext } from './context';
import useAccordion from './useAccordion';

const getMemoizedState = memoize(state => ({ ...state }));

const AccordionItem = forwardRef((inProps, ref) => {
  const {
    children,
    disabled,
    isExpanded: isExpandedProp,
    defaultIsExpanded: defaultIsExpandedProp,
    onToggle: onToggleProp,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'AccordionItem' });
  const accordionContext = useAccordion();
  const defaultId = useAutoId();
  const accordionToggleId = `${config.name}:AccordionToggle-${defaultId}`;
  const accordionContentId = `${config.name}:AccordionContent-${defaultId}`;
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
    accordionToggleId,
    accordionContentId,
    disabled,
    isExpanded,
    onToggle,
    variant: accordionContext?.variant,
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
