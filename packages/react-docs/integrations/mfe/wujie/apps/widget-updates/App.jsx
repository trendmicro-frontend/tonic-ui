import { useEffect, useState } from 'react';
import { Box, Flex, Text } from '@tonic-ui/react';
import { inventoryApi } from '../../../shared/inventory/api.js';

// Urgency order (index 0 = most urgent).
const URGENCY = [
  'Update recommended',
  'Unknown',
  'Controlled latest version',
  'Latest version',
];

// Semantic Tonic color tokens for each status.
const STATUS_COLOR = {
  'Update recommended': 'warning.icon',
  'Unknown': 'neutral.icon',
  'Controlled latest version': 'info.icon',
  'Latest version': 'success.icon',
};

function UpdateRecommendedWidget() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    inventoryApi.getDevices().then(({ items }) => setRows(items));
  }, []);

  const counts = {};
  for (const status of URGENCY) {
    counts[status] = 0;
  }
  for (const d of rows) {
    const s = d.agentVersionStatus;
    if (counts[s] !== undefined) {
      counts[s] += 1;
    }
  }

  const total = rows.length;
  const updateCount = counts['Update recommended'];

  return (
    <Box
      sx={{
        backgroundColor: 'background.primary',
        border: 1,
        borderColor: 'border.secondary',
        borderRadius: 'md',
        px: '4x',
        py: '3x',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Text sx={{ fontSize: 'sm', color: 'text.secondary', mb: '2x' }}>
        Endpoint update status
      </Text>
      <Text sx={{ fontSize: '3xl', fontWeight: 'semibold', color: 'text.primary', lineHeight: 1 }}>
        {updateCount.toLocaleString()}
      </Text>
      <Text sx={{ fontSize: 'sm', color: 'text.secondary', mt: '2x' }}>
        devices need an update
      </Text>
      <Flex sx={{ flex: 1, flexDirection: 'column', justifyContent: 'center', mt: '3x' }}>
        <Flex
          sx={{
            width: '100%',
            height: '10px',
            borderRadius: 'full',
            overflow: 'hidden',
            mb: '3x',
          }}
        >
          {URGENCY.map((status) => {
            const pct = total > 0 ? (counts[status] / total) * 100 : 0;
            if (pct === 0) {
              return null;
            }
            return (
              <Box
                key={status}
                sx={{ width: `${pct}%`, height: '100%', backgroundColor: STATUS_COLOR[status] }}
              />
            );
          })}
        </Flex>
        <Flex sx={{ flexDirection: 'column', rowGap: '1x' }}>
          {URGENCY.map((status) => (
            <Flex key={status} sx={{ alignItems: 'center', columnGap: '2x' }}>
              <Box
                sx={{
                  width: '8px',
                  height: '8px',
                  borderRadius: 'full',
                  flexShrink: 0,
                  backgroundColor: STATUS_COLOR[status],
                }}
              />
              <Text sx={{ fontSize: 'xs', color: 'text.secondary', flex: 1 }}>{status}</Text>
              <Text sx={{ fontSize: 'xs', color: 'text.primary', fontWeight: 'medium' }}>
                {counts[status].toLocaleString()}
              </Text>
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Box>
  );
}

function App() {
  return <UpdateRecommendedWidget />;
}

export default App;
