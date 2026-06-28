import React, { createRef, useRef } from 'react';
import { Box } from '@tonic-ui/react';

// === Box ===
<Box>Content</Box>;

// With as prop
<Box as="span">Span element</Box>;
<Box as="section">Section element</Box>;
<Box as="article">Article element</Box>;

// StyleProps
<Box
  padding="4x"
  margin="2x"
  backgroundColor="gray:10"
  borderRadius="md"
  display="flex"
  alignItems="center"
  justifyContent="center"
>
  Styled box
</Box>;

// With responsive styles
<Box
  width={{ sm: '100%', md: '50%', lg: '25%' }}
  padding={{ sm: '2x', md: '4x' }}
>
  Responsive box
</Box>;

// Ref
const boxRef = createRef<HTMLDivElement>();
<Box ref={boxRef}>With ref</Box>;

// Ref with HTMLElement (broader type)
function BoxWithHTMLElementRef() {
  const boxRef = useRef<HTMLElement>(null);
  return <Box ref={boxRef} />;
}

// Callback ref
function BoxWithCallbackRef() {
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  return (
    <Box
      ref={(el) => {
        sectionRefs.current[0] = el;
      }}
    />
  );
}

// === sx prop ===

// Creating a custom button with nested selectors
<Box
  as="button"
  sx={{
    backgroundColor: 'red.600',
    color: 'text.primary',
    '&:focus:not(:active)': {
      backgroundColor: 'red.600',
    },
    '&:hover': {
      backgroundColor: 'red.500',
    },
    '&:active': {
      backgroundColor: 'red.700',
    },
  }}
>
  Emphasis Button
</Box>;

// Defining CSS custom properties (CSS variables)
<Box sx={{ '--my-color-dodger-blue': '#1E90FF' }}>
  <Box backgroundColor="var(--my-color-dodger-blue)" color="text.normal.primary">
    This text has a background of Dodger Blue
  </Box>
</Box>;

// Using media queries
<Box
  fontSize="md"
  lineHeight="md"
  sx={{
    '@media screen and (min-width: 640px)': {
      fontSize: 'lg',
      lineHeight: 'lg',
    },
    '@media screen and (min-width: 1024px)': {
      fontSize: 'xl',
      lineHeight: 'xl',
    },
    '@media screen and (min-width: 1280px)': {
      fontSize: '2xl',
      lineHeight: '2xl',
    },
  }}
>
  This text scales with the screen width
</Box>;

// Callback values (per-property function receives the theme)
<Box sx={{ color: (theme) => theme.sizes['2x'] }} />;

// Array of objects with conditional styles
<Box
  sx={[
    { color: 'text.normal.primary' },
    {
      '&:hover': {
        backgroundColor: 'gray.800',
        color: 'text.normal.primary',
      },
    },
    {
      '&:hover': {
        backgroundColor: 'gray.500',
        color: 'text.normal.primary',
      },
    },
    {
      '&:hover': {
        backgroundColor: 'yellow.500',
        color: 'text.normal.inverse',
      },
    },
  ]}
>
  Hover Me
</Box>;

// Array of callbacks
<Box
  sx={[
    { color: 'text.normal.primary' },
    (theme) => ({
      '&:hover': {
        color: 'text.normal.secondary',
      },
    }),
  ]}
>
  Hover Me
</Box>;

// Passing the sx prop
function ListItem({ sx, ...rest }: React.ComponentProps<typeof Box>) {
  return (
    <Box
      sx={[
        { color: 'text.normal.primary' },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...rest}
    />
  );
}
<ListItem sx={{ color: 'text.normal.secondary', fontWeight: 'semibold' }}>
  Header
</ListItem>;

// Layout composition
<Box as="main" padding="4x">
  <Box as="header" marginBottom="4x">
    Header
  </Box>
  <Box as="section">
    Content
  </Box>
  <Box as="footer" marginTop="4x">
    Footer
  </Box>
</Box>;
