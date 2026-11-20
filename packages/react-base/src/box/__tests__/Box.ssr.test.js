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
