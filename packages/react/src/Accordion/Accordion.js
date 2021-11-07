import React, { Children, cloneElement, forwardRef, isValidElement, useRef, useState } from 'react';
import Box from '../Box';

const Accordion = forwardRef((
  {
    allowMultiple,
    allowToggle,
    index,
    defaultIndex,
    onChange,
    children,
    ...rest
  },
  ref,
) => {
  const initializeState = () => {
    if (allowMultiple) {
      return defaultIndex || [];
    } else {
      return defaultIndex || 0;
    }
  };

  const getExpandCondition = (index, itemIndex) => {
    if (Array.isArray(index)) {
      return index.includes(itemIndex);
    }
    return index === itemIndex;
  };

  const [expandedIndex, setExpandedIndex] = useState(initializeState);
  const { current: isControlled } = useRef(index != null);

  const _index = isControlled ? index : expandedIndex;

  const clones = Children.map(children, (child, childIndex) => {
    if (!isValidElement(child)) {
      return null;
    }

    return cloneElement(child, {
      isOpen: getExpandCondition(_index, childIndex),
      onChange: isExpanded => {
        if (allowMultiple) {
          if (isExpanded) {
            let newIndexes = [..._index, childIndex];
            !isControlled && setExpandedIndex(newIndexes);
            onChange && onChange(newIndexes);
          } else {
            let newIndexes = _index.filter(
              itemIndex => itemIndex !== childIndex,
            );
            !isControlled && setExpandedIndex(newIndexes);
            onChange && onChange(newIndexes);
          }
        } else if (isExpanded) {
          !isControlled && setExpandedIndex(childIndex);
          onChange && onChange(childIndex);
        } else if (allowToggle) {
          !isControlled && setExpandedIndex(null);
          onChange && onChange(null);
        }
      },
    });
  });

  return (
    <Box
      ref={ref}
      data-accordion=""
      {...rest}
    >
      {clones}
    </Box>
  );
});

Accordion.displayName = 'Accordion';

export default Accordion;
