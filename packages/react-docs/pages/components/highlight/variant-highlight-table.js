import {
  Box,
  Flex,
  Highlight,
  SearchInput,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  Text,
} from '@tonic-ui/react';
import { useState } from 'react';

const data = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'Administrator' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Developer' },
  { id: 3, name: 'Bob Johnson', email: 'bob.johnson@example.com', role: 'Designer' },
  { id: 4, name: 'Alice Williams', email: 'alice.williams@example.com', role: 'Manager' },
  { id: 5, name: 'Charlie Brown', email: 'charlie.brown@example.com', role: 'Developer' },
];

const App = () => {
  const [searchQuery, setSearchQuery] = useState('john');

  return (
    <Box>
      <Flex mb="4x">
        <SearchInput
          placeholder="Search by name, email, or role"
          value={searchQuery}
          onClearInput={(event) => {
            setSearchQuery('');
          }}
          onChange={(event) => {
            const value = event.target.value;
            setSearchQuery(value);
          }}
          width={320}
        />
      </Flex>
      <Table layout="table">
        <TableHeader>
          <TableRow>
            <TableCell width={48}>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell width={48}>
                <Text>{row.id}</Text>
              </TableCell>
              <TableCell>
                <Highlight variant="highlight" query={searchQuery}>
                  {row.name}
                </Highlight>
              </TableCell>
              <TableCell>
                <Highlight variant="highlight" query={searchQuery}>
                  {row.email}
                </Highlight>
              </TableCell>
              <TableCell>
                <Highlight variant="highlight" query={searchQuery}>
                  {row.role}
                </Highlight>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default App;
