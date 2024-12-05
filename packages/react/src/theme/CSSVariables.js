import { Global } from '@emotion/react';
import { ensurePlainObject } from 'ensure-type';
import React, { useCallback } from 'react';

const CSSVariables = () => {
  const styles = useCallback((theme) => {
    const rootSelector = theme?.rootSelector;
    const cssVariables = ensurePlainObject(theme?.cssVariables);
    if (!rootSelector || Object.keys(cssVariables).length === 0) {
      return {};
    }
    return {
      [rootSelector]: cssVariables,
    };
  }, []);

  return (
    <Global styles={styles} />
  );
};

export default CSSVariables;
