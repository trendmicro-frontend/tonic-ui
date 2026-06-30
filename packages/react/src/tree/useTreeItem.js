import { useContext } from 'react';
import { TreeItemContext } from './context';

/**
 * @typedef {Object} TreeItemContextValue
 * @property {React.MutableRefObject<HTMLElement | null>} contentRef - Internal use only. Ref to the tree item content element.
 * @property {boolean} isDisabled - Whether the tree item is disabled.
 * @property {boolean} isExpandable - Whether the tree item is expandable.
 * @property {boolean} isExpanded - Whether the tree item is expanded.
 * @property {boolean} isFocused - Whether the tree item is focused.
 * @property {boolean} isSelected - Whether the tree item is selected.
 * @property {string} nodeId - The id of the tree item node.
 * @property {number} nodeDepth - The depth of the tree item node.
 * @property {() => void} select - Select this tree item.
 * @property {() => void} selectRange - Select a range starting from this tree item.
 * @property {() => void} toggleExpansion - Toggle expansion of this tree item.
 * @property {() => void} toggleSelection - Toggle selection of this tree item.
 */

/**
 * A hook to access the tree item context.
 * @returns {TreeItemContextValue | undefined} The tree item context, or `undefined` if not within a `TreeItem`.
 */
const useTreeItem = () => {
  const context = useContext(TreeItemContext);
  return context;
};

export default useTreeItem;
