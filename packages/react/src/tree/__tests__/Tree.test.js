/* eslint-disable react/jsx-no-bind */
import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
  Tree,
  useColorStyle,
} from '@tonic-ui/react/src';
import { ensureArray } from 'ensure-type';
import React from 'react';

const buildTreeNodes = () => {
  const treeNodes = [
    {
      'id': '1',
      'name': 'Node 1',
      'children': [
        {
          'id': '2',
          'name': 'Node 2',
          'children': [
            {
              'id': '3',
              'name': 'Node 3',
              'children': [
                {
                  'id': '4',
                  'name': 'Node 4',
                }
              ]
            }
          ]
        },
        {
          'id': '5',
          'name': 'Node 5',
          'children': [
            {
              'id': '6',
              'name': 'Node 6',
            }
          ]
        }
      ]
    },
    {
      'id': '7',
      'name': 'Node 7',
      'children': [
        {
          'id': '8',
          'name': 'Node 8',
        }
      ]
    },
    {
      'id': '9',
      'name': 'Node 9',
      'children': [
        {
          'id': '10',
          'name': 'Node 10',
        }
      ]
    }
  ];

  return treeNodes;
};

const buildTreeMap = (nodes) => {
  const treeMap = new Map();

  const traverse = (nodes) => {
    ensureArray(nodes).forEach((node) => {
      treeMap.set(node.id, node);
      traverse(node.children);
    });
  };

  traverse(nodes);

  return treeMap;
};

const findExpandableNodeIds = (nodes) => {
  const expandableNodeIds = [];

  const traverse = (nodes) => {
    ensureArray(nodes).forEach((node) => {
      if (Array.isArray(node.children) && node.children.length > 0) {
        expandableNodeIds.push(node.id);
        traverse(node.children);
      }
    });
  };

  traverse(nodes);

  return expandableNodeIds;
};

const TreeItemRender = ({
  node,
  nodeDepth = 0,
}) => {
  const [colorStyle] = useColorStyle();

  return (
    <TreeItem
      data-testid={`node-${node.id}`}
      key={node.id}
      nodeId={node.id}
      render={({ isExpandable, isSelected }) => { // eslint-disable-line react/jsx-no-bind
        return (
          <TreeItemContent
            data-testid={`node-${node.id}-content`}
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
                <TreeItemToggle
                  aria-label="toggle"
                  data-testid={`node-${node.id}-toggle`}
                >
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

describe('Tree', () => {
  it('should render correctly', async () => {
    const renderOptions = {
      useCSSVariables: true,
    };
    const treeNodes = buildTreeNodes();
    const treeMap = buildTreeMap(treeNodes);
    const expandableNodeIds = findExpandableNodeIds(treeNodes);
    const allNodeIds = Array.from(treeMap.keys());

    expect(expandableNodeIds).toStrictEqual(['1', '2', '3', '5', '7', '9']);
    expect(allNodeIds).toStrictEqual(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']);

    const { container } = render((
      <Tree
        aria-label="tree"
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
    ), renderOptions);

    expect(screen.getByRole('tree')).toHaveAttribute('aria-multiselectable', 'true');

    await testA11y(container);
  });

  it('should call onBlur when the tree is blurred', () => {
    const handleBlur = jest.fn();
    const treeNodes = buildTreeNodes();

    render(
      <Tree
        onBlur={handleBlur}
      >
        {ensureArray(treeNodes).map(node => (
          <TreeItemRender
            key={node.id}
            node={node}
          />
        ))}
      </Tree>
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
    const treeNodes = buildTreeNodes();

    render(
      <Tree
        onFocus={handleFocus}
      >
        {ensureArray(treeNodes).map(node => (
          <TreeItemRender
            key={node.id}
            node={node}
          />
        ))}
      </Tree>
    );

    act(() => {
      screen.getByRole('tree').focus();
    });

    expect(handleFocus).toHaveBeenCalledTimes(1);
  });

  it('should call onKeyDown when a key is pressed', async () => {
    const user = userEvent.setup();
    const handleKeyDown = jest.fn();
    const treeNodes = buildTreeNodes();

    render(
      <Tree
        onKeyDown={handleKeyDown}
      >
        {ensureArray(treeNodes).map(node => (
          <TreeItemRender
            key={node.id}
            node={node}
          />
        ))}
      </Tree>
    );

    act(() => {
      screen.getByRole('tree').focus();
    });

    await user.keyboard('[Enter]');
    await user.keyboard('[ArrowDown]');
    await user.keyboard('[Space]');

    expect(handleKeyDown).toHaveBeenCalledTimes(3);
  });

  it('should call onNodeFocus when a node is focused', () => {
    const handleNodeFocus = jest.fn();
    const treeNodes = buildTreeNodes();

    render(
      <Tree
        onNodeFocus={handleNodeFocus}
      >
        {ensureArray(treeNodes).map(node => (
          <TreeItemRender
            key={node.id}
            node={node}
          />
        ))}
      </Tree>
    );

    act(() => {
      screen.getByRole('tree').focus();
    });

    expect(handleNodeFocus).toHaveBeenCalledTimes(1);
    expect(handleNodeFocus).toHaveBeenCalledWith('1');
  });

  it('should call onNodeSelect when a node is selected', async () => {
    const user = userEvent.setup();
    const handleNodeSelect = jest.fn();
    const treeNodes = buildTreeNodes();

    render(
      <Tree
        isSelectable
        onNodeSelect={handleNodeSelect}
      >
        {ensureArray(treeNodes).map(node => (
          <TreeItemRender
            key={node.id}
            node={node}
          />
        ))}
      </Tree>
    );

    act(() => {
      screen.getByRole('tree').focus();
    });

    // nodeId="1"
    expect(screen.getByTestId('node-1')).not.toHaveAttribute('aria-selected');
    await user.click(screen.getByTestId('node-1-content'));
    expect(screen.getByTestId('node-1')).toHaveAttribute('aria-selected', 'true');

    // nodeId="7"
    expect(screen.getByTestId('node-7')).not.toHaveAttribute('aria-selected');
    await user.click(screen.getByTestId('node-7-content'));
    expect(screen.getByTestId('node-7')).toHaveAttribute('aria-selected', 'true');

    expect(handleNodeSelect).toHaveBeenCalledTimes(2);
    expect(handleNodeSelect).toHaveBeenNthCalledWith(1, ['1']);
    expect(handleNodeSelect).toHaveBeenNthCalledWith(2, ['7']);
  });

  it('should call onNodeToggle when a node is toggled', async () => {
    const user = userEvent.setup();
    const handleNodeToggle = jest.fn();
    const treeNodes = buildTreeNodes();

    render(
      <Tree
        onNodeToggle={handleNodeToggle}
      >
        {ensureArray(treeNodes).map(node => (
          <TreeItemRender
            key={node.id}
            node={node}
          />
        ))}
      </Tree>
    );

    act(() => {
      screen.getByRole('tree').focus();
    });

    // nodeId="1"
    expect(screen.getByTestId('node-1')).not.toHaveAttribute('aria-expanded');
    await user.click(screen.getByTestId('node-1-toggle'));
    expect(screen.getByTestId('node-1')).toHaveAttribute('aria-expanded', 'true');

    // nodeId="2"
    expect(screen.getByTestId('node-2')).not.toHaveAttribute('aria-expanded');
    await user.click(screen.getByTestId('node-2-toggle'));
    expect(screen.getByTestId('node-2')).toHaveAttribute('aria-expanded', 'true');

    expect(handleNodeToggle).toHaveBeenCalledTimes(2);
    expect(handleNodeToggle).toHaveBeenNthCalledWith(1, ['1']);
    expect(handleNodeToggle).toHaveBeenNthCalledWith(2, ['1', '2']);
  });

  it('should focus the first node if none of the nodes are selected before the tree receives focus', async () => {
    const treeNodes = buildTreeNodes();

    render(
      <Tree
        isSelectable
      >
        {ensureArray(treeNodes).map(node => (
          <TreeItemRender
            key={node.id}
            node={node}
          />
        ))}
      </Tree>
    );

    act(() => {
      screen.getByRole('tree').focus();
    });

    await waitFor(() => expect(screen.getByTestId('node-1-content')).toHaveFocus());
  });

  it('should focus the first selected node if some nodes are selected before the tree receives focus', async () => {
    const treeNodes = buildTreeNodes();
    const selectedNodeIds = ['7', '9'];

    render(
      <Tree
        isSelectable
        selected={selectedNodeIds}
      >
        {ensureArray(treeNodes).map(node => (
          <TreeItemRender
            key={node.id}
            node={node}
          />
        ))}
      </Tree>
    );

    act(() => {
      screen.getByRole('tree').focus();
    });

    await waitFor(() => expect(screen.getByTestId('node-7-content')).toHaveFocus());
  });

  it('should expand or collapse node when `Enter` key is pressed', async () => {
    const user = userEvent.setup();
    const handleKeyDown = jest.fn();
    const treeNodes = buildTreeNodes();

    render(
      <Tree
        onKeyDown={handleKeyDown}
      >
        {ensureArray(treeNodes).map(node => (
          <TreeItemRender
            key={node.id}
            node={node}
          />
        ))}
      </Tree>
    );

    act(() => {
      screen.getByRole('tree').focus();
    });

    expect(screen.getByTestId('node-1')).not.toHaveAttribute('aria-expanded');

    await user.keyboard('[Enter]');
    expect(screen.getByTestId('node-1')).toHaveAttribute('aria-expanded', 'true');

    await user.keyboard('[Enter]');
    expect(screen.getByTestId('node-1')).not.toHaveAttribute('aria-expanded');
  });

  it('should select or unselect node when `Space` key is pressed', async () => {
    const user = userEvent.setup();
    const handleKeyDown = jest.fn();
    const treeNodes = buildTreeNodes();

    render(
      <Tree
        isSelectable
        isUnselectable
        onKeyDown={handleKeyDown}
      >
        {ensureArray(treeNodes).map(node => (
          <TreeItemRender
            key={node.id}
            node={node}
          />
        ))}
      </Tree>
    );

    act(() => {
      screen.getByRole('tree').focus();
    });

    expect(screen.getByTestId('node-1')).not.toHaveAttribute('aria-selected');

    await user.keyboard('[Space]');
    expect(screen.getByTestId('node-1')).toHaveAttribute('aria-selected', 'true');

    await user.keyboard('[Space]');
    expect(screen.getByTestId('node-1')).not.toHaveAttribute('aria-selected');
  });

  it('should navigate the tree with specific keys', async () => {
    const user = userEvent.setup();
    const handleKeyDown = jest.fn();
    const treeNodes = buildTreeNodes();

    render(
      <Tree
        isSelectable
        isUnselectable
        multiSelect
        onKeyDown={handleKeyDown}
      >
        {ensureArray(treeNodes).map(node => (
          <TreeItemRender
            key={node.id}
            node={node}
          />
        ))}
      </Tree>
    );

    act(() => {
      screen.getByRole('tree').focus();
    });

    await user.keyboard('[Space]'); // Select node-1
    await user.keyboard('[ArrowRight]'); // Expand node-1
    await user.keyboard('[ArrowDown]'); // Focus node-2
    await user.keyboard('[Space]'); // Select node-2
    await user.keyboard('[ArrowRight]'); // Expand node-2
    await user.keyboard('[ArrowDown]'); // Focus node-3
    await user.keyboard('[Space]'); // Select node-3
    await user.keyboard('[ArrowRight]'); // Expand node-3
    await user.keyboard('[ArrowDown]'); // Focus node-4
    await user.keyboard('[Space]'); // Select node-4
    await user.keyboard('[ArrowUp]'); // Focus node-3
    await user.keyboard('[ArrowLeft]'); // Collapse node-3

    expect(screen.getByTestId('node-1')).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByTestId('node-2')).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByTestId('node-3')).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByTestId('node-4')).toHaveAttribute('aria-selected', 'true');

    expect(screen.getByTestId('node-1')).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByTestId('node-2')).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByTestId('node-3')).not.toHaveAttribute('aria-expanded');

    await user.keyboard('[Home]'); // Focus node-1-content
    await waitFor(() => expect(screen.getByTestId('node-1-content')).toHaveFocus());

    await user.keyboard('[End]'); // Focus node-9-content
    await waitFor(() => expect(screen.getByTestId('node-9-content')).toHaveFocus());

    expect(handleKeyDown).toHaveBeenCalledTimes(14);
  });

  it('should select all nodes when `Ctrl+a` is pressed', async () => {
    const user = userEvent.setup();
    const handleNodeSelect = jest.fn();
    const treeNodes = buildTreeNodes();
    const treeMap = buildTreeMap(treeNodes);
    const expandableNodeIds = findExpandableNodeIds(treeNodes);
    const allNodeIds = Array.from(treeMap.keys());

    render(
      <Tree
        expanded={expandableNodeIds}
        isSelectable
        isUnselectable
        multiSelect
        onNodeSelect={handleNodeSelect}
      >
        {ensureArray(treeNodes).map(node => (
          <TreeItemRender
            key={node.id}
            node={node}
          />
        ))}
      </Tree>
    );

    act(() => {
      screen.getByRole('tree').focus();
    });

    await user.keyboard('{Control>}a{/Control}'); // translates to: Ctrl(down), a, Ctrl(up)
    expect(handleNodeSelect).toHaveBeenCalledTimes(1);
    expect(handleNodeSelect).toHaveBeenLastCalledWith(allNodeIds);
  });

  it('should allow selecting a range of nodes by holding down the `Ctrl` or `Shift` key while clicking with the mouse', async () => {
    const user = userEvent.setup();
    const handleNodeSelect = jest.fn();
    const treeNodes = buildTreeNodes();
    const expandableNodeIds = findExpandableNodeIds(treeNodes);

    render(
      <Tree
        expanded={expandableNodeIds}
        isSelectable
        isUnselectable
        multiSelect
        onNodeSelect={handleNodeSelect}
      >
        {ensureArray(treeNodes).map(node => (
          <TreeItemRender
            key={node.id}
            node={node}
          />
        ))}
      </Tree>
    );

    act(() => {
      screen.getByRole('tree').focus();
    });

    await user.keyboard('{Control>}'); // Press Control key without releasing it
    await user.click(screen.getByTestId('node-1-content'));
    await user.click(screen.getByTestId('node-2-content'));
    await user.click(screen.getByTestId('node-4-content'));
    await user.keyboard('{/Control}'); // Release Control key
    expect(handleNodeSelect).toHaveBeenLastCalledWith(['1', '2', '4']);

    await user.keyboard('{Shift>}'); // Press Shift key without releasing it
    await user.click(screen.getByTestId('node-8-content'));
    await user.keyboard('{/Shift}'); // Release Shift key
    expect(handleNodeSelect).toHaveBeenLastCalledWith(['1', '2', '4', '5', '6', '7', '8']);

    await user.keyboard('{Control>}'); // Press Control key without releasing it
    await user.click(screen.getByTestId('node-6-content'));
    await user.click(screen.getByTestId('node-7-content'));
    await user.keyboard('{/Control}'); // Release Control key
    expect(handleNodeSelect).toHaveBeenLastCalledWith(['1', '2', '4', '5', '8']);

    expect(handleNodeSelect).toHaveBeenCalledTimes(6);
  });

  it('should perform range selection from the last selected node to the first node using the `Ctrl+Shift+Home` shortcut', async () => {
    const user = userEvent.setup();
    const handleNodeSelect = jest.fn();
    const treeNodes = buildTreeNodes();
    const expandableNodeIds = findExpandableNodeIds(treeNodes);

    render(
      <Tree
        expanded={expandableNodeIds}
        isSelectable
        isUnselectable
        multiSelect
        onNodeSelect={handleNodeSelect}
      >
        {ensureArray(treeNodes).map(node => (
          <TreeItemRender
            key={node.id}
            node={node}
          />
        ))}
      </Tree>
    );

    act(() => {
      screen.getByRole('tree').focus();
    });

    await user.click(screen.getByTestId('node-9-content')); // the second to last node
    expect(handleNodeSelect).toHaveBeenLastCalledWith(['9']);

    await user.keyboard('{Control>}{Shift>}{Home}{/Shift}{/Control}');
    expect(handleNodeSelect).toHaveBeenLastCalledWith(['9', '1', '2', '3', '4', '5', '6', '7', '8']);
  });

  it('should perform range selection from the last selected node to the last node using the `Ctrl+Shift+End` shortcut', async () => {
    const user = userEvent.setup();
    const handleNodeSelect = jest.fn();
    const treeNodes = buildTreeNodes();
    const expandableNodeIds = findExpandableNodeIds(treeNodes);

    render(
      <Tree
        expanded={expandableNodeIds}
        isSelectable
        isUnselectable
        multiSelect
        onNodeSelect={handleNodeSelect}
      >
        {ensureArray(treeNodes).map(node => (
          <TreeItemRender
            key={node.id}
            node={node}
          />
        ))}
      </Tree>
    );

    act(() => {
      screen.getByRole('tree').focus();
    });

    await user.click(screen.getByTestId('node-2-content')); // the second node
    expect(handleNodeSelect).toHaveBeenLastCalledWith(['2']);

    await user.keyboard('{Control>}{Shift>}{End}{/Shift}{/Control}');
    expect(handleNodeSelect).toHaveBeenLastCalledWith(['2', '3', '4', '5', '6', '7', '8', '9', '10']);
  });
});
