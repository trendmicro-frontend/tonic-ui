import useTreeView from './useTreeView';

const useTreeNode = (nodeId) => {
  const {
    focusNode,
    getIsNodeDisabled,
    getIsNodeExpandable,
    getIsNodeExpanded,
    getIsNodeFocused,
    getIsNodeSelected,
    isMultiSelectable,
    isSelectable,
    selectNode,
    selectRange,
    toggleNode,
  } = useTreeView();

  const isDisabled = getIsNodeDisabled ? getIsNodeDisabled(nodeId) : false;
  const isExpandable = getIsNodeExpandable ? getIsNodeExpandable(nodeId) : false;
  const isExpanded = getIsNodeExpanded ? getIsNodeExpanded(nodeId) : false;
  const isFocused = getIsNodeFocused ? getIsNodeFocused(nodeId) : false;
  const isSelected = getIsNodeSelected ? getIsNodeSelected(nodeId) : false;

  const focus = () => {
    if (isDisabled) {
      return;
    }

    if (!isFocused) {
      focusNode(nodeId);
    }
  };

  const select = (options) => {
    const {
      isMultiSelection = false, // One of: shiftKey, ctrlKey, metaKey
      isRangeSelection = false, // One of: shiftKey
    } = { ...options };

    if (isDisabled) {
      return;
    }

    if (!isFocused) {
      focusNode(nodeId);
    }

    if (!isSelectable) {
      return;
    }

    if (isMultiSelectable && isMultiSelection) {
      if (isRangeSelection) {
        // When performing a range selection, the `start` parameter is assigned the value of `lastSelectedNode.current`
        const end = nodeId;
        selectRange({ end });
      } else {
        selectNode(nodeId);
      }
    } else {
      selectNode(nodeId);
    }
  };

  const toggle = () => {
    if (isDisabled) {
      return;
    }

    if (!isFocused) {
      focusNode(nodeId);
    }

    if (isExpandable) {
      toggleNode(nodeId);
    }
  };

  return {
    isDisabled,
    isExpandable,
    isExpanded,
    isFocused,
    isSelected,
    focus,
    select,
    toggle,
  };
};

export default useTreeNode;
