import { useCallback } from 'react';

import { useTheme } from '@hooks';
import { isDarkColor } from '@utils';

import { ColorVariant } from '@types';

/**
 * React hook to convert colorVariant prop to inline React style prop.
 */
export const useInlineStyles = (colorVariant: ColorVariant | undefined) => {
  const { colors } = useTheme();

  const styles = colorVariant
    ? {
        background: colors[colorVariant],
        color: isDarkColor(colors[colorVariant])
          ? 'var(--snui-color-white)'
          : 'var(--snui-color-black)',
      }
    : undefined;

  return useCallback(() => ({ style: styles }), [colorVariant]);
};
