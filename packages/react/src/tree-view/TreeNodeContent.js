import { callEventHandlers } from '@tonic-ui/utils';
import { ensureArray, ensureFunction } from 'ensure-type';
import React, { forwardRef, useCallback } from 'react';
import { Box } from '../box';
import { useTheme } from '../theme';
import { useTreeNodeContentStyle } from './styles';
import useTreeView from './useTreeView';
import useTreeNode from './useTreeNode';

const TreeNodeContent = forwardRef((
  {
    onClick: onClickProp,
    onMouseDown: onMouseDownProp,
    render: renderProp,
    sx: sxProp,
    ...rest
  },
  ref,
) => {
  const { sizes } = useTheme();
  const {
    multiSelect,
  } = useTreeView();
  const context = useTreeNode();
  const {
    isDisabled,
    isSelected,
    nodeDepth,
    select,
    selectRange,
    toggleSelection,
  } = { ...context };

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

  const tabIndex = -1;
  const styleProps = useTreeNodeContentStyle({ isDisabled, isSelected, tabIndex });
  const sxProps = [
    {
      pl: `calc(${nodeDepth} * ${sizes['6x']} + ${sizes['3x']})`,
      pr: `calc(${sizes['3x']})`,
      ':focus-visible': {
        borderStyle: 'solid',
        borderWidth: '1h',
        pl: `calc(${nodeDepth} * ${sizes['6x']} + ${sizes['3x']} - ${sizes['1h']})`,
        pr: `calc(${sizes['3x']} - ${sizes['1h']})`,
        py: `calc(${sizes['2x']} - ${sizes['1h']})`,
      },
    },
    ...ensureArray(sxProp),
  ];

  return (
    <Box
      ref={ref}
      onClick={callEventHandlers(onClickProp, onClick)}
      onMouseDown={callEventHandlers(onMouseDownProp, onMouseDown)}
      tabIndex={tabIndex}
      sx={sxProps}
      {...styleProps}
      {...rest}
    >
      {ensureFunction(renderProp)(context)}
    </Box>
  );
});

TreeNodeContent.displayName = 'TreeNodeContent';

export default TreeNodeContent;
