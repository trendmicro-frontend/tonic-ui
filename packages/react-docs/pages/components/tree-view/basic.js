import {
  Box,
  Flex,
  OverflowTooltip,
  Scrollbar,
  TreeNode,
  TreeNodeToggle,
  TreeNodeToggleIcon,
  TreeView,
  useColorStyle,
} from '@tonic-ui/react';
import { ensureArray } from 'ensure-type';
import React from 'react';
import treeNodes from './data/tree-nodes.json';
import { findExpandableNodeIds } from './utils';

const expandableNodeIds = findExpandableNodeIds(treeNodes);

const TreeNodeRender = ({
  depth = 0,
  node,
  ...rest
}) => {
  return (
    <TreeNode
      key={node.id}
      nodeId={node.id}
      render={({ isExpandable }) => (
        <>
          <Flex
            flex="none"
            width="6x"
          >
            {isExpandable && (
              <TreeNodeToggle>
                <TreeNodeToggleIcon />
              </TreeNodeToggle>
            )}
          </Flex>
          <OverflowTooltip label={node.name}>
            {node.name}
          </OverflowTooltip>
        </>
      )}
    >
      {ensureArray(node.children).map(node => (
        <TreeNodeRender
          key={node.id}
          depth={depth + 1}
          node={node}
        />
      ))}
    </TreeNode>
  );
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
          isUnselectable
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
