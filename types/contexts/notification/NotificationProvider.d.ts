import React, { ReactNode } from 'react';
import { NotificationAction, NotificationState } from './types';
export declare const initialState: NotificationState;
export declare const NotificationContext: React.Context<{
    state: NotificationState;
    dispatch: React.Dispatch<NotificationAction>;
}>;
interface NotificationProviderProps {
    children: ReactNode;
}
export declare const NotificationProvider: (props: NotificationProviderProps) => React.JSX.Element;
export {};
//# sourceMappingURL=NotificationProvider.d.ts.map