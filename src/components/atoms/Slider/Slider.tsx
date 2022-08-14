import React, { useMemo } from 'react';

import { SliderProvider } from '@contexts';
import {
  useClassStyles,
  useCreateClassString,
  usePseudoClasses,
  useUniqueId,
  useValidateProps,
} from '@hooks';
import { isString } from '@utils';

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
    ...rest
  } = props;
  const {
    remainingProps,
    validatedCSSProps,
    validatedPseudoClassProps,
  } = useValidateProps(rest);
  const pseudoClassName = usePseudoClasses(validatedPseudoClassProps);
  const stylesClassName = useClassStyles(validatedCSSProps);
  const sliderId = useUniqueId('snui-slider');
  const addClasses = useCreateClassString('snui snui-slider', {
    [`${className}`]: isString(className),
    [`snui-slider--${size}`]: true,
    [`snui-slider--${orientation}`]: true,
    [`${pseudoClassName}`]: isString(pseudoClassName),
    [`${stylesClassName}`]: isString(stylesClassName),
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
      <div {...remainingProps} {...addClasses()} id={sliderId}>
        {children}
      </div>
    </SliderProvider>
  );
};

export default Slider;
