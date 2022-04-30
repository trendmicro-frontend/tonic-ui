import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { useRef } from 'react';
import useOutsideClick from './useOutsideClick';

const TestComponent = ({ onClickOutside }) => {
  const ref = useRef();
  useOutsideClick(ref, onClickOutside);

  return (
    <>
      <div ref={ref}>Inside</div>
      <div>Outside</div>
    </>
  );
};

describe('useOutsideClick', () => {
  it('should be defined', () => {
    expect(useOutsideClick).toBeDefined();
  });

  it('should call the handler when the user clicks outside the element', () => {
    const onClickOutside = jest.fn();
    render(
      <TestComponent onClickOutside={onClickOutside} />
    );

    const insideDiv = screen.getByText('Inside', { exact: false });
    const outsideDiv = screen.getByText('Outside', { exact: false });

    userEvent.click(insideDiv);
    expect(onClickOutside).toHaveBeenCalledTimes(0);

    userEvent.click(outsideDiv);
    expect(onClickOutside).toHaveBeenCalledTimes(1);

    userEvent.click(insideDiv);
    expect(onClickOutside).toHaveBeenCalledTimes(1);

    userEvent.click(outsideDiv);
    expect(onClickOutside).toHaveBeenCalledTimes(2);
  });
});
