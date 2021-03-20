import React from 'react';

import { IconProps } from '../types';
import Icon from '../Icon';

/**
 * Search svg
 */
const SearchIcon: React.FC<IconProps> = props => {
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
        <path d="M15.59 13.91l2.78 2.69a1.25 1.25 0 11-1.74 1.8l-2.82-2.73a8 8 0 111.78-1.76zm-.95-4.71a5.45 5.45 0 10-5.44 5.44 5.45 5.45 0 005.44-5.44z" />
      </svg>
    </Icon>
  );
};

export default SearchIcon;
