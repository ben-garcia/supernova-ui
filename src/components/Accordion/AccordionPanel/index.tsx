import React, { FC, PropsWithChildren } from 'react';

import {
  useAccordionItem,
  useAccordionProvider,
  useCSSAndPseudoClassProps,
} from '@hooks';
import { SupernovaProps } from '@types';
import './styles.scss';

export interface AccordionPanelProps
  extends FC<PropsWithChildren>, SupernovaProps {}

/**
 * Holds the main content for each accordion.
 */
const AccordionPanel: AccordionPanelProps = props => {
  const { children, ...rest } = props;
  const addCSSClasses = useCSSAndPseudoClassProps(
    rest,
    'snui snui-accordion__panel'
  );
  const { getAccordionPanelProps } = useAccordionProvider(rest);
  const { accordionButtonId, accordionPanelId, isOpen } = useAccordionItem();

  return (
    <div
      className={`snui-accordion__inner${
        isOpen ? ' snui-accordion__inner--expanded' : ''
      }`}
    >
      <div
        {...addCSSClasses()}
        {...getAccordionPanelProps()}
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
