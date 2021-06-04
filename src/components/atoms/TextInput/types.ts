import { RefObject } from 'react';

import {
  CommonProps,
  FormControlProps,
  SupernovaUIBaseProps,
  TypographyProps,
} from '../../../types';

/**
 * Props for the TextInput component
 */
export interface TextInputProps
  extends Omit<CommonProps, 'children' | 'isLoading' | 'size'>,
    FormControlProps,
    SupernovaUIBaseProps,
    Omit<TypographyProps, 'align'> {
  /**
   * The class to be set on the label
   */
  labelClassName?: string;
  /**
   * React reference
   */
  ref?: RefObject<HTMLInputElement>;
  /**
   * The size of the input
   *
   * @default 'md'
   */
  size?: 'sm' | 'md';
  /**
   * Indiacate the type of input
   *
   * @default 'text'
   */
  typeOf?: 'email' | 'text' | 'password';
}
