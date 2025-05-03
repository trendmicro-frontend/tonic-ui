import { Box, Button, Flex, Grid } from '@tonic-ui/react';
import React, { forwardRef } from 'react';
import { AccessibleButton } from '@/experiments/accessible-button';
import { MutedText } from '@/experiments/muted-text';

function createVariantButton(variant) {
  return forwardRef(function VariantButton(props, ref) {
    const Component = forwardRef(function InnerComponent(innerProps, innerRef) {
      return <Button as={Box} ref={innerRef} variant={variant} {...innerProps} />;
    });

    return <AccessibleButton as={Component} ref={ref} {...props} />;
  });
}

const DefaultButton = createVariantButton('default');
const PrimaryButton = createVariantButton('primary');

const App = () => {
  const handleClickDefaultButton = (event) => {
    console.log('Clicked Button (variant="default"):', event);
  };
  const handleClickPrimaryButton = (event) => {
    console.log('Clicked Button (variant="primary"):', event);
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
        <DefaultButton onClick={handleClickDefaultButton}>
          Default Button
        </DefaultButton>
        <PrimaryButton onClick={handleClickPrimaryButton}>
          Primary Button
        </PrimaryButton>
        <DefaultButton disabled onClick={handleClickDefaultButton}>
          Default Button
        </DefaultButton>
        <PrimaryButton disabled onClick={handleClickPrimaryButton}>
          Primary Button
        </PrimaryButton>
      </Grid>
    </Flex>
  );
};

export default App;
