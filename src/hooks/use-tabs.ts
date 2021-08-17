import { useCallback, useContext, useState } from 'react';

import { TabsContext, TabListContext } from '../contexts/tabs';
import { TabsProps } from '../components/molecules/Tabs/types';

/**
 * Hook that returns the Tabs props for <TabsProvider>
 */
const useTabsProvider = (props: Omit<TabsProps, 'children'>) => {
  const { defaultIndex = 0 } = props;

  const [activeIndex, setActiveIndexFunction] = useState<number>(defaultIndex);

  const setActiveIndex = useCallback((newIndex: number) => {
    setActiveIndexFunction(newIndex);
  }, []);

  return {
    activeIndex,
    setActiveIndex,
  };
};

/**
 * Hook that returns all TabList props
 */
const useTabList = () => {
  const context = useContext(TabListContext);

  if (!context) {
    throw new Error(
      'useTabList: context is undefined, did you remember to wrap your components in a pair of <Tabs>'
    );
  }

  return context;
};

/**
 * Hook that returns all Tabs props
 */
const useTabs = () => {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error(
      'useTabs: context is undefined, did you remember to wrap your <Tab> in a pair of <TabList>'
    );
  }

  return context;
};

export { useTabList, useTabsProvider, useTabs };
