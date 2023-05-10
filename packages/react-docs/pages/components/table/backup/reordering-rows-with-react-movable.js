import {
  Table,
  TableHeader,
  TableHeaderRow,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  useColorMode,
} from '@tonic-ui/react';
import React, { useState } from 'react';
import { List, arrayMove } from 'react-movable';

const App = () => {
  const { colorMode } = useColorMode();
  const tableProps = {
    'dark': {
      backgroundColor: 'gray:80',
    },
    'light': {
      backgroundColor: 'gray:10',
    }
  }[colorMode];
  const rowProps = {
    'dark': {
      backgroundColor: 'gray:100',
    },
    'light': {
      backgroundColor: 'white',
    },
  }[colorMode];

  const [items, setItems] = useState([
    { id: 1, eventType: 'Virus/Malware', affectedDevices: 20, detections: 634 },
    { id: 2, eventType: 'Spyware/Grayware', affectedDevices: 20, detections: 634 },
    { id: 3, eventType: 'URL Filtering', affectedDevices: 15, detections: 598 },
    { id: 4, eventType: 'Web Reputation', affectedDevices: 15, detections: 598 },
    { id: 5, eventType: 'Network Virus', affectedDevices: 15, detections: 497 },
    { id: 6, eventType: 'Application Control', affectedDevices: 0, detections: 0 }
  ]);

  return (
    <List
      values={items}
      onChange={({ oldIndex, newIndex }) =>
        setItems(arrayMove(items, oldIndex, newIndex))
      }
      renderList={({ children, props, isDragged }) => (
        <Table
          {...tableProps}
          style={{
            cursor: isDragged ? 'grabbing' : undefined,
          }}
        >
          <TableHeader>
            <TableHeaderRow
              {...rowProps}
            >
              <TableHeaderCell width="240px">Event Type</TableHeaderCell>
              <TableHeaderCell width="150px" textAlign="right">Affected Devices</TableHeaderCell>
              <TableHeaderCell width="150px" textAlign="right">Detections</TableHeaderCell>
            </TableHeaderRow>
          </TableHeader>
          <TableBody {...props}>{children}</TableBody>
        </Table>
      )}
      renderItem={({ value, props, isDragged, isSelected }) => {
        const row = (
          <TableRow
            {...props}
            {...rowProps}
            style={{
              ...props.style,
              cursor: isDragged ? 'grabbing' : 'grab',
            }}
          >
            <TableCell width="240px">{value.eventType}</TableCell>
            <TableCell width="150px" textAlign="right">{value.affectedDevices}</TableCell>
            <TableCell width="150px" textAlign="right">{value.detections}</TableCell>
          </TableRow>
        );
        return isDragged ? (
          <Table style={{ ...props.style }}>
            <TableBody>{row}</TableBody>
          </Table>
        ) : (
          row
        );
      }}
    />
  );
};

export default App;
