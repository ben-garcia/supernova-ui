import { FC, PropsWithChildren } from 'react';

import TabsRoot from './TabsRoot';
import type { TabsRootProps } from './types';
import Tab, { TabProps } from './Tab';
import TabList, { TabListProps } from './TabList';
import TabPanel, { TabPanelProps } from './TabPanel';
import TabPanelList, { TabPanelListProps } from './TabPanelList';

interface TabsComponent {
  /**
   * The container for all Tabs related components
   * that provides context to its children.
   */
  Root: FC<PropsWithChildren<TabsRootProps>>;
  /**
   * Tab button used to activate a specific TabPanel
   */
  Item: FC<PropsWithChildren<TabProps>>;
  /**
   * The wrapper for all Tab buttons
   */
  ItemList: FC<PropsWithChildren<TabListProps>>;
  /**
   * The wrapper that holds the content associated with a Tab.
   */
  Panel: FC<PropsWithChildren<TabPanelProps>>;
  /**
   * The wrapper for all TabPanel components
   */
  PanelList: FC<PropsWithChildren<TabPanelListProps>>;
}

const Tabs: TabsComponent = {
  Root: TabsRoot,
  Item: Tab,
  ItemList: TabList,
  Panel: TabPanel,
  PanelList: TabPanelList,
};

export default Tabs;
