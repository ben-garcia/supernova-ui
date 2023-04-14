import React, { FC } from 'react';

import { useCSSAndPseudoClassProps, useSlider } from '@hooks';
import { valueToPercent } from '@utils';
import { SliderFilledRailProps } from './types';
import './styles.scss';

const SliderFilledRail: FC<SliderFilledRailProps> = props => {
  const { orientation, min, max, value } = useSlider();
  const addCSSClassesAndProps = useCSSAndPseudoClassProps(
    props,
    'snui snui-slider__filled-rail',
    {
      [`snui-slider__filled-rail--${orientation}`]: true,
    }
  );

  return (
    <div
      {...addCSSClassesAndProps()}
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
