import React, { FC, useCallback, useEffect, useRef, useState } from 'react';

import {
  useClassStyles,
  useCreateClassString,
  usePseudoClasses,
  useTabList,
  useTabs,
  useTheme,
  useValidateProps,
} from '@hooks';
import { isString } from '@utils';

import { SupernovaProps } from '@types';
import './styles.scss';

interface TabProps extends SupernovaProps {}

/**
 * Tab button used to activate a specific TabPanel
 */
const Tab: FC<TabProps> = props => {
  const { children, className, ...rest } = props;
  const {
    remainingProps,
    validatedCSSProps,
    validatedPseudoClassProps,
  } = useValidateProps(rest);
  const pseudoClassName = usePseudoClasses(validatedPseudoClassProps);
  const stylesClassName = useClassStyles(validatedCSSProps);
  const { tabsRef } = useTabList();
  const {
    activeColor,
    activeIndex,
    focusedIndex,
    isFitted,
    isManual,
    numberOfTabs,
    orientation,
    setActiveIndex,
    setFocusedIndex,
    size,
    tabsId,
  } = useTabs();
  const addClasses = useCreateClassString('snui snui-tabs__tab', {
    [`${className}`]: isString(className),
    [`snui-tabs__tab--${size}`]: true,
    [`snui-tabs__tab--${orientation}`]: true,
    'snui-tabs__tab--fitted': isFitted,
    [`${pseudoClassName}`]: isString(pseudoClassName),
    [`${stylesClassName}`]: isString(stylesClassName),
  });
  const tabRef = useRef<HTMLButtonElement | null>(null);
  const tabId = React.useMemo(() => {
    if (tabRef?.current) {
      let index = Number(tabRef.current.getAttribute('data-snui-tab-index'));
      // eslint-disable-next-line no-plusplus
      return `${tabsId}__tab-${++index}`;
    }

    return undefined;
  }, [tabRef?.current]);
  const { colors } = useTheme();
  const [isActive, setIsActive] = useState(false);
  const [focusRingColor, setFocusRingColor] = useState('');

  useEffect(() => {
    if (tabRef?.current) {
      // set timeout is required to work correctly
      setTimeout(() => {
        const index = Number(
          tabRef.current?.getAttribute('data-snui-tab-index')
        );
        if (index === activeIndex) {
          setIsActive(true);
        }
      }, 0);
    }
  }, [tabRef?.current]);

  useEffect(() => {
    // set timeout is required to work correctly
    setTimeout(() => {
      const index = Number(tabRef.current?.getAttribute('data-snui-tab-index'));

      if (index === activeIndex) {
        setIsActive(true);
      } else if (isActive) {
        setIsActive(false);
      }
    }, 0);
  }, [activeIndex, focusedIndex]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    const { currentTarget } = e;
    const index = Number(currentTarget.getAttribute('data-snui-tab-index'));

    setActiveIndex(index);
    setFocusedIndex(index);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      // set timeout needed for the index to be defined
      setTimeout(() => {
        const { target, key } = e;
        // @ts-ignore
        const index = Number(target.getAttribute('data-snui-tab-index'));
        if (key === 'End') {
          if (isManual) {
            if (index !== numberOfTabs - 1) {
              setFocusedIndex(numberOfTabs - 1);
              // @ts-ignore
              tabsRef[numberOfTabs - 1].focus();
            }
          } else if (index !== numberOfTabs - 1) {
            setActiveIndex(numberOfTabs - 1);
            setFocusedIndex(numberOfTabs - 1);
            // @ts-ignore
            tabsRef[numberOfTabs - 1].focus();
          }
        } else if (key === 'Home') {
          if (isManual) {
            if (index !== 0) {
              setFocusedIndex(0);
              // @ts-ignore
              tabsRef[0].focus();
            }
          } else if (index !== 0) {
            setActiveIndex(0);
            setFocusedIndex(0);
            // @ts-ignore
            tabsRef[0].focus();
          }
        } else if (key === 'ArrowDown') {
          if (orientation === 'vertical') {
            if (isManual) {
              if (index === numberOfTabs - 1) {
                setFocusedIndex(0);
                // @ts-ignore
                tabsRef[0].focus();
              } else {
                setFocusedIndex(index + 1);
                // @ts-ignore
                tabsRef[index + 1].focus();
              }
            } else if (index === numberOfTabs - 1) {
              setActiveIndex(0);
              setFocusedIndex(0);
              // @ts-ignore
              tabsRef[0].focus();
            } else {
              setActiveIndex(index + 1);
              setFocusedIndex(index + 1);
              // @ts-ignore
              tabsRef[index + 1].focus();
            }
          }
        } else if (key === 'ArrowLeft') {
          if (orientation === 'horizontal') {
            if (isManual) {
              if (index === 0) {
                setFocusedIndex(numberOfTabs - 1);
                // @ts-ignore
                tabsRef[numberOfTabs - 1].focus();
              } else {
                setFocusedIndex(index - 1);
                // @ts-ignore
                tabsRef[index - 1].focus();
              }
            } else if (index === 0) {
              setActiveIndex(numberOfTabs - 1);
              setFocusedIndex(numberOfTabs - 1);
              // @ts-ignore
              tabsRef[numberOfTabs - 1].focus();
            } else {
              setActiveIndex(index - 1);
              setFocusedIndex(index - 1);
              // @ts-ignore
              tabsRef[index - 1].focus();
            }
          }
        } else if (key === 'ArrowRight') {
          if (orientation === 'horizontal') {
            if (isManual) {
              if (index === numberOfTabs - 1) {
                setFocusedIndex(0);
                // @ts-ignore
                tabsRef[0].focus();
              } else {
                setFocusedIndex(index + 1);
                // @ts-ignore
                tabsRef[index + 1].focus();
              }
            } else if (index === numberOfTabs - 1) {
              setActiveIndex(0);
              setFocusedIndex(0);
              // @ts-ignore
              tabsRef[0].focus();
            } else {
              setActiveIndex(index + 1);
              setFocusedIndex(index + 1);
              // @ts-ignore
              tabsRef[index + 1].focus();
            }
          }
        } else if (key === 'ArrowUp') {
          if (orientation === 'vertical') {
            if (isManual) {
              if (index === 0) {
                setFocusedIndex(numberOfTabs - 1);
                // @ts-ignore
                tabsRef[numberOfTabs - 1].focus();
              } else {
                setFocusedIndex(index - 1);
                // @ts-ignore
                tabsRef[index - 1].focus();
              }
            } else if (index === 0) {
              setActiveIndex(numberOfTabs - 1);
              setFocusedIndex(numberOfTabs - 1);
              // @ts-ignore
              tabsRef[numberOfTabs - 1].focus();
            } else {
              setActiveIndex(index - 1);
              setFocusedIndex(index - 1);
              // @ts-ignore
              tabsRef[index - 1].focus();
            }
          }
        }
      }, 0);
    },
    [activeIndex, numberOfTabs, orientation]
  );

  return (
    <button
      {...remainingProps}
      {...addClasses()}
      aria-controls={
        tabId ? `${tabsId}__tab-panel-${tabId[tabId.length - 1]}` : undefined
      }
      aria-selected={isActive ?? false}
      id={tabId}
      onBlur={() => setFocusRingColor('')}
      onClick={handleClick}
      onFocus={() => setFocusRingColor(`3px solid ${colors.focusRing}`)}
      onKeyDown={handleKeyDown}
      ref={tabRef}
      role="tab"
      style={{
        borderBottomColor:
          isActive && orientation === 'horizontal' ? activeColor : undefined,
        borderLeftColor:
          isActive && orientation === 'vertical' ? activeColor : undefined,
        outline: isString(focusRingColor) ? focusRingColor : undefined,
        outlineOffset: 2,
        color: isActive ? activeColor : undefined,
        width: isFitted ? '100%' : undefined,
      }}
      tabIndex={isActive ? 0 : -1}
      type="button"
    >
      {children}
    </button>
  );
};

export default Tab;
