import { runInNewContext } from 'node:vm';
import {
  isBlankString,
  isEmptyArray,
  isEmptyObject,
  isFunction,
  isNullish,
  isNullOrUndefined,
  isObject,
  isPlainObject,
  isWhitespace,
  noop,
} from '@tonic-ui/utils/src';

describe('Check whether the value is a blank string', () => {
  it('should return true', () => {
    expect(isBlankString('')).toBe(true);
    expect(isBlankString('  ')).toBe(true);
    expect(isBlankString('\t')).toBe(true);
    expect(isBlankString('\r\n ')).toBe(true);
    expect(isBlankString(' \t\r\n ')).toBe(true);
  });

  it('should return false', () => {
    expect(isBlankString([])).toBe(false);
    expect(isBlankString({})).toBe(false);
    expect(isBlankString(0)).toBe(false);
    expect(isBlankString(noop)).toBe(false);
    expect(isBlankString(null)).toBe(false);
    expect(isBlankString(undefined)).toBe(false);
    expect(isBlankString('string')).toBe(false);
  });
});

describe('Check whether the value is an empty array', () => {
  it('should return true', () => {
    expect(isEmptyArray([])).toBe(true);
  });

  it('should return false', () => {
    expect(isEmptyArray({})).toBe(false);
    expect(isEmptyArray(0)).toBe(false);
    expect(isEmptyArray(true)).toBe(false);
    expect(isEmptyArray(false)).toBe(false);
    expect(isEmptyArray(noop)).toBe(false);
    expect(isEmptyArray(null)).toBe(false);
    expect(isEmptyArray(undefined)).toBe(false);
    expect(isEmptyArray('')).toBe(false);
    expect(isEmptyArray(' ')).toBe(false);
    expect(isEmptyArray(() => {})).toBe(false);
    expect(isEmptyArray(new Date())).toBe(false);
    expect(isEmptyArray(new RegExp())).toBe(false);
  });
});

describe('Check whether the value is an empty object', () => {
  it('should return true', () => {
    expect(isEmptyObject({})).toBe(true);
  });

  it('should return false', () => {
    expect(isEmptyObject([])).toBe(false);
    expect(isEmptyObject(0)).toBe(false);
    expect(isEmptyObject(true)).toBe(false);
    expect(isEmptyObject(false)).toBe(false);
    expect(isEmptyObject(noop)).toBe(false);
    expect(isEmptyObject(null)).toBe(false);
    expect(isEmptyObject(undefined)).toBe(false);
    expect(isEmptyObject('')).toBe(false);
    expect(isEmptyObject(' ')).toBe(false);
    expect(isEmptyObject(() => {})).toBe(false);
    expect(isEmptyObject(new Date())).toBe(false);
    expect(isEmptyObject(new RegExp())).toBe(false);
  });
});

describe('Check whether the value is a function', () => {
  it('should return true', () => {
    expect(isFunction(() => {})).toBe(true);
  });

  it('should return false', () => {
    expect(isFunction('function')).toBe(false);
    expect(isFunction(undefined)).toBe(false);
    expect(isFunction(null)).toBe(false);
    expect(isFunction(1)).toBe(false);
  });
});

describe('Check whether the value is null or undefined', () => {
  it('should be the same', () => {
    expect(isNullish).toBe(isNullOrUndefined);
  });

  it('should return true', () => {
    expect(isNullish()).toBe(true);
    expect(isNullish(null)).toBe(true);
    expect(isNullish(undefined)).toBe(true);
  });

  it('should return false', () => {
    expect(isNullish('null')).toBe(false);
    expect(isNullish('undefined')).toBe(false);
    expect(isNullish([])).toBe(false);
    expect(isNullish({})).toBe(false);
    expect(isNullish(0)).toBe(false);
    expect(isNullish(noop)).toBe(false); // eslint-disable-line
    expect(isNullish('')).toBe(false);
    expect(isNullish('    ')).toBe(false);
    expect(isNullish('\r\t\n ')).toBe(false);
  });
});

describe('Check whether the value is an object', () => {
  it('should return true', () => {
    expect(isObject({})).toBe(true);
    expect(isObject(noop)).toBe(true);
  });

  it('should return false', () => {
    expect(isObject([])).toBe(false);
    expect(isObject(0)).toBe(false);
    expect(isObject(true)).toBe(false);
    expect(isObject(false)).toBe(false);
    expect(isObject(null)).toBe(false);
    expect(isObject(undefined)).toBe(false);
    expect(isObject('')).toBe(false);
    expect(isObject(' ')).toBe(false);
  });
});

describe('Check whether the value is a plain object', () => {
  function Foo(x) {
    this.x = x;
  }

  function ObjectConstructor() {}
  ObjectConstructor.prototype.constructor = Object;

  it('should return true', () => {
    expect(isPlainObject({})).toBe(true);
    expect(isPlainObject({ foo: true })).toBe(true);
    expect(isPlainObject({ constructor: Foo })).toBe(true);
    expect(isPlainObject({ valueOf: 0 })).toBe(true);
    expect(isPlainObject(Object.create(null))).toBe(true);
    expect(isPlainObject(runInNewContext('({})'))).toBe(true);
  });

  it('should return false', () => {
    expect(isPlainObject(['foo', 'bar'])).toBe(false);
    expect(isPlainObject(new Foo(1))).toBe(false);
    expect(isPlainObject(Math)).toBe(false);
    expect(isPlainObject(JSON)).toBe(false);
    expect(isPlainObject(Atomics)).toBe(false); // eslint-disable-line no-undef
    expect(isPlainObject(Error)).toBe(false);
    expect(isPlainObject(() => {})).toBe(false);
    expect(isPlainObject(/./)).toBe(false);
    expect(isPlainObject(null)).toBe(false);
    expect(isPlainObject(undefined)).toBe(false);
    expect(isPlainObject(Number.NaN)).toBe(false);
    expect(isPlainObject('')).toBe(false);
    expect(isPlainObject(0)).toBe(false);
    expect(isPlainObject(false)).toBe(false);
    expect(isPlainObject(new ObjectConstructor())).toBe(false);
    expect(isPlainObject(Object.create({}))).toBe(false);

    (function () {
      expect(isPlainObject(arguments)).toBe(false); // eslint-disable-line prefer-rest-params
    }());

    const foo = new Foo();
    foo.constructor = Object;
    expect(isPlainObject(foo)).toBe(false);
  });
});

describe('Check whether the value passed is all whitespace', () => {
  it('should return true', () => {
    expect(isWhitespace('  ')).toBe(true);
    expect(isWhitespace('\t')).toBe(true);
    expect(isWhitespace('\r\n ')).toBe(true);
    expect(isWhitespace(' \t\r\n ')).toBe(true);
  });

  it('should return false', () => {
    expect(isWhitespace('')).toBe(false); // empty string
    expect(isWhitespace('foo')).toBe(false);
    expect(isWhitespace(' foo ')).toBe(false);
  });
});

describe('ES5-compliant whitespace', () => {
  it('should be true for all expected whitespace values', () => {
    expect(isWhitespace('\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF')).toBe(true);
  });

  it('should be false for the zero-width space', () => {
    expect(isWhitespace('\u200b')).toBe(false);
  });
});
