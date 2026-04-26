import { FC, ForwardRefExoticComponent, PropsWithChildren } from 'react';

import { Button, Overlay } from '@components';
import DrawerRoot, { DrawerRootProps } from './DrawerRoot';
import DrawerBody, { DrawerBodyProps } from './DrawerBody';
import DrawerButton, { DrawerButtonProps } from './DrawerButton';
import DrawerCloseButton from './DrawerCloseButton';
import DrawerContent, { DrawerContentProps } from './DrawerContent';
import DrawerFooter, { DrawerFooterProps } from './DrawerFooter';
import DrawerHeader, { DrawerHeaderProps } from './DrawerHeader';
import DrawerOverlay from './DrawerOverlay';

interface DrawerComponent {
  /**
   * The container for all Drawer related components
   * that provides context to its children.
   */
  Root: FC<PropsWithChildren<DrawerRootProps>>;
  /**
   * The wrapper for the main content of the Drawer.
   */
  Body: FC<PropsWithChildren<DrawerBodyProps>>;
  /**
   * The button for the Drawer component.
   */
  Button: ForwardRefExoticComponent<DrawerButtonProps>;
  /**
   * The close button for the Drawer component.
   */
  CloseButton: FC<Parameters<typeof Button>[0]>;
  /**
   * The container for Drawer related components.
   */
  Content: FC<PropsWithChildren<DrawerContentProps>>;
  /**
   * The wrapper for the footer content of the Drawer.
   */
  Footer: FC<PropsWithChildren<DrawerFooterProps>>;
  /**
   * The wrapper for the header content of the Drawer.
   */
  Header: FC<PropsWithChildren<DrawerHeaderProps>>;
  /**
   * The overlay for the Drawer component.
   */
  Overlay: FC<Parameters<typeof Overlay>[0]>;
}

const Drawer: DrawerComponent = {
  Root: DrawerRoot,
  Body: DrawerBody,
  Button: DrawerButton,
  CloseButton: DrawerCloseButton,
  Content: DrawerContent,
  Footer: DrawerFooter,
  Header: DrawerHeader,
  Overlay: DrawerOverlay,
};

export default Drawer;
