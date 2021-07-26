import React, { useMemo } from 'react';

import { AccordionItemProvider } from '../../../../contexts/accordion';
import {
  useAccordionItemProvider,
  useAccordion,
} from '../../../../hooks/use-accordion';
import { createClasses, isString } from '../../../../utils';

export interface AccordionItemProps {
  className?: string;
  id?: string;
}

const AccordionItem: React.FC<AccordionItemProps> = props => {
  const { children, className, ...rest } = props;
  const classes = createClasses('snui-accordion__item', {
    [`${className}`]: isString(className),
  });
  const context = useAccordionItemProvider(props);
  const { getAccordionItemProps } = useAccordionItemProvider(rest);
  const { accordionId } = useAccordion();
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = React.useCallback(() => setIsOpen(false), []);
  const onOpen = React.useCallback(() => setIsOpen(true), []);
  const accordionButtonId = useMemo(
    () => `${accordionId}__button-${Math.random()}`,
    []
  );
  const accordionPanelId = useMemo(
    () => `${accordionId}__panel-${Math.random()}`,
    []
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

  return (
    <AccordionItemProvider value={contextValue}>
      <div {...rest} className={classes} {...getAccordionItemProps(rest)}>
        {children}
      </div>
    </AccordionItemProvider>
  );
};

export default AccordionItem;
