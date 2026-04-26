import { FC, ForwardRefExoticComponent, PropsWithChildren } from 'react';

import { Button, Overlay } from '@components';
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
  Root: FC<PropsWithChildren<AlertDialogRootProps>>;
  Body: FC<PropsWithChildren<AlertDialogBodyProps>>;
  Button: ForwardRefExoticComponent<AlertDialogButtonProps>;
  CloseButton: FC<Parameters<typeof Button>[0]>;
  Content: FC<PropsWithChildren<AlertDialogContentProps>>;
  Footer: FC<PropsWithChildren<AlertDialogFooterProps>>;
  Header: FC<PropsWithChildren<AlertDialogHeaderProps>>;
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
