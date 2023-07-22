/**
 * @ref: https://github.com/mui/material-ui/blob/master/packages/mui-lab/src/TreeItem/TreeItem.js
 */
import { useMergeRefs } from '@tonic-ui/react-hooks';
import { ariaAttr, getOwnerDocument, isNullish } from '@tonic-ui/utils';
import { ensureNumber } from 'ensure-type';
import React, { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Box } from '../box';
import { Collapse } from '../transitions';
import { Descendant, useDescendant } from '../utils/descendant';
import TreeNodeContent from './TreeNodeContent';
import { useTreeNodeStyle } from './styles';
import useTreeView from './useTreeView';

const TreeNode = forwardRef((
  {
    ContentComponent = TreeNodeContent,
    ContentProps,
    TransitionComponent = Collapse,
    TransitionProps,
    children,
    disabled: disabledProp,
    id: idProp,
    label,
    nodeId,
    onClick,
    onMouseDown,
    ...rest
  },
  ref,
) => {
  const {
    firstCharMap,
    focusNode,
    getIsNodeDisabled,
    getIsNodeExpanded,
    getIsNodeFocused,
    getIsNodeSelected,
    registerNode,
    treeId,
    unregisterNode,
  } = useTreeView();

  const id = useMemo(() => {
    if (!isNullish(idProp)) {
      return idProp;
    }

    if (treeId && nodeId) {
      return `${treeId}-${nodeId}`;
    }

    return null;
  }, [idProp, treeId, nodeId]);

  const contentRef = useRef();
  const [element, setElement] = useState(null);
  const combinedRef = useMergeRefs(setElement, ref);

  const { index, parentDepth, parentId } = useDescendant(element);
  const nodeDepth = ensureNumber(parentDepth) + 1;

  const isDisabled = getIsNodeDisabled ? getIsNodeDisabled(nodeId) : false;
  const isExpandable = Boolean(Array.isArray(children) ? children.length : children);
  const isExpanded = getIsNodeExpanded ? getIsNodeExpanded(nodeId) : false;
  const isFocused = getIsNodeFocused ? getIsNodeFocused(nodeId) : false;
  const isSelected = getIsNodeSelected ? getIsNodeSelected(nodeId) : false;

  useEffect(() => {
    if (typeof registerNode === 'function' && typeof unregisterNode === 'function' && index !== -1) {
      registerNode({
        id: nodeId,
        idAttribute: id,
        isDisabled: disabledProp,
        isExpandable: isExpandable,
        parentId,
      });

      return () => {
        unregisterNode(nodeId);
      };
    }

    return undefined;
  }, [registerNode, unregisterNode, index, disabledProp, isExpandable, nodeId, id, parentId]);

  useEffect(() => {
    if (firstCharMap && label) {
      const firstChar = contentRef.current.textContent.substring(0, 1).toLowerCase();
      firstCharMap.set(nodeId, firstChar);
      return () => {
        firstCharMap.delete(nodeId);
      };
    }

    return undefined;
  }, [firstCharMap, nodeId, label]);

  const handleFocus = useCallback((event) => {
    // DOM focus stays on the tree which manages focus with aria-activedescendant
    if (event.target === event.currentTarget) {
      let rootElement;

      if (typeof event.target.getRootNode === 'function') {
        rootElement = event.target.getRootNode();
      } else {
        rootElement = getOwnerDocument(event.target);
      }

      rootElement.getElementById(treeId).focus({ preventScroll: true });
    }

    const isFocusable = !isDisabled && !isFocused && event.target === event.currentTarget;
    if (isFocusable) {
      focusNode(nodeId);
    }
  }, [isDisabled, isFocused, focusNode, treeId, nodeId]);

  const styleProps = useTreeNodeStyle({ isExpandable });

  return (
    <Box
      ref={combinedRef}
      aria-disabled={ariaAttr(isDisabled)}
      aria-selected={ariaAttr(isSelected)}
      aria-expanded={ariaAttr(isExpanded)}
      data-tree-node-id={nodeId}
      data-tree-node-depth={nodeDepth}
      id={id}
      role="treeitem"
      tabIndex={-1}
      onFocus={handleFocus} // The `onFocus` prop is not supported. Use `onNodeFocus` callback on the tree if you need to monitor a node's focus.
      {...styleProps}
      {...rest}
    >
      <ContentComponent
        ref={contentRef}
        label={label}
        nodeDepth={nodeDepth}
        nodeId={nodeId}
        onClick={onClick}
        onMouseDown={onMouseDown}
        {...ContentProps}
      />
      {children && (
        <Descendant
          depth={nodeDepth}
          id={nodeId}
        >
          <TransitionComponent
            in={isExpanded}
            role="group"
            {...TransitionProps}
          >
            {children}
          </TransitionComponent>
        </Descendant>
      )}
    </Box>
  );
});

TreeNode.displayName = 'TreeNode';

export default TreeNode;
