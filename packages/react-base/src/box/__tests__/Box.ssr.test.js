/**
 * @jest-environment node
 */
import { ThemeProvider } from '@emotion/react';
import { createBreakpoints, createContainerQueries } from '@tonic-ui/utils/internal';
import { renderToString } from 'react-dom/server';
import { Box } from '..';

const responsiveStyle = ({ breakpoints }) => breakpoints
  ? { [breakpoints.gte('sm')]: { color: 'blue' } }
  : { color: 'red' };

test('a Box without a provider renders base styles without breakpoint rules', () => {
  const html = renderToString(
    <>
      <Box sx={responsiveStyle}>Bare Box</Box>
      <Box display={{ _: 'block', sm: 'none' }}>Responsive Box</Box>
    </>
  );
  expect(html).toContain('Bare Box');
  expect(html).toContain('Responsive Box');
  expect(html).toContain('color:red');
  expect(html).toContain('display:block');
  expect(html).not.toContain('@media');
});

const containerStyle = ({ containerQueries }) => containerQueries
  ? { [containerQueries.gte('sm')]: { display: 'flex' } }
  : { display: 'block' };

test('a Box without a provider renders base styles without container rules', () => {
  const html = renderToString(<Box sx={containerStyle}>Bare container child</Box>);
  expect(html).toContain('Bare container child');
  expect(html).toContain('display:block');
  expect(html).not.toContain('@container');
});

test('resolves base maps without a provider', () => {
  const html = renderToString(<Box __sx={{ width: { base: '100%', md: '50%' } }} />);
  expect(html).toContain('width:100%');
  expect(html).not.toContain('@media');
});

const cascadeSx = (currentTheme) => [
  { width: { md: '50%' } },
  {
    '& .child': {
      [currentTheme.breakpoints.gte('md')]: { display: 'grid' },
      [currentTheme.containerQueries('sidebar').gte('20rem')]: { color: 'red' },
    },
  },
];

test('renders all three responsive channels in cascade order', () => {
  const breakpoints = createBreakpoints({ values: { md: 48 }, unit: 'rem' });
  const theme = { breakpoints, containerQueries: createContainerQueries(breakpoints) };
  const html = renderToString(
    <ThemeProvider theme={theme}>
      <Box
        __sx={{ width: { _: '100%', md: '75%' } }}
        height={{ _: '20px', md: '40px' }}
        sx={cascadeSx}
      />
    </ThemeProvider>
  );
  expect(html).toContain('width:100%');
  expect(html).toMatch(/@media \(width >= 48rem\)[^}]+width:75%[^]*@media \(width >= 48rem\)[^}]+width:50%/);
  expect(html).toMatch(/@media \(width >= 48rem\)[^}]+height:40px/);
  expect(html).toMatch(/@media \(width >= 48rem\)[^}]+ \.child\{display:grid/);
  expect(html).toMatch(/@container sidebar \(width >= 20rem\)[^}]+ \.child\{color:red/);
});
