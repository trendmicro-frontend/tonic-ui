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

  // Legacy CSS aliases. Keep them in the same cascade group as the modern gap props.
  gridGap: {
    group: 'gap',
    property: 'gridGap',
    scale: 'sizes',
  },
  gridColumnGap: {
    group: 'gap',
    property: 'gridColumnGap',
    scale: 'sizes',
  },
  gridRowGap: {
    group: 'gap',
    property: 'gridRowGap',
    scale: 'sizes',
  },
};

const grid = system(config, { group });

export default grid;
