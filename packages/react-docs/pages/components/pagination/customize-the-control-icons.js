import { Pagination, PaginationItem, Text } from '@tonic-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@tonic-ui/react-icons';
import React from 'react';

const App = () => (
  <Pagination
    count={10}
    renderItem={(props) => {
      if (props.type === 'start-ellipsis' || props.type === 'end-ellipsis') {
        return (
          <Text mx="2x">...</Text>
        );
      }

      return (
        <PaginationItem
          slot={{
            previous: <ChevronLeftIcon />,
            next: <ChevronRightIcon />,
          }}
          {...props}
        />
      );
    }}
  />
);

export default App;
