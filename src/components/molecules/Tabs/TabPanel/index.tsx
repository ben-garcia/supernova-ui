import React, { FC, useEffect, useMemo, useRef, useState } from 'react';

import {
  useClassStyles,
  useCreateClassString,
  usePseudoClasses,
  useTabs,
  useValidateProps,
} from '@hooks';
import { isString } from '@utils';

import { SupernovaProps } from '@types';

interface TabPanelProps extends SupernovaProps {}

/**
 * Wrapper that holds the content associated with a Tab.
 */
const TabPanel: FC<TabPanelProps> = props => {
  const { children, className, ...rest } = props;
  const {
    remainingProps,
    validatedCSSProps,
    validatedPseudoClassProps,
  } = useValidateProps(rest);
  const pseudoClassName = usePseudoClasses(validatedPseudoClassProps);
  const stylesClassName = useClassStyles(validatedCSSProps);
  const addClasses = useCreateClassString('snui snui-tabs__tab-panel', {
    [`${className}`]: isString(className),
    [`${pseudoClassName}`]: isString(pseudoClassName),
    [`${stylesClassName}`]: isString(stylesClassName),
  });
  const { activeIndex, tabsId } = useTabs();
  const tabPanelRef = useRef<HTMLDivElement | null>(null);
  const [isActive, setIsActive] = useState(false);
  const tabPanelId = useMemo(() => {
    if (tabPanelRef?.current) {
      let index = Number(
        tabPanelRef.current.getAttribute('data-snui-tab-panel-index')
      );
      // eslint-disable-next-line no-plusplus
      return `${tabsId}__tab-panel-${++index}`;
    }
    return undefined;
  }, [tabPanelRef?.current]);

  useEffect(() => {
    if (tabPanelRef?.current) {
      // set timeout is required to work correctly
      // otherwise all panels get display of block
      setTimeout(() => {
        const index = Number(
          tabPanelRef.current?.getAttribute('data-snui-tab-panel-index')
        );
        if (activeIndex === index) {
          setIsActive(true);
        }
      }, 0);
    }
  }, [tabPanelRef?.current]);

  useEffect(() => {
    // set timeout is required to work correctly
    setTimeout(() => {
      const index = Number(
        tabPanelRef.current?.getAttribute('data-snui-tab-panel-index')
      );

      if (index === activeIndex) {
        setIsActive(true);
      } else if (isActive) {
        setIsActive(false);
      }
    }, 0);
  }, [activeIndex]);

  return (
    <div
      {...remainingProps}
      {...addClasses()}
      aria-describedby={
        tabPanelId
          ? `${tabsId}__tab-${tabPanelId[tabPanelId.length - 1]}`
          : undefined
      }
      id={tabPanelId}
      ref={tabPanelRef}
      role="tabpanel"
      style={{
        display: isActive ? 'block' : 'none',
      }}
    >
      {children}
    </div>
  );
};

export default TabPanel;
