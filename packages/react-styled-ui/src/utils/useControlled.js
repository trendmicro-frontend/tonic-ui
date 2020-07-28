import { useRef, useState, useCallback } from 'react';

export default function useControlled({ controlled, default: defaultProp }) {
  const { current: isControlled } = useRef(controlled !== undefined);
  const [valueState, setValue] = useState(defaultProp);
  const value = isControlled ? controlled : valueState;
  const setValueIfUncontrolled = useCallback((newValue) => {
    if (!isControlled) {
      setValue(newValue);
    }
  }, [isControlled]);
  return [value, setValueIfUncontrolled];
}
