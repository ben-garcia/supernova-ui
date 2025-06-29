import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { AccordionProvider } from '@contexts';
import {
  useAccordionProvider,
  useCSSAndPseudoClassProps,
  useUniqueId,
} from '@hooks';
import { isArray } from '@utils';
import { AccordionProps } from './types';

/**
 * The container for all Accordion related components
 * that provides context for all AccordionItem.
 */
const Accordion: FC<AccordionProps> = props => {
  const {
    allowMultiple = false,
    allowToggle = false,
    children,
    defaultIndices = [],
    ...rest
  } = props;
  const addCSSClasses = useCSSAndPseudoClassProps(rest, 'snui snui-accordion');
  const accordionRef = useRef<HTMLDivElement | null>(null);
  const buttonsRef = useRef<HTMLButtonElement[]>(null);
  const [activeIndices, setActiveIndicesState] = useState(defaultIndices);
  const [focusedIndex, setFocusedIndexState] = useState(-1);
  const setActiveIndices = useCallback((newIndex: number[]) => {
    setActiveIndicesState(newIndex);
  }, []);
  const setFocusedIndex = useCallback((newIndex: number) => {
    setFocusedIndexState(newIndex);
  }, []);
  const accordionId = useUniqueId('snui-accordion');
  const context = useAccordionProvider(props);
  const [updatedButtonsRef, setUpdatedButtonsRef] = useState(false);

  useEffect(() => {
    // check for all the buttons children of the accordion node
    const updateFocusableButtons = () => {
      setUpdatedButtonsRef(true);

      (buttonsRef as any).current =
        accordionRef!.current!.querySelectorAll('button');
    };
    const observer = new MutationObserver(() => {
      updateFocusableButtons();
    });

    updateFocusableButtons();

    observer.observe(accordionRef.current as Node, { childList: true });

    return () => {
      observer.disconnect();
    };
  }, [accordionRef]);

  // add data attribute to all the buttons
  useEffect(() => {
    if (buttonsRef?.current) {
      buttonsRef.current.forEach((el, index) => {
        el.setAttribute('data-snui-accordion-button-index', `${index}`);
      });
    }
  }, [buttonsRef?.current]);

  // open panels when defaultIndices prop is passed.
  useEffect(() => {
    buttonsRef?.current?.forEach((el, index) => {
      if (isArray(defaultIndices)) {
        if (defaultIndices.includes(index)) {
          el.click();
        }
      }
    });
  }, [props]);

  useEffect(() => {
    if (buttonsRef?.current) {
      buttonsRef.current.forEach(el => {
        const isExpanded = el.getAttribute('aria-expanded') === 'true';
        const buttonIndex = Number(
          el.getAttribute('data-snui-accordion-button-index')
        );

        if (isArray(defaultIndices)) {
          if (isExpanded && !activeIndices.includes(buttonIndex)) {
            el.click();
          }
        }
      });
    }
  }, [buttonsRef?.current, activeIndices, props]);

  const contextValue = useMemo(
    () => ({
      ...context,
      accordionId,
      activeIndices,
      allowMultiple,
      allowToggle,
      buttonsRef: buttonsRef?.current,
      defaultIndices,
      focusedIndex,
      setActiveIndices,
      setFocusedIndex,
    }),
    [context, updatedButtonsRef]
  );

  return (
    <AccordionProvider value={contextValue}>
      <div {...addCSSClasses()} id={accordionId} ref={accordionRef}>
        {children}
      </div>
    </AccordionProvider>
  );
};

export default Accordion;
