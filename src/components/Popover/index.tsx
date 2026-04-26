import { FC, PropsWithChildren } from 'react';

import { Button } from '@components';
import PopoverRoot, { PopoverRootProps } from './PopoverRoot';
import PopoverBody, { PopoverBodyProps } from './PopoverBody';
import PopoverCloseButton from './PopoverCloseButton';
import PopoverContent, { PopoverContentProps } from './PopoverContent';
import PopoverFooter, { PopoverFooterProps } from './PopoverFooter';
import PopoverHeader, { PopoverHeaderProps } from './PopoverHeader';
import PopoverTrigger, { PopoverTriggerProps } from './PopoverTrigger';

interface PopoverComponent {
  Root: FC<PropsWithChildren<PopoverRootProps>>;
  Body: FC<PropsWithChildren<PopoverBodyProps>>;
  CloseButton: FC<Parameters<typeof Button>[0]>;
  Content: FC<PropsWithChildren<PopoverContentProps>>;
  Footer: FC<PropsWithChildren<PopoverFooterProps>>;
  Header: FC<PropsWithChildren<PopoverHeaderProps>>;
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
