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
  TreeItem,
  TreeItemToggle,
  TreeItemToggleIcon,
  TreeView,
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

const TreeItemRender = ({
  depth = 0,
  node,
  ...rest
}) => {
  return (
    <TreeItem
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
                <TreeItemToggle>
                  <TreeItemToggleIcon />
                </TreeItemToggle>
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
      sx={{
        // Hide the background color of the tree node when the checkbox is selected
        '&[aria-selected="true"] > *:first-of-type:not(:hover)': {
          backgroundColor: 'transparent',
        },
      }}
    >
      {ensureArray(node.children).map(node => (
        <TreeItemRender
          key={node.id}
          depth={depth + 1}
          node={node}
        />
      ))}
    </TreeItem>
  );
};

const App = () => {
  const [colorStyle] = useColorStyle();
  const [expandedNodes, setExpandedNodes] = useState([]);
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
        mb="4x"
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
            aria-label="controlled tree view"
            isSelectable
            isUnselectable
            multiSelect
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
      <Divider my="4x" />
      <Stack>
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
    </>
  );
};

export default App;
