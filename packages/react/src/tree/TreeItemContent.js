import { useMergeRefs } from '@tonic-ui/react-hooks';
import { callEventHandlers } from '@tonic-ui/utils';
import React, { forwardRef, useCallback } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import { useTheme } from '../theme';
import { useTreeItemContentStyle } from './styles';
import useTree from './useTree';
import useTreeItem from './useTreeItem';

const TreeItemContent = forwardRef((inProps, ref) => {
  const {
    onClick: onClickProp,
    onMouseDown: onMouseDownProp,
    style: styleProp,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'TreeItemContent' });
  const { sizes } = useTheme();
  const {
    multiSelect,
  } = useTree();
  const context = useTreeItem();
  const {
    contentRef, // internal use only
    isDisabled,
    isSelected,
    nodeDepth,
    select,
    selectRange,
    toggleSelection,
  } = { ...context };
  const combinedRef = useMergeRefs(contentRef, ref);

  const onClick = useCallback((event) => {
    const isCtrlPressed = event.ctrlKey;
    const isMetaPressed = event.metaKey;
    const isShiftPressed = event.shiftKey;

    if (multiSelect && isShiftPressed) {
      selectRange();
      return;
    }

    if (multiSelect && (isCtrlPressed || isMetaPressed)) {
      toggleSelection();
      return;
    }

    select();
  }, [multiSelect, select, selectRange, toggleSelection]);

  const onMouseDown = useCallback((event) => {
    const isCtrlPressed = event.ctrlKey;
    const isMetaPressed = event.metaKey;
    const isShiftPressed = event.shiftKey;

    if ((isCtrlPressed || isMetaPressed || isShiftPressed) || isDisabled) {
      // Prevent text selection
      event.preventDefault();
    }
  }, [isDisabled]);

  const style = {
    paddingLeft: `calc(${nodeDepth} * ${sizes['6x']} + ${sizes['3x']})`,
    ...styleProp,
  };
  const tabIndex = -1;
  const styleProps = useTreeItemContentStyle({ isDisabled, isSelected, tabIndex });

  return (
    <Box
      ref={combinedRef}
      onClick={callEventHandlers(onClickProp, onClick)}
      onMouseDown={callEventHandlers(onMouseDownProp, onMouseDown)}
      style={style}
      tabIndex={tabIndex}
      {...styleProps}
      {...rest}
    />
  );
});

TreeItemContent.displayName = 'TreeItemContent';

export default TreeItemContent;
