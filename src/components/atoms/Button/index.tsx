import React from 'react';

import { Spinner } from '@atoms';
import {
  useClassStyles,
  useCreateClassString,
  useInlineStyles,
  usePseudoClasses,
  useValidateProps,
} from '@hooks';
import { forwardRef, isObject, isString } from '@utils';

import { ButtonProps } from './types';
import './styles.scss';

/**
 * UI interactive component used to trigger an action
 */
const Button = forwardRef<ButtonProps, HTMLButtonElement>((props, ref) => {
  const {
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
  const addClasses = useCreateClassString('snui snui-button', {
    [`snui-button--${variant}`]: isString(variant) && !props.backgroundColor,
    [`snui-button--${size}`]: isString(size) && !props.height && !props.width,
    [`${className}`]: isString(className),
    [`${pseudoClassName}`]: isString(pseudoClassName),
    [`${stylesClassName}`]: isString(stylesClassName),
  });

  /* eslint react/button-has-type: 0 */
  return (
    <button
      {...remainingProps}
      {...createInlineStyles()}
      {...addClasses()}
      aria-disabled={isDisabled === true || isLoading === true || undefined}
      disabled={isDisabled || isLoading}
      ref={ref}
    >
      {leftIcon && (
        <span
          style={{
            display: isLoading && loadingText ? 'none' : undefined,
            visibility: isLoading ? 'hidden' : 'visible',
          }}
        >
          {leftIcon}
        </span>
      )}

      {(leftIcon || rightIcon) && (
        <span
          style={{
            display: isLoading && loadingText ? 'none' : undefined,
            margin: leftIcon || rightIcon ? '0.2rem 0.5rem 0 0.5rem' : '',
            visibility: isLoading ? 'hidden' : 'visible',
          }}
        >
          {children}
        </span>
      )}

      {/* when rendering with icon */}
      {!isObject(leftIcon) && !isObject(rightIcon) && (
        <span
          style={{
            display: isLoading && loadingText ? 'none' : undefined,
            visibility: isLoading ? 'hidden' : 'visible',
          }}
        >
          {children}
        </span>
      )}

      {/* use default spinner */}
      {!spinner && isLoading && (
        <Spinner
          className={loadingText ? '' : 'snui-position-absolute'}
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
            position: loadingText ? undefined : 'absolute',
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

      {rightIcon && (
        <span
          style={{
            display: isLoading && loadingText ? 'none' : 'inline',
            visibility: isLoading ? 'hidden' : 'visible',
          }}
        >
          {rightIcon}
        </span>
      )}
    </button>
  );
});

export default Button;
