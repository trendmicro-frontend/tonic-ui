import { createRemote } from './createRemote.jsx';

export const WidgetUpdates = createRemote(() => import('widget_updates/main'));
export const WidgetOS = createRemote(() => import('widget_os/main'));
export const InventoryView = createRemote(() => import('inventory/main'));
