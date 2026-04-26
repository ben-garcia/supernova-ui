import { FC, PropsWithChildren } from 'react';
import AccordionRoot from './AccordionRoot';
import { AccordionRootProps } from './types';
import AccordionHeaderButton, {
  AccordionHeaderButtonProps,
} from './AccordionHeaderButton';
import AccordionItem, { AccordionItemProps } from './AccordionItem';
import AccordionPanel, { AccordionPanelProps } from './AccordionPanel';

interface AccordionComponent {
  /**
   * The container for all Accordion related components
   * that provides context for all AccordionItem.
   */
  Root: FC<PropsWithChildren<AccordionRootProps>>;
  /**
   * A button used to open/close the AccordionItem.
   */
  HeaderButton: FC<AccordionHeaderButtonProps>;
  /**
   * A single accordion that provides context to AccordionButton and AccordionPanel.
   */
  Item: AccordionItemProps;
  /**
   * Holds the main content for each accordion.
   */
  Panel: AccordionPanelProps;
}

const Accordion: AccordionComponent = {
  Root: AccordionRoot,
  HeaderButton: AccordionHeaderButton,
  Item: AccordionItem,
  Panel: AccordionPanel,
};

export default Accordion;
