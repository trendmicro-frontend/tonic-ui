import { system } from '@styled-system/core';
import * as transform from '../utils/transform-functions';

const config = {
  border: {
    property: 'border',
    scale: 'borders',
    transform: transform.border,
  },
  borderWidth: {
    property: 'borderWidth',
    scale: 'borderWidths',
    transform: transform.borderWidth,
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
    transform: transform.border,
  },
  borderTopWidth: {
    property: 'borderTopWidth',
    scale: 'borderWidths',
    transform: transform.borderWidth,
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
    transform: transform.border,
  },
  borderRightWidth: {
    property: 'borderRightWidth',
    scale: 'borderWidths',
    transform: transform.borderWidth,
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
    transform: transform.border,
  },
  borderBottomWidth: {
    property: 'borderBottomWidth',
    scale: 'borderWidths',
    transform: transform.borderWidth,
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
    transform: transform.border,
  },
  borderLeftWidth: {
    property: 'borderLeftWidth',
    scale: 'borderWidths',
    transform: transform.borderWidth,
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
    transform: transform.border,
  },
  borderY: {
    properties: ['borderTop', 'borderBottom'],
    scale: 'borders',
    transform: transform.border,
  },
};

const border = system(config);

export default border;
