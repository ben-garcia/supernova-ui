import { useEffect, useState } from 'react';

/**
 * Hook that returns if the supplied mediaQuery matches the window viewport
 *
 * @param mediaQuery query to check against the window
 */
const useMediaQuery = (mediaQuery: string) => {
  const [isMatch, setIsMatch] = useState<boolean>(
    window.matchMedia(mediaQuery).matches
  );

  useEffect(() => {
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

export default useMediaQuery;
