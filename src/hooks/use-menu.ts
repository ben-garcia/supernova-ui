import { useContext } from 'react';

import { MenuContext } from '../contexts/menu';
import { MenuProps } from '../components/molecules/Menu/types';

/**
 * Hooks that returns the Menu props
 */
const useMenuProvider = (props: MenuProps) => {
  const { id: propId, isOpen, onClose, closeOnEsc } = props;

  const id = propId || `menu-${Math.random()}`;
  /*
  const [hasFeedbackText, setHasFeedbackText] = useState(false);
  const [hasHelpText, setHasHelpText] = useState(false);
  const getHelpTextProps = useCallback(
    (helperTextProps = {}, forwardedRef = null) => ({
      id: `${id}-helper-text`,
      ...helperTextProps,
      ref: mergeRefs(forwardedRef, node => {
        if (!node) return;
        setHasHelpText(true);
      }),
    }),
    [id]
  );
  const getErrorMessageProps = useCallback(
    (errorMessageProps = {}, forwardedRef = null) => ({
      id: `${id}-feedback`,
      ...errorMessageProps,
      ref: mergeRefs(forwardedRef, node => {
        if (!node) return;
        setHasFeedbackText(true);
      }),
      'aria-live': 'polite',
    }),
    [id]
  );
	*/

  return {
    id,
    onClose,
    isOpen,
    closeOnEsc,
  };
};

/**
 * Hooks that returns all menu props
 */
const useMenu = () => {
  const context = useContext(MenuContext);

  if (!context.id) {
    throw new Error(
      'useMenu: context is undefined, did you remember to wrap your app in a <Menu />'
    );
  }
  return context;
};

export { useMenuProvider, useMenu };
