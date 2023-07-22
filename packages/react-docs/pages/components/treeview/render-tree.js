import { TreeView, TreeNode, Truncate } from '@tonic-ui/react';
import React from 'react';

const data = {
  id: 'root',
  name: 'Parent',
  children: [
    {
      id: '1',
      name: 'Child 1',
      children: [
        {
          id: '2',
          name: 'Child 2',
          children: [
            {
              id: '3',
              name: 'Child 3',
              children: [
                {
                  id: '4',
                  name: 'Child 4',
                },
              ],
            },
            {
              id: '5',
              name: 'Child 5',
            },
          ],
        },
        {
          id: '6',
          name: 'Child 6',
          children: [
            {
              id: '7',
              name: 'Child 7',
              children: [
                {
                  id: '8',
                  name: 'Child 8',
                },
                {
                  id: '9',
                  name: 'Child 9',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: '10',
      name: 'Child 10',
      children: [
        {
          id: '11',
          name: 'Child 11',
          children: [
            {
              id: '12',
              name: 'Child 12',
            },
          ],
        },
      ],
    },
  ],
};

const renderTree = (node, depth = 0) => {
  const childCount = Array.isArray(node.children) ? node.children.length : 0;

  return (
    <TreeNode
      key={node.id}
      label={<Truncate>{node.name}</Truncate>}
      nodeId={node.id}
    >
      {(childCount > 0)
        ? node.children.map(node => renderTree(node, depth + 1))
        : null
      }
    </TreeNode>
  );
};

const App = () => {
  return (
    <TreeView width={240}>
      {renderTree(data)}
    </TreeView>
  );
};

export default App;
