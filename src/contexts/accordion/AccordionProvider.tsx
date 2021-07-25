import { createContext } from 'react';

import { Accordion } from './types';

export const AccordionContext = createContext<Accordion | undefined>(undefined);
export const AccordionProvider = AccordionContext.Provider;
