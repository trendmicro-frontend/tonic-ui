const wrapEvent = (theirHandler, ourHandler) => event => {
  theirHandler && theirHandler(event);
  if (!event.defaultPrevented) {
    return ourHandler(event);
  }
  return '';
};

export default wrapEvent;
