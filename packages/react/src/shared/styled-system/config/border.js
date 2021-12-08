import system from '../core/system';
import { border as borderTransform } from '../utils/transforms';

const config = {
  border: {
    property: 'border',
    scale: 'borders',
    transform: borderTransform, // deprecated: backward compatibility
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
    transform: borderTransform,
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
    transform: borderTransform,
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
    transform: borderTransform,
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
    transform: borderTransform,
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
    transform: borderTransform,
  },
  borderY: {
    properties: ['borderTop', 'borderBottom'],
    scale: 'borders',
    transform: borderTransform,
  },
};

const border = system(config);

export default border;
