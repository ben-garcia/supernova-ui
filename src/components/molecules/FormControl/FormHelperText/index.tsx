import React, { forwardRef, ReactNode } from 'react';

import { useFormControl } from '../../../../hooks';

export interface FormHelperTextProps {
  children: ReactNode;
}

const FormHelperText = forwardRef(
  (props: FormHelperTextProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    const { children } = props;
    const { id, getHelpTextProps } = useFormControl();

    return (
      <div
        {...getHelpTextProps(props, ref)}
        id={`${id}-helper-text`}
        className="snui-form-helper-text snui-font-body snui-margin-y-sm"
      >
        {children}
      </div>
    );
  }
);

export default FormHelperText;
