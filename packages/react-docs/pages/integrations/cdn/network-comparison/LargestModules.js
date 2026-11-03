import {
  Box,
  Flex,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  Text,
  useTheme,
} from '@tonic-ui/react';
import { FileTextIcon } from '@tonic-ui/react-icons';
import { kiB } from './data';
import { getComparisonTokens, InfoButton, providerColors, SectionHeading } from './shared';

export default function LargestModules({ active, selected }) {
  const theme = useTheme();
  const { family, panel, recess, muted, faint } = getComparisonTokens(theme);
  const provider = providerColors(theme);

  return (
    <Box sx={panel}>
      <SectionHeading
        icon={<FileTextIcon size="8x" color={provider[active.provider] ?? faint} />}
        title="Largest Modules"
        subtitle="Top JavaScript files by decoded size (largest first)."
      />
      <Box sx={{ overflowX: 'auto' }}>
        <Table
          layout="table"
          size="sm"
          sx={{
            width: '100%',
            minWidth: '1000px',
            '@media (max-width: 640px)': { minWidth: 0 },
          }}
        >
          <TableHeader>
            <TableRow>
              <TableCell>Module</TableCell>
              <TableCell
                width={190}
                sx={{ '@media (max-width: 640px)': { display: 'none' } }}
              >
                Family
              </TableCell>
              <TableCell
                width={150}
                sx={{ '@media (max-width: 640px)': { width: 95 } }}
              >
                <Flex sx={{ alignItems: 'center', justifyContent: 'flex-end', columnGap: '1x' }}>
                  Transferred
                  <InfoButton label="Bytes sent over the network after compression." color={muted} />
                </Flex>
              </TableCell>
              <TableCell
                width={140}
                sx={{ '@media (max-width: 640px)': { width: 95 } }}
              >
                <Flex sx={{ alignItems: 'center', justifyContent: 'flex-end', columnGap: '1x' }}>
                  Decoded
                  <InfoButton label="Uncompressed JavaScript size parsed by the browser." color={muted} />
                </Flex>
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {active.topFiles.map((file) => (
              <TableRow key={file.path}>
                <TableCell sx={{ overflowWrap: 'anywhere' }}>
                  <Flex sx={{ alignItems: 'center', columnGap: '2x', minWidth: 0 }}>
                    <FileTextIcon size="4x" color={provider[active.provider] ?? faint} />
                    <Text sx={{ minWidth: 0, overflowWrap: 'anywhere' }}>{file.path}</Text>
                  </Flex>
                </TableCell>
                <TableCell sx={{ '@media (max-width: 640px)': { display: 'none' } }}>
                  <Flex
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      columnGap: '1x',
                      maxWidth: '100%',
                      background: recess,
                      borderRadius: '3q',
                      px: '2x',
                      py: '1x',
                    }}
                  >
                    <Box
                      aria-hidden="true"
                      sx={{
                        flex: 'none',
                        width: '2x',
                        height: '2x',
                        borderRadius: '1x',
                        background: family[file.group] ?? faint,
                      }}
                    />
                    <Text sx={{ fontSize: 'xs', overflowWrap: 'anywhere' }}>{file.group}</Text>
                  </Flex>
                </TableCell>
                <TableCell sx={{ textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>
                  {kiB(file.transferredKiB)}
                </TableCell>
                <TableCell sx={{ textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>
                  {kiB(file.decodedKiB)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
}
