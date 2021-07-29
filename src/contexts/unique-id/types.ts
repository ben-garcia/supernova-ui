import { createContext } from 'react';

export interface IdContextProps {
  count: number;
}

const initialState: IdContextProps = {
  count: 0,
};

export const IdContext = createContext<IdContextProps>(initialState);
export const IdProvider = IdContext.Provider;
