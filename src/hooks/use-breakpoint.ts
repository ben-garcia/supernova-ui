import useMediaQuery from './use-media-query';
import useTheme from './use-theme';

/**
 * Hooks that returns the active breakpoint
 */
const useBreakpoint = () => {
  const theme = useTheme();
  const isXs = useMediaQuery(
    `(min-width: ${theme.breakpoints.xs}) and (max-width: ${theme.breakpoints.sm})`
  );
  const isSm = useMediaQuery(
    `(min-width: ${theme.breakpoints.sm}) and (max-width: ${theme.breakpoints.md})`
  );
  const isMd = useMediaQuery(
    `(min-width: ${theme.breakpoints.md}) and (max-width: ${theme.breakpoints.lg})`
  );
  const isLg = useMediaQuery(
    `(min-width: ${theme.breakpoints.lg}) and (max-width: ${theme.breakpoints.xl})`
  );
  const isXl = useMediaQuery(
    `(min-width: ${theme.breakpoints.xl}) and (max-width: ${theme.breakpoints.xxl})`
  );
  const isXxl = useMediaQuery(`(min-width: ${theme.breakpoints.xxl})`);

  if (isXs) {
    return 'xs';
  }
  if (isSm) {
    return 'sm';
  }
  if (isMd) {
    return 'md';
  }
  if (isLg) {
    return 'lg';
  }
  if (isXl) {
    return 'xl';
  }

  return isXxl ? 'xxl' : 'xxl';
};

export default useBreakpoint;
