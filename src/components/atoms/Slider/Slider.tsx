import React, { useMemo } from 'react';

import { SliderProvider } from '@contexts';
import { useUniqueId } from '@hooks';
import { createClasses, isString } from '@utils';

import { SliderProps } from './types';

import './styles.scss';

const Slider: React.FC<SliderProps> = props => {
  const {
    ariaDescribedBy,
    ariaLabel,
    ariaLabelledBy,
    ariaValueText,
    children,
    className,
    max = 100,
    min = 0,
    onChange,
    orientation = 'horizontal',
    size = 'md',
    step = 1,
    value,
  } = props;
  const sliderId = useUniqueId('snui-slider');
  const classes = createClasses('snui-slider', {
    [`${className}`]: isString(className),
    [`snui-slider--${size}`]: true,
    [`snui-slider--${orientation}`]: true,
  });
  const contextValue = useMemo(
    () => ({
      ariaDescribedBy,
      ariaLabel,
      ariaLabelledBy,
      ariaValueText,
      max,
      min,
      onChange,
      orientation,
      size,
      sliderId,
      step,
      value,
    }),
    [props]
  );

  return (
    <SliderProvider value={contextValue}>
      <div className={classes} id={sliderId}>
        {children}
      </div>
    </SliderProvider>
  );
};

export default Slider;
