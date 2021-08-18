/* eslint jsx-a11y/no-static-element-interactions: 0 */
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { AccordionProvider } from '../../../contexts';
import { AccordionProps } from './types';
import { useAccordionProvider } from '../../../hooks/use-accordion';
import { useUniqueId } from '../../../hooks';
import { createClasses, isString } from '../../../utils';

const Accordion: React.FC<AccordionProps> = props => {
  const {
    allowMultiple = false,
    allowToggle = false,
    children,
    className,
    defaultIndices = [],
  } = props;
  const classes = createClasses('snui-accordion', {
    [`${className}`]: isString(className),
  });
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
  // const accordionId = useMemo(() => `snui-accordion-${Math.random()}`, []);
  const accordionId = useUniqueId('snui-accordion');
  const context = useAccordionProvider(props);
  const [updatedButtonsRef, setUpdatedButtonsRef] = useState(false);

  useEffect(() => {
    // check for all the buttons children of the accordion node
    const updateFocusableButtons = () => {
      setUpdatedButtonsRef(true);

      (buttonsRef as any).current = accordionRef!.current!.querySelectorAll(
        'button'
      );
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
      if (defaultIndices.includes(index)) {
        el.click();
      }
    });
  }, [defaultIndices]);

  useEffect(() => {
    if (buttonsRef?.current) {
      buttonsRef.current.forEach(el => {
        const isExpanded = el.getAttribute('aria-expanded') === 'true';
        const buttonIndex = Number(
          el.getAttribute('data-snui-accordion-button-index')
        );

        if (isExpanded && !activeIndices.includes(buttonIndex)) {
          el.click();
        }
      });
    }
  }, [buttonsRef?.current, activeIndices]);

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
      <div className={classes} id={accordionId} ref={accordionRef}>
        {children}
      </div>
    </AccordionProvider>
  );
};

export default Accordion;
