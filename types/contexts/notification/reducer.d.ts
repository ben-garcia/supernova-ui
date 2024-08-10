import { Notification, NotificationAction, NotificationState } from './types';
declare const reducer: (state: NotificationState, action: NotificationAction) => {
    lists: {
        bottom: any[];
        'bottom-left': Notification[];
        'bottom-right': Notification[];
        top: Notification[];
        'top-left': Notification[];
        'top-right': Notification[];
    };
} | {
    lists: {
        'bottom-left': any[];
        bottom: Notification[];
        'bottom-right': Notification[];
        top: Notification[];
        'top-left': Notification[];
        'top-right': Notification[];
    };
} | {
    lists: {
        'bottom-right': any[];
        bottom: Notification[];
        'bottom-left': Notification[];
        top: Notification[];
        'top-left': Notification[];
        'top-right': Notification[];
    };
} | {
    lists: {
        top: any[];
        bottom: Notification[];
        'bottom-left': Notification[];
        'bottom-right': Notification[];
        'top-left': Notification[];
        'top-right': Notification[];
    };
} | {
    lists: {
        'top-left': any[];
        bottom: Notification[];
        'bottom-left': Notification[];
        'bottom-right': Notification[];
        top: Notification[];
        'top-right': Notification[];
    };
} | {
    lists: {
        'top-right': any[];
        bottom: Notification[];
        'bottom-left': Notification[];
        'bottom-right': Notification[];
        top: Notification[];
        'top-left': Notification[];
    };
};
export default reducer;
//# sourceMappingURL=reducer.d.ts.map