import { useCallback } from 'react';

import { useTheme } from '@hooks';

import { ColorVariant } from '@types';

/**
 * React hooks converts colorVariant prop to inline React style prop.
 */
export const useInlineStyles = (colorVariant: ColorVariant | undefined) => {
  const { colors } = useTheme();

  const styles = colorVariant
    ? { background: colors[colorVariant] }
    : undefined;

  return useCallback(() => ({ style: styles }), [colorVariant]);
};
