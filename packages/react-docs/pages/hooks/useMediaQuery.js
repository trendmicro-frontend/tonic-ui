import { Table, TableBody, TableCell, TableHeader, TableRow, Tag } from '@tonic-ui/react';
import { useMediaQuery } from '@tonic-ui/react-hooks';
import React from 'react';

const App = () => {
  const x = (value) => JSON.stringify(value);
  const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const notLessThan320 = useMediaQuery('(min-width: 320px)');
  const notLessThan640 = useMediaQuery('(min-width: 640px)');
  const notLessThan1024 = useMediaQuery('(min-width: 1024px)');
  const notLessThan1280 = useMediaQuery('(min-width: 1280px)');
  const notLessThan1680 = useMediaQuery('(min-width: 1680px)');

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell width={240}>
            Media Query
          </TableCell>
          <TableCell>
            Match Result
          </TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell width={240}>
            <Tag fontFamily="mono">(prefers-color-scheme: dark)</Tag>
          </TableCell>
          <TableCell>{x(isDarkMode)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell width={240}>
            <Tag fontFamily="mono">(min-width:320px)</Tag>
          </TableCell>
          <TableCell>{x(notLessThan320)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell width={240}>
            <Tag fontFamily="mono">(min-width:640px)</Tag>
          </TableCell>
          <TableCell>{x(notLessThan640)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell width={240}>
            <Tag fontFamily="mono">(min-width:1024px)</Tag>
          </TableCell>
          <TableCell>{x(notLessThan1024)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell width={240}>
            <Tag fontFamily="mono">(min-width:1280px)</Tag>
          </TableCell>
          <TableCell>{x(notLessThan1280)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell width={240}>
            <Tag fontFamily="mono">(min-width:1680px)</Tag>
          </TableCell>
          <TableCell>{x(notLessThan1680)}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default App;
