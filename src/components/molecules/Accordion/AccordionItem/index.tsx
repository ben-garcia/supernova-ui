import React, { FC, useMemo } from 'react';

import { AccordionItemProvider } from '@contexts';
import {
  useAccordionItemProvider,
  useAccordion,
  useClassStyles,
  useCreateClassString,
  usePseudoClasses,
  useUniqueIds,
  useValidateProps,
} from '@hooks';
import { isString } from '@utils';

import { SupernovaProps } from '@types';

interface AccordionItemProps extends SupernovaProps {}

/**
 * A single accordion that provides context to AccordionButton and AccordionPanel.
 */
const AccordionItem: FC<AccordionItemProps> = props => {
  const { children, className, ...rest } = props;
  const {
    remainingProps,
    validatedCSSProps,
    validatedPseudoClassProps,
  } = useValidateProps(rest);
  const pseudoClassName = usePseudoClasses(validatedPseudoClassProps);
  const stylesClassName = useClassStyles(validatedCSSProps);
  const addClasses = useCreateClassString('snui snui-accordion__item', {
    [`${className}`]: isString(className),
    [`${pseudoClassName}`]: isString(pseudoClassName),
    [`${stylesClassName}`]: isString(stylesClassName),
  });
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

  return (
    <AccordionItemProvider value={contextValue}>
      <div
        {...remainingProps}
        {...addClasses()}
        {...getAccordionItemProps(rest)}
      >
        {children}
      </div>
    </AccordionItemProvider>
  );
};

export default AccordionItem;
