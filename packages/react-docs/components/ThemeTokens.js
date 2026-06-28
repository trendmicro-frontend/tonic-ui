import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionToggle,
  AccordionToggleIcon,
  Box,
  Checkbox,
  Code,
  Flex,
  Grid,
  Highlight,
  SearchInput,
  Space,
  Stack,
  Tag,
  Text,
  Tooltip,
  useAccordionItem,
  useTheme,
} from '@tonic-ui/react';
import { DataGrid } from '@tonic-ui/react-data-grid';
import { AngleRightIcon, InfoOIcon } from '@tonic-ui/react-icons';
import { isNullish, isPlainObject } from '@tonic-ui/utils';
import ColorPreview from './ColorPreview';
import { useMemo, useState, useTransition } from 'react';

// Import v4 primitive tokens
import { borders as primitiveBorders } from '@tonic-ui/theme/src/v4/primitives/borders';
import { breakpoints as primitiveBreakpoints } from '@tonic-ui/theme/src/v4/primitives/breakpoints';
import { colors as primitiveColors } from '@tonic-ui/theme/src/v4/primitives/colors';
import { fonts as primitiveFonts } from '@tonic-ui/theme/src/v4/primitives/fonts';
import { fontSizes as primitiveFontSizes } from '@tonic-ui/theme/src/v4/primitives/fontSizes';
import { fontWeights as primitiveFontWeights } from '@tonic-ui/theme/src/v4/primitives/fontWeights';
import { lineHeights as primitiveLineHeights } from '@tonic-ui/theme/src/v4/primitives/lineHeights';
import { outlines as primitiveOutlines } from '@tonic-ui/theme/src/v4/primitives/outlines';
import { radii as primitiveRadii } from '@tonic-ui/theme/src/v4/primitives/radii';
import { sizes as primitiveSizes } from '@tonic-ui/theme/src/v4/primitives/sizes';
import { space as primitiveSpace } from '@tonic-ui/theme/src/v4/primitives/space';
import { zIndices as primitiveZIndices } from '@tonic-ui/theme/src/v4/primitives/zIndices';

// Import v4 semantic tokens
import { colors as semanticColors } from '@tonic-ui/theme/src/v4/semantic/colors/index';
import { shadows as semanticShadows } from '@tonic-ui/theme/src/v4/semantic/shadows/shadows';

// Import v3 legacy tokens
import v3Borders from '@tonic-ui/theme/src/v3/borders';
import v3Colors from '@tonic-ui/theme/src/v3/colors';
import v3Fonts from '@tonic-ui/theme/src/v3/fonts';
import v3FontSizes from '@tonic-ui/theme/src/v3/fontSizes';
import v3FontWeights from '@tonic-ui/theme/src/v3/fontWeights';
import v3LineHeights from '@tonic-ui/theme/src/v3/lineHeights';
import v3Outlines from '@tonic-ui/theme/src/v3/outlines';
import v3Radii from '@tonic-ui/theme/src/v3/radii';
import v3Shadows from '@tonic-ui/theme/src/v3/shadows';
import v3Sizes from '@tonic-ui/theme/src/v3/sizes';
import v3Space from '@tonic-ui/theme/src/v3/space';
import v3ZIndices from '@tonic-ui/theme/src/v3/zIndices';

// Walk an object by a dot-separated path
const walkPath = (obj, path) => {
  const parts = path.split('.');
  let current = obj;
  for (const part of parts) {
    current = current?.[part];
  }
  return current ?? null;
};

// Resolve a token path to a CSS color string
// Checks primitive colors first, then semantic colors (with fallback path stripping)
// For dark/light pairs, picks the specified mode value and continues resolving
const resolveTokenPath = (path, mode = '_dark', depth = 0) => {
  if (depth > 5) {
    return null;
  }

  // Try primitive colors first (e.g. "gray.600")
  const primitive = walkPath(primitiveColors, path);
  if (typeof primitive === 'string') {
    return primitive;
  }
  // Handle primitive color objects with a `main` default value (e.g. red.700, blue.650)
  if (isMainObject(primitive)) {
    return primitive.main;
  }

  // Try semantic colors (e.g. "_foreground.secondary.enabled")
  let semantic = walkPath(semanticColors, path);

  // If not found, strip first segment and retry (e.g. "alert.riskLevel.x" → "riskLevel.x")
  if (isNullish(semantic) && path.includes('.')) {
    const stripped = path.slice(path.indexOf('.') + 1);
    semantic = walkPath(semanticColors, stripped);
  }

  if (isNullish(semantic)) {
    return null;
  }

  // If result is a dark/light pair, pick the mode value and continue resolving
  if (typeof semantic === 'object' && semantic !== null && '_dark' in semantic && '_light' in semantic) {
    const modeValue = semantic[mode];
    if (typeof modeValue === 'string') {
      return resolveTokenValue(modeValue, mode, depth + 1);
    }
    return null;
  }

  // Handle semantic color objects with a `main` default value
  if (isMainObject(semantic)) {
    return semantic.main;
  }

  return typeof semantic === 'string' ? semantic : null;
};

// Resolve a token value string to a displayable CSS color
// Handles references like {gray.600}, {colors.gray.600}, and {_foreground.primary.enabled}
const resolveTokenValue = (value, mode = '_dark', depth = 0) => {
  if (typeof value !== 'string' || depth > 5) {
    return null;
  }

  // Direct CSS color — return as-is
  if (/^#([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(value)) {
    return value;
  }
  if (/^(rgba?|hsla?)\(/.test(value)) {
    return value;
  }
  if (/^(transparent|currentColor)$/i.test(value)) {
    return value;
  }

  // color-mix — resolve embedded references
  if (/^color-mix\(/.test(value)) {
    return value.replace(/\{(?:colors\.)?([^}]+)\}/g, (match, path) => {
      return resolveTokenPath(path, mode, depth + 1) ?? match;
    });
  }

  // Token reference like {gray.600} or {_foreground.primary.enabled}
  if (/^\{(?:colors\.)?([^}]+)\}$/.test(value)) {
    const path = value.slice(1, -1).replace(/^colors\./, '');
    return resolveTokenPath(path, mode, depth + 1);
  }

  return null;
};

// Get a displayable CSS color for a token value, using the specified color mode
const getDisplayColor = (value, mode = '_dark') => {
  return resolveTokenValue(value, mode);
};

// Check if an object is a dark/light mode pair
const isDarkLightPair = (value) => {
  if (!isPlainObject(value)) {
    return false;
  }
  const keys = Object.keys(value);
  return keys.length === 2 && keys.includes('_dark') && keys.includes('_light');
};

// Check if an object is a primitive color object with a `main` default value
// e.g. red.600 = { main: '#dd1128', L80: '#e02439', D80: '#cf1025', ... }
const isMainObject = (value) => {
  return isPlainObject(value) && Object.prototype.hasOwnProperty.call(value, 'main');
};

// Render a color swatch with tooltip showing the resolved color value
const ColorSwatch = ({ value, mode }) => {
  const color = getDisplayColor(value, mode);
  if (!color) {
    return null;
  }
  return (
    <Tooltip label={color}>
      <ColorPreview value={color} mr={0} />
    </Tooltip>
  );
};

// Helper function to flatten nested objects into token paths
const flattenTokens = (obj, prefix = '') => {
  const result = [];

  for (const [key, value] of Object.entries(obj)) {
    const tokenPath = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      if (isDarkLightPair(value)) {
        // Dark/light pair - treat as a single token
        result.push({ token: tokenPath, value });
      } else if (isMainObject(value)) {
        // Primitive color object — use `main` as the representative value for the key
        // (strips `.main` from the token name), then flatten the remaining variants
        const { main, ...variants } = value;
        result.push({ token: tokenPath, value: main });
        result.push(...flattenTokens(variants, tokenPath));
      } else {
        // Recursively flatten nested objects
        result.push(...flattenTokens(value, tokenPath));
      }
    } else {
      // Leaf node - add to results
      result.push({ token: tokenPath, value });
    }
  }

  return result;
};

const CustomToggleIcon = () => {
  const context = useAccordionItem();
  const isExpanded = context?.isExpanded;

  return (
    <AccordionToggleIcon>
      {(state, { ref, style: styleProps }) => {
        styleProps.transform = isExpanded ? 'rotate(90deg)' : 'rotate(0deg)';
        return <AngleRightIcon ref={ref} size="4x" {...styleProps} />;
      }}
    </AccordionToggleIcon>
  );
};

// A token is "unpublished" if any segment of its path starts with '_'
const isUnpublishedToken = (token) => token.split('.').some((seg) => seg.startsWith('_'));

const TokenCategory = ({ scale, tokens, defaultIsExpanded }) => {
  const tokenRows = useMemo(() => flattenTokens(tokens), [tokens]);
  const hasUnpublishedTokens = useMemo(() => tokenRows.some(({ token }) => isUnpublishedToken(token)), [tokenRows]);
  const [filterQuery, setFilterQuery] = useState('');
  const [showUnpublished, setShowUnpublished] = useState(false);
  const [isFetching, startTransition] = useTransition();
  const theme = useTheme();

  const filteredRows = useMemo(() => {
    let rows = filterQuery
      ? tokenRows.filter(({ token }) => token.toLowerCase().includes(filterQuery.toLowerCase()))
      : tokenRows;
    if (hasUnpublishedTokens && !showUnpublished) {
      rows = rows.filter(({ token }) => !isUnpublishedToken(token));
    }
    return rows;
  }, [tokenRows, filterQuery, hasUnpublishedTokens, showUnpublished]);

  const columns = useMemo(() => [
    {
      id: 'token',
      accessorKey: 'token',
      header: 'Token',
      width: '40%',
      cell: ({ cell }) => {
        const token = cell.value;
        return (
          <Stack direction="row" alignItems="center" spacing="2x" flexWrap="wrap">
            <Tooltip label={`${scale}.${token}`}>
              <Text fontFamily="mono" wordBreak="break-all">
                <Highlight query={filterQuery}>{token}</Highlight>
              </Text>
            </Tooltip>
            {isUnpublishedToken(token) && (
              <Tag size="sm" variant="outline">Unpublished</Tag>
            )}
          </Stack>
        );
      },
    },
    {
      id: 'value',
      accessorKey: 'value',
      header: 'Value',
      isSortable: false,
      width: 'auto',
      cell: ({ cell }) => {
        const value = cell.value;

        if (isDarkLightPair(value)) {
          return (
            <Grid gridTemplateColumns="auto 1fr" gap="2x" fontFamily="mono">
              <Text>dark:</Text>
              <Stack direction="row" alignItems="center" spacing="2x">
                <ColorSwatch value={value._dark} mode="_dark" />
                <Code>{value._dark}</Code>
              </Stack>
              <Text>light:</Text>
              <Stack direction="row" alignItems="center" spacing="2x">
                <ColorSwatch value={value._light} mode="_light" />
                <Code>{value._light}</Code>
              </Stack>
            </Grid>
          );
        }

        return (
          <Stack direction="row" alignItems="center" spacing="2x" fontFamily="mono">
            <ColorSwatch value={value} />
            <Code>{String(value)}</Code>
          </Stack>
        );
      },
    },
  ], [scale, filterQuery]);

  const getAccordionToggleProps = () => {
    const backgroundColor = '_overlay.thinner';
    const borderWidth = theme.get('sizes.1q');
    const color = 'text.primary';
    const disabledColor = 'text.disabled';
    const focusVisibleOutlineColor = '_component.keyboardFocused.outerFocusRing';
    const px = theme.get('sizes.4x');
    const py = `calc(${theme.get('sizes.3x')} - ${borderWidth})`;

    return {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor,
      borderColor: 'transparent',
      borderStyle: 'solid',
      borderWidth,
      color,
      _disabled: {
        color: disabledColor,
      },
      _focusVisible: {
        outlineColor: focusVisibleOutlineColor,
        outlineOffset: '-1h',
        outlineStyle: 'solid',
        outlineWidth: '1h',
      },
      px,
      py,
      width: '100%',
    };
  };

  return (
    <AccordionItem defaultIsExpanded={defaultIsExpanded}>
      <AccordionToggle {...getAccordionToggleProps()}>
        <CustomToggleIcon />
        <Space width="2x" />
        <Text>
          {scale}
        </Text>
        <Space width="2x" />
        <Text color="text.tertiary" fontSize="xs" lineHeight="xs">
          ({tokenRows.length} {tokenRows.length === 1 ? 'token' : 'tokens'})
        </Text>
      </AccordionToggle>
      <AccordionContent>
        <Box pl="7x" pr="4x" py="2x">
          <Flex alignItems="center" justifyContent="space-between">
            <SearchInput
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.target.value !== filterQuery) {
                  setFilterQuery(e.target.value);
                }
              }}
              onBlur={(e) => {
                if (e.target.value !== filterQuery) {
                  setFilterQuery(e.target.value);
                }
              }}
              onClearInput={() => setFilterQuery('')}
              width="60x"
              placeholder="Token"
            />
            {hasUnpublishedTokens ? (
              <Checkbox
                checked={showUnpublished}
                onChange={(e) => {
                  const checked = e.target.checked;
                  startTransition(() => setShowUnpublished(checked));
                }}
              >
                <Flex alignItems="center" columnGap="1x">
                  Show unpublished tokens
                  <Tooltip
                    label="Unpublished tokens are intended for internal use only. They are subject to change without notice and should not be used in production."
                    maxWidth="320px"
                  >
                    <InfoOIcon />
                  </Tooltip>
                </Flex>
              </Checkbox>
            ) : null}
          </Flex>
        </Box>
        <Box pl="7x" height={400} mb="2x">
          <DataGrid
            columns={columns}
            data={filteredRows}
            isLoading={isFetching}
            isColumnResizable
            isColumnSortable
            autoSorting
          />
        </Box>
      </AccordionContent>
    </AccordionItem>
  );
};

const getTokenData = (type) => {
  if (type === 'primitive') {
    return {
      borders: primitiveBorders.rem,
      breakpoints: {
        sm: primitiveBreakpoints.sm,
        md: primitiveBreakpoints.md,
        lg: primitiveBreakpoints.lg,
        xl: primitiveBreakpoints.xl,
        '2xl': primitiveBreakpoints['2xl'],
      },
      colors: primitiveColors,
      fonts: primitiveFonts,
      fontSizes: primitiveFontSizes.rem,
      fontWeights: primitiveFontWeights,
      lineHeights: primitiveLineHeights.rem,
      outlines: primitiveOutlines.rem,
      radii: primitiveRadii.rem,
      sizes: primitiveSizes.rem,
      space: primitiveSpace.rem,
      zIndices: primitiveZIndices,
    };
  }
  if (type === 'semantic') {
    return {
      colors: semanticColors,
      shadows: semanticShadows,
    };
  }
  if (type === 'legacy') {
    return {
      borders: v3Borders.rem,
      colors: v3Colors,
      fonts: v3Fonts,
      fontSizes: v3FontSizes.rem,
      fontWeights: v3FontWeights,
      lineHeights: v3LineHeights.rem,
      outlines: v3Outlines.rem,
      radii: v3Radii.rem,
      shadows: v3Shadows,
      sizes: v3Sizes.rem,
      space: v3Space.rem,
      zIndices: v3ZIndices,
    };
  }
  return {};
};

const ThemeTokens = ({ type, scales }) => {
  const data = getTokenData(type);
  const entries = (() => {
    if (!scales) {
      return Object.entries(data).map(([scale, tokens]) => ({
        scale,
        tokens,
        defaultIsExpanded: false,
      }));
    }
    return scales
      .map((scale) => {
        const name = typeof scale === 'string' ? scale : scale.name;
        const defaultIsExpanded = typeof scale === 'object' ? (scale.defaultIsExpanded ?? false) : false;
        return { scale: name, tokens: data[name], defaultIsExpanded };
      })
      .filter(({ tokens }) => !isNullish(tokens));
  })();

  return (
    <Accordion
      allowMultiple
      sx={{
        rowGap: 1,
      }}
    >
      {entries.map(({ scale, tokens, defaultIsExpanded }) => (
        <TokenCategory
          key={scale}
          scale={scale}
          tokens={tokens}
          defaultIsExpanded={defaultIsExpanded}
        />
      ))}
    </Accordion>
  );
};

export default ThemeTokens;
