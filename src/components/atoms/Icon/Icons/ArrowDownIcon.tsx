import React from 'react';

import { IconProps } from '../types';
import Icon from '../Icon';

/**
 * Arrow down svg
 */
const ArrowDownIcon: React.FC<IconProps> = props => {
  const { fill, height, margin, padding, width } = props;
  return (
    <Icon
      fill={fill}
      height={height}
      margin={margin}
      padding={padding}
      width={width}
    >
      <svg viewBox="0 0 11.4 11.4" xmlns="http://www.w3.org/2000/svg">
        <path d="m5.334 11.228a0.8 0.8 0 0 0 0.872-0.174l4.8-4.8a0.80009 0.80009 0 1 0-1.132-1.131l-3.434 3.434v-7.669a0.8 0.8 0 1 0-1.6 0v7.67l-3.435-3.436a0.79938 0.79938 0 1 0-1.13 1.131l4.798 4.8a0.8 0.8 0 0 0 0.261 0.173" />
      </svg>
    </Icon>
  );
};

export default ArrowDownIcon;
