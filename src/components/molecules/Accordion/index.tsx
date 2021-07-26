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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const accordionButtonIndex = Number(
      // @ts-ignore
      e.target.attributes.getNamedItem('data-snui-accordion-button-index')
        ?.nodeValue
    );

    if (e.key === 'ArrowUp') {
      if (accordionButtonIndex === 0) {
        buttonsRef.current![buttonsRef.current!.length - 1].focus();
      } else {
        buttonsRef.current![accordionButtonIndex - 1].focus();
      }
    } else if (e.key === 'ArrowDown') {
      const lastButtonIndex = buttonsRef.current!.length - 1;

      if (accordionButtonIndex === lastButtonIndex) {
        buttonsRef.current![0].focus();
      } else {
        buttonsRef.current![accordionButtonIndex + 1].focus();
      }
    } else if (e.key === 'Home') {
      if (accordionButtonIndex !== 0) {
        buttonsRef.current![0].focus();
      }
    } else if (e.key === 'End') {
      const lastButtonIndex = buttonsRef.current!.length - 1;

      if (accordionButtonIndex !== lastButtonIndex) {
        buttonsRef.current![lastButtonIndex].focus();
      }
    }
  };

  return (
    <AccordionProvider value={contextValue}>
      <div
        className={classes}
        id={accordionId}
        onKeyDown={handleKeyDown}
        ref={accordionRef}
      >
        {children}
      </div>
    </AccordionProvider>
  );
};

export default Accordion;
