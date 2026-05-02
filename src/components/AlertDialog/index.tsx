import { FC, ForwardRefExoticComponent, PropsWithChildren } from 'react';

import Button from '@components/Button';
import Overlay from '@components/Overlay';
import AlertDialogRoot, { AlertDialogRootProps } from './AlertDialogRoot';
import AlertDialogBody, { AlertDialogBodyProps } from './AlertDialogBody';
import AlertDialogButton, { AlertDialogButtonProps } from './AlertDialogButton';
import AlertDialogCloseButton from './AlertDialogCloseButton';
import AlertDialogContent, {
  AlertDialogContentProps,
} from './AlertDialogContent';
import AlertDialogFooter, { AlertDialogFooterProps } from './AlertDialogFooter';
import AlertDialogHeader, { AlertDialogHeaderProps } from './AlertDialogHeader';
import AlertDialogOverlay from './AlertDialogOverlay';

interface AlertDialogComponent {
  /**
   * The container for all AlertDialog related components
   * that provides context to its children.
   */
  Root: FC<PropsWithChildren<AlertDialogRootProps>>;
  /**
   * The wrapper for the header content of the AlertDialog.
   */
  Body: FC<PropsWithChildren<AlertDialogBodyProps>>;
  /**
   * The button for the AlertDialog component.
   */
  Button: ForwardRefExoticComponent<AlertDialogButtonProps>;
  /**
   * The close button for the Popover component.
   */
  CloseButton: FC<Parameters<typeof Button>[0]>;
  /**
   * The container for AlertDialog related components.
   */
  Content: FC<PropsWithChildren<AlertDialogContentProps>>;
  /**
   * The wrapper for the footer content of the AlertDialog.
   */
  Footer: FC<PropsWithChildren<AlertDialogFooterProps>>;
  /**
   * The wrapper for the header content of the AlertDialog.
   */
  Header: FC<PropsWithChildren<AlertDialogHeaderProps>>;
  /**
   * The overlay for the AlertDialog component.
   */
  Overlay: FC<Parameters<typeof Overlay>[0]>;
}

const AlertDialog: AlertDialogComponent = {
  Root: AlertDialogRoot,
  Body: AlertDialogBody,
  Button: AlertDialogButton,
  CloseButton: AlertDialogCloseButton,
  Content: AlertDialogContent,
  Footer: AlertDialogFooter,
  Header: AlertDialogHeader,
  Overlay: AlertDialogOverlay,
};

export default AlertDialog;
