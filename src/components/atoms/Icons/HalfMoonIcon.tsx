import React from 'react';

import { IconProps } from './types';
import Icon from './Icon';

/**
 * Half moon svg
 */
const HalfMoonIcon: React.FC<IconProps> = props => {
  const { fill, height, margin, padding, width } = props;
  return (
    <Icon
      fill={fill}
      height={height}
      margin={margin}
      padding={padding}
      width={width}
    >
      <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.992 14.898A5.014 5.014 0 0112 10a5.014 5.014 0 013.992-4.899.998.998 0 00.343-1.819A7.965 7.965 0 0012 2c-4.41 0-8 3.588-8 8 0 4.411 3.59 8 8 8a7.966 7.966 0 004.335-1.283 1 1 0 00-.343-1.819" />
      </svg>
    </Icon>
  );
};

export default HalfMoonIcon;
