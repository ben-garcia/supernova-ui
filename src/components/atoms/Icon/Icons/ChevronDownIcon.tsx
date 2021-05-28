import React from 'react';

import { IconProps } from '../types';
import Icon from '../Icon';

/**
 * Chevron Down svg
 */
const ChevronDown: React.FC<IconProps> = props => {
  return (
    <Icon {...props}>
      <path d="M 3.71356,0 2.104,2.600896 0.49444,0 0,0.8007126 2.104,4.208 4.208,0.8007126 Z" />
    </Icon>
  );
};

export default ChevronDown;
