import { createContext } from 'react';

import { FormControl } from './types';

const initialState: FormControl = {
  id: '',
  isDisabled: false,
  isInvalid: false,
  isRequired: false,
  hasHelpText: false,
  setHasHelpText: () => {},
  hasFeedbackText: false,
  getHelpTextProps: () => {},
  setHasFeedbackText: () => {},
  getErrorMessageProps: () => {},
};

export const FormControlContext = createContext<FormControl>(initialState);
export const FormControlProvider = FormControlContext.Provider;
