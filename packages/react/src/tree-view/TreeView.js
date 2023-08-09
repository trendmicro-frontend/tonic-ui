import { useConst } from '@tonic-ui/react-hooks';
import { ariaAttr, callEventHandlers, isNullish } from '@tonic-ui/utils';
import { ensureArray } from 'ensure-type';
import memoize from 'micro-memoize';
import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { Box } from '../box';
import { Descendant } from '../utils/descendant';
import useAutoId from '../utils/useAutoId';
import { TreeViewContext } from './context';
import { useTreeViewStyle } from './styles';

const getMemoizedState = memoize(state => ({ ...state }));

const TreeView = forwardRef((
  {
    defaultExpandedNodes = [],
    defaultSelectedNodes = [],
    expandedNodes: expandedNodesProp,
    id: idProp,
    isSelectable = false,
    isMultiSelectable = false,
    onBlur: onBlurProp,
    onKeyDown: onKeyDownProp,
    onNodeFocus: onNodeFocusProp,
    onNodeSelect: onNodeSelectProp,
    onNodeToggle: onNodeToggleProp,
    selectedNodes: selectedNodesProp,
    ...rest
  },
  ref,
) => {
  const treeId = useAutoId(idProp);
  const nodeMap = useConst(() => new Map()); // Used to store node data
  const [focusedNodeId, setFocusedNodeId] = useState(null);
  const activeDescendant = nodeMap.get(focusedNodeId)
    ? nodeMap.get(focusedNodeId).idAttribute
    : null;
  const [expandedNodes, setExpandedNodes] = useState(ensureArray(expandedNodesProp ?? defaultExpandedNodes));
  const [selectedNodes, setSelectedNodes] = useState(ensureArray(selectedNodesProp ?? defaultSelectedNodes));

  useEffect(() => {
    const isControlled = (expandedNodesProp !== undefined);
    if (isControlled) {
      setExpandedNodes(ensureArray(expandedNodesProp));
    }
  }, [expandedNodesProp]);

  useEffect(() => {
    const isControlled = (selectedNodesProp !== undefined);
    if (isControlled) {
      setSelectedNodes(ensureArray(selectedNodesProp));
    }
  }, [selectedNodesProp]);

  /**
   * Node state helpers
   */

  const getIsNodeDisabled = useCallback((id) => {
    let node = nodeMap.get(id);

    if (!node) {
      return false;
    }

    if (node.isDisabled) {
      return true;
    }

    while (!isNullish(node.parentId)) {
      node = nodeMap.get(node.parentId);
      if (node.isDisabled) {
        return true;
      }
    }

    return false;
  }, [nodeMap]);

  const getIsNodeExpandable = useCallback((id) => {
    return !!nodeMap.get(id)?.isExpandable;
  }, [nodeMap]);

  const getIsNodeExpanded = useCallback((id) => {
    return expandedNodes.indexOf(id) !== -1;
  }, [expandedNodes]);

  const getIsNodeFocused = useCallback((id) => {
    return focusedNodeId === id;
  }, [focusedNodeId]);

  const getIsNodeSelected = useCallback((id) => {
    return selectedNodes.indexOf(id) !== -1;
  }, [selectedNodes]);

  /**
   * Node helpers
   */

  const getChildNodes = useCallback((id) => {
    return Array.from(nodeMap.values())
      .filter((node) => node.parentId === id)
      .sort((a, b) => a.index - b.index)
      .map((child) => child.id);
  }, [nodeMap]);

  const getFocusableNodes = (id) => {
    const focusableNodes = getChildNodes(id)
      .filter((id) => !getIsNodeDisabled(id));
    return focusableNodes;
  };

  const getNextNode = (id) => {
    // If expanded get first child
    if (getIsNodeExpanded(id) && getFocusableNodes(id).length > 0) {
      return getFocusableNodes(id)[0];
    }

    let node = nodeMap.get(id);
    while (!isNullish(node)) {
      // Try to get next sibling
      const siblingIds = getFocusableNodes(node.parentId);
      const nextSiblingId = siblingIds[siblingIds.indexOf(node.id) + 1];

      if (nextSiblingId) {
        return nextSiblingId;
      }

      // If the sibling does not exist, go up a level to the parent and try again.
      node = nodeMap.get(node.parentId);
    }

    return null;
  };

  const getPreviousNode = (id) => {
    const node = nodeMap.get(id);
    const siblingIds = getFocusableNodes(node.parentId);
    const nodeIndex = siblingIds.indexOf(id);

    if (nodeIndex === 0) {
      return node.parentId;
    }

    let currentNodeId = siblingIds[nodeIndex - 1];
    while (getIsNodeExpanded(currentNodeId) && getFocusableNodes(currentNodeId).length > 0) {
      currentNodeId = getFocusableNodes(currentNodeId).pop();
    }

    return currentNodeId;
  };

  const getFirstNode = () => getFocusableNodes(null)[0];

  const getLastNode = () => {
    let lastNodeId = getFocusableNodes(null).pop();

    while (getIsNodeExpanded(lastNodeId)) {
      lastNodeId = getFocusableNodes(lastNodeId).pop();
    }
    return lastNodeId;
  };

  const getParentNode = (id) => nodeMap.get(id).parentId;

  /**
   * This is used to determine the start and end of a selection range so we can get the nodes between the two border nodes.
   *
   * It finds the nodes' common ancestor using a naive implementation of a lowest common ancestor algorithm.
   * (https://en.wikipedia.org/wiki/Lowest_common_ancestor)
   *
   * Then compares the ancestor's 2 children that are ancestors of nodeA and NodeB, so we can compare their indexes
   * to work out which node comes first in a depth first search.
   * (https://en.wikipedia.org/wiki/Depth-first_search)
   *
   * Another way to put it is which node is shallower in a trémaux tree
   * https://en.wikipedia.org/wiki/Tr%C3%A9maux_tree
   */
  const findOrderInTremauxTree = (nodeAId, nodeBId) => {
    if (nodeAId === nodeBId) {
      return [nodeAId, nodeBId];
    }

    const nodeA = nodeMap.get(nodeAId);
    const nodeB = nodeMap.get(nodeBId);

    if (nodeA.parentId === nodeB.id || nodeB.parentId === nodeA.id) {
      return nodeB.parentId === nodeA.id ? [nodeA.id, nodeB.id] : [nodeB.id, nodeA.id];
    }

    const aFamily = [nodeA.id];
    const bFamily = [nodeB.id];

    let aAncestor = nodeA.parentId;
    let bAncestor = nodeB.parentId;

    let aAncestorIsCommon = bFamily.indexOf(aAncestor) !== -1;
    let bAncestorIsCommon = aFamily.indexOf(bAncestor) !== -1;

    let continueA = true;
    let continueB = true;

    while (!bAncestorIsCommon && !aAncestorIsCommon) {
      if (continueA) {
        aFamily.push(aAncestor);
        aAncestorIsCommon = bFamily.indexOf(aAncestor) !== -1;
        continueA = aAncestor !== null;
        if (!aAncestorIsCommon && continueA) {
          aAncestor = nodeMap.get(aAncestor).parentId;
        }
      }

      if (continueB && !aAncestorIsCommon) {
        bFamily.push(bAncestor);
        bAncestorIsCommon = aFamily.indexOf(bAncestor) !== -1;
        continueB = bAncestor !== null;
        if (!bAncestorIsCommon && continueB) {
          bAncestor = nodeMap.get(bAncestor).parentId;
        }
      }
    }

    const commonAncestor = aAncestorIsCommon ? aAncestor : bAncestor;
    const ancestorFamily = getChildNodes(commonAncestor);

    const aSide = aFamily[aFamily.indexOf(commonAncestor) - 1];
    const bSide = bFamily[bFamily.indexOf(commonAncestor) - 1];

    return ancestorFamily.indexOf(aSide) < ancestorFamily.indexOf(bSide)
      ? [nodeAId, nodeBId]
      : [nodeBId, nodeAId];
  };

  const getNodesInRange = (nodeA, nodeB) => {
    const [first, last] = findOrderInTremauxTree(nodeA, nodeB);
    const nodes = [first];

    let current = first;

    while (current !== last) {
      current = getNextNode(current);
      nodes.push(current);
    }

    return nodes;
  };

  /**
   * Focus Helpers
   */

  const focusNode = (id) => {
    if (!id) {
      return;
    }

    setFocusedNodeId(id);

    const node = nodeMap.get(id);
    node.focus();

    if (typeof onNodeFocusProp === 'function') {
      onNodeFocusProp(id);
    }
  };

  const focusNextNode = (id) => focusNode(getNextNode(id));

  const focusPreviousNode = (id) => focusNode(getPreviousNode(id));

  const focusFirstNode = (id) => focusNode(getFirstNode());

  const focusLastNode = (id) => focusNode(getLastNode());

  /**
   * Toggle Helpers
   */

  const toggleNode = (id = focusedNodeId) => {
    const newExpandedNodes = (expandedNodes.indexOf(id) !== -1)
      ? expandedNodes.filter((expandedNodeId) => expandedNodeId !== id)
      : [id].concat(expandedNodes);

    if (typeof onNodeToggleProp === 'function') {
      onNodeToggleProp(newExpandedNodes);
    }

    setExpandedNodes(newExpandedNodes);
  };

  /**
   * Selection Helpers
   */

  const lastSelectedNode = useRef(null);
  const lastSelectionWasRange = useRef(false);
  const currentRangeSelection = useRef([]);

  /**
   * Select a node or multiple nodes
   *
   * @param {number|string] id - The id of the node to select
   * @returns {boolean} - Whether the node was selected
   */
  const selectNode = (id) => {
    if (!isSelectable) {
      return false;
    }

    if (!id) {
      return false;
    }

    if (isMultiSelectable) {
      // Multiple selection
      const newSelectedNodes = (selectedNodes.indexOf(id) === -1)
        ? selectedNodes.concat(id)
        : selectedNodes.filter((selectedNodeId) => selectedNodeId !== id);

      if (typeof onNodeSelectProp === 'function') {
        onNodeSelectProp(newSelectedNodes);
      }

      setSelectedNodes(newSelectedNodes);
    } else {
      // Single selection
      const newSelectedNodes = [id];

      if (typeof onNodeSelectProp === 'function') {
        onNodeSelectProp(newSelectedNodes);
      }

      setSelectedNodes(newSelectedNodes);
    }

    lastSelectedNode.current = id;
    lastSelectionWasRange.current = false;
    currentRangeSelection.current = [];

    return true;
  };

  /**
   * Select a range of nodes
   *
   * @param {number|string} start - The id of the node to start the range from
   * @param {number|string} [current] - The id of the node to continue the range from
   * @param {number|string} end - The id of the node to end the range at
   * @returns {boolean} - Whether the range was selected successfully
   */
  const selectRange = ({
    start = lastSelectedNode.current,
    current, // optional
    end,
  }) => {
    if (!isSelectable || !isMultiSelectable) {
      return false;
    }

    if (isNullish(start) || isNullish(end)) {
      return false;
    }

    if (!isNullish(current)) {
      let newSelectedNodes = selectedNodes.slice();

      if (currentRangeSelection.current.indexOf(current) === -1) {
        currentRangeSelection.current = [];
      }

      if (lastSelectionWasRange.current) {
        if (currentRangeSelection.current.indexOf(end) !== -1) {
          newSelectedNodes = newSelectedNodes.filter((id) => id === start || id !== current);
          currentRangeSelection.current = currentRangeSelection.current.filter((id) => {
            return id === start || id !== current;
          });
        } else {
          newSelectedNodes.push(end);
          currentRangeSelection.current.push(end);
        }
      } else {
        newSelectedNodes.push(end);
        currentRangeSelection.current.push(current, end);
      }

      if (typeof onNodeSelectProp === 'function') {
        onNodeSelectProp(newSelectedNodes);
      }

      setSelectedNodes(newSelectedNodes);
    } else {
      // If last selection was a range selection, ignore nodes that were selected
      const nodes = (lastSelectionWasRange.current)
        ? selectedNodes.filter((id) => currentRangeSelection.current.indexOf(id) === -1)
        : selectedNodes.slice();

      const nodesInRange = getNodesInRange(start, end)
        .filter((node) => !getIsNodeDisabled(node));

      currentRangeSelection.current = nodesInRange;

      let newSelectedNodes = nodes.concat(nodesInRange);
      newSelectedNodes = newSelectedNodes.filter((id, index) => newSelectedNodes.indexOf(id) === index);

      if (typeof onNodeSelectProp === 'function') {
        onNodeSelectProp(newSelectedNodes);
      }

      setSelectedNodes(newSelectedNodes);
    }

    lastSelectionWasRange.current = true;

    return true;
  };

  const rangeSelectToFirst = (id) => {
    if (!lastSelectedNode.current) {
      lastSelectedNode.current = id;
    }

    const start = lastSelectionWasRange.current ? lastSelectedNode.current : id;
    const end = getFirstNode();
    selectRange({ start, end });
  };

  const rangeSelectToLast = (id) => {
    if (!lastSelectedNode.current) {
      lastSelectedNode.current = id;
    }

    const start = lastSelectionWasRange.current ? lastSelectedNode.current : id;
    const end = getLastNode();
    selectRange({ start, end });
  };

  const selectNextNode = (id) => {
    const nextNode = getNextNode(id);

    if (getIsNodeDisabled(nextNode)) {
      return;
    }

    const start = lastSelectedNode.current;
    const current = id;
    const end = nextNode;
    selectRange({ start, current, end });
  };

  const selectPreviousNode = (id) => {
    const previousNode = getPreviousNode(id);

    if (getIsNodeDisabled(previousNode)) {
      return;
    }

    const start = lastSelectedNode.current;
    const current = id;
    const end = previousNode;
    selectRange({ start, current, end });
  };

  const selectAllNodes = () => {
    const start = getFirstNode();
    const end = getLastNode();
    selectRange({ start, end });
  };

  /**
   * Mapping Helpers
   */

  const registerNode = useCallback((nodeProps) => {
    const { id } = nodeProps;

    // Ensure that nodeProps include the required fields
    const requiredFields = [
      'focus',
      'id',
      'idAttribute',
      'isDisabled',
      'isExpandable',
      'parentId',
    ];
    const pass = requiredFields.every(field => {
      return Object.prototype.hasOwnProperty.call(nodeProps, field);
    });

    if (!pass) {
      console.error('Error: `nodeProps` is missing some required fields.', nodeProps);
      // bypass
    }

    nodeMap.set(id, nodeProps);

    return id;
  }, [nodeMap]);

  const unregisterNode = useCallback((id) => {
    nodeMap.delete(id);
  }, [nodeMap]);

  /**
   * Event handlers
   */

  const onBlur = (event) => {
    const receivingFocusTarget = event.relatedTarget; // The element that will receive focus (if any)
    const isFocusWithin = event.currentTarget &&
      event.currentTarget.contains(receivingFocusTarget);

    if (!isFocusWithin) {
      // Clear the `focusedNodeId` since focus is moving outside the current target
      setFocusedNodeId(null);
    }
  };

  const onKeyDown = (event) => {
    let flag = false;
    const key = event.key;

    // If the tree is empty there will be no focused node
    if (event.altKey || !focusedNodeId) {
      return;
    }

    const isCtrlPressed = event.ctrlKey || event.metaKey;
    const isShiftPressed = event.shiftKey;

    switch (key) {
    case ' ':
      if (!getIsNodeDisabled(focusedNodeId)) {
        if (isMultiSelectable && isShiftPressed) {
          const start = lastSelectedNode.current;
          const end = focusedNodeId;
          selectRange({ start, end });
          flag = true;
        } else {
          flag = selectNode(focusedNodeId);
        }
      }
      event.stopPropagation();
      break;

    case 'Enter':
      if (!getIsNodeDisabled(focusedNodeId)) {
        if (getIsNodeExpandable(focusedNodeId)) {
          toggleNode(focusedNodeId);
          flag = true;
        } else {
          flag = selectNode(focusedNodeId);
        }
      }
      event.stopPropagation();
      break;

    case 'ArrowDown':
      if (isMultiSelectable && isShiftPressed) {
        selectNextNode(focusedNodeId);
      }
      focusNextNode(focusedNodeId);
      flag = true;
      break;

    case 'ArrowUp':
      if (isMultiSelectable && isShiftPressed) {
        selectPreviousNode(focusedNodeId);
      }
      focusPreviousNode(focusedNodeId);
      flag = true;
      break;

    case 'ArrowRight':
      if (getIsNodeExpandable(focusedNodeId)) {
        if (getIsNodeExpanded(focusedNodeId)) {
          focusNextNode(focusedNodeId);
          flag = true;
        } else if (!getIsNodeDisabled(focusedNodeId)) {
          toggleNode(focusedNodeId);
          flag = true;
        }
      }
      break;

    case 'ArrowLeft':
      if (getIsNodeExpanded(focusedNodeId) && !getIsNodeDisabled(focusedNodeId)) {
        toggleNode(focusedNodeId);
        flag = true;
      } else {
        const parentNode = getParentNode(focusedNodeId);
        if (parentNode) {
          focusNode(parentNode);
          flag = true;
        }
      }
      break;

    case 'Home':
      if (isMultiSelectable && isCtrlPressed && isShiftPressed && !getIsNodeDisabled(focusedNodeId)) {
        rangeSelectToFirst(focusedNodeId);
      }
      focusFirstNode();
      flag = true;
      break;

    case 'End':
      if (isMultiSelectable && isCtrlPressed && isShiftPressed && !getIsNodeDisabled(focusedNodeId)) {
        rangeSelectToLast(focusedNodeId);
      }
      focusLastNode();
      flag = true;
      break;

    default:
      if (isMultiSelectable && isCtrlPressed && key.toLowerCase() === 'a') {
        selectAllNodes();
        flag = true;
      }
      break;
    }

    if (flag) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  /**
   * Context
   */

  const context = getMemoizedState({
    focusNode,
    getIsNodeDisabled,
    getIsNodeExpandable,
    getIsNodeExpanded,
    getIsNodeFocused,
    getIsNodeSelected,
    isSelectable,
    isMultiSelectable,
    nodeMap,
    registerNode,
    selectNode,
    selectRange,
    toggleNode,
    treeId,
    unregisterNode,
  });
  const styleProps = useTreeViewStyle();

  return (
    <TreeViewContext.Provider value={context}>
      <Descendant depth={-1}>
        <Box
          ref={ref}
          aria-activedescendant={activeDescendant}
          aria-multiselectable={ariaAttr(isMultiSelectable)}
          id={treeId}
          role="tree"
          onBlur={callEventHandlers(onBlurProp, onBlur)}
          onKeyDown={callEventHandlers(onKeyDownProp, onKeyDown)}
          {...styleProps}
          {...rest}
        />
      </Descendant>
    </TreeViewContext.Provider>
  );
});

TreeView.displayName = 'TreeView';

export default TreeView;
