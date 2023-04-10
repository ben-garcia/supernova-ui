import React from 'react';

import { IconProps } from '../types';
import Icon from '../Icon';

/**
 * Arrow up svg
 */
const ArrowUpIcon: React.FC<IconProps> = props => {
  return (
    <Icon {...props}>
      <path d="m2.1627 0.061043a0.30058 0.30054 0 0 0-0.32763 0.065368l-1.8035 1.8033a0.30061 0.30058 0 1 0 0.42532 0.42489l1.2902-1.2901v2.8811a0.30058 0.30054 0 1 0 0.60116 0v-2.8815l1.2906 1.2908a0.30035 0.30031 0 1 0 0.42457-0.42489l-1.8027-1.8033a0.30058 0.30054 0 0 0-0.098064-0.064993" />
    </Icon>
  );
};

export default ArrowUpIcon;
