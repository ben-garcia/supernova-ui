import { createContext } from 'react';

import { TabList } from './types';

export const TabListContext = createContext<TabList | undefined>(undefined);
export const TabListProvider = TabListContext.Provider;
