import React from 'react';

import { Tooltip } from '@components';
import { act, a11yTest, fireEvent, render, screen } from '@test-utils';

describe('<Tooltip />', () => {
  const buttonLabel = 'button label';
  const tooltipLabel = 'tooltip label';
  // for css transitions
  const closeDelayAnimation = 200;
  const openDelayAnimation = 0;
  function TooltipTest(props: any) {
    return (
      <Tooltip label={tooltipLabel} {...props}>
        <button type="button">{buttonLabel}</button>
      </Tooltip>
    );
  }

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('should pass a11y tests', () => {
    render(<TooltipTest />);

    // Wrapper function to prevent warning.
    act(() => {
      fireEvent.mouseEnter(screen.getByText(buttonLabel));
      // fast forward the amount time needed for the tooltip to render.
      jest.advanceTimersByTime(openDelayAnimation);
    });

    const tooltip = screen.getByRole('tooltip');

    act(() => a11yTest(tooltip));
  });

  it('should render on mouseEnter and close on mouseLeave when children is a string', () => {
    render(<Tooltip label={tooltipLabel}>{buttonLabel}</Tooltip>);

    let tooltip = screen.queryByRole('tooltip');
    // Tooltip element should not be present at first.
    expect(tooltip).not.toBeInTheDocument();

    // Wrapper function to prevent warning.
    act(() => {
      fireEvent.mouseEnter(screen.getByText(buttonLabel));
      // fast forward the amount time needed for the tooltip to render.
      jest.advanceTimersByTime(openDelayAnimation);
    });

    tooltip = screen.queryByRole('tooltip');

    // Tooltip should now be visible.
    expect(tooltip).toBeInTheDocument();

    // Wrapper function to prevent the warning.
    act(() => {
      fireEvent.mouseLeave(screen.getByText(buttonLabel));
      // fast forward the amount time needed for the tooltip to unmount.
      jest.advanceTimersByTime(closeDelayAnimation);
    });

    // Tooltip should now be removed from the DOM.
    expect(tooltip).not.toBeInTheDocument();
  });

  it('should NOT render when isDisabled is true', () => {
    render(<TooltipTest isDisabled />);

    let tooltip = screen.queryByRole('tooltip');
    // Tooltip element should not be present at first.
    expect(tooltip).not.toBeInTheDocument();

    // Wrapper function to prevent warning.
    act(() => {
      fireEvent.mouseEnter(screen.getByText(buttonLabel));
      // fast forward the amount time needed for the tooltip to render.
      jest.advanceTimersByTime(openDelayAnimation);
    });

    tooltip = screen.queryByRole('tooltip');

    // Tooltip element should not be present at first.
    expect(tooltip).not.toBeInTheDocument();
  });

  it('should NOT render when isDisabled is true and passing string', () => {
    render(
      <Tooltip isDisabled label={tooltipLabel}>
        {buttonLabel}
      </Tooltip>
    );

    let tooltip = screen.queryByRole('tooltip');
    // Tooltip element should not be present at first.
    expect(tooltip).not.toBeInTheDocument();

    // Wrapper function to prevent warning.
    act(() => {
      fireEvent.mouseEnter(screen.getByText(buttonLabel));
      // fast forward the amount time needed for the tooltip to render.
      jest.advanceTimersByTime(openDelayAnimation);
    });

    tooltip = screen.queryByRole('tooltip');

    // Tooltip element should not be present at first.
    expect(tooltip).not.toBeInTheDocument();
  });

  it('should wait before rendering with openDelay prop', () => {
    const delay = 300;
    render(<TooltipTest openDelay={delay} />);

    let tooltip = screen.queryByRole('tooltip');
    // Tooltip element should not be present at first.
    expect(tooltip).not.toBeInTheDocument();

    // Wrapper function to prevent warning.
    act(() => {
      fireEvent.mouseEnter(screen.getByText(buttonLabel));
      // fast forward the amount time needed by default to render.
      jest.advanceTimersByTime(openDelayAnimation);
    });

    tooltip = screen.queryByRole('tooltip');

    // Tooltip should still not be visible.
    expect(tooltip).not.toBeInTheDocument();

    act(() => {
      // fast forward the delay
      jest.advanceTimersByTime(delay);
    });

    tooltip = screen.queryByRole('tooltip');

    // Tooltip should now not be visible.
    expect(tooltip).toBeInTheDocument();
  });

  it('should wait before unmounting with closeDelay prop', () => {
    const delay = 300;
    render(<TooltipTest closeDelay={delay} />);

    let tooltip = screen.queryByRole('tooltip');
    // Tooltip element should not be present at first.
    expect(tooltip).not.toBeInTheDocument();

    // Wrapper function to prevent warning.
    act(() => {
      fireEvent.mouseEnter(screen.getByText(buttonLabel));
      // fast forward the amount time needed by default to render.
      jest.advanceTimersByTime(openDelayAnimation);
    });

    tooltip = screen.queryByRole('tooltip');

    // Tooltip should still not be visible.
    expect(tooltip).toBeInTheDocument();

    act(() => {
      fireEvent.mouseLeave(screen.getByText(buttonLabel));
      jest.advanceTimersByTime(closeDelayAnimation);
    });

    tooltip = screen.queryByRole('tooltip');

    // Tooltip should still be visible.
    expect(tooltip).toBeInTheDocument();

    act(() => {
      // fast forward the delay
      jest.advanceTimersByTime(delay);
    });

    tooltip = screen.queryByRole('tooltip');

    // Tooltip should NOT be visible.
    expect(tooltip).not.toBeInTheDocument();
  });

  it('should render on mouseEnter and close on mouseLeave', () => {
    render(<TooltipTest />);

    let tooltip = screen.queryByRole('tooltip');
    // Tooltip element should not be present at first.
    expect(tooltip).not.toBeInTheDocument();

    // Wrapper function to prevent warning.
    act(() => {
      fireEvent.mouseEnter(screen.getByText(buttonLabel));
      // fast forward the amount time needed for the tooltip to render.
      jest.advanceTimersByTime(openDelayAnimation);
    });

    tooltip = screen.queryByRole('tooltip');

    // Tooltip should now be visible.
    expect(tooltip).toBeInTheDocument();

    // Wrapper function to prevent the warning.
    act(() => {
      fireEvent.mouseLeave(screen.getByText(buttonLabel));
      // fast forward the amount time needed for the tooltip to unmount.
      jest.advanceTimersByTime(closeDelayAnimation);
    });

    // Tooltip should now be removed from the DOM.
    expect(tooltip).not.toBeInTheDocument();
  });

  it('should render child with correct aria-describedby', () => {
    render(<TooltipTest />);

    const button = screen.getByText(buttonLabel);

    expect(button).not.toHaveAttribute('aria-describedby');

    act(() => {
      fireEvent.mouseEnter(screen.getByText(buttonLabel));
      // fast forward the amount time needed for the tooltip to render.
      jest.advanceTimersByTime(openDelayAnimation);
    });

    const tooltip = screen.getByRole('tooltip');

    expect(button.getAttribute('aria-describedby')).toBe(tooltip.id);
  });
});
