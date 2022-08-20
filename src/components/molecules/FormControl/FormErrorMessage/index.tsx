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

interface FormErrorMessageProps extends SupernovaProps {
  children: ReactNode;
}

/**
 * Used to provider feedback about an invalid field.
 */
const FormErrorMessage = forwardRef<FormErrorMessageProps, HTMLDivElement>(
  (props, ref) => {
    const { children, className, ...rest } = props;
    const {
      remainingProps,
      validatedCSSProps,
      validatedPseudoClassProps,
    } = useValidateProps(rest);
    const pseudoClassName = usePseudoClasses(validatedPseudoClassProps);
    const stylesClassName = useClassStyles(validatedCSSProps);
    const addClasses = useCreateClassString(
      'snui snui-form-error-message snui-error snui-font-body snui-margin-y-sm',
      {
        [`${className}`]: isString(className),
        [`${pseudoClassName}`]: isString(pseudoClassName),
        [`${stylesClassName}`]: isString(stylesClassName),
      }
    );
    const { id, isInvalid, getErrorMessageProps } = useFormControl();

    return isInvalid ? (
      <div
        {...getErrorMessageProps(remainingProps as any, ref)}
        {...addClasses()}
        id={`${id}-feedback`}
      >
        {children}
      </div>
    ) : null;
  }
);

export default FormErrorMessage;
