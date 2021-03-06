/* eslint no-continue: 0 */
import { CSSProperties } from 'react';

interface Props {
  [key: string]: string | boolean;
}

/**
 * create the styles object using the props object
 *
 * if the property values don't match any of the defined values
 * then user is trying to add their own value
 */
const createStyles = (props: Props) => {
  if (!Object.keys(props).length) {
    return {};
  }
  const {
    align,
    backgroundColor,
    color,
    font,
    fontSize,
    fontWeight,
    height,
    letterSpacing,
    lineHeight,
    margin,
    padding,
    textTransform,
    width,
  } = props;
  const colors = ['error', 'info', 'primary', 'success', 'warning'];
  const sizes = [
    'xxxxs',
    'xxxs',
    'xxs',
    'xs',
    'sm',
    'md',
    'lg',
    'xl',
    'xxl',
    'xxxl',
    'xxxxl',
  ];
  const styles: CSSProperties = {};

  // eslint-disable-next-line
  for (const [property, value] of Object.entries(props)) {
    if (property === 'align') {
      if (
        align &&
        align !== 'center' &&
        align !== 'left' &&
        align !== 'right'
      ) {
        styles.textAlign = value as CSSProperties['textAlign'];
      }
      continue;
    }
    if (property === 'backgroundColor') {
      if (
        backgroundColor !== '' &&
        !colors.includes(backgroundColor as string)
      ) {
        styles.backgroundColor = value as string;
      }
      continue;
    }
    if (property === 'color') {
      if (color && !colors.includes(color as string)) {
        styles.color = value as string;
      }
      continue;
    }
    if (property === 'font') {
      if (font && font !== 'heading' && font !== 'body' && font !== 'mono') {
        styles.fontFamily = value as string;
      }
      continue;
    }
    if (property === 'fontSize') {
      if (fontSize && !sizes.includes(fontSize as string)) {
        styles.fontSize = value as string;
      }
      continue;
    }
    if (property === 'fontWeight') {
      if (fontWeight && !sizes.includes(fontWeight as string)) {
        styles.fontWeight = value as CSSProperties['fontWeight'];
      }
      continue;
    }
    if (property === 'height') {
      if (height && !sizes.includes(height as string)) {
        styles.height = value as string;
        continue;
      }
    }
    if (property === 'letterSpacing') {
      if (letterSpacing && !sizes.includes(letterSpacing as string)) {
        styles.letterSpacing = value as string;
      }
      continue;
    }
    if (property === 'lineHeight') {
      if (lineHeight && !sizes.includes(lineHeight as string)) {
        styles.lineHeight = value as string;
      }
      continue;
    }
    if (property === 'margin') {
      if (margin && !sizes.includes(margin as string)) {
        styles.margin = value as string;
      }
      continue;
    }
    if (property === 'padding') {
      if (padding && !sizes.includes(padding as string)) {
        styles.padding = value as string;
      }
      continue;
    }
    if (property === 'textTransform') {
      if (
        textTransform &&
        textTransform !== 'capitalize' &&
        textTransform !== 'lowercase' &&
        textTransform !== 'uppercase'
      ) {
        styles.textTransform = value as CSSProperties['textTransform'];
      }
      continue;
    }
    if (property === 'width') {
      if (width && !sizes.includes(width as string)) {
        styles.width = value as string;
      }
    }
  }

  return styles;
};

export default createStyles;
