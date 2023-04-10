import React, { ReactNode, createContext, useMemo, useReducer } from 'react';

import { Portal } from '@components';
import Notification from '@components/Notification';
import reducer from './reducer';
import {
  Notification as NotificationType,
  NotificationAction,
  NotificationState,
} from './types';

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

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider = (props: NotificationProviderProps) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const contextValue = useMemo(() => ({ state, dispatch }), [dispatch]);

  return (
    <NotificationContext.Provider value={contextValue}>
      <Portal>
        <div
          className="snui-flex snui-flex-column snui-items-center snui-position-fixed snui-notification-bottom"
          id="snui-notification-bottom"
        >
          {(state.lists.bottom as any).map((n: NotificationType) => (
            <Notification {...n} key={n.id} />
          ))}
        </div>
        <div
          className="snui-flex snui-flex-column snui-position-fixed snui-notification-bottom-left"
          id="snui-notification-bottom-left"
        >
          {(state.lists['bottom-left'] as any).map((n: NotificationType) => (
            <Notification {...n} key={n.id} />
          ))}
        </div>
        <div
          className="snui-flex snui-flex-column snui-position-fixed snui-notification-bottom-right"
          id="snui-notification-bottom-right"
        >
          {(state.lists['bottom-right'] as any).map((n: NotificationType) => (
            <Notification {...n} key={n.id} />
          ))}
        </div>
        <div
          className="snui-flex snui-flex-column snui-items-center snui-position-fixed snui-notification-top"
          id="snui-notification-top"
        >
          {(state.lists.top as any).map((n: NotificationType) => (
            <Notification {...n} key={n.id} />
          ))}
        </div>
        <div
          className="snui-flex snui-flex-column snui-position-fixed snui-notification-top-left"
          id="snui-notification-top-left"
        >
          {(state.lists['top-left'] as any).map((n: NotificationType) => (
            <Notification {...n} key={n.id} />
          ))}
        </div>
        <div
          className="snui-flex snui-flex-column snui-position-fixed snui-notification-top-right"
          id="snui-notification-top-right"
        >
          {(state.lists['top-right'] as any).map((n: NotificationType) => (
            <Notification {...n} key={n.id} />
          ))}
        </div>
      </Portal>
      {children}
    </NotificationContext.Provider>
  );
};
