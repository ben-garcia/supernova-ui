import borders from './borders';
import breakpoints from './breakpoints';
import colors from './colors';
import radii from './radii';
import shadows from './shadows';
import sizes from './sizes';
import spacing from './spacing';
import typography from './typography';
import zIndices from './z-indices';

export const theme = {
  borders,
  breakpoints,
  colors,
  radii,
  shadows,
  sizes,
  spacing,
  typography,
  zIndices,
};

export type Theme = typeof theme;
