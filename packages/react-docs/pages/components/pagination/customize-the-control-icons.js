import { Icon, Pagination, PaginationItem, Text } from '@tonic-ui/react';
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
            previous: <Icon icon="chevron-left" />,
            next: <Icon icon="chevron-right" />,
          }}
          {...props}
        />
      );
    }}
  />
);

export default App;
