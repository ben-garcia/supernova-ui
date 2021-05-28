import React from 'react';

import { IconProps } from '../types';
import Icon from '../Icon';

/**
 * Chevron Up svg
 */
const ChevronUp: React.FC<IconProps> = props => {
  return (
    <Icon {...props}>
      <path d="M 2.104,0 0,3.4072871 0.49444,4.2080001 2.104,1.6071039 l 1.6095601,2.6008962 0.49444,-0.800713 z" />
    </Icon>
  );
};

export default ChevronUp;
