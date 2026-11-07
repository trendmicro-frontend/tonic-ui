import { Global, css } from '@emotion/react';
import {
  Box,
  Divider,
  Modal,
  ModalOverlay,
  ModalContent,
  SearchInput,
  useTheme,
} from '@tonic-ui/react';
import { forwardRef, useCallback, useEffect, useRef } from 'react';
import useSearch from '../hooks/useSearch';
import useTrack from '../hooks/useTrack';
import x from '../utils/json-stringify';
import SearchResults from './SearchResults';
import { useSearchQuery } from './SearchQueryProvider';

const FOCUSABLE_SELECTOR = 'input:not([disabled]), [data-search-focusable="true"]:not([disabled])';

const SearchModal = forwardRef((
  {
    onClose,
    ...rest
  },
  ref,
) => {
  const theme = useTheme();
  const track = useTrack();
  const contentRef = useRef();
  const { query: activeSearchQuery, setQuery: setActiveSearchQuery } = useSearchQuery();
  const {
    query,
    setQuery,
    clear,
    status,
    error,
    results,
    suggestions,
    retry,
  } = useSearch();

  // A search result hands its query over through `sessionStorage`; reopen the
  // dialog with that query so the header keeps showing it.
  useEffect(() => {
    if (activeSearchQuery) {
      setQuery(activeSearchQuery);
    }
  }, []);

  const handleChange = useCallback((event) => {
    const searchInputValue = event.currentTarget.value;
    setQuery(searchInputValue);
    track('InstantSearch', 'change_search_input', searchInputValue);
  }, [setQuery, track]);

  const handleClearInput = useCallback(() => {
    clear();
    // Clearing the search also removes the page highlight.
    setActiveSearchQuery('');
    track('InstantSearch', 'clear_search_input');
  }, [clear, setActiveSearchQuery, track]);

  const handleSuggestionSelect = useCallback((suggestion) => {
    setQuery(suggestion);
    track('InstantSearch', 'select_search_suggestion', suggestion);
  }, [setQuery, track]);

  const handleSelectResult = useCallback((hit) => {
    const sectionTitle = hit?.category || '';
    const title = hit?.heading || hit?.title || '';

    track('InstantSearch', 'click_search_result', x({ path: `/${hit?.path}`, title: [sectionTitle, title].filter(Boolean).join(' > ') }));

    /**
     * The function uses the `category` property of the result object to get the
     * title of the parent refinement, and then uses this title to select a DOM
     * element from #sidenav with a `data-title` attribute that matches the title.
     * If the DOM element has a `data-expanded` attribute with a value of "false",
     * the function simulates a mouse click on the element by creating a new
     * MouseEvent and calling the dispatchEvent method on the element.
     */
    if (sectionTitle) {
      const button = document.querySelector(`#sidenav button[data-title=${x(sectionTitle)}]`);
      if (button?.dataset?.expanded === 'false') {
        // Simulate a mouse click on the button
        const event = new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        });
        button.dispatchEvent(event);
      }
    }

    setActiveSearchQuery(query);
    onClose();
  }, [onClose, query, setActiveSearchQuery, track]);

  const handleKeyDown = useCallback((event) => {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') {
      return;
    }

    const container = contentRef.current;
    if (!container) {
      return;
    }

    const focusableElements = Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR));
    if (focusableElements.length === 0) {
      return;
    }

    event.preventDefault();

    const activeElement = document.activeElement;
    const activeIndex = focusableElements.indexOf(activeElement);
    const nextIndex = (event.key === 'ArrowDown')
      ? (activeIndex + 1) % focusableElements.length
      : (activeIndex - 1 + focusableElements.length) % focusableElements.length;

    focusableElements[nextIndex]?.focus();
  }, []);

  return (
    <Modal
      ref={ref}
      autoFocus
      ensureFocus
      closeOnEsc
      closeOnOutsideClick
      isOpen
      onClose={onClose}
      size="md"
      {...rest}
    >
      <Global
        styles={css`
          body {
            overflow: hidden;
          }
        `}
      />
      <ModalOverlay />
      <ModalContent
        marginTop="12x"
        maxHeight={`calc(100vh - ${theme?.space['12x']} - ${theme?.space['12x']})`}
        minHeight={null}
      >
        <Box
          ref={contentRef}
          display="flex"
          flexDirection="column"
          flex="1"
          minHeight={0}
          onKeyDown={handleKeyDown}
        >
          <Box p="4x">
            <SearchInput
              size="lg"
              placeholder="Search..."
              value={query}
              slotProps={{
                input: {
                  'aria-label': 'Search documentation',
                  'aria-controls': 'search-results',
                  'autoComplete': 'off',
                  'spellCheck': false,
                },
              }}
              onChange={handleChange}
              onClearInput={handleClearInput}
            />
          </Box>
          <Divider />
          <SearchResults
            status={status}
            error={error}
            query={query}
            results={results}
            suggestions={suggestions}
            onSelect={handleSelectResult}
            onSuggestionSelect={handleSuggestionSelect}
            onRetry={retry}
          />
        </Box>
      </ModalContent>
    </Modal>
  );
});

SearchModal.displayName = 'SearchModal';

export default SearchModal;
