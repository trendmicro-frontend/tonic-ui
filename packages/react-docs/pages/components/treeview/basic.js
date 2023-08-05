import {
  Box,
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
      render={() => (
        <OverflowTooltip label={node.name}>
          {node.name}
        </OverflowTooltip>
      )}
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
          aria-label="basic tree view"
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
