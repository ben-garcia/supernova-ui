import { FC, PropsWithChildren } from 'react';
import AccordionRoot from './AccordionRoot';
import { AccordionRootProps } from './types';
import AccordionHeaderButton, {
  AccordionHeaderButtonProps,
} from './AccordionHeaderButton';
import AccordionItem, { AccordionItemProps } from './AccordionItem';
import AccordionPanel, { AccordionPanelProps } from './AccordionPanel';

interface AccordionComponent {
  Root: FC<PropsWithChildren<AccordionRootProps>>;
  HeaderButton: FC<AccordionHeaderButtonProps>;
  Item: AccordionItemProps;
  Panel: AccordionPanelProps;
}

const Accordion: AccordionComponent = {
  Root: AccordionRoot,
  HeaderButton: AccordionHeaderButton,
  Item: AccordionItem,
  Panel: AccordionPanel,
};

export default Accordion;
