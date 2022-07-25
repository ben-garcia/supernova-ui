import { MutableRefObject } from 'react';

type PseudoClass = 'focus' | 'hover';

export interface StyleClass {
  className: string;
  count: number;
  pseudoKind: PseudoClass;
  styles: string;
}

export type StyleContextProps = MutableRefObject<StyleClass[]>;
