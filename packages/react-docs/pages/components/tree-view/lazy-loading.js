import {
  Box,
  Icon,
  OverflowTooltip,
  Scrollbar,
  TreeView,
  TreeNode,
  useColorStyle,
} from '@tonic-ui/react';
import { ensureArray } from 'ensure-type';
import React, { useCallback, useState } from 'react';
import {
  findExpandableNodeIds,
} from './utils';

const initialTreeNodes = [
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
        isLoaded: false,
      },
    ],
    isLoaded: true,
  },
  {
    id: '2',
    name: 'Node 2',
    children: [],
    isLoaded: false,
  },
  {
    id: '3',
    name: 'Node 3',
    children: [],
    isLoaded: false,
  },
  {
    id: '4',
    name: 'Node 4',
    children: [],
    isLoaded: false,
  },
  {
    id: '5',
    name: 'Node 5',
    children: [],
    isLoaded: false,
  },
];

const TreeNodeRender = ({
  depth = 0,
  node,
  ...rest
}) => {
  const isLazyLoading = Array.isArray(node.children) && !node.isLoaded;

  return (
    <TreeNode
      nodeId={node.id}
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
            <Icon icon={icon} color={iconColor} mr="2x" />
            <OverflowTooltip label={node.name}>
              {node.name}
            </OverflowTooltip>
          </>
        );
      }}
      sx={{
        // Hide the background color of the tree node when the checkbox is selected
        '&[aria-selected="true"] > *:first-of-type:not(:hover)': {
          backgroundColor: 'transparent',
        },
      }}
      {...rest}
    >
      {isLazyLoading && (
        <Box
          pl={32 + depth * 24}
        >
          Loading...
        </Box>
      )}
      {!isLazyLoading && (
        ensureArray(node.children).map(node => (
          <TreeNodeRender
            key={node.id}
            depth={depth + 1}
            node={node}
          />
        ))
      )}
    </TreeNode>
  );
};

const App = () => {
  const [colorStyle] = useColorStyle();
  const [treeNodes, /*setTreeNodes*/] = useState(initialTreeNodes);
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
        overflowY="scroll"
      >
        <TreeView
          aria-label="lazy loading"
          isSelectable
          multiSelect
          expandedNodes={expandedNodes}
          selectedNodes={selectedNodes}
          onNodeToggle={handleToggle}
          onNodeSelect={handleSelect}
        >
          {ensureArray(treeNodes).map(node => (
            <TreeNodeRender
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
