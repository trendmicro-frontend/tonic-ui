import { act, screen } from '@testing-library/react';
import { render } from '@tonic-ui/react/test-utils/render';
import { testA11y } from '@tonic-ui/react/test-utils/accessibility';
import {
  Box,
  Flex,
  OverflowTooltip,
  TreeItem,
  TreeItemContent,
  TreeItemToggle,
  TreeItemToggleIcon,
  TreeView,
  useColorStyle,
} from '@tonic-ui/react/src';
import { ensureArray } from 'ensure-type';
import React from 'react';

const getTreeNodes = () => {
  return [
    {
      'id': '1',
      'name': 'Node 1',
      'children': [
        {
          'id': '1.1',
          'name': 'Node 2',
          'children': [
            {
              'id': '1.1.1',
              'name': 'Node 3',
              'children': [
                {
                  'id': '1.1.1.1',
                  'name': 'Node 4'
                }
              ]
            }
          ]
        },
        {
          'id': '1.2',
          'name': 'Node 5',
          'children': [
            {
              'id': '1.2.1',
              'name': 'Node 6'
            }
          ]
        }
      ]
    },
    {
      'id': '2',
      'name': 'Node 7',
      'children': [
        {
          'id': '2.1',
          'name': 'Node 8'
        }
      ]
    },
    {
      'id': '3',
      'name': 'Node 9',
      'children': [
        {
          'id': '3.1',
          'name': 'Node 10'
        }
      ]
    }
  ];
};

const TreeItemRender = ({
  node,
  nodeDepth = 0,
}) => {
  const [colorStyle] = useColorStyle();

  return (
    <TreeItem
      key={node.id}
      nodeId={node.id}
      render={({ isExpandable, isSelected }) => { // eslint-disable-line react/jsx-no-bind
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
                <TreeItemToggle aria-label="toggle">
                  <TreeItemToggleIcon />
                </TreeItemToggle>
              ) : null}
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

describe('TreeView', () => {
  it('should render correctly', async () => {
    const renderOptions = {
      useCSSVariables: true,
    };
    const treeNodes = getTreeNodes();
    const { container } = render((
      <TreeView
        aria-label="tree-view"
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
      </TreeView>
    ), renderOptions);

    const tree = screen.getByRole('tree');
    expect(tree).toHaveAttribute('aria-multiselectable', 'true');

    await testA11y(container);
  });

  it('should call onBlur when the tree is blurred', () => {
    const handleBlur = jest.fn();
    render(
      <TreeView onBlur={handleBlur}>
        <TreeItem nodeId="1" data-testid="treeitem">
          Node 1
        </TreeItem>
      </TreeView>
    );

    act(() => {
      screen.getByRole('tree').focus();
    });
    act(() => {
      screen.getByRole('tree').blur();
    });

    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  it('should call onFocus when the tree is focused', () => {
    const handleFocus = jest.fn();
    render(
      <TreeView onFocus={handleFocus}>
        <TreeItem nodeId="1" data-testid="treeitem">
          Node 1
        </TreeItem>
      </TreeView>
    );

    act(() => {
      screen.getByRole('tree').focus();
    });

    expect(handleFocus).toHaveBeenCalledTimes(1);
  });

  it('should call onKeyDown when a key is pressed', () => {
    // TODO
  });

  it('should call onNodeFocus when a node is focused', () => {
    // TODO
  });

  it('should call onNodeSelect when a node is selected', () => {
    // TODO
  });

  it('should call onNodeToggle when a node is toggled', () => {
    // TODO
  });

  it('should focus the first node when the tree is focused', () => {
  });

  it('should focus the first selectable node when the tree is focused', () => {
    // TODO
  });
});
