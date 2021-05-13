import React from 'react';

import { NotificationProvider } from '../notification/NotificationProvider';
import { SupernovaProviderProps } from './types';
import { ThemeProvider, ThemeProviderProps } from '../theme';
import { theme as defaultTheme } from '../../theme';
import { deepMergify } from '../../utils';

/**
 * The top level provider that contains all other providers
 * needed for the components to function properly.
 */
const SupernovaProvider = (props: SupernovaProviderProps) => {
  const { theme, children } = props;
  let themeToUse;

  // use default theme when a custom theme is not provided
  if (!theme) {
    themeToUse = defaultTheme;
  } else {
    // extend the default theme to include custom theme values
    themeToUse = deepMergify(defaultTheme, theme);
  }

  return (
    <ThemeProvider value={themeToUse as ThemeProviderProps['value']}>
      <NotificationProvider>{children}</NotificationProvider>
    </ThemeProvider>
  );
};

export default SupernovaProvider;
