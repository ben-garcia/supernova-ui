import React, { FC, PropsWithChildren, Children } from 'react';

import { useCSSAndPseudoClassProps } from '@hooks/use-css-and-pseudo-class-props';
import { isString } from '@utils/assertions';
import type { RadioGroupRootProps } from './types';

/**
 * UI component used as a wrapper for Radio components
 */
const RadioGroupRoot: FC<PropsWithChildren<RadioGroupRootProps>> = props => {
  const {
    children,
    defaultValue,
    orientation = 'row',
    name,
    onChange = () => {},
    ...rest
  } = props;
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
  const addCSSClassesAndProps = useCSSAndPseudoClassProps(
    rest,
    'snui snui-radio-group snui-inline-flex snui-gap-5',
    {
      [`snui-flex-${orientation}`]: isString(orientation),
      'snui-flex-center': isString(orientation) && orientation === 'row',
      'snui-items-flex-start':
        isString(orientation) && orientation === 'column',
    }
  );
  return (
    <div {...addCSSClassesAndProps()} role="radiogroup">
      {enhancedChildren}
    </div>
  );
};

export default RadioGroupRoot;
