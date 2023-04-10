import React, { FC, useEffect, useState } from 'react';

import { IconBaseProps } from './types';

/**
 * The base Icon component
 */
const Icon: FC<IconBaseProps> = props => {
  const {
    children,
    className,
    color = '#000',
    height,
    margin,
    padding,
    size: sizeProp,
    viewBox = '0 0 4.208 4.208',
    width,
  } = props;
  const [size, setSize] = useState({
    height: height ?? '1rem',
    width: width ?? '1rem',
  });

  useEffect(() => {
    if (!height && !width) {
      switch (sizeProp) {
        case 'sm':
          setSize({ height: '1.5rem', width: '1.5rem' });
          break;
        case 'md':
          setSize({ height: '2rem', width: '2rem' });
          break;
        case 'lg':
          setSize({ height: '3rem', width: '3rem' });
          break;
        case 'xl':
          setSize({ height: '4rem', width: '4rem' });
          break;
        case 'xxl':
          setSize({ height: '5rem', width: '5rem' });
          break;
        case 'xxxl':
          setSize({ height: '6.5rem', width: '6.5rem' });
          break;
        default:
          setSize({ height: '1rem', width: '1rem' });
      }
    }
  }, [sizeProp]);

  return (
    <svg
      aria-hidden="true"
      className={`snui-icon${
        typeof className === 'string' ? ` ${className}` : ''
      }`}
      focusable="false"
      fill={color}
      style={{ margin, padding, ...size }}
      viewBox={viewBox}
    >
      {children}
    </svg>
  );
};

export default Icon;
