import {
  Box,
  Checkbox,
  Flex,
  Icon,
  OverflowTooltip,
  Scrollbar,
  TreeItem,
  TreeItemContent,
  TreeItemToggle,
  TreeItemToggleIcon,
  Tree,
  useColorStyle,
  useTree,
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
import React, { useCallback, useMemo } from 'react';
import {
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
  const { multiSelect } = useTree();

  const render = useCallback(({
    isExpandable,
    isExpanded,
    isSelected,
    select,
    selectRange,
    toggleSelection,
  }) => {
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
        onClick={(event) => {
          // Prevent default event handler to manage tree item selection
          event.preventDefault();

          const isCtrlPressed = event.ctrlKey;
          const isMetaPressed = event.metaKey;
          const isShiftPressed = event.shiftKey;

          if (multiSelect && isShiftPressed) {
            selectRange();
            return;
          }

          if (multiSelect && (isCtrlPressed || isMetaPressed)) {
            toggleSelection();
            return;
          }

          if (multiSelect) {
            toggleSelection();
          } else {
            select();
          }
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
          mr="2x"
        >
          <Checkbox
            checked={isSelected}
            onChange={event => {
              // Prevent default event handler to manage tree item selection
              event.preventDefault();

              toggleSelection();
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
  }, [colorStyle, multiSelect, nodeDepth, nodeLabel]);

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
  const expandableNodeIds = useMemo(() => findExpandableNodeIds(treeNodes), [treeNodes]);

  return (
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
          aria-label="multi-selection with checkboxes"
          defaultExpanded={expandableNodeIds}
          isSelectable
          isUnselectable
          multiSelect
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
  );
};

export default App;
