import React, { FC, useEffect, useMemo, useRef } from 'react';

import { TabListProvider } from '@contexts';
import {
  useClassStyles,
  useCreateClassString,
  usePseudoClasses,
  useTabs,
  useValidateProps,
} from '@hooks';
import { isString } from '@utils';

import { SupernovaProps } from '@types';
import './styles.scss';

interface TabListProps extends SupernovaProps {}

/**
 * The wrapper for all Tab buttons
 */
const TabList: FC<TabListProps> = props => {
  const { children, className, ...rest } = props;
  const {
    remainingProps,
    validatedCSSProps,
    validatedPseudoClassProps,
  } = useValidateProps(rest);
  const pseudoClassName = usePseudoClasses(validatedPseudoClassProps);
  const stylesClassName = useClassStyles(validatedCSSProps);
  const { align, orientation, isFitted, setNumberOfTabs } = useTabs();
  const addClasses = useCreateClassString('snui snui-tabs__tablist', {
    [`${className}`]: isString(className),
    [`snui-tabs__tablist--vertical`]: orientation === 'vertical',
    [`snui-tabs__tablist--fitted`]: isFitted,
    [`snui-tabs__tablist--${align}`]: isString(align),
    [`${pseudoClassName}`]: isString(pseudoClassName),
    [`${stylesClassName}`]: isString(stylesClassName),
  });
  const tabListRef = useRef<HTMLDivElement | null>(null);
  const tabsRef = useRef<HTMLButtonElement[] | null>(null);
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
        {...remainingProps}
        {...addClasses()}
        aria-orientation={orientation}
        ref={tabListRef}
        role="tablist"
      >
        {children}
      </div>
    </TabListProvider>
  );
};

export default TabList;
