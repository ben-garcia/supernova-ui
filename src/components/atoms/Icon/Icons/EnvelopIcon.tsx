import React from 'react';

import { IconProps } from '../types';
import Icon from '../Icon';

/**
 * Envelop svg
 */
const EnvelopIcon: React.FC<IconProps> = props => {
  const { fill, size } = props;
  return (
    <Icon fill={fill} size={size}>
      <path d="m1.5726 1.8651-1.2768-1.7498a0.59874 0.82051 0 0 1 0.30538-0.11533h3.0057a0.59874 0.82051 0 0 1 0.30538 0.11533l-1.2768 1.7498a0.75263 1.0314 0 0 1-1.0628 0z" />
      <path d="m2.847 2.244 1.2768-1.7498a0.59393 0.81392 0 0 1 0.08416 0.41849v2.4714a0.60114 0.82381 0 0 1-0.60114 0.82381h-3.0057a0.60114 0.82381 0 0 1-0.60114-0.82381v-2.4714a0.59393 0.81392 0 0 1 0.08416-0.41849l1.2768 1.7498a1.0508 1.44 0 0 0 1.486 0z" />
    </Icon>
  );
};

export default EnvelopIcon;
