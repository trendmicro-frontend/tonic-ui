import { Table, TableBody, TableCell, TableHeader, TableRow, Tag } from '@tonic-ui/react';
import { useMediaQuery } from '@tonic-ui/react-hooks';

const App = () => {
  const x = (value) => JSON.stringify(value);
  const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const notLessThanSm = useMediaQuery('(width >= 40rem)');
  const notLessThanMd = useMediaQuery('(width >= 48rem)');
  const notLessThanLg = useMediaQuery('(width >= 64rem)');
  const notLessThanXl = useMediaQuery('(width >= 80rem)');
  const notLessThan2xl = useMediaQuery('(width >= 96rem)');

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
            <Tag fontFamily="mono">{'(width >= 40rem)'}</Tag>
          </TableCell>
          <TableCell>{x(notLessThanSm)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell width={240}>
            <Tag fontFamily="mono">{'(width >= 48rem)'}</Tag>
          </TableCell>
          <TableCell>{x(notLessThanMd)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell width={240}>
            <Tag fontFamily="mono">{'(width >= 64rem)'}</Tag>
          </TableCell>
          <TableCell>{x(notLessThanLg)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell width={240}>
            <Tag fontFamily="mono">{'(width >= 80rem)'}</Tag>
          </TableCell>
          <TableCell>{x(notLessThanXl)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell width={240}>
            <Tag fontFamily="mono">{'(width >= 96rem)'}</Tag>
          </TableCell>
          <TableCell>{x(notLessThan2xl)}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default App;
