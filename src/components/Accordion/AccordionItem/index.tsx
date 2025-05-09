import React, { FC, useMemo } from 'react';

import { AccordionItemProvider } from '@contexts';
import {
  useAccordionItemProvider,
  useAccordion,
  useCSSAndPseudoClassProps,
  useUniqueIds,
} from '@hooks';
import { SupernovaProps } from '@types';

interface AccordionItemProps extends SupernovaProps {}

/**
 * A single accordion that provides context to AccordionButton and AccordionPanel.
 */
const AccordionItem: FC<AccordionItemProps> = props => {
  const { children, ...rest } = props;
  const addCSSClasses = useCSSAndPseudoClassProps(
    rest,
    'snui snui-accordion__item'
  );
  const context = useAccordionItemProvider();
  const { getAccordionItemProps } = useAccordionItemProvider();
  const { accordionId } = useAccordion();
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = React.useCallback(() => setIsOpen(false), []);
  const onOpen = React.useCallback(() => setIsOpen(true), []);
  const [accordionButtonId, accordionPanelId] = useUniqueIds(
    accordionId,
    'button',
    'panel'
  );

  const contextValue = useMemo(
    () => ({
      ...context,
      accordionButtonId,
      accordionPanelId,
      isOpen,
      onClose,
      onOpen,
    }),
    [context]
  );
  console.log(children);

  return (
    <AccordionItemProvider value={contextValue}>
      <div {...addCSSClasses()} {...getAccordionItemProps()}>
        {children}
      </div>
    </AccordionItemProvider>
  );
};

export default AccordionItem;
