import React, {
  createContext,
  forwardRef,
  useContext,
  useRef,
  useState,
  Children,
  cloneElement,
  isValidElement,
} from 'react';
import Box from '../Box';
import ButtonBase from '../ButtonBase';
import Icon from '../Icon';
import PseudoBox from '../PseudoBox';
import Collapse from '../Transitions/Collapse';
import Fade from '../Transitions/Fade';
import { createUniqueId } from '../utils/uniqueid';

const uniqueId = createUniqueId();

const Accordion = ({
  allowMultiple,
  allowToggle,
  index,
  defaultIndex,
  onChange,
  children,
  ...rest
}) => {
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
    <Box data-accordion="" {...rest}>
      {clones}
    </Box>
  );
};

Accordion.displayName = 'Accordion';

const AccordionItemContext = createContext();
const useAccordionItemContext = () => useContext(AccordionItemContext);

const AccordionItem = forwardRef(
  (
    { isOpen, defaultIsOpen, id, isDisabled, onChange, children, ...rest },
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
    const headerId = `accordion-header-${id}`;
    const panelId = `accordion-panel-${id}`;

    return (
      <AccordionItemContext.Provider
        value={{
          isExpanded: _isExpanded,
          isDisabled,
          headerId,
          panelId,
          onToggle,
        }}
      >
        <PseudoBox
          borderTopWidth="1px"
          _last={{ borderBottomWidth: '1px' }}
          data-accordion-item=""
          ref={ref}
          {...rest}
        >
          {typeof children === 'function'
            ? children({ isExpanded: _isExpanded, isDisabled })
            : children}
        </PseudoBox>
      </AccordionItemContext.Provider>
    );
  },
);

AccordionItem.displayName = 'AccordionItem';

/////////////////////////////////////////////////////////////

const AccordionHeader = forwardRef(({ onClick, ...props }, ref) => {
  const {
    panelId,
    headerId,
    isDisabled,
    onToggle,
  } = useAccordionItemContext();

  return (
    <ButtonBase
      ref={ref}
      width="100%"
      transition="all 0.2s"
      disabled={isDisabled}
      onClick={event => {
        onToggle();
        if (onClick) {
          onClick(event);
        }
      }}
      id={headerId}
      aria-controls={panelId}
      textAlign="left"
      cursor={isDisabled ? 'default' : 'pointer'}
      {...props}
    />
  );
});

AccordionHeader.displayName = 'AccordionHeader';

/////////////////////////////////////////////////////////////

const AccordionPanel = forwardRef((props, ref) => {
  const { isExpanded, panelId, headerId } = useAccordionItemContext();
  return (
    <Fade in={isExpanded}>
      <Collapse
        ref={ref}
        in={isExpanded}
        data-accordion-panel=""
        role="region"
        id={panelId}
        aria-labelledby={headerId}
        aria-hidden={!isExpanded}
        {...props}
      />
    </Fade>
  );
});

AccordionPanel.displayName = 'AccordionPanel';

/////////////////////////////////////////////////////////////

const AccordionIcon = props => {
  const { isExpanded, isDisabled } = useAccordionItemContext();
  return (
    <Icon
      icon="chevron-down"
      opacity={isDisabled ? 0.4 : 1}
      transform={isExpanded ? 'rotate(180deg)' : null}
      transition="transform 0.2s"
      transformOrigin="center"
      {...props}
    />
  );
};

AccordionIcon.displayName = 'AccordionIcon';

export {
  Accordion,
  AccordionItem,
  AccordionIcon,
  AccordionHeader,
  AccordionPanel,
};
