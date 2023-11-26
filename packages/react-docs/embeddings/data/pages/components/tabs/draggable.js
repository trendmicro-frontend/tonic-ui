import {
  Box,
  Menu,
  MenuList,
  MenuItem,
  MenuToggle,
  MenuToggleIcon,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@tonic-ui/react';
import * as rbd from 'react-beautiful-dnd';
import React, { useState } from 'react';

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const App = () => {
  const [items, setItems] = useState([
    {
      id: 'tab-1',
      label: 'TAB 1',
      content: 'TAB 1',
    },
    {
      id: 'tab-2',
      label: 'TAB 2',
      content: 'TAB 2',
    },
    {
      id: 'tab-3',
      label: 'TAB 3',
      content: 'TAB 3',
      dropdown: {
        items: [
          { id: 'menuitem-1', label: 'Menu Item 1' },
          { id: 'menuitem-2', label: 'Menu Item 2' },
          { id: 'menuitem-3', label: 'Menu Item 3' },
        ],
      },
    },
  ]);
  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const nextItems = reorder(items, result.source.index, result.destination.index);
    setItems(nextItems);
  };

  return (
    <Tabs
      orientation="horizontal"
    >
      <rbd.DragDropContext
        onDragEnd={onDragEnd}
      >
        <rbd.Droppable
          droppableId="droppable"
          direction="horizontal"
        >
          {(droppableProvided, droppableSnapshot) => (
            <TabList
              ref={droppableProvided.innerRef}
              {...droppableProvided.droppableProps}
            >
              {items.map((item, index) => (
                <rbd.Draggable
                  key={item.id}
                  draggableId={item.id}
                  index={index}
                >
                  {(draggableProvided, draggableSnapshot) => (
                    <Box
                      ref={draggableProvided.innerRef}
                      {...draggableProvided.draggableProps}
                      {...draggableProvided.dragHandleProps}
                      style={{
                        ...draggableProvided.draggableProps.style,
                      }}
                    >
                      {!item.dropdown && (
                        <Tab as={Box} index={index}>
                          {item.label}
                        </Tab>
                      )}
                      {item.dropdown && (
                        <Tab
                          as={Box}
                          onClick={(event) => {
                            const value = event.target.getAttribute('value');
                            if (!value) {
                              event.preventDefault();
                              return;
                            }
                            console.log('Menu Item ' + value + ' clicked');
                          }}
                        >
                          <Menu offset={[-14, 10]}>
                            <MenuToggle
                              as={Box}
                              alignItems="center"
                              columnGap="1x"
                            >
                              <Text>{item.label}</Text>
                              <MenuToggleIcon />
                            </MenuToggle>
                            <MenuList
                              width="max-content"
                            >
                              {item.dropdown.items.map(x => (
                                <MenuItem key={x.id} value={x.id}>
                                  {x.label}
                                </MenuItem>
                              ))}
                            </MenuList>
                          </Menu>
                        </Tab>
                      )}
                    </Box>
                  )}
                </rbd.Draggable>
              ))}
              {droppableProvided.placeholder}
            </TabList>
          )}
        </rbd.Droppable>
      </rbd.DragDropContext>
      <TabPanels px="3x" py="2x">
        {items.map((item, index) => (
          <TabPanel
            key={item.id}
            index={index}
          >
            {item.content}
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};

export default App;
