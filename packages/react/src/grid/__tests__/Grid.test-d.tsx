import React, { createRef } from 'react';
import { Grid } from '@tonic-ui/react';

// === Grid ===
<Grid>Content</Grid>;

// With templateColumns
<Grid templateColumns="repeat(3, 1fr)">
  <div>1</div>
  <div>2</div>
  <div>3</div>
</Grid>;

// With templateRows
<Grid templateRows="repeat(2, 1fr)">
  <div>1</div>
  <div>2</div>
</Grid>;

// With templateAreas
<Grid templateAreas="'header header' 'sidebar content' 'footer footer'">
  Content
</Grid>;

// With gap shorthand
<Grid gap="4x">With Gap</Grid>;
<Grid columnGap="2x" rowGap="4x">With Row/Column Gap</Grid>;

// With area, row, column
<Grid area="header">Area</Grid>;
<Grid row="1 / 3">Row Span</Grid>;
<Grid column="1 / 3">Column Span</Grid>;

// With autoFlow, autoRows, autoColumns
<Grid autoFlow="row">Auto Row</Grid>;
<Grid autoRows="minmax(100px, auto)">Auto Rows</Grid>;
<Grid autoColumns="1fr">Auto Columns</Grid>;

// Grid shorthands — responsive objects
<Grid
  templateColumns={{ sm: '1fr', md: '1fr', lg: '1fr 1fr' }}
  gap={{ sm: '4x', md: '8x', lg: '16x' }}
>
  <div>1</div>
  <div>2</div>
</Grid>;

// StyleProps
<Grid padding="4x">Styled</Grid>;

// Ref
const gridRef = createRef<HTMLDivElement>();
<Grid ref={gridRef}>Grid</Grid>;

const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement ref should not be assignable to Grid
<Grid ref={wrongRef}>Grid</Grid>;
