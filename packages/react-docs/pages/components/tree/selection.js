import {
  Box,
  Flex,
  Icon,
  OverflowTooltip,
  Scrollbar,
  TreeItem,
  TreeItemContent,
  TreeItemToggle,
  TreeItemToggleIcon,
  Tree,
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
import { useCallback, useMemo } from 'react';
import {
  buildTreeNodes,
  findExpandableNodeIds,
} from './utils';

const TreeItemRender = ({
  node,
  nodeDepth = 0,
}) => {
  const nodeId = node.id;
  const nodeLabel = node.label;

  const render = useCallback(({ isExpandable, isExpanded, isSelected }) => {
    const icon = (() => {
      if (isExpandable) {
        return isExpanded ? FolderOpenIcon : FolderIcon;
      }
      return ServerIcon;
    })();
    const iconColor = 'text.primary';

    return (
      <TreeItemContent
        sx={{
          // [Optional] Display a connecting line to indicate which is the last node when hovered over the tree item
          ':hover + [role="group"]': {
            position: 'relative',
            '::before': {
              backgroundColor: 'background.high',
              content: '""',
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 20 + nodeDepth * 24 - (1 / 2), // Adjust the horizontal position based on depth
              width: 1,
            },
          },
        }}
      >
        <Flex
          flex="none"
          width="6x"
        >
          {isExpandable ? (
            <TreeItemToggle>
              <TreeItemToggleIcon />
            </TreeItemToggle>
          ) : null}
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
  }, [nodeDepth, nodeLabel]);

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
  const treeNodes = useConst(() => buildTreeNodes());
  const expandableNodeIds = useMemo(() => findExpandableNodeIds(treeNodes), [treeNodes]);

  return (
    <Box
      sx={{
        // minWidth: 160,
        // maxWidth: '40%',
        boxShadow: 'down.medium',
      }}
    >
      <Scrollbar
        height={240}
        overflowY="auto"
      >
        <Tree
          aria-label="basic tree"
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
