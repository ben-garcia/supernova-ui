import React from 'react';

import { IconProps } from '../types';
import Icon from '../Icon';

/**
 * User svg
 */
const UserIcon: React.FC<IconProps> = props => {
  return (
    <Icon {...props}>
      <path d="m2.63 2.4753c0.87027 0 1.578 0.6661 1.578 1.4852a0.263 0.24753 0 0 1-0.263 0.24753h-3.682a0.263 0.24753 0 0 1-0.263-0.24753c0-0.81907 0.70773-1.4852 1.578-1.4852zm-0.526-0.31362a1.0181 0.95819 0 0 1-1.017-0.9572v-0.24753a1.0178 0.95794 0 0 1 1.017-0.95695 1.0178 0.95794 0 0 1 1.017 0.95695v0.24753a1.0181 0.95819 0 0 1-1.017 0.9572z" />
    </Icon>
  );
};

export default UserIcon;
