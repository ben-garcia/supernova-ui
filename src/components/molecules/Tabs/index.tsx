import React, { useCallback, useMemo, useState } from 'react';

import { TabsProvider } from '../../../contexts';
import { TabsProps } from './types';
import { useTabsProvider } from '../../../hooks/use-tabs';
import { useTheme, useUniqueId } from '../../../hooks';
import { createClasses, isString } from '../../../utils';
import './styles.scss';

/**
 * The container for all Tabs related components
 * that provides context to its children.
 */
const Tabs: React.FC<TabsProps> = props => {
  const {
    activeColor = 'info700',
    align = 'start',
    children,
    className,
    defaultIndex = 0,
    isFitted = false,
    isManual = false,
    orientation = 'horizontal',
    size = 'md',
  } = props;
  const classes = createClasses('snui-tabs', {
    [`${className}`]: isString(className),
    [`snui-tabs--vertical`]: orientation === 'vertical',
  });
  const [activeIndex, setActiveIndexState] = useState(defaultIndex);
  const [focusedIndex, setFocusedIndexState] = useState(defaultIndex);
  const [numberOfTabs, setNumberOfTabsFunction] = useState(-1);
  const setNumberOfTabs = useCallback((newNumber: number) => {
    setNumberOfTabsFunction(newNumber);
  }, []);
  const setActiveIndex = useCallback((newIndex: number) => {
    setActiveIndexState(newIndex);
  }, []);
  const setFocusedIndex = useCallback((newIndex: number) => {
    setFocusedIndexState(newIndex);
  }, []);
  const tabsId = useUniqueId('snui-tabs');
  const theme = useTheme();
  const context = useTabsProvider(props);

  const contextValue = useMemo(
    () => ({
      ...context,
      // use user defined color
      // otherwise use default(info700)
      activeColor: (theme as any).colors[activeColor] ?? activeColor,
      activeIndex,
      align,
      defaultIndex,
      focusedIndex,
      isFitted,
      isManual,
      numberOfTabs,
      orientation,
      setActiveIndex,
      setFocusedIndex,
      setNumberOfTabs,
      size,
      tabsId,
    }),
    [context]
  );

  return (
    <TabsProvider value={contextValue}>
      <div className={classes} id={tabsId}>
        {children}
      </div>
    </TabsProvider>
  );
};

export default Tabs;
