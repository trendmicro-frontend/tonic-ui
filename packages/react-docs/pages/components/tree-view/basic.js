import {
  Box,
  OverflowTooltip,
  Scrollbar,
  TreeView,
  TreeNode,
  useColorStyle,
} from '@tonic-ui/react';
import { ensureArray } from 'ensure-type';
import React from 'react';
import treeNodes from './data/tree-nodes.json';
import { findExpandableNodeIds } from './utils';

const expandableNodeIds = findExpandableNodeIds(treeNodes);

const renderTreeNodes = (nodes, depth = 0) => {
  return ensureArray(nodes).map(node => {
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
          ? renderTreeNodes(node.children, depth + 1)
          : null
        }
      </TreeNode>
    );
  });
};

const App = () => {
  const [colorStyle] = useColorStyle();

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
          aria-label="basic tree view"
          defaultExpandedNodes={expandableNodeIds}
          isSelectable
        >
          {renderTreeNodes(treeNodes)}
        </TreeView>
      </Scrollbar>
    </Box>
  );
};

export default App;
