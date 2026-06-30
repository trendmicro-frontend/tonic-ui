import { useTree } from '@tonic-ui/react';

function UseTreeExample() {
  const tree = useTree();

  if (tree) {
    // Properties
    const isSelectable = tree.isSelectable;
    const multiSelect = tree.multiSelect;
    const treeId = tree.treeId;

    // Query methods
    const isDisabled = tree.getIsNodeDisabled('node-1');
    const isExpandable = tree.getIsNodeExpandable('node-1');
    const isExpanded = tree.getIsNodeExpanded('node-1');
    const isFocused = tree.getIsNodeFocused('node-1');
    const isNodeSelectable = tree.getIsNodeSelectable('node-1');
    const isSelected = tree.getIsNodeSelected('node-1');

    // Action methods
    tree.focusNode('node-1');
    tree.selectNode('node-1');
    tree.selectRange('node-1');
    tree.toggleExpansion('node-1');
    tree.toggleSelection('node-1');
    tree.registerNode({ id: 'node-1', parentId: null });
    tree.unregisterNode('node-1');
  }

  return null;
}
