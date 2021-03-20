import React from 'react';

import { IconProps } from './types';
import Icon from './Icon';

/**
 * Arrow left svg
 */
const ArrowLeftIcon: React.FC<IconProps> = props => {
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
        <path d="m0.10086 5.3822a0.8 0.8 0 0 0 0.174 0.872l4.8 4.8a0.80009 0.80009 0 1 0 1.131-1.132l-3.434-3.434h7.669a0.8 0.8 0 1 0 0-1.6h-7.67l3.436-3.435a0.79938 0.79938 0 1 0-1.131-1.13l-4.8 4.798a0.8 0.8 0 0 0-0.173 0.261" />
      </svg>
    </Icon>
  );
};

export default ArrowLeftIcon;
