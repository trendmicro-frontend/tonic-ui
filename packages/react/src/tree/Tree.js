import { useConst } from '@tonic-ui/react-hooks';
import { ariaAttr, callEventHandlers, isNullish } from '@tonic-ui/utils';
import { ensureArray } from 'ensure-type';
import memoize from 'micro-memoize';
import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import { Descendant } from '../utils/descendant';
import useAutoId from '../utils/useAutoId';
import { TreeContext } from './context';
import { useTreeStyle } from './styles';

const getMemoizedState = memoize(state => ({ ...state }));

const Tree = forwardRef((inProps, ref) => {
  const {
    defaultExpanded = [],
    defaultSelected = [],
    expanded: expandedProp,
    id: idProp,
    isSelectable = false,
    isUnselectable = false,
    multiSelect = false,
    onBlur: onBlurProp,
    onFocus: onFocusProp,
    onKeyDown: onKeyDownProp,
    onNodeFocus: onNodeFocusProp,
    onNodeSelect: onNodeSelectProp,
    onNodeToggle: onNodeToggleProp,
    selected: selectedProp,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'Tree' });
  const treeId = useAutoId(idProp);
  const [focusedNodeId, setFocusedNodeId] = useState(null);
  const [expandedNodeIds, setExpandedNodeIds] = useState(ensureArray(expandedProp ?? defaultExpanded));
  const [selectedNodeIds, setSelectedNodeIds] = useState(ensureArray(selectedProp ?? defaultSelected));
  const nodeMap = useConst(() => new Map()); // Used to store node data
  const activeDescendant = nodeMap.get(focusedNodeId)
    ? nodeMap.get(focusedNodeId).idAttr
    : null;
  const lastSelectedNode = useRef(null);
  const lastSelectionWasRange = useRef(false);
  const currentRangeSelection = useRef([]);

  useEffect(() => {
    const isControlled = (expandedProp !== undefined);
    if (isControlled) {
      setExpandedNodeIds(ensureArray(expandedProp));
    }
  }, [expandedProp]);

  useEffect(() => {
    const isControlled = (selectedProp !== undefined);
    if (isControlled) {
      setSelectedNodeIds(ensureArray(selectedProp));
    }
  }, [selectedProp]);

  /**
   * Node helpers
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
    return expandedNodeIds.indexOf(id) !== -1;
  }, [expandedNodeIds]);

  const getIsNodeFocused = useCallback((id) => {
    return focusedNodeId === id;
  }, [focusedNodeId]);

  const getIsNodeSelectable = useCallback((id) => {
    return isSelectable && !getIsNodeDisabled(id);
  }, [getIsNodeDisabled, isSelectable]);

  const getIsNodeSelected = useCallback((id) => {
    return selectedNodeIds.indexOf(id) !== -1;
  }, [selectedNodeIds]);

  const getChildNodes = useCallback((id) => {
    return Array.from(nodeMap.values())
      .filter((node) => node.parentId === id)
      .sort((a, b) => a.index - b.index)
      .map((child) => child.id);
  }, [nodeMap]);

  const getNavigableChildNodes = useCallback((id) => {
    const focusableNodes = getChildNodes(id)
      .filter((id) => !getIsNodeDisabled(id));
    return focusableNodes;
  }, [getChildNodes, getIsNodeDisabled]);

  const getNextNode = useCallback((id) => {
    // If expanded get first child
    if (getIsNodeExpanded(id) && getNavigableChildNodes(id).length > 0) {
      return getNavigableChildNodes(id)[0];
    }

    let node = nodeMap.get(id);
    while (!isNullish(node)) {
      // Try to get next sibling
      const siblingIds = getNavigableChildNodes(node.parentId);
      const nextSiblingId = siblingIds[siblingIds.indexOf(node.id) + 1];

      if (nextSiblingId) {
        return nextSiblingId;
      }

      // If the sibling does not exist, go up a level to the parent and try again.
      node = nodeMap.get(node.parentId);
    }

    return null;
  }, [getIsNodeExpanded, getNavigableChildNodes, nodeMap]);

  const getPreviousNode = useCallback((id) => {
    const node = nodeMap.get(id);
    const siblingIds = getNavigableChildNodes(node.parentId);
    const nodeIndex = siblingIds.indexOf(id);

    if (nodeIndex === 0) {
      return node.parentId;
    }

    let currentNodeId = siblingIds[nodeIndex - 1];
    while (getIsNodeExpanded(currentNodeId) && getNavigableChildNodes(currentNodeId).length > 0) {
      currentNodeId = getNavigableChildNodes(currentNodeId).pop();
    }

    return currentNodeId;
  }, [getIsNodeExpanded, getNavigableChildNodes, nodeMap]);

  const getFirstNode = useCallback(() => {
    return getNavigableChildNodes(null)[0];
  }, [getNavigableChildNodes]);

  const getLastNode = useCallback(() => {
    let lastNodeId = getNavigableChildNodes(null).pop();

    while (getIsNodeExpanded(lastNodeId)) {
      const lastChildNodes = getNavigableChildNodes(lastNodeId);

      if (lastChildNodes.length === 0) {
        break;
      }

      lastNodeId = lastChildNodes.pop();
    }

    return lastNodeId;
  }, [getIsNodeExpanded, getNavigableChildNodes]);

  const getParentNode = useCallback((id) => {
    return nodeMap.get(id).parentId;
  }, [nodeMap]);

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
  const findOrderInTremauxTree = useCallback((nodeAId, nodeBId) => {
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
  }, [getChildNodes, nodeMap]);

  const getNodesInRange = useCallback((nodeA, nodeB) => {
    const [first, last] = findOrderInTremauxTree(nodeA, nodeB);
    const nodes = [first];

    let current = first;

    while (current !== last) {
      current = getNextNode(current);
      nodes.push(current);
    }

    return nodes;
  }, [findOrderInTremauxTree, getNextNode]);

  const focusNode = useCallback((id) => {
    if (!id) {
      return;
    }

    setFocusedNodeId(id);

    const node = nodeMap.get(id);
    node.focus();

    if (typeof onNodeFocusProp === 'function') {
      onNodeFocusProp(id);
    }
  }, [nodeMap, onNodeFocusProp]);

  const focusNextNode = useCallback((id) => {
    focusNode(getNextNode(id));
  }, [focusNode, getNextNode]);

  const focusPreviousNode = useCallback((id) => {
    focusNode(getPreviousNode(id));
  }, [focusNode, getPreviousNode]);

  const focusFirstNode = useCallback((id) => {
    focusNode(getFirstNode());
  }, [focusNode, getFirstNode]);

  const focusLastNode = useCallback((id) => {
    focusNode(getLastNode());
  }, [focusNode, getLastNode]);

  /**
   * Toggle the expansion state of a node
   *
   * @param {number|string] id - The id of the node to toggle
   * @param {boolean} [nextValue] - The next value of the node's expansion state
   * @returns {boolean} - Whether the node's expansion state was toggled
   */
  const toggleExpansion = useCallback((id = focusedNodeId, nextValue) => {
    if (!id) {
      return false;
    }

    const isNodeExpandable = getIsNodeExpandable(id);
    if (!isNodeExpandable) {
      return false;
    }

    const willExpand = (typeof nextValue === 'boolean') ? nextValue : !getIsNodeExpanded(id);
    const newExpandedNodes = willExpand
      ? expandedNodeIds.concat(id)
      : expandedNodeIds.filter((expandedNodeId) => expandedNodeId !== id);

    if (typeof onNodeToggleProp === 'function') {
      onNodeToggleProp(newExpandedNodes);
    }

    setExpandedNodeIds(newExpandedNodes);

    return true;
  }, [expandedNodeIds, focusedNodeId, getIsNodeExpandable, getIsNodeExpanded, onNodeToggleProp]);

  /**
   * Toggle the selection state of a node
   *
   * @param {number|string] id - The id of the node to toggle
   * @param {boolean} [nextValue] - The next value of the node's selection state
   * @returns {boolean} - Whether the node's selection state was toggled
   */
  const toggleSelection = useCallback((id, nextValue) => {
    if (!id) {
      return false;
    }

    const isNodeSelectable = getIsNodeSelectable(id);
    if (!isNodeSelectable) {
      return false;
    }

    const willSelect = (typeof nextValue === 'boolean') ? nextValue : !getIsNodeSelected(id);
    const newSelectedNodes = willSelect
      ? selectedNodeIds.concat(id)
      : selectedNodeIds.filter((selectedNodeId) => selectedNodeId !== id);

    if (typeof onNodeSelectProp === 'function') {
      onNodeSelectProp(newSelectedNodes);
    }

    setSelectedNodeIds(newSelectedNodes);

    lastSelectedNode.current = id;
    lastSelectionWasRange.current = false;
    currentRangeSelection.current = [];

    return true;
  }, [getIsNodeSelectable, getIsNodeSelected, onNodeSelectProp, selectedNodeIds]);

  /**
   * Select a node
   *
   * @param {number|string] id - The id of the node to select
   * @returns {boolean} - Whether the node was selected
   */
  const selectNode = useCallback((id) => {
    if (!id) {
      return false;
    }

    const isNodeSelectable = getIsNodeSelectable(id);
    if (!isNodeSelectable) {
      return false;
    }

    const willUnselect = isUnselectable && getIsNodeSelected(id) && (selectedNodeIds.length === 1);
    const newSelectedNodes = willUnselect ? [] : [id];

    if (typeof onNodeSelectProp === 'function') {
      onNodeSelectProp(newSelectedNodes);
    }

    setSelectedNodeIds(newSelectedNodes);

    lastSelectedNode.current = id;
    lastSelectionWasRange.current = false;
    currentRangeSelection.current = [];

    return true;
  }, [getIsNodeSelectable, getIsNodeSelected, isUnselectable, onNodeSelectProp, selectedNodeIds]);

  /**
   * Select a range of nodes
   *
   * @param {number|string} start - The id of the node to start the range from
   * @param {number|string} [current] - The id of the node to continue the range from
   * @param {number|string} end - The id of the node to end the range at
   * @returns {boolean} - Whether the range was selected successfully
   */
  const selectRange = useCallback(({
    start = lastSelectedNode.current,
    current, // optional
    end,
  }) => {
    if (!isSelectable) {
      return false;
    }

    if (isNullish(start) || isNullish(end)) {
      return false;
    }

    if (!isNullish(current)) {
      let newSelectedNodes = selectedNodeIds.slice();

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

      setSelectedNodeIds(newSelectedNodes);
    } else {
      // If last selection was a range selection, ignore nodes that were selected
      const nodes = (lastSelectionWasRange.current)
        ? selectedNodeIds.filter((id) => currentRangeSelection.current.indexOf(id) === -1)
        : selectedNodeIds.slice();

      const nodesInRange = getNodesInRange(start, end)
        .filter((node) => !getIsNodeDisabled(node));

      currentRangeSelection.current = nodesInRange;

      let newSelectedNodes = nodes.concat(nodesInRange);
      newSelectedNodes = newSelectedNodes.filter((id, index) => newSelectedNodes.indexOf(id) === index);

      if (typeof onNodeSelectProp === 'function') {
        onNodeSelectProp(newSelectedNodes);
      }

      setSelectedNodeIds(newSelectedNodes);
    }

    lastSelectionWasRange.current = true;

    return true;
  }, [getIsNodeDisabled, getNodesInRange, isSelectable, onNodeSelectProp, selectedNodeIds]);

  const rangeSelectToFirst = useCallback((id) => {
    if (!lastSelectedNode.current) {
      lastSelectedNode.current = id;
    }

    const start = lastSelectionWasRange.current ? lastSelectedNode.current : id;
    const end = getFirstNode();
    selectRange({ start, end });
  }, [getFirstNode, selectRange]);

  const rangeSelectToLast = useCallback((id) => {
    if (!lastSelectedNode.current) {
      lastSelectedNode.current = id;
    }

    const start = lastSelectionWasRange.current ? lastSelectedNode.current : id;
    const end = getLastNode();

    selectRange({ start, end });
  }, [getLastNode, selectRange]);

  const selectNextNode = useCallback((id) => {
    const nextNode = getNextNode(id);

    if (getIsNodeDisabled(nextNode)) {
      return;
    }

    const start = lastSelectedNode.current;
    const current = id;
    const end = nextNode;
    selectRange({ start, current, end });
  }, [getIsNodeDisabled, getNextNode, selectRange]);

  const selectPreviousNode = useCallback((id) => {
    const previousNode = getPreviousNode(id);

    if (getIsNodeDisabled(previousNode)) {
      return;
    }

    const start = lastSelectedNode.current;
    const current = id;
    const end = previousNode;
    selectRange({ start, current, end });
  }, [getIsNodeDisabled, getPreviousNode, selectRange]);

  const selectAllNodes = useCallback(() => {
    const start = getFirstNode();
    const end = getLastNode();
    selectRange({ start, end });
  }, [getFirstNode, getLastNode, selectRange]);

  /**
   * Mapping helpers
   */

  const registerNode = useCallback((nodeProps) => {
    const { id } = nodeProps;

    // Ensure that nodeProps include the required fields
    const requiredFields = [
      'focus',
      'id',
      'idAttr',
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

  const onFocus = (event) => {
    const receivingFocusTarget = event.target; // The element that will receive focus (if any)
    const losingFocusTarget = event.relatedTarget; // The element that is losing focus (if any)

    if (event.currentTarget !== receivingFocusTarget) {
      // If the event bubbled (which is React specific) we don't want to steal focus
      return;
    }

    if (event.currentTarget.contains(losingFocusTarget)) {
      // If the focus is within the tree, don't steal focus
      return;
    }

    const firstSelectedNode = selectedNodeIds[0];
    if (firstSelectedNode) {
      focusNode(firstSelectedNode);
    } else {
      focusFirstNode();
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
        if (multiSelect && isShiftPressed) {
          const start = lastSelectedNode.current;
          const end = focusedNodeId;
          selectRange({ start, end });
          flag = true;
        } else if (multiSelect) {
          flag = toggleSelection(focusedNodeId);
        } else {
          flag = selectNode(focusedNodeId);
        }
      }
      event.stopPropagation();
      break;

    case 'Enter':
      if (!getIsNodeDisabled(focusedNodeId)) {
        if (getIsNodeExpandable(focusedNodeId)) {
          toggleExpansion(focusedNodeId);
          flag = true;
        } else if (multiSelect) {
          flag = toggleSelection(focusedNodeId);
        } else {
          flag = selectNode(focusedNodeId);
        }
      }
      event.stopPropagation();
      break;

    case 'ArrowDown':
      if (multiSelect && isShiftPressed) {
        selectNextNode(focusedNodeId);
      }
      focusNextNode(focusedNodeId);
      flag = true;
      break;

    case 'ArrowUp':
      if (multiSelect && isShiftPressed) {
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
          toggleExpansion(focusedNodeId);
          flag = true;
        }
      }
      break;

    case 'ArrowLeft':
      if (getIsNodeExpanded(focusedNodeId) && !getIsNodeDisabled(focusedNodeId)) {
        toggleExpansion(focusedNodeId);
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
      if (multiSelect && isCtrlPressed && isShiftPressed && !getIsNodeDisabled(focusedNodeId)) {
        rangeSelectToFirst(focusedNodeId);
      }
      focusFirstNode();
      flag = true;
      break;

    case 'End':
      if (multiSelect && isCtrlPressed && isShiftPressed && !getIsNodeDisabled(focusedNodeId)) {
        rangeSelectToLast(focusedNodeId);
      }
      focusLastNode();
      flag = true;
      break;

    default:
      if (multiSelect && isCtrlPressed && key.toLowerCase() === 'a') {
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
    getIsNodeSelectable,
    getIsNodeSelected,
    isSelectable,
    multiSelect,
    nodeMap,
    registerNode,
    selectNode,
    selectRange,
    toggleExpansion,
    toggleSelection,
    treeId,
    unregisterNode,
  });
  const tabIndex = 0;
  const styleProps = useTreeStyle();

  return (
    <TreeContext.Provider value={context}>
      <Descendant depth={-1}>
        <Box
          ref={ref}
          aria-activedescendant={activeDescendant}
          aria-multiselectable={ariaAttr(multiSelect)}
          id={treeId}
          role="tree"
          onBlur={callEventHandlers(onBlurProp, onBlur)}
          onFocus={callEventHandlers(onFocusProp, onFocus)}
          onKeyDown={callEventHandlers(onKeyDownProp, onKeyDown)}
          tabIndex={tabIndex}
          {...styleProps}
          {...rest}
        />
      </Descendant>
    </TreeContext.Provider>
  );
});

Tree.displayName = 'Tree';

export default Tree;
