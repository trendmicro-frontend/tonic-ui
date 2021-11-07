import React, { cloneElement, forwardRef, useContext, useRef } from 'react';
import { TabContext } from './context';
import Flex from '../Flex';
import { useTabListStyle } from './styles';
import cleanChildren from '../utils/cleanChildren';

const TabList = forwardRef((props, ref) => {
  const { children, onKeyDown, ...rest } = props;

  const {
    id,
    index: selectedIndex,
    manualIndex,
    onManualTabChange,
    isManual,
    onChangeTab,
    onFocusPanel,
    orientation,
  } = useContext(TabContext);

  const tabListStyleProps = useTabListStyle();

  const allNodes = useRef([]);

  const validChildren = cleanChildren(children);

  const focusableIndexes = validChildren
    .map((child, index) => (child.props.disabled === true ? null : index))
    .filter((index) => index != null);

  const enabledSelectedIndex = focusableIndexes.indexOf(selectedIndex);
  const count = focusableIndexes.length;

  const updateIndex = (index) => {
    const childIndex = focusableIndexes[index];
    allNodes.current[childIndex].focus();
    onChangeTab && onChangeTab(childIndex);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      const nextIndex = (enabledSelectedIndex + 1) % count;
      updateIndex(nextIndex);
    }

    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      const nextIndex = (enabledSelectedIndex - 1 + count) % count;
      updateIndex(nextIndex);
    }

    if (event.key === 'Home') {
      event.preventDefault();
      updateIndex(0);
    }

    if (event.key === 'End') {
      event.preventDefault();
      updateIndex(count - 1);
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      onFocusPanel && onFocusPanel();
    }

    if (onKeyDown) {
      onKeyDown(event);
    }
  };

  const clones = validChildren.map((child, index) => {
    const isSelected = isManual ? index === manualIndex : index === selectedIndex;
    const handleClick = (event) => {
      // Hack for Safari. Buttons don't receive focus on click on Safari
      // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#Clicking_and_focus
      allNodes.current[index].focus();

      onManualTabChange(index);
      onChangeTab(index);

      if (child.props.onClick) {
        child.props.onClick(event);
      }
    };

    return cloneElement(child, {
      ref: (node) => {
        allNodes.current[index] = node;
        return node;
      },
      isSelected,
      onClick: handleClick,
      id: `${id}-${index}`,
    });
  });

  return (
    <Flex
      onKeyDown={handleKeyDown}
      ref={ref}
      role="tablist"
      aria-orientation={orientation}
      {...tabListStyleProps}
      {...rest}
    >
      {clones}
    </Flex>
  );
});

TabList.displayName = 'TabList';

export default TabList;
