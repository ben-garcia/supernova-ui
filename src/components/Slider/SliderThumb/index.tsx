import React, { FC, useCallback, useEffect, useRef } from 'react';

import { useCSSAndPseudoClassProps, useSlider } from '@hooks';
import { decreaseThumbFromValue, isString } from '@utils';
import { SliderThumbProps } from './types';
import './styles.scss';

const SliderThumb: FC<SliderThumbProps> = props => {
  const {
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
  } = useSlider();
  const thumbRef = useRef<HTMLDivElement | null>(null);
  const railRef = useRef<HTMLElement | null>(null);
  const addCSSClassesAndProps = useCSSAndPseudoClassProps(
    props,
    'snui snui-slider__thumb',
    {
      [`snui-slider__thumb--${size}`]: isString(size),
      [`snui-slider__thumb--${orientation}`]: isString(orientation),
    }
  );

  useEffect(() => {
    railRef.current = document.getElementById(sliderId);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (thumbRef?.current) {
        const { bottom, height, left, width } =
          railRef.current!.getBoundingClientRect();

        if (step === 1) {
          const { pageX, pageY } = e;
          const diffX = pageX - left;
          const diffY = bottom - pageY;
          let newValue;

          if (orientation === 'vertical') {
            newValue = Math.round(((max - min) * diffY) / height);
            // keep values between min and max
            if (newValue > max) {
              newValue = max;
            } else if (newValue < min) {
              newValue = min;
            }
          } else {
            newValue = Math.round(((max - min) * diffX) / width);
            // keep values between min and max
            if (newValue > max) {
              newValue = max;
            } else if (newValue < min) {
              newValue = min;
            }
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
    [max, min, orientation, step]
  );
  const handleMouseUp = useCallback(() => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  }, [max, min, orientation, step]);
  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      // cancel if right mouse button was clicked.
      if (e.button === 2) {
        return;
      }
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    [max, min, orientation, step]
  );
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const { key } = e;

      if (key === 'ArrowRight' || key === 'ArrowUp') {
        if (value + step > max) {
          onChange(max);
        } else {
          onChange(value + step);
        }
      } else if (key === 'ArrowLeft' || key === 'ArrowDown') {
        if (value - step < min) {
          onChange(min);
        } else {
          onChange(value - step);
        }
      } else if (key === 'End') {
        if (value !== max) {
          onChange(max);
        }
      } else if (key === 'Home') {
        if (value !== min) {
          onChange(min);
        }
      } else if (key === 'PageDown') {
        if (value - 10 < min) {
          onChange(min);
        } else {
          onChange(value - 10);
        }
      } else if (key === 'PageUp') {
        if (value + 10 > max) {
          onChange(max);
        } else {
          onChange(value + 10);
        }
      }
    },
    [props]
  );

  return (
    <div
      {...addCSSClassesAndProps()}
      aria-describedby={ariaDescribedBy}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-orientation={orientation}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-valuetext={ariaValueText}
      id={`${sliderId}__thumb`}
      onKeyDown={handleKeyDown}
      onMouseDown={handleMouseDown}
      ref={thumbRef}
      role="slider"
      style={{
        bottom:
          orientation === 'vertical'
            ? `${decreaseThumbFromValue(
                value,
                min,
                max,
                thumbRef.current,
                orientation
              )}`
            : '15%',
        left:
          orientation === 'horizontal'
            ? `${decreaseThumbFromValue(
                value,
                min,
                max,
                thumbRef.current,
                orientation
              )}`
            : '15%',
        top: orientation === 'horizontal' ? '2%' : undefined,
      }}
      tabIndex={0}
    />
  );
};

export default SliderThumb;
