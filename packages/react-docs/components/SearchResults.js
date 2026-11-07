import {
  Box,
  Button,
  Divider,
  Flex,
  Highlight,
  Spinner,
  Stack,
  Text,
  VisuallyHidden,
  useColorMode,
  useColorStyle,
} from '@tonic-ui/react';
import {
  ConnectErrorIcon,
} from '@tonic-ui/react-icons';
import { ensureArray } from 'ensure-type';
import { forwardRef, useEffect, useMemo, useState } from 'react';
import { routes } from '../config/sidebar-routes';
import {
  MIN_QUERY_LENGTH,
  SEARCH_RESULTS_PER_PAGE,
  getQueryTerms,
} from '../search/config.mjs';
import { getSnippet } from '../search/client.mjs';
import SearchPagination from './SearchPagination';
import SearchResultLink from './SearchResultLink';

const groupResults = (results) => {
  const groups = [];
  const groupsByName = new Map();

  for (const result of results) {
    const category = result.category || 'Documentation';
    if (!groupsByName.has(category)) {
      const group = {
        category,
        results: [],
      };
      groupsByName.set(category, group);
      groups.push(group);
    }
    groupsByName.get(category).results.push(result);
  }

  return groups;
};

const SearchResults = forwardRef((
  {
    status,
    error,
    query,
    results,
    suggestions,
    onSelect,
    onSuggestionSelect,
    onRetry,
    ...rest
  },
  ref,
) => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  const [page, setPage] = useState(1);
  const highlightTerms = useMemo(() => getQueryTerms(query), [query]);
  const getResultSnippet = (result) => getSnippet(result, highlightTerms);

  useEffect(() => {
    setPage(1);
  }, [query]);

  const pageCount = Math.max(1, Math.ceil(results.length / SEARCH_RESULTS_PER_PAGE));
  const pageResults = useMemo(() => {
    const start = (page - 1) * SEARCH_RESULTS_PER_PAGE;
    return results.slice(start, start + SEARCH_RESULTS_PER_PAGE);
  }, [page, results]);
  const groupedResults = useMemo(() => groupResults(pageResults), [pageResults]);
  const trimmedQuery = query.trim();
  const hasQuery = trimmedQuery.length >= MIN_QUERY_LENGTH;

  const statusText = (() => {
    if (status === 'loading') {
      return 'Loading search index';
    }
    if (status === 'error') {
      return 'Search is unavailable';
    }
    if (!hasQuery) {
      return '';
    }
    return results.length === 1 ? '1 result found' : `${results.length} results found`;
  })();

  if (status === 'error') {
    return (
      <Stack
        ref={ref}
        spacing="4x"
        px="4x"
        py="10x"
        {...rest}
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
            <ConnectErrorIcon
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
          {error ? (
            <Text textAlign="center">
              Error: {error.message}
            </Text>
          ) : null}
        </Stack>
        <Flex justifyContent="center">
          <Button onClick={onRetry}>
            Try again
          </Button>
        </Flex>
      </Stack>
    );
  }

  if (status === 'loading') {
    return (
      <Flex
        ref={ref}
        justifyContent="center"
        py="10x"
        {...rest}
      >
        <VisuallyHidden role="status" aria-live="polite">
          Loading search index
        </VisuallyHidden>
        <Spinner />
      </Flex>
    );
  }

  if (!hasQuery) {
    return (
      <Stack
        ref={ref}
        spacing="2x"
        px="4x"
        py="10x"
        {...rest}
      >
        <VisuallyHidden role="status" aria-live="polite">
          {statusText}
        </VisuallyHidden>
        <Text textAlign="center" color={colorStyle.color.secondary}>
          {trimmedQuery
            ? `Type at least ${MIN_QUERY_LENGTH} characters to search.`
            : 'Search components, hooks, and documentation.'}
        </Text>
      </Stack>
    );
  }

  if (results.length === 0) {
    return (
      <Stack
        ref={ref}
        spacing="4x"
        px="4x"
        py="10x"
        {...rest}
      >
        <VisuallyHidden role="status" aria-live="polite">
          {statusText}
        </VisuallyHidden>
        <Text textAlign="center">
          No results found for &quot;{query}&quot;
        </Text>
      </Stack>
    );
  }

  return (
    <Box ref={ref} {...rest}>
      <VisuallyHidden role="status" aria-live="polite">
        {statusText}
      </VisuallyHidden>
      {suggestions.length > 0 && (
        <Box px="3x" py="2x">
          <Box my="2x">
            <Text color={colorStyle.color.secondary}>
              Suggestions
            </Text>
          </Box>
          <Flex flexWrap="wrap" gap="2x">
            {suggestions.map((suggestion) => (
              <Button
                key={suggestion}
                data-search-focusable="true"
                data-search-suggestion="true"
                size="sm"
                variant="secondary"
                onClick={() => onSuggestionSelect(suggestion)}
              >
                {suggestion}
              </Button>
            ))}
          </Flex>
        </Box>
      )}
      <Stack
        id="search-results"
        role="group"
        aria-label="Search results"
        flex="1" // Take up all available space
        px="3x"
        py="2x"
        overflowY="auto"
      >
        {groupedResults.map((group) => {
          const Icon = routes.find(({ title }) => title === group.category)?.icon;

          return (
            <Box key={group.category}>
              <Box my="2x">
                <Text color={colorStyle.color.secondary}>
                  {group.category}
                </Text>
              </Box>
              {ensureArray(group.results).map((result) => {
                const snippet = getResultSnippet(result);

                return (
                  <Box key={result.id}>
                    <SearchResultLink
                      href={result.url}
                      height="auto"
                      py="2x"
                      data-search-focusable="true"
                      data-search-result="true"
                      onClick={() => onSelect(result)}
                    >
                      {Icon ? <Icon size="6x" /> : null}
                      <Stack
                        flex="1"
                        minWidth={0}
                        spacing="1x"
                        textAlign="left"
                      >
                        <Text
                          overflow="hidden"
                          textOverflow="ellipsis"
                          whiteSpace="nowrap"
                        >
                          <Highlight as="span" query={highlightTerms}>
                            {result.title}
                          </Highlight>
                          {result.heading ? (
                            <Text as="span" color={colorStyle.color.tertiary}>
                              {' › '}
                              <Highlight as="span" query={highlightTerms}>
                                {result.heading}
                              </Highlight>
                            </Text>
                          ) : null}
                        </Text>
                        {snippet ? (
                          <Text
                            fontSize="sm"
                            lineHeight="sm"
                            color={colorStyle.color.tertiary}
                            sx={{
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                            }}
                          >
                            <Highlight as="span" query={highlightTerms}>
                              {snippet}
                            </Highlight>
                          </Text>
                        ) : null}
                      </Stack>
                    </SearchResultLink>
                    <Divider my="2x" />
                  </Box>
                );
              })}
            </Box>
          );
        })}
      </Stack>
      {(pageCount > 1) && (
        <>
          <Divider />
          <Flex my="3x" justifyContent="center">
            <SearchPagination
              count={pageCount}
              page={page}
              onChange={(nextPage) => setPage(nextPage)}
            />
          </Flex>
        </>
      )}
    </Box>
  );
});

SearchResults.displayName = 'SearchResults';

export default SearchResults;
