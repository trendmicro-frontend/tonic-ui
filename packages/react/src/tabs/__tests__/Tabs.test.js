import { render } from '@tonic-ui/react/test-utils/render';
import { testA11y } from '@tonic-ui/react/test-utils/accessibility';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@tonic-ui/react/src';
import React from 'react';

describe('Tabs', () => {
  it('should render correctly', async () => {
    const renderOptions = {
      useCSSVariables: true,
    };
    const { container } = render((
      <Tabs>
        <TabList>
          <Tab>TAB 1</Tab>
          <Tab>TAB 2</Tab>
          <Tab disabled>TAB 3</Tab>
        </TabList>
        <TabPanels px="3x" py="2x">
          <TabPanel>
            Tab Panel 1
          </TabPanel>
          <TabPanel>
            Tab Panel 2
          </TabPanel>
          <TabPanel>
            Tab Panel 3
          </TabPanel>
        </TabPanels>
      </Tabs>
    ), renderOptions);

    expect(container).toMatchSnapshot();

    await testA11y(container);
  });
});
