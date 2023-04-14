import React, { FC, useMemo } from 'react';

import { FormControlProvider } from '@contexts';
import {
  useCSSAndPseudoClassProps,
  useFormControlProvider,
  useUniqueId,
} from '@hooks';
import { createElement } from '@utils';
import { FormControlProps } from './types';
import './styles.scss';

/**
 * The container for all FormControl related components
 * that provides context to its children.
 */
const FormControl: FC<FormControlProps> = props => {
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
    [context]
  );

  return (
    <FormControlProvider value={contextValue as any}>
      {elementToRender}
    </FormControlProvider>
  );
};

export default FormControl;
