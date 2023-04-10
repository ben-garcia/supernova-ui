import React from 'react';

import { IconProps } from '../types';
import Icon from '../Icon';

/**
 * Half moon svg
 */
const HalfMoonIcon: React.FC<IconProps> = props => {
  return (
    <Icon {...props}>
      <path d="m3.944 3.3922a1.649 1.3187 0 0 1-1.3129-1.2882 1.649 1.3187 0 0 1 1.3129-1.2884 0.32823 0.26247 0 0 0 0.11281-0.4784 2.6196 2.0948 0 0 0-1.4257-0.33717c-1.4504 0-2.6311 0.94364-2.6311 2.104 0 1.1601 1.1807 2.104 2.6311 2.104a2.6199 2.0951 0 0 0 1.4257-0.33743 0.32889 0.263 0 0 0-0.11281-0.4784" />
    </Icon>
  );
};

export default HalfMoonIcon;
