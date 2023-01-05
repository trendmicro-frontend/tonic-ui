const useTrack = () => {
  const _mtm = (window._mtm = (window._mtm || []));

  const track = (eventCategory, eventAction, eventName, eventValue) => {
    _mtm.push({
      event: 'custom-event',
      eventCategory,
      eventAction,
      eventName,
      eventValue,
    });
  };

  return track;
};

export default useTrack;
