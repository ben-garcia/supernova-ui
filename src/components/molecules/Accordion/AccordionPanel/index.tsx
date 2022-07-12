import React from 'react';

import { useAccordionItem, useAccordionProvider } from '@hooks';
import { createClasses, isString } from '@utils';

import './styles.scss';

interface AccordionPanelProps {
  className?: string;
}

/**
 * Holds the main content for each accordion.
 */
const AccordionPanel: React.FC<AccordionPanelProps> = props => {
  const { children, className, ...rest } = props;
  const classes = createClasses('snui-accordion__panel', {
    [`${className}`]: isString(className),
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
        {...rest}
        {...getAccordionPanelProps(rest)}
        aria-labelledby={accordionButtonId}
        className={classes}
        id={accordionPanelId}
        role="region"
      >
        {children}
      </div>
    </div>
  );
};

export default AccordionPanel;
