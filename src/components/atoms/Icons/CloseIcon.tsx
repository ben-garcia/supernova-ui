import React from 'react';

import { IconProps } from './types';
import Icon from './Icon';

/**
 * Close svg
 */
const CloseIcon: React.FC<IconProps> = props => {
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
        <path d="M11.649 9.882l6.613-6.615L16.495 1.5 9.881 8.114 3.267 1.5 1.5 3.267l6.614 6.616L1.5 16.497l1.767 1.767 6.614-6.614 6.614 6.614 1.767-1.767z" />
      </svg>
    </Icon>
  );
};

export default CloseIcon;
