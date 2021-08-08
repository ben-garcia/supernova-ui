/* eslint jsx-a11y/no-noninteractive-tabindex: 0 */
import React, { Children, useCallback, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import {
  ArrowPosition,
  getArrowPosition,
  getLeftTopPosition,
  isString,
} from '../../../utils';
import { TooltipProps } from './types';
import { useTheme } from '../../../hooks';

import './styles.scss';

interface TooltipPosition {
  left: number;
  top: number;
}

const Tooltip: React.FC<TooltipProps> = props => {
  const {
    backgroundColor,
    color,
    children,
    content,
    position = 'bottom',
    withArrow = true,
  } = props;
  let jsx: React.ReactNode;
  const [show, setShow] = useState(false);
  const contentRef = useRef<any>(null);
  const arrowRef = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState<TooltipPosition>({
    left: -100,
    top: -100,
  });
  const [arrowPos, setArrowPos] = useState<ArrowPosition>({});

  const onMouseEnter = useCallback((e: React.MouseEvent | React.FocusEvent) => {
    setShow(true);

    if (e) {
      const { currentTarget } = e;

      setTimeout(() => {
        // get the position of the tooltip element
        setPos(
          getLeftTopPosition(
            currentTarget as HTMLElement,
            contentRef?.current,
            position
          ) as any
        );

        // get the position of the arrow
        setArrowPos(
          getArrowPosition(
            arrowRef?.current as HTMLDivElement,
            contentRef?.current,
            position
          )
        );
      }, 10);
    }
  }, []);
  const onMouseLeave = useCallback(() => setShow(false), []);
  const styles: React.CSSProperties = {};
  const theme = useTheme();
  const tooltipId = useMemo(() => `tooltip-${Math.random()}`, []);

  if (isString(children)) {
    jsx = (
      <span
        aria-describedby={show ? tooltipId : undefined}
        onBlur={onMouseLeave}
        onFocus={onMouseEnter}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
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

  if (isString(backgroundColor)) {
    // @ts-ignore
    if (theme.colors[backgroundColor]) {
      styles.backgroundColor = `${
        (theme as any).colors[backgroundColor as any]
      }`;
    } else {
      styles.backgroundColor = backgroundColor;
    }
  } else if (!backgroundColor) {
    styles.backgroundColor = theme.colors.black;
  }

  if (isString(color)) {
    // @ts-ignore
    if (theme.colors[color]) {
      styles.color = `${(theme as any).colors[color as any]}`;
    } else {
      styles.color = color;
    }
  } else if (!color) {
    styles.color = theme.colors.white;
  }

  return (
    <div className="snui-tooltip">
      {jsx}
      {show &&
        createPortal(
          <div
            className="snui-tooltip__content snui-font-body"
            ref={contentRef}
            style={{
              ...styles,
              left: pos.left,
              top: pos.top,
            }}
          >
            <div className="snui-tooltip__inner">
              {withArrow && (
                <div
                  className="snui-tooltip__arrow"
                  ref={arrowRef}
                  style={{
                    backgroundColor: styles.backgroundColor,
                    ...arrowPos,
                  }}
                />
              )}
              <div id={tooltipId} role="tooltip" style={{ paddingTop: 2 }}>
                {content}
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default Tooltip;
