import React from 'react';

import { IconProps } from '../types';
import Icon from '../Icon';

/**
 * Logout svg
 */
const LogoutIcon: React.FC<IconProps> = props => {
  const { fill, size } = props;
  return (
    <Icon fill={fill} size={size}>
      <path d="m3.8573 0h-3.5067a0.35067 0.263 0 0 0-0.35067 0.263v1.578h1.9588l-0.45341-0.34006a0.35061 0.26296 0 1 1 0.49584-0.37188l1.052 0.789a0.35032 0.26274 0 0 1 0 0.37188l-1.052 0.789a0.34961 0.26221 0 0 1-0.49584 0 0.35032 0.26274 0 0 1 0-0.37188l0.45341-0.34006h-1.9588v1.578a0.35067 0.263 0 0 0 0.35067 0.263h3.5067a0.35067 0.263 0 0 0 0.35067-0.263v-3.682a0.35067 0.263 0 0 0-0.35067-0.263" />
    </Icon>
  );
};

export default LogoutIcon;
