import React, { FC, Children } from 'react';

import {
  useClassStyles,
  useCreateClassString,
  usePseudoClasses,
  useValidateProps,
} from '@hooks';
import { isString } from '@utils';

import { RadioGroupProps } from './types';

/**
 * UI component used as a wrapper for Radio components
 *
 * injects 'name', 'onChange' handler, and 'isChecked' props to its children
 */
const RadioGroup: FC<RadioGroupProps> = props => {
  const {
    children,
    className,
    defaultValue,
    orientation = 'row',
    name,
    onChange = () => {},
    ...rest
  } = props;
  const {
    remainingProps,
    validatedCSSProps,
    validatedPseudoClassProps,
  } = useValidateProps(rest);
  const pseudoClassName = usePseudoClasses(validatedPseudoClassProps);
  const stylesClassName = useClassStyles(validatedCSSProps);
  // children with the added props to be rendered
  const enhancedChildren: React.ReactNode[] = [];
  Children.toArray(children).forEach((child: any) => {
    const { value } = child.props;
    // create a new element from the old, and add necessary props
    const newChild = React.cloneElement(child, {
      isChecked: defaultValue === value,
      name,
      onChange: () => onChange!(value),
    });
    enhancedChildren.push(newChild);
  });
  const addClasses = useCreateClassString(
    'snui snui-radio-group snui-inline-flex snui-gap-5',
    {
      [`${className}`]: isString(className),
      [`snui-flex-${orientation}`]: isString(orientation),
      'snui-flex-center': isString(orientation) && orientation === 'row',
      'snui-items-flex-start':
        isString(orientation) && orientation === 'column',
      [`${pseudoClassName}`]: isString(pseudoClassName),
      [`${stylesClassName}`]: isString(stylesClassName),
    }
  );
  return (
    <div {...remainingProps} {...addClasses()} role="radiogroup">
      {enhancedChildren}
    </div>
  );
};

export default RadioGroup;
