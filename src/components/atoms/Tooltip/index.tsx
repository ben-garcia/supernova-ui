/* eslint jsx-a11y/no-noninteractive-tabindex: 0 */
import React, { Children, useCallback, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { colors, getLeftTopPosition, isString } from '../../../utils';
import { TooltipProps } from './types';
import { useTheme } from '../../../hooks';

import './styles.scss';

const Tooltip: React.FC<TooltipProps> = props => {
  const {
    backgroundColor,
    color,
    children,
    content,
    position = 'bottom',
  } = props;
  let jsx: React.ReactNode;
  const [show, setShow] = useState(false);
  const contentRef = useRef<any>(null);
  const [pos, setPos] = useState<{ left: number; top: number }>({
    left: -100,
    top: -100,
  });

  const onMouseEnter = useCallback((e: React.MouseEvent | React.FocusEvent) => {
    setShow(true);

    if (e) {
      const { currentTarget } = e;

      setTimeout(() => {
        setPos(
          getLeftTopPosition(
            currentTarget as HTMLElement,
            contentRef?.current,
            position
          ) as any
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
    if (colors.includes(backgroundColor as string)) {
      styles.backgroundColor = `${
        (theme as any).colors[backgroundColor as any]
      }`;
    } else {
      styles.backgroundColor = backgroundColor;
    }
  }

  if (isString(color)) {
    if (colors.includes(backgroundColor as string)) {
      styles.color = `${(theme as any).colors[backgroundColor as any]}`;
    } else {
      styles.color = backgroundColor;
    }
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
              left: `${pos.left}px`,
              top: `${pos.top}px`,
            }}
          >
            <div id={tooltipId} role="tooltip">
              {content}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default Tooltip;
