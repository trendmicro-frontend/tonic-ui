import memoize from 'micro-memoize';
import { useCallback } from 'react';
import useTreeView from './useTreeView';

const getMemoizedState = memoize(state => ({ ...state }));

const useTreeNode = (nodeId) => {
  const {
    focusNode,
    getIsNodeDisabled,
    getIsNodeExpandable,
    getIsNodeExpanded,
    getIsNodeFocused,
    getIsNodeSelected,
    selectNode,
    selectRange,
    toggleSelection,
    toggleExpansion,
  } = useTreeView();

  const isDisabled = getIsNodeDisabled ? getIsNodeDisabled(nodeId) : false;
  const isExpandable = getIsNodeExpandable ? getIsNodeExpandable(nodeId) : false;
  const isExpanded = getIsNodeExpanded ? getIsNodeExpanded(nodeId) : false;
  const isFocused = getIsNodeFocused ? getIsNodeFocused(nodeId) : false;
  const isSelected = getIsNodeSelected ? getIsNodeSelected(nodeId) : false;

  const selectHandler = useCallback(() => {
    if (isDisabled) {
      return;
    }

    if (!isFocused) {
      focusNode(nodeId);
    }

    selectNode(nodeId);
  }, [nodeId, isDisabled, isFocused, focusNode, selectNode]);

  const selectRangeHandler = useCallback(() => {
    if (isDisabled) {
      return;
    }

    if (!isFocused) {
      focusNode(nodeId);
    }

    // When performing a range selection, the `start` parameter is assigned the value of `lastSelectedNode.current`
    const end = nodeId;
    selectRange({ end });
  }, [nodeId, isDisabled, isFocused, focusNode, selectRange]);

  const toggleExpansionHandler = useCallback(() => {
    if (isDisabled) {
      return;
    }

    if (!isFocused) {
      focusNode(nodeId);
    }

    toggleExpansion(nodeId);
  }, [nodeId, isDisabled, isFocused, focusNode, toggleExpansion]);

  const toggleSelectionHandler = useCallback(() => {
    if (isDisabled) {
      return;
    }

    if (!isFocused) {
      focusNode(nodeId);
    }

    toggleSelection(nodeId);
  }, [nodeId, isDisabled, isFocused, focusNode, toggleSelection]);

  const context = getMemoizedState({
    isDisabled,
    isExpandable,
    isExpanded,
    isFocused,
    isSelected,
    select: selectHandler,
    selectRange: selectRangeHandler,
    toggleExpansion: toggleExpansionHandler,
    toggleSelection: toggleSelectionHandler,
  });

  return context;
};

export default useTreeNode;
