import React from 'react';

import { IconProps } from '../types';
import Icon from '../Icon';

/**
 * User svg
 */
const UserIcon: React.FC<IconProps> = props => {
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
        <path d="M12 11c3.309 0 6 2.691 6 6a1 1 0 01-1 1H3a1 1 0 01-1-1c0-3.309 2.691-6 6-6h4zm-2-1.267a3.871 3.871 0 01-3.867-3.867v-1A3.87 3.87 0 0110 1a3.87 3.87 0 013.867 3.866v1A3.871 3.871 0 0110 9.733z" />
      </svg>
    </Icon>
  );
};

export default UserIcon;
