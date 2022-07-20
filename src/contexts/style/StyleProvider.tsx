import { createContext } from 'react';

import { StyleContextProps } from './types';

const initialState: StyleContextProps = {
  classes: [],
};

export const StyleContext = createContext<StyleContextProps>(initialState);
export const StyleProvider = StyleContext.Provider;
