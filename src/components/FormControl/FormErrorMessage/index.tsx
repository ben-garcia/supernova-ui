import React, { ReactNode } from 'react';

import { useCSSAndPseudoClassProps } from '@hooks/use-css-and-pseudo-class-props';
import { useFormControl } from '@hooks/use-form-control';
import { forwardRef } from '@utils/react';
import type { SupernovaProps } from '@types';

export interface FormErrorMessageProps extends SupernovaProps {
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
