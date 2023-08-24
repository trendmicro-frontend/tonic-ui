import {
  Box,
  Flex,
  Icon,
  OverflowTooltip,
  Scrollbar,
  Spinner,
  TreeItem,
  TreeItemContent,
  TreeItemToggle,
  TreeItemToggleIcon,
  TreeView,
  useColorStyle,
  useTreeView,
} from '@tonic-ui/react';
import { ensureArray } from 'ensure-type';
import React, { useCallback, useEffect, useState } from 'react';
import {
  findExpandableNodeIds,
} from './utils';

const getLoadOnDemandTreeNodes = (count) => {
  const treeNodes = Array.from({ length: count }, (_, index) => {
    const nodeId = index + 1;

    return {
      id: `${nodeId}`,
      label: `Node ${nodeId}`,
      children: [],
      loadOnDemand: true,
    };
  });

  return treeNodes;
};

const TreeItemRender = ({
  node,
  nodeDepth = 0,
}) => {
  const [colorStyle] = useColorStyle();
  const {
    getIsNodeExpanded,
  } = useTreeView();
  const nodeId = node.id;
  const nodeLabel = node.label;
  const [childNodes, setChildNodes] = useState(ensureArray(node.children));
  const [isLoading, setIsLoading] = useState(false);
  const isExpanded = getIsNodeExpanded(nodeId);
  const loadOnDemand = node.loadOnDemand && childNodes.length === 0;

  const render = useCallback(({ isExpandable, isExpanded, isSelected, select }) => {
    const icon = (() => {
      if (isExpandable) {
        return isExpanded ? 'folder-open' : 'folder';
      }
      return 'server';
    })();
    const iconColor = isExpandable ? 'yellow:50' : 'currentColor';

    return (
      <TreeItemContent
        sx={{
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
              {isLoading ? <Spinner size="xs" /> : <TreeItemToggleIcon />}
            </TreeItemToggle>
          )}
        </Flex>
        <Icon icon={icon} color={iconColor} mr="2x" />
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
    );
  }, [colorStyle, isLoading, nodeDepth, nodeLabel]);

  useEffect(() => {
    let timer = null;

    if (isExpanded && loadOnDemand) {
      setIsLoading(true);
      timer = setTimeout(() => {
        const childNodes = [
          {
            id: `${nodeId}.1`,
            label: `${nodeLabel}.1`,
            loadOnDemand: (nodeDepth < 2),
          },
          {
            id: `${nodeId}.2`,
            label: `${nodeLabel}.2`,
          },
        ];

        setChildNodes(childNodes);
        setIsLoading(false);

        // The following code is to update the node with the new children.
        // You can remove it if you don't want to update the node.
        node.children = childNodes;
        node.loadOnDemand = false;
      }, 500);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [isExpanded, loadOnDemand, node, nodeId, nodeLabel, nodeDepth]);

  return (
    <TreeItem
      nodeId={nodeId}
      render={render}
    >
      {loadOnDemand
        ? <Box key="stub" />
        : childNodes.map(node => (
            <TreeItemRender
              key={node.id}
              node={node}
              nodeDepth={nodeDepth + 1}
            />
          ))
      }
    </TreeItem>
  );
};

const App = () => {
  const [colorStyle] = useColorStyle();
  const treeNodes = getLoadOnDemandTreeNodes(5);
  const expandableNodes = findExpandableNodeIds(treeNodes);
  const [expandedNodes, setExpandedNodes] = useState(expandableNodes);
  const [selectedNodes, setSelectedNodes] = useState([]);

  const handleToggle = useCallback((nodeIds) => {
    setExpandedNodes(nodeIds);
  }, []);

  const handleSelect = useCallback((nodeIds) => {
    setSelectedNodes(nodeIds);
  }, []);

  return (
    <Box
      sx={{
        minWidth: 160,
        maxWidth: '40%',
        boxShadow: colorStyle.shadow.thick,
      }}
    >
      <Scrollbar
        height={240}
        overflowY="auto"
      >
        <TreeView
          aria-label="load on demand"
          isSelectable
          isUnselectable
          expandedNodes={expandedNodes}
          selectedNodes={selectedNodes}
          onNodeToggle={handleToggle}
          onNodeSelect={handleSelect}
        >
          {ensureArray(treeNodes).map(node => (
            <TreeItemRender
              key={node.id}
              node={node}
            />
          ))}
        </TreeView>
      </Scrollbar>
    </Box>
  );
};

export default App;
