import { useConst } from '@tonic-ui/react-hooks';
import { useCallback } from 'react';

const useTrack = () => {
  const _mtm = useConst(() => window._mtm = (window._mtm || []));
  const track = useCallback((eventCategory, eventAction, eventName, eventValue) => {
    _mtm.push({
      event: 'custom-event',
      eventCategory,
      eventAction,
      eventName,
      eventValue,
    });
  }, [_mtm]);

  return track;
};

export default useTrack;
