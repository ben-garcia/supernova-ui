import React, { FC } from 'react';

import {
  useClassStyles,
  useCreateClassString,
  usePseudoClasses,
  useSlider,
  useValidateProps,
} from '@hooks';
import { isString, valueToPercent } from '@utils';

import { SliderFilledRailProps } from './types';
import './styles.scss';

const SliderFilledRail: FC<SliderFilledRailProps> = props => {
  const { className, ...rest } = props;
  const {
    remainingProps,
    validatedCSSProps,
    validatedPseudoClassProps,
  } = useValidateProps(rest);
  const pseudoClassName = usePseudoClasses(validatedPseudoClassProps);
  const stylesClassName = useClassStyles(validatedCSSProps);
  const { orientation, min, max, value } = useSlider();
  const addClasses = useCreateClassString('snui snui-slider__filled-rail', {
    [`${className}`]: isString(className),
    [`snui-slider__filled-rail--${orientation}`]: true,
    [`${pseudoClassName}`]: isString(pseudoClassName),
    [`${stylesClassName}`]: isString(stylesClassName),
  });

  return (
    <div
      {...remainingProps}
      {...addClasses()}
      style={{
        height:
          orientation === 'vertical'
            ? `${valueToPercent(value, min, max)}%`
            : undefined,
        width:
          orientation === 'horizontal'
            ? `${valueToPercent(value, min, max)}%`
            : undefined,
      }}
    />
  );
};

export default SliderFilledRail;
