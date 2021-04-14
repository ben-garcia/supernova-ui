import React, { forwardRef, ReactNode } from 'react';

import { useFormControl } from '../../../../hooks';

interface FormHelperTextProps {
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
        className="_snui-form-helper-text _snui-margin-top-sm _snui-font-body"
      >
        {children}
      </div>
    );
  }
);

export default FormHelperText;
