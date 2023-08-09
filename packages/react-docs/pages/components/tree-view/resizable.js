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
import React, { useRef, useState } from 'react';
import tree from './data/tree.json';
import { findExpandableNodeIds } from './utils';

const expandableNodeIds = findExpandableNodeIds(tree);

const renderTree = (node, depth = 0) => {
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
        ? node.children.map(node => renderTree(node, depth + 1))
        : null
      }
    </TreeNode>
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
  const containerRef = useRef();
  const resizableRef = useRef();

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
            defaultExpandedNodes={expandableNodeIds}
            isSelectable
          >
            {renderTree(tree)}
          </TreeView>
        </Scrollbar>
      </Box>
      <Flex
        sx={{
          flex: 'auto',
          px: '3x',
          py: '2x',
          position: 'relative',
          borderLeft: 1,
          borderLeftColor: dividerColor,
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
            left: -1,
            top: 0,
            bottom: 0,
            zIndex: 1,
          }}
        />
        <Box>
          Page content
        </Box>
      </Flex>
    </Flex>
  );
};

export default App;
