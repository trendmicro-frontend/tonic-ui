import {
  Box,
  CircularProgress,
  Divider,
  Flex,
  LinearProgress,
  Stack,
  TextLabel,
  useTheme,
} from '@tonic-ui/react';
const GradientCircularProgress = (props) => {
  const theme = useTheme();
  const stopColors = [
    theme.colors?.['blue:60'],
    theme.colors?.['teal:40'],
  ];

  return (
    <Box>
      <svg width={0} height={0}>
        <defs>
          <linearGradient id="my_linear_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={stopColors[0]} />
            <stop offset="100%" stopColor={stopColors[1]} />
          </linearGradient>
        </defs>
      </svg>
      <CircularProgress
        sx={{
          'svg circle:last-of-type': {
            stroke: 'url(#my_linear_gradient)',
          },
        }}
        {...props}
      />
    </Box>
  );
}

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
        <Box>
          <Flex alignItems="center" height="5x">
            <LinearProgress
              variant="indeterminate"
              color="blue:60"
              width="100%"
            />
          </Flex>
          <Flex alignItems="center" height="5x">
            <LinearProgress
              variant="indeterminate"
              color="teal:40"
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
        <Box>
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
        </Box>
      </Stack>
      <Divider my="4x" />
      <Stack spacing="4x">
        <TextLabel>Gradient</TextLabel>
        <Box>
          <GradientCircularProgress size={80} />
        </Box>
        <Flex alignItems="center" height="5x">
          <LinearProgress
            variant="determinate"
            color={['blue:60', 'teal:40']}
            value={100}
            width="100%"
          />
        </Flex>
      </Stack>
    </Box>
  );
};

export default App;
