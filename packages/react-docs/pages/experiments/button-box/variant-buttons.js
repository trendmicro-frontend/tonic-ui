import { Box, Button, Flex, Grid } from '@tonic-ui/react';
import React, { Fragment, forwardRef } from 'react';
import { MutedText } from '@/experiments/muted-text';
import { createVariantButtonBox } from './utils';

const EmphasisButtonBox = createVariantButtonBox('emphasis');
const PrimaryButtonBox = createVariantButtonBox('primary');
const DefaultButtonBox = createVariantButtonBox('default');
const SecondaryButtonBox = createVariantButtonBox('secondary');
const GhostButtonBox = createVariantButtonBox('ghost');

const ButtonBoxes = [
  EmphasisButtonBox,
  PrimaryButtonBox,
  DefaultButtonBox,
  SecondaryButtonBox,
  GhostButtonBox,
];

const App = () => {
  const handleClickBy = (name) => (event) => {
    console.log(`Clicked ${name}:`, event);
  };

  return (
    <Flex>
      <Grid
        templateColumns="1fr 1fr"
        columnGap="2x"
        rowGap="4x"
      >
        <MutedText>Normal</MutedText>
        <MutedText>Disabled</MutedText>
        {ButtonBoxes.map(ButtonBox => {
          const displayName = ButtonBox.displayName;
          return (
            <Fragment key={displayName}>
              <ButtonBox onClick={handleClickBy(displayName)}>
                {displayName}
              </ButtonBox>
              <ButtonBox disabled onClick={handleClickBy(displayName)}>
                {displayName}
              </ButtonBox>
            </Fragment>
          );
        })}
      </Grid>
    </Flex>
  );
};

export default App;
