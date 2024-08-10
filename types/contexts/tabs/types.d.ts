import { ReactNode, MutableRefObject } from 'react';
export interface Tabs {
    activeColor: string | undefined;
    activeIndex: number;
    align: 'end' | 'center' | 'start';
    focusedIndex: number;
    defaultIndex: number;
    isFitted: boolean;
    isManual: boolean;
    numberOfTabs: number;
    orientation: 'horizontal' | 'vertical';
    setActiveIndex: (newIndex: number) => void;
    setFocusedIndex: (newIndex: number) => void;
    setNumberOfTabs: (newNumber: number) => void;
    size: 'sm' | 'md' | 'lg';
    tabsId: string;
}
export interface TabList {
    tabsRef: MutableRefObject<HTMLButtonElement[] | null>;
}
export interface TabsProviderProps {
    children: ReactNode;
    value: Tabs;
}
export interface TabListProviderProps {
    children: ReactNode;
    value: TabList;
}
//# sourceMappingURL=types.d.ts.map