import React, { forwardRef, useRef, useState } from 'react';
import PseudoBox from '../PseudoBox';
import config from '../shared/config';
import { createUniqueId } from '../utils/uniqueid';
import { AccordionItemProvider } from './context';

const uniqueId = createUniqueId();

const AccordionItem = forwardRef((
  {
    isOpen,
    defaultIsOpen,
    id,
    isDisabled,
    onChange,
    children,
    ...rest
  },
  ref,
) => {
  const [isExpanded, setIsExpanded] = useState(defaultIsOpen || false);
  const { current: isControlled } = useRef(isOpen != null);
  let _isExpanded = isControlled ? isOpen : isExpanded;

  const onToggle = () => {
    onChange && onChange(!_isExpanded);
    !isControlled && setIsExpanded(!isExpanded);
  };

  id = id ?? uniqueId();
  const headerId = `${config.name}:accordion-header-${id}`;
  const panelId = `${config.name}:accordion-panel-${id}`;

  return (
    <AccordionItemProvider
      value={{
        isExpanded: _isExpanded,
        isDisabled,
        headerId,
        panelId,
        onToggle,
      }}
    >
      <PseudoBox
        ref={ref}
        borderTopWidth="1px"
        _last={{ borderBottomWidth: '1px' }}
        data-accordion-item=""
        {...rest}
      >
        {typeof children === 'function'
          ? children({ isExpanded: _isExpanded, isDisabled })
          : children}
      </PseudoBox>
    </AccordionItemProvider>
  );
});

AccordionItem.displayName = 'AccordionItem';

export default AccordionItem;
