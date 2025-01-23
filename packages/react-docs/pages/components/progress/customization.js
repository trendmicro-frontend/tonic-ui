import {
  Box,
  CircularProgress,
  Divider,
  Flex,
  LinearProgress,
  Stack,
  TextLabel,
} from '@tonic-ui/react';
import React from 'react';

const App = () => {
  const width = 320;

  return (
    <Stack width={width}>
      <TextLabel>Indeterminate</TextLabel>
      <Box
        sx={{
          display: 'inline-flex',
          columnGap: '5x',
          my: '4x',
        }}
      >
        <Box
          sx={{
            flex: 'none',
            position: 'relative',
          }}
        >
          <CircularProgress
            variant="indeterminate"
            color="blue:60"
            size={80}
            thickness={4}
          />
        </Box>
        <Box
          sx={{
            flex: 'none',
            position: 'relative',
          }}
        >
          <CircularProgress
            variant="indeterminate"
            color="teal:40"
            size={80}
            thickness={4}
          />
        </Box>
      </Box>
      <Box mb="4x">
        <LinearProgress
          variant="indeterminate"
          color="blue:60"
          width="100%"
        />
      </Box>
      <Box mb="4x">
        <LinearProgress
          variant="indeterminate"
          color="teal:40"
          width="100%"
        />
      </Box>
      <Divider my="4x" />
      <TextLabel>Determinate</TextLabel>
      <Box
        sx={{
          display: 'inline-flex',
          columnGap: '5x',
          my: '4x',
        }}
      >
        <Box
          sx={{
            flex: 'none',
            position: 'relative',
          }}
        >
          <CircularProgress
            variant="determinate"
            color="blue:60"
            value={40}
            size={80}
          />
          <Box
            sx={{
              inset: 0,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <TextLabel>40%</TextLabel>
          </Box>
        </Box>
        <Box
          sx={{
            flex: 'none',
            position: 'relative',
          }}
        >
          <CircularProgress
            variant="determinate"
            color="teal:40"
            value={60}
            size={80}
          />
          <Box
            sx={{
              inset: 0,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <TextLabel>60%</TextLabel>
          </Box>
        </Box>
      </Box>
      <Flex alignItems="center" columnGap="3x">
        <LinearProgress
          variant="determinate"
          color="blue:60"
          value={40}
          width="100%"
        />
        <TextLabel>40%</TextLabel>
      </Flex>
      <Flex alignItems="center" columnGap="3x">
        <LinearProgress
          variant="determinate"
          color="teal:40"
          value={60}
          width="100%"
        />
        <TextLabel>60%</TextLabel>
      </Flex>
      <Divider my="4x" />
      <TextLabel>Linear gradient</TextLabel>
      <Flex
        sx={{
          alignItems: 'center',
          columnGap: '2x',
          justifyContent: 'space-between',
          my: '4x',
        }}
      >
        <Box
          sx={{
            backgroundColor: 'blue:60',
            px: '2x',
            py: '1x',
            color: 'white:primary',
          }} 
        >
          blue:60
        </Box>
        <Box
          sx={{
            backgroundColor: 'teal:40',
            px: '2x',
            py: '1x',
            color: 'black:primary',
          }} 
        >
          teal:40
        </Box>
      </Flex>
      <Flex
        sx={{
          alignItems: 'center',
          columnGap: '3x',
          my: '4x',
        }}
      >
        <LinearProgress
          variant="determinate"
          color={['blue:60', 'teal:40']}
          value={100}
          width="100%"
        />
        <TextLabel>100%</TextLabel>
      </Flex>
      <Divider my="4x" />
      <TextLabel>Linear gradient with wave light</TextLabel>
      <Flex
        sx={{
          alignItems: 'center',
          columnGap: '3x',
          my: '4x',
        }}
      >
        <LinearProgress
          variant="determinate"
          color="linear-gradient(90deg, rgba(255, 255, 255, 0) 6.03%, rgba(255, 255, 255, 0.12) 16.32%, rgba(255, 255, 255, 0.12) 42.22%, rgba(255, 255, 255, 0) 60.67%), linear-gradient(90deg, #1E5EDE, #04CAA1)"
          value={100}
          width="100%"
        />
        <TextLabel>100%</TextLabel>
      </Flex>
    </Stack>
  );
};

export default App;
