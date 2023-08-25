import {
  Box,
  Flex,
  Icon,
  Menu,
  MenuItem,
  MenuList,
  MenuToggle,
  OverflowTooltip,
  Scrollbar,
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

  const render = useCallback(({ isExpandable, isExpanded, isSelected }) => {
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
        <Flex
          flex="none"
          ml="2x"
        >
          <Menu>
            <MenuToggle
              onClick={(event) => {
                // Uncomment the following line to prevent the tree node from being selected
                //event.stopPropagation();
              }}
              sx={{
                color: colorStyle.color.secondary,
                ':hover': {
                  color: colorStyle.color.info,
                },
              }}
            >
              <Icon icon="more" />
            </MenuToggle>
            <MenuList
              width="max-content"
            >
              <MenuItem>
                <Flex alignItems="center" columnGap="2x">
                  <Icon icon="edit" /> List item
                </Flex>
              </MenuItem>
              <MenuItem>
                <Flex alignItems="center" columnGap="2x">
                  <Icon icon="edit" /> List item
                </Flex>
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
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
          aria-label="dropdown"
          defaultExpanded={expandableNodeIds}
          isSelectable
          isUnselectable
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
