import { jest } from '@jest/globals';
import React from 'react';

import { Tab, Tabs, TabList, TabPanel, TabPanelList } from '@components';
import {
  act,
  a11yTest,
  fireEvent,
  render,
  screen,
  userEvent,
  waitFor,
} from '@test-utils';

import { TabsProps } from './types';

describe('<Tabs />', () => {
  const tabOneContent = 'Tab 1';
  const panelOneContent = 'panel 1';
  const tabTwoContent = 'Tab 2';
  const panelTwoContent = 'panel 2';
  const tabThreeContent = 'Tab 3';
  const panelThreeContent = 'panel 3';

  function TabsTest(props: Omit<TabsProps, 'children'>) {
    return (
      <Tabs {...props}>
        <TabList>
          <Tab>{tabOneContent}</Tab>
          <Tab>{tabTwoContent}</Tab>
          <Tab>{tabThreeContent}</Tab>
        </TabList>

        <TabPanelList>
          <TabPanel>{panelOneContent}</TabPanel>
          <TabPanel>{panelTwoContent}</TabPanel>
          <TabPanel>{panelThreeContent}</TabPanel>
        </TabPanelList>
      </Tabs>
    );
  }

  it('should pass a11y tests', async () => {
    await waitFor(() => {
      a11yTest(<TabsTest />);
    });
  });

  it('should contain the proper role and aria attributes', async () => {
    jest.useFakeTimers();

    render(<TabsTest />);

    act(() => {
      // advance past the set timeout function
      jest.advanceTimersByTime(5);
    });

    const tabList = screen.getByRole('tablist');
    const tabs = screen.getAllByRole('tab');
    const tabPanels = screen.getAllByRole('tabpanel');

    await waitFor(() => {
      expect(tabList).toHaveAttribute('aria-orientation', 'horizontal');
      // active tab should be true by default
      expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
      // tabs that arent active should be false
      expect(tabs[1]).toHaveAttribute('aria-selected', 'false');
      expect(tabs[2]).toHaveAttribute('aria-selected', 'false');
      // 'aria-describedby' must match the id of the matching tab.
      expect(tabPanels[0]).toHaveAttribute(
        'aria-describedby',
        tabs[0].getAttribute('id')
      );
      // 'aria-controls' must match the id of the matching panel.
      expect(tabs[0]).toHaveAttribute(
        'aria-controls',
        tabPanels[0].getAttribute('id')
      );
    });

    // events that trigger React state change need to be wrapped in 'act'
    act(() => {
      userEvent.tab();
      fireEvent.keyDown(tabs[0], { key: 'ArrowRight' });
      jest.advanceTimersByTime(5);
    });

    await waitFor(() => {
      expect(tabs[0]).toHaveAttribute('aria-selected', 'false');
      expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
      expect(tabs[2]).toHaveAttribute('aria-selected', 'false');
    });

    act(() => {
      fireEvent.keyDown(tabs[1], { key: 'ArrowRight' });
      jest.advanceTimersByTime(5);
    });

    await waitFor(() => {
      expect(tabs[0]).toHaveAttribute('aria-selected', 'false');
      expect(tabs[1]).toHaveAttribute('aria-selected', 'false');
      expect(tabs[2]).toHaveAttribute('aria-selected', 'true');
    });
  });

  it('should update tabIndex based on the active tab', async () => {
    jest.useFakeTimers();

    render(<TabsTest />);

    act(() => {
      // advance past the set timeout function
      jest.advanceTimersByTime(5);
    });

    const tabs = screen.getAllByRole('tab');

    await waitFor(() => {
      expect(tabs[0]).toHaveAttribute('tabindex', '0');
      expect(tabs[1]).toHaveAttribute('tabindex', '-1');
      expect(tabs[2]).toHaveAttribute('tabindex', '-1');
    });

    act(() => {
      userEvent.tab();
      fireEvent.keyDown(tabs[0], { key: 'ArrowRight' });
      jest.advanceTimersByTime(5);
    });

    await waitFor(() => {
      expect(tabs[0]).toHaveAttribute('tabindex', '-1');
      expect(tabs[1]).toHaveAttribute('tabindex', '0');
      expect(tabs[2]).toHaveAttribute('tabindex', '-1');
    });

    act(() => {
      fireEvent.keyDown(tabs[1], { key: 'ArrowRight' });
      jest.advanceTimersByTime(5);
    });

    await waitFor(() => {
      expect(tabs[0]).toHaveAttribute('tabindex', '-1');
      expect(tabs[1]).toHaveAttribute('tabindex', '-1');
      expect(tabs[2]).toHaveAttribute('tabindex', '0');
    });
  });

  it('should focus the correct tab when passing defaultIndex', async () => {
    jest.useFakeTimers();

    render(<TabsTest defaultIndex={1} />);

    act(() => {
      jest.advanceTimersByTime(5);
    });

    const tabs = screen.getAllByRole('tab');

    act(() => {
      userEvent.tab();
    });

    await waitFor(() => {
      expect(tabs[1]).toHaveFocus();
      expect(screen.getByText(panelTwoContent)).toBeVisible();
    });
  });

  describe('keyboard navigation', () => {
    describe('tab and shift+tab', () => {
      it('should focus in and out of the active tab', async () => {
        jest.useFakeTimers();

        render(<TabsTest />);

        act(() => {
          jest.advanceTimersByTime(5);
        });

        const tabs = screen.getAllByRole('tab');

        act(() => {
          userEvent.tab();
        });

        await waitFor(() => {
          expect(tabs[0]).toHaveFocus();
        });

        act(() => {
          userEvent.tab();
          jest.advanceTimersByTime(5);
        });

        await waitFor(() => {
          expect(tabs[0]).not.toHaveFocus();
          expect(tabs[1]).not.toHaveFocus();
          expect(tabs[2]).not.toHaveFocus();
        });

        act(() => {
          userEvent.tab({ shift: true });
          jest.advanceTimersByTime(5);
        });

        await waitFor(() => {
          expect(tabs[0]).toHaveFocus();
          expect(tabs[1]).not.toHaveFocus();
          expect(tabs[2]).not.toHaveFocus();
        });
      });
    });

    describe('function keys', () => {
      describe('End and Home', () => {
        describe('horizontal orientation', () => {
          it('set focus and activate the first/last tab', async () => {
            jest.useFakeTimers();

            render(<TabsTest />);

            act(() => {
              jest.advanceTimersByTime(5);
            });

            const tabs = screen.getAllByRole('tab');

            act(() => {
              userEvent.tab();
              fireEvent.keyDown(tabs[0], { key: 'End' });
              jest.advanceTimersByTime(5);
            });

            await waitFor(() => {
              expect(tabs[2]).toHaveFocus();
              expect(screen.getByText(panelThreeContent)).toBeVisible();
            });

            act(() => {
              fireEvent.keyDown(tabs[2], { key: 'Home' });
              jest.advanceTimersByTime(5);
            });

            await waitFor(() => {
              expect(tabs[0]).toHaveFocus();
              expect(screen.getByText(panelOneContent)).toBeVisible();
            });
          });

          it('set focus and NOT activate the first/last tab when isManual is true', async () => {
            jest.useFakeTimers();

            render(<TabsTest isManual />);

            act(() => {
              jest.advanceTimersByTime(5);
            });

            const tabs = screen.getAllByRole('tab');

            await waitFor(() => {
              expect(screen.getByText(panelOneContent)).toBeVisible();
            });

            act(() => {
              userEvent.tab();
              fireEvent.keyDown(tabs[0], { key: 'End' });
              jest.advanceTimersByTime(5);
            });

            await waitFor(() => {
              expect(tabs[2]).toHaveFocus();
              expect(screen.getByText(panelThreeContent)).not.toBeVisible();
            });

            act(() => {
              fireEvent.keyDown(tabs[2], { key: 'Home' });
              jest.advanceTimersByTime(5);
            });

            await waitFor(() => {
              expect(tabs[0]).toHaveFocus();
              // panel one is the active tab
              expect(screen.getByText(panelOneContent)).toBeVisible();
            });
          });
        });

        describe('vertical orientation', () => {
          it('set focus and activate the first/last tab', async () => {
            jest.useFakeTimers();

            render(<TabsTest orientation="vertical" />);

            act(() => {
              jest.advanceTimersByTime(5);
            });

            const tabs = screen.getAllByRole('tab');

            act(() => {
              userEvent.tab();
              fireEvent.keyDown(tabs[0], { key: 'End' });
              jest.advanceTimersByTime(5);
            });

            await waitFor(() => {
              expect(tabs[2]).toHaveFocus();
              expect(screen.getByText(panelThreeContent)).toBeVisible();
            });

            act(() => {
              fireEvent.keyDown(tabs[2], { key: 'Home' });
              jest.advanceTimersByTime(5);
            });

            await waitFor(() => {
              expect(tabs[0]).toHaveFocus();
              expect(screen.getByText(panelOneContent)).toBeVisible();
            });
          });

          it('set focus and NOT activate the first/last tab when isManual is true', async () => {
            jest.useFakeTimers();

            render(<TabsTest orientation="vertical" isManual />);

            act(() => {
              jest.advanceTimersByTime(5);
            });

            const tabs = screen.getAllByRole('tab');

            await waitFor(() => {
              // panel one is visible by default
              expect(screen.getByText(panelOneContent)).toBeVisible();
            });

            act(() => {
              userEvent.tab();
              fireEvent.keyDown(tabs[0], { key: 'End' });
              jest.advanceTimersByTime(5);
            });

            await waitFor(() => {
              expect(tabs[2]).toHaveFocus();
              expect(screen.getByText(panelThreeContent)).not.toBeVisible();
            });

            act(() => {
              fireEvent.keyDown(tabs[2], { key: 'Home' });
              jest.advanceTimersByTime(5);
            });

            await waitFor(() => {
              expect(tabs[0]).toHaveFocus();
              expect(screen.getByText(panelOneContent)).toBeVisible();
            });
          });
        });
      });
    });

    describe('arrow keys', () => {
      describe('ArrowLeft and ArrowRight', () => {
        describe('horizontal orientation', () => {
          it('should set focus and activate the last tab when pressing ArrowLeft on first tab', async () => {
            jest.useFakeTimers();

            render(<TabsTest />);

            act(() => {
              jest.advanceTimersByTime(5);
            });

            const tabs = screen.getAllByRole('tab');

            act(() => {
              userEvent.tab();
              fireEvent.keyDown(tabs[0], { key: 'ArrowLeft' });
              jest.advanceTimersByTime(5);
            });

            await waitFor(() => {
              expect(tabs[2]).toHaveFocus();
              expect(screen.getByText(panelThreeContent)).toBeVisible();
            });
          });

          it('should set focus and activate the first tab when pressing ArrowRight on last tab', async () => {
            jest.useFakeTimers();

            render(<TabsTest />);

            act(() => {
              jest.advanceTimersByTime(5);
            });

            const tabs = screen.getAllByRole('tab');

            act(() => {
              fireEvent.focus(tabs[2]);
              fireEvent.keyDown(tabs[2], { key: 'ArrowRight' });
              jest.advanceTimersByTime(5);
            });

            await waitFor(() => {
              expect(tabs[0]).toHaveFocus();
              expect(screen.getByText(panelOneContent)).toBeVisible();
            });
          });

          it('should set focus and activate the first/last tab', async () => {
            jest.useFakeTimers();

            render(<TabsTest />);

            act(() => {
              jest.advanceTimersByTime(5);
            });

            const tabs = screen.getAllByRole('tab');

            act(() => {
              userEvent.tab();
              fireEvent.keyDown(tabs[0], { key: 'ArrowRight' });
              jest.advanceTimersByTime(5);
            });

            await waitFor(() => {
              expect(tabs[1]).toHaveFocus();
              expect(screen.getByText(panelTwoContent)).toBeVisible();
            });

            act(() => {
              fireEvent.keyDown(tabs[1], { key: 'ArrowLeft' });
              jest.advanceTimersByTime(5);
            });

            await waitFor(() => {
              expect(tabs[0]).toHaveFocus();
              expect(screen.getByText(panelOneContent)).toBeVisible();
            });
          });

          it('set focus and NOT activate the first/last tab when isManual is true', async () => {
            jest.useFakeTimers();

            render(<TabsTest isManual />);

            act(() => {
              jest.advanceTimersByTime(5);
            });

            const tabs = screen.getAllByRole('tab');

            await waitFor(() => {
              expect(screen.getByText(panelOneContent)).toBeVisible();
            });

            act(() => {
              userEvent.tab();
              fireEvent.keyDown(tabs[0], { key: 'ArrowRight' });
              jest.advanceTimersByTime(5);
            });

            await waitFor(() => {
              expect(tabs[1]).toHaveFocus();
              expect(screen.getByText(panelTwoContent)).not.toBeVisible();
            });

            act(() => {
              fireEvent.keyDown(tabs[1], { key: 'ArrowLeft' });
              jest.advanceTimersByTime(5);
            });

            await waitFor(() => {
              expect(tabs[0]).toHaveFocus();
              // panel one is the active tab
              expect(screen.getByText(panelOneContent)).toBeVisible();
            });
          });
        });

        describe('vertical orientation', () => {
          it('should do nothing', async () => {
            jest.useFakeTimers();

            render(<TabsTest orientation="vertical" />);

            act(() => {
              jest.advanceTimersByTime(5);
            });

            const tabs = screen.getAllByRole('tab');

            await waitFor(() => {
              expect(screen.getByText(panelOneContent)).toBeVisible();
            });

            act(() => {
              userEvent.tab();
              fireEvent.keyDown(tabs[0], { key: 'ArrowLeft' });
              jest.advanceTimersByTime(5);
            });

            await waitFor(() => {
              expect(tabs[0]).toHaveFocus();
              expect(screen.getByText(panelOneContent)).toBeVisible();
            });

            act(() => {
              fireEvent.keyDown(tabs[0], { key: 'ArrowRight' });
              jest.advanceTimersByTime(5);
            });

            await waitFor(() => {
              expect(tabs[0]).toHaveFocus();
              expect(screen.getByText(panelOneContent)).toBeVisible();
            });
          });
        });
      });

      describe('ArrowDown and ArrowUp', () => {
        describe('vertical orientation', () => {
          it('should set focus and activate the last tab when pressing ArrowUp on first tab', async () => {
            jest.useFakeTimers();

            render(<TabsTest orientation="vertical" />);

            act(() => {
              jest.advanceTimersByTime(5);
            });

            const tabs = screen.getAllByRole('tab');

            act(() => {
              userEvent.tab();
              fireEvent.keyDown(tabs[0], { key: 'ArrowUp' });
              jest.advanceTimersByTime(5);
            });

            await waitFor(() => {
              expect(tabs[2]).toHaveFocus();
              expect(screen.getByText(panelThreeContent)).toBeVisible();
            });
          });

          it('should set focus and activate the first tab when pressing ArrowDown on last tab', async () => {
            jest.useFakeTimers();

            render(<TabsTest orientation="vertical" />);

            act(() => {
              jest.advanceTimersByTime(5);
            });

            const tabs = screen.getAllByRole('tab');

            act(() => {
              fireEvent.focus(tabs[2]);
              fireEvent.keyDown(tabs[2], { key: 'ArrowDown' });
              jest.advanceTimersByTime(5);
            });

            await waitFor(() => {
              expect(tabs[0]).toHaveFocus();
              expect(screen.getByText(panelOneContent)).toBeVisible();
            });
          });

          it('should set focus and activate the first/last tab', async () => {
            jest.useFakeTimers();

            render(<TabsTest orientation="vertical" />);

            act(() => {
              jest.advanceTimersByTime(5);
            });

            const tabs = screen.getAllByRole('tab');

            act(() => {
              userEvent.tab();
              fireEvent.keyDown(tabs[0], { key: 'ArrowUp' });
              jest.advanceTimersByTime(5);
            });

            await waitFor(() => {
              expect(tabs[2]).toHaveFocus();
              expect(screen.getByText(panelThreeContent)).toBeVisible();
            });

            act(() => {
              fireEvent.keyDown(tabs[2], { key: 'ArrowDown' });
              jest.advanceTimersByTime(5);
            });

            await waitFor(() => {
              expect(tabs[0]).toHaveFocus();
              expect(screen.getByText(panelOneContent)).toBeVisible();
            });
          });

          it('set focus and NOT activate the first/last tab when isManual is true', async () => {
            jest.useFakeTimers();

            render(<TabsTest orientation="vertical" isManual />);

            act(() => {
              jest.advanceTimersByTime(5);
            });

            const tabs = screen.getAllByRole('tab');

            await waitFor(() => {
              expect(screen.getByText(panelOneContent)).toBeVisible();
            });

            act(() => {
              userEvent.tab();
            });

            await waitFor(() => {
              expect(screen.getByText(panelOneContent)).toBeVisible();
            });

            act(() => {
              fireEvent.keyDown(tabs[0], { key: 'ArrowUp' });
              jest.advanceTimersByTime(5);
            });

            await waitFor(() => {
              expect(tabs[2]).toHaveFocus();
              expect(screen.getByText(panelThreeContent)).not.toBeVisible();
            });

            act(() => {
              fireEvent.keyDown(tabs[2], { key: 'ArrowDown' });
              jest.advanceTimersByTime(5);
            });

            await waitFor(() => {
              expect(tabs[0]).toHaveFocus();
              // panel one is the active tab
              expect(screen.getByText(panelOneContent)).toBeVisible();
            });
          });
        });

        describe('horizontal orientation', () => {
          it('should do nothing', async () => {
            jest.useFakeTimers();

            render(<TabsTest />);

            act(() => {
              jest.advanceTimersByTime(5);
            });

            const tabs = screen.getAllByRole('tab');

            await waitFor(() => {
              expect(screen.getByText(panelOneContent)).toBeVisible();
            });

            act(() => {
              userEvent.tab();
              fireEvent.keyDown(tabs[0], { key: 'ArrowDown' });
              jest.advanceTimersByTime(5);
            });

            await waitFor(() => {
              expect(tabs[0]).toHaveFocus();
              expect(screen.getByText(panelOneContent)).toBeVisible();
            });

            act(() => {
              fireEvent.keyDown(tabs[0], { key: 'ArrowUp' });
              jest.advanceTimersByTime(5);
            });

            await waitFor(() => {
              expect(tabs[0]).toHaveFocus();
              expect(screen.getByText(panelOneContent)).toBeVisible();
            });
          });
        });
      });
    });
  });
});
