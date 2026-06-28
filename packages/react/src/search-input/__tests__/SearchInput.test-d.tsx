import React, { createRef } from 'react';
import { SearchInput } from '@tonic-ui/react';

// === SearchInput ===
<SearchInput />;

// With placeholder
<SearchInput placeholder="Search..." />;

// With value and onChange
<SearchInput value="test" onChange={(e) => console.log(e.target.value)} />;

// With disabled
<SearchInput disabled />;

// With readOnly
<SearchInput readOnly />;

// With error
<SearchInput error />;

// With isLoading
<SearchInput isLoading />;

// With onClearInput
<SearchInput onClearInput={() => console.log('clear')} />;

// With size
<SearchInput size="sm" />;
<SearchInput size="md" />;
<SearchInput size="lg" />;

// With variant
<SearchInput variant="outline" />;
<SearchInput variant="filled" />;
<SearchInput variant="flush" />;
<SearchInput variant="unstyled" />;

// StyleProps
<SearchInput padding="2x" />;

// Ref
const searchRef = createRef<HTMLInputElement>();
<SearchInput ref={searchRef} />;

const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement ref should not be assignable to SearchInput
<SearchInput ref={wrongRef} />;

// === Negative tests ===
// @ts-expect-error - 'xl' is not a valid size for SearchInput
<SearchInput size="xl" />;

// @ts-expect-error - 'solid' is not a valid variant for SearchInput
<SearchInput variant="solid" />;
