import React, { FC, useRef } from 'react';

import { useCSSAndPseudoClassProps, useSlider } from '@hooks';
import { SliderRailProps } from './types';
import './styles.scss';

const SliderRail: FC<SliderRailProps> = props => {
  const { children, ...rest } = props;
  const { max, min, onChange, orientation, sliderId, size, step } = useSlider();
  const addCSSClassesAndProps = useCSSAndPseudoClassProps(
    rest,
    'snui snui-slider__rail',
    {
      [`snui-slider__rail--${size}`]: true,
      [`snui-slider__rail--${orientation}`]: true,
    }
  );
  const sliderRailRef = useRef<HTMLDivElement | null>(null);

  const handleClick = React.useCallback(
    (e: React.MouseEvent) => {
      if (sliderRailRef?.current) {
        const { bottom, height, left, width } =
          sliderRailRef.current.getBoundingClientRect();

        if (step === 1) {
          const { pageX, pageY } = e;
          const diffX = pageX - left;
          const diffY = bottom - pageY;
          let newValue;

          if (orientation === 'vertical') {
            newValue = Math.round(((max - min) * diffY) / height);
          } else {
            newValue = Math.round(((max - min) * diffX) / width);
          }

          onChange(newValue);
        } else {
          const maxStep = Math.floor(max / step);
          const heightStep = Math.floor(max / maxStep);
          const arr: number[] = [];

          for (let i = 0; i < maxStep; i += 1) {
            if (i === 0) {
              arr.push(heightStep);
            } else {
              arr.push(arr[i - 1] + heightStep);
            }
          }

          const { pageX, pageY } = e;
          const diffX = pageX - left;
          const diffY = bottom - pageY;
          const halfDiff = (arr[1] - arr[0]) / 2;
          let newValue;

          if (orientation === 'vertical') {
            newValue = Math.round(((max - min) * diffY) / height);
          } else {
            newValue = Math.round(((max - min) * diffX) / width);
          }

          for (let i = 0; i < arr.length; i += 1) {
            if (i === 0) {
              if (newValue > arr[0] - halfDiff && newValue < arr[1]) {
                onChange(arr[0]);
                break;
              } else if (newValue < arr[0] - halfDiff) {
                onChange(0);
                break;
              }
            } else if (i === arr.length - 1) {
              if (newValue > arr[arr.length - 1] - halfDiff) {
                onChange(arr[arr.length - 1]);
                break;
              } else if (
                newValue < arr[arr.length - 1] - halfDiff &&
                newValue > arr[arr.length - 2]
              ) {
                onChange(arr[arr.length - 2]);
                break;
              }
            } else if (
              i !== 0 &&
              i !== arr.length - 1 &&
              newValue > arr[i] - halfDiff &&
              newValue < arr[i + 1]
            ) {
              onChange(arr[i]);
            } else if (
              i !== 0 &&
              i !== arr.length - 1 &&
              newValue < arr[i] - halfDiff &&
              newValue > arr[i - 1]
            ) {
              onChange(arr[i - 1]);
            }
          }
        }
      }
    },
    [orientation]
  );

  return (
    // eslint-disable-next-line
    <div
      {...addCSSClassesAndProps()}
      id={`${sliderId}__rail`}
      onClick={handleClick}
      ref={sliderRailRef}
    >
      {children}
    </div>
  );
};

export default SliderRail;
