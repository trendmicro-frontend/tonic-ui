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
    selectNode,
    selectNodesInRange,
    toggleNode,
  } = useTreeView();

  const isDisabled = getIsNodeDisabled ? getIsNodeDisabled(nodeId) : false;
  const isExpandable = getIsNodeExpandable ? getIsNodeExpandable(nodeId) : false;
  const isExpanded = getIsNodeExpanded ? getIsNodeExpanded(nodeId) : false;
  const isFocused = getIsNodeFocused ? getIsNodeFocused(nodeId) : false;
  const isSelected = getIsNodeSelected ? getIsNodeSelected(nodeId) : false;

  const select = ({ isMultiSelection, isRangeSelection }) => {
    if (isDisabled) {
      return;
    }

    if (!isFocused) {
      focusNode(nodeId);
    }

    if (isMultiSelectable && isMultiSelection) {
      if (isRangeSelection) {
        selectNodesInRange({ end: nodeId });
      } else {
        selectNode(nodeId, true);
      }
    } else {
      selectNode(nodeId);
    }
  };

  const toggle = ({ isMultiSelection }) => {
    if (isDisabled) {
      return;
    }

    if (!isFocused) {
      focusNode(nodeId);
    }

    // If already expanded and trying to toggle selection don't close
    if (isExpandable && !(isMultiSelectable && isMultiSelection && isExpanded)) {
      toggleNode(nodeId);
    }
  };

  return {
    isDisabled,
    isExpandable,
    isExpanded,
    isFocused,
    isSelected,
    select,
    toggle,
  };
};

export default useTreeNode;
