import { Table, TableBody, TableCell, TableHeader, TableRow, Tag, useTheme } from '@tonic-ui/react';
import { useMediaQuery } from '@tonic-ui/react-hooks';

const QueryRow = ({ query }) => {
  const matches = useMediaQuery(query);

  return (
    <TableRow>
      <TableCell width={240}>
        <Tag fontFamily="mono">{query}</Tag>
      </TableCell>
      <TableCell>{JSON.stringify(matches)}</TableCell>
    </TableRow>
  );
};

const App = () => {
  const { breakpoints } = useTheme();

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
        <QueryRow query="(prefers-color-scheme: dark)" />
        {breakpoints.keys.map((key) => (
          <QueryRow key={key} query={breakpoints.gte(key).slice('@media '.length)} />
        ))}
      </TableBody>
    </Table>
  );
};

export default App;
