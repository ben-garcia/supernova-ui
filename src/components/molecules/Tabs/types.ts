import { ReactNode } from 'react';

export interface TabsProps {
  /**
   * The color of the active state
   *
   * @default 'info800'
   */
  activeColor?: string;
  /**
   * How the tabs should be alinged
   *
   * @default 'start'
   */
  align?: 'end' | 'center' | 'start';
  children: ReactNode;
  /**
   * Add a class
   */
  className?: string;
  /**
   * Configure the TabPanel that should render in the active state
   *
   * @default 0
   */
  defaultIndex?: number;
  /**
   * Should the Tabs share equal width of the TabList
   *
   * @default false
   */
  isFitted?: boolean;
  /**
   * When using keyboard for navigation,
   * Active a tab with 'Enter' or 'Space'
   *
   * if true the tab will active when focus is set
   *
   * @default false
   */
  isManual?: boolean;
  /**
   * The orientation of the TabList
   *
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * The size of the tabs
   *
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
}
