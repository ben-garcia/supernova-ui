import { createContext } from 'react';

import { AccordionItem } from './types';

export const AccordionItemContext = createContext<AccordionItem | undefined>(
  undefined
);
export const AccordionItemProvider = AccordionItemContext.Provider;
