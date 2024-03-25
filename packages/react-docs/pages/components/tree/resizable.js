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
  Tree,
  useColorMode,
  useColorStyle,
} from '@tonic-ui/react';
import {
  useConst,
} from '@tonic-ui/react-hooks';
import {
  FolderIcon,
  FolderOpenIcon,
  ServerIcon,
} from '@tonic-ui/react-icons';
import { ensureArray } from 'ensure-type';
import React, { useCallback, useMemo, useRef, useState } from 'react';
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

  const render = useCallback(({ isExpandable, isExpanded, isSelected }) => {
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
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle();
  const treeNodes = useConst(() => buildTreeNodes());
  const treeMap = useMemo(() => buildTreeMap(treeNodes), [treeNodes]);
  const expandableNodeIds = useMemo(() => findExpandableNodeIds(treeNodes), [treeNodes]);
  const allNodes = useMemo(() => Array.from(treeMap.keys()), [treeMap]);
  const [selectedNodeId, setSelectedNodeId] = useState(allNodes[0]);
  const [isResizing, setIsResizing] = useState(false);
  const containerRef = useRef();
  const resizableRef = useRef();
  const dividerColor = {
    dark: 'gray:70',
    light: 'gray:30',
  }[colorMode];
  const highlightedDividerColor = {
    dark: 'gray:50',
    light: 'gray:50',
  }[colorMode];

  const handleSelect = useCallback((nodeIds) => {
    const nodeId = nodeIds[0];
    setSelectedNodeId(nodeId);
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
          <Tree
            aria-label="resizable"
            defaultExpanded={expandableNodeIds}
            isSelectable
            isUnselectable={false}
            selected={selectedNodeId}
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
          {treeMap.get(selectedNodeId)?.label}
        </Box>
      </Flex>
    </Flex>
  );
};

export default App;
