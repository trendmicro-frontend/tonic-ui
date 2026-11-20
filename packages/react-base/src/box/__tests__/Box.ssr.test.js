/**
 * @jest-environment node
 */
import { renderToString } from 'react-dom/server';
import { Box } from '..';

const responsiveStyle = ({ breakpoints }) => breakpoints
  ? { [breakpoints.gte('sm')]: { color: 'blue' } }
  : { color: 'red' };

test('a Box without a provider renders base styles without breakpoint rules', () => {
  const html = renderToString(<Box sx={responsiveStyle}>Bare Box</Box>);
  expect(html).toContain('Bare Box');
  expect(html).toContain('color:red');
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
