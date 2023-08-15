import { useMergeRefs } from '@tonic-ui/react-hooks';
import { ariaAttr, isNullish } from '@tonic-ui/utils';
import { ensureNumber } from 'ensure-type';
import React, { forwardRef, isValidElement, useEffect, useMemo, useRef, useState } from 'react';
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
    id: idAttributeProp,
    nodeId,
    render,
    ...rest
  },
  ref,
) => {
  const {
    getIsNodeExpanded,
    getIsNodeSelected,
    registerNode,
    treeId,
    unregisterNode,
  } = useTreeView();

  const idAttribute = useMemo(() => {
    if (!isNullish(idAttributeProp)) {
      return idAttributeProp;
    }

    if (treeId && nodeId) {
      return `${treeId}-${nodeId}`;
    }

    return null;
  }, [idAttributeProp, treeId, nodeId]);

  const contentRef = useRef();
  const [element, setElement] = useState(null);
  const combinedRef = useMergeRefs(setElement, ref);

  const { index, parentDepth, parentId } = useDescendant(element);
  const nodeDepth = ensureNumber(parentDepth) + 1;

  const validChildren = React.Children.toArray(children)
    .filter(child => {
      return isValidElement(child) || typeof child === 'string' || typeof child === 'number';
    });
  const isDisabled = Boolean(disabledProp);
  const isExpandable = validChildren.length > 0;
  const isExpanded = Boolean(getIsNodeExpanded?.(nodeId));
  const isSelected = Boolean(getIsNodeSelected?.(nodeId));

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
        idAttribute,
        isDisabled,
        isExpandable,
        parentId,
      });

      return () => {
        unregisterNode(nodeId);
      };
    }

    return undefined;
  }, [registerNode, unregisterNode, index, nodeDepth, nodeId, idAttribute, isDisabled, isExpandable, parentId]);

  const styleProps = useTreeNodeStyle({ isExpandable });

  return (
    <Box
      ref={combinedRef}
      aria-disabled={ariaAttr(isDisabled)}
      aria-selected={ariaAttr(isSelected)}
      aria-expanded={ariaAttr(isExpanded)}
      data-tree-node-depth={nodeDepth}
      data-tree-node-id={nodeId}
      id={idAttribute}
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
  );
});

TreeNode.displayName = 'TreeNode';

export default TreeNode;
