import React, { FC } from 'react';

import {
  useClassStyles,
  useCreateClassString,
  usePseudoClasses,
  useSlider,
  useValidateProps,
} from '@hooks';
import { isString } from '@utils';

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
  const { orientation, value } = useSlider();
  const addClasses = useCreateClassString('snui snui-slider__filled-rail', {
    [`${className}`]: isString(className),
    [`${pseudoClassName}`]: isString(pseudoClassName),
    [`${stylesClassName}`]: isString(stylesClassName),
  });

  return (
    <div
      {...remainingProps}
      {...addClasses()}
      style={{
        height: orientation === 'vertical' ? `${value}%` : undefined,
        width: orientation === 'horizontal' ? `${value}%` : undefined,
      }}
    />
  );
};

export default SliderFilledRail;
