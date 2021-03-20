import React from 'react';

import { IconProps } from '../types';
import Icon from '../Icon';

/**
 * Connectivity svg
 */
const ConnectivityIcon: React.FC<IconProps> = props => {
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
        <path d="M1 8a1 1 0 011 1v5a1 1 0 01-2 0V9a1 1 0 011-1zm4.667-3a1 1 0 011 1v8a1 1 0 01-2 0V6a1 1 0 011-1zm4.667-2a1 1 0 011 1v10a1 1 0 01-2 0V4a1 1 0 011-1zM15 0a1 1 0 011 1v13a1 1 0 01-2 0V1a1 1 0 011-1z" />
      </svg>
    </Icon>
  );
};

export default ConnectivityIcon;
