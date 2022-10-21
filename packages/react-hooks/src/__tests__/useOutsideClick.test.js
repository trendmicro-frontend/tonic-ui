import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { useRef } from 'react';
import { useOutsideClick } from '..';

const TestComponent = ({ onClickOutside, events }) => {
  const ref = useRef();
  useOutsideClick(ref, onClickOutside, events);

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

  it('should call the handler when the user clicks outside the element', async () => {
    const onClickOutside = jest.fn();
    render(
      <TestComponent onClickOutside={onClickOutside} />
    );

    const insideDiv = screen.getByText('Inside', { exact: false });
    const outsideDiv = screen.getByText('Outside', { exact: false });

    await userEvent.click(insideDiv);
    expect(onClickOutside).toHaveBeenCalledTimes(0);

    await userEvent.click(outsideDiv);
    expect(onClickOutside).toHaveBeenCalledTimes(1);

    await userEvent.click(insideDiv);
    expect(onClickOutside).toHaveBeenCalledTimes(1);

    await userEvent.click(outsideDiv);
    expect(onClickOutside).toHaveBeenCalledTimes(2);
  });

  it('should not call the handler when passing `false` or empty array to the `events` prop', async () => {
    const onClickOutside = jest.fn();
    const events = false;
    render(
      <TestComponent onClickOutside={onClickOutside} events={events} />
    );

    const insideDiv = screen.getByText('Inside', { exact: false });
    const outsideDiv = screen.getByText('Outside', { exact: false });

    await userEvent.click(insideDiv);
    expect(onClickOutside).toHaveBeenCalledTimes(0);

    await userEvent.click(outsideDiv);
    expect(onClickOutside).toHaveBeenCalledTimes(0);
  });
});
