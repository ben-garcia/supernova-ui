/* eslint react/jsx-wrap-multilines: 0 */
import { Meta } from '@storybook/react';
import React, { useRef, useState } from 'react';

import AlertDialog from '.';
import AlertDialogBody from './AlertDialogBody';
import AlertDialogFooter from './AlertDialogFooter';
import AlertDialogHeader from './AlertDialogHeader';
import Button from '../../atoms/Button';

export default {
  component: AlertDialog,
  title: 'Supernova UI/Molecules/AlertDialog',
} as Meta;

export const Basic = () => {
  const [isOpen, setIsOpen] = useState(false);
  const cancelButtonRef = useRef<HTMLButtonElement | null>(null);

  return (
    <>
      <div>
        <Button onClick={() => setIsOpen(true)} margin="0 sm">
          Open
        </Button>
      </div>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelButtonRef}
        onClose={() => setIsOpen(false)}
      >
        <AlertDialogHeader>Delete your account</AlertDialogHeader>
        <AlertDialogBody>Are you sure?</AlertDialogBody>
        <AlertDialogFooter>
          <>
            <Button
              onClick={() => setIsOpen(false)}
              margin="0 sm 0 0"
              ref={cancelButtonRef}
              variant="outline"
            >
              Cancel
            </Button>

            <Button backgroundColor="error600" onClick={() => setIsOpen(false)}>
              Delete
            </Button>
          </>
        </AlertDialogFooter>
      </AlertDialog>
    </>
  );
};

export const FinalRef = () => {
  const [isOpen, setOpen] = useState(false);
  const cancelButtonRef = useRef<HTMLButtonElement | null>(null);
  const finalFocusRef = useRef<HTMLButtonElement | null>(null);

  const handleClose = () => setOpen(false);

  return (
    <>
      <div style={{ display: 'flex' }}>
        <Button onClick={() => setOpen(true)} margin="0 sm">
          Open
        </Button>

        <Button ref={finalFocusRef} variant="outline">
          finalFocusRef
        </Button>
      </div>

      <AlertDialog
        finalFocusRef={finalFocusRef}
        isOpen={isOpen}
        leastDestructiveRef={cancelButtonRef}
        onClose={handleClose}
      >
        <AlertDialogHeader>Delete your account</AlertDialogHeader>
        <AlertDialogBody>Are you sure?</AlertDialogBody>
        <AlertDialogFooter>
          <>
            <Button
              onClick={handleClose}
              margin="0 sm 0 0"
              ref={cancelButtonRef}
              variant="outline"
            >
              Cancel
            </Button>

            <Button backgroundColor="error600" onClick={handleClose}>
              Delete
            </Button>
          </>
        </AlertDialogFooter>
      </AlertDialog>
    </>
  );
};

export const Sizes = () => {
  const xsCancelButtonRef = useRef<HTMLButtonElement | null>(null);
  const smCancelButtonRef = useRef<HTMLButtonElement | null>(null);
  const mdCancelButtonRef = useRef<HTMLButtonElement | null>(null);
  const lgCancelButtonRef = useRef<HTMLButtonElement | null>(null);
  const xlCancelButtonRef = useRef<HTMLButtonElement | null>(null);
  const xxlCancelButtonRef = useRef<HTMLButtonElement | null>(null);
  const [isXsAlertDialogOpen, setIsXsAlertDialogOpen] = useState(false);
  const [isSmAlertDialogOpen, setIsSmAlertDialogOpen] = useState(false);
  const [isMdAlertDialogOpen, setIsMdAlertDialogOpen] = useState(false);
  const [isLgAlertDialogOpen, setIsLgAlertDialogOpen] = useState(false);
  const [isXlAlertDialogOpen, setIsXlAlertDialogOpen] = useState(false);
  const [isXxlAlertDialogOpen, setIsXxlAlertDialogOpen] = useState(false);

  return (
    <div style={{ display: 'flex' }}>
      <div>
        <Button onClick={() => setIsXsAlertDialogOpen(true)} margin="0 sm">
          Open xs
        </Button>

        <AlertDialog
          isOpen={isXsAlertDialogOpen}
          leastDestructiveRef={xsCancelButtonRef}
          onClose={() => setIsXsAlertDialogOpen(false)}
          size="xs"
        >
          <AlertDialogHeader>Delete your account</AlertDialogHeader>
          <AlertDialogBody>Are you sure?</AlertDialogBody>
          <AlertDialogFooter>
            <>
              <Button
                onClick={() => setIsXsAlertDialogOpen(false)}
                margin="0 sm 0 0"
                ref={xsCancelButtonRef}
                variant="outline"
              >
                Cancel
              </Button>

              <Button
                backgroundColor="error600"
                onClick={() => setIsXsAlertDialogOpen(false)}
              >
                Delete
              </Button>
            </>
          </AlertDialogFooter>
        </AlertDialog>
      </div>

      <div>
        <Button onClick={() => setIsSmAlertDialogOpen(true)} margin="0 sm">
          Open sm
        </Button>

        <AlertDialog
          isOpen={isSmAlertDialogOpen}
          leastDestructiveRef={smCancelButtonRef}
          onClose={() => setIsSmAlertDialogOpen(false)}
          size="sm"
        >
          <AlertDialogHeader>Delete your account</AlertDialogHeader>
          <AlertDialogBody>Are you sure?</AlertDialogBody>
          <AlertDialogFooter>
            <>
              <Button
                onClick={() => setIsSmAlertDialogOpen(false)}
                margin="0 sm 0 0"
                ref={smCancelButtonRef}
                variant="outline"
              >
                Cancel
              </Button>

              <Button
                backgroundColor="error600"
                onClick={() => setIsSmAlertDialogOpen(false)}
              >
                Delete
              </Button>
            </>
          </AlertDialogFooter>
        </AlertDialog>
      </div>

      <div>
        <Button onClick={() => setIsMdAlertDialogOpen(true)} margin="0 sm">
          Open md
        </Button>

        <AlertDialog
          isOpen={isMdAlertDialogOpen}
          leastDestructiveRef={mdCancelButtonRef}
          onClose={() => setIsMdAlertDialogOpen(false)}
          size="md"
        >
          <AlertDialogHeader>Delete your account</AlertDialogHeader>
          <AlertDialogBody>Are you sure?</AlertDialogBody>
          <AlertDialogFooter>
            <>
              <Button
                onClick={() => setIsMdAlertDialogOpen(false)}
                margin="0 sm 0 0"
                ref={mdCancelButtonRef}
                variant="outline"
              >
                Cancel
              </Button>

              <Button
                backgroundColor="error600"
                onClick={() => setIsMdAlertDialogOpen(false)}
              >
                Delete
              </Button>
            </>
          </AlertDialogFooter>
        </AlertDialog>
      </div>

      <div>
        <Button onClick={() => setIsLgAlertDialogOpen(true)} margin="0 sm">
          Open lg
        </Button>

        <AlertDialog
          isOpen={isLgAlertDialogOpen}
          leastDestructiveRef={lgCancelButtonRef}
          onClose={() => setIsLgAlertDialogOpen(false)}
          size="lg"
        >
          <AlertDialogHeader>Delete your account</AlertDialogHeader>
          <AlertDialogBody>Are you sure?</AlertDialogBody>
          <AlertDialogFooter>
            <>
              <Button
                onClick={() => setIsLgAlertDialogOpen(false)}
                margin="0 sm 0 0"
                ref={lgCancelButtonRef}
                variant="outline"
              >
                Cancel
              </Button>

              <Button
                backgroundColor="error600"
                onClick={() => setIsLgAlertDialogOpen(false)}
              >
                Delete
              </Button>
            </>
          </AlertDialogFooter>
        </AlertDialog>
      </div>

      <div>
        <Button onClick={() => setIsXlAlertDialogOpen(true)} margin="0 sm">
          Open xl
        </Button>

        <AlertDialog
          isOpen={isXlAlertDialogOpen}
          leastDestructiveRef={xlCancelButtonRef}
          onClose={() => setIsXlAlertDialogOpen(false)}
          size="xl"
        >
          <AlertDialogHeader>Delete your account</AlertDialogHeader>
          <AlertDialogBody>Are you sure?</AlertDialogBody>
          <AlertDialogFooter>
            <>
              <Button
                onClick={() => setIsXlAlertDialogOpen(false)}
                margin="0 sm 0 0"
                ref={xlCancelButtonRef}
                variant="outline"
              >
                Cancel
              </Button>

              <Button
                backgroundColor="error600"
                onClick={() => setIsXlAlertDialogOpen(false)}
              >
                Delete
              </Button>
            </>
          </AlertDialogFooter>
        </AlertDialog>
      </div>

      <div>
        <Button onClick={() => setIsXxlAlertDialogOpen(true)} margin="0 sm">
          Open xxl
        </Button>

        <AlertDialog
          isOpen={isXxlAlertDialogOpen}
          leastDestructiveRef={xxlCancelButtonRef}
          onClose={() => setIsXxlAlertDialogOpen(false)}
          size="xxl"
        >
          <AlertDialogHeader>Delete your account</AlertDialogHeader>
          <AlertDialogBody>Are you sure?</AlertDialogBody>
          <AlertDialogFooter>
            <>
              <Button
                onClick={() => setIsXxlAlertDialogOpen(false)}
                margin="0 sm 0 0"
                ref={xxlCancelButtonRef}
                variant="outline"
              >
                Cancel
              </Button>

              <Button
                backgroundColor="error600"
                onClick={() => setIsXxlAlertDialogOpen(false)}
              >
                Delete
              </Button>
            </>
          </AlertDialogFooter>
        </AlertDialog>
      </div>
    </div>
  );
};