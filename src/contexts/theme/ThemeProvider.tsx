import React, { createContext } from 'react';

import ThemeProviderProps from './types';
import { theme, Theme } from '../../theme';

export const ThemeContext = createContext<Theme>(theme);

export const ThemeProvider = (props: ThemeProviderProps) => {
  const { value, children } = props;
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
