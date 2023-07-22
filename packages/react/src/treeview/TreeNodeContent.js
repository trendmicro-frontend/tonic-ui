import { callEventHandlers } from '@tonic-ui/utils';
import React, { forwardRef } from 'react';
import { Box } from '../box';
import TreeNodeToggleIcon from './TreeNodeToggleIcon';
import { useTreeNodeContentStyle } from './styles';
import useTreeNode from './useTreeNode';

const TreeNodeContent = forwardRef((
  {
    label,
    nodeDepth,
    nodeId,
    onClick: onClickProp,
    onMouseDown: onMouseDownProp,
    ...rest
  },
  ref,
) => {
  const {
    isDisabled,
    isExpandable,
    isExpanded,
    isFocused,
    isSelected,
    select,
    toggle,
  } = useTreeNode(nodeId);

  const onClick = (event) => {
    const isMultiSelection = (event.shiftKey || event.ctrlKey || event.metaKey);
    const isRangeSelection = event.shiftKey;

    toggle({ isMultiSelection });

    select({ isMultiSelection, isRangeSelection });
  };

  const onMouseDown = (event) => {
    const isMultiSelection = (event.shiftKey || event.ctrlKey || event.metaKey);

    if (isMultiSelection || isDisabled) {
      // Prevent text selection
      event.preventDefault();
    }
  };

  const styleProps = useTreeNodeContentStyle({ isDisabled, isExpanded, isFocused, isSelected });

  const style = {
    paddingLeft: nodeDepth * 24 + 12,
    paddingRight: 12,
  };

  return (
    <Box
      ref={ref}
      onClick={callEventHandlers(onClickProp, onClick)}
      onMouseDown={callEventHandlers(onMouseDownProp, onMouseDown)}
      {...styleProps}
      {...rest}
      style={style}
    >
      {isExpandable && (
        <TreeNodeToggleIcon nodeId={nodeId} />
      )}
      {label}
    </Box>
  );
});

TreeNodeContent.displayName = 'TreeNodeContent';

export default TreeNodeContent;
