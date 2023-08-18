import {
  Box,
  Flex,
  Icon,
  OverflowTooltip,
  Scrollbar,
  Spinner,
  TreeItem,
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

const initialTreeItems = [
  {
    id: '1',
    name: 'Node 1',
    children: [
      {
        id: '1.1',
        name: 'Node 1.1',
      },
      {
        id: '1.2',
        name: 'Node 1.2',
        children: [],
        loadOnDemand: true,
      },
    ],
  },
  {
    id: '2',
    name: 'Node 2',
    children: [],
    loadOnDemand: true,
  },
  {
    id: '3',
    name: 'Node 3',
    children: [],
    loadOnDemand: true,
  },
  {
    id: '4',
    name: 'Node 4',
    children: [],
    loadOnDemand: true,
  },
  {
    id: '5',
    name: 'Node 5',
    children: [],
    loadOnDemand: true,
  },
];

const TreeItemRender = ({
  node,
  nodeDepth = 0,
  ...rest
}) => {
  const {
    getIsNodeExpanded,
  } = useTreeView();
  const nodeId = node.id;
  const nodeName = node.name;
  const [childNodes, setChildNodes] = useState(ensureArray(node.children));
  const [isLoading, setIsLoading] = useState(false);
  const isExpanded = getIsNodeExpanded(nodeId);
  const loadOnDemand = node.loadOnDemand && childNodes.length === 0;

  useEffect(() => {
    let timer = null;

    if (isExpanded && loadOnDemand) {
      setIsLoading(true);
      timer = setTimeout(() => {
        const childNodes = [
          {
            id: `${nodeId}.1`,
            name: `${nodeName}.1`,
            loadOnDemand: (nodeDepth < 1),
          },
          {
            id: `${nodeId}.2`,
            name: `${nodeName}.2`,
          }
        ];

        setChildNodes(childNodes);
        setIsLoading(false);
      }, 500);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [isExpanded, loadOnDemand, nodeId, nodeName, nodeDepth]);

  return (
    <TreeItem
      nodeId={nodeId}
      render={({ isExpandable, isExpanded, isSelected, select }) => {
        const icon = (() => {
          if (isExpandable) {
            return isExpanded ? 'folder-open' : 'folder';
          }
          return 'server';
        })();
        const iconColor = isExpandable ? 'yellow:50' : 'currentColor';

        return (
          <>
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
          </>
        );
      }}
      {...rest}
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
  const [treeNodes, /*setTreeItems*/] = useState(initialTreeItems);
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
          aria-label="lazy loading"
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
