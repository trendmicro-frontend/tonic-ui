import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Divider,
  Flex,
  Icon,
  OverflowTooltip,
  Scrollbar,
  Stack,
  Text,
  TreeView,
  TreeNode,
  useColorMode,
} from '@tonic-ui/react';
import React, { useState } from 'react';
import tree from './data/tree.json';
import { findExpandableNodeIds, getAllNodeIds } from './utils';

const allNodeIds = getAllNodeIds(tree);
const expandableNodeIds = findExpandableNodeIds(tree);

const renderTree = (node, depth = 0) => {
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
  const [expandedNodes, setExpandedNodes] = useState(expandableNodeIds);
  const [selectedNodes, setSelectedNodes] = useState([]);

  const onToggleNodes = (nodeIds) => {
    setExpandedNodes(nodeIds);
  };

  const onSelectNodes = (nodeIds) => {
    setSelectedNodes(nodeIds);
  };

  const handleClickExpandAll = (event) => {
    setExpandedNodes(expandableNodeIds);
  };

  const handleClickCollapseAll = (event) => {
    setExpandedNodes([]);
  };

  const handleClickSelectAll = (event) => {
    setSelectedNodes(allNodeIds);
  };

  const handleClickUnselectAll = (event) => {
    setSelectedNodes([]);
  };

  return (
    <>
      <ButtonGroup
        variant="secondary"
        columnGap="2x"
        mb="3x"
      >
        <Button
          variant="secondary"
          disabled={expandedNodes.length === expandableNodeIds.length}
          onClick={handleClickExpandAll}
        >
          Expand all
        </Button>
        <Button
          variant="secondary"
          disabled={expandedNodes.length === 0}
          onClick={handleClickCollapseAll}
        >
          Collapse all
        </Button>
        <Button
          variant="secondary"
          disabled={selectedNodes.length === allNodeIds.length}
          onClick={handleClickSelectAll}
        >
          Select all
        </Button>
        <Button
          variant="secondary"
          disabled={selectedNodes.length === 0}
          onClick={handleClickUnselectAll}
        >
          Unselect all
        </Button>
      </ButtonGroup>
      <Stack spacing="2x">
        <Text>Expanded nodes: {expandedNodes.join(', ')}</Text>
        <Text>Selected nodes: {selectedNodes.join(', ')}</Text>
      </Stack>
      <Divider my="4x" />
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
            aria-label="controlled"
            isSelectable
            isMultiSelectable
            expandedNodes={expandedNodes}
            selectedNodes={selectedNodes}
            onToggleNodes={onToggleNodes}
            onSelectNodes={onSelectNodes}
          >
            {renderTree(tree)}
          </TreeView>
        </Scrollbar>
      </Box>
    </>
  );
};

export default App;
