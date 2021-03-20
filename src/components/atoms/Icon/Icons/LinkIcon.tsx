import React from 'react';

import { IconProps } from '../types';
import Icon from '../Icon';

/**
 * Link svg
 */
const LinkIcon: React.FC<IconProps> = props => {
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
        <path d="M17.15 2.86a6.33 6.33 0 10-9 9A1 1 0 009.6 10.4a4.39 4.39 0 114.92.83 7.41 7.41 0 01.14 1.44v.68a6.33 6.33 0 002.51-10.5z" />
        <path d="M10.4 8.19a1 1 0 000 1.41 4.39 4.39 0 11-4.92-.83 7.41 7.41 0 01-.14-1.44v-.68a6.33 6.33 0 106.44 1.54 1 1 0 00-1.38 0z" />
      </svg>
    </Icon>
  );
};

export default LinkIcon;
