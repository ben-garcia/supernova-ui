import { jest } from '@jest/globals';
import React from 'react';

import { Tooltip } from '@components';
import { act, a11yTest, fireEvent, render, screen, waitFor } from '@test-utils';

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

  it('should pass a11y tests', async () => {
    render(<TooltipTest />);

    act(() => {
      fireEvent.mouseEnter(screen.getByText(buttonLabel));
      jest.advanceTimersByTime(openDelayAnimation);
    });

    await waitFor(() => {
      const tooltip = screen.getByRole('tooltip');
      a11yTest(tooltip);
    });
  });

  it('should render on mouseEnter and close on mouseLeave when children is a string', () => {
    render(<Tooltip label={tooltipLabel}>{buttonLabel}</Tooltip>);

    let tooltip = screen.queryByRole('tooltip');
    expect(tooltip).not.toBeInTheDocument();

    act(() => {
      fireEvent.mouseEnter(screen.getByText(buttonLabel));
      jest.advanceTimersByTime(openDelayAnimation + 200);
    });

    tooltip = screen.queryByRole('tooltip');
    expect(tooltip).toBeInTheDocument();

    act(() => {
      fireEvent.mouseLeave(screen.getByText(buttonLabel));
      // Only need to advance by the transition duration now
      // Component handles closeDelay + TRANSITION_DURATION internally
      jest.advanceTimersByTime(closeDelayAnimation + 200);
      jest.runAllTimers();
    });

    act(() => {
      // Force React to process any pending updates
      jest.runAllTimers();
    });

    tooltip = screen.queryByRole('tooltip');
    expect(tooltip).not.toBeInTheDocument();
  });

  it('should render on mouseEnter and close on mouseLeave', () => {
    render(<TooltipTest />);

    let tooltip = screen.queryByRole('tooltip');
    expect(tooltip).not.toBeInTheDocument();

    act(() => {
      fireEvent.mouseEnter(screen.getByText(buttonLabel));
      jest.advanceTimersByTime(openDelayAnimation);
    });

    tooltip = screen.queryByRole('tooltip');
    expect(tooltip).toBeInTheDocument();

    act(() => {
      fireEvent.mouseLeave(screen.getByText(buttonLabel));
      // Only need to advance by the transition duration now
      // Component handles closeDelay + TRANSITION_DURATION internally
      jest.advanceTimersByTime(closeDelayAnimation + 200);
    });

    act(() => {
      // Force React to process any pending updates
      jest.runAllTimers();
    });

    tooltip = screen.queryByRole('tooltip');
    expect(tooltip).not.toBeInTheDocument();
  });

  it('should NOT render when isDisabled is true', () => {
    render(<TooltipTest isDisabled />);

    let tooltip = screen.queryByRole('tooltip');
    expect(tooltip).not.toBeInTheDocument();

    act(() => {
      fireEvent.mouseEnter(screen.getByText(buttonLabel));
      jest.advanceTimersByTime(openDelayAnimation);
    });

    tooltip = screen.queryByRole('tooltip');
    expect(tooltip).not.toBeInTheDocument();
  });

  it('should NOT render when isDisabled is true and passing string', () => {
    render(
      <Tooltip isDisabled label={tooltipLabel}>
        {buttonLabel}
      </Tooltip>
    );

    let tooltip = screen.queryByRole('tooltip');
    expect(tooltip).not.toBeInTheDocument();

    act(() => {
      fireEvent.mouseEnter(screen.getByText(buttonLabel));
      jest.advanceTimersByTime(openDelayAnimation);
    });

    tooltip = screen.queryByRole('tooltip');
    expect(tooltip).not.toBeInTheDocument();
  });

  it('should wait before rendering with openDelay prop', async () => {
    const delay = 300;
    render(<TooltipTest openDelay={delay} />);

    let tooltip = screen.queryByRole('tooltip');
    expect(tooltip).not.toBeInTheDocument();

    act(() => {
      fireEvent.mouseEnter(screen.getByText(buttonLabel));
      jest.advanceTimersByTime(openDelayAnimation);
    });

    await waitFor(() => {
      tooltip = screen.queryByRole('tooltip');
      expect(tooltip).not.toBeInTheDocument();
    });

    act(() => {
      jest.advanceTimersByTime(delay);
    });

    await waitFor(() => {
      tooltip = screen.queryByRole('tooltip');
      expect(tooltip).toBeInTheDocument();
    });
  });

  it('should wait before unmounting with closeDelay prop', async () => {
    const delay = 300;
    render(<TooltipTest closeDelay={delay} />);

    let tooltip = screen.queryByRole('tooltip');
    expect(tooltip).not.toBeInTheDocument();

    act(() => {
      fireEvent.mouseEnter(screen.getByText(buttonLabel));
      jest.advanceTimersByTime(openDelayAnimation);
    });

    tooltip = screen.queryByRole('tooltip');
    expect(tooltip).toBeInTheDocument();

    act(() => {
      fireEvent.mouseLeave(screen.getByText(buttonLabel));
      jest.advanceTimersByTime(closeDelayAnimation);
    });

    // Re-query after closeDelayAnimation
    tooltip = screen.queryByRole('tooltip');
    expect(tooltip).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(delay);
    });

    // Re-query after the additional delay
    tooltip = screen.queryByRole('tooltip');

    await waitFor(() => {
      expect(tooltip).not.toBeInTheDocument();
    });
  });

  it('should render child with correct aria-describedby', () => {
    render(<TooltipTest />);

    const button = screen.getByText(buttonLabel);
    expect(button).not.toHaveAttribute('aria-describedby');

    act(() => {
      fireEvent.mouseEnter(screen.getByText(buttonLabel));
      jest.advanceTimersByTime(openDelayAnimation);
    });

    const tooltip = screen.getByRole('tooltip');
    expect(button.getAttribute('aria-describedby')).toBe(tooltip.id);
  });
});
