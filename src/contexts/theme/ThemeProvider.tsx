import React, { createContext } from 'react';

import ThemeProviderProps from './types';

const ThemeContext = createContext({});

const ThemeProvider = (props: ThemeProviderProps) => {
  const { value, children } = props;
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
