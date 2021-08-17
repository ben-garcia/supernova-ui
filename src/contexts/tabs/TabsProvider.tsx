import { createContext } from 'react';

import { Tabs } from './types';

export const TabsContext = createContext<Tabs | undefined>(undefined);
export const TabsProvider = TabsContext.Provider;
