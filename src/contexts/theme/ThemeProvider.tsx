import { createContext } from 'react';

import { theme, Theme } from '../../theme';

export const ThemeContext = createContext<Theme>(theme);

export const ThemeProvider = ThemeContext.Provider;
