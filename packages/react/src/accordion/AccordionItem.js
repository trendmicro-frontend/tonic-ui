import { useId } from '@tonic-ui/react-hooks';
import { runIfFn } from '@tonic-ui/utils';
import { ensureFunction } from 'ensure-type';
import { forwardRef, useCallback, useEffect, useState } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import useShallowMemo from '../utils/useShallowMemo';
import config from '../shared/config';
import { AccordionItemContext } from './context';
import useAccordion from './useAccordion';

/**
 * @typedef {Object} AccordionItemProps
 * @property {React.ReactNode | ((context: { accordionToggleId: string; accordionContentId: string; disabled?: boolean; isExpanded?: boolean; onToggle: () => void; variant?: string }) => React.ReactNode)} [children] - A function child can be used intead of a React element. This function is called with the context object.
 * @property {boolean} [disabled] - Whether the accordion item is disabled.
 * @property {boolean} [isExpanded] - Whether the accordion item is expanded.
 * @property {boolean} [defaultIsExpanded] - Whether the accordion item is expanded by default.
 * @property {(event: { isExpanded: boolean }) => void} [onToggle] - A callback that is called when the accordion item is toggled.
 */

/**
 * @type {ForwardRefComponent<'div', AccordionItemProps>}
 */
const AccordionItem = forwardRef((inProps, ref) => {
  const {
    children,
    disabled,
    isExpanded: isExpandedProp,
    defaultIsExpanded: defaultIsExpandedProp,
    onToggle: onToggleProp,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'AccordionItem' });
  const shallowMemo = useShallowMemo();
  const accordionContext = useAccordion();
  const defaultId = useId();
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

  const context = shallowMemo({
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
