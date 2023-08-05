import {
  Box,
  Icon,
  OverflowTooltip,
  Scrollbar,
  TreeView,
  TreeNode,
  useColorMode,
} from '@tonic-ui/react';
import React from 'react';
import tree from './data/tree.json';
import { findExpandableNodeIds } from './utils';

const expandableNodeIds = findExpandableNodeIds(tree);

const renderTree = (node, depth = 0) => {
  const childCount = Array.isArray(node.children) ? node.children.length : 0;

  return (
    <TreeNode
      key={node.id}
      nodeId={node.id}
      render={({ isExpanded }) => {
        const icon = (() => {
          if (childCount > 0) {
            return isExpanded ? 'folder-open' : 'folder';
          }
          return 'server';
        })();
        const iconColor = (childCount > 0) ? 'yellow:50' : 'currentColor';

        return (
          <>
            <Icon icon={icon} color={iconColor} mr="2x" />
            <OverflowTooltip label={node.name}>
              {node.name}
            </OverflowTooltip>
          </>
        );
      }}
    >
      {(childCount > 0)
        ? node.children.map(node => renderTree(node, depth + 1))
        : null
      }
    </TreeNode>
  );
};

const App = () => {
  const [colorMode] = useColorMode();
  const borderColor = {
    dark: 'gray:70',
    light: 'gray:30',
  }[colorMode];

  return (
    <Box
      minWidth={160}
      maxWidth="40%"
    >
      <Scrollbar
        height={240}
        overflowY="scroll"
        sx={{
          border: 1,
          borderColor,
        }}
      >
        <TreeView
          aria-label="node icons"
          defaultExpandedNodes={expandableNodeIds}
          isSelectable
        >
          {renderTree(tree)}
        </TreeView>
      </Scrollbar>
    </Box>
  );
};

export default App;
