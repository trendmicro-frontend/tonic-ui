import {
  getPaginationRowModel,
} from '@tanstack/react-table';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  Icon,
  MenuButton,
  OverflowTooltip,
  SearchInput,
  Text,
  TextLabel,
  Tooltip,
  Truncate,
  useColorStyle,
} from '@tonic-ui/react';
import { ensureNumber } from 'ensure-type';
import _ from 'lodash';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import BaseTable from '@/components/BaseTable';
import Dropdown from '@/components/Dropdown';
import Multiselect from '@/components/Multiselect';
import TablePagination from '@/components/TablePagination';
import Toolbar from '@/components/Toolbar';
import ToolbarItem from '@/components/ToolbarItem';

const filterMap = (() => {
  const filterData = [
    { id: 'all', label: 'All' },
    ...Array.from({ length: 10 }, (_, i) => ({
      id: String(i + 1),
      label: `Option ${i + 1}`,
    })),
  ];

  const map = new Map();
  filterData.forEach((filter) => {
    // Use the policy ID as the key and ensure it's a string rather than a number
    const key = String(filter.id);
    map.set(key, filter);
  });
  return map;
})();

const filterItems = [...filterMap.keys()];

const dropdownOptions = [
  ...filterItems.slice(0, 4),
];

const multiselectOptions = [
  ...filterItems.slice(1),
];

const renderDropdownOption = (value) => {
  const filter = filterMap.get(value);
  return filter?.label;
};

const renderDropdownLabel = (value) => {
  const selectionText = renderDropdownOption(value);
  return (
    <>
      <TextLabel mr="2x">
        {'Label:'}
      </TextLabel>
      <OverflowTooltip label={selectionText}>
        {selectionText}
      </OverflowTooltip>
    </>
  );
};

const renderMultiselectOption = (value) => {
  const filter = filterMap.get(value);
  return filter?.label;
};

const renderMultiselectLabel = (value) => {
  const selectionCount = value.length;
  const isNoneSelected = selectionCount === 0;
  const isAllSelected = selectionCount === multiselectOptions.length;

  if (isNoneSelected) {
    const selectionText = 'Select';
    return (
      <>
        <TextLabel mr="2x">
          {'Label:'}
        </TextLabel>
        <OverflowTooltip label={selectionText}>
          {selectionText}
        </OverflowTooltip>
      </>
    );
  }

  if (isAllSelected) {
    const selectionText = 'All'; 
    return (
      <>
        <TextLabel mr="2x">
          {'Label:'}
        </TextLabel>
        <OverflowTooltip label={selectionText}>
          {selectionText}
        </OverflowTooltip>
      </>
    );
  }

  const selectionText = value.map(renderMultiselectOption).join(', ');
  return (
    <>
      <TextLabel mr="2x">
        {'Label:'}
      </TextLabel>
      <OverflowTooltip label={selectionText}>
        {selectionText}
      </OverflowTooltip>
      <Text ml="1x">
        {`(${selectionCount})`}
      </Text>
    </>
  );
};

const threatTypes = [
  'Virus/Malware',
  'Spyware/Grayware',
  'URL Filtering',
  'Web Reputation',
  'Network Virus',
  'Application Control',
];

const data = _.range(360).map((i) => {
  // Randomly pick a subset of threat types
  const detections = _.sampleSize(threatTypes, _.random(0, threatTypes.length));
  // Generate a random date within the past 30 days
  const lastSeen = new Date(Date.now() - _.random(0, 60 * 60 * 24 * 30 * 1000));
  return {
    id: i + 1,
    endpoint: `Endpoint ${i + 1}`,
    detections,
    lastSeen,
  };
});

const App = () => {
  const [colorStyle] = useColorStyle();
  const [dropdownValue, setDropdownValue] = useState(dropdownOptions[0]);
  const [multiselectValue, setMultiselectValue] = useState(multiselectOptions);
  const [searchInputValue, setSearchInputValue] = useState('');
  const [matchedResults] = useState(0);

  const clearFilters = useCallback(() => {
    setDropdownValue(dropdownOptions[0]);
    setMultiselectValue(multiselectOptions);
    setSearchInputValue('');
  }, []);

  const layout = 'flexbox'; // One of: 'flexbox', 'table'
  const variant = 'default'; // One of: 'default', 'outline'
  const columns = useMemo(() => [
    {
      id: 'selection',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllRowsSelected()}
          indeterminate={table.getIsSomeRowsSelected()}
          onChange={table.getToggleAllRowsSelectedHandler()}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          disabled={!row.getCanSelect()}
          indeterminate={row.getIsSomeSelected()}
          onChange={row.getToggleSelectedHandler()}
        />
      ),
      minSize: 48,
      size: 48,
    },
    {
      header: 'Endpoint',
      cell: ({ getValue }) => (
        <Truncate>{getValue()}</Truncate>
      ),
      accessorKey: 'endpoint',
      size: 'auto',
    },
    {
      header: 'Detections',
      accessorKey: 'detections',
      cell: ({ getValue }) => {
        const detections = [...getValue()];
        return detections.length;
      },
      size: 150,
    },
    {
      header: 'Last Seen',
      accessorKey: 'lastSeen',
      cell: ({ getValue }) => {
        return getValue().toISOString();
      },
      size: 200,
    },
  ], []);

  const tableRef = useRef();

  const [rowSelection, setRowSelection] = useState({});
  const [totalCount, setTotalCount] = useState(data.length);

  const tableOptions = useMemo(() => ({
    defaultColumn: {
      minSize: 80,
    },
    state: {
      rowSelection,
    },

    // Pagination
    getPaginationRowModel: getPaginationRowModel(),

    // Row selection
    enableRowSelection: row => true, // enable row selection conditionally
    onRowSelectionChange: setRowSelection,
  }), [rowSelection]);

  useEffect(() => {
    const table = tableRef.current;
    setTotalCount(table ? table.getCoreRowModel().rows.length : 0);
  }, []);

  const pageHeight = 600;

  const menuButtonWidth = 200;
  const maxMenuButtonWidth = typeof menuButtonWidth === 'number'
    ? `calc(${menuButtonWidth}px - 48px)`
    : `calc(${menuButtonWidth} - 48px)`;

  return (
    <Flex
      flexDirection="column"
      height={pageHeight}
    >
      <Box flex="none" mb="2x">
        <Toolbar>
          <ToolbarItem flexWrap="wrap">
            <Button variant="primary">
              Primary Action
            </Button>
            <Divider orientation="vertical" />
            <Dropdown
              value={dropdownValue}
              onChange={setDropdownValue}
              options={dropdownOptions}
              renderOption={renderDropdownOption}
            >
              <MenuButton
                variant="secondary"
                width={menuButtonWidth}
              >
                <Flex maxWidth={maxMenuButtonWidth}>
                  {renderDropdownLabel(dropdownValue)}
                </Flex>
              </MenuButton>
            </Dropdown>
            <Multiselect
              isSearchable={true}
              value={multiselectValue}
              onChange={setMultiselectValue}
              options={multiselectOptions}
              renderOption={renderMultiselectOption}
            >
              <MenuButton
                variant="secondary"
                width={menuButtonWidth}
              >
                <Flex maxWidth={maxMenuButtonWidth}>
                  {renderMultiselectLabel(multiselectValue)}
                </Flex>
              </MenuButton>
            </Multiselect>
            <SearchInput
              placeholder="Search"
              onChange={(event) => {
                const { value } = event.target;
                setSearchInputValue(value);
              }}
              onClearInput={() => {
                setSearchInputValue('');
              }}
              value={searchInputValue}
            />
            <Button
              variant="ghost"
              onClick={() => clearFilters()}
              sx={{
                color: colorStyle.color.info,
                _focus: {
                  color: colorStyle.color.info,
                },
                columnGap: '1x',
                mr: '3x',
              }}
            >
              <Icon icon="close-s" /> <Text>Clear</Text>
            </Button>
            <Flex columnGap="1x">
              <TextLabel>
                Matched results:
              </TextLabel>
              {matchedResults}
            </Flex>
          </ToolbarItem>
          <ToolbarItem flexWrap="nowrap">
            <Tooltip label="Export">
              <Button variant="ghost">
                <Icon icon="export" />
              </Button>
            </Tooltip>
            <Tooltip label="Refresh">
              <Button variant="ghost">
                <Icon icon="refresh" />
              </Button>
            </Tooltip>
          </ToolbarItem>
        </Toolbar>
      </Box>
      <Box flex="auto">
        <BaseTable
          layout={layout}
          variant={variant}
          columns={columns}
          data={data}
          tableOptions={tableOptions}
          tableRef={tableRef}
        />
      </Box>
      <Box flex="none">
        <TablePagination
          count={totalCount}
          onPageChange={(nextPage) => {
            const pageIndex = Math.max(ensureNumber(nextPage) - 1, 0);
            tableRef.current.setPageIndex(pageIndex);
          }}
          onRowsPerPageChange={(nextRowsPerPage) => {
            const pageSize = Math.max(ensureNumber(nextRowsPerPage), 1);
            tableRef.current.setPageSize(pageSize);
          }}
        />
      </Box>
    </Flex>
  );
};

export default App;
