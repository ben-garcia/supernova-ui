import React, { ReactNode } from 'react';

import {
  useClassStyles,
  useCreateClassString,
  useFormControl,
  usePseudoClasses,
  useValidateProps,
} from '@hooks';
import { forwardRef, isString } from '@utils';
import { SupernovaProps } from '@types';

export interface FormHelperTextProps extends SupernovaProps {
  children: ReactNode;
}

/**
 * Used to provider feedback about how a field should be filled out.
 */
const FormHelperText = forwardRef<FormHelperTextProps, HTMLDivElement>(
  (props, ref) => {
    const { children, className, ...rest } = props;
    const {
      remainingProps,
      validatedCSSProps,
      validatedPseudoClassProps,
    } = useValidateProps(rest);
    const pseudoClassName = usePseudoClasses(validatedPseudoClassProps);
    const stylesClassName = useClassStyles(validatedCSSProps);
    const addClasses = useCreateClassString('snui snui-form-helper-text', {
      [`${className}`]: isString(className),
      [`${pseudoClassName}`]: isString(pseudoClassName),
      [`${stylesClassName}`]: isString(stylesClassName),
    });
    const { id, getHelpTextProps } = useFormControl();

    return (
      <div
        {...getHelpTextProps(remainingProps as any, ref)}
        {...addClasses()}
        id={`${id}-helper-text`}
      >
        {children}
      </div>
    );
  }
);

export default FormHelperText;
