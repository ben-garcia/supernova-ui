import React from 'react';

import { FormControlProvider } from '../../../contexts/form-control';
import { FormControlProps } from './types';
import { createElement, createClasses, isString } from '../../../utils';
import { useFormControlProvider } from '../../../hooks/use-form-control';

import './styles.scss';

/**
 * Component that holds the context for its children
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
  let idToUse: string;

  if (!isString(id)) {
    idToUse = `field-${Math.random()}`;
  } else {
    idToUse = `${id}-${Math.random()}`;
  }

  const context = useFormControlProvider(props);
  const contextValue = React.useMemo(() => ({ ...context, id: idToUse }), [
    context,
  ]);

  return (
    <FormControlProvider value={contextValue as any}>
      {elementToRender}
    </FormControlProvider>
  );
};

export default FormControl;
