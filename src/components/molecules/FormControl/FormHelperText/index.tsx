import React, { forwardRef, ReactNode } from 'react';

import { useFormControl } from '@hooks';
import { createClasses, isString } from '@utils';

export interface FormHelperTextProps {
  children: ReactNode;
  className?: string;
}

/**
 * Used to provider feedback about how a field should be filled out.
 */
const FormHelperText = forwardRef(
  (props: FormHelperTextProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    const { children, className } = props;
    const classes = createClasses(
      'snui-form-helper-text snui-font-body snui-margin-y-sm',
      {
        [`${className}`]: isString(className),
      }
    );
    const { id, getHelpTextProps } = useFormControl();

    return (
      <div
        {...getHelpTextProps(props, ref)}
        id={`${id}-helper-text`}
        className={classes}
      >
        {children}
      </div>
    );
  }
);

export default FormHelperText;
