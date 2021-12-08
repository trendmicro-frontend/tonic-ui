import system from '../core/system';
import { border as borderTransform } from '../utils/transforms';

const config = {
  border: {
    property: 'border',
    scale: 'borders',
    transform: borderTransform,
  },
  borderWidth: {
    property: 'borderWidth',
    scale: 'borderWidths',
  },
  borderStyle: {
    property: 'borderStyle',
    scale: 'borderStyles',
  },
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
    transform: border,
  },
  borderTopWidth: {
    property: 'borderTopWidth',
    scale: 'borderWidths',
  },
  borderTopStyle: {
    property: 'borderTopStyle',
    scale: 'borderStyles',
  },
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
    scale: 'borderWidths',
  },
  borderRightStyle: {
    property: 'borderRightStyle',
    scale: 'borderStyles',
  },
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
    scale: 'borderWidths',
  },
  borderBottomStyle: {
    property: 'borderBottomStyle',
    scale: 'borderStyles',
  },
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
    scale: 'borderWidths',
  },
  borderLeftStyle: {
    property: 'borderLeftStyle',
    scale: 'borderStyles',
  },
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
