import { useCallback, useContext } from 'react';

import { isFunction } from '@utils';
import { NotificationContext } from '../contexts/notification/NotificationProvider';
import {
  AddNotificationProps,
  NotificationActionTypes,
} from '../contexts/notification/types';

export const useNotification = () => {
  const { dispatch } = useContext(NotificationContext);

  if (!isFunction(dispatch)) {
    throw new Error(
      'useNotification: dispatch is undefined, did you remember to wrap your app in a <SupernovaProvider />'
    );
  }

  const addNotification = useCallback((options: AddNotificationProps) => {
    let actionType: string;
    const notificationPosition = options?.position || 'top-right';

    switch (notificationPosition) {
      case 'bottom':
        actionType = 'ADD_BOTTOM_NOTIFICATION';
        break;
      case 'bottom-left':
        actionType = 'ADD_BOTTOM_LEFT_NOTIFICATION';
        break;
      case 'bottom-right':
        actionType = 'ADD_BOTTOM_RIGHT_NOTIFICATION';
        break;
      case 'top':
        actionType = 'ADD_TOP_NOTIFICATION';
        break;
      case 'top-left':
        actionType = 'ADD_TOP_LEFT_NOTIFICATION';
        break;
      default:
        actionType = 'ADD_TOP_RIGHT_NOTIFICATION';
    }

    dispatch({
      type: actionType as NotificationActionTypes,
      payload: {
        ...options,
      },
    });
  }, []);

  return addNotification;
};
