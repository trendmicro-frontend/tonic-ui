import { Link, Space, Stack } from '@tonic-ui/react';
import { EditIcon } from '@tonic-ui/react-icons';
import React from 'react';

const App = () => (
  <Link href="#">
    <EditIcon />
    <Space width="2x" />
    Edit
  </Link>
);

export default App;
