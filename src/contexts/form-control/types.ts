import { ReactNode } from 'react';

import { FormControlProps } from '../../components/molecules/FormControl/types';

export interface FormControl
  extends Omit<FormControlProps, 'children' | 'id' | 'tag'> {
  /**
   * the base id for the FormControl component
   */
  id: string;
  hasFeedbackText: any;
  setHasFeedbackText: any;
  hasHelpText: any;
  setHasHelpText: any;
  getHelpTextProps: any;
  getErrorMessageProps: any;
}

export interface FormControlProviderProps {
  children: ReactNode;
  value: FormControl;
}
