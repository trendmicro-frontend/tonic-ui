import {
  Button,
  ButtonGroup,
  Divider,
  Flex,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Space,
  Text,
} from '@tonic-ui/react';
import { AngleLeftIcon, AngleRightIcon } from '@tonic-ui/react-icons';
import React, { useState } from 'react';

const App = () => {
  const totalRecords = 400;
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const totalPages = Math.ceil(totalRecords / perPage);
  const selectPerPage = (value) => {
    setPage(1);
    setPerPage(value);
  };
  const isPrevPageDisabled = (page <= 1);
  const isNextPageDisabled = (page >= totalPages);
  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value <= 1) {
      setPage(1);
    } else if (value >= totalPages) {
      setPage(totalPages);
    } else if (!isNaN(value)) {
      setPage(e.target.value);
    }
  };

  return (
    <Flex alignItems="center">
      <Text mr="2x">
        Total: {totalRecords}
      </Text>
      <Divider orientation="vertical" height="6x" />
      <Menu>
        <MenuButton variant="ghost">{perPage} per page</MenuButton>
        <MenuList>
          <MenuItem onClick={() => selectPerPage(10)}>10</MenuItem>
          <MenuItem onClick={() => selectPerPage(50)}>50</MenuItem>
          <MenuItem onClick={() => selectPerPage(100)}>100</MenuItem>
        </MenuList>
      </Menu>
      <Divider orientation="vertical" height="6x" />
      <Space width="2x" />
      <Input width={32} px={0} textAlign="center" onChange={handleInputChange} value={page} />
      <Space width="2x" />
      <Text>/</Text>
      <Space width="2x" />
      <Text>{totalPages}</Text>
      <Space width="2x" />
      <ButtonGroup
        variant="secondary"
        sx={{
          '> *:not(:first-of-type)': {
            marginLeft: -1
          }
        }}
      >
        <Button
          width="8x"
          disabled={isPrevPageDisabled}
          onClick={(event) => {
            const prevPage = page > 1 ? page - 1 : page;
            if (prevPage !== page) {
              setPage(prevPage);
            }
          }}
        >
          <AngleLeftIcon />
        </Button>
        <Button
          width="8x"
          disabled={isNextPageDisabled}
          onClick={(event) => {
            const nextPage = page < totalPages ? page + 1 : page;
            if (nextPage !== page) {
              setPage(nextPage);
            }
          }}
        >
          <AngleRightIcon />
        </Button>
      </ButtonGroup>
    </Flex>
  );
};

export default App;
