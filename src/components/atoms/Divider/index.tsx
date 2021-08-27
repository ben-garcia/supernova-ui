import React, { CSSProperties, useMemo } from 'react';

import { useTheme } from '../../../hooks';
import { createClasses, isString } from '../../../utils';
import './styles.scss';

export interface DividerProps {
  color?: string;
  className?: string;
  margin?: string;
  /**
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';
}

/**
 * A line that helps seperator related content.
 */
const Divider: React.FC<DividerProps> = props => {
  const { color, className, margin, orientation = 'horizontal' } = props;
  const theme = useTheme();
  const styles: CSSProperties = useMemo(
    () => ({
      borderColor: color,
      margin,
    }),
    [color, margin]
  );
  const classes = createClasses('snui-divider', {
    [`${className}`]: isString(className),
    'snui-divider--horizontal': orientation === 'horizontal',
    'snui-divider--vertical': orientation === 'vertical',
  });

  if (isString(color)) {
    if ((theme as any).colors[color as any]) {
      styles.borderColor = (theme as any).colors[color as any];
    } else {
      styles.borderColor = color;
    }
  } else {
    styles.borderColor = theme.colors.gray300;
  }

  return <hr className={classes} style={styles} />;
};

export default Divider;
