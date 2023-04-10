import React from 'react';

import { IconProps } from '../types';
import Icon from '../Icon';

/**
 * Triangle down svg
 */
const TriangleDownIcon: React.FC<IconProps> = props => {
  return (
    <Icon {...props}>
      <path d="m3.9975 0h-3.7872c-0.079741 0-0.15254 0.064322-0.18831 0.16622-0.035347 0.10189-0.027773 0.22363 0.019988 0.3147l1.8936 3.6069c0.039555 0.075744 0.10204 0.12023 0.16832 0.12023 0.066276 0 0.12855-0.044485 0.16832-0.12023l1.8936-3.6069c0.047971-0.091073 0.055545-0.2128 0.019988-0.3147-0.035768-0.10189-0.10857-0.16622-0.18831-0.16622z" />
    </Icon>
  );
};

export default TriangleDownIcon;
