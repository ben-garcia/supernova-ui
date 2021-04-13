import { createContext } from 'react';

import { FormControl } from './types';

const initialTheme: FormControl = {
  id: '',
  isDisabled: false,
  isInvalid: false,
  isRequired: false,
  hasHelpText: false,
  setHasHelpText: null,
  hasFeedbackText: false,
  getHelpTextProps: null,
  setHasFeedbackText: null,
  getErrorMessageProps: null,
};

export const FormControlContext = createContext<FormControl>(initialTheme);

export const FormControlProvider = FormControlContext.Provider;
