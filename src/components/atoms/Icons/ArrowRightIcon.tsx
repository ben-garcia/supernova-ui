import React from 'react';

import { IconProps } from './types';
import Icon from './Icon';

/**
 * Arrow right svg
 */
const ArrowRightIcon: React.FC<IconProps> = props => {
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
        <path d="M11.18 5.995a.8.8 0 00-.174-.872l-4.8-4.8a.8.8 0 10-1.131 1.132l3.434 3.434H.84a.8.8 0 100 1.6h7.67L5.074 9.924a.799.799 0 101.131 1.13l4.8-4.798a.8.8 0 00.173-.261" />
      </svg>
    </Icon>
  );
};

export default ArrowRightIcon;
