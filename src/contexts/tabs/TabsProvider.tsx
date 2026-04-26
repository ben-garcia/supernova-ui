import { createContext } from 'react';

import { TabsRootProps } from './types';

export const TabsContext = createContext<TabsRootProps | undefined>(undefined);
export const TabsProvider = TabsContext.Provider;
