import { callEventHandlers } from '@tonic-ui/utils';
import { ensureArray, ensureBoolean, ensureFunction } from 'ensure-type';
import React, { forwardRef, useCallback, useMemo } from 'react';
import { Box } from '../box';
import { Flex } from '../flex';
import { useTheme } from '../theme';
import TreeNodeToggleIcon from './TreeNodeToggleIcon';
import { useTreeNodeContentStyle } from './styles';
import useTreeView from './useTreeView';
import useTreeNode from './useTreeNode';

const TreeNodeContent = forwardRef((
  {
    nodeDepth,
    nodeId,
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
  const nodeContext = useTreeNode(nodeId);
  const {
    isDisabled,
    isExpandable,
    isSelected,
    select,
    selectRange,
    toggleExpansion,
    toggleSelection,
  } = nodeContext;
  const renderContext = useMemo(() => {
    return {
      ...nodeContext,
      nodeDepth,
      nodeId,
    };
  }, [nodeContext, nodeDepth, nodeId]);

  const onClickNodeContent = useCallback((event) => {
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

  const onClickNodeToggleIcon = useCallback((event) => {
    // Stop event bubbling to prevent the node from being selected
    event.stopPropagation();

    toggleExpansion();
  }, [toggleExpansion]);

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
      _focus: {
        pl: `calc(${nodeDepth} * ${sizes['6x']} + ${sizes['3x']} - ${sizes['1h']})`,
        pr: `calc(${sizes['3x']} - ${sizes['1h']})`,
      },
    },
    ensureArray(sxProp),
  ];

  return (
    <Box
      ref={ref}
      onClick={callEventHandlers(onClickProp, onClickNodeContent)}
      onMouseDown={callEventHandlers(onMouseDownProp, onMouseDown)}
      tabIndex={tabIndex}
      sx={sxProps}
      {...styleProps}
      {...rest}
    >
      <Flex
        flex="none"
        width="6x"
      >
        {ensureBoolean(isExpandable) && (
          <TreeNodeToggleIcon
            nodeId={nodeId}
            onClick={onClickNodeToggleIcon}
          />
        )}
      </Flex>
      {ensureFunction(renderProp)(renderContext)}
    </Box>
  );
});

TreeNodeContent.displayName = 'TreeNodeContent';

export default TreeNodeContent;
