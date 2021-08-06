/* eslint jsx-a11y/no-noninteractive-tabindex: 0 */
import React, {
  Children,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

import { colors, isString } from '../../../utils';
import { TooltipProps } from './types';
import { useTheme } from '../../../hooks';

import './styles.scss';

const useSafeEffect =
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
    ? useLayoutEffect
    : useEffect;

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
  const triggerRef = useRef<any>(null);
  const contentRef = useRef<any>(null);
  const [pos, setPos] = useState<{ left: number; top: number }>({
    left: 0,
    top: 0,
  });
  const onMouseEnter = useCallback((e: React.MouseEvent | React.FocusEvent) => {
    const { currentTarget } = e;

    console.log('currentTarget: ', currentTarget);

    setShow(true);
  }, []);
  const onMouseLeave = useCallback(() => setShow(false), []);
  const styles: React.CSSProperties = {};
  const theme = useTheme();
  const [tooltipId] = useState(`tooltip-${Math.random()}`);

  if (isString(children)) {
    jsx = (
      <span
        aria-describedby={show ? tooltipId : undefined}
        onBlur={onMouseLeave}
        onFocus={onMouseEnter}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        ref={triggerRef}
        tabIndex={0}
      >
        {children}
      </span>
    );
  } else {
    const child = Children.only(children);

    jsx = React.cloneElement(child as any, {
      'aria-describedby': show ? tooltipId : undefined,
      ref: triggerRef,
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

  useSafeEffect(() => {
    if (triggerRef?.current && contentRef?.current) {
      const margin = 10;
      const {
        bottom,
        left,
        right,
        top,
      } = triggerRef.current.getBoundingClientRect();

      if (position === 'bottom') {
        setPos({
          left:
            left +
            (triggerRef.current.offsetWidth - contentRef.current.offsetWidth) /
              2,
          top: bottom + margin / 1.5,
        });
      } else if (position === 'left') {
        setPos({
          left: left - contentRef.current.offsetWidth - margin,
          top:
            top +
            (triggerRef.current.offsetHeight -
              contentRef.current.offsetHeight) /
              2,
        });
      } else if (position === 'right') {
        setPos({
          left: right + margin,
          top:
            top +
            (triggerRef.current.offsetHeight -
              contentRef.current.offsetHeight) /
              2,
        });
      } else if (position === 'top') {
        setPos({
          left:
            left +
            (triggerRef.current.offsetWidth - contentRef.current.offsetWidth) /
              2,
          top: top - triggerRef.current.offsetHeight - margin / 2,
        });
      }
    }
  }, [triggerRef?.current, contentRef?.current, show]);

  return (
    <div className="snui-tooltip">
      {jsx}
      {show &&
        createPortal(
          <div
            className="snui-tooltip-content snui-font-body"
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
