import { Flex, Grid, Text } from '@tonic-ui/react';

const App = () => {
  const backgroundColor = 'background.high';
  const color = 'text.secondary';
  const directions = ['down', 'up', 'left', 'right'];
  const levels = ['low', 'medium', 'high'];

  return (
    <Flex flexDirection="column" rowGap="8x">
      {directions.map(direction => (
        <Flex key={direction} flexDirection="column" rowGap="2x">
          <Text fontSize="sm" lineHeight="sm" color="text.tertiary" textTransform="capitalize">
            {direction}
          </Text>
          <Grid templateColumns="repeat(3, 1fr)" gap="6x">
            {levels.map(level => (
              <Flex
                key={`${direction}-${level}`}
                width={256}
                height={128}
                backgroundColor={backgroundColor}
                color={color}
                boxShadow={`${direction}.${level}`}
                alignItems="center"
                justifyContent="center"
              >
                <Text fontSize="md" lineHeight="md">
                  {level}
                </Text>
              </Flex>
            ))}
          </Grid>
        </Flex>
      ))}
    </Flex>
  );
};

export default App;
