import React, { FC, useEffect, useRef } from 'react';

import {
  useClassStyles,
  useCreateClassString,
  usePseudoClasses,
  useValidateProps,
} from '@hooks';
import { isString } from '@utils';

import { SupernovaProps } from '@types';
import './styles.scss';

interface TabPanelListProps extends SupernovaProps {}

/**
 * The wrapper for all TabPanel components
 */
const TabPanelList: FC<TabPanelListProps> = props => {
  const { children, className, ...rest } = props;
  const {
    remainingProps,
    validatedCSSProps,
    validatedPseudoClassProps,
  } = useValidateProps(rest);
  const pseudoClassName = usePseudoClasses(validatedPseudoClassProps);
  const stylesClassName = useClassStyles(validatedCSSProps);
  const tabPanelListRef = useRef<HTMLDivElement | null>(null);
  const addClasses = useCreateClassString('snui snui-tabs__tab-panel-list', {
    [`${className}`]: isString(className),
    [`${pseudoClassName}`]: isString(pseudoClassName),
    [`${stylesClassName}`]: isString(stylesClassName),
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
    <div {...remainingProps} {...addClasses()} ref={tabPanelListRef}>
      {children}
    </div>
  );
};

export default TabPanelList;
