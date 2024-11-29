import { Global } from '@emotion/react';
import { ensureArray, ensurePlainObject } from 'ensure-type';
import React, { useCallback } from 'react';

const CSSVariables = ({
  root = [':root', ':host'],
}) => {
  const styles = useCallback((theme) => {
    const cssVariables = ensurePlainObject(theme?.cssVariables);
    if (Object.keys(cssVariables) === 0) {
      return {};
    }
    const selector = ensureArray(root).join(',');
    return {
      [selector]: cssVariables,
    };
  }, [root]);

  return (
    <Global styles={styles} />
  );
};

export default CSSVariables;
