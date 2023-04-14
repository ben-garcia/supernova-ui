import React, {
  FC,
  Children,
  cloneElement,
  useMemo,
  useState,
  useRef,
} from 'react';

import { Portal } from '@components';
import {
  useCalculatePosition,
  useCSSAndPseudoClassProps,
  useInlineStyles,
  useMountTransition,
  useTheme,
  useUniqueId,
} from '@hooks';
import { isString } from '@utils';
import { TooltipProps } from './types';
import './styles.scss';

const Tooltip: FC<TooltipProps> = props => {
  const {
    arrowSize = 10,
    children,
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
  const [show, setShow] = useState(false);
  const hasTransitionedIn = useMountTransition(show, 200);
  const addCSSClassesAndProps = useCSSAndPseudoClassProps(
    { ...rest, background, backgroundColor },
    'snui snui-tooltip',
    {
      'snui-tooltip--show': show,
      'snui-tooltip--hide': !show,
      visible: hasTransitionedIn,
    }
  );
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
            {...addCSSClassesAndProps()}
            style={{
              ...createInlineStyles().style,
              ...calculateTransformOrigin().style,
            }}
            id={tooltipId}
            role="tooltip"
          >
            {label}
            {!isDisabled && withArrow && (
              <div {...addArrowStyles()}>
                <div
                  className="snui snui-floating__inner"
                  style={{
                    background: arrColor,
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </Portal>
    </>
  );
};

export default Tooltip;
