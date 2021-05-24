import React, { useEffect, useState } from 'react';

import { Button } from '../../atoms';
import {
  CheckmarkIcon,
  CloseIcon,
  InfoIcon,
  HelpIcon,
} from '../../atoms/Icon/Icons';
import { useTheme } from '../../../hooks';
import { isFunction, isString } from '../../../utils';
import { NotificationContext } from '../../../contexts/notification/NotificationProvider';
import { NotificationProps } from './types';

import './styles.scss';

const Notification: React.FC<NotificationProps> = props => {
  const {
    backgroundColor,
    duration = 5000,
    id,
    isCloseable = true,
    isPausable = true,
    message,
    position = 'top-right',
    render,
    status = 'info',
    title,
  } = props;

  const theme = useTheme();
  const { dispatch } = React.useContext(NotificationContext);
  const [progressbarWidth, setProgressbarWidth] = useState(100);
  const [intervalId, setIntervalId] = useState(null);
  const [isExiting, setIsExiting] = useState(false);

  let backgroundColorToUse: string = '';
  let icon: React.ReactNode;
  let actionType: string;

  switch (status) {
    case 'error':
      backgroundColorToUse = theme.colors.error600;
      icon = <CloseIcon margin="0 sm 0 0" size="25px" />;
      break;
    case 'success':
      backgroundColorToUse = theme.colors.success600;
      icon = <CheckmarkIcon margin="0 sm 0 0" size="25px" />;
      break;
    case 'warning':
      backgroundColorToUse = theme.colors.warning600;
      icon = <HelpIcon margin="0 sm 0 0" size="xs" />;
      break;
    default:
      icon = <InfoIcon margin="0 sm 0 0" size="xs" />;
      backgroundColorToUse = theme.colors.info600;
  }

  switch (position) {
    case 'bottom':
      actionType = 'REMOVE_BOTTOM_NOTIFICATION';
      break;
    case 'bottom-left':
      actionType = 'REMOVE_BOTTOM_LEFT_NOTIFICATION';
      break;
    case 'bottom-right':
      actionType = 'REMOVE_BOTTOM_RIGHT_NOTIFICATION';
      break;
    case 'top':
      actionType = 'REMOVE_TOP_NOTIFICATION';
      break;
    case 'top-left':
      actionType = 'REMOVE_TOP_LEFT_NOTIFICATION';
      break;
    default:
      actionType = 'REMOVE_TOP_RIGHT_NOTIFICATION';
  }

  if (isFunction(render) && isString(backgroundColor)) {
    backgroundColorToUse = backgroundColor as string;
  }

  const handleStartTimer = () => {
    const timerId = setInterval(() => {
      setProgressbarWidth(prev => {
        if (prev > 0) {
          return prev - 0.5;
        }

        clearInterval(timerId);

        return prev;
      });
    }, duration / 200);

    setIntervalId(timerId as any);
  };

  const handlePauseTimer = () => {
    clearInterval(intervalId as any);
  };

  const handleCloseNotification = () => {
    handlePauseTimer();

    setIsExiting(true);

    setTimeout(() => {
      dispatch({
        type: actionType as any,
        payload: id as string,
      });
    }, 400);
  };

  useEffect(() => {
    if (progressbarWidth === 0) {
      handleCloseNotification();
    }
  }, [progressbarWidth]);

  useEffect(() => {
    handleStartTimer();
  }, []);

  return isFunction(render) ? (
    <div
      className={`snui-flex snui-notification snui-notification--${position} ${
        isExiting ? `snui-notification--${position}--exiting` : ''
      }`}
      id={id}
      onMouseEnter={isPausable ? handlePauseTimer : undefined}
      onMouseLeave={isPausable ? handleStartTimer : undefined}
      role="alert"
      style={{ backgroundColor: backgroundColorToUse }}
    >
      {render!(isCloseable ? handleCloseNotification : () => {})}
      {isPausable && (
        <div
          aria-valuemax={100}
          aria-valuemin={0}
          aria-valuenow={progressbarWidth}
          className="snui-notification__progressbar"
          style={{ width: `${progressbarWidth}%` }}
        />
      )}
    </div>
  ) : (
    <div
      className={`snui-flex snui-notification snui-notification--${position} ${
        isExiting ? `snui-notification--${position}--exiting` : ''
      }`}
      id={id}
      onMouseEnter={isPausable ? handlePauseTimer : undefined}
      onMouseLeave={isPausable ? handleStartTimer : undefined}
      role="alert"
      style={{
        backgroundColor: backgroundColorToUse,
        padding: theme.sizes.xs,
      }}
    >
      <div className="snui-self-center">{icon}</div>
      <div className="snui-flex snui-flex-column snui-margin-right-md">
        <p className="snui-notification__title snui-font-weight-xxl">{title}</p>
        <p className="snui-notification__message">{message}</p>
      </div>
      {isCloseable && (
        <Button
          aria-label="Close the alert"
          className="snui-notification__close-button"
          hoverBackgroundColor="rgba(0, 0, 0, 0.04)"
          onClick={() => setProgressbarWidth(0)}
          variant="outline"
        >
          <CloseIcon fill="#000" size="1rem" />
        </Button>
      )}
      {isPausable && (
        <div
          aria-valuemax={100}
          aria-valuemin={0}
          aria-valuenow={progressbarWidth}
          className="snui-notification__progressbar"
          style={{ width: `${progressbarWidth}%` }}
        />
      )}
    </div>
  );
};

export default Notification;
