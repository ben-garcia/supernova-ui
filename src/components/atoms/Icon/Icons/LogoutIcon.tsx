import React from 'react';

import { IconProps } from '../types';
import Icon from '../Icon';

/**
 * Logout svg
 */
const LogoutIcon: React.FC<IconProps> = props => {
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
        <path d="M15 2H5a1 1 0 00-1 1v6h5.586L8.293 7.707a.999.999 0 111.414-1.414l3 3a.999.999 0 010 1.414l-3 3a.997.997 0 01-1.414 0 .999.999 0 010-1.414L9.586 11H4v6a1 1 0 001 1h10a1 1 0 001-1V3a1 1 0 00-1-1" />
      </svg>
    </Icon>
  );
};

export default LogoutIcon;
