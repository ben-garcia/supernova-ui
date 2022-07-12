import React from 'react';

import { act, a11yTest, fireEvent, render, screen } from '@testUtils';

import Tooltip from '.';

describe('<Tooltip />', () => {
  const buttonLabel = 'button label';
  const tooltipContent = 'tooltip label';
  const TooltipTest = () => (
    <Tooltip content={tooltipContent}>
      <button type="button">{buttonLabel}</button>
    </Tooltip>
  );

  it('should pass a11y tests', async () => {
    render(<TooltipTest />);

    fireEvent.mouseOver(screen.getByText(buttonLabel));

    const tooltip = await screen.findByRole('tooltip');

    await act(() => a11yTest(tooltip));
  });

  it('should render on mouseEnter and close on mouseLeave', async () => {
    render(<TooltipTest />);

    act(() => {
      fireEvent.mouseEnter(screen.getByText(buttonLabel));
    });

    const tooltip = await screen.findByRole('tooltip');

    expect(screen.getByText(buttonLabel)).toBeInTheDocument();
    expect(screen.getByRole('tooltip')).toBeInTheDocument();

    act(() => {
      fireEvent.mouseLeave(screen.getByText(buttonLabel));
    });

    expect(tooltip).not.toBeInTheDocument();
  });

  it('should render child with correct aria-describedby', async () => {
    render(<TooltipTest />);

    const button = await screen.findByText(buttonLabel);

    expect(button).not.toHaveAttribute('aria-describedby');

    act(() => {
      fireEvent.mouseEnter(screen.getByText(buttonLabel));
    });

    const tooltip = screen.getByRole('tooltip');

    expect(button.getAttribute('aria-describedby')).toBe(tooltip.id);
  });

  it('should wrap children in a span when children is a string', () => {
    render(<Tooltip content={tooltipContent}>{buttonLabel}</Tooltip>);

    expect(screen.getByText(buttonLabel).nodeName).toBe('SPAN');
  });

  it('should render on mouseEnter and close on mouseLeave when children is a string', async () => {
    render(<Tooltip content={tooltipContent}>{buttonLabel}</Tooltip>);

    act(() => {
      fireEvent.mouseEnter(screen.getByText(buttonLabel));
    });

    const tooltip = await screen.findByRole('tooltip');

    expect(screen.getByText(buttonLabel)).toBeInTheDocument();
    expect(screen.getByRole('tooltip')).toBeInTheDocument();

    act(() => {
      fireEvent.mouseLeave(screen.getByText(buttonLabel));
    });

    expect(tooltip).not.toBeInTheDocument();
  });
});
