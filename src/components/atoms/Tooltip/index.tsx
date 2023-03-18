import React, {
  FC,
  Children,
  cloneElement,
  useMemo,
  useState,
  useRef,
} from 'react';

import { Portal } from '@atoms';
import {
  useCalculatePosition,
  useClassStyles,
  useCreateClassString,
  useInlineStyles,
  useMountTransition,
  useTheme,
  useUniqueId,
  useValidateProps,
} from '@hooks';
import { isString } from '@utils';
import { TooltipProps } from './types';

import './styles.scss';

const Tooltip: FC<TooltipProps> = props => {
  const {
    arrowSize = 15,
    children,
    className,
    closeDelay = 0,
    colorVariant,
    id,
    isDisabled = false,
    label,
    openDelay = 0,
    placement = 'bottom',
    spacing = 5,
    withArrow = false,
    background,
    backgroundColor,
    ...rest
  } = props;
  const { remainingProps, validatedCSSProps } = useValidateProps({
    ...rest,
    background,
    backgroundColor,
  });
  const stylesClassName = useClassStyles(validatedCSSProps);
  const [show, setShow] = useState(false);
  const hasTransitionedIn = useMountTransition(show, 200);
  const addClasses = useCreateClassString('snui snui-tooltip', {
    [`${className}`]: isString(className),
    [`${stylesClassName}`]: isString(stylesClassName),
    'snui-tooltip--show': show,
    'snui-tooltip--hide': !show,
    in: hasTransitionedIn,
  });
  const createInlineStyles = useInlineStyles(colorVariant);
  const triggerRef = useRef<any>(null);
  const toolRef = React.useRef<any>(null);
  const arrowRef = React.useRef<HTMLDivElement | null>(null);
  const tooltipId = id ?? useUniqueId('snui-tooltip');
  const timeoutId = useRef<any>(null);
  const { colors } = useTheme();
  const arrColor = useMemo(() => {
    if (isString(colorVariant) && (colors as any)[colorVariant!]) {
      return (colors as any)[colorVariant!];
    }
    if (isString(backgroundColor)) {
      return backgroundColor;
    }
    if (isString(background)) {
      return (background as string).split(' ')[0];
    }
    return '#4d5665';
  }, [colorVariant, background, backgroundColor]);
  const {
    calculateTransformOrigin,
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
    arrColor
  );

  const onMouseEnter = React.useCallback(() => {
    if (openDelay) {
      timeoutId.current = setTimeout(() => {
        setShow(true);
        calcPosition();
      }, openDelay);
    } else {
      setShow(true);
      calcPosition();
    }
  }, []);
  const onMouseLeave = React.useCallback(() => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
    if (closeDelay) {
      setTimeout(() => {
        setShow(false);
      }, closeDelay);
    } else {
      setShow(false);
    }
  }, []);
  return (
    <>
      {isString(children) ? (
        <span
          aria-describedby={show ? tooltipId : undefined}
          onBlur={isDisabled ? undefined : onMouseLeave}
          onFocus={isDisabled ? undefined : onMouseEnter}
          onMouseEnter={isDisabled ? undefined : onMouseEnter}
          onMouseLeave={isDisabled ? undefined : onMouseLeave}
          ref={isDisabled ? undefined : triggerRef}
          // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
          tabIndex={isDisabled ? undefined : 0}
        >
          {children}
        </span>
      ) : (
        cloneElement(Children.only(children) as any, {
          'aria-describedby': show ? tooltipId : undefined,
          onBlur: isDisabled ? undefined : onMouseLeave,
          onFocus: isDisabled ? undefined : onMouseEnter,
          onMouseEnter: isDisabled ? undefined : onMouseEnter,
          onMouseLeave: isDisabled ? undefined : onMouseLeave,
          ref: isDisabled ? undefined : triggerRef,
          // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
          tabIndex: 0,
        })
      )}
      <Portal isMounted={hasTransitionedIn || show}>
        <div className="snui snui-floating" {...addElementStyles()}>
          <div
            {...remainingProps}
            {...addClasses()}
            {...createInlineStyles()}
            {...calculateTransformOrigin()}
            id={tooltipId}
            role="tooltip"
          >
            {label}
            {!isDisabled && withArrow && <div {...addArrowStyles()} />}
          </div>
        </div>
      </Portal>
    </>
  );
};

export default Tooltip;
