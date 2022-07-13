import { useCallback, useContext } from 'react';

import { DrawerContext } from '@contexts';
import { useUniqueId } from '@hooks';
import { createClasses, isString } from '@utils';

import { DrawerProps } from '@molecules/Drawer/Drawer';

/** Hooks that returns the Drawer props
 */
const useDrawerProvider = (props: DrawerProps) => {
  const { isOpen, onClose, closeOnEsc, finalFocusRef, initialFocusRef } = props;

  const id = useUniqueId('snui-drawer');

  const getDrawerBodyProps = useCallback(
    (drawerBodyProps = {}) => {
      const { className } = drawerBodyProps;
      const classes = createClasses('snui-drawer__body', {
        [`${className}`]: isString(className),
      });
      return {
        ...drawerBodyProps,
        className: classes,
        id: `${id}__body`,
      };
    },
    [id]
  );
  const getDrawerHeaderProps = useCallback(
    (drawerHeaderProps = {}) => {
      const { className } = drawerHeaderProps;
      const classes = createClasses('snui-drawer__header', {
        [`${className}`]: isString(className),
      });
      return {
        ...drawerHeaderProps,
        className: classes,
        id: `${id}__header`,
      };
    },
    [id]
  );
  const getDrawerFooterProps = useCallback(
    (drawerFooterProps = {}) => {
      const { className } = drawerFooterProps;
      const classes = createClasses('snui-drawer__footer', {
        [`${className}`]: isString(className),
      });

      return {
        ...drawerFooterProps,
        className: classes,
        id: `${id}__footer`,
      };
    },
    [id]
  );

  return {
    closeOnEsc,
    finalFocusRef,
    getDrawerBodyProps,
    getDrawerHeaderProps,
    getDrawerFooterProps,
    id,
    initialFocusRef,
    isOpen,
    onClose,
  };
};

/**
 * Hooks that returns all Drawer props
 */
const useDrawer = () => {
  const context = useContext(DrawerContext);

  if (!context.id) {
    throw new Error(
      'useDrawer: context is undefined, did you remember to wrap your component in a pair of <Drawer>'
    );
  }
  return context;
};

export { useDrawer, useDrawerProvider };
