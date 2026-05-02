import React, {
  FC,
  Children,
  cloneElement,
  useEffect,
  useMemo,
  useState,
  useRef,
  useCallback,
} from 'react';

import Portal from '@components/Portal';
import { useCalculatePosition } from '@hooks/use-calculate-position';
import { useCSSAndPseudoClassProps } from '@hooks/use-css-and-pseudo-class-props';
import { useInlineStyles } from '@hooks/use-inline-styles';
import { useMountTransition } from '@hooks/use-mount-transition';
import { useTheme } from '@hooks/use-theme';
import { useUniqueId } from '@hooks/use-unique-id';
import { isString } from '@utils/assertions';
import type { TooltipProps } from './types';
import './styles.scss';

// CSS transition duration in milliseconds - must match the transition time in styles.scss
const TRANSITION_DURATION = 200;

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
  // Calculate the total unmount delay ONCE
  const totalUnmountDelay = closeDelay + TRANSITION_DURATION;
  const hasTransitionedIn = useMountTransition(show, totalUnmountDelay);
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

  const onMouseEnter = useCallback(() => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
    if (openDelay) {
      timeoutId.current = setTimeout(() => {
        setShow(true);
        calcPosition();
      }, openDelay);
    } else {
      setShow(true);
      calcPosition();
    }
  }, [openDelay, calcPosition]);

  const onMouseLeave = useCallback(() => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
    setShow(false);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
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
