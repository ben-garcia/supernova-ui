import { TabsProps } from '@components/Tabs/types';
/**
 * Hook that returns the Tabs props for <TabsProvider>
 */
declare const useTabsProvider: (props: Omit<TabsProps, 'children'>) => {
    activeIndex: number;
    setActiveIndex: (newIndex: number) => void;
};
/**
 * Hook that returns all TabList props
 */
declare const useTabList: () => import("../contexts/tabs").TabList;
/**
 * Hook that returns all Tabs props
 */
declare const useTabs: () => import("../contexts/tabs").Tabs;
export { useTabList, useTabsProvider, useTabs };
//# sourceMappingURL=use-tabs.d.ts.map