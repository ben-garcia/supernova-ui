import React, { Children } from 'react';

import { RadioGroupProps } from './types';
import { createClasses, isString } from '../../../../utils';

/**
 * UI component used as a wrapper for Radio components
 *
 * injects 'name', 'onChange' handler, and 'isChecked' props to its children
 */
const RadioGroup: React.FC<RadioGroupProps> = props => {
  const {
    children,
    defaultValue,
    direction = 'row',
    name,
    onChange = () => {},
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
  const classes = createClasses('snui-radio-group snui-inline-flex', {
    [`snui-flex-${direction}`]: isString(direction),
    'snui-flex-center': isString(direction) && direction === 'row',
    'snui-items-start': isString(direction) && direction === 'column',
  });
  return (
    <div className={classes} role="radiogroup">
      {enhancedChildren}
    </div>
  );
};

export default RadioGroup;
