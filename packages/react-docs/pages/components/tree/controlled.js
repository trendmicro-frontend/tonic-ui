import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Code,
  Divider,
  Icon,
  Flex,
  OverflowTooltip,
  Scrollbar,
  Stack,
  Text,
  TreeItem,
  TreeItemContent,
  TreeItemToggle,
  TreeItemToggleIcon,
  Tree,
  useColorStyle,
} from '@tonic-ui/react';
import {
  useConst,
} from '@tonic-ui/react-hooks';
import { FolderIcon, FolderOpenIcon, ServerIcon } from '@tonic-ui/react-icons';
import { ensureArray } from 'ensure-type';
import React, { useCallback, useMemo, useState } from 'react';
import {
  buildTreeMap,
  buildTreeNodes,
  findExpandableNodeIds,
} from './utils';

const TreeItemRender = ({
  node,
  nodeDepth = 0,
}) => {
  const [colorStyle] = useColorStyle();
  const nodeId = node.id;
  const nodeLabel = node.label;

  const render = useCallback(({ isExpandable, isExpanded, isSelected, select }) => {
    const icon = (() => {
      if (isExpandable) {
        return isExpanded ? FolderOpenIcon : FolderIcon;
      }
      return ServerIcon;
    })();
    const iconColor = isExpandable ? 'yellow:50' : 'currentColor';

    return (
      <TreeItemContent
        sx={{
          // Hide the background color of the tree node when the checkbox is selected
          backgroundColor: isSelected ? 'transparent' : undefined,

          // [Optional] Display a connecting line to indicate which is the last node when hovered over the tree item
          ':hover + [role="group"]': {
            position: 'relative',
            '::before': {
              backgroundColor: colorStyle.background.highlighted,
              content: '""',
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 20 + nodeDepth * 24 - (1/2), // Adjust the horizontal position based on depth
              width: 1,
            },
          },
        }}
      >
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
        <Icon as={icon} color={iconColor} mr="2x" />
        <OverflowTooltip label={nodeLabel}>
          {({ ref, style }) => (
            <Box
              ref={ref}
              {...style}
              flex="auto"
              fontWeight={isSelected ? 'semibold' : 'normal'}
            >
              {nodeLabel}
            </Box>
          )}
        </OverflowTooltip>
      </TreeItemContent>
    );
  }, [colorStyle, nodeDepth, nodeLabel]);

  return (
    <TreeItem
      nodeId={nodeId}
      render={render}
    >
      {ensureArray(node.children).map(node => (
        <TreeItemRender
          key={node.id}
          node={node}
          nodeDepth={nodeDepth + 1}
        />
      ))}
    </TreeItem>
  );
};

const App = () => {
  const [colorStyle] = useColorStyle();
  const treeNodes = useConst(() => buildTreeNodes());
  const treeMap = useMemo(() => buildTreeMap(treeNodes), [treeNodes]);
  const expandableNodeIds = useMemo(() => findExpandableNodeIds(treeNodes), [treeNodes]);
  const allNodes = useMemo(() => Array.from(treeMap.keys()), [treeMap]);
  const [expandedNodeIds, setExpandedNodeIds] = useState([]);
  const [selectedNodeIds, setSelectedNodeIds] = useState([]);

  const handleToggle = useCallback((nodeIds) => {
    setExpandedNodeIds(nodeIds);
  }, []);

  const handleSelect = useCallback((nodeIds) => {
    setSelectedNodeIds(nodeIds);
  }, []);

  const handleClickExpandAll = useCallback((event) => {
    setExpandedNodeIds(expandableNodeIds);
  }, [expandableNodeIds]);

  const handleClickCollapseAll = useCallback((event) => {
    setExpandedNodeIds([]);
  }, []);

  const handleClickSelectAll = useCallback((event) => {
    setSelectedNodeIds(allNodes);
  }, [allNodes]);

  const handleClickUnselectAll = useCallback((event) => {
    setSelectedNodeIds([]);
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
          disabled={expandedNodeIds.length === expandableNodeIds.length}
          onClick={handleClickExpandAll}
        >
          Expand all
        </Button>
        <Button
          variant="secondary"
          disabled={expandedNodeIds.length === 0}
          onClick={handleClickCollapseAll}
        >
          Collapse all
        </Button>
        <Button
          variant="secondary"
          disabled={selectedNodeIds.length === allNodes.length}
          onClick={handleClickSelectAll}
        >
          Select all
        </Button>
        <Button
          variant="secondary"
          disabled={selectedNodeIds.length === 0}
          onClick={handleClickUnselectAll}
        >
          Unselect all
        </Button>
      </ButtonGroup>
      <Box
        sx={{
          //minWidth: 160,
          //maxWidth: '40%',
          boxShadow: colorStyle.shadow.thick,
        }}
      >
        <Scrollbar
          height={240}
          overflowY="auto"
        >
          <Tree
            aria-label="controlled"
            isSelectable
            isUnselectable
            multiSelect
            expanded={expandedNodeIds}
            selected={selectedNodeIds}
            onNodeToggle={handleToggle}
            onNodeSelect={handleSelect}
          >
            {ensureArray(treeNodes).map(node => (
              <TreeItemRender
                key={node.id}
                node={node}
              />
            ))}
          </Tree>
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
            {expandedNodeIds.map(nodeId => (
              <Code key={nodeId} whiteSpace="nowrap">
                {treeMap.get(nodeId)?.label}
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
            {selectedNodeIds.map(nodeId => (
              <Code key={nodeId} whiteSpace="nowrap">
                {treeMap.get(nodeId)?.label}
              </Code>
            ))}
          </Flex>
        </Flex>
      </Stack>
    </>
  );
};

export default App;
