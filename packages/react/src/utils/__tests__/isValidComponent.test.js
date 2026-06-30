import { Box } from '@tonic-ui/react/src';
import React from 'react';
import isValidComponent from '../isValidComponent';

describe('isValidComponent', () => {
  it('should return true for function components', () => {
    const MyComponent = () => <div>Hello</div>;
    expect(isValidComponent(MyComponent)).toBe(true);
  });

  it('should return true for class components', () => {
    // eslint-disable-next-line react/prefer-stateless-function
    class MyClassComponent extends React.Component {
      render() {
        return <div>Hello</div>;
      }
    }
    expect(isValidComponent(MyClassComponent)).toBe(true);
  });

  it('should return true for React.memo wrapped components', () => {
    const MyComponent = () => <div>Hello</div>;
    const MemoComponent = React.memo(MyComponent);
    expect(isValidComponent(MemoComponent)).toBe(true);
  });

  it('should return true for React.forwardRef wrapped components', () => {
    const MyComponent = React.forwardRef((props, ref) => <div ref={ref}>Hello</div>);
    expect(isValidComponent(MyComponent)).toBe(true);
  });

  it('should return true for React.lazy components', () => {
    const LazyComponent = React.lazy(() => import('./__fixtures__/LazyComponent'));
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

  it('should return true for React.createContext (Context) objects', () => {
    const MyContext = React.createContext();
    expect(isValidComponent(MyContext)).toBe(true);
  });

  it('should return true for React.Fragment type', () => {
    const FragmentComponent = () => (
      <>
        <Box>Hello</Box>
        <Box>World</Box>
      </>
    );
    expect(isValidComponent(FragmentComponent)).toBe(true);
  });
});
