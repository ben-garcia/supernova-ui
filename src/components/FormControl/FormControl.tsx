import React, { FC, useMemo } from 'react';

import { FormControlProvider } from '@contexts';
import {
  useClassStyles,
  useCreateClassString,
  useFormControlProvider,
  usePseudoClasses,
  useUniqueId,
  useValidateProps,
} from '@hooks';
import { createElement, isString } from '@utils';

import { FormControlProps } from './types';
import './styles.scss';

/**
 * The container for all FormControl related components
 * that provides context to its children.
 */
const FormControl: FC<FormControlProps> = props => {
  const {
    children,
    className,
    isInvalid = false,
    isDisabled = false,
    isRequired = false,
    tag = 'div',
    ...rest
  } = props;
  const {
    remainingProps,
    validatedCSSProps,
    validatedPseudoClassProps,
  } = useValidateProps(rest);
  const pseudoClassName = usePseudoClasses(validatedPseudoClassProps);
  const stylesClassName = useClassStyles(validatedCSSProps);
  const addClasses = useCreateClassString('snui snui-form-control', {
    [`${className}`]: isString(className),
    [`${pseudoClassName}`]: isString(pseudoClassName),
    [`${stylesClassName}`]: isString(stylesClassName),
  });
  const elementToRender = createElement(
    tag,
    { ...remainingProps, ...addClasses(), role: 'group' },
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
