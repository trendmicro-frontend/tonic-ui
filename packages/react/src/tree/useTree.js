import { useContext } from 'react';
import { TreeContext } from './context';

/**
 * @typedef {Object} TreeContextValue
 * @property {(nodeId: string) => void} focusNode - Focus a node by id.
 * @property {(nodeId: string) => boolean} getIsNodeDisabled - Check if a node is disabled.
 * @property {(nodeId: string) => boolean} getIsNodeExpandable - Check if a node is expandable.
 * @property {(nodeId: string) => boolean} getIsNodeExpanded - Check if a node is expanded.
 * @property {(nodeId: string) => boolean} getIsNodeFocused - Check if a node is focused.
 * @property {(nodeId: string) => boolean} getIsNodeSelectable - Check if a node is selectable.
 * @property {(nodeId: string) => boolean} getIsNodeSelected - Check if a node is selected.
 * @property {boolean} isSelectable - Whether tree nodes are selectable.
 * @property {boolean} multiSelect - Whether multiple nodes can be selected.
 * @property {React.MutableRefObject<Map<string, { id: string; parentId: string | null }>>} nodeMap - Map of registered nodes.
 * @property {(node: { id: string; parentId: string | null }) => void} registerNode - Register a node.
 * @property {(nodeId: string) => void} selectNode - Select a node.
 * @property {(nodeId: string) => void} selectRange - Select a range of nodes.
 * @property {(nodeId: string) => void} toggleExpansion - Toggle expansion of a node.
 * @property {(nodeId: string) => void} toggleSelection - Toggle selection of a node.
 * @property {string} treeId - The id of the tree.
 * @property {(nodeId: string) => void} unregisterNode - Unregister a node.
 */

/**
 * A hook to access the tree context.
 * @returns {TreeContextValue | undefined} The tree context, or `undefined` if not within a `Tree`.
 */
const useTree = () => {
  if (!useContext) {
    throw new Error('The `useContext` hook is not available with your React version.');
  }

  const context = useContext(TreeContext);
  return context;
};

export default useTree;
