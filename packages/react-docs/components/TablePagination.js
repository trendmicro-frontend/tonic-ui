import {
  Button,
  ButtonGroup,
  Divider,
  Flex,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Space,
  Text,
  useColorMode,
  useColorStyle,
} from '@tonic-ui/react';
import {
  AngleLeftIcon,
  AngleRightIcon,
} from '@tonic-ui/react-icons';
import { ensureArray, ensureFiniteNumber } from 'ensure-type';
import React, { useCallback, useEffect, useState } from 'react';

const TablePagination = ({
  count,
  defaultPage = 1,
  defaultRowsPerPage: defaultRowsPerPageProp,
  onPageChange: onPageChangeProp,
  onRowsPerPageChange: onRowsPerPageChangeProp,
  page: pageProp,
  rowsPerPage: rowsPerPageProp,
  rowsPerPageOptions = [10, 25, 50, 100],
  showFirstButton = false,
  showLastButton = false,
}) => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  const defaultRowsPerPage = defaultRowsPerPageProp ?? ensureArray(rowsPerPageOptions)[0];
  const [page, setPage] = useState(pageProp ?? defaultPage);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageProp ?? defaultRowsPerPage);

  useEffect(() => {
    const isControlled = (pageProp !== undefined);
    if (isControlled) {
      setPage(pageProp);
    }
  }, [pageProp]);

  useEffect(() => {
    const isControlled = (rowsPerPageProp !== undefined);
    if (isControlled) {
      setRowsPerPage(rowsPerPageProp);
    }
  }, [rowsPerPageProp]);

  const onPageChange = useCallback((nextPage) => {
    const isControlled = (pageProp !== undefined);
    if (!isControlled) {
      setPage(nextPage);
    }

    if (typeof onPageChangeProp === 'function') {
      onPageChangeProp(nextPage);
    }
  }, [pageProp, onPageChangeProp]);

  const onRowsPerPageChange = useCallback((nextRowsPerPage) => {
    const isControlled = (rowsPerPageProp !== undefined);
    if (!isControlled) {
      setRowsPerPage(nextRowsPerPage);
    }

    if (typeof onRowsPerPageChangeProp === 'function') {
      onRowsPerPageChangeProp(nextRowsPerPage);
    }
  }, [rowsPerPageProp, onRowsPerPageChangeProp]);

  const totalPages = Math.ceil(count / rowsPerPage);
  const handlePageChange = (event) => {
    const nextPage = ensureFiniteNumber(event.target.value);
    if (nextPage <= 1) {
      onPageChange(1);
    } else if (nextPage >= totalPages) {
      onPageChange(totalPages);
    } else {
      onPageChange(nextPage);
    }
  };
  const handleRowsPerPageChange = (event) => {
    const nextRowsPerPage = ensureFiniteNumber(event.target.value);
    if (nextRowsPerPage > 0) {
      onPageChange(1);
      onRowsPerPageChange(nextRowsPerPage);
    }
  };
  const canPreviousPage = (page > 1);
  const canNextPage = (page < totalPages);

  return (
    <Flex
      alignItems="center"
      justifyContent="flex-end"
      backgroundColor={colorStyle.background.secondary}
      px="6x"
      py="3x"
    >
      <Text mr="2x">
        Total: {count}
      </Text>
      <Divider
        orientation="vertical"
        height="6x"
      />
      <Menu>
        <MenuButton variant="ghost">
          {rowsPerPage} per page
        </MenuButton>
        <MenuList
          onClick={handleRowsPerPageChange}
          width="100%"
        >
          {rowsPerPageOptions.map((option) => (
            <MenuItem
              key={option}
              value={option}
            >
              {option}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      <Divider
        orientation="vertical"
        height="6x"
      />
      <Space width="2x" />
      <Input
        width="10x"
        px={0}
        textAlign="center"
        onChange={handlePageChange}
        value={page}
      />
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
          disabled={!canPreviousPage}
          onClick={(event) => {
            onPageChange(page - 1);
          }}
        >
          <AngleLeftIcon />
        </Button>
        <Button
          width="8x"
          disabled={!canNextPage}
          onClick={(event) => {
            onPageChange(page + 1);
          }}
        >
          <AngleRightIcon />
        </Button>
      </ButtonGroup>
    </Flex>
  );
};

export default TablePagination;
