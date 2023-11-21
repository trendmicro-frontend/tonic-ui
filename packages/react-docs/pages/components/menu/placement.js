import { Box, Button, Flex, Grid, Menu, MenuButton, MenuItem, MenuList, Text } from '@tonic-ui/react';
import React, { useState } from 'react';

const useSelection = (defaultValue) => {
  const [value, setValue] = useState(defaultValue);
  const changeBy = (value) => () => setValue(value);
  return [value, changeBy];
};

const gridAreas = [
  ['top-start', 'top', 'top-end'],
  ['.', '.', '.'],
  ['.', 'center', '.'],
  ['.', '.', '.'],
  ['bottom-start', 'bottom', 'bottom-end'],
];

const App = () => {
  const [placement, changePlacementBy] = useSelection('bottom-start');
  const gridTemplateAreas = gridAreas.map((row) => {
    const rowString = '"' + row.join(' ') + '"';
    return rowString;
  }).join(' ');

  return (
    <Flex>
      <Grid
        templateAreas={gridTemplateAreas}
        autoColumns="minmax(0, 1fr)"
        autoFlow="row"
        gap="2x"
      >
        {gridAreas.flat().map((value, key) => {
          if (value === '.') {
            return (<Box key={key} />);
          }

          if (value === 'center') {
            return (
              <Box key={key}>
                <Menu placement={placement}>
                  <MenuButton variant="secondary" width={150}>
                    <Text>Options</Text>
                  </MenuButton>
                  <MenuList>
                    <MenuItem>
                      List item 1
                    </MenuItem>
                    <MenuItem>
                      List item 2
                    </MenuItem>
                    <MenuItem>
                      List item 3
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Box>
            );
          }

          const changePlacement = changePlacementBy(value);
          const onClick = () => {
            changePlacement();
          };

          return (
            <Box key={key}>
              <Button
                selected={value === placement}
                onClick={onClick}
                width="100%"
              >
                {value}
              </Button>
            </Box>
          );
        })}
      </Grid>
    </Flex>
  );
};

export default App;
