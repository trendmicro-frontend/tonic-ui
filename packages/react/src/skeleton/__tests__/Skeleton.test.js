import { screen } from '@testing-library/react';
import { render } from '@tonic-ui/react/test-utils/render';
import { DarkMode, LightMode, Skeleton } from '@tonic-ui/react/src';
import React from 'react';

describe('Skeleton', () => {
  it('should render correctly', () => {
    const renderOptions = {};
    const { container } = render((
      <>
        {/* Dark mode */}
        <DarkMode>
          <Skeleton
            data-testid="dark:text"
            variant="text"
            width={120}
          />
          <Skeleton
            data-testid="dark:rectangle"
            variant="rectangle"
            width={120}
            height={40}
          />
          <Skeleton
            data-testid="dark:circle"
            variant="circle"
            width={40}
            height={40}
          />
        </DarkMode>

        {/* Light mode */}
        <LightMode>
          <Skeleton
            data-testid="light:text"
            variant="text"
            width={120}
          />
          <Skeleton
            data-testid="light:rectangle"
            variant="rectangle"
            width={120}
            height={40}
          />
          <Skeleton
            data-testid="light:circle"
            variant="circle"
            width={40}
            height={40}
          />
        </LightMode>
      </>
    ), renderOptions);

    expect(container).toMatchSnapshot();

    { // Dark mode
      const expectedBackgroundColor = 'var(--tonic-colors-_overlay-thinner)';

      // text
      expect(screen.getByTestId('dark:text')).toHaveStyle({
        'background-color': expectedBackgroundColor,
        width: '120px',
      });
      // rectangle
      expect(screen.getByTestId('dark:rectangle')).toHaveStyle({
        'background-color': expectedBackgroundColor,
        height: '40px',
        width: '120px',
      });
      // circle
      expect(screen.getByTestId('dark:circle')).toHaveStyle({
        'background-color': expectedBackgroundColor,
        height: '40px',
        width: '40px',
      });
    }

    { // Light mode
      const expectedBackgroundColor = 'var(--tonic-colors-_overlay-thinner)';

      // text
      expect(screen.getByTestId('light:text')).toHaveStyle({
        'background-color': expectedBackgroundColor,
        width: '120px',
      });
      // rectangle
      expect(screen.getByTestId('light:rectangle')).toHaveStyle({
        'background-color': expectedBackgroundColor,
        height: '40px',
        width: '120px',
      });
      // circle
      expect(screen.getByTestId('light:circle')).toHaveStyle({
        'background-color': expectedBackgroundColor,
        height: '40px',
        width: '40px',
      });
    }
  });
});
