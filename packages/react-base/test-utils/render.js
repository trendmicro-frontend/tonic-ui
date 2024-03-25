import { matchers } from '@emotion/jest';

// Add the custom matchers provided by '@emotion/jest'
expect.extend(matchers);

// re-export everything
export * from '@testing-library/react';
