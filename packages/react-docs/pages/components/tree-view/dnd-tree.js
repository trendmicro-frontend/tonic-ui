import {
  Box,
  Flex,
  Icon,
  OverflowTooltip,
  TreeItem,
  TreeItemContent,
  TreeItemToggle,
  TreeItemToggleIcon,
  TreeView,
  useColorStyle,
} from '@tonic-ui/react';
import { ensureArray } from 'ensure-type';
import React, { useCallback } from 'react';
import { useDrop } from 'react-dnd';

const Droppable = ({
  canDrop: canDropProp,
  children,
  onDrop: onDropProp,
}) => {
  const [collectedProps, dropRef] = useDrop({
    accept: 'dnd',
    drop: onDropProp,
    canDrop: canDropProp,
    collect: (monitor) => {
      // DropTargetMonitor
      // https://react-dnd.github.io/react-dnd/docs/api/drop-target-monitor
      return {
        isOver: monitor.isOver(),
      };
    },
  });

  return children({
    dropRef,
    isOver: collectedProps.isOver,
  });
};

const TreeItemRender = ({
  node,
  nodeDepth = 0,
  onNodeDrop: onNodeDropProp,
}) => {
  const [colorStyle] = useColorStyle();

  return (
    <TreeItem
      key={node.id}
      nodeId={node.id}
      render={({ isExpandable, isExpanded, isSelected }) => {
        const icon = isExpanded ? 'folder-open' : 'folder';
        const iconColor = 'yellow:50';

        return (
          <Droppable
            onDrop={(item, monitor) => {
              if (typeof onNodeDropProp === 'function') {
                onNodeDropProp({
                  ...item,
                  target: node.id,
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
                <Icon icon={icon} color={iconColor} mr="2x" />
                <OverflowTooltip label={node.name}>
                  {({ ref, style }) => (
                    <Box
                      ref={ref}
                      {...style}
                      flex="auto"
                      fontWeight={isSelected ? 'semibold' : 'normal'}
                    >
                      {node.name}
                    </Box>
                  )}
                </OverflowTooltip>
              </TreeItemContent>
            )}
          </Droppable>
        );
      }}
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

const DndTree = ({
  data,
  onNodeDrop: onNodeDropProp,
  onNodeSelect: onNodeSelectProp,
  ...rest
}) => {
  const defaultSelectedNode = ensureArray(data)[0]?.id ?? null;
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
    <TreeView
      aria-label="dnd"
      isSelectable
      isUnselectable={false}
      defaultSelectedNodes={[defaultSelectedNode]}
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
    </TreeView>
  );
};

export default DndTree;
