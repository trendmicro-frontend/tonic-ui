// React-specific types
const REACT_FORWARD_REF_TYPE = Symbol.for('react.forward_ref');
const REACT_MEMO_TYPE = Symbol.for('react.memo');
const REACT_LAZY_TYPE = Symbol.for('react.lazy');
const REACT_PROVIDER_TYPE = Symbol.for('react.provider');
const REACT_CONTEXT_TYPE = Symbol.for('react.context');
const REACT_FRAGMENT_TYPE = Symbol.for('react.fragment');

// Function to check if a type is a valid React component
const isValidComponent = (type) => {
  // Check if the type is a valid React component (function or class component)
  return (
    typeof type === 'function' || // Handles function components and class components
    (typeof type === 'object' && type !== null && typeof type.$$typeof === 'symbol' &&
      (
        type.$$typeof === REACT_FORWARD_REF_TYPE || // Handles React.forwardRef
        type.$$typeof === REACT_MEMO_TYPE || // Handles React.memo
        type.$$typeof === REACT_LAZY_TYPE || // Handles React.lazy
        type.$$typeof === REACT_PROVIDER_TYPE || // Handles React.createContext
        type.$$typeof === REACT_CONTEXT_TYPE || // Handles Context
        type.$$typeof === REACT_FRAGMENT_TYPE // Handles React.Fragment (optional, can be excluded if not needed)
      )
    )
  );
};

export default isValidComponent;
