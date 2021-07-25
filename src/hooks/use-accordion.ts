import { useCallback, useContext, useMemo, useState } from 'react';

import { AccordionContext, AccordionItemContext } from '../contexts/accordion';
import { AccordionProps } from '../components/molecules/Accordion/types';
import { AccordionItemProps } from '../components/molecules/Accordion/AccordionItem';
import { isString } from '../utils';

/**
 * Hook that returns the Accordion props
 */
const useAccordionProvider = (props: Omit<AccordionProps, 'children'>) => {
  const { defaultIndex = [] } = props;

  const id = useMemo(() => `snui-accordion-${Math.random()}`, []);
  const [activeIndex, setActiveIndexFunction] = useState<number[]>(
    defaultIndex
  );

  const getAccordionButtonProps = useCallback(
    (accordionButtonProps = {}) => ({
      ...accordionButtonProps,
      id: `${id}__button-${Math.random()}`,
    }),
    [id]
  );
  const getAccordionPanelProps = useCallback(
    (accordionItemProps = {}) => ({
      ...accordionItemProps,
      id: `${id}__panel-${Math.random()}`,
    }),
    [id]
  );

  const setActiveIndex = useCallback((newIndex: number[]) => {
    setActiveIndexFunction(newIndex);
  }, []);

  return {
    activeIndex,
    getAccordionButtonProps,
    getAccordionPanelProps,
    setActiveIndex,
  };
};

/**
 * Hook that returns the Accordion Item props
 */
const useAccordionItemProvider = (
  props: Omit<AccordionItemProps, 'children'>
) => {
  const { id: propId } = props;
  const [isOpen, setIsOpen] = useState(false);

  const id = useMemo(
    () =>
      isString(propId)
        ? (propId as string)
        : `snui-accordion-item-${Math.random()}`,
    []
  );

  const getAccordionItemProps = useCallback(
    (accordionItemProps = {}) => ({
      ...accordionItemProps,
      id: `${id}__item-${Math.random()}`,
    }),
    []
  );
  const onClose = useCallback(() => setIsOpen(false), []);
  const onOpen = useCallback(() => setIsOpen(true), []);

  return {
    getAccordionItemProps,
    id,
    isOpen,
    onClose,
    onOpen,
  };
};

/**
 * Hook that returns all accordion props
 */
const useAccordion = () => {
  const context = useContext(AccordionContext);

  if (!context) {
    throw new Error(
      'useAccordion: context is undefined, did you remember to wrap your components in a pair of <Accordion>'
    );
  }

  return context;
};

const useAccordionItem = () => {
  const context = useContext(AccordionItemContext);

  if (!context) {
    throw new Error(
      'useAccordionItem: context is undefined, did you remember to wrap your components in a pair of <AccordionItem>'
    );
  }

  return context;
};

export {
  useAccordionProvider,
  useAccordionItemProvider,
  useAccordion,
  useAccordionItem,
};
