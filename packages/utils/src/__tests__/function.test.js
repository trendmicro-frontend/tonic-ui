import {
  callAll,
  callEventHandlers,
  noop,
  runIfFn,
} from '..';

it('should call all functions', () => {
  const fn1 = jest.fn(value => {
    expect(value).toBe(1);
  });
  const fn2 = jest.fn(noop);
  callAll(fn1, fn2)(1);
  expect(fn1).toHaveBeenCalled();
  expect(fn2).toHaveBeenCalled();
});

it('should process all event handlers if preventDefault is not called anywhere', () => {
  const fn1 = jest.fn((event) => {
    expect(event.defaultPrevented).toBe(false);
  });
  const fn2 = jest.fn((event) => {
    expect(event.defaultPrevented).toBe(false);
    event.preventDefault();
    expect(event.defaultPrevented).toBe(true);
  });
  const fn3 = jest.fn((event) => {
    expect(event.defaultPrevented).toBe(true);
  });
  const event = {
    target: null,
    preventDefault: () => {
      event.defaultPrevented = true;
    },
    defaultPrevented: false,
  };
  callEventHandlers(fn1, fn2, fn3)(event);
  expect(fn1).toHaveBeenCalled();
  expect(fn2).toHaveBeenCalled();
  expect(fn3).not.toHaveBeenCalled();
});

it('should run function if function or else return value', () => {
  expect(runIfFn(() => 2)).toStrictEqual(2);
  expect(runIfFn(2)).toStrictEqual(2);
});
