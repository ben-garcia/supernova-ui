import { useCallback, useContext, useMemo, useState } from 'react';

import { AccordionContext, AccordionItemContext } from '../contexts/accordion';
import { AccordionProps } from '../components/molecules/Accordion/types';

/**
 * Hook that returns the Accordion props
 */
const useAccordionProvider = (props: Omit<AccordionProps, 'children'>) => {
  const { defaultIndices = [] } = props;

  const id = useMemo(() => `snui-accordion-${Math.random()}`, []);
  const [activeIndices, setActiveIndicesFunction] = useState<number[]>(
    defaultIndices
  );

  const getAccordionPanelProps = useCallback(
    (accordionItemProps = {}) => ({
      ...accordionItemProps,
    }),
    [id]
  );

  const setActiveIndices = useCallback((newIndex: number[]) => {
    setActiveIndicesFunction(newIndex);
  }, []);

  return {
    activeIndices,
    getAccordionPanelProps,
    setActiveIndices,
  };
};

/**
 * Hook that returns the Accordion Item props
 */
const useAccordionItemProvider = () => {
  const [isOpen, setIsOpen] = useState(false);

  const getAccordionButtonProps = useCallback(
    (accordionButtonProps = {}) => ({
      ...accordionButtonProps,
    }),
    []
  );

  const getAccordionItemProps = useCallback(
    (accordionItemProps = {}) => ({
      ...accordionItemProps,
    }),
    []
  );
  const onClose = useCallback(() => setIsOpen(false), []);
  const onOpen = useCallback(() => setIsOpen(true), []);

  return {
    getAccordionButtonProps,
    getAccordionItemProps,
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
