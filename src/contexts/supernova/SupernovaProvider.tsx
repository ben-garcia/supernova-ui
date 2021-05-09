import React, { useReducer } from 'react';

import { SupernovaProviderProps } from './types';
import { ThemeProvider, ThemeProviderProps } from '../theme';
import { theme as defaultTheme } from '../../theme';
import { deepMergify } from '../../utils';
import Portal from '../../components/atoms/Portal';
import {
  NotificationContext,
  initialState,
} from '../notification/NotificationProvider';
import reducer from '../notification/reducer';
import { Notification as NotificationType } from '../notification/types';
import Notification from '../../components/molecules/Notification';

/**
 * The top level provider that contains all other providers
 * needed for the components to function properly.
 */
const SupernovaProvider = (props: SupernovaProviderProps) => {
  const { theme, children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const contextValue = React.useMemo(() => ({ state, dispatch }), [dispatch]);
  let themeToUse;

  // use default theme when a custom theme is not provided
  if (!theme) {
    themeToUse = defaultTheme;
  } else {
    // extend the default theme to include custom theme values
    themeToUse = deepMergify(defaultTheme, theme);
  }

  return (
    <NotificationContext.Provider value={contextValue}>
      <Portal id="_snui-notifications">
        <div
          className="_snui-flex _snui-flex-column _snui-items-center _snui-position-fixed _snui-notification-bottom"
          id="_snui-notification-bottom"
        >
          {(state.lists.bottom as any).map((n: NotificationType) => (
            <Notification {...n} key={n.id} />
          ))}
        </div>
        <div
          className="_snui-flex _snui-flex-column _snui-position-fixed _snui-notification-bottom-left"
          id="_snui-notification-bottom-left"
        >
          {(state.lists['bottom-left'] as any).map((n: NotificationType) => (
            <Notification {...n} key={n.id} />
          ))}
        </div>
        <div
          className="_snui-flex _snui-flex-column _snui-position-fixed _snui-notification-bottom-right"
          id="_snui-notification-bottom-right"
        >
          {(state.lists['bottom-right'] as any).map((n: NotificationType) => (
            <Notification {...n} key={n.id} />
          ))}
        </div>
        <div
          className="_snui-flex _snui-flex-column _snui-items-center _snui-position-fixed _snui-notification-top"
          id="_snui-notification-top"
        >
          {(state.lists.top as any).map((n: NotificationType) => (
            <Notification {...n} key={n.id} />
          ))}
        </div>
        <div
          className="_snui-flex _snui-flex-column _snui-position-fixed _snui-notification-top-left"
          id="_snui-notification-top-left"
        >
          {(state.lists['top-left'] as any).map((n: NotificationType) => (
            <Notification {...n} key={n.id} />
          ))}
        </div>
        <div
          className="_snui-flex _snui-flex-column _snui-position-fixed _snui-notification-top-right"
          id="_snui-notification-top-right"
        >
          {(state.lists['top-right'] as any).map((n: NotificationType) => (
            <Notification {...n} key={n.id} />
          ))}
        </div>
      </Portal>
      <ThemeProvider value={themeToUse as ThemeProviderProps['value']}>
        {children}
      </ThemeProvider>
    </NotificationContext.Provider>
  );
};

export default SupernovaProvider;
