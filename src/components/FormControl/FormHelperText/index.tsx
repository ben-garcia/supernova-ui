import React, { ReactNode } from 'react';

import { useCSSAndPseudoClassProps, useFormControl } from '@hooks';
import { forwardRef } from '@utils';
import { SupernovaProps } from '@types';

export interface FormHelperTextProps extends SupernovaProps {
  children: ReactNode;
}

/**
 * Used to provider feedback about how a field should be filled out.
 */
const FormHelperText = forwardRef<FormHelperTextProps, HTMLDivElement>(
  (props, ref) => {
    const { children, ...rest } = props;
    const addCSSClassesAndProps = useCSSAndPseudoClassProps(
      rest,
      'snui snui-form-helper-text'
    );
    const { id, getHelpTextProps } = useFormControl();

    return (
      <div
        {...getHelpTextProps({ ...addCSSClassesAndProps() } as any, ref)}
        id={`${id}-helper-text`}
      >
        {children}
      </div>
    );
  }
);

export default FormHelperText;
