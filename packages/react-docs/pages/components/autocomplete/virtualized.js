import {
  Autocomplete,
  AutocompleteInput,
  Box,
  Flex,
  Grid,
  Highlight,
  Text,
} from '@tonic-ui/react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useCallback, useRef, useState } from 'react';

const ITEM_HEIGHT = 36;
const VISIBLE_COUNT = 8;

// 10,000 synthetic items — large enough that rendering them all would lag.
const generatedItems = Array.from({ length: 10000 }, (_, i) => ({
  value: `item-${i}`,
  label: `Item ${i + 1}`,
}));

const VirtualList = ({ items, getItemProps, renderItem, AutocompleteItem, virtualizerRef }) => {
  const scrollRef = useRef(null);
  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => ITEM_HEIGHT,
    overscan: 5,
  });

  // Expose the virtualizer so the parent can call `scrollToIndex` from `onHighlightChange`.
  // Stored in a ref to avoid render-loop wiring.
  virtualizerRef.current = virtualizer;

  return (
    <Box
      ref={scrollRef}
      height={Math.min(items.length, VISIBLE_COUNT) * ITEM_HEIGHT}
      overflowY="auto"
    >
      <Box height={virtualizer.getTotalSize()} position="relative">
        {virtualizer.getVirtualItems().map((virtualRow) => {
          const item = items[virtualRow.index];
          const itemProps = getItemProps({ index: virtualRow.index, item });
          return (
            <Box
              key={virtualRow.key}
              position="absolute"
              top={0}
              left={0}
              width="100%"
              transform={`translateY(${virtualRow.start}px)`}
              height={virtualRow.size}
            >
              <AutocompleteItem {...itemProps}>
                {renderItem(item)}
              </AutocompleteItem>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

const App = () => {
  const [value, setValue] = useState(null);
  const virtualizerRef = useRef(null);

  // Scroll the virtualized list when keyboard nav moves the highlight off-screen.
  // Mouse hover already implies the row is visible, so skip it.
  const handleHighlightChange = useCallback(({ index, reason }) => {
    if (reason === 'keyboard' && index >= 0 && virtualizerRef.current) {
      virtualizerRef.current.scrollToIndex(index, { align: 'auto' });
    }
  }, []);

  return (
    <Box>
      <Flex fontFamily="mono" mb="4x">
        <Grid
          columnGap="2x"
          rowGap="2x"
          templateColumns="auto 1fr"
        >
          <Text>value:</Text>
          <Text>{JSON.stringify(value)}</Text>
        </Grid>
      </Flex>
      <Autocomplete
        sx={{ width: 400 }}
        autoHighlight
        isClearable
        items={generatedItems}
        onChange={setValue}
        onHighlightChange={handleHighlightChange}
        portalled
        selectOnFocus
        renderInput={(params) => (
          <AutocompleteInput
            {...params}
            placeholder={`Search ${generatedItems.length.toLocaleString()} items`}
          />
        )}
        renderContent={({ items, getItemProps, renderItem, AutocompleteItem }) => {
          if (items.length === 0) {
            return (
              <Box px="3x" py="2x">
                No items
              </Box>
            );
          }
          return (
            // Use virtualizer's container as the scrollable surface
            <VirtualList
              items={items}
              getItemProps={getItemProps}
              renderItem={renderItem}
              AutocompleteItem={AutocompleteItem}
              virtualizerRef={virtualizerRef}
            />
          );
        }}
        renderItem={(item, { inputValue: query }) => (
          <Highlight variant="highlight" query={query}>
            {item.label}
          </Highlight>
        )}
        slotProps={{
          content: {
            // The virtualizer controls scrolling, so disable the list's default scroll
            // to avoid rendering a duplicate scrollbar on the outer container.
            // On macOS with "Always show scrollbars," both tracks may appear.
            // On Windows, overlay scrollbars typically hide the duplication.
            overflowY: 'hidden',
          },
        }}
      />
    </Box>
  );
};

export default App;
