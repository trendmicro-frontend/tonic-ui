import system from '../core/system';

const config = {
  border: {
    property: 'border',
    scale: 'borders',
  },
  borderWidth: {
    property: 'borderWidth',
    scale: 'sizes',
  },
  borderStyle: true,
  borderColor: {
    property: 'borderColor',
    scale: 'colors',
  },
  borderRadius: {
    property: 'borderRadius',
    scale: 'radii',
  },
  borderTop: {
    property: 'borderTop',
    scale: 'borders',
  },
  borderTopWidth: {
    property: 'borderTopWidth',
    scale: 'sizes',
  },
  borderTopStyle: true,
  borderTopColor: {
    property: 'borderTopColor',
    scale: 'colors',
  },
  borderTopLeftRadius: {
    property: 'borderTopLeftRadius',
    scale: 'radii',
  },
  borderTopRightRadius: {
    property: 'borderTopRightRadius',
    scale: 'radii',
  },
  borderRight: {
    property: 'borderRight',
    scale: 'borders',
  },
  borderRightWidth: {
    property: 'borderRightWidth',
    scale: 'sizes',
  },
  borderRightStyle: true,
  borderRightColor: {
    property: 'borderRightColor',
    scale: 'colors',
  },
  borderBottom: {
    property: 'borderBottom',
    scale: 'borders',
  },
  borderBottomWidth: {
    property: 'borderBottomWidth',
    scale: 'sizes',
  },
  borderBottomStyle: true,
  borderBottomColor: {
    property: 'borderBottomColor',
    scale: 'colors',
  },
  borderBottomLeftRadius: {
    property: 'borderBottomLeftRadius',
    scale: 'radii',
  },
  borderBottomRightRadius: {
    property: 'borderBottomRightRadius',
    scale: 'radii',
  },
  borderLeft: {
    property: 'borderLeft',
    scale: 'borders',
  },
  borderLeftWidth: {
    property: 'borderLeftWidth',
    scale: 'sizes',
  },
  borderLeftStyle: true,
  borderLeftColor: {
    property: 'borderLeftColor',
    scale: 'colors',
  },
  borderX: {
    properties: ['borderLeft', 'borderRight'],
    scale: 'borders',
  },
  borderY: {
    properties: ['borderTop', 'borderBottom'],
    scale: 'borders',
  },
};

const border = system(config);

export default border;
