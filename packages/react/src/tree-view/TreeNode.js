import { useMergeRefs } from '@tonic-ui/react-hooks';
import { ariaAttr, isNullish } from '@tonic-ui/utils';
import { ensureNumber } from 'ensure-type';
import React, { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
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
    nodeId,
    render,
    ...rest
  },
  ref,
) => {
  const {
    getIsNodeDisabled,
    getIsNodeExpanded,
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
  const isSelected = getIsNodeSelected ? getIsNodeSelected(nodeId) : false;

  useEffect(() => {
    if (typeof registerNode === 'function' && typeof unregisterNode === 'function' && index !== -1) {
      registerNode({
        focus: () => {
          requestAnimationFrame(() => {
            const el = contentRef.current;
            el && el.focus();
          });
        },
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

  const styleProps = useTreeNodeStyle({ isExpandable });

  return (
    <Box
      ref={combinedRef}
      aria-disabled={ariaAttr(isDisabled)}
      aria-selected={ariaAttr(isSelected)}
      aria-expanded={ariaAttr(isExpanded)}
      data-tree-node-depth={nodeDepth}
      data-tree-node-id={nodeId}
      id={id}
      role="treeitem"
      {...styleProps}
      {...rest}
    >
      <ContentComponent
        ref={contentRef}
        {...ContentProps}
        nodeDepth={nodeDepth}
        nodeId={nodeId}
        render={render}
      />
      {!!children && (
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
  );
});

TreeNode.displayName = 'TreeNode';

export default TreeNode;
