import system from '../core/system';

const group = 'grid';
const config = {
  gridArea: true,
  gridAutoColumns: true,
  gridAutoFlow: true,
  gridAutoRows: true,
  gridColumn: true,
  gridColumnEnd: true,
  gridColumnStart: true,
  gridRow: true,
  gridRowEnd: true,
  gridRowStart: true,
  gridTemplate: true,
  gridTemplateAreas: true,
  gridTemplateColumns: true,
  gridTemplateRows: true,

  // The following properties are renamed in CSS3 and will be deprecated or removed in the next major release
  gridGap: { // `gridGap` is an alias for `gap`
    property: 'gridGap',
    scale: 'sizes',
  },
  gridColumnGap: { // `gridColumnGap` is an alias for `columnGap`
    property: 'gridColumnGap',
    scale: 'sizes',
  },
  gridRowGap: { // `gridRowGap` is an alias for `rowGap`
    property: 'gridRowGap',
    scale: 'sizes',
  },
};

const grid = system(config, { group });

export default grid;
