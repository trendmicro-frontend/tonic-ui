import { Box, Button, Flex, usePagination } from '@tonic-ui/react';
import React, { Fragment } from 'react';

const App = () => {
  const { items } = usePagination({
    count: 10,
    slot: {
      first: true,
      previous: true,
      next: true,
      last: true,
    },
  });

  return (
    <Box as="nav">
      <Flex alignItems="center" columnGap="2x">
        {items.map(({ page, type, selected, ...item }, index) => {
          let children = null;

          if (type === 'start-ellipsis' || type === 'end-ellipsis') {
            children = '…';
          } else if (type === 'page') {
            children = (
              <Button selected={selected} {...item}>
                {page}
              </Button>
            );
          } else {
            children = (
              <Button {...item}>
                {type}
              </Button>
            );
          }

          return (
            <Fragment key={index}>
              {children}
            </Fragment>
          );
        })}
      </Flex>
    </Box>
  );
};

export default App;
