import React, { useMemo } from 'react';

import { SliderProvider } from '../../../contexts/slider';
import { createClasses, isString } from '../../../utils';
import { useUniqueId } from '../../../hooks';
import './styles.scss';

export interface SliderProps {
  ariaLabel?: string;
  ariaDescribedBy?: string;
  ariaLabelledBy?: string;
  ariaValueText?: string;
  children: React.ReactNode;
  className?: string;
  max?: number;
  min?: number;
  onChange: (newValue: number) => void;
  orientation?: 'horizontal' | 'vertical';
  size?: 'sm' | 'md' | 'lg';
  step?: number;
  value: number;
}

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
      // eslint-disable-next-line no-unneeded-ternary
      value: value ? value : min ?? 0,
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
