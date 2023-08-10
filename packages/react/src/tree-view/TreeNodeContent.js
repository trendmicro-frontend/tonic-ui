import { callEventHandlers } from '@tonic-ui/utils';
import { ensureArray, ensureBoolean, ensureFunction } from 'ensure-type';
import React, { forwardRef, useCallback, useMemo } from 'react';
import { Box } from '../box';
import { Flex } from '../flex';
import { useTheme } from '../theme';
import TreeNodeToggleIcon from './TreeNodeToggleIcon';
import { useTreeNodeContentStyle } from './styles';
import useTreeNode from './useTreeNode';

const TreeNodeContent = forwardRef((
  {
    nodeDepth,
    nodeId,
    onClick: onClickProp,
    onFocus: onFocusProp,
    onMouseDown: onMouseDownProp,
    render: renderProp,
    sx: sxProp,
    ...rest
  },
  ref,
) => {
  const { sizes } = useTheme();
  const nodeContext = useTreeNode(nodeId);
  const {
    isDisabled,
    isExpandable,
    isSelected,
    focus,
    select,
    toggle,
  } = nodeContext;
  const renderContext = useMemo(() => {
    return {
      ...nodeContext,
      nodeDepth,
      nodeId,
    };
  }, [nodeContext, nodeDepth, nodeId]);

  const onClickNodeContent = useCallback((event) => {
    const isMultiSelection = (event.shiftKey || event.ctrlKey || event.metaKey);
    const isRangeSelection = event.shiftKey;
    select({ isMultiSelection, isRangeSelection });
  }, [select]);

  const onClickNodeToggleIcon = useCallback((event) => {
    // Stop event bubbling to prevent the node from being selected
    event.stopPropagation();

    toggle();
  }, [toggle]);

  const onFocus = useCallback((event) => {
    const receivingFocusTarget = event.target; // The element that is receiving focus

    if (event.currentTarget !== receivingFocusTarget) {
      // If the event is bubbling, do nothing, focus only when directly triggered on the current element
      return;
    }

    // Call `focus` to update the `focusedNodeId` in TreeView
    focus();
  }, [focus]);

  const onMouseDown = useCallback((event) => {
    const isMultiSelection = (event.shiftKey || event.ctrlKey || event.metaKey);

    if (isMultiSelection || isDisabled) {
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
      onFocus={callEventHandlers(onFocusProp, onFocus)}
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
