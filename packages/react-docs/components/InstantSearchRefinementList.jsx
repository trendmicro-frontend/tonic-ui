import {
  Box,
  Divider,
  Flex,
  Icon,
  Spinner,
  Stack,
  Text,
  useColorMode,
  useColorStyle,
  useTheme,
} from '@tonic-ui/react';
import { ensureArray, ensureString } from 'ensure-type'
import _groupBy from 'lodash/groupBy';
import _orderBy from 'lodash/orderBy';
import React from 'react';
import Highlight from 'react-highlight-words';
import {
  useInstantSearch,
} from 'react-instantsearch-hooks';
import InstantSearchRefinementLink from './InstantSearchRefinementLink';
import InstantSearchPagination from './InstantSearchPagination';

/**
 * See https://www.algolia.com/doc/api-reference/widgets/use-instantsearch/react-hooks/
 */
const InstantSearchRefinementList = (
  {
    onChange,
  }
) => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  const { colors } = useTheme();
  const {
    results,
    status, // One of: 'idle', 'loading', 'stalled', 'error'
    error,
  } = useInstantSearch({ catchError: true });
  const query = ensureString(results?.query);
  const handleClickRefinementLinkBy = (hit) => () => {
    onChange(hit);
  };

  if (status === 'error') {
    return (
      <Stack
        spacing="4x"
        py="10x"
      >
        <Flex
          justifyContent="center"
          position="relative"
          height="10x"
          mb="4x"
        >
          <Box
            position="absolute"
            width="10x"
            height="10x"
          >
            <Icon
              icon="connect-error"
              size="10x"
              position="absolute"
              inset={0}
            />
          </Box>
        </Flex>
        <Stack spacing="2x">
          <Text textAlign="center">
            The search is currently unable to proceed. Please resolve the error and try again.
          </Text>
          {error && (
            <Text textAlign="center">
              Error: {error.message}
            </Text>
          )}
        </Stack>
      </Stack>
    );
  }

  if ((query.length === 0) && (results.nbHits === 0)) {
    return (
      <Flex
        justifyContent="center"
        py="10x"
      >
        <Spinner />
      </Flex>
    );
  }

  if ((query.length > 0) && (results.nbHits === 0)) {
    return (
      <Stack
        spacing="4x"
        py="10x"
      >
        <Flex
          justifyContent="center"
          position="relative"
          height="10x"
          mb="4x"
        >
          <Box
            position="absolute"
            width="10x"
            height="10x"
          >
            <Icon
              icon="search-o"
              size="10x"
              position="absolute"
              inset={0}
            />
            <Icon
              icon="close-s"
              size="6x"
              position="absolute"
              inset={0}
              top="1x"
              left="1x"
            />
          </Box>
        </Flex>
        <Text textAlign="center">
          No results found for &quot;{results.query}&quot;
        </Text>
      </Stack>
    );
  }

  const groupedEntries = Object.entries(_groupBy(_orderBy(results.hits, 'data.title'), 'parent.title'));

  return (
    <>
      <Stack
        flex="1" // Take up all available space
        px="3x"
        py="2x"
        overflowY="auto"
      >
        {groupedEntries.map(([groupName, hits]) => (
          <Box key={groupName}>
            <Box my="2x">
              <Text color={colorStyle.color.secondary}>
                {groupName}
              </Text>
            </Box>
            {ensureArray(hits).map(hit => (
              <Box key={hit.objectID}>
                <InstantSearchRefinementLink
                  href={`/${hit.data.path}`}
                  onClick={handleClickRefinementLinkBy(hit)}
                >
                  <Icon
                    icon="menu"
                    size="6x"
                  />
                  <Highlight
                    searchWords={hit?._highlightResult?.data?.title?.matchedWords}
                    highlightTag="mark"
                    textToHighlight={hit?.data?.title}
                    highlightStyle={{
                      backgroundColor: '#1E90FF',
                      color: colors[colorStyle.color.primary],
                    }}
                  />
                </InstantSearchRefinementLink>
                <Divider my="2x" />
              </Box>
            ))}
          </Box>
        ))}
      </Stack>
      {(results.nbPages > 1) && (
        <>
          <Divider />
          <Flex my="3x" justifyContent="center">
            <InstantSearchPagination />
          </Flex>
        </>
      )}
    </>
  );
};

InstantSearchRefinementList.displayName = 'InstantSearchRefinementList';

export default InstantSearchRefinementList;
