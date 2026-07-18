import { useTreeItem } from '@tonic-ui/react';

function UseTreeItemExample() {
  const treeItem = useTreeItem();

  if (treeItem) {
    // Properties
    const nodeId = treeItem.nodeId;
    const nodeDepth = treeItem.nodeDepth;
    const isDisabled = treeItem.isDisabled;
    const isExpandable = treeItem.isExpandable;
    const isExpanded = treeItem.isExpanded;
    const isFocused = treeItem.isFocused;
    const isSelected = treeItem.isSelected;

    // Methods
    treeItem.select();
    treeItem.selectRange();
    treeItem.toggleExpansion();
    treeItem.toggleSelection();
  }

  return null;
}
