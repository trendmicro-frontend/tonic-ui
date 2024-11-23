import { runInNewContext } from 'node:vm';
import {
  ariaAttr,
  callAll,
  callEventHandlers,
  dataAttr,
  merge,
  noop,
  once,
  runIfFn,
  warnDeprecatedProps,
  warnRemovedProps,
} from '@tonic-ui/utils/src';

afterEach(() => {
  jest.resetAllMocks();
});

describe('ariaAttr', () => {
  it('should render correct aria-* attributes', () => {
    const ariaAttrs = {
      'aria-disabled': ariaAttr(true),
      'aria-selected': ariaAttr(false),
    };
    expect(ariaAttrs['aria-disabled']).toBe(true);
    expect(ariaAttrs['aria-selected']).toBe(undefined);
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

describe('dataAttr', () => {
  it('should render correct data-* attributes', () => {
    const dataAttrs = {
      'data-disabled': dataAttr(true),
      'data-selected': dataAttr(false),
    };
    expect(dataAttrs['data-disabled']).toBe('');
    expect(dataAttrs['data-selected']).toBe(undefined);
  });
});

describe('merge', () => {
  it('should replace the first array with the second array', () => {
    // Second array fully replaces the first array
    expect(merge(
      [1, 2],
      [3, 4, 5],
    )).toEqual([3, 4, 5]);

    // Second array replaces corresponding elements of the first array, leaving trailing elements
    expect(merge(
      [1, 2, 3],
      [4, 5],
    )).toEqual([4, 5, 3]);
  });

  it('should merge objects and replace array values correctly', () => {
    const result = merge(
      { arr: [1, 2, { a: 1 }] },
      { arr: [3, 4, { b: 2 }] }
    );
    expect(result).toEqual({
      arr: [3, 4, { b: 2 }]
    });
  });

  it('should merge arrays within nested structures', () => {
    const result = merge(
      { arr: [1, [2, 3], { a: [1, 2] }] },
      { arr: [4, [5, 6], { a: [3, 4] }] }
    );
    expect(result).toEqual({
      arr: [4, [5, 6], { a: [3, 4] }]
    });
  });

  it('should handle arrays with objects correctly', () => {
    const target = {
      items: [
        { id: 1, value: 'old' },
        { id: 2, nested: { prop: 'old' } }
      ]
    };
    const source = {
      items: [
        { id: 1, value: 'new' },
        { id: 2, nested: { prop: 'new' } }
      ]
    };
    const result = merge(target, source);
    expect(result.items[0].value).toBe('new');
    expect(result.items[1].nested.prop).toBe('new');
  });

  it('should handle array mutation correctly with clone option', () => {
    const target = { arr: [1, { a: 1 }] };
    const source = { arr: [2, { b: 2 }] };
    const result = merge(target, source, { clone: true });
    result.arr[1].b = 3;
    expect(source.arr[1].b).toBe(2);
    expect(result.arr[1].b).toBe(3);
  });

  it('should handle circular references in arrays', () => {
    const target = { arr: [] };
    target.arr.push(target);
    const source = { arr: [{ value: 'test' }] };
    const result = merge(target, source);
    expect(result.arr[0].value).toBe('test');
  });

  it('should not be subject to prototype pollution via __proto__', () => {
    const result = merge(
      {},
      JSON.parse('{ "myProperty": "a", "__proto__" : { "isAdmin" : true } }'),
      {
        clone: false,
      }
    );
    expect(result.__proto__).toHaveProperty('isAdmin'); // eslint-disable-line no-proto
    expect({}).not.toHaveProperty('isAdmin');
  });

  it('should not be subject to prototype pollution via constructor', () => {
    const result = merge(
      {},
      JSON.parse('{ "myProperty": "a", "constructor" : { "prototype": { "isAdmin" : true } } }'),
      {
        clone: true,
      }
    );
    expect(result.constructor.prototype).toHaveProperty('isAdmin');
    expect({}).not.toHaveProperty('isAdmin');
  });

  it('should not be subject to prototype pollution via prototype', () => {
    const result = merge(
      {},
      JSON.parse('{ "myProperty": "a", "prototype": { "isAdmin" : true } }'),
      {
        clone: false,
      }
    );
    expect(result.prototype).toHaveProperty('isAdmin');
    expect({}).not.toHaveProperty('isAdmin');
  });

  it('should appropriately copy the fields without prototype pollution', () => {
    const result = merge(
      {},
      JSON.parse('{ "myProperty": "a", "__proto__" : { "isAdmin" : true } }')
    );
    expect(result.__proto__).toHaveProperty('isAdmin'); // eslint-disable-line no-proto
    expect({}).not.toHaveProperty('isAdmin');
  });

  it('should merge objects across realms', function test() {
    if (!/jsdom/.test(window.navigator.userAgent)) {
      this.skip();
    }
    const vmObject = runInNewContext('({hello: "realm"})');
    const result = merge({ hello: 'original' }, vmObject);
    expect(result.hello).toBe('realm');
  });

  it('should not merge HTML elements', () => {
    const element = document.createElement('div');
    const element2 = document.createElement('div');

    const result = merge({ element }, { element: element2 });

    expect(result.element).toBe(element2);
  });

  it('should reset source when target is undefined', () => {
    const result = merge(
      {
        '&.disabled': {
          color: 'red',
        },
      },
      {
        '&.disabled': undefined,
      }
    );
    expect(result).toEqual({
      '&.disabled': undefined,
    });
  });

  it('should merge keys that do not exist in source', () => {
    const result = merge({ foo: { baz: 'test' } }, { foo: { bar: 'test' }, bar: 'test' });
    expect(result).toEqual({
      foo: { baz: 'test', bar: 'test' },
      bar: 'test',
    });
  });

  it('should deep clone source key object if target key does not exist', () => {
    const foo = { foo: { baz: 'test' } };
    const bar = {};
    const result = merge(bar, foo);
    expect(result).toEqual({ foo: { baz: 'test' } });
    result.foo.baz = 'new test';
    expect(result).toEqual({ foo: { baz: 'new test' } });
    expect(foo).toEqual({ foo: { baz: 'test' } });
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
