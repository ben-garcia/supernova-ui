import { createContext } from 'react';

type PseudoClass = 'focus' | 'hover';

interface StyleClass {
  className: string;
  pseudoKind: PseudoClass;
  styles: string;
}

export interface StyleContextProps {
  classes: StyleClass[];
}

const initialState: StyleContextProps = {
  classes: [],
};

export const StyleContext = createContext<StyleContextProps>(initialState);
export const StyleProvider = StyleContext.Provider;
