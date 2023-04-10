import React from 'react';

import { IconProps } from '../types';
import Icon from '../Icon';

/**
 * Add svg
 */
const AddIcon: React.FC<IconProps> = props => {
  return (
    <Icon {...props}>
      <path d="m0 2.104a0.263 0.263 0 0 0 0.263 0.263h1.5342a0.043833 0.043833 0 0 1 0.04383 0.04383v1.5342a0.263 0.263 0 0 0 0.526 0v-1.5342a0.043833 0.043833 0 0 1 0.04383-0.04383h1.5342a0.263 0.263 0 0 0 0-0.526h-1.5342a0.043833 0.043833 0 0 1-0.043833-0.043833v-1.5342a0.263 0.263 0 0 0-0.526 0v1.5342a0.043833 0.043833 0 0 1-0.043833 0.043833h-1.5342a0.263 0.263 0 0 0-0.263 0.263z" />
    </Icon>
  );
};

export default AddIcon;
