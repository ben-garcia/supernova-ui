import React, { FC, useCallback, useMemo, useState } from 'react';

import { TabsProvider } from '@contexts';
import {
  useCSSAndPseudoClassProps,
  useUniqueId,
  useTabsProvider,
  useTheme,
} from '@hooks';
import { isString } from '@utils';
import { TabsProps } from './types';
import './styles.scss';

/**
 * The container for all Tabs related components
 * that provides context to its children.
 */
const Tabs: FC<TabsProps> = props => {
  const {
    colorVariant,
    align = 'start',
    children,
    defaultIndex = 0,
    isFitted = false,
    isManual = false,
    orientation = 'horizontal',
    size = 'md',
    ...rest
  } = props;
  const addCSSClassesAndProps = useCSSAndPseudoClassProps(
    rest,
    'snui snui-tabs',
    {
      [`snui-tabs--vertical`]: orientation === 'vertical',
    }
  );
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
  const { colors } = useTheme();
  const context = useTabsProvider(props);

  const contextValue = useMemo(
    () => ({
      ...context,
      // use user defined color
      // otherwise use default(primary)
      activeColor: isString(colorVariant)
        ? colors[colorVariant as keyof typeof colors]
        : colors.primary,
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
      <div {...addCSSClassesAndProps()} id={tabsId}>
        {children}
      </div>
    </TabsProvider>
  );
};

export default Tabs;
