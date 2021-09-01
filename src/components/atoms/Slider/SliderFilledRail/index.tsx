import React from 'react';

import { useSlider, useTheme } from '../../../../hooks';
import { createClasses, isString } from '../../../../utils';
import './styles.scss';

export interface SliderFilledRailProps {
  className?: string;
}

const SliderFilledRail: React.FC<SliderFilledRailProps> = props => {
  const { className } = props;
  const theme = useTheme();
  const { orientation, value } = useSlider();
  const classes = createClasses('snui-slider__filled-rail', {
    [`${className}`]: isString(className),
  });

  return (
    <div
      className={classes}
      style={{
        background: theme.colors.info700,
        height: orientation === 'vertical' ? `${value}%` : undefined,
        width: orientation === 'horizontal' ? `${value}%` : undefined,
      }}
    />
  );
};

export default SliderFilledRail;
