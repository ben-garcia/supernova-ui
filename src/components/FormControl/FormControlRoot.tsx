import React, { FC, PropsWithChildren, useMemo } from 'react';

import { FormControlProvider } from '@contexts/form-control/FormControlProvider';
import { useCSSAndPseudoClassProps } from '@hooks/use-css-and-pseudo-class-props';
import { useFormControlProvider } from '@hooks/use-form-control';
import { useUniqueId } from '@hooks/use-unique-id';
import { createElement } from '@utils/react';
import type { FormControlRootProps } from './types';
import './styles.scss';

/**
 * The container for all FormControl related components
 * that provides context to its children.
 */
const FormControlRoot: FC<PropsWithChildren<FormControlRootProps>> = props => {
  const {
    children,
    isInvalid = false,
    isDisabled = false,
    isRequired = false,
    tag = 'div',
    ...rest
  } = props;
  const addCSSClassesAndProps = useCSSAndPseudoClassProps(
    rest,
    'snui snui-form-control'
  );
  const elementToRender = createElement(
    tag,
    { ...addCSSClassesAndProps(), role: 'group' },
    children
  );
  const id = useUniqueId('snui-form-control');
  const context = useFormControlProvider(props);
  const contextValue = useMemo(
    () => ({ ...context, id, isDisabled, isInvalid, isRequired }),
    [context, id, isDisabled, isInvalid, isRequired]
  );

  return (
    <FormControlProvider value={contextValue as any}>
      {elementToRender}
    </FormControlProvider>
  );
};

export default FormControlRoot;
