import React from 'react';

import { IconProps } from '../types';
import Icon from '../Icon';

/**
 * Checkmark svg
 */
const CheckmarkIcon: React.FC<IconProps> = props => {
  const { fill, size } = props;
  return (
    <Icon fill={fill} size={size}>
      <path d="m1.4292 4.1254-1.3676-1.834c-0.082163-0.11018-0.082163-0.28882 0-0.39902l0.29754-0.39902c0.082163-0.11019 0.21539-0.11019 0.29755 0l0.92128 1.2354 1.9733-2.6462c0.082163-0.11018 0.21539-0.11018 0.29755 0l0.29754 0.39902c0.082163 0.11018 0.082163 0.28883 0 0.39902l-2.4196 3.2447c-0.082171 0.11018-0.21539 0.11018-0.29755-1.1e-5z" />
    </Icon>
  );
};

export default CheckmarkIcon;
