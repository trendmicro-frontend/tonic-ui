import {
  Box,
  Flex,
  Icon,
  OverflowTooltip,
  ResizeHandle,
  Scrollbar,
  TreeItem,
  TreeItemContent,
  TreeItemToggle,
  TreeItemToggleIcon,
  TreeView,
  useColorMode,
  useColorStyle,
} from '@tonic-ui/react';
import { ensureArray } from 'ensure-type';
import React, { useCallback, useRef, useState } from 'react';
import treeNodes from './data/tree-nodes.json';
import {
  buildTreeMap,
  findExpandableNodeIds,
} from './utils';

const treeMap = buildTreeMap(treeNodes);
const expandableNodes = findExpandableNodeIds(treeNodes);
const allNodes = Array.from(treeMap.keys());
const defaultSelectedNode = allNodes[0];

const TreeItemRender = ({
  node,
  nodeDepth = 0,
}) => {
  const [colorStyle] = useColorStyle();

  return (
    <TreeItem
      key={node.id}
      nodeId={node.id}
      render={({ isExpandable, isExpanded, isSelected }) => {
        const icon = (() => {
          if (isExpandable) {
            return isExpanded ? 'folder-open' : 'folder';
          }
          return 'server';
        })();
        const iconColor = isExpandable ? 'yellow:50' : 'currentColor';

        return (
          <TreeItemContent
            sx={{
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
          </TreeItemContent>
        );
      }}
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
  const [isResizing, setIsResizing] = useState(false);
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle();
  const dividerColor = {
    dark: 'gray:70',
    light: 'gray:30',
  }[colorMode];
  const highlightedDividerColor = {
    dark: 'gray:50',
    light: 'gray:50',
  }[colorMode];
  const containerRef = useRef();
  const resizableRef = useRef();
  const [selectedNodes, setSelectedNodes] = useState([defaultSelectedNode]);
  const handleSelect = useCallback((nodeIds) => {
    setSelectedNodes(nodeIds);
  }, []);

  return (
    <Flex
      ref={containerRef}
      sx={{
        boxShadow: colorStyle.shadow.thick,
        cursor: isResizing ? 'col-resize' : 'default',
      }}
    >
      <Box
        ref={resizableRef}
        sx={{
          flex: 'none',
          width: 300,
        }}
      >
        <Scrollbar
          height={240}
          overflowX="hidden"
          overflowY="auto"
        >
          <TreeView
            aria-label="resizable"
            defaultExpandedNodes={expandableNodes}
            isSelectable
            isUnselectable={false}
            selectedNodes={selectedNodes}
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
      <Flex
        sx={{
          flex: 'auto',
          px: '3x',
          py: '2x',
          position: 'relative',
        }}
      >
        <ResizeHandle
          onResizeStart={() => {
            setIsResizing(true);
          }}
          onResizeEnd={() => {
            setIsResizing(false);
          }}
          onResize={({ clientX }) => {
            const el = resizableRef.current;
            if (!el) {
              return;
            }

            const { left: parentLeft, width: parentWidth } = containerRef.current.getBoundingClientRect();
            const minWidth = 160;
            const maxWidth = parentWidth * 0.4;
            const canDrag = clientX - parentLeft >= minWidth && clientX - parentLeft <= maxWidth;
            if (canDrag) {
              const nextWidth = clientX - parentLeft;
              el.style.width = `${nextWidth}px`;
            }
          }}
          sx={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            borderLeft: 1,
            borderLeftColor: isResizing ? highlightedDividerColor : dividerColor,
            _hover: {
              borderLeftColor: highlightedDividerColor,
            },
          }}
        />
        <Box>
          {treeMap.get(selectedNodes[0])?.name}
        </Box>
      </Flex>
    </Flex>
  );
};

export default App;
