import { createContext } from 'react';

import { StyleContextProps } from './types';

export const StyleContext = createContext<StyleContextProps>({ current: [] });
export const StyleProvider = StyleContext.Provider;
