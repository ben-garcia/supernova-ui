import React from 'react';

import { IconProps } from '../types';
import Icon from '../Icon';

/**
 * Settings svg
 */
const SettingsIcon: React.FC<IconProps> = props => {
  const { fill, height, margin, padding, width } = props;
  return (
    <Icon
      fill={fill}
      height={height}
      margin={margin}
      padding={padding}
      width={width}
    >
      <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.03 10A2.973 2.973 0 0110 7.03 2.972 2.972 0 0112.968 10 2.972 2.972 0 0110 12.97 2.973 2.973 0 017.03 10m9.372-1.509a6.517 6.517 0 00-.81-1.947l.931-1.476a1.154 1.154 0 00-1.59-1.591l-1.477.931a6.488 6.488 0 00-1.947-.81L11.125 1.9a1.155 1.155 0 00-2.25 0L8.49 3.6c-.7.164-1.354.44-1.948.808l-1.475-.93a1.154 1.154 0 00-1.591 1.59l.93 1.476a6.565 6.565 0 00-.81 1.948L1.9 8.875a1.155 1.155 0 000 2.25l1.698.384c.166.7.442 1.354.81 1.948l-.93 1.475a1.154 1.154 0 001.59 1.591l1.476-.93a6.533 6.533 0 001.948.809l.384 1.699a1.155 1.155 0 002.25 0l.384-1.7a6.488 6.488 0 001.947-.81l1.476.932a1.152 1.152 0 001.591-1.59l-.931-1.477a6.517 6.517 0 00.81-1.947l1.699-.384a1.155 1.155 0 000-2.25l-1.7-.384z" />
      </svg>
    </Icon>
  );
};

export default SettingsIcon;
