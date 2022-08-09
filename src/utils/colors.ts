// Helper functions that convert color values.

/**
 * Convert hexidecimal color to rgb
 *
 * @param 'hex' hexidecimal color
 *
 * @return array containing [r, g, b] numberic values.
 */
export const hexToRgb = (hex: string) => {
  const red = parseInt(`0x${hex.substring(1, 3)}`, 16);
  const green = parseInt(`0x${hex.substring(3, 5)}`, 16);
  const blue = parseInt(`0x${hex.substring(5, 8)}`, 16);
  return [red, green, blue];
};

/**
 * Convert hsl/a value to hexidecimal.
 *
 * @param 'h' hue
 * @param 's' saturation
 * @param 'l' ligntness
 * @param 'a' alpha
 *
 * @return converted hexidecimal value
 */
export function hslToHex(h: number, s: number, l: number, a?: number) {
  const [red, green, blue] = hslToRgb(h, s, l);
  if (a) {
    return rgbToHex(red, green, blue, a);
  }
  return rgbToHex(red, green, blue);
}

// @source https://github.com/Qix-/color-convert/blob/master/conversions.js

/**
 * Convert hsl value to rgb.
 *
 * @param 'h' hue
 * @param 's' saturation
 * @param 'l' ligntness
 *
 * @return converted hexidecimal value
 */
export const hslToRgb = (h2: number, s2: number, l2: number) => {
  const h = h2 / 360;
  const s = s2 / 100;
  const l = l2 / 100;
  let t2;
  let t3;
  let val;

  if (s === 0) {
    val = l * 255;
    return [val, val, val];
  }

  if (l < 0.5) {
    t2 = l * (1 + s);
  } else {
    t2 = l + s - l * s;
  }

  const t1 = 2 * l - t2;

  const rgb = [0, 0, 0];
  for (let i = 0; i < 3; i += 1) {
    t3 = h + (1 / 3) * -(i - 1);
    if (t3 < 0) {
      t3 += 1;
    }

    if (t3 > 1) {
      t3 -= 1;
    }

    if (6 * t3 < 1) {
      val = t1 + (t2 - t1) * 6 * t3;
    } else if (2 * t3 < 1) {
      val = t2;
    } else if (3 * t3 < 2) {
      val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
    } else {
      val = t1;
    }

    rgb[i] = Math.round(val * 255);
  }

  return rgb;
};

/**
 * Calculate whether the hex color is of a dark color.
 *
 * @param 'hex' hexidecimal color
 *
 * @return whether hex color is a dark color.
 */
export const isDarkColor = (hex: string) => {
  const [red, green, blue] = hexToRgb(hex);

  if (red + green + blue <= (0xff * 3) / 2) {
    return true;
  }
  return false;
};

/**
 * Convert rgb color to Hex.
 *
 * @param 'r' red value
 * @param 'g' green value
 * @param 'b' blue value
 * @param 'a' alpha value
 *
 * @return converted hex value.
 */
export const rgbToHex = (r: number, g: number, b: number, a?: number) => {
  // convert decimal to hex
  let red = r.toString(16);
  let green = g.toString(16);
  let blue = b.toString(16);

  // prefix with zero when above conversion returns a single character.
  if (red.length === 1) {
    red = `0${red}`;
  }
  if (green.length === 1) {
    green = `0${green}`;
  }
  if (blue.length === 1) {
    blue = `0${blue}`;
  }
  // omit the alpha value
  if (a === 1) {
    return `#${red}${green}${blue}`;
  }

  // convert the alpha value
  const alpha = Math.round(255 * a!).toString(16);

  return a ? `#${red}${green}${blue}${alpha}` : `#${red}${green}${blue}`;
};
