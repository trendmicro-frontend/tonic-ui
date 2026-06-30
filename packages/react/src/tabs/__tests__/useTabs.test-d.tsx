import { useTabs } from '@tonic-ui/react';

function UseTabsExample() {
  const tabs = useTabs();

  if (tabs) {
    // Properties
    const disabled = tabs.disabled;
    const index = tabs.index;
    const orientation = tabs.orientation;
    const variant = tabs.variant;

    // Methods
    tabs.onChange(0);
    tabs.onChange('custom-tab');
    const tabIndex = tabs.registerTab();
    const tabPanelIndex = tabs.registerTabPanel(0);
    tabs.unregisterTab(0);
    tabs.unregisterTabPanel(0);
  }

  return null;
}
