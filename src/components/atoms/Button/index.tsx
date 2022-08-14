import React, { forwardRef } from 'react';

import { Spinner } from '@atoms';
import {
  useClassStyles,
  useCreateClassString,
  useInlineStyles,
  usePseudoClasses,
  useValidateProps,
} from '@hooks';
import { isObject, isString } from '@utils';

import { ButtonProps } from './types';
import './styles.scss';

/**
 * UI interactive component used to trigger an action
 */
const Button = forwardRef((props: ButtonProps, ref: any) => {
  const {
    asSubmitButton = false,
    children,
    className,
    colorVariant,
    isDisabled = false,
    isLoading = false,
    leftIcon,
    loadingText,
    rightIcon,
    size = 'md',
    spinner,
    variant = 'filled',
    ...rest
  } = props;
  const {
    remainingProps,
    validatedCSSProps,
    validatedPseudoClassProps,
  } = useValidateProps(rest);
  const pseudoClassName = usePseudoClasses(validatedPseudoClassProps);
  const stylesClassName = useClassStyles(validatedCSSProps);
  const createInlineStyles = useInlineStyles(colorVariant);
  const addClasses = useCreateClassString(
    'snui snui-button snui-flex snui-items-center',
    {
      [`snui-button--${variant}`]: isString(variant) && !props.backgroundColor,
      [`snui-button--${size}`]: isString(size) && !props.height && !props.width,
      [`${className}`]: isString(className),
      [`${pseudoClassName}`]: isString(pseudoClassName),
      [`${stylesClassName}`]: isString(stylesClassName),
    }
  );

  return (
    <button
      {...remainingProps}
      {...createInlineStyles()}
      {...addClasses()}
      aria-disabled={isDisabled || isLoading}
      disabled={isDisabled || isLoading}
      ref={ref}
      type={asSubmitButton ? 'submit' : 'button'}
    >
      {leftIcon && !isLoading && <>{leftIcon}</>}

      {!isLoading && (leftIcon || rightIcon) && (
        <span
          style={{
            margin: leftIcon || rightIcon ? '0.2rem 0.5rem 0 0.5rem' : '',
          }}
        >
          {children}
        </span>
      )}

      {/* when rendering with icon */}
      {!isLoading && !isObject(leftIcon) && !isObject(rightIcon) && (
        <>{children}</>
      )}

      {/* use default spinner */}
      {!spinner && isLoading && (
        <Spinner
          primaryColor={variant === 'filled' ? 'white' : 'black'}
          size={size === 'sm' ? 'xs' : 'sm'}
        />
      )}

      {/* treat 'spinner' prop as the spinner */}
      {spinner && isLoading && (
        <div
          style={{
            // animation: 'snui-rotate 1s inifinte linear',
            animationDuration: '1s',
            animationIterationCount: 'infinite',
            animationName: 'snui-rotate',
            animationTimingFunction: 'linear',
            height: size === 'sm' ? '0.8rem' : '1rem',
          }}
        >
          {spinner}
        </div>
      )}

      {isLoading && isString(loadingText) && (
        <span className="snui-self-center snui-margin-left-sm">
          {loadingText}
        </span>
      )}

      {rightIcon && !isLoading && <>{rightIcon}</>}
    </button>
  );
});

export default Button;
