import React from 'react';

import { IconProps } from './types';
import Icon from './Icon';

/**
 * Info svg
 */
const InfoIcon: React.FC<IconProps> = props => {
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
        <path d="M10 8.5a1 1 0 011 1v4a1 1 0 11-2 0v-4a1 1 0 011-1zm.7-2.71c.101.1.17.21.221.33.05.12.08.25.08.38 0 .07-.01.13-.02.2a.633.633 0 01-.06.18.581.581 0 01-.09.17c-.04.06-.08.11-.13.16-.04.04-.09.08-.15.12a.58.58 0 01-.17.09.61.61 0 01-.19.06c-.06.01-.13.02-.19.02-.26 0-.52-.11-.71-.29C9.11 7.02 9 6.77 9 6.5c0-.13.03-.26.08-.38.05-.13.12-.23.21-.33.23-.23.58-.33.9-.27.07.01.13.03.19.06a.58.58 0 01.17.09c.06.04.11.08.15.12zM10 16c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6m0-14c-4.411 0-8 3.589-8 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8" />
      </svg>
    </Icon>
  );
};

export default InfoIcon;
