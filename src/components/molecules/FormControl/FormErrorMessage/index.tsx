import React, { forwardRef, ReactNode } from 'react';

import { useFormControl } from '../../../../hooks';
import { createClasses, isString } from '../../../../utils';

interface FormErrorMessageProps {
  children: ReactNode;
  className?: string;
}

const FormErrorMessage = forwardRef(
  (props: FormErrorMessageProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    const { children, className } = props;
    const classes = createClasses(
      'snui-error snui-font-body snui-margin-y-sm',
      {
        [`${className}`]: isString(className),
      }
    );
    const { id, isInvalid, getErrorMessageProps } = useFormControl();

    return isInvalid ? (
      <div
        {...getErrorMessageProps(props, ref)}
        className={classes}
        id={`${id}-feedback`}
      >
        {children}
      </div>
    ) : null;
  }
);

export default FormErrorMessage;
