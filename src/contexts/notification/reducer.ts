import { Notification, NotificationAction, NotificationState } from './types';

const reducer = (state: NotificationState, action: NotificationAction) => {
  let id: string;

  if (typeof action.payload === 'object') {
    if (action.payload?.id) {
      id = action.payload.id;
    } else {
      id = `_snui-notification-${Math.random()}`;
    }
  }

  switch (action.type) {
    case 'ADD_BOTTOM_NOTIFICATION':
      return {
        ...state,
        lists: {
          ...state.lists,
          // @ts-ignore
          bottom: [...state.lists!.bottom, { ...(action.payload as any), id }],
        },
      };
    case 'ADD_BOTTOM_LEFT_NOTIFICATION':
      return {
        ...state,
        lists: {
          ...state.lists,
          'bottom-left': [
            ...state.lists!['bottom-left'],
            // @ts-ignore
            { ...(action.payload as any), id },
          ],
        },
      };
    case 'ADD_BOTTOM_RIGHT_NOTIFICATION':
      return {
        ...state,
        lists: {
          ...state.lists,
          'bottom-right': [
            ...state.lists!['bottom-right'],
            // @ts-ignore
            { ...(action.payload as any), id },
          ],
        },
      };
    case 'ADD_TOP_NOTIFICATION':
      return {
        ...state,
        lists: {
          ...state.lists,
          top: [
            {
              ...(action.payload as any),
              // @ts-ignore
              id,
            },
            ...state.lists!.top,
          ],
        },
      };
    case 'ADD_TOP_LEFT_NOTIFICATION':
      return {
        ...state,
        lists: {
          ...state.lists,
          'top-left': [
            // @ts-ignore
            { ...(action.payload as any), id },
            ...state.lists!['top-left'],
          ],
        },
      };
    case 'ADD_TOP_RIGHT_NOTIFICATION':
      return {
        ...state,
        lists: {
          ...state.lists,
          'top-right': [
            // @ts-ignore
            { ...(action.payload as any), id },
            ...state.lists!['top-right'],
          ],
        },
      };
    case 'REMOVE_BOTTOM_NOTIFICATION':
      return {
        ...state,
        lists: {
          ...state.lists,
          bottom: state.lists.bottom.filter(
            (n: Notification) => n.id !== action.payload
          ),
        },
      };
    case 'REMOVE_BOTTOM_LEFT_NOTIFICATION':
      return {
        ...state,
        lists: {
          ...state.lists,
          'bottom-left': state.lists['bottom-left'].filter(
            (n: Notification) => n.id !== action.payload
          ),
        },
      };
    case 'REMOVE_BOTTOM_RIGHT_NOTIFICATION':
      return {
        ...state,
        lists: {
          ...state.lists,
          'bottom-right': state.lists['bottom-right'].filter(
            (n: Notification) => n.id !== action.payload
          ),
        },
      };
    case 'REMOVE_TOP_NOTIFICATION':
      return {
        ...state,
        lists: {
          ...state.lists,
          top: state.lists.top.filter(
            (n: Notification) => n.id !== action.payload
          ),
        },
      };
    case 'REMOVE_TOP_LEFT_NOTIFICATION':
      return {
        ...state,
        lists: {
          ...state.lists,
          'top-left': state.lists['top-left'].filter(
            (n: Notification) => n.id !== action.payload
          ),
        },
      };
    case 'REMOVE_TOP_RIGHT_NOTIFICATION':
      return {
        ...state,
        lists: {
          ...state.lists,
          'top-right': state.lists['top-right'].filter(
            (n: Notification) => n.id !== action.payload
          ),
        },
      };

    default:
      return state;
  }
};

export default reducer;
