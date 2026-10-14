import { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import { Box, Text, useColorMode } from '@tonic-ui/react';
import { inventoryApi } from '../../../shared/inventory/api.js';

function OSDistributionWidget() {
  const [rows, setRows] = useState([]);
  const [colorMode] = useColorMode();
  const chartRef = useRef(null);

  useEffect(() => {
    inventoryApi.getDevices().then(({ items }) => setRows(items));
  }, []);

  const countsByOsType = rows.reduce((acc, d) => {
    acc[d.osType] = (acc[d.osType] || 0) + 1;
    return acc;
  }, {});

  const data = Object.entries(countsByOsType).map(([name, value]) => ({ name, value }));

  useEffect(() => {
    if (!chartRef.current) {
      return;
    }
    const chart = echarts.init(chartRef.current, colorMode === 'dark' ? 'dark' : null);
    chart.setOption({
      tooltip: { trigger: 'item' },
      legend: {
        orient: 'horizontal',
        bottom: 8,
        padding: [4, 8],
        // Show the device count beside each OS type label, e.g. "Windows (5980)".
        formatter: (name) => `${name} (${(countsByOsType[name] || 0).toLocaleString()})`,
      },
      series: [
        {
          type: 'pie',
          radius: ['38%', '58%'],
          center: ['50%', '42%'],
          data,
        },
      ],
    });
    return () => {
      chart.dispose();
    };
  }, [data, colorMode]);

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
        OS distribution
      </Text>
      <Box ref={chartRef} sx={{ flex: 1, minHeight: 0 }} style={{ width: '100%', height: '100%' }} />
    </Box>
  );
}

function App() {
  return <OSDistributionWidget />;
}

export default App;
