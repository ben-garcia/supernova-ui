import React, { Children, FC, useCallback, useRef, useState } from 'react';

import { Portal } from '@atoms';
import {
  useClassStyles,
  useCreateClassString,
  useInlineStyles,
  useUniqueId,
  useValidateProps,
} from '@hooks';
import {
  ArrowPosition,
  getArrowPosition,
  getLeftTopPosition,
  isString,
} from '@utils';

import { TooltipPosition, TooltipProps } from './types';
import './styles.scss';

const Tooltip: FC<TooltipProps> = props => {
  const {
    children,
    className,
    colorVariant,
    content,
    placement = 'bottom',
    withArrow = true,
    ...rest
  } = props;
  const { remainingProps, validatedCSSProps } = useValidateProps(rest);
  const stylesClassName = useClassStyles(validatedCSSProps);
  const createInlineStyles = useInlineStyles(colorVariant);
  const addClasses = useCreateClassString('snui snui-tooltip', {
    [`${className}`]: isString(className),
    [`${stylesClassName}`]: isString(stylesClassName),
  });
  const addArrowClasses = useCreateClassString('snui-tooltip-arrow', {
    [`snui-tooltip-arrow--${placement}`]: isString(placement),
  });
  const tooltipId = useUniqueId('snui-tooltip');
  let jsx: React.ReactNode;
  const [show, setShow] = useState(false);
  const contentRef = useRef<any>(null);
  const arrowRef = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState<TooltipPosition>({
    left: -100,
    top: -100,
  });
  const [arrowPos, setArrowPos] = useState<ArrowPosition>({});

  const onMouseEnter = useCallback(
    (e: React.MouseEvent | React.FocusEvent) => {
      setShow(true);

      if (e) {
        const { currentTarget } = e;

        setTimeout(() => {
          // get the position of the tooltip element
          setPos(
            getLeftTopPosition(
              currentTarget as HTMLElement,
              contentRef?.current,
              placement
            ) as any
          );

          // get the position of the arrow
          setArrowPos(
            getArrowPosition(
              arrowRef?.current as HTMLDivElement,
              contentRef?.current,
              placement
            )
          );
        }, 10);
      }
    },
    [placement]
  );
  const onMouseLeave = useCallback(() => setShow(false), []);
  const styles: React.CSSProperties = {};
  const arrowStyles: React.CSSProperties = {};

  if (isString(children)) {
    jsx = (
      <span
        aria-describedby={show ? tooltipId : undefined}
        onBlur={onMouseLeave}
        onFocus={onMouseEnter}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
      >
        {children}
      </span>
    );
  } else {
    const child = Children.only(children);

    jsx = React.cloneElement(child as any, {
      'aria-describedby': show ? tooltipId : undefined,
      onBlur: onMouseLeave,
      onFocus: onMouseEnter,
      onMouseEnter,
      onMouseLeave,
    });
  }

  return (
    <div>
      {jsx}
      <Portal isMounted={show}>
        <div
          className="snui-position-absolute"
          ref={contentRef}
          style={{
            ...styles,
            left: pos.left,
            top: pos.top,
          }}
        >
          <div className="snui-tooltip-inner">
            {withArrow && (
              <div
                {...addArrowClasses()}
                ref={arrowRef}
                style={{
                  ...arrowPos,
                  ...arrowStyles,
                }}
              />
            )}

            <div
              {...remainingProps}
              {...addClasses()}
              id={tooltipId}
              role="tooltip"
              style={{ ...createInlineStyles().style }}
            >
              {content}
            </div>
          </div>
        </div>
      </Portal>
    </div>
  );
};

export default Tooltip;
