import { ReactNode } from 'react';

type NotificationPosition =
  | 'bottom'
  | 'bottom-left'
  | 'bottom-right'
  | 'top'
  | 'top-left'
  | 'top-right';

type NotificationStatus = 'error' | 'info' | 'success' | 'warning';

export interface NotificationProps {
  /**
   * configure the duration of when to close the notification
   *
   * @default 5000
   */
  duration?: number;
  /**
   * configure the id of the notification
   *
   * if omitted, a unique id is generated
   */
  id?: string;
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
  isPauseable?: boolean;
  /**
   * configure the message of the notification
   */
  message?: string;
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
   * @param progressBar component to render which represents
   * the the amount of time before the notification closes
   *
   * @return ReactNode which represents the UI to be rendered
   *
   */
  render?: (onClose?: () => void, progressBar?: ReactNode) => ReactNode;
  /**
   * configure the type of notification
   *
   * @default 'info'
   */
  status?: NotificationStatus;
  /**
   * configure the title of the notification
   */
  title?: string;
}
