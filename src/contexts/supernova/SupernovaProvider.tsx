import React from 'react';

import { NotificationProvider } from '../notification/NotificationProvider';
import { IdProvider } from '../unique-id';
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
  const themeToUse = React.useMemo(
    () => (theme ? deepMergify(defaultTheme, theme) : defaultTheme),
    [theme]
  );
  const countRef = React.useRef({
    count: 0,
  });

  return (
    <ThemeProvider value={themeToUse as ThemeProviderProps['value']}>
      <IdProvider value={countRef.current}>
        <NotificationProvider>{children}</NotificationProvider>
      </IdProvider>
    </ThemeProvider>
  );
};

export default SupernovaProvider;
