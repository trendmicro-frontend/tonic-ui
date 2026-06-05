import { runInNewContext } from 'node:vm';
import {
  ariaAttr,
  callAll,
  callEventHandlers,
  dataAttr,
  get,
  merge,
  noop,
  once,
  runIfFn,
  warnDeprecatedProps,
  warnRemovedProps,
} from '@tonic-ui/utils/src';
import _get from 'lodash/get';

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

describe('get', () => {
  describe('general usage', () => {
    const testObject = { a: { b: { c: 42 } } };
    const defaultValue = 'default';

    it('returns default value for missing paths', () => {
      expect(get(testObject, 'a.b.c.d', defaultValue)).toBe(defaultValue);
      expect(get(testObject, ['a', 'b', 'c', 'd'], defaultValue)).toBe(defaultValue);
      expect(get(testObject, 'a.b.x', defaultValue)).toBe(defaultValue);
    });

    it('returns default value for null or undefined input', () => {
      expect(get(testObject, null, defaultValue)).toBe(defaultValue);
      expect(get(testObject, undefined, defaultValue)).toBe(defaultValue);
      expect(get(null, 'a.b.c', defaultValue)).toBe(defaultValue);
      expect(get(undefined, 'a.b.c', defaultValue)).toBe(defaultValue);
    });

    it('returns default value for empty or undefined paths', () => {
      expect(get(testObject, '', defaultValue)).toBe(defaultValue);
      expect(get(testObject, ['a', 'b', 'x'], defaultValue)).toBe(defaultValue);
      expect(get({ a: { b: undefined } }, 'a.b', defaultValue)).toBe(defaultValue);
    });

    it('returns a deeply nested value', () => {
      const result = get(
        { colors: { blue: ['#0cf', '#0be', '#09d', '#07c'] } },
        'colors.blue.3'
      );
      expect(result).toBe('#07c');
    });

    it('supports fallback values', () => {
      expect(get({}, 'hi', 'nope')).toBe('nope');
    });

    it('handles number indices in arrays', () => {
      expect(get([1, 2, 3], 0)).toBe(1);
    });

    it('returns 0 index items from arrays', () => {
      expect(get(['a', 'b', 'c'], 0)).toBe('a');
    });

    it('handles undefined path gracefully', () => {
      expect(get({}, undefined)).toBe(undefined);
    });

    it('handles null path gracefully', () => {
      expect(get({}, null)).toBe(undefined);
    });
  });

  describe('lodash.get compatibility', () => {
    const testObject = {
      foo: {
        bar: {
          'baz.foo': 1,
          'baz.boo': 2
        },
        list: [
          { 'weird.key': 42 }
        ]
      },
      null: 'null value',
      undefined: 'undefined value',
      false: 'false value',
      0: 'zero value',
      '': 'empty string',
      nested: {
        deep: {
          value: 'found'
        },
        float: {
          '0.1': 'decimal',
          '.1': 'leading-decimal',
          '-.1': 'negative-leading-decimal',
          '-0.1': 'negative-decimal',
          1.5E+3: 'positive-scientific (converted to 1500)',
          '1.5E+3': 'positive-scientific',
          '-1.5E+3': 'negative-scientific',
        },
      },
      // Floating point number keys
      '0.1': 'decimal',
      '.1': 'leading-decimal',
      '-.1': 'negative-leading-decimal',
      '-0.1': 'negative-decimal',
      '1.5E+3': 'positive-scientific',
      '-1.5E+3': 'negative-scientific',
      '1.5e-3': 'positive-lowercase-scientific',
      '-1.5e-3': 'negative-lowercase-scientific',
    };

    const testArray = [];
    testArray[0.1] = 'array-decimal';
    testArray[1500] = 'array-integer'; // This is the same as 1.5E+3
    testArray[Infinity] = Infinity;
    testArray[-Infinity] = -Infinity;

    it('matches lodash.get result', () => {
      const testCases = [
        // Basic property access
        [testObject, 'foo', undefined],
        [testObject, 'nested.deep.value', undefined],
        [testObject, 'foo.bar.baz.foo', 'default'],

        // Bracket notation
        [testObject, 'foo.bar["baz.foo"]', undefined],
        [testObject, 'foo.bar["baz.boo"]', undefined],
        [testObject, 'foo.list[0]["weird.key"]', undefined],

        // Array paths
        [testObject, ['foo', 'bar', 'baz.foo'], undefined],
        [testObject, ['foo', 'list', '0', 'weird.key'], undefined],
        [testObject, [], 'default'],

        // Falsy values
        [testObject, null, 'default'],
        [testObject, undefined, 'default'],
        [testObject, 0, 'default'],
        [testObject, false, 'default'],
        [testObject, '', 'default'],
        [testObject, 'null', 'default'],
        [testObject, 'undefined', 'default'],
        [testObject, '0', 'default'],
        [testObject, 'false', 'default'],

        // Missing properties
        [testObject, 'foo.missing', 'default'],
        [testObject, 'nonexistent.path', 'default'],
        [testObject, 'foo.bar.undefined', 'default'],

        // Edge cases with objects
        [null, 'foo', 'default'],
        [undefined, 'foo', 'default'],
        ['string', 'foo', 'default'],
        [123, 'foo', 'default'],
        [true, 'foo', 'default'],

        // Arrays
        [['first', 'second', 'third'], '-1', 'default'],
        [['first', 'second', 'third'], '0', 'default'],
        [['first', 'second', 'third'], '1', 'default'],
        [['first', 'second', 'third'], '2', 'default'],
        [['first', 'second', 'third'], '3', 'default'],
        [['first', 'second', 'third'], -1, 'default'],
        [['first', 'second', 'third'], 0, 'default'],
        [['first', 'second', 'third'], 1, 'default'],
        [['first', 'second', 'third'], 2, 'default'],
        [['first', 'second', 'third'], 3, 'default'],

        // Array of objects
        [[{ name: 'first' }, { name: 'second' }], '0.name', 'default'],
        [[{ name: 'first' }, { name: 'second' }], '1.name', 'default'],
        [[{ name: 'first' }, { name: 'second' }], 'length', 'default'],

        // Deep nesting
        [{ a: { b: { c: { d: { e: 'deep' } } } } }, 'a.b.c.d.e', 'default'],
        [{ a: { b: { c: { d: { e: 'deep' } } } } }, 'a.b.c.d.f', 'default'],

        // Special characters in keys
        [{ 'key.with.dots': 'value1' }, '["key.with.dots"]', 'default'],
        [{ 'key with spaces': 'value2' }, '["key with spaces"]', 'default'],
        [{ 'key[with]brackets': 'value3' }, '["key[with]brackets"]', 'default'],

        // Numeric indices
        [['a', 'b', 'c'], '[-1]', 'default'],
        [['a', 'b', 'c'], '[0]', 'default'],
        [['a', 'b', 'c'], '[1]', 'default'],
        [['a', 'b', 'c'], '[2]', 'default'],
        [['a', 'b', 'c'], '[3]', 'default'],
        [['a', 'b', 'c'], [-1], 'default'],
        [['a', 'b', 'c'], [0], 'default'],
        [['a', 'b', 'c'], [1], 'default'],
        [['a', 'b', 'c'], [2], 'default'],
        [['a', 'b', 'c'], [3], 'default'],
        [['a', 'b', 'c'], ['-1'], 'default'],
        [['a', 'b', 'c'], ['0'], 'default'],
        [['a', 'b', 'c'], ['1'], 'default'],
        [['a', 'b', 'c'], ['2'], 'default'],
        [['a', 'b', 'c'], ['3'], 'default'],

        // Complex paths
        [testObject, 'foo.bar.baz.qux.missing.deep', 'default'],

        // Object with floating point numbers as keys
        [testObject, 'nested.float[0.1]', 'default'],
        [testObject, 'nested.float[.1]', 'default'],
        [testObject, 'nested.float[-.1]', 'default'],
        [testObject, 'nested.float[-0.1]', 'default'],
        [testObject, 'nested.float["0.1"]', 'default'],
        [testObject, 'nested.float[".1"]', 'default'],
        [testObject, 'nested.float["-.1"]', 'default'],
        [testObject, 'nested.float["-0.1"]', 'default'],
        [testObject, 'nested.float[1500]', 'default'],
        [testObject, 'nested.float[1.5E+3]', 'default'],
        [testObject, 'nested.float[-1.5E+3]', 'default'],
        [testObject, 'nested.float["1.5E+3"]', 'default'],
        [testObject, 'nested.float["-1.5E+3"]', 'default'],
        [testObject, '0.1', 'default'],
        [testObject, '.1', 'default'],
        [testObject, '-.1', 'default'],
        [testObject, '-0.1', 'default'],
        [testObject, '1.5E+3', 'default'],
        [testObject, '-1.5E+3', 'default'],
        [testObject, '1.5e-3', 'default'],
        [testObject, '-1.5e-3', 'default'],
        [testObject, '[0.1]', 'default'],
        [testObject, '[.1]', 'default'],
        [testObject, '[-.1]', 'default'],
        [testObject, '[-0.1]', 'default'],
        [testObject, '[1.5E+3]', 'default'],
        [testObject, '[-1.5E+3]', 'default'],
        [testObject, '[1.5e-3]', 'default'],
        [testObject, '[-1.5e-3]', 'default'],

        // Array with floating point numbers as keys
        [testArray, '0.1', 'default'],
        [testArray, '1500', 'default'],
        [testArray, '1.5E+3', 'default'],
        [testArray, 'Infinity', 'default'],
        [testArray, '-Infinity', 'default'],
        [testArray, '[0.1]', 'default'],
        [testArray, '[1500]', 'default'],
        [testArray, '[1.5E+3]', 'default'],
        [testArray, '[Infinity]', 'default'],
        [testArray, '[-Infinity]', 'default'],
      ];

      for (const [object, path, defaultValue] of testCases) {
        const actualResult = get(object, path, defaultValue);
        const expectedResult = _get(object, path, defaultValue);
        if (actualResult !== expectedResult) {
          console.error(`lodash.get compatibility: path="${path}", expected="${expectedResult}", actual="${actualResult}"`);
        }
      }

      for (const [object, path, defaultValue] of testCases) {
        const actualResult = get(object, path, defaultValue);
        const expectedResult = _get(object, path, defaultValue);
        expect(actualResult).toBe(expectedResult);
      }
    });
  });

  describe('ReDoS vulnerability protection', () => {
    const testObject = {
      a: { b: { c: 'value' } },
      arr: [1, 2, { x: 'nested' }],
      'key.with.dots': 'dotted',
      'key with spaces': 'spaced'
    };

    it('should handle long paths without performance degradation', () => {
      const start = Date.now();
      const longPath = 'a'.repeat(1000) + '.b';
      const result = get(testObject, longPath, 'default');
      const end = Date.now();

      // Should complete quickly (under 100ms) and return default value
      expect(end - start).toBeLessThan(100);
      expect(result).toBe('default');
    });

    it('should handle complex bracket notation without ReDoS', () => {
      const start = Date.now();
      const complexPath = '[' + '"'.repeat(100) + 'key' + '"'.repeat(100) + ']';
      const result = get(testObject, complexPath, 'default');
      const end = Date.now();

      // Should complete quickly and return default value
      expect(end - start).toBeLessThan(100);
      expect(result).toBe('default');
    });

    it('should handle mixed notation with repetition efficiently', () => {
      const start = Date.now();
      const mixedPath = 'a.b.c' + '["nonexistent"]'.repeat(50);
      const result = get(testObject, mixedPath, 'default');
      const end = Date.now();

      // Should complete quickly and return default value
      expect(end - start).toBeLessThan(100);
      expect(result).toBe('default');
    });

    it('should still work correctly with normal quoted keys', () => {
      expect(get(testObject, '["key.with.dots"]')).toBe('dotted');
      expect(get(testObject, "['key with spaces']")).toBe('spaced');
      expect(get(testObject, 'arr[2].x')).toBe('nested');
    });
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
    expect(result.__proto__).toHaveProperty('isAdmin');
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
    expect(result.__proto__).toHaveProperty('isAdmin');
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
