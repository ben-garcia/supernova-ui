import { createContext } from 'react';

import { RadioGroupContextProps } from './types';

export const RadioGroupContext = createContext<
  RadioGroupContextProps | undefined
>(undefined);
export const RadioGroupProvider = RadioGroupContext.Provider;
