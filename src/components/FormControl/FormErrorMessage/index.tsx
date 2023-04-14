import React, { ReactNode } from 'react';

import { useCSSAndPseudoClassProps, useFormControl } from '@hooks';
import { forwardRef } from '@utils';
import { SupernovaProps } from '@types';

interface FormErrorMessageProps extends SupernovaProps {
  children: ReactNode;
}

/**
 * Used to provider feedback about an invalid field.
 */
const FormErrorMessage = forwardRef<FormErrorMessageProps, HTMLDivElement>(
  (props, ref) => {
    const { children, ...rest } = props;
    const addCSSClassesAndProps = useCSSAndPseudoClassProps(
      rest,
      'snui snui-form-error-message snui-error snui-font-body snui-margin-y-sm'
    );
    const { id, isInvalid, getErrorMessageProps } = useFormControl();

    return isInvalid ? (
      <div
        {...getErrorMessageProps({ ...addCSSClassesAndProps() } as any, ref)}
        id={`${id}-feedback`}
      >
        {children}
      </div>
    ) : null;
  }
);

export default FormErrorMessage;
