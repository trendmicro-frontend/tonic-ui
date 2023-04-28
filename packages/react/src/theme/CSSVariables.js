import { Global } from '@emotion/react';
import { ensureArray } from 'ensure-type';
import React, { useCallback } from 'react';

const CSSVariables = ({
  root = [':root', ':host'],
}) => {
  const styles = useCallback((theme) => {
    const selector = ensureArray(root).join(',');
    return {
      [selector]: { ...theme?.__cssVariableMap },
    };
  }, [root]);

  return (
    <Global styles={styles} />
  );
};

export default CSSVariables;
