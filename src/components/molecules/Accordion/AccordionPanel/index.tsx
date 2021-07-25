import React from 'react';

import {
  useAccordionProvider,
  useAccordionItem,
} from '../../../../hooks/use-accordion';
import { createClasses, isString } from '../../../../utils';
import './styles.scss';

interface AccordionPanelProps {
  className?: string;
}

const AccordionPanel: React.FC<AccordionPanelProps> = props => {
  const { children, className, ...rest } = props;
  const classes = createClasses('snui-accordion__panel', {
    [`${className}`]: isString(className),
  });
  const { getAccordionPanelProps } = useAccordionProvider(rest);
  const { isOpen } = useAccordionItem();

  return (
    <div className={isOpen ? 'snui-expanded' : 'snui-collapsed'}>
      <div {...rest} className={classes} {...getAccordionPanelProps(rest)}>
        {children}
      </div>
    </div>
  );
};

export default AccordionPanel;
