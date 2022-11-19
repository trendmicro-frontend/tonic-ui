import {
  ariaAttr,
  callAll,
  callEventHandlers,
  dataAttr,
  isFunction,
  noop,
  once,
  runIfFn,
  warnDeprecatedProps,
  warnRemovedProps,
} from '@tonic-ui/utils/src';

afterEach(() => {
  jest.resetAllMocks();
});

describe('ariaAttr / dataAttr', () => {
  it('should render correct aria-* and data-* attributes', () => {
    const ariaProps = {
      'aria-disabled': ariaAttr(true),
      'data-disabled': dataAttr(true),
      'aria-selected': ariaAttr(false),
      'data-selected': dataAttr(false),
    };

    expect(ariaProps['aria-disabled']).toBe(true);
    expect(ariaProps['data-disabled']).toBe('');
    expect(ariaProps['aria-selected']).toBe(undefined);
    expect(ariaProps['data-selected']).toBe(undefined);
  });
});

describe('callAll', () => {
  it('should call all functions', () => {
    const fn1 = jest.fn(value => {
      expect(value).toBe(1);
    });
    const fn2 = jest.fn(noop);
    callAll(fn1, fn2)(1);
    expect(fn1).toHaveBeenCalled();
    expect(fn2).toHaveBeenCalled();
  });
});

describe('callEventHandlers', () => {
  it('should call event handlers', () => {
    const fn1 = jest.fn();
    const fn2 = jest.fn();
    const event = { target: { value: 'test' } };
    callEventHandlers(fn1, fn2)(event);
    expect(fn1).toHaveBeenCalledWith(event);
    expect(fn2).toHaveBeenCalledWith(event);
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
});

describe('isFunction', () => {
  it('checks whether the given value is a function object', () => {
    expect(isFunction(() => {})).toBe(true);
    expect(isFunction('function')).toBe(false);
    expect(isFunction(undefined)).toBe(false);
    expect(isFunction(null)).toBe(false);
    expect(isFunction(1)).toBe(false);
  });
});

describe('runIfFn', () => {
  it('should run function if function or else return value', () => {
    expect(runIfFn(() => 2)).toStrictEqual(2);
    expect(runIfFn(2)).toStrictEqual(2);
  });
});

describe('noop', () => {
  it('should return undefined', () => {
    expect(noop()).toBe(undefined);
  });
});

describe('once', () => {
  it('should call function once', () => {
    const fn = jest.fn();
    const onceFn = once(fn);
    onceFn();
    onceFn();
    expect(fn).toHaveBeenCalledTimes(1);
  });
});

describe('warnDeprecatedProps', () => {
  it('should warn about deprecated props #1', () => {
    const fn = jest.spyOn(console, 'error').mockImplementation(() => {});
    warnDeprecatedProps('isDisabled', {
      prefix: 'TestComponent:',
    });
    expect(fn).toHaveBeenCalledWith('TestComponent: \'isDisabled\' is deprecated.');
  });
  it('should warn about deprecated props #2', () => {
    const fn = jest.spyOn(console, 'error').mockImplementation(() => {});
    warnDeprecatedProps('isDisabled', {
      prefix: 'TestComponent:',
      alternative: 'disabled',
    });
    expect(fn).toHaveBeenCalledWith('TestComponent: \'isDisabled\' is deprecated. Use \'disabled\' instead.');
  });
  it('should warn about deprecated props #3', () => {
    const fn = jest.spyOn(console, 'error').mockImplementation(() => {});
    warnDeprecatedProps('isDisabled', {
      prefix: 'TestComponent:',
      alternative: 'disabled',
      willRemove: true,
    });
    expect(fn).toHaveBeenCalledWith('TestComponent: \'isDisabled\' is deprecated and will be removed in the next major release. Use \'disabled\' instead.');
  });
});

describe('warnRemovedProps', () => {
  it('should warn about removed props', () => {
    const fn = jest.spyOn(console, 'error').mockImplementation(() => {});
    warnRemovedProps('isDisabled', {
      prefix: 'TestComponent:',
    });
    expect(fn).toHaveBeenCalledWith('TestComponent: \'isDisabled\' is removed.');
  });
  it('should warn about removed props', () => {
    const fn = jest.spyOn(console, 'error').mockImplementation(() => {});
    warnRemovedProps('isDisabled', {
      prefix: 'TestComponent:',
      alternative: 'disabled',
    });
    expect(fn).toHaveBeenCalledWith('TestComponent: \'isDisabled\' is removed. Use \'disabled\' instead.');
  });
});
