import React from 'react';

import { FlexProps } from './types';
import { createClasses, isString } from '../../../utils';

const Flex: React.FC<FlexProps> = props => {
  const {
    alignItems = 'flex-start',
    children,
    className = '',
    direction = 'row',
    justifyContent = 'flex-start',
    spacing = 2,
    wrap = 'wrap',
  } = props;
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const classes = createClasses('snui-flex snui-flex-container', {
    [`${className}`]: isString(className),
    [`snui-items-${alignItems}`]: true,
    [`snui-flex-${direction}`]: true,
    [`snui-justify-${justifyContent}`]: true,
    [`snui-${wrap}`]: true,
  });
  const childrenToRender: any[] = [];

  if (numbers.includes(spacing)) {
    const internalUsePadding = `${spacing * 4}px`;

    React.Children.toArray(children).forEach((child: any) => {
      // check for the 'className' prop
      const childClass = child.props.className;
      const childClasses = createClasses('snui-flex-item', {
        [`${childClass}`]: isString(childClass),
      });
      const enhancedChild = React.cloneElement(child, {
        internalUsePadding,
        className: childClasses,
      });

      childrenToRender.push(enhancedChild);
    });
  }

  return <div className={classes}>{childrenToRender}</div>;
};

export default Flex;
