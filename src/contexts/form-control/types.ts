import { ReactNode } from 'react';

import { FormControlProps } from '../../components/molecules/FormControl/types';

export interface FormControl
  extends Omit<FormControlProps, 'children' | 'id' | 'tag'> {
  getErrorMessageProps: () => void;
  getHelpTextProps: () => void;
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
