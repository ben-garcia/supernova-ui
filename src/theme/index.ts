import borders from './borders';
import breakpoints from './breakpoints';
import colors from './colors';
import radii from './radii';
import shadows from './shadows';
import sizes from './sizes';
import spacing from './spacing';
import typography from './typography';
import zIndex from './z-index';

export const theme = {
  borders,
  breakpoints,
  colors,
  radii,
  shadows,
  sizes,
  spacing,
  typography,
  zIndex,
};

export type Theme = typeof theme;
