import React from 'react';

import { IconProps } from '../types';
import Icon from '../Icon';

/**
 * Arrow down svg
 */
const ArrowDownIcon: React.FC<IconProps> = props => {
  return (
    <Icon {...props}>
      <path d="m1.9325 4.2234a0.30058 0.30054 0 0 0 0.32763-0.065368l1.8035-1.8033a0.30061 0.30058 0 1 0-0.42532-0.42489l-1.2902 1.2901v-2.8811a0.30058 0.30054 0 1 0-0.60116 0v2.8815l-1.2906-1.2908a0.30035 0.30031 0 1 0-0.42457 0.42489l1.8027 1.8033a0.30058 0.30054 0 0 0 0.098064 0.064993" />
    </Icon>
  );
};

export default ArrowDownIcon;
