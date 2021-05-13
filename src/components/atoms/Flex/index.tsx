import React from 'react';

import { FlexProps } from './types';
import { createClasses } from '../../../utils';

const Flex: React.FC<FlexProps> = props => {
  const {
    alignItems = 'flex-start',
    children,
    direction = 'row',
    justifyContent = 'flex-start',
    spacing = 2,
    wrap = 'wrap',
  } = props;
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const classes = createClasses('snui-flex snui-flex-container', {
    [`snui-items-${alignItems}`]: true,
    [`snui-flex-${direction}`]: true,
    [`snui-justify-${justifyContent}`]: true,
    [`snui-${wrap}`]: true,
  });
  const childrenToRender: any[] = [];

  if (numbers.includes(spacing)) {
    const internalUsePadding = `${spacing * 4}px`;

    React.Children.toArray(children).forEach((child: any) => {
      const enhancedChild = React.cloneElement(child, {
        internalUsePadding,
        className: 'snui-flex-item',
      });

      childrenToRender.push(enhancedChild);
    });
  }

  return <div className={classes}>{childrenToRender}</div>;
};

export default Flex;
