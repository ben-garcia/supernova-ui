import React, { createContext } from 'react';

import { NotificationAction, NotificationState } from './types';

export const initialState: NotificationState = {
  lists: {
    bottom: [],
    'bottom-left': [],
    'bottom-right': [],
    top: [],
    'top-left': [],
    'top-right': [],
  },
};

export const NotificationContext = createContext<{
  state: NotificationState;
  dispatch: React.Dispatch<NotificationAction>;
}>({
  state: initialState,
  dispatch: () => {},
});
