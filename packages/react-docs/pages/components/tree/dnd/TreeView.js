import {
  Box,
  Flex,
  Icon,
  OverflowTooltip,
  Tree,
  TreeItem,
  TreeItemContent,
  TreeItemToggle,
  TreeItemToggleIcon,
  useColorStyle,
} from '@tonic-ui/react';
import {
  FolderIcon,
  FolderOpenIcon,
} from '@tonic-ui/react-icons';
import { ensureArray } from 'ensure-type';
import React, { useCallback } from 'react';
import Droppable from './Droppable';

const TreeItemRender = ({
  node,
  nodeDepth = 0,
  onNodeDrop: onNodeDropProp,
}) => {
  const [colorStyle] = useColorStyle();
  const nodeId = node.id;
  const nodeLabel = node.label;

  const render = useCallback(({ isExpandable, isExpanded, isSelected }) => {
    const icon = isExpanded ? FolderOpenIcon : FolderIcon;
    const iconColor = 'yellow:50';

    return (
      <Droppable
        onDrop={(item, monitor) => {
          if (typeof onNodeDropProp === 'function') {
            onNodeDropProp({
              ...item,
              target: nodeId,
            });
          }
        }}
      >
        {({ dropRef, isOver }) => (
          <TreeItemContent
            ref={dropRef}
            sx={{
              backgroundColor: isOver ? colorStyle.background.highlighted : undefined,

              // [Optional] Display a connecting line to indicate which is the last node when hovered over the tree item
              ':hover + [role="group"]': {
                position: 'relative',
                '::before': {
                  backgroundColor: colorStyle.background.highlighted,
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: 20 + nodeDepth * 24 - (1/2), // Adjust the horizontal position based on depth
                  width: 1,
                },
              },
            }}
          >
            <Flex
              flex="none"
              width="6x"
            >
              {isExpandable && (
                <TreeItemToggle>
                  <TreeItemToggleIcon />
                </TreeItemToggle>
              )}
            </Flex>
            <Icon as={icon} color={iconColor} mr="2x" />
            <OverflowTooltip label={nodeLabel}>
              {({ ref, style }) => (
                <Box
                  ref={ref}
                  {...style}
                  flex="auto"
                  fontWeight={isSelected ? 'semibold' : 'normal'}
                >
                  {nodeLabel}
                </Box>
              )}
            </OverflowTooltip>
          </TreeItemContent>
        )}
      </Droppable>
    );
  }, [colorStyle, nodeId, nodeDepth, nodeLabel, onNodeDropProp]);

  return (
    <TreeItem
      nodeId={nodeId}
      render={render}
    >
      {ensureArray(node.children).map(node => (
        <TreeItemRender
          key={node.id}
          node={node}
          nodeDepth={nodeDepth + 1}
          onNodeDrop={onNodeDropProp}
        />
      ))}
    </TreeItem>
  );
};

const TreeView = ({
  data,
  onNodeDrop: onNodeDropProp,
  onNodeSelect: onNodeSelectProp,
  ...rest
}) => {
  const defaultSelectedNodeId = ensureArray(data)[0]?.id ?? null;
  const handleNodeDrop = useCallback((item) => {
    if (typeof onNodeDropProp === 'function') {
      onNodeDropProp(item);
    }
  }, [onNodeDropProp]);
  const handleNodeSelect = useCallback((nodeIds) => {
    if (typeof onNodeSelectProp === 'function') {
      onNodeSelectProp(nodeIds);
    }
  }, [onNodeSelectProp]);

  return (
    <Tree
      aria-label="dnd"
      isSelectable
      isUnselectable={false}
      defaultSelected={defaultSelectedNodeId}
      onNodeSelect={handleNodeSelect}
      {...rest}
    >
      {ensureArray(data).map(node => (
        <TreeItemRender
          key={node.id}
          node={node}
          onNodeDrop={handleNodeDrop}
        />
      ))}
    </Tree>
  );
};

export default TreeView;
