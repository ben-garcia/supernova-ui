import React from 'react';

import { Spinner } from '@components';
import { useCSSAndPseudoClassProps, useInlineStyles } from '@hooks';
import { getChildrenCount, forwardRef, isObject, isString } from '@utils';
import { ButtonProps } from './types';
import './styles.scss';

/**
 * UI interactive component used to trigger an action
 */
const Button = forwardRef<ButtonProps, HTMLButtonElement>((props, ref) => {
  const {
    children,
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
  const addInlineStyles = useInlineStyles(colorVariant);
  const addCSSClasses = useCSSAndPseudoClassProps(rest, 'snui snui-button', {
    [`snui-button--${variant}`]: isString(variant) && !props.backgroundColor,
    [`snui-button--${size}`]: isString(size) && !props.height && !props.width,
  });

  return (
    <button
      {...addCSSClasses()}
      {...addInlineStyles()}
      aria-disabled={isDisabled === true || isLoading === true || undefined}
      disabled={isDisabled || isLoading}
      ref={ref}
      type="button"
    >
      {leftIcon && isString(children) && (
        <span
          style={{
            display: isLoading && loadingText ? 'none' : undefined,
            visibility: isLoading ? 'hidden' : 'visible',
          }}
        >
          {leftIcon}
        </span>
      )}

      {(leftIcon || rightIcon) && isString(children) && (
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
      {!isObject(leftIcon) && !isObject(rightIcon) && isString(children) && (
        <span
          style={{
            display: isLoading && loadingText ? 'none' : undefined,
            visibility: isLoading ? 'hidden' : 'visible',
          }}
        >
          {children}
        </span>
      )}

      {/* when children is not a single component. */}
      {/* NOTE: this means the content is always visible */}
      {/*       even when in loading state. */}
      {!isObject(leftIcon) &&
        !isObject(rightIcon) &&
        // eslint-disable-next-line react/jsx-no-useless-fragment
        getChildrenCount(children) > 1 && <>{children}</>}

      {/* when rendering with icon as React component */}
      {!isObject(leftIcon) &&
        !isObject(rightIcon) &&
        !isString(children) &&
        getChildrenCount(children) === 1 && (
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

      {rightIcon && isString(children) && (
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
