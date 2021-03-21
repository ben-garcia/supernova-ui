import React from 'react';

import { IconProps } from '../types';
import Icon from '../Icon';

/**
 * Link svg
 */
const LinkIcon: React.FC<IconProps> = props => {
  const { fill, size } = props;
  return (
    <Icon fill={fill} size={size}>
      <path d="m3.77 0.43592a1.4833 1.4876 0 1 0-2.0977 2.1038 0.2398 0.2405 0 0 0 0.33796-0.34128 1.0232 1.0262 0 1 1 1.1467 0.19401 1.7271 1.7321 0 0 1 0.032631 0.3366v0.15895a1.4754 1.4797 0 0 0 0.58502-2.4544z" />
      <path d="m2.1967 1.6818a0.23308 0.23375 0 0 0 0 0.32959 1.0232 1.0262 0 1 1-1.1467-0.19401 1.7271 1.7321 0 0 1-0.032631-0.3366v-0.15895a1.4754 1.4797 0 1 0 1.501 0.35998 0.23308 0.23375 0 0 0-0.32165 0z" />
    </Icon>
  );
};

export default LinkIcon;
