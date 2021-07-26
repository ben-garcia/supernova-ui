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
import { createClasses, isString } from '../../../utils';

const Accordion: React.FC<AccordionProps> = props => {
  const {
    allowMultiple = false,
    allowToggle = false,
    children,
    className,
    defaultIndex = [],
  } = props;
  const classes = createClasses('snui-accordion', {
    [`${className}`]: isString(className),
  });
  const accordionRef = useRef<HTMLDivElement | null>(null);
  const buttonsRef = useRef<HTMLButtonElement[]>(null);
  const [activeIndices, setActiveIndicesState] = useState(defaultIndex);
  const setActiveIndices = useCallback((newIndex: number[]) => {
    setActiveIndicesState(newIndex);
  }, []);
  const accordionId = useMemo(() => `sniu-accordion-${Math.random()}`, []);
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

  useEffect(() => {
    if (buttonsRef?.current) {
      buttonsRef.current.forEach((el, index) => {
        // add data attibute to all the buttons
        el.setAttribute('data-snui-accordion-button-index', `${index}`);
      });
    }
  }, [buttonsRef?.current]);

  useEffect(() => {
    if (buttonsRef?.current && !allowMultiple) {
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
      activeIndices,
      allowMultiple,
      allowToggle,
      buttonsRef: buttonsRef?.current,
      setActiveIndices,
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
