import {
  Box,
  CircularProgress,
  Divider,
  Flex,
  LinearProgress,
  Stack,
  TextLabel,
} from '@tonic-ui/react';

const App = () => {
  const width = 320;

  return (
    <Box width={width}>
      <Stack spacing="4x">
        <TextLabel>Indeterminate</TextLabel>
        <Box
          sx={{
            display: 'inline-flex',
            columnGap: '5x',
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
              color="teal.400"
              size={80}
              thickness={4}
            />
          </Box>
        </Box>
        <Box>
          <Flex alignItems="center" height="5x">
            <LinearProgress
              variant="indeterminate"
              width="100%"
            />
          </Flex>
          <Flex alignItems="center" height="5x">
            <LinearProgress
              variant="indeterminate"
              color="teal.400"
              width="100%"
            />
          </Flex>
        </Box>
      </Stack>
      <Divider my="4x" />
      <Stack spacing="4x">
        <TextLabel>Determinate</TextLabel>
        <Box
          sx={{
            display: 'inline-flex',
            columnGap: '5x',
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
              color="teal.400"
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
        <Box>
          <Flex alignItems="center" columnGap="3x">
            <LinearProgress
              variant="determinate"
              value={40}
              width="100%"
            />
            <TextLabel>40%</TextLabel>
          </Flex>
          <Flex alignItems="center" columnGap="3x">
            <LinearProgress
              variant="determinate"
              color="teal.400"
              value={60}
              width="100%"
            />
            <TextLabel>60%</TextLabel>
          </Flex>
        </Box>
      </Stack>
    </Box>
  );
};

export default App;
