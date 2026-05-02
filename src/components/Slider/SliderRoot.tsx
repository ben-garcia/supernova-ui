import React, { FC, PropsWithChildren, useMemo } from 'react';

import { SliderProvider } from '@contexts/slider/SliderProvider';
import { useCSSAndPseudoClassProps } from '@hooks/use-css-and-pseudo-class-props';
import { useUniqueId } from '@hooks/use-unique-id';
import type { SliderRootProps } from './types';
import './styles.scss';

/**
 * The container for all Slider related components
 * that provides context to its children.
 */
const SliderRoot: FC<PropsWithChildren<SliderRootProps>> = props => {
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

export default SliderRoot;
