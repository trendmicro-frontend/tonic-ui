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
  TreeItemToggle,
  TreeItemToggleIcon,
  TreeView,
  useColorStyle,
} from '@tonic-ui/react';
import { ensureArray } from 'ensure-type';
import React from 'react';
import treeNodes from './data/tree-nodes.json';
import { findExpandableNodeIds } from './utils';

const expandableNodeIds = findExpandableNodeIds(treeNodes);

const TreeItemRender = ({
  depth = 0,
  node,
  ...rest
}) => {
  const [colorStyle] = useColorStyle();

  return (
    <TreeItem
      key={node.id}
      nodeId={node.id}
      render={({ isExpandable, isSelected }) => (
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
                PopperProps={{
                  usePortal: true,
                }}
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
        </>
      )}
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

  return (
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
          aria-label="basic tree view"
          defaultExpandedNodes={expandableNodeIds}
          isSelectable
          isUnselectable
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
  );
};

export default App;
