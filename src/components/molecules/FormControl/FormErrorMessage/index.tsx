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
        className="snui-error snui-font-body snui-margin-y-sm"
        id={`${id}-feedback`}
      >
        {children}
      </div>
    ) : null;
  }
);

export default FormErrorMessage;
