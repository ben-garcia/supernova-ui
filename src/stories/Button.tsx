import React from 'react';

import './button.scss';

interface ButtonProps {
  /**
   * primary brand color
   */
  primary: boolean;
  /**
   * set the background
   */
  backgroundColor: string;
  /**
   * set the size of the button
   */
  size: string;
  /**
   * add a label
   */
  label: string;
}

/**
 * Primary UI component for user interaction
 */
export const Button: React.FC<ButtonProps> = ({
  primary,
  backgroundColor,
  size = 'medium',
  label,
  ...props
}) => {
  const mode = primary
    ? 'storybook-button--primary'
    : 'storybook-button--secondary';
  return (
    <button
      type="button"
      className={['storybook-button', `storybook-button--${size}`, mode].join(
        ' '
      )}
      style={backgroundColor && ({ backgroundColor } as any)}
      {...props}
    >
      {label}
    </button>
  );
};
