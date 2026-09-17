/**
 * @jest-environment node
 */
import { renderToString } from 'react-dom/server';
import { Box } from '../../box';
import Popper from '../Popper';

describe('Popper server rendering', () => {
  it('should render on the server without a DOM', () => {
    const PopperContent = () => <Box>Popper Content</Box>;
    expect(() => {
      renderToString(
        <Popper isOpen>
          <PopperContent />
        </Popper>
      );
    }).not.toThrow();
  });
});
