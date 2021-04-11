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
  extends Omit<CommonProps, 'children' | 'isLoading'>,
    FormControlProps,
    SupernovaUIBaseProps,
    Omit<TypographyProps, 'align'> {
  /**
   * React reference
   */
  ref?: RefObject<HTMLInputElement>;
  /**
   * Indiacate the type of input
   *
   * @default 'text'
   */
  typeOf?: 'email' | 'text' | 'password';
}
