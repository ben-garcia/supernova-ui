import { createContext } from 'react';

import { Editable } from './types';

export const EditableContext = createContext<Editable | undefined>(undefined);
export const EditableProvider = EditableContext.Provider;
