import React from 'react';

import { Sizes } from 'types/common';
import { IconBaseProps } from './types';

import { isString, sizes } from '../../../utils';
import { useTheme } from '../../../hooks';

/**
 * The base Icon component
 */
const Icon: React.FC<IconBaseProps> = props => {
  const { children, fill = '', size = '', viewBox = '0 0 4.208 4.208' } = props;
  const theme = useTheme();
  const styles: React.CSSProperties = {};
  // check that size is a string
  if (isString(size)) {
    // check for a valid size
    if (sizes.includes(size)) {
      styles.height = theme.sizes[size as Sizes];
      styles.width = theme.sizes[size as Sizes];
    } else {
      // when size isn't found in the theme
      styles.height = size;
      styles.width = size;
    }
  }
  if (isString(fill)) {
    styles.fill = fill;
  }

  return (
    <svg style={styles} viewBox={viewBox}>
      {children}
    </svg>
  );
};

export default Icon;
