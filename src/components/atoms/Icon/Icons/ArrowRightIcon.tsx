import React from 'react';

import { IconProps } from '../types';
import Icon from '../Icon';

/**
 * Arrow right svg
 */
const ArrowRightIcon: React.FC<IconProps> = props => {
  const { fill, size } = props;
  return (
    <Icon fill={fill} size={size}>
      <path d="m4.1288 2.2573a0.30054 0.30058 0 0 0-0.065368-0.32763l-1.8033-1.8035a0.30058 0.30061 0 1 0-0.42489 0.42532l1.2901 1.2902h-2.8811a0.30054 0.30058 0 1 0 0 0.60116h2.8815l-1.2908 1.2906a0.30031 0.30035 0 1 0 0.42489 0.42457l1.8033-1.8027a0.30054 0.30058 0 0 0 0.064993-0.098064" />
    </Icon>
  );
};

export default ArrowRightIcon;
