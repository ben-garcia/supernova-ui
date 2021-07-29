import { createContext } from 'react';

import { IdContextProps } from './types';

const initialState: IdContextProps = {
  count: 0,
};

export const IdContext = createContext<IdContextProps>(initialState);
export const IdProvider = IdContext.Provider;
