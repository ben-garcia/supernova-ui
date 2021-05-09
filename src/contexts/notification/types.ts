import { ReactNode } from 'react';

export type NotificationActionTypes =
  | 'ADD_BOTTOM_NOTIFICATION'
  | 'ADD_BOTTOM_LEFT_NOTIFICATION'
  | 'ADD_BOTTOM_RIGHT_NOTIFICATION'
  | 'ADD_TOP_NOTIFICATION'
  | 'ADD_TOP_LEFT_NOTIFICATION'
  | 'ADD_TOP_RIGHT_NOTIFICATION'
  | 'REMOVE_BOTTOM_NOTIFICATION'
  | 'REMOVE_BOTTOM_LEFT_NOTIFICATION'
  | 'REMOVE_BOTTOM_RIGHT_NOTIFICATION'
  | 'REMOVE_TOP_NOTIFICATION'
  | 'REMOVE_TOP_LEFT_NOTIFICATION'
  | 'REMOVE_TOP_RIGHT_NOTIFICATION';

export interface Notification {
  id?: string;
  title?: string;
  message?: string;
}

type NotificationPosition =
  | 'bottom'
  | 'bottom-left'
  | 'bottom-right'
  | 'top'
  | 'top-left'
  | 'top-right';

type NotificationStatus = 'error' | 'info' | 'success' | 'warning';

export interface AddNotificationProps extends Notification {
  /**
   * Configure the background color for a custom notification
   *
   * NOTE: 'render' prop must be supplied
   */
  backgroundColor?: string;
  /**
   * configure the duration of when to close the notification
   *
   * @default 5000
   */
  duration?: number;
  /**
   * configure whether the user can close the notification
   *
   * @default true
   */
  isCloseable?: boolean;
  /**
   * configure whether the notification can be paused by hovering over the notification
   *
   * @default true
   */
  isPausable?: boolean;
  /**
   * where the notification should be placed.
   *
   * @default 'top-right'
   */
  position?: NotificationPosition;
  /**
   * configure your own Notification component
   *
   * @param onClose function to close the Notification
   *
   * @return ReactNode which represents the UI to be rendered
   *
   */
  render?: (onClose?: () => void) => ReactNode;
  /**
   * configure the type of notification
   *
   * @default 'info'
   */
  status?: NotificationStatus;
}

export interface NotificationAction {
  type: NotificationActionTypes;
  payload: Notification | string;
}

interface NotificationsList {
  bottom: Notification[];
  'bottom-left': Notification[];
  'bottom-right': Notification[];
  top: Notification[];
  'top-left': Notification[];
  'top-right': Notification[];
}

export interface NotificationState {
  lists: NotificationsList;
}
