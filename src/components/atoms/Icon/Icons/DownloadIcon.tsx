import React from 'react';

import { IconProps } from '../types';
import Icon from '../Icon';

/**
 * Download svg
 */
const DownloadIcon: React.FC<IconProps> = props => {
  const { fill, size } = props;
  return (
    <Icon fill={fill} size={size}>
      <path d="m3.6069 1.7734-0.4208-0.4208-0.78149 0.80328v-2.1558h-0.60114v2.1558l-0.78149-0.80328-0.4208 0.4208 1.5029 1.5329zm-3.6069 1.8335v0.60115h4.208v-0.60115z" />
    </Icon>
  );
};

export default DownloadIcon;
