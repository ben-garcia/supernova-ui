import { ReactNode, ForwardedRef } from 'react';

import { FormControlProps } from '@components/FormControl/types';
import { FormHelperTextProps } from '@components/FormControl/FormHelperText';

export interface FormControl
  extends Omit<FormControlProps, 'children' | 'id' | 'tag'> {
  getErrorMessageProps: (
    props: FormHelperTextProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => void;
  getHelpTextProps: (
    props: FormHelperTextProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => void;
  hasFeedbackText: boolean;
  hasHelpText: boolean;
  /**
   * the base id for the FormControl component
   */
  id: string;
  setHasFeedbackText: () => void;
  setHasHelpText: () => void;
}

export interface FormControlProviderProps {
  children: ReactNode;
  value: FormControl;
}
