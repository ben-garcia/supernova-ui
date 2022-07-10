import React, { useCallback, useRef, useState } from 'react';

import { useSlider, useTheme } from '@hooks/index';
import { createClasses, isString } from '@utils/index';

import './styles.scss';

export interface SliderThumbProps {
  className?: string;
}

const SliderThumb: React.FC<SliderThumbProps> = props => {
  const { className } = props;
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
  const theme = useTheme();
  const [focusRing, setFocusRing] = useState(
    `0 0 0 2px ${theme.colors.gray300}`
  );
  const sliderThumbRef = useRef<HTMLDivElement | null>(null);
  const classes = createClasses('snui-slider__thumb', {
    [`${className}`]: isString(className),
    [`snui-slider__thumb--${size}`]: true,
    [`snui-slider__thumb--${orientation}`]: true,
  });

  const handleMouseMove = (e: MouseEvent) => {
    if (sliderThumbRef?.current) {
      const rail = document.getElementById(sliderId) as any;
      const { bottom, height, left, width } = rail.getBoundingClientRect();

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
  };
  const handleMouseUp = useCallback(() => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  }, [orientation]);
  const handleMouseDown = useCallback(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [orientation]);
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
      aria-describedby={ariaDescribedBy}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-orientation={orientation}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-valuetext={ariaValueText}
      className={classes}
      onBlur={() => setFocusRing(`0 0 0 2px ${theme.colors.gray300}`)}
      onFocus={() => setFocusRing(`0 0 0 4px ${theme.colors.focusRing}`)}
      onKeyDown={handleKeyDown}
      onMouseDown={handleMouseDown}
      ref={sliderThumbRef}
      role="slider"
      style={{
        boxShadow: focusRing,
        bottom: orientation === 'vertical' ? `${value}%` : '15%',
        left: orientation === 'horizontal' ? `${value}%` : '15%',
        top: orientation === 'horizontal' ? '2%' : undefined,
      }}
      tabIndex={0}
    />
  );
};

export default SliderThumb;
