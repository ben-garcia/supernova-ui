import React, { useEffect, useRef, ReactNode } from 'react';

import { createClasses, isString } from '../../../../utils';
import './styles.scss';

interface TabPanelListProps {
  children: ReactNode;
  className?: string;
}

const TabPanelList: React.FC<TabPanelListProps> = props => {
  const { children, className } = props;
  const tabPanelListRef = useRef<HTMLDivElement | null>(null);
  const classes = createClasses('snui-tabs__tab-panel-list', {
    [`${className}`]: isString(className),
  });

  useEffect(() => {
    let observer: MutationObserver;

    if (tabPanelListRef?.current) {
      // check for all the focusable buttons(not disabled) of the tab list node
      const updateFocusableItems = () => {
        const tabPanels = tabPanelListRef.current!.querySelectorAll(
          '[role="tabpanel"]'
        );

        tabPanels.forEach((element, index) => {
          element.setAttribute('data-snui-tab-panel-index', `${index}`);
        });
      };
      observer = new MutationObserver(() => {
        updateFocusableItems();
      });

      updateFocusableItems();
      observer.observe(tabPanelListRef.current as Node, { childList: true });
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [tabPanelListRef?.current]);

  return (
    <div className={classes} ref={tabPanelListRef}>
      {children}
    </div>
  );
};

export default TabPanelList;
