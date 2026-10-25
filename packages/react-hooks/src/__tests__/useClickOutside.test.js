import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRef } from 'react';
import { createPortal } from 'react-dom';
import { useClickOutside } from '@tonic-ui/react-hooks/src';

const GROUP_ONE = 1;
const GROUP_TWO = 2;
const CLICK_EVENTS = ['click'];
const MOUSEDOWN_EVENTS = ['mousedown'];

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

const Boundary = ({ onClickOutside, iframeDocument, events }) => {
  const ref = useRef(null);
  const iframeRef = useRef(null);
  useClickOutside(iframeDocument ? [ref, iframeRef] : ref, onClickOutside, { events });

  return (
    <>
      <div ref={ref}><button type="button">Inside</button></div>
      {iframeDocument ? createPortal(
        <div ref={iframeRef}><button type="button">Frame inside</button></div>,
        iframeDocument.body,
      ) : null}
    </>
  );
};

const LateBound = ({ attached, capture, events = CLICK_EVENTS, onClickOutside }) => {
  const ref = useRef(null);
  useClickOutside(ref, onClickOutside, { capture, events });

  return (
    <>
      {attached ? <div ref={ref}><button type="button">Inside</button></div> : null}
      <button type="button">Outside</button>
    </>
  );
};

const FrameOnly = ({ capture, events = CLICK_EVENTS, iframeDocument, onClickOutside }) => {
  const nullRef = useRef(null);
  const iframeRef = useRef(null);
  useClickOutside([nullRef, iframeRef], onClickOutside, { capture, events });

  return createPortal(
    <div ref={iframeRef}><button type="button">Frame inside</button></div>,
    iframeDocument.body,
  );
};

const stopPropagation = event => event.stopPropagation();

const StoppedPropagation = ({ capture, events = MOUSEDOWN_EVENTS, onClickOutside }) => {
  const ref = useRef(null);
  useClickOutside(ref, onClickOutside, { capture, events });

  return (
    <>
      <button type="button" ref={ref} onMouseDown={stopPropagation}>Inside stopped</button>
      <button type="button" onMouseDown={stopPropagation}>Outside stopped</button>
    </>
  );
};

describe('useClickOutside', () => {
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

  it.each(['mousedown', 'touchstart', 'click'])('keeps composed %s events inside a shadow boundary without treating the entire host as inside', (eventType) => {
    const host = document.createElement('div');
    document.body.appendChild(host);
    const shadowRoot = host.attachShadow({ mode: 'open' });
    const onClickOutside = jest.fn();
    const { getByRole, unmount } = render(
      <Boundary onClickOutside={onClickOutside} events={[eventType]} />,
      { container: shadowRoot, baseElement: shadowRoot },
    );
    const outside = document.createElement('button');
    shadowRoot.appendChild(outside);

    try {
      fireEvent(getByRole('button', { name: 'Inside' }), new Event(eventType, { bubbles: true, composed: true }));
      expect(onClickOutside).not.toHaveBeenCalled();

      fireEvent(outside, new Event(eventType, { bubbles: true, composed: true }));
      expect(onClickOutside).toHaveBeenCalledTimes(1);

      fireEvent(host, new Event(eventType, { bubbles: true, composed: true }));
      expect(onClickOutside).toHaveBeenCalledTimes(2);
    } finally {
      unmount();
      host.remove();
    }
  });

  it('observes both owner documents and removes their listeners after React clears the refs', () => {
    const iframe = document.createElement('iframe');
    document.body.appendChild(iframe);
    const iframeDocument = iframe.contentDocument;
    const onClickOutside = jest.fn();
    const { getByRole, unmount } = render(
      <Boundary iframeDocument={iframeDocument} onClickOutside={onClickOutside} events={['click']} />,
    );

    try {
      fireEvent.click(getByRole('button', { name: 'Inside' }));
      fireEvent.click(iframeDocument.querySelector('button'));
      expect(onClickOutside).not.toHaveBeenCalled();

      fireEvent.click(document.body);
      fireEvent.click(iframeDocument.body);
      expect(onClickOutside).toHaveBeenCalledTimes(2);

      unmount();
      fireEvent.click(document.body);
      fireEvent.click(iframeDocument.body);
      expect(onClickOutside).toHaveBeenCalledTimes(2);
    } finally {
      unmount();
      iframe.remove();
    }
  });

  it('observes elements attached after the initial render without a fallback document', () => {
    const onClickOutside = jest.fn();
    const { rerender } = render(
      <LateBound attached={false} onClickOutside={onClickOutside} />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Outside' }));
    expect(onClickOutside).not.toHaveBeenCalled();

    rerender(<LateBound attached onClickOutside={onClickOutside} />);

    fireEvent.click(screen.getByRole('button', { name: 'Inside' }));
    expect(onClickOutside).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole('button', { name: 'Outside' }));
    expect(onClickOutside).toHaveBeenCalledTimes(1);
  });

  it('re-subscribes with the current handler after a re-render', () => {
    const firstHandler = jest.fn();
    const secondHandler = jest.fn();
    const { rerender } = render(
      <LateBound attached onClickOutside={firstHandler} />,
    );

    rerender(<LateBound attached onClickOutside={secondHandler} />);

    fireEvent.click(screen.getByRole('button', { name: 'Outside' }));
    expect(firstHandler).not.toHaveBeenCalled();
    expect(secondHandler).toHaveBeenCalledTimes(1);
  });

  it('ignores parent document clicks when refs resolve to an iframe document', () => {
    const iframe = document.createElement('iframe');
    document.body.appendChild(iframe);
    const iframeDocument = iframe.contentDocument;
    const onClickOutside = jest.fn();
    const { unmount } = render(
      <FrameOnly iframeDocument={iframeDocument} onClickOutside={onClickOutside} />,
    );

    try {
      // A null ref never falls back to the parent document
      fireEvent.click(document.body);
      expect(onClickOutside).not.toHaveBeenCalled();

      fireEvent.click(iframeDocument.querySelector('button'));
      expect(onClickOutside).not.toHaveBeenCalled();

      fireEvent.click(iframeDocument.body);
      expect(onClickOutside).toHaveBeenCalledTimes(1);
    } finally {
      unmount();
      iframe.remove();
    }
  });

  it('removes capture-phase listeners from the captured documents on unmount', () => {
    const iframe = document.createElement('iframe');
    document.body.appendChild(iframe);
    const iframeDocument = iframe.contentDocument;
    const onClickOutside = jest.fn();
    const { unmount } = render(
      <FrameOnly iframeDocument={iframeDocument} onClickOutside={onClickOutside} capture />,
    );

    try {
      fireEvent.click(iframeDocument.body);
      expect(onClickOutside).toHaveBeenCalledTimes(1);

      unmount();

      // A cleanup with a mismatched capture flag would leave the listener attached
      fireEvent.click(iframeDocument.body);
      expect(onClickOutside).toHaveBeenCalledTimes(1);
    } finally {
      unmount();
      iframe.remove();
    }
  });

  it('listens in the bubble phase by default and in the capture phase when `capture` is true', () => {
    const onClickOutside = jest.fn();
    const { rerender } = render(
      <StoppedPropagation onClickOutside={onClickOutside} />,
    );

    // The bubble-phase listener never sees the stopped event
    fireEvent.mouseDown(screen.getByRole('button', { name: 'Outside stopped' }));
    expect(onClickOutside).not.toHaveBeenCalled();

    rerender(<StoppedPropagation onClickOutside={onClickOutside} capture />);

    // The capture-phase listener observes the event before it is stopped
    fireEvent.mouseDown(screen.getByRole('button', { name: 'Outside stopped' }));
    expect(onClickOutside).toHaveBeenCalledTimes(1);

    fireEvent.mouseDown(screen.getByRole('button', { name: 'Inside stopped' }));
    expect(onClickOutside).toHaveBeenCalledTimes(1);
  });
});
