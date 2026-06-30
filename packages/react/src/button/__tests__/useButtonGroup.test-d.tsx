import { useButtonGroup } from '@tonic-ui/react';

// === useButtonGroup ===
function UseButtonGroupExample() {
  const buttonGroup = useButtonGroup();

  // Should return context with button group properties
  const disabled = buttonGroup?.disabled;
  const orientation = buttonGroup?.orientation;
  const size = buttonGroup?.size;
  const variant = buttonGroup?.variant;

  return null;
}
