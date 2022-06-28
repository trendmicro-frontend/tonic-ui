import { render } from '@testing-library/react';
import React, { forwardRef, useRef } from 'react';
import useMergeRefs from './useMergeRefs';

describe('useMergeRefs', () => {
  const TestComponent = forwardRef((props, ref) => {
    const internalRef = useRef();
    const mergedRefs = useMergeRefs(internalRef, ref);

    return (
      <div
        ref={mergedRefs}
        {...props}
      >
        Test Component
      </div>
    );
  });

  it('should be defined', () => {
    expect(useMergeRefs).toBeDefined();
  });

  it('should merge refs', () => {
    const ref = { current: undefined };
    render(
      <TestComponent ref={ref} />
    );

    expect(ref.current.innerHTML).toBe('Test Component');
  });
});
