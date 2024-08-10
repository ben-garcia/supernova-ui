import { ReactNode } from 'react';
declare type NotificationPosition = 'bottom' | 'bottom-left' | 'bottom-right' | 'top' | 'top-left' | 'top-right';
declare type NotificationStatus = 'error' | 'info' | 'success' | 'warning';
export interface NotificationProps {
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
    isPausable?: boolean;
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
    /**
     * configure the title of the notification
     */
    title?: string;
}
export {};
//# sourceMappingURL=types.d.ts.map