import { useContext } from 'react';

import { ThemeContext } from '../contexts/theme';

/**
 * Hooks that returns the theme object
 */
const useTheme = () => {
  const theme = useContext(ThemeContext);

  if (!theme) {
    throw new Error(
      'theme is undefined, did you remember to wrap your app in a SupernovaProvider?'
    );
  }

  return theme;
};

export default useTheme;
