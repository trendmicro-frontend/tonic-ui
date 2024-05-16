import { colorStyle as originalColorStyle } from '@tonic-ui/react';

const colorStyle = {
  ...originalColorStyle,
};

// Remove deprecated keys
delete colorStyle.dark.background.inverse;
delete colorStyle.dark.severity;
delete colorStyle.dark.chart;
delete colorStyle.light.background.inverse;
delete colorStyle.light.severity;
delete colorStyle.light.chart;

export default colorStyle;
