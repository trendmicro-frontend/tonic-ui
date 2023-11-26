import {
  Flex,
  Text,
  Tree,
  TreeItem,
  TreeItemContent,
  TreeItemToggle,
  TreeItemToggleIcon,
} from '@tonic-ui/react';
import React from 'react';

const App = () => {
  return (
    <Tree defaultExpanded={['1']}>
      <TreeItem
        nodeId="1"
        render={({ isExpandable }) => (
          <TreeItemContent>
            <Flex flex="none" width="6x">
              {isExpandable && (
                <TreeItemToggle>
                  <TreeItemToggleIcon />
                </TreeItemToggle>
              )}
            </Flex>
            <Text>Node 1</Text>
          </TreeItemContent>
        )}
      >
        <TreeItem
          nodeId="1.1"
          render={() => (
            <TreeItemContent>
              <Flex flex="none" width="6x" />
              <Text>Node 1.1</Text>
            </TreeItemContent>
          )}
        />
      </TreeItem>
      <TreeItem
        nodeId="2"
        render={() => (
          <TreeItemContent>
            <Flex flex="none" width="6x" />
            <Text>Node 2</Text>
          </TreeItemContent>
        )}
      />
    </Tree>
  );
};

export default App;
