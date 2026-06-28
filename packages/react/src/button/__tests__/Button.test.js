import { render } from '@tonic-ui/react/test-utils/render';
import { Button } from '@tonic-ui/react/src';
import React from 'react';

describe('Button', () => {
  describe('variants', () => {
    const variants = ['default', 'primary', 'emphasis', 'secondary', 'ghost'];
    const sizes = ['sm', 'md', 'lg'];

    variants.forEach((variant) => {
      sizes.forEach((size) => {
        it(`should render ${variant} variant with ${size} size`, () => {
          const { asFragment } = render(
            <Button variant={variant} size={size}>
              Button
            </Button>
          );
          expect(asFragment()).toMatchSnapshot();
        });
      });
    });
  });

  describe('states', () => {
    it('should render disabled state', () => {
      const { asFragment } = render(
        <Button variant="primary" disabled>
          Disabled Button
        </Button>
      );
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render selected state', () => {
      const { asFragment } = render(
        <Button variant="primary" selected>
          Selected Button
        </Button>
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
