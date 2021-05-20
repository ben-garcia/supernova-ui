/* eslint jsx-a11y/no-noninteractive-tabindex: 0 */
import React, {
  Children,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import Portal from '../Portal';
import { colors, isString } from '../../../utils';
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
  const triggerRef = useRef<any>(null);
  const contentRef = useRef<any>(null);
  const [pos, setPos] = useState<any>({ left: '', top: '' });
  const onMouseEnter = useCallback(() => setShow(true), []);
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

  useEffect(() => {
    setTimeout(() => {
      if (triggerRef?.current) {
        const triggerPosition = triggerRef.current.getBoundingClientRect();

        if (position === 'bottom') {
          setPos({
            left: `${
              triggerPosition.left +
              triggerPosition.width / 2 +
              window.pageXOffset
            }px`,
            top: `${triggerPosition.bottom + window.pageYOffset}px`,
            transform: 'translate(-50%, 10px) scale(1)',
          });
        } else if (position === 'left') {
          setPos({
            left: `${
              triggerPosition.left +
              window.pageXOffset -
              contentRef.current.clientWidth
            }px`,
            top: `${
              triggerPosition.top +
              triggerPosition.height / 2 +
              window.pageYOffset
            }px`,
            transform: 'translate(-10px, -50%) scale(1)',
          });
        } else if (position === 'right') {
          setPos({
            left: `${
              triggerPosition.left + triggerPosition.width + window.pageXOffset
            }px`,
            top: `${
              triggerPosition.top +
              triggerPosition.height / 2 +
              window.pageYOffset
            }px`,
            transform: 'translate(10px, -50%) scale(1)',
          });
        } else if (position === 'top') {
          setPos({
            left: `${
              triggerPosition.left +
              triggerPosition.width / 2 +
              window.pageXOffset
            }px`,
            top: `${
              triggerPosition.top +
              window.pageYOffset -
              contentRef.current.clientHeight
            }px`,
            transform: 'translate(-50%, -10px) scale(1)',
          });
        }
      }
    }, 20);
  }, [triggerRef?.current]);

  return (
    <div className="snui-tooltip">
      {jsx}
      {show && (
        <Portal>
          <div
            className="snui-tooltip-content snui-font-body"
            ref={contentRef}
            style={{ ...pos, ...styles }}
          >
            <div id={tooltipId} role="tooltip">
              {content}
            </div>
          </div>
        </Portal>
      )}
    </div>
  );
};

export default Tooltip;
