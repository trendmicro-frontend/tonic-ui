import {
  getExpandedRowModel,
} from '@tanstack/react-table';
import { Box, ButtonBase, Divider, Text, Truncate, useColorMode, useColorStyle } from '@tonic-ui/react';
import { AngleRightIcon } from '@tonic-ui/react-icons';
import {
  createTransitionStyle,
  getEnterTransitionProps,
  getExitTransitionProps,
  transitionEasing,
} from '@tonic-ui/utils';
import React, { forwardRef, useEffect, useMemo, useRef } from 'react';
import BaseTable from '@/components/BaseTable';

const data = [
  {
    endpointId: '0d4523d9-ceed-4a9a-b3d0-056814ee8811',
    endpointHostname: 'endpoint-1',
    endpointIPs: ['fe80::c5a0:6dd9:1002:5760','10.1.136.130'],
    endpointMAC: '00:50:56:9c:3c:5a',
    eventId: 1,
    eventSourceType: 1,
    firstSeen: '2023-06-07T02:31:48Z',
    lastSeen: '2023-06-07T02:31:48Z',
    objectFirstSeen: '2023-06-07T02:27:34Z',
    objectLastSeen: '2023-06-07T02:32:04Z',
    objectIPs: [
      '192.8.82.3',
      '199.7.83.46',
      '192.113.5.32',
    ],
    osDescription: 'Windows 10 Enterprise (64-bit) build 19044',
    osType: '0x00000007',
    osVer: '10.0.19044',
    processCmd: 'C:\\Windows\\System32\\svchost.exe -k NetworkService -p -s NlaSvc',
    processFileCreation: '2023-06-05T10:07:28Z',
    processFileHashMD5: 'b7f884c1b74a263f746ee12a5f7c9f6a',
    processFileHashSHA1: '1bc5066ddf693fc034d6514618854e26a84fd0d1',
    processFileHashSHA256: 'add683a6910abbbf0e28b557fad0ba998166394932ae2aca069d9aa19ea8fe88',
    processFileModifiedTime: '2023-06-05T10:07:28Z',
    processFileSize: 55320,
    processLaunchTime: '2023-06-06T09:42:15Z',
    processName: 'C:\\Windows\\System32\\svchost.exe',
    processId: 1408,
    processSigner: 'Microsoft Windows Publisher',
    processSignerValid: true,
    processUser: 'NETWORK SERVICE',
    processUserDomain: 'NT AUTHORITY',
    productCode: 'dummy',
    productVersion: 'x.y.z',
    sessionId: 0,
    timezone: 'Pacific Standard Time',
  },
];

const App = () => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  const layout = 'flexbox'; // One of: 'flexbox', 'table'
  const variant = 'default'; // One of: 'default', 'outline'
  const columns = useMemo(() => [
    {
      id: 'toggle-expanded',
      header: () => null,
      cell: ({ row }) => {
        const canExpand = row.getCanExpand();
        const isExpanded = row.getIsExpanded();

        if (!canExpand) {
          return null;
        }

        return (
          <TableRowToggleIcon
            isExpanded={isExpanded}
            onClick={row.getToggleExpandedHandler()}
          />
        );
      },
      size: 48,
    },
    {
      header: 'Logged',
      accessorKey: 'firstSeen',
      size: 180,
      cell: ({ row }) => {
        return (
          <Truncate>
            {row.original?.firstSeen}
          </Truncate>
        );
      },
    },
    {
      id: 'details',
      cell: ({ row }) => {
        const entries = Object.entries(row.original);

        return (
          <Truncate
            as="pre"
            fontFamily="mono"
            m={0}
            sx={{
              '--truncate-line-clamp': 3,
              wordBreak: 'break-all',
              whiteSpace: 'normal',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 'var(--truncate-line-clamp)',
            }}
          >
            {entries.map((item, index) => {
              const [key, value] = item;
              return (
                <Box
                  key={key}
                  display="inline"
                >
                  {key}: <Text display="inline" color={colorStyle.color.tertiary}>{Array.isArray(value) ? value.join(',') : value}</Text>
                  {(index < entries.length - 1) && (
                    <Divider display="inline" orientation="vertical" mx="2x" />
                  )}
                </Box>
              );
            })}
          </Truncate>
        );
      },
      size: 'auto',
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
  ], [colorMode, colorStyle]); // Include both colorMode and colorStyle as dependencies to prevent memoization when the color mode changes
  const tableOptions = useMemo(() => ({
    defaultColumn: {
      minSize: 48,
    },
    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand: () => true,
  }), []);
  const tableRef = useRef(null);

  useEffect(() => {
    if (tableRef.current) {
      // Toggles the expanded state for all rows
      tableRef.current.toggleAllRowsExpanded(true);
    }
  }, []);

  return (
    <Box height={500}>
      <BaseTable
        layout={layout}
        variant={variant}
        columns={columns}
        data={data}
        tableOptions={tableOptions}
        tableRef={tableRef}
      />
    </Box>
  );
};

const TableRowToggleIcon = forwardRef((
  {
    isExpanded,
    ...rest
  },
  ref,
) => {
  const timeout = isExpanded
    ? Math.floor(133 * 0.7) // exit
    : 133; // enter
  const easing = transitionEasing.easeOut;
  const transitionProps = isExpanded
    ? getEnterTransitionProps({ timeout, easing })
    : getExitTransitionProps({ timeout, easing });
  const styleProps = {
    transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
    transition: createTransitionStyle('transform', transitionProps),
  };

  return (
    <ButtonBase {...rest}>
      <AngleRightIcon size="4x" {...styleProps} />
    </ButtonBase>
  );
});
TableRowToggleIcon.displayName = 'TableRowToggleIcon';

export default App;
