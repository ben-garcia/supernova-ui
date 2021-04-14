import React, { forwardRef, ReactNode } from 'react';

import { useFormControl } from '../../../../hooks';

interface FormErrorMessageProps {
  children: ReactNode;
}

const FormErrorMessage = forwardRef(
  (props: FormErrorMessageProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    const { children } = props;
    const { id, isInvalid, getErrorMessageProps } = useFormControl();

    return isInvalid ? (
      <div
        {...getErrorMessageProps(props, ref)}
        className="_snui-error _snui-margin-top-sm _snui-font-body"
        id={`${id}-feedback`}
      >
        {children}
      </div>
    ) : null;
  }
);

export default FormErrorMessage;
