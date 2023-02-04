import { getByTestId } from '@testing-library/dom';
import { render } from '@tonic-ui/react/test-utils/render';
import { DarkMode, LightMode, Skeleton } from '@tonic-ui/react/src';
import React from 'react';

describe('Skeleton', () => {
  it('should render correctly', () => {
    { // Dark mode
      const { container } = render(
        <DarkMode>
          <Skeleton data-testid="text" variant="text" width={120} />
          <Skeleton data-testid="rectangle" variant="rectangle" width={120} height={40} />
          <Skeleton data-testid="circle" variant="circle" width="10x" height="10x" />
        </DarkMode>
      );

      const expectedBackgroundColor = 'rgba(255, 255, 255, 0.08)';

      // text
      expect(getByTestId(container, 'text')).toHaveStyle({
        'background-color': expectedBackgroundColor,
        height: '.75rem',
        width: '120px',
      });
      // rectangle
      expect(getByTestId(container, 'rectangle')).toHaveStyle({
        'background-color': expectedBackgroundColor,
        height: '40px',
        width: '120px',
      });
      // circle
      expect(getByTestId(container, 'circle')).toHaveStyle({
        'background-color': expectedBackgroundColor,
        height: '2.5rem',
        width: '2.5rem',
      });
    }

    { // Light mode
      const { container } = render(
        <LightMode>
          <Skeleton data-testid="text" variant="text" width={120} />
          <Skeleton data-testid="rectangle" variant="rectangle" width={120} height={40} />
          <Skeleton data-testid="circle" variant="circle" width="10x" height="10x" />
        </LightMode>
      );

      const expectedBackgroundColor = 'rgba(0, 0, 0, 0.08)';
      // text
      expect(getByTestId(container, 'text')).toHaveStyle({
        'background-color': expectedBackgroundColor,
        height: '.75rem',
        width: '120px',
      });
      // rectangle
      expect(getByTestId(container, 'rectangle')).toHaveStyle({
        'background-color': expectedBackgroundColor,
        height: '40px',
        width: '120px',
      });
      // circle
      expect(getByTestId(container, 'circle')).toHaveStyle({
        'background-color': expectedBackgroundColor,
        height: '2.5rem',
        width: '2.5rem',
      });
    }
  });
});
