import { ensureFunction } from 'ensure-type';

const wrapEvent = (theirHandler, ourHandler) => event => {
  ensureFunction(theirHandler)(event);
  if (!event.defaultPrevented) {
    return ensureFunction(ourHandler)(event);
  }
  return '';
};

export default wrapEvent;
