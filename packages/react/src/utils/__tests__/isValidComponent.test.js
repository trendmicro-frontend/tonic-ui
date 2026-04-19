import { Component, createContext, forwardRef, lazy, memo } from 'react';
import { Box } from '@tonic-ui/react/src';
import isValidComponent from '../isValidComponent';

describe('isValidComponent', () => {
  it('should return true for function components', () => {
    const MyComponent = () => <div>Hello</div>;
    expect(isValidComponent(MyComponent)).toBe(true);
  });

  it('should return true for class components', () => {
    // eslint-disable-next-line react/prefer-stateless-function
    class MyClassComponent extends Component {
      render() {
        return <div>Hello</div>;
      }
    }
    expect(isValidComponent(MyClassComponent)).toBe(true);
  });

  it('should return true for memo wrapped components', () => {
    const MyComponent = () => <div>Hello</div>;
    const MemoComponent = memo(MyComponent);
    expect(isValidComponent(MemoComponent)).toBe(true);
  });

  it('should return true for forwardRef wrapped components', () => {
    const MyComponent = forwardRef((props, ref) => <div ref={ref}>Hello</div>);
    expect(isValidComponent(MyComponent)).toBe(true);
  });

  it('should return true for lazy components', () => {
    const LazyComponent = lazy(() => import('./__fixtures__/LazyComponent'));
    expect(isValidComponent(LazyComponent)).toBe(true);
  });

  it('should return false for primitive values like strings', () => {
    expect(isValidComponent('div')).toBe(false);
    expect(isValidComponent('span')).toBe(false);
  });

  it('should return false for primitive values like numbers', () => {
    expect(isValidComponent(42)).toBe(false);
    expect(isValidComponent(true)).toBe(false);
  });

  it('should return false for null and undefined', () => {
    expect(isValidComponent(null)).toBe(false);
    expect(isValidComponent(undefined)).toBe(false);
  });

  it('should return false for objects that are not React components', () => {
    const obj = { key: 'value' };
    expect(isValidComponent(obj)).toBe(false);
  });

  it('should return true for createContext (Context) objects', () => {
    const MyContext = createContext();
    expect(isValidComponent(MyContext)).toBe(true);
  });

  it('should return true for Fragment type', () => {
    const FragmentComponent = () => (
      <>
        <Box>Hello</Box>
        <Box>World</Box>
      </>
    );
    expect(isValidComponent(FragmentComponent)).toBe(true);
  });
});
