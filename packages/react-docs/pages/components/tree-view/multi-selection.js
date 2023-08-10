import {
  Box,
  Checkbox,
  Flex,
  Icon,
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
        render={({ isExpanded, isSelected, select }) => {
          const icon = (() => {
            if (childCount > 0) {
              return isExpanded ? 'folder-open' : 'folder';
            }
            return 'server';
          })();
          const iconColor = (childCount > 0) ? 'yellow:50' : 'currentColor';

          return (
            <>
              <Flex
                onClick={(event) => {
                  // Prevent event propagation when clicking the checkbox
                  event.stopPropagation();
                }}
                mr="2x"
              >
                <Checkbox
                  checked={isSelected}
                  onChange={() => {
                    select();
                  }}
                />
              </Flex>
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
          aria-label="multi-select"
          defaultExpandedNodes={expandableNodeIds}
          isSelectable
          isMultiSelectable
        >
          {renderTreeNodes(treeNodes)}
        </TreeView>
      </Scrollbar>
    </Box>
  );
};

export default App;
