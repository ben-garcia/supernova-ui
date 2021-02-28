import { ReactNode } from 'react';

import { Theme } from '../../theme';

interface ThemeProviderProps {
  children: ReactNode;
  /**
   * the theme object which will determine the look of the components.
   *
   * custom theme used to change defaults including...
   *	borders
   *	breakpoints
   *	colors
   *	shadows
   *	sizes
   *	spacing
   *	transitions
   *	typography
   *	z-index
   *
   * if omitted, then the default theme is used.
   */
  value: Theme;
}

export default ThemeProviderProps;
