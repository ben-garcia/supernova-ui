import React from 'react';

import { SupernovaProvider } from '@contexts';
import { useNotification } from '@hooks';
import { act, renderHook, screen } from '@test-utils';

describe('<Notification />', () => {
  const title = 'notification title';
  const message = 'notification message';

  it('should add a new notification', () => {
    act(async () => {
      const { result } = renderHook(() => useNotification(), {
        wrapper: ({ children }) => (
          <SupernovaProvider>{children}</SupernovaProvider>
        ),
      });

      result.current({
        title,
        message,
      });

      const titleNodes = await screen.findAllByText(title);
      const messageNodes = await screen.findAllByText(message);

      expect(titleNodes).toHaveLength(1);
      expect(messageNodes).toHaveLength(1);
    });
  });

  it('should contain the proper aria roles and attributes', async () => {
    const { result } = renderHook(() => useNotification(), {
      wrapper: ({ children }) => (
        <SupernovaProvider>{children}</SupernovaProvider>
      ),
    });

    act(() => {
      result.current({
        title,
        message,
      });
    });

    const notification = await screen.findByRole('alert');

    expect(notification).toBeInTheDocument();
  });

  it('should remove notification after 5 seconds', async () => {
    act(() => {
      jest.useFakeTimers();

      const { result } = renderHook(() => useNotification(), {
        wrapper: ({ children }) => (
          <SupernovaProvider>{children}</SupernovaProvider>
        ),
      });

      result.current({
        title,
        message,
      });

      jest.advanceTimersByTime(5450);

      const titleNodes = screen.queryByText(title);
      const messageNodes = screen.queryByText(message);

      expect(titleNodes).not.toBeInTheDocument();
      expect(messageNodes).not.toBeInTheDocument();
    });
  });

  it('should not render progressbar when isPausable is false', async () => {
    act(() => {
      const { result } = renderHook(() => useNotification(), {
        wrapper: ({ children }) => (
          <SupernovaProvider>{children}</SupernovaProvider>
        ),
      });

      result.current({
        title,
        message,
        isPausable: false,
      });

      const progressbar = screen.queryByRole('progressbar');

      expect(progressbar).not.toBeInTheDocument();
    });
  });

  it('should add a custom notification component', async () => {
    const { result } = renderHook(() => useNotification(), {
      wrapper: ({ children }) => (
        <SupernovaProvider>{children}</SupernovaProvider>
      ),
    });

    act(() => {
      result.current({
        render: () => (
          <div>
            <button type="button">X</button>
            <p>{title}</p>
            <p>{message}</p>
          </div>
        ),
      });
    });

    const titleNodes = await screen.findAllByText(title);
    const messageNodes = await screen.findAllByText(message);

    expect(titleNodes).toHaveLength(1);
    expect(messageNodes).toHaveLength(1);
  });
});
