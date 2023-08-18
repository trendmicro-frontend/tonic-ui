import {
  Box,
  Checkbox,
  Flex,
  Icon,
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
                <TreeNodeToggle>
                  <TreeNodeToggleIcon />
                </TreeNodeToggle>
              )}
            </Flex>
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
        overflowY="auto"
      >
        <TreeView
          aria-label="multi-selection"
          defaultExpandedNodes={expandableNodeIds}
          isSelectable
          isUnselectable
          multiSelect
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
