import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Code,
  Divider,
  Flex,
  Icon,
  OverflowTooltip,
  Scrollbar,
  Stack,
  Text,
  TreeView,
  TreeNode,
  useColorStyle,
} from '@tonic-ui/react';
import { ensureArray } from 'ensure-type';
import React, { useCallback, useState } from 'react';
import treeNodes from './data/tree-nodes.json';
import {
  buildTreeMap,
  findExpandableNodeIds,
} from './utils';

const treeMap = buildTreeMap(treeNodes);
const expandableNodes = findExpandableNodeIds(treeNodes);
const allNodes = Array.from(treeMap.keys());

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
  const [expandedNodes, setExpandedNodes] = useState(expandableNodes);
  const [selectedNodes, setSelectedNodes] = useState([]);

  const handleToggle = useCallback((nodeIds) => {
    setExpandedNodes(nodeIds);
  }, []);

  const handleSelect = useCallback((nodeIds) => {
    setSelectedNodes(nodeIds);
  }, []);

  const handleClickExpandAll = useCallback((event) => {
    setExpandedNodes(expandableNodes);
  }, []);

  const handleClickCollapseAll = useCallback((event) => {
    setExpandedNodes([]);
  }, []);

  const handleClickSelectAll = useCallback((event) => {
    setSelectedNodes(allNodes);
  }, []);

  const handleClickUnselectAll = useCallback((event) => {
    setSelectedNodes([]);
  }, []);

  return (
    <>
      <ButtonGroup
        variant="secondary"
        columnGap="2x"
        mb="3x"
      >
        <Button
          variant="secondary"
          disabled={expandedNodes.length === expandableNodes.length}
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
          disabled={selectedNodes.length === allNodes.length}
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
        <Flex
          alignItems="flex-start"
          columnGap="2x"
        >
          <Text whiteSpace="nowrap">
            Expanded nodes:
          </Text>
          <Flex
            flexWrap="wrap"
            columnGap="1x"
            rowGap="1x"
          >
            {expandedNodes.map(nodeId => (
              <Code key={nodeId} whiteSpace="nowrap">
                {treeMap.get(nodeId)?.name}
              </Code>
            ))}
          </Flex>
        </Flex>
        <Flex
          alignItems="flex-start"
          columnGap="2x"
        >
          <Text whiteSpace="nowrap">
            Selected nodes:
          </Text>
          <Flex
            flexWrap="wrap"
            columnGap="1x"
            rowGap="1x"
          >
            {selectedNodes.map(nodeId => (
              <Code key={nodeId} whiteSpace="nowrap">
                {treeMap.get(nodeId)?.name}
              </Code>
            ))}
          </Flex>
        </Flex>
      </Stack>
      <Divider my="4x" />
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
            aria-label="controlled"
            isSelectable
            isMultiSelectable
            expandedNodes={expandedNodes}
            selectedNodes={selectedNodes}
            onNodeToggle={handleToggle}
            onNodeSelect={handleSelect}
          >
            {renderTreeNodes(treeNodes)}
          </TreeView>
        </Scrollbar>
      </Box>
    </>
  );
};

export default App;
