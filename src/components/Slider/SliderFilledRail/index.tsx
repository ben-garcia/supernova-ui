import React, { FC } from 'react';

import { useCSSAndPseudoClassProps } from '@hooks/use-css-and-pseudo-class-props';
import { useSlider } from '@hooks/use-slider';
import { valueToPercent } from '@utils/conversions';
import type { SliderFilledRailProps } from './types';
import './styles.scss';

/**
 * Component that represents the active or completed portion of the slider
 * track.
 */
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
