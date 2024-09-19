import { useMergeRefs } from '@tonic-ui/react-hooks';
import { ariaAttr, isNullish, runIfFn } from '@tonic-ui/utils';
import { ensureFiniteNumber } from 'ensure-type';
import memoize from 'micro-memoize';
import React, { forwardRef, isValidElement, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import { Collapse } from '../transitions';
import { Descendant, useDescendant } from '../utils/descendant';
import { TreeItemContext } from './context';
import { useTreeItemStyle } from './styles';
import useTree from './useTree';

const getMemoizedState = memoize(state => ({ ...state }));

const TreeItem = forwardRef((inProps, ref) => {
  const {
    TransitionComponent = Collapse,
    TransitionProps,
    children,
    disabled: disabledProp,
    id: idAttrProp,
    nodeId,
    render,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'TreeItem' });
  const {
    focusNode,
    getIsNodeDisabled,
    getIsNodeExpanded,
    getIsNodeFocused,
    getIsNodeSelected,
    registerNode,
    selectNode,
    selectRange,
    toggleSelection,
    toggleExpansion,
    treeId,
    unregisterNode,
  } = useTree();
  const contentRef = useRef();
  const [element, setElement] = useState(null);
  const combinedRef = useMergeRefs(setElement, ref);
  const idAttr = useMemo(() => {
    if (!isNullish(idAttrProp)) {
      return idAttrProp;
    }

    if (treeId && nodeId) {
      return `${treeId}-${nodeId}`;
    }

    return null;
  }, [idAttrProp, treeId, nodeId]);
  const { index, parentDepth, parentId } = useDescendant(element);
  const nodeDepth = ensureFiniteNumber(parentDepth) + 1;
  const validChildren = React.Children.toArray(children)
    .filter(child => {
      return isValidElement(child) || typeof child === 'string' || typeof child === 'number';
    });
  const isExpandable = (validChildren.length > 0);
  const isDisabled = getIsNodeDisabled ? getIsNodeDisabled(nodeId) : false;
  const isExpanded = getIsNodeExpanded ? getIsNodeExpanded(nodeId) : false;
  const isFocused = getIsNodeFocused ? getIsNodeFocused(nodeId) : false;
  const isSelected = getIsNodeSelected ? getIsNodeSelected(nodeId) : false;

  useEffect(() => {
    if (typeof registerNode === 'function' && typeof unregisterNode === 'function' && index !== -1) {
      registerNode({
        depth: nodeDepth,
        focus: () => {
          requestAnimationFrame(() => {
            const el = contentRef.current;
            el && el.focus();
          });
        },
        id: nodeId,
        idAttr,
        isDisabled: Boolean(disabledProp),
        isExpandable,
        parentId,
      });

      return () => {
        unregisterNode(nodeId);
      };
    }

    return undefined;
  }, [registerNode, unregisterNode, index, nodeDepth, nodeId, idAttr, disabledProp, isExpandable, parentId]);

  const selectHandler = useCallback(() => {
    const isDisabled = getIsNodeDisabled(nodeId);
    const isFocused = getIsNodeFocused(nodeId);

    if (isDisabled) {
      return;
    }

    if (!isFocused) {
      focusNode(nodeId);
    }

    selectNode(nodeId);
  }, [nodeId, getIsNodeDisabled, getIsNodeFocused, focusNode, selectNode]);

  const selectRangeHandler = useCallback(() => {
    const isDisabled = getIsNodeDisabled(nodeId);
    const isFocused = getIsNodeFocused(nodeId);

    if (isDisabled) {
      return;
    }

    if (!isFocused) {
      focusNode(nodeId);
    }

    // When performing a range selection, the `start` parameter is assigned the value of `lastSelectedNode.current`
    const end = nodeId;
    selectRange({ end });
  }, [nodeId, getIsNodeDisabled, getIsNodeFocused, focusNode, selectRange]);

  const toggleExpansionHandler = useCallback(() => {
    const isDisabled = getIsNodeDisabled(nodeId);

    if (isDisabled) {
      return;
    }

    // Note: We do not focus the node when toggling expansion state

    toggleExpansion(nodeId);
  }, [nodeId, getIsNodeDisabled, toggleExpansion]);

  const toggleSelectionHandler = useCallback(() => {
    const isDisabled = getIsNodeDisabled(nodeId);
    const isFocused = getIsNodeFocused(nodeId);

    if (isDisabled) {
      return;
    }

    if (!isFocused) {
      focusNode(nodeId);
    }

    toggleSelection(nodeId);
  }, [nodeId, getIsNodeDisabled, getIsNodeFocused, focusNode, toggleSelection]);

  const styleProps = useTreeItemStyle();
  const context = getMemoizedState({
    contentRef, // internal use only
    isDisabled,
    isExpandable,
    isExpanded,
    isFocused,
    isSelected,
    nodeId,
    nodeDepth,
    select: selectHandler,
    selectRange: selectRangeHandler,
    toggleExpansion: toggleExpansionHandler,
    toggleSelection: toggleSelectionHandler,
  });

  return (
    <TreeItemContext.Provider value={context}>
      <Box
        ref={combinedRef}
        aria-disabled={ariaAttr(isDisabled)}
        aria-expanded={ariaAttr(isExpanded)}
        aria-selected={ariaAttr(isSelected)}
        id={idAttr}
        role="treeitem"
        {...styleProps}
        {...rest}
      >
        {runIfFn(render, context)}
        {!!isExpandable && (
          <Descendant
            depth={nodeDepth}
            id={nodeId}
          >
            <TransitionComponent
              appear={false} // do not perform the enter transition when it first mounts
              in={isExpanded}
              role="group"
              unmountOnExit={true}
              {...TransitionProps}
            >
              {children}
            </TransitionComponent>
          </Descendant>
        )}
      </Box>
    </TreeItemContext.Provider>
  );
});

TreeItem.displayName = 'TreeItem';

export default TreeItem;
