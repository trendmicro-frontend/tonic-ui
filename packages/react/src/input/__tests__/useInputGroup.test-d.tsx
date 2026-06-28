import { useInputGroup } from '@tonic-ui/react';

// === useInputGroup ===
function UseInputGroupExample() {
  const inputGroup = useInputGroup();

  // Should return context with input group properties
  const size = inputGroup?.size;
  const variant = inputGroup?.variant;

  return null;
}
