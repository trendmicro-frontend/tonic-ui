import { Box, Flex, Text, Truncate } from '@tonic-ui/react';
import React from 'react';

const Light = ({ on, ...rest }) => (
  <Box
    display="inline-block"
    borderRadius="50%"
    bg={on ? '#00ff00' : '#666'}
    boxShadow={on ? '0 0 1px 2px rgba(0, 255, 0, .8)' : 'none'}
    height={16}
    width={16}
    verticalAlign="middle"
    {...rest}
  />
);

const FormulaOne = () => {
  const laneColor = {
    1: '#389efc',
    2: '#ff7332',
    3: '#00b449',
    4: '#fdf133',
    5: '#fc74cf',
  };

  const players = [
    { id: '240', lane: 1, name: 'Taiwan Leave System', laps: 2, raceTime: '01:20.592', gates: [1, 1, 1] },
    { id: '339', lane: 2, name: '404 Not Found', laps: 2, raceTime: '01:24.036', gates: [1, 1, 1] },
    { id: '003', lane: 3, name: 'ShowMeThe$$', laps: 2, raceTime: '01:37.890', gates: [1, 1, 0] },
    { id: '207', lane: 4, name: 'Dragon Rider', laps: 1, raceTime: '00:49.211', gates: [1, 1, 0] },
    { id: '456', lane: 5, name: 'BumbleBee', laps: 0, raceTime: '00:00.000', gates: [1, 1, 1] },
  ];

  return (
    <Box position="relative" mx="auto">
      {players.map((player, index) => (
        <Box
          key={player.id}
          display="flex"
          minWidth={360}
        >
          <Box
            flexBasis="auto"
            flexGrow={0}
            minWidth="2x"
            width="2x"
            bg={laneColor[player.lane]}
          />
          <Box
            bg={index % 2 ? 'gray:100' : 'gray:80'}
            color="white:primary"
            flexBasis={0}
            flexGrow={1}
            maxWidth="calc(100% - .5rem)"
            py="2x"
            px="6x"
          >
            <Box
              display="flex"
              alignItems="flex-end"
            >
              <Box
                flexBasis={0}
                flexGrow={1}
                maxWidth="100%"
              >
                <Text
                  color="#6fffff"
                  fontWeight="bold"
                  fontSize={['4xl', null, null, 48]}
                  lineHeights={['4xl', null, null, '1.5']}
                >
                  {player.id}
                </Text>
              </Box>
              <Box
                flexBasis="auto"
                flexGrow={0}
                width="auto"
              >
                <Text
                  fontSize={['3xl', null, null, '4xl']}
                  lineHeight={['3xl', null, null, '4xl']}
                >
                  {player.laps} / {player.raceTime}
                </Text>
              </Box>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              pt="2x"
            >
              <Box
                flexBasis={0}
                flexGrow={1}
                maxWidth="100%"
                width={0}
              >
                <Truncate>
                  <Text
                    fontSize={['2xl', null, null, '3xl']}
                    lineHeight={['2xl', null, null, '3xl']}
                  >
                    {player.name}
                  </Text>
                </Truncate>
              </Box>
              <Flex
                flexBasis="auto"
                flexGrow={0}
                width="auto"
                fontSize={['xl', null, null, '2xl']}
                lineHeight={['xl', null, null, '2xl']}
              >
                <Light on={player.gates[0]} m="2x" />
                <Text pr="2x">REC</Text>
                <Light on={player.gates[1]} m="2x" />
                <Text pr="2x">A</Text>
                <Light on={player.gates[2]} m="2x" />
                <Text pr="2x">B</Text>
              </Flex>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default FormulaOne;
