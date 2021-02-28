import React from 'react';

import { SupernovaProviderProps } from './types';
import { ThemeProvider, ThemeProviderProps } from '../theme';
import { theme as defaultTheme } from '../../theme';

/**
 * The top level provider that contains all other providers
 * needed for the components to function properly.
 */
const SupernovaProvider = (props: SupernovaProviderProps) => {
  const { theme = defaultTheme, children } = props;

  return (
    <ThemeProvider value={theme as ThemeProviderProps['value']}>
      {children}
    </ThemeProvider>
  );
};

export default SupernovaProvider;
