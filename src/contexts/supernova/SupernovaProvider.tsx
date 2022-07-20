import React, { useMemo, useRef } from 'react';

import { IdProvider, NotificationProvider, StyleProvider } from '@contexts';
import { deepMergify } from '@utils';

import { ThemeProvider, ThemeProviderProps } from '../theme';
import { theme as defaultTheme } from '../../theme';

import { SupernovaProviderProps } from './types';
/**
 * The top level provider that contains all other providers
 * needed for the components to function properly.
 */
export const SupernovaProvider = (props: SupernovaProviderProps) => {
  const { theme, children } = props;
  const themeToUse = useMemo(
    () => (theme ? deepMergify(defaultTheme, theme) : defaultTheme),
    [theme]
  );
  const countRef = useRef({
    count: 0,
  });
  const styleClassesRef = useRef({ classes: [] });

  return (
    <ThemeProvider value={themeToUse as ThemeProviderProps['value']}>
      <IdProvider value={countRef.current}>
        <StyleProvider value={styleClassesRef.current}>
          <NotificationProvider>{children}</NotificationProvider>
        </StyleProvider>
      </IdProvider>
    </ThemeProvider>
  );
};
