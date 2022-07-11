import React from 'react';

import { FormControlProvider } from '@contexts/form-control';
import { useUniqueId } from '@hooks/index';
import { useFormControlProvider } from '@hooks/use-form-control';
import { createElement, createClasses, isString } from '@utils/index';

import { FormControlProps } from './types';
import './styles.scss';

/**
 * The container for all FormControl related components
 * that provides context to its children.
 */
const FormControl: React.FC<FormControlProps> = props => {
  const { children, className, id = '', tag = 'div' } = props;
  const classes = createClasses('snui-form-control snui-margin-y-sm', {
    [`${className}`]: isString(className),
  });
  const elementToRender = createElement(
    tag,
    { className: classes, role: 'group' },
    children
  );
  const textInputId = isString(id) ? id : useUniqueId('snui-text-input');

  // if (isString(id)) {
  //   idToUse = `${id}-${Math.random()}`;
  // } else {
  //   idToUse = `field-${Math.random()}`;
  // }

  const context = useFormControlProvider(props);
  const contextValue = React.useMemo(() => ({ ...context, id: textInputId }), [
    context,
  ]);

  return (
    <FormControlProvider value={contextValue as any}>
      {elementToRender}
    </FormControlProvider>
  );
};

export default FormControl;
