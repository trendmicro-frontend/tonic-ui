import system from '../core/system';

const group = 'grid';
const config = {
  gridGap: {
    property: 'gridGap',
    scale: 'sizes',
  },
  gridColumnGap: {
    property: 'gridColumnGap',
    scale: 'sizes',
  },
  gridRowGap: {
    property: 'gridRowGap',
    scale: 'sizes',
  },
  gridColumn: true,
  gridRow: true,
  gridAutoFlow: true,
  gridAutoColumns: true,
  gridAutoRows: true,
  gridTemplateColumns: true,
  gridTemplateRows: true,
  gridTemplateAreas: true,
  gridArea: true,
};

const grid = system(config, { group });

export default grid;
