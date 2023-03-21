// https://letsbuildui.dev/articles/how-to-animate-mounting-content-in-react

import { useEffect, useState } from 'react';

/**
 * React hook that allows for the animation of mounting and unmounting
 * components.
 *
 * @param isMounted controls when the component mounts/unmounts
 * @param unmountDelay amount to wait for the animation to finish
 */
export const useMountTransition = (
  isMounted: boolean,
  unmountDelay: number
) => {
  // state to control when the css transition has finished.
  const [hasTransitionedIn, setHasTransitionedIn] = useState(false);

  useEffect(() => {
    // set to any until solution is found.
    // NodeJS.Timeout is undefined eslint error
    let timeoutId: any;

    if (isMounted && !hasTransitionedIn) {
      // when rendering inside a React Portal.
      // set timeout is required or the animation when mounting
      // isn't visible.
      timeoutId = setTimeout(() => setHasTransitionedIn(true), 20);
    } else if (!isMounted && hasTransitionedIn) {
      // after the transition has finished then unmount.
      timeoutId = setTimeout(() => setHasTransitionedIn(false), unmountDelay);
    }
    return () => {
      // cleanup
      clearTimeout(timeoutId);
    };
  }, [unmountDelay, isMounted, hasTransitionedIn]);

  return hasTransitionedIn;
};
