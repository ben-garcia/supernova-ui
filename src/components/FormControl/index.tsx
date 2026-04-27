import { FC, ForwardRefExoticComponent, PropsWithChildren } from 'react';

import FormControlRoot from './FormControlRoot';
import { FormControlRootProps } from './types';
import FormErrorMessage, { FormErrorMessageProps } from './FormErrorMessage';
import FormHelperText, { FormHelperTextProps } from './FormHelperText';

interface FormControlComponent {
  /**
   * The container for all FormControl related components
   * that provides context to its children.
   */
  Root: FC<PropsWithChildren<FormControlRootProps>>;
  /**
   * Used to provider feedback about an invalid field.
   */
  ErrorMessage: ForwardRefExoticComponent<FormErrorMessageProps>;
  /**
   * Used to provider feedback about how a field should be filled out.
   */
  HelperText: ForwardRefExoticComponent<FormHelperTextProps>;
}

const FormControl: FormControlComponent = {
  Root: FormControlRoot,
  ErrorMessage: FormErrorMessage,
  HelperText: FormHelperText,
};

export default FormControl;
