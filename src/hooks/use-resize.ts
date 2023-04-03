import { useCallback, useEffect, useRef } from 'react';

import { isFunction } from '@utils';

/**
 * React hook that calls a function on 'resize' event.
 *
 * @param callback  function to call.
 * @param delay ammount of time(default is 250ms), before calling the function.
 */
export const useResize = (callback: Function, delay: number = 250) => {
  const timeoutId: any = useRef(0);
  const handleResize = useCallback(() => {
    clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(() => {
      if (isFunction(callback)) {
        callback();
      }
    }, delay);
  }, [callback, delay]);

  // setup/clear listeners
  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
};
