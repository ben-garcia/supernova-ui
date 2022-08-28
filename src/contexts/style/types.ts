import { MutableRefObject } from 'react';

export type PseudoClassesAndElements =
  | 'active'
  | 'after'
  | 'any-link'
  | 'autofill'
  | 'before'
  | 'blank'
  | 'checked'
  | 'current'
  | 'default'
  | 'disabled'
  | 'empty'
  | 'enabled'
  | 'extends '
  | 'first-of-child'
  | 'first-letter'
  | 'first-line'
  | 'focus'
  | 'focus-within'
  | 'focus-visible'
  | 'fullscreen'
  | 'future'
  | 'hover'
  | 'indeterminate'
  | 'inRange'
  | 'invalid'
  | 'last-child'
  | 'last-of-type'
  | 'link'
  | 'local-link'
  | 'modal'
  | 'optional'
  | 'only-child'
  | 'out-of-range'
  | 'only-of-type'
  | 'past'
  | 'paused'
  | 'picture-in-picture'
  | 'placeholder'
  | 'placeholder-shown'
  | 'playing'
  | 'read-only'
  | 'read-write'
  | 'required'
  | 'scope'
  | 'selection'
  | 'target'
  | 'target-within'
  | 'user-invalid'
  | 'valid'
  | 'visited';

export interface StyleClass {
  className: string;
  count: number;
  pseudoKind: PseudoClassesAndElements;
  styles: string;
}

export type StyleContextProps = MutableRefObject<StyleClass[]>;
