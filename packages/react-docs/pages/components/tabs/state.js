import {
  Box,
  ButtonBase,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@tonic-ui/react';
import React from 'react';

const App = () => {
  return (
    <Tabs defaultIndex={1}>
      {({ index: selectedIndex }) => (
        <>
          <Box mb="2x">
            TAB {selectedIndex} is selected
          </Box>
          <TabList>
            {[1, 2, 3].map(tabIndex => (
              <Tab key={tabIndex} index={tabIndex}>
                {({ getTabProps, disabled, index, isSelected }) => {
                  return (
                    <ButtonBase {...getTabProps()}>
                      TAB {index}
                    </ButtonBase>
                  );
                }}
              </Tab>
            ))}
          </TabList>
          <TabPanels px="3x" py="2x">
            {[1, 2, 3].map(tabPanelIndex => (
              <TabPanel key={tabPanelIndex} index={tabPanelIndex}>
                {({ getTabPanelProps, index, variant }) => {
                  return (
                    <Box {...getTabPanelProps()}>
                      Tab Panel {index}
                    </Box>
                  );
                }}
              </TabPanel>
            ))}
          </TabPanels>
        </>
      )}
    </Tabs>
  );
};

export default App;
