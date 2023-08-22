import {
  Box,
  Code,
  Flex,
  Icon,
  ResizeHandle,
  Scrollbar,
  useColorMode,
  useColorStyle,
} from '@tonic-ui/react';
import {
  useConst,
} from '@tonic-ui/react-hooks';
import { ensureArray } from 'ensure-type';
import _ from 'lodash';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { DndProvider, useDragLayer } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import templateTreeNodes from './data/tree-nodes.json';
import DndTable from './dnd-table';
import DndTree from './dnd-tree';
import {
  buildTreeMap,
} from './utils';

const buildTreeNodes = (source) => {
  const threatTypes = [
    'Virus/Malware',
    'Spyware/Grayware',
    'URL Filtering',
    'Web Reputation',
    'Network Virus',
    'Application Control',
  ];

  const traverse = (nodes) => {
    ensureArray(nodes).map(node => {
      node.parent = node.parent ?? null;
      node.children = ensureArray(node.children).map(child => {
        child.parent = node;
        return child;
      });
      node.data = {
        data: _.range(15).map((i) => {
          const [nodeIndex = ''] = ensureArray(String(node.name).match(/\d+/));

          const endpoint = `Endpoint ${nodeIndex}_${i+1}`;

          // Randomly pick a subset of threat types
          const detections = _.sampleSize(threatTypes, _.random(0, threatTypes.length));

          // Generate a random date within the past 30 days
          const lastSeen = new Date(Date.now() - _.random(0, 60 * 60 * 24 * 30 * 1000));

          return {
            id: `${node.id}_${i+1}`,
            endpoint,
            detections,
            lastSeen,
          };
        }),
      };

      traverse(node.children);
    });
  };

  const treeNodes = JSON.parse(JSON.stringify(source));
  traverse(treeNodes);

  return treeNodes;
};

const useRefresh = () => {
  const [, rerender] = useState();
  return useCallback(() => {
    rerender({});
  }, []);
};

const CustomDragLayer = ({
  children,
}) => {
  const context = useDragLayer((monitor) => ({
    isDragging: monitor.isDragging(),
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialSourceClientOffset: monitor.getInitialSourceClientOffset(),
    sourceClientOffset: monitor.getSourceClientOffset(),
  }));

  const { isDragging, initialSourceClientOffset, sourceClientOffset } = context;
  if (!isDragging) {
    return null;
  }

  return (
    <Box
      sx={{
        pointerEvents: 'none',
        position: 'fixed',
        inset: 0,
        zIndex: 'fixed',
      }}
    >
      <Box
        style={{
          display: (!initialSourceClientOffset || !sourceClientOffset) ? 'none' : 'block',
          transform: `translate(${sourceClientOffset.x}px, ${sourceClientOffset.y}px)`,
        }}
      >
        {typeof children === 'function' ? children(context) : children}
      </Box>
    </Box>
  );
};

const App = () => {
  const treeNodes = useConst(() => buildTreeNodes(templateTreeNodes));
  const treeMap = useMemo(() => {
    return buildTreeMap(treeNodes);
  }, [treeNodes]);
  const refresh = useRefresh();
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
  const [selectedNodeId, setSelectedNodeId] = useState(ensureArray(treeNodes)[0]?.id);
  const tableData = treeMap.get(selectedNodeId)?.data?.data;
  const handleNodeDrop = useCallback((context) => {
    const { source, target, data } = context;

    const sourceNode = treeMap.get(source);
    const targetNode = treeMap.get(target);

    const movedData = sourceNode.data.data.filter(x => _.includes(data, x.id));

    sourceNode.data.data = _.differenceBy(sourceNode.data.data, movedData, 'id');
    targetNode.data.data = _.uniqBy([
      ...ensureArray(targetNode.data.data),
      ...movedData,
    ], 'id');

    // Force re-render
    refresh();
  }, [refresh, treeMap]);
  const handleNodeSelect = useCallback((nodeIds) => {
    setSelectedNodeId(nodeIds[0]);
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <CustomDragLayer>
        {({ item }) => {
          // Custom drag layer is not rendered when nothing is being dragged
          const movedItemCount = ensureArray(item.data).length;
          return (
            <Flex alignItems="center" columnGap="1x">
              <Icon icon="file-arrow-o" />
              <Code>{movedItemCount}</Code>
            </Flex>
          );
        }}
      </CustomDragLayer>
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
            height="100%"
            overflowX="hidden"
            overflowY="auto"
          >
            <DndTree
              data={treeNodes}
              onNodeDrop={handleNodeDrop}
              onNodeSelect={handleNodeSelect}
            />
          </Scrollbar>
        </Box>
        <Flex
          sx={{
            flex: 'auto',
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
              zIndex: 1,
            }}
          />
          <DndTable
            key={selectedNodeId} // Force re-render when selected node changes
            node={treeMap.get(selectedNodeId)}
            data={tableData}
            width="100%"
          />
        </Flex>
      </Flex>
    </DndProvider>
  );
};

export default App;
