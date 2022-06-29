import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

import { Button, CloseIcon } from '../../atoms';
import FocusLock from '../../atoms/FocusLock';
import Overlay from '../../atoms/Overlay';
import { ModalProps } from './types';
import './styles.scss';

import {
  colors,
  createClasses,
  createStyles,
  isString,
  shadows,
  sizes,
} from '../../../utils';

import { MarginPaddingProps } from '../../../types';
import { useBreakpoint, useTheme } from '../../../hooks';
import { useModalProvider } from '../../../hooks/use-modal';
import { ModalProvider } from '../../../contexts';

/**
 * The container for all Modal related components
 * that provides context to its children.
 */
const Modal: React.FC<ModalProps> = props => {
  const {
    backgroundColor = '',
    boxShadow = 'md',
    children,
    className,
    color = '',
    closeOnEsc = true,
    closeOnOverlayClick = true,
    finalFocusRef,
    font = 'body',
    fontSize = '',
    fontWeight = '',
    height = '',
    initialFocusRef,
    isOpen = false,
    letterSpacing = '',
    lineHeight = '',
    margin = '',
    onClose,
    padding = '',
    size = 'md',
    textTransform = '',
    trapFocus = true,
    width = '',
    ...rest
  } = props;
  const [mounted, setMounted] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const enterExitMode = useCallback(() => setIsExiting(true), []);
  const leaveExitMode = useCallback(() => setIsExiting(false), []);
  const handleOnClose = useCallback(() => {
    // trigger the scale out animation
    setIsExiting(true);
    // allow time for the animation
    setTimeout(() => {
      setIsExiting(false);
      onClose();
    }, 300);
  }, []);
  const context = useModalProvider(props);
  const contextValue = useMemo(
    () => ({
      ...context,
      enterExitMode,
      onClose: handleOnClose,
      leaveExitMode,
    }),
    [context]
  );
  const previousActiveElement = useRef<Element | null>(null);

  // get a reference to the focused element that triggerd the Modal
  useEffect(() => {
    previousActiveElement.current = document.activeElement;

    return () => {
      if (!finalFocusRef?.current) {
        // when Modal is closed, the focus should return to the element
        // that triggered it as per the WAI-ARIA best practices guide
        (previousActiveElement!.current! as HTMLElement).focus();
      } else {
        finalFocusRef.current.focus();
      }
    };
  }, [isOpen]);

  useEffect(() => {
    let div: HTMLDivElement;
    if (isOpen) {
      div = document.createElement('div');
      div.id = context.id;
      document.body.appendChild(div);
      setMounted(true);
    }

    return () => {
      if (div) {
        setMounted(false);
        document.body.removeChild(div);
      }
    };
  }, [isOpen]);

  const theme = useTheme();
  const breakpoint = useBreakpoint();
  const classes = createClasses('snui-modal', {
    [`${className}`]: isString(className),
    'snui-modal--exiting': isExiting,
    [`snui-color-${backgroundColor}`]:
      backgroundColor &&
      backgroundColor !== '' &&
      colors.includes(backgroundColor),
    [`snui-box-shadow-${boxShadow}`]:
      isString(boxShadow) && shadows.includes(boxShadow),
    [`snui-color-$color}`]: isString(color) && colors.includes(color),
    [`snui-font-${font}`]:
      (font && font === 'heading') || font === 'body' || font === 'mono',
    [`snui-text-${fontSize}`]:
      isString(fontSize) && sizes.includes(fontSize as string),
    [`snui-font-weight-${fontWeight}`]:
      isString(fontWeight) && sizes.includes(fontWeight),
    [`snui-height-${height}`]:
      isString(height) && sizes.includes(height as string),
    [`snui-letter-spacing-${letterSpacing}`]:
      isString(letterSpacing) && sizes.includes(letterSpacing),
    [`snui-line-height-${lineHeight}`]:
      lineHeight !== '' && sizes.includes(lineHeight),
    // margin
    [`snui-margin-${margin}`]:
      typeof margin === 'string' && margin !== '' && sizes.includes(margin),
    [`snui-margin-bottom-${(margin as MarginPaddingProps).bottom}`]:
      typeof margin === 'object' &&
      margin.bottom &&
      typeof margin.bottom === 'string' &&
      sizes.includes((margin as MarginPaddingProps).bottom as string),
    [`snui-margin-left-${(margin as MarginPaddingProps).left}`]:
      typeof margin === 'object' &&
      margin.left &&
      typeof margin.left === 'string' &&
      sizes.includes((margin as MarginPaddingProps).left as string),
    [`snui-margin-right-${(margin as MarginPaddingProps).right}`]:
      typeof margin === 'object' &&
      margin.right &&
      typeof margin.right === 'string' &&
      sizes.includes((margin as MarginPaddingProps).right as string),
    [`snui-margin-top-${(margin as MarginPaddingProps).top}`]:
      typeof margin === 'object' &&
      margin.top &&
      typeof margin.top === 'string' &&
      sizes.includes((margin as MarginPaddingProps).top as string),
    [`snui-margin-x-${(margin as MarginPaddingProps).x}`]:
      // make sure that left and right properties have not been defined
      !(margin as MarginPaddingProps).left &&
      !(margin as MarginPaddingProps).right &&
      typeof margin === 'object' &&
      margin.x &&
      typeof margin.y === 'string' &&
      sizes.includes((margin as MarginPaddingProps).x as string),
    [`snui-margin-y-${(margin as MarginPaddingProps).y}`]:
      // make sure that top and bottom properties have not been defined
      !(margin as MarginPaddingProps).bottom &&
      !(margin as MarginPaddingProps).top &&
      typeof margin === 'object' &&
      margin.y &&
      typeof margin.y === 'string' &&
      sizes.includes((margin as MarginPaddingProps).y as string),
    // padding
    [`snui-padding-${padding}`]:
      typeof padding === 'string' && padding !== '' && sizes.includes(padding),
    [`snui-padding-bottom-${(padding as MarginPaddingProps).bottom}`]:
      typeof padding === 'object' &&
      padding.bottom &&
      typeof padding.bottom === 'string' &&
      sizes.includes((padding as MarginPaddingProps).bottom as string),
    [`snui-padding-left-${(padding as any).left}`]:
      typeof padding === 'object' &&
      padding.left &&
      sizes.includes((padding as MarginPaddingProps).left as string),
    [`snui-padding-right-${(padding as MarginPaddingProps).right}`]:
      typeof padding === 'object' &&
      padding.right &&
      typeof padding.right === 'string' &&
      sizes.includes((padding as MarginPaddingProps).right as string),
    [`snui-padding-top-${(padding as any).top}`]:
      typeof padding === 'object' &&
      padding.top &&
      typeof padding.top === 'string' &&
      sizes.includes((padding as MarginPaddingProps).top as string),
    [`snui-padding-x-${(padding as MarginPaddingProps).x}`]:
      !(padding as MarginPaddingProps).left &&
      !(padding as MarginPaddingProps).right &&
      typeof padding === 'object' &&
      padding.x &&
      typeof padding.x === 'string' &&
      sizes.includes((padding as MarginPaddingProps).x as string),
    [`snui-padding-y-${(padding as MarginPaddingProps).y}`]:
      !(padding as MarginPaddingProps).bottom &&
      !(padding as MarginPaddingProps).top &&
      typeof padding === 'object' &&
      padding.y &&
      typeof padding.y === 'string' &&
      sizes.includes((padding as MarginPaddingProps).y as string),
    [`snui-text-${textTransform}`]:
      textTransform === 'capitalize' ||
      textTransform === 'lowercase' ||
      textTransform === 'uppercase',
    [`snui-width-${width}`]: isString(width) && sizes.includes(width as string),
  });
  const styles = createStyles(
    {
      backgroundColor,
      boxShadow,
      color,
      font,
      fontWeight,
      height,
      letterSpacing,
      lineHeight,
      margin,
      padding,
      textTransform,
      width,
    },
    theme,
    breakpoint
  );

  if (isString(size) && sizes.includes(size as string)) {
    if (size === 'xs') {
      styles.width = `calc(${theme.sizes.xs} * 20)`;
    } else if (size === 'sm') {
      styles.width = `calc(${theme.sizes.sm} * 16)`;
    } else if (size === 'md') {
      styles.width = `calc(${theme.sizes.md} * 14)`;
    } else if (size === 'lg') {
      styles.width = `calc(${theme.sizes.lg} * 13)`;
    } else if (size === 'xl') {
      styles.width = `calc(${theme.sizes.xl} * 12)`;
    } else if (size === 'xxl') {
      styles.width = '100vw';
    }
  }

  // storing jsx in a variable to make eslint happy
  const jsx = (
    <ModalProvider value={contextValue}>
      <FocusLock
        closeOnEsc={closeOnEsc}
        closeOnOverlayClick={closeOnOverlayClick}
        initialFocusRef={initialFocusRef}
        onClose={onClose}
        trapFocus={trapFocus}
      >
        <Overlay>
          <section
            {...rest}
            aria-labelledby={`${context.id}__header`}
            aria-describedby={`${context.id}__body`}
            aria-modal="true"
            className={classes}
            role="dialog"
            style={styles}
          >
            <Button
              aria-label="Close the modal"
              className="snui-modal__close-button"
              hoverBackgroundColor="rgba(0, 0, 0, 0.04)"
              onClick={handleOnClose}
              variant="outline"
            >
              <CloseIcon fill="#000" size="1rem" />
            </Button>
            {children}
          </section>
        </Overlay>
      </FocusLock>
    </ModalProvider>
  );

  return isOpen && mounted
    ? createPortal(jsx, document.getElementById(context.id) as Element)
    : null;
};

export default Modal;
