import React, { FC, useEffect, useRef, useState } from 'react';

import { Portal } from '@atoms';
import { useCalculatePosition, useCreateClassString } from '@hooks';
import { FloatingProps } from '@types';

import './styles.scss';

/**
 * Floating element that renders next to another element. It is the base
 * component for Tooltip, Propover, Menu and Select.
 *
 * -------------------------------
 * ----NOTE: INTERNAL USE ONLY----
 * -------------------------------
 */
const Floating: FC<FloatingProps> = props => {
  const {
    arrowColor = 'gray700',
    arrowSize = 15,
    children,
    closeDelay = 0,
    isDisabled = false,
    openDelay = 0,
    placement = 'bottom',
    show,
    spacing = 5,
    triggerRef,
    withArrow = false,
  } = props;
  const toolRef = useRef<any>(null);
  const arrowRef = useRef<HTMLDivElement | null>(null);
  const {
    calcPosition,
    addArrowStyles,
    addElementStyles,
  } = useCalculatePosition(
    placement,
    withArrow,
    arrowSize,
    spacing,
    triggerRef.current as HTMLElement,
    toolRef,
    arrowRef,
    arrowColor
  );
  const [isExiting, setIsExiting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const openId = useRef<any>(null);
  const addClasses = useCreateClassString('snui snui-floating', {
    'snui-floating--exiting': isExiting,
  });

  useEffect(() => {
    if (show) {
      openId.current = setTimeout(() => {
        setIsOpen(true);
      }, openDelay + 20); // make sure the element is in the DOM
    }
  }, [openDelay, show]);

  useEffect(() => {
    if (!show) {
      clearTimeout(openId.current);

      setTimeout(() => {
        setIsExiting(true);
      }, closeDelay - 100);

      setTimeout(() => {
        setIsExiting(false);
        setIsOpen(false);
      }, closeDelay + 100); // add time for the animation
    }
  }, [closeDelay, show]);

  useEffect(() => {
    if (isOpen) {
      calcPosition();
    }
  }, [isOpen]);

  return (
    <Portal isMounted={isOpen}>
      <div {...addClasses()} {...addElementStyles()}>
        {children}
        {!isDisabled && withArrow && <div {...addArrowStyles()} />}
      </div>
    </Portal>
  );
};

export default Floating;
