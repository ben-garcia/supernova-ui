import { useEffect, useState } from 'react';

/**
 * Hook that returns if the supplied mediaQuery matches the window viewport
 *
 * @param mediaQuery query to check against the window
 */
export const useMediaQuery = (mediaQuery: string) => {
  const [isMatch, setIsMatch] = useState<boolean>();

  useEffect(() => {
    // setting this inside the useEffect will prevent it from running in node
    // make sure that it only runs in the browser
    setIsMatch(window.matchMedia(mediaQuery).matches);

    const mediaQueryList = window.matchMedia(mediaQuery);
    const changeHandler = () => setIsMatch(mediaQueryList.matches);

    mediaQueryList.addEventListener('change', changeHandler);

    changeHandler();

    return () => {
      mediaQueryList.removeEventListener('change', changeHandler);
    };
  }, [mediaQuery]);

  return isMatch;
};
