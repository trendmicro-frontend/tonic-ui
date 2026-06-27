import { Global } from '@emotion/react';
import { ensurePlainObject } from 'ensure-type';
import { useCallback } from 'react';

const CSSVariables = () => {
  const styles = useCallback((theme) => {
    const rootSelector = theme?.rootSelector;
    const cssVariables = ensurePlainObject(theme?.cssVariables);

    if (!rootSelector || Object.keys(cssVariables).length === 0) {
      return {};
    }

    // Separate variable types
    const rootVariables = {}; // All original variables (includes -dark/-light and non color mode variables)
    const colorModeVariables = {}; // Track variables that need color mode switching

    // First, find all paired -dark/-light variables
    for (const key of Object.keys(cssVariables)) {
      if (key.endsWith('-dark')) {
        const baseKey = key.slice(0, -5); // Remove '-dark'
        const lightKey = `${baseKey}-light`;

        // Add to switching if corresponding -light variable exists
        if (cssVariables[lightKey]) {
          colorModeVariables[baseKey] = {
            light: lightKey,
            dark: key,
          };
        }
      }
    }

    // Place variables in root (exclude base variables that need color mode switching)
    for (const [key, value] of Object.entries(cssVariables)) {
      // If this key is not a baseKey in colorModeVariables, put it in root
      if (!colorModeVariables[key]) {
        rootVariables[key] = value;
      }
    }

    // Build CSS rules
    const cssRules = {
      // :root - Define all variables (excluding color mode switching)
      [rootSelector]: rootVariables,
    };

    // [data-color-scheme="dark"] - Use -dark variables
    if (Object.keys(colorModeVariables).length > 0) {
      const darkSelector = '[data-color-scheme="dark"]';
      cssRules[darkSelector] = {};
      for (const [baseKey, variants] of Object.entries(colorModeVariables)) {
        cssRules[darkSelector][baseKey] = `var(${variants.dark})`;
      }

      // [data-color-scheme="light"] - Use -light variables
      const lightSelector = '[data-color-scheme="light"]';
      cssRules[lightSelector] = {};
      for (const [baseKey, variants] of Object.entries(colorModeVariables)) {
        cssRules[lightSelector][baseKey] = `var(${variants.light})`;
      }
    }

    return cssRules;
  }, []);

  return (
    <Global styles={styles} />
  );
};

CSSVariables.displayName = 'CSSVariables';

export default CSSVariables;
