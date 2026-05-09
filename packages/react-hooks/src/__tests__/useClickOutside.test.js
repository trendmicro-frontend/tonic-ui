import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRef } from 'react';
import { useClickOutside } from '@tonic-ui/react-hooks/src';

const GROUP_ONE = 1;
const GROUP_TWO = 2;

const TestComponent = ({ activeGroups = [], events, onClickOutside }) => {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);

  // Always call hooks with fixed refs, but only "activate" those needed
  useClickOutside(
    activeGroups.includes(GROUP_ONE) ? [ref1, ref2] : [],
    onClickOutside,
    { events }
  );

  useClickOutside(
    activeGroups.includes(GROUP_TWO) ? [ref3, ref4] : [],
    onClickOutside,
    { events }
  );

  return (
    <>
      <div>
        {activeGroups.includes(GROUP_ONE) && (
          <>
            <div ref={ref1}>Inside 1</div>
            <div ref={ref2}>Inside 2</div>
          </>
        )}
      </div>
      <div>
        {activeGroups.includes(GROUP_TWO) && (
          <>
            <div ref={ref3}>Inside 3</div>
            <div ref={ref4}>Inside 4</div>
          </>
        )}
      </div>
      <div>Outside</div>
    </>
  );
};

describe('useClickOutside', () => {
  it('should be defined', () => {
    expect(useClickOutside).toBeDefined();
  });

  it('should not call the handler when no groups are active', async () => {
    const user = userEvent.setup();
    const onClickOutside = jest.fn();

    render(
      <TestComponent activeGroups={[]} onClickOutside={onClickOutside} />
    );

    const outsideDiv = screen.getByText('Outside', { exact: false });

    await user.click(outsideDiv);
    expect(onClickOutside).toHaveBeenCalledTimes(0);
  });

  it('should not call the handler if `events` is false or an empty array', async () => {
    const user = userEvent.setup();
    const onClickOutside = jest.fn();
    const events = false;
    render(
      <TestComponent activeGroups={[GROUP_ONE]} onClickOutside={onClickOutside} events={events} />
    );

    const insideDiv1 = screen.getByText('Inside 1', { exact: false });
    const insideDiv2 = screen.getByText('Inside 2', { exact: false });
    const outsideDiv = screen.getByText('Outside', { exact: false });

    await user.click(insideDiv1);
    expect(onClickOutside).toHaveBeenCalledTimes(0);

    await user.click(insideDiv2);
    expect(onClickOutside).toHaveBeenCalledTimes(0);

    await user.click(outsideDiv);
    expect(onClickOutside).toHaveBeenCalledTimes(0);
  });

  it('should handle custom events correctly', async () => {
    const user = userEvent.setup();
    const onClickOutside = jest.fn();
    const events = ['mouseup'];
    render(
      <TestComponent activeGroups={[GROUP_ONE]} onClickOutside={onClickOutside} events={events} />
    );

    const insideDiv1 = screen.getByText('Inside 1', { exact: false });
    const insideDiv2 = screen.getByText('Inside 2', { exact: false });
    const outsideDiv = screen.getByText('Outside', { exact: false });

    await user.click(insideDiv1);
    expect(onClickOutside).toHaveBeenCalledTimes(0);

    await user.click(outsideDiv);
    expect(onClickOutside).toHaveBeenCalledTimes(1);

    await user.click(insideDiv2);
    expect(onClickOutside).toHaveBeenCalledTimes(1);

    await user.click(outsideDiv);
    expect(onClickOutside).toHaveBeenCalledTimes(2);
  });

  it('should call the handler when the user clicks outside the elements (single group)', async () => {
    const user = userEvent.setup();
    const onClickOutside = jest.fn();
    render(
      <TestComponent activeGroups={[GROUP_ONE]} onClickOutside={onClickOutside} />
    );

    const insideDiv1 = screen.getByText('Inside 1', { exact: false });
    const insideDiv2 = screen.getByText('Inside 2', { exact: false });
    const outsideDiv = screen.getByText('Outside', { exact: false });

    await user.click(insideDiv1);
    expect(onClickOutside).toHaveBeenCalledTimes(0);

    await user.click(outsideDiv);
    expect(onClickOutside).toHaveBeenCalledTimes(1);

    await user.click(insideDiv1);
    expect(onClickOutside).toHaveBeenCalledTimes(1);

    await user.click(insideDiv2);
    expect(onClickOutside).toHaveBeenCalledTimes(1);

    await user.click(outsideDiv);
    expect(onClickOutside).toHaveBeenCalledTimes(2);
  });

  it('should call the correct handler when clicking outside respective elements (multiple groups)', async () => {
    const user = userEvent.setup();
    const onClickOutside = jest.fn();

    render(
      <TestComponent activeGroups={[GROUP_ONE, GROUP_TWO]} onClickOutside={onClickOutside} />
    );

    const insideDiv1 = screen.getByText('Inside 1'); // in group 1
    const insideDiv2 = screen.getByText('Inside 2'); // in group 1
    const insideDiv3 = screen.getByText('Inside 3'); // in group 2
    const insideDiv4 = screen.getByText('Inside 4'); // in group 2
    const outsideDiv = screen.getByText('Outside'); // in neither

    // Click inside Group 1 → triggers Group 2's onClickOutside
    await user.click(insideDiv1);
    expect(onClickOutside).toHaveBeenCalledTimes(1);

    await user.click(insideDiv2);
    expect(onClickOutside).toHaveBeenCalledTimes(2);

    // Click inside Group 2 → triggers Group 1's onClickOutside
    await user.click(insideDiv3);
    expect(onClickOutside).toHaveBeenCalledTimes(3);

    await user.click(insideDiv4);
    expect(onClickOutside).toHaveBeenCalledTimes(4);

    // Click outside → triggers both groups' onClickOutside
    await user.click(outsideDiv);
    expect(onClickOutside).toHaveBeenCalledTimes(6);

    await user.click(outsideDiv);
    expect(onClickOutside).toHaveBeenCalledTimes(8);
  });
});
