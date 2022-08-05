import { createContext } from 'react';

import { ClassContextProps } from './types';

export const ClassContext = createContext<ClassContextProps>({
  current: [],
});
export const ClassProvider = ClassContext.Provider;
