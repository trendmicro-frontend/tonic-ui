import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Grid,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  LinkButton,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  Text,
} from '@tonic-ui/react';
import { inventoryApi } from '../../../shared/inventory/api.js';

const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: 'auto' });

const formatLastSeen = (minutes) => {
  if (minutes < 1) {
    return 'just now';
  }
  if (minutes < 60) {
    return rtf.format(-minutes, 'minute');
  }
  if (minutes < 1440) {
    return rtf.format(-Math.round(minutes / 60), 'hour');
  }
  return rtf.format(-Math.round(minutes / 1440), 'day');
};

function ComplianceCell({ status }) {
  const COMPLIANCE_COLOR = {
    'Latest version': 'success.text',
    'Controlled latest version': 'success.text',
    'Update recommended': 'warning._onOverlay.text',
    Unknown: 'text.secondary',
  };
  const color = COMPLIANCE_COLOR[status] ?? 'text.primary';
  return <Text sx={{ color }}>{status}</Text>;
}

const columns = [
  { key: 'hostname', label: 'Endpoint name' },
  { key: 'os', label: 'OS' },
  { key: 'lastSeenMinutes', label: 'Last reported' },
  { key: 'agentVersion', label: 'Agent version' },
  { key: 'agentVersionStatus', label: 'Agent version status' },
];

function Inventory() {
  const [rows, setRows] = useState([]);
  const [detailRow, setDetailRow] = useState(null);

  useEffect(() => {
    inventoryApi.getDevices().then(({ items }) => {
      setRows(items);
    });
  }, []);

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', color: 'text.primary' }}>
      <Box sx={{ flex: '1', minHeight: 0, overflowY: 'auto' }}>
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableCell key={col.key} sx={{ whiteSpace: 'nowrap', fontWeight: 'semibold' }}>
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <LinkButton onClick={() => setDetailRow(row)}>
                    {row.hostname}
                  </LinkButton>
                </TableCell>
                <TableCell>{row.os}</TableCell>
                <TableCell>
                  <Text sx={{ color: 'text.secondary' }}>{formatLastSeen(row.lastSeenMinutes)}</Text>
                </TableCell>
                <TableCell>{row.agentVersion}</TableCell>
                <TableCell>
                  <ComplianceCell status={row.agentVersionStatus} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      <Drawer
        isOpen={detailRow !== null}
        isClosable
        closeOnEsc
        closeOnInteractOutside
        onClose={() => setDetailRow(null)}
        size="sm"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>Detail profile</DrawerHeader>
          <DrawerBody>
            {detailRow ? (
              <Grid sx={{ gridTemplateColumns: 'auto 1fr', columnGap: '4x', rowGap: '2x' }}>
                <Text sx={{ color: 'text.secondary' }}>Endpoint name</Text>
                <Text>{detailRow.hostname}</Text>
                <Text sx={{ color: 'text.secondary' }}>OS</Text>
                <Text>{detailRow.os}</Text>
                <Text sx={{ color: 'text.secondary' }}>Agent version status</Text>
                <Text>{detailRow.agentVersionStatus}</Text>
                <Text sx={{ color: 'text.secondary' }}>Agent version</Text>
                <Text>{detailRow.agentVersion}</Text>
                <Text sx={{ color: 'text.secondary' }}>Last reported</Text>
                <Text>{formatLastSeen(detailRow.lastSeenMinutes)}</Text>
              </Grid>
            ) : null}
          </DrawerBody>
          <DrawerFooter>
            <Button variant="primary" onClick={() => setDetailRow(null)}>
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}

function App() {
  return <Inventory />;
}

export default App;
