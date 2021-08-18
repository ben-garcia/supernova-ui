import React, { useEffect, useMemo, useRef, ReactNode } from 'react';

import { TabListProvider } from '../../../../contexts';
import { useTabs } from '../../../../hooks';
import { createClasses, isString } from '../../../../utils';
import './styles.scss';

interface TabListProps {
  children: ReactNode;
  className?: string;
}

const TabList: React.FC<TabListProps> = props => {
  const { children, className } = props;
  const { align, orientation, isFitted, setNumberOfTabs } = useTabs();
  const tabListRef = useRef<HTMLDivElement | null>(null);
  const tabsRef = useRef<HTMLButtonElement[] | null>(null);
  const classes = createClasses('snui-tabs__tablist', {
    [`${className}`]: isString(className),
    [`snui-tabs__tablist--vertical`]: orientation === 'vertical',
    [`snui-tabs__tablist--fitted`]: isFitted,
    [`snui-tabs__tablist--${align}`]: isString(align),
  });
  const contextValue = useMemo(
    () => ({
      tabsRef: tabsRef?.current,
    }),
    [tabsRef?.current]
  );

  useEffect(() => {
    let observer: MutationObserver;

    if (tabListRef?.current) {
      // check for all the focusable buttons(not disabled) of the tab list node
      const updateFocusableItems = () => {
        const tabs = tabListRef.current!.querySelectorAll(
          'button[role="tab"]:not(:disabled)'
        );

        tabsRef.current = tabs as any;

        setNumberOfTabs(tabs.length);

        tabs.forEach((element, index) => {
          element.setAttribute('data-snui-tab-index', `${index}`);
        });
      };
      observer = new MutationObserver(() => {
        updateFocusableItems();
      });

      updateFocusableItems();
      observer.observe(tabListRef.current as Node, { childList: true });
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [tabListRef?.current]);

  return (
    <TabListProvider value={contextValue as any}>
      <div
        aria-orientation={orientation}
        className={classes}
        ref={tabListRef}
        role="tablist"
      >
        {children}
      </div>
    </TabListProvider>
  );
};

export default TabList;
