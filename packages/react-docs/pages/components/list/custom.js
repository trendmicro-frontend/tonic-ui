import {
  Autocomplete,
  AutocompleteInput,
  Box,
  Divider,
  Highlight,
  List,
  ListItem,
} from '@tonic-ui/react';
import { useState } from 'react';

// Predefined CSS `list-style-type` keyword values.
const listStyleTypes = [
  // Basic markers
  'none',
  'disc',
  'circle',
  'square',
  'disclosure-open',
  'disclosure-closed',
  // Numeric
  'decimal',
  'decimal-leading-zero',
  'cjk-decimal',
  // Roman
  'lower-roman',
  'upper-roman',
  // Alphabetic / Greek
  'lower-alpha',
  'lower-latin',
  'upper-alpha',
  'upper-latin',
  'lower-greek',
  // Armenian / Georgian / Hebrew
  'armenian',
  'lower-armenian',
  'upper-armenian',
  'georgian',
  'hebrew',
  // CJK ordinals
  'cjk-earthly-branch',
  'cjk-heavenly-stem',
  'cjk-ideographic',
  // Other scripts
  'arabic-indic',
  'bengali',
  'cambodian',
  'khmer',
  'devanagari',
  'ethiopic-numeric',
  'gujarati',
  'gurmukhi',
  'kannada',
  'lao',
  'malayalam',
  'mongolian',
  'myanmar',
  'oriya',
  'persian',
  'tamil',
  'telugu',
  'thai',
  'tibetan',
  // Japanese kana
  'hiragana',
  'hiragana-iroha',
  'katakana',
  'katakana-iroha',
  // CJK formal / informal
  'japanese-formal',
  'japanese-informal',
  'korean-hangul-formal',
  'korean-hanja-formal',
  'korean-hanja-informal',
  'simp-chinese-formal',
  'simp-chinese-informal',
  'trad-chinese-formal',
  'trad-chinese-informal',
].map((label) => ({ label }));

const App = () => {
  // No selection by default; the list falls back to its native marker.
  const [listStyleType, setListStyleType] = useState(null);

  return (
    <>
      <List sx={{ listStyleType: listStyleType ?? undefined }}>
        <ListItem>Item 1</ListItem>
        <ListItem>Item 2</ListItem>
        <ListItem>Item 3</ListItem>
      </List>
      <Divider my="4x" />
      <Box maxWidth={240}>
        <Autocomplete
          autoHighlight
          getItemLabel={(item) => item.label}
          isClearable
          items={listStyleTypes}
          onChange={(item) => setListStyleType(item?.label ?? null)}
          portalled
          selectOnFocus
          renderInput={(params) => (
            <AutocompleteInput
              {...params}
              placeholder="Choose a list style type"
            />
          )}
          renderContent={({ items: filteredItems, renderItems }) => {
            if (filteredItems.length === 0) {
              return (
                <Box px="3x" py="2x">
                  No items
                </Box>
              );
            }
            return renderItems(filteredItems);
          }}
          renderItem={(item, { inputValue: query }) => (
            <Highlight variant="highlight" query={query}>
              {item.label}
            </Highlight>
          )}
        />
      </Box>
    </>
  );
};

export default App;
