import React, {
  FC,
  useContext,
  useEffect,
  useState,
  useRef,
  useMemo,
} from 'react';

import Button from '@components/Button';
import CheckmarkIcon from '@components/Icon/Icons/CheckmarkIcon';
import CloseIcon from '@components/Icon/Icons/CloseIcon';
import HelpIcon from '@components/Icon/Icons/HelpIcon';
import InfoIcon from '@components/Icon/Icons/InfoIcon';
import type { NotificationProps } from '@components/Notification/types';
import { NotificationContext } from '@contexts/notification/NotificationProvider';
import { useTheme } from '@hooks/use-theme';
import { isFunction } from '@utils/assertions';
import './styles.scss';

// Configuration mapping to keep the component body clean
const STATUS_MAP = {
  error: { icon: CloseIcon, colorKey: 'error600' },
  success: { icon: CheckmarkIcon, colorKey: 'success600' },
  warning: { icon: HelpIcon, colorKey: 'warning600' },
  info: { icon: InfoIcon, colorKey: 'info600' },
};

const Notification: FC<NotificationProps> = ({
  duration = 5000,
  id,
  isCloseable = true,
  isPausable = true,
  message,
  position = 'top-right',
  render,
  status = 'info',
  title,
  backgroundColor,
}) => {
  const theme = useTheme();
  const { dispatch } = useContext(NotificationContext);

  const [progressbarWidth, setProgressbarWidth] = useState(100);
  const [isExiting, setIsExiting] = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Derive styles based on status
  const config = STATUS_MAP[status] || STATUS_MAP.info;
  const backgroundColorToUse =
    backgroundColor ||
    theme.colors[config.colorKey as keyof typeof theme.colors];
  const StatusIcon = config.icon;

  // Map position to Reducer Action Type
  const actionType = useMemo(
    () => `REMOVE_${position.replace('-', '_').toUpperCase()}_NOTIFICATION`,
    [position]
  );

  const handleStartTimer = () => {
    if (!isPausable || isExiting) return;

    // Ensure the interval is at least 10ms to prevent browser throttling issues
    const tickRate = Math.max(duration / 100, 10);

    timerRef.current = setInterval(() => {
      setProgressbarWidth(prev => {
        if (prev <= 0) return 0;
        return prev - 1; // Decrement by 1% per tick
      });
    }, tickRate);
  };

  const handlePauseTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleManualClose = () => {
    handlePauseTimer();
    setIsExiting(true);
  };

  // Clean up timer on unmount
  useEffect(() => {
    handleStartTimer();
    return () => handlePauseTimer();
  }, []);

  // Close when progress hits 0
  useEffect(() => {
    if (progressbarWidth === 0 && !isExiting) {
      handleManualClose();
    }
  }, [progressbarWidth, isExiting]);

  // Final removal after CSS transition ends
  const handleTransitionEnd = (e: React.TransitionEvent) => {
    // Only trigger if the exiting opacity/transform transition finishes
    if (isExiting && e.propertyName === 'opacity') {
      dispatch({
        type: actionType as any,
        payload: id as string,
      });
    }
  };

  return (
    <div
      id={id}
      role="alert"
      aria-live="polite"
      onTransitionEnd={handleTransitionEnd}
      onMouseEnter={handlePauseTimer}
      onMouseLeave={handleStartTimer}
      className={`snui-notification snui-notification--${position} ${
        isExiting ? 'snui-notification--exiting' : ''
      }`}
      style={{
        backgroundColor: backgroundColorToUse,
        padding: !isFunction(render) ? theme.sizes.xs : undefined,
      }}
    >
      {isFunction(render) ? (
        render!(isCloseable ? handleManualClose : () => {})
      ) : (
        <div className="snui-flex">
          <div className="snui-notification__icon-container">
            <StatusIcon
              color="var(--snui-color-white)"
              size={
                status === 'warning' || status === 'info' ? 'xs' : undefined
              }
            />
          </div>

          <div className="snui-notification__inner">
            <strong className="snui-notification__title">{title}</strong>
            <p className="snui-notification__message">{message}</p>
          </div>

          {isCloseable && (
            <Button
              aria-label="Close notification"
              className="snui-notification__close-button"
              onClick={handleManualClose}
              variant="outline"
            >
              <CloseIcon
                color="var(--snui-color-white)"
                height="0.7rem"
                width="0.7rem"
              />
            </Button>
          )}
        </div>
      )}

      {isPausable && (
        <div
          aria-hidden="true"
          className="snui-notification__progressbar"
          style={{
            width: `${progressbarWidth}%`,
            transition: isExiting ? 'none' : 'width 0.1s linear',
          }}
        />
      )}
    </div>
  );
};

export default Notification;
