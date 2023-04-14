import React, { useMemo } from 'react';

import { SliderProvider } from '@contexts';
import { useCSSAndPseudoClassProps, useUniqueId } from '@hooks';
import { SliderProps } from './types';
import './styles.scss';

const Slider: React.FC<SliderProps> = props => {
  const {
    ariaDescribedBy,
    ariaLabel,
    ariaLabelledBy,
    ariaValueText,
    children,
    max = 100,
    min = 0,
    onChange,
    orientation = 'horizontal',
    size = 'md',
    step = 1,
    value,
    ...rest
  } = props;
  const sliderId = useUniqueId('snui-slider');
  const addCSSClassesAndProps = useCSSAndPseudoClassProps(
    rest,
    'snui snui-slider',
    {
      [`snui-slider--${size}`]: true,
      [`snui-slider--${orientation}`]: true,
    }
  );
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
      <div {...addCSSClassesAndProps()} id={sliderId}>
        {children}
      </div>
    </SliderProvider>
  );
};

export default Slider;
