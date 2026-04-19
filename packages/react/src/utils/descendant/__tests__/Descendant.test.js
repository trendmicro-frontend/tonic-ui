import { screen, waitFor } from '@testing-library/react';
import { render } from '@tonic-ui/react/test-utils/render';
import { useRef } from 'react';
import Descendant from '../Descendant';
import useDescendant from '../useDescendant';

const DescendantItem = ({ label }) => {
  const ref = useRef(null);
  const { index } = useDescendant(ref.current);
  return <div ref={ref} data-testid={`item-${label}`} data-index={index} />;
};

describe('Descendant', () => {
  it('should register descendants and assign correct indices', async () => {
    render(
      <Descendant>
        <DescendantItem label="a" />
        <DescendantItem label="b" />
        <DescendantItem label="c" />
      </Descendant>
    );

    await waitFor(() => {
      expect(screen.getByTestId('item-a')).toHaveAttribute('data-index', '0');
      expect(screen.getByTestId('item-b')).toHaveAttribute('data-index', '1');
      expect(screen.getByTestId('item-c')).toHaveAttribute('data-index', '2');
    });
  });

  it('should re-register descendant when index changes without duplicating', async () => {
    render(
      <Descendant>
        <DescendantItem label="x" />
      </Descendant>
    );

    await waitFor(() => {
      expect(screen.getByTestId('item-x')).toHaveAttribute('data-index', '0');
    });
  });
});
