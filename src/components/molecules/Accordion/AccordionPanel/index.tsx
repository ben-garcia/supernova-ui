import React from 'react';

import {
  useAccordionItem,
  useAccordionProvider,
  useClassStyles,
  useCreateClassString,
  usePseudoClasses,
  useValidateProps,
} from '@hooks';
import { isString } from '@utils';

import { SupernovaProps } from '@types';
import './styles.scss';

interface AccordionPanelProps extends SupernovaProps {}

/**
 * Holds the main content for each accordion.
 */
const AccordionPanel: React.FC<AccordionPanelProps> = props => {
  const { children, className, ...rest } = props;
  const {
    remainingProps,
    validatedCSSProps,
    validatedPseudoClassProps,
  } = useValidateProps(rest);
  const pseudoClassName = usePseudoClasses(validatedPseudoClassProps);
  const stylesClassName = useClassStyles(validatedCSSProps);
  const addClasses = useCreateClassString('snui snui-accordion__panel', {
    [`${className}`]: isString(className),
    [`${pseudoClassName}`]: isString(pseudoClassName),
    [`${stylesClassName}`]: isString(stylesClassName),
  });
  const { getAccordionPanelProps } = useAccordionProvider(rest);
  const { accordionButtonId, accordionPanelId, isOpen } = useAccordionItem();

  return (
    <div
      className={`snui-accordion__inner${
        isOpen ? ' snui-accordion__inner--expanded' : ''
      }`}
    >
      <div
        {...remainingProps}
        {...addClasses()}
        {...getAccordionPanelProps(remainingProps)}
        aria-labelledby={accordionButtonId}
        id={accordionPanelId}
        role="region"
      >
        {children}
      </div>
    </div>
  );
};

export default AccordionPanel;
