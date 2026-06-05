import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useEffect, useState } from 'react';
import { useConst, useEventCallback } from '@tonic-ui/react-hooks/src';

describe('useEventCallback', () => {
  it('should be defined', () => {
    expect(useEventCallback).toBeDefined();
  });

  it('should return a memoized function even if value changes', async () => {
    const user = userEvent.setup();
    const TestComponent = () => {
      const [value, setValue] = useState('');
      const onChange = useEventCallback((event) => {
        const nextValue = event.target.value;
        setValue(nextValue);
      }, [value]);
      const memoizedEventCallback = useConst(() => onChange);

      useEffect(() => {
        expect(onChange).toEqual(memoizedEventCallback);
      }, [value, onChange, memoizedEventCallback]);

      return (
        <input aria-label="Enter your text" value={value} onChange={onChange} />
      );
    };

    const { container } = render(<TestComponent />);
    const input = container.querySelector('input');
    await user.type(input, 'Hello');
  });
});
