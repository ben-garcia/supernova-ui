import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import Button from '../../atoms/Button';
import FocusLock from '../../atoms/FocusLock';
import { CloseIcon } from '../../atoms/Icon/Icons';
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

/**
 *  A window overlaid on either the primary window or another dialog window.
 *
 *  used to direct the attention of the user.
 */
const Modal: React.FC<ModalProps> = props => {
  const {
    backgroundColor = '',
    body,
    boxShadow = 'md',
    color = '',
    closeOnEsc = true,
    closeOnOverlayClick = true,
    finalFocusRef,
    font = 'body',
    fontSize = '',
    fontWeight = '',
    footer,
    header,
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
  const [modalId] = useState(`_snui-modal-${Math.random()}`);
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
      div.id = modalId;
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
  const classes = createClasses('_snui-modal', {
    [`_snui-color-${backgroundColor}`]:
      backgroundColor &&
      backgroundColor !== '' &&
      colors.includes(backgroundColor),
    [`_snui-box-shadow-${boxShadow}`]:
      isString(boxShadow) && shadows.includes(boxShadow),
    [`_snui-color-$color}`]: isString(color) && colors.includes(color),
    [`_snui-font-${font}`]:
      (font && font === 'heading') || font === 'body' || font === 'mono',
    [`_snui-text-${fontSize}`]:
      isString(fontSize) && sizes.includes(fontSize as string),
    [`_snui-font-weight-${fontWeight}`]:
      isString(fontWeight) && sizes.includes(fontWeight),
    [`_snui-height-${height}`]:
      isString(height) && sizes.includes(height as string),
    [`_snui-letter-spacing-${letterSpacing}`]:
      isString(letterSpacing) && sizes.includes(letterSpacing),
    [`_snui-line-height-${lineHeight}`]:
      lineHeight !== '' && sizes.includes(lineHeight),
    // margin
    [`_snui-margin-${margin}`]:
      typeof margin === 'string' && margin !== '' && sizes.includes(margin),
    [`_snui-margin-bottom-${(margin as MarginPaddingProps).bottom}`]:
      typeof margin === 'object' &&
      margin.bottom &&
      typeof margin.bottom === 'string' &&
      sizes.includes((margin as MarginPaddingProps).bottom as string),
    [`_snui-margin-left-${(margin as MarginPaddingProps).left}`]:
      typeof margin === 'object' &&
      margin.left &&
      typeof margin.left === 'string' &&
      sizes.includes((margin as MarginPaddingProps).left as string),
    [`_snui-margin-right-${(margin as MarginPaddingProps).right}`]:
      typeof margin === 'object' &&
      margin.right &&
      typeof margin.right === 'string' &&
      sizes.includes((margin as MarginPaddingProps).right as string),
    [`_snui-margin-top-${(margin as MarginPaddingProps).top}`]:
      typeof margin === 'object' &&
      margin.top &&
      typeof margin.top === 'string' &&
      sizes.includes((margin as MarginPaddingProps).top as string),
    [`_snui-margin-x-${(margin as MarginPaddingProps).x}`]:
      // make sure that left and right properties have not been defined
      !(margin as MarginPaddingProps).left &&
      !(margin as MarginPaddingProps).right &&
      typeof margin === 'object' &&
      margin.x &&
      typeof margin.y === 'string' &&
      sizes.includes((margin as MarginPaddingProps).x as string),
    [`_snui-margin-y-${(margin as MarginPaddingProps).y}`]:
      // make sure that top and bottom properties have not been defined
      !(margin as MarginPaddingProps).bottom &&
      !(margin as MarginPaddingProps).top &&
      typeof margin === 'object' &&
      margin.y &&
      typeof margin.y === 'string' &&
      sizes.includes((margin as MarginPaddingProps).y as string),
    // padding
    [`_snui-padding-${padding}`]:
      typeof padding === 'string' && padding !== '' && sizes.includes(padding),
    [`_snui-padding-bottom-${(padding as MarginPaddingProps).bottom}`]:
      typeof padding === 'object' &&
      padding.bottom &&
      typeof padding.bottom === 'string' &&
      sizes.includes((padding as MarginPaddingProps).bottom as string),
    [`_snui-padding-left-${(padding as any).left}`]:
      typeof padding === 'object' &&
      padding.left &&
      sizes.includes((padding as MarginPaddingProps).left as string),
    [`_snui-padding-right-${(padding as MarginPaddingProps).right}`]:
      typeof padding === 'object' &&
      padding.right &&
      typeof padding.right === 'string' &&
      sizes.includes((padding as MarginPaddingProps).right as string),
    [`_snui-padding-top-${(padding as any).top}`]:
      typeof padding === 'object' &&
      padding.top &&
      typeof padding.top === 'string' &&
      sizes.includes((padding as MarginPaddingProps).top as string),
    [`_snui-padding-x-${(padding as MarginPaddingProps).x}`]:
      !(padding as MarginPaddingProps).left &&
      !(padding as MarginPaddingProps).right &&
      typeof padding === 'object' &&
      padding.x &&
      typeof padding.x === 'string' &&
      sizes.includes((padding as MarginPaddingProps).x as string),
    [`_snui-padding-y-${(padding as MarginPaddingProps).y}`]:
      !(padding as MarginPaddingProps).bottom &&
      !(padding as MarginPaddingProps).top &&
      typeof padding === 'object' &&
      padding.y &&
      typeof padding.y === 'string' &&
      sizes.includes((padding as MarginPaddingProps).y as string),
    [`_snui-text-${textTransform}`]:
      textTransform === 'capitalize' ||
      textTransform === 'lowercase' ||
      textTransform === 'uppercase',
    [`_snui-width-${width}`]:
      isString(width) && sizes.includes(width as string),
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
    <FocusLock
      closeOnEsc={closeOnEsc}
      closeOnOverlayClick={closeOnOverlayClick}
      initialFocusRef={initialFocusRef}
      onClose={onClose}
      trapFocus={trapFocus}
    >
      <div className="_snui-overlay">
        <section
          {...rest}
          aria-labelledby={`${modalId}-header`}
          aria-describedby={`${modalId}-body`}
          aria-modal="true"
          className={classes}
          role="dialog"
          style={styles}
        >
          <header className="_snui-modal__header" id={`${modalId}-header`}>
            {header}
          </header>
          <Button
            aria-label="Close the modal"
            className="_snui-modal__close-button"
            hoverBackgroundColor="rgba(0, 0, 0, 0.04)"
            onClick={onClose}
            variant="outline"
          >
            <CloseIcon fill="#000" size="1rem" />
          </Button>
          <div className="_snui-modal__body" id={`${modalId}-body`}>
            {body}
          </div>
          <footer className="_snui-modal__footer" id={`${modalId}-footer`}>
            {footer}
          </footer>
        </section>
      </div>
    </FocusLock>
  );

  return isOpen && mounted
    ? createPortal(jsx, document.getElementById(modalId) as Element)
    : null;
};

export default Modal;
