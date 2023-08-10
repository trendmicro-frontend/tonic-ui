import {
  Box,
  Flex,
  Icon,
  OverflowTooltip,
  ResizeHandle,
  Scrollbar,
  TreeView,
  TreeNode,
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

const renderTreeNodes = (nodes, depth = 0) => {
  return ensureArray(nodes).map(node => {
    const childCount = Array.isArray(node.children) ? node.children.length : 0;

    return (
      <TreeNode
        key={node.id}
        nodeId={node.id}
        render={({ isExpanded }) => {
          const icon = (() => {
            if (childCount > 0) {
              return isExpanded ? 'folder-open' : 'folder';
            }
            return 'server';
          })();
          const iconColor = (childCount > 0) ? 'yellow:50' : 'currentColor';

          return (
            <>
              <Icon icon={icon} color={iconColor} mr="2x" />
              <OverflowTooltip label={node.name}>
                {node.name}
              </OverflowTooltip>
            </>
          );
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
          width: 240,
        }}
      >
        <Scrollbar
          height={240}
          overflowX="hidden"
          overflowY="scroll"
        >
          <TreeView
            aria-label="basic tree view"
            defaultExpandedNodes={expandableNodes}
            isSelectable
            selectedNodes={selectedNodes}
            onNodeSelect={handleSelect}
          >
            {renderTreeNodes(treeNodes)}
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
