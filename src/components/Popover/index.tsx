import { FC, PropsWithChildren } from 'react';

import Button from '@components/Button';
import PopoverRoot, { PopoverRootProps } from './PopoverRoot';
import PopoverBody, { PopoverBodyProps } from './PopoverBody';
import PopoverCloseButton from './PopoverCloseButton';
import PopoverContent, { PopoverContentProps } from './PopoverContent';
import PopoverFooter, { PopoverFooterProps } from './PopoverFooter';
import PopoverHeader, { PopoverHeaderProps } from './PopoverHeader';
import PopoverTrigger, { PopoverTriggerProps } from './PopoverTrigger';

interface PopoverComponent {
  /**
   * The container for all Popover related components
   * that provides context to its children.
   */
  Root: FC<PropsWithChildren<PopoverRootProps>>;
  /**
   * The wrapper for the main content of the Popover.
   */
  Body: FC<PropsWithChildren<PopoverBodyProps>>;
  /**
   * The close button for the Popover component.
   */
  CloseButton: FC<Parameters<typeof Button>[0]>;
  /**
   * The container for Popover related components.
   */
  Content: FC<PropsWithChildren<PopoverContentProps>>;
  /**
   * The wrapper for the footer content of the Popover component.
   */
  Footer: FC<PropsWithChildren<PopoverFooterProps>>;
  /**
   * The wrapper for the header content of the Popover component.
   */
  Header: FC<PropsWithChildren<PopoverHeaderProps>>;
  /**
   * The wrapper for the trigger Popover component.
   */
  Trigger: FC<PropsWithChildren<PopoverTriggerProps>>;
}

const Popover: PopoverComponent = {
  Root: PopoverRoot,
  Body: PopoverBody,
  CloseButton: PopoverCloseButton,
  Content: PopoverContent,
  Footer: PopoverFooter,
  Header: PopoverHeader,
  Trigger: PopoverTrigger,
};

export default Popover;
