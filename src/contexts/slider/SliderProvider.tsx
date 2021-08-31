import { createContext } from 'react';

import { SliderContextProps } from './types';

export const SliderContext = createContext<SliderContextProps | undefined>(
  undefined
);
export const SliderProvider = SliderContext.Provider;
