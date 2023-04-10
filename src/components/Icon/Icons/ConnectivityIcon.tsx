import React from 'react';

import { IconProps } from '../types';
import Icon from '../Icon';

/**
 * Connectivity svg
 */
const ConnectivityIcon: React.FC<IconProps> = props => {
  return (
    <Icon {...props}>
      <path d="m0.263 2.2443a0.263 0.28053 0 0 1 0.263 0.28053v1.4027a0.263 0.28053 0 0 1-0.526 0v-1.4027a0.263 0.28053 0 0 1 0.263-0.28053zm1.2274-0.8416a0.263 0.28053 0 0 1 0.263 0.28053v2.2443a0.263 0.28053 0 0 1-0.526 0v-2.2443a0.263 0.28053 0 0 1 0.263-0.28053zm1.2274-0.56107a0.263 0.28053 0 0 1 0.263 0.28053v2.8053a0.263 0.28053 0 0 1-0.526 0v-2.8053a0.263 0.28053 0 0 1 0.263-0.28053zm1.2272-0.8416a0.263 0.28053 0 0 1 0.263 0.28053v3.6469a0.263 0.28053 0 0 1-0.526 0v-3.6469a0.263 0.28053 0 0 1 0.263-0.28053z" />
    </Icon>
  );
};

export default ConnectivityIcon;
