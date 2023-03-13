/* eslint react/jsx-wrap-multilines: 0 */
import React from 'react';

import { Menu, MenuButton, MenuList, MenuItem, MenuGroup } from '@molecules';
import {
  act,
  a11yTest,
  fireEvent,
  render,
  screen,
  userEvent,
} from '@testUtils';

import { MenuProps } from './types';

describe('<Menu />', () => {
  const openDelay = 40 + 30; // setTimeout + 30 extra
  const closeDelay = 100;
  const MenuTest = (props: Omit<MenuProps, 'children'>) => {
    return (
      <Menu {...props}>
        <MenuButton>open</MenuButton>
        <MenuList>
          <MenuGroup title="main">
            <MenuItem>Profile</MenuItem>
            <MenuItem>Settings</MenuItem>
          </MenuGroup>
          <MenuGroup title="secondary">
            <MenuItem>Night Mode</MenuItem>
            <MenuItem>Signout</MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>
    );
  };

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    // jest.useRealTimers();
  });

  it.skip('should pass a11y tests', async () => {
    await a11yTest(<MenuTest isOpen onClose={() => {}} />);
  });

  it('should render with correct aria attributes', async () => {
    const { rerender } = render(<MenuTest isOpen={false} onClose={() => {}} />);
    let button = screen.getByRole('button');
    let menuList = screen.queryByRole('menu');

    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(menuList).not.toBeInTheDocument();

    rerender(<MenuTest isOpen onClose={() => {}} />);

    button = screen.getByRole('button');
    menuList = await screen.findByRole('menu');

    expect(menuList).toHaveAttribute('role', 'menu');
    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(button).toHaveAttribute(
      'aria-controls',
      menuList.getAttribute('id')
    );
  });

  it('should render menu items with correct role', async () => {
    render(<MenuTest isOpen onClose={() => {}} />);
    jest.advanceTimersByTime(openDelay);
    const menuItems = await screen.findAllByRole('menuitem');

    menuItems.forEach(el => {
      expect(el).toHaveAttribute('role', 'menuitem');
    });
  });

  it('should call the onClick function', () => {
    const mockFunction = jest.fn();
    render(
      <Menu isOpen onClose={() => {}}>
        <MenuButton>open</MenuButton>
        <MenuList>
          <MenuItem onClick={mockFunction}>Profile</MenuItem>
        </MenuList>
      </Menu>
    );

    jest.advanceTimersByTime(openDelay);

    const item = screen.getByText('Profile');

    act(() => {
      fireEvent.click(item);
      expect(mockFunction).toHaveBeenCalledTimes(1);
    });
  });

  describe('keyboard navigation', () => {
    /**
     * Warning: An update to ForwardRef inside a test was not wrapped in act(...).
     * When testing, code that causes React state updates should be wrapped into act(...):
     *
     * act(() => {
     *	 fireEvent.click(button);
     *	 jest.advanceTimersByTime(20);
     * });
     *
     * NOTE: passes when running this single test
     *			 fails when running all tests.
     */

    // passes all tests
    // fails single test
    //
    // All with the warning

    let Test: React.FC<Partial<MenuProps>>;

    beforeAll(() => {
      Test = props => {
        const [isOpen, setIsOpen] = React.useState(false);
        return (
          <Menu {...props} isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <MenuButton
              data-testid="menu-button"
              onClick={() => setIsOpen(true)}
            >
              Open
            </MenuButton>
            <MenuList data-testid="test-list">
              <MenuGroup title="main">
                <MenuItem data-testid="test-profile">Profile</MenuItem>
                <MenuItem data-testid="test-settings">Settings</MenuItem>
              </MenuGroup>
              <MenuGroup title="secondary">
                <MenuItem data-testid="test-nightmode">Night Mode</MenuItem>
                <MenuItem data-testid="test-signout">Signout</MenuItem>
              </MenuGroup>
            </MenuList>
          </Menu>
        );
      };
    });

    describe('esc key', () => {
      it('should return focus to the trigger by default', () => {
        render(<Test />);

        const button = screen.getByText('Open');

        act(() => {
          fireEvent.click(button);
          jest.advanceTimersByTime(openDelay);
        });
        const profileItem = screen.getByText('Profile');
        expect(profileItem).toHaveFocus();

        act(() => {
          fireEvent.keyDown(profileItem, { key: 'Escape' });
          jest.advanceTimersByTime(closeDelay);
          expect(button).toHaveFocus();
        });
      });

      it('should NOT return focus to the trigger when closeOnEsc is false', () => {
        render(<Test closeOnEsc={false} />);

        const button = screen.getByText('Open');

        act(() => {
          fireEvent.click(button);
          jest.advanceTimersByTime(openDelay);
        });

        const profileItem = screen.getByText('Profile');
        expect(profileItem).toHaveFocus();

        act(() => {
          fireEvent.keyDown(profileItem, { key: 'Escape' });
          expect(button).not.toHaveFocus();
          expect(profileItem).toHaveFocus();
        });
      });
    });

    describe('tab and shift+tab', () => {
      it('should have no effect', () => {
        render(<Test />);

        const button = screen.getByText('Open');
        let profileItem: HTMLElement | null = null;

        act(() => {
          fireEvent.click(button);
          jest.advanceTimersByTime(openDelay);
          profileItem = screen.getByText('Profile');
          expect(profileItem).toHaveFocus();
        });

        act(() => {
          userEvent.tab();
          expect(profileItem).toHaveFocus();
        });

        act(() => {
          userEvent.tab({ shift: true });
          expect(profileItem).toHaveFocus();
        });
      });
    });

    describe('function keys', () => {
      describe('End and Home', () => {
        it('should set focus to the first and last menu buttons', () => {
          render(<Test />);

          const button = screen.getByText('Open');
          let profileItem: HTMLElement | null = null;
          let signout: HTMLElement | null = null;

          act(() => {
            fireEvent.click(button);
            jest.advanceTimersByTime(openDelay);
            profileItem = screen.getByText('Profile');
            signout = screen.getByText('Signout');
            expect(profileItem).toHaveFocus();
          });

          act(() => {
            fireEvent.keyDown(profileItem!, { key: 'End' });
            // fasf forward
            jest.advanceTimersByTime(0);
            expect(signout).toHaveFocus();
          });

          act(() => {
            fireEvent.keyDown(signout!, { key: 'Home' });
            // fasf forward
            jest.advanceTimersByTime(0);
            expect(profileItem).toHaveFocus();
          });
        });
      });
    });

    describe('arrow keys', () => {
      describe('ArrowLeft and ArrowRight', () => {
        it('should set focus to the next and previous menu buttons', () => {
          render(<Test />);

          const button = screen.getByText('Open');
          let profileItem: HTMLElement | null = null;
          let settings: HTMLElement | null = null;
          let nightMode: HTMLElement | null = null;
          let signout: HTMLElement | null = null;

          act(() => {
            fireEvent.click(button);
            jest.advanceTimersByTime(openDelay);
            profileItem = screen.getByText('Profile');
            settings = screen.getByText('Settings');
            nightMode = screen.getByText(/Night Mode/);
            signout = screen.getByText('Signout');
            expect(profileItem).toHaveFocus();
          });

          act(() => {
            fireEvent.keyDown(profileItem!, { key: 'ArrowRight' });
            jest.advanceTimersByTime(0);
            expect(settings).toHaveFocus();
          });

          act(() => {
            fireEvent.keyDown(settings!, { key: 'ArrowRight' });
            jest.advanceTimersByTime(0);
            expect(nightMode).toHaveFocus();
          });

          act(() => {
            fireEvent.keyDown(nightMode!, { key: 'ArrowRight' });
            jest.advanceTimersByTime(0);
            expect(signout).toHaveFocus();
          });

          act(() => {
            fireEvent.keyDown(signout!, { key: 'ArrowLeft' });
            jest.advanceTimersByTime(0);
            expect(nightMode).toHaveFocus();
          });

          act(() => {
            fireEvent.keyDown(nightMode!, { key: 'ArrowLeft' });
            jest.advanceTimersByTime(0);
            expect(settings).toHaveFocus();
          });

          act(() => {
            fireEvent.keyDown(settings!, { key: 'ArrowLeft' });
            jest.advanceTimersByTime(0);
            expect(profileItem).toHaveFocus();
          });
        });

        describe('ArrowLeft', () => {
          it('should set focus to the last menu item when current focus is on the first button,', () => {
            render(<Test />);

            const button = screen.getByText('Open');
            let profileItem: HTMLElement | null = null;
            let signout: HTMLElement | null = null;

            act(() => {
              fireEvent.click(button);
              jest.advanceTimersByTime(openDelay);
              profileItem = screen.getByText('Profile');
              signout = screen.getByText('Signout');
              expect(profileItem).toHaveFocus();
            });

            act(() => {
              fireEvent.keyDown(profileItem!, { key: 'ArrowLeft' });
              jest.advanceTimersByTime(0);
              expect(signout).toHaveFocus();
            });
          });
        });

        describe('ArrowRight', () => {
          it('should set focus to the first menu item when current focus is on the last button,', () => {
            render(<Test />);

            const button = screen.getByText('Open');
            let profileItem: HTMLElement | null = null;
            let signout: HTMLElement | null = null;

            act(() => {
              fireEvent.click(button);
              jest.advanceTimersByTime(openDelay);
              profileItem = screen.getByText('Profile');
              signout = screen.getByText('Signout');
            });

            act(() => {
              // set focus to the last menu button item
              fireEvent.keyDown(profileItem!, { key: 'End' });
              jest.advanceTimersByTime(0);
              expect(signout).toHaveFocus();
            });

            act(() => {
              fireEvent.keyDown(signout!, { key: 'ArrowRight' });
              jest.advanceTimersByTime(0);
              expect(profileItem).toHaveFocus();
            });
          });
        });
      });

      describe('ArrowDown and ArrowUp', () => {
        it('should set focus to the next and previous menu items', () => {
          render(<Test />);

          const button = screen.getByText('Open');
          let profileItem: HTMLElement | null = null;
          let settings: HTMLElement | null = null;
          let nightMode: HTMLElement | null = null;
          let signout: HTMLElement | null = null;

          act(() => {
            fireEvent.click(button);
            jest.advanceTimersByTime(openDelay);
            profileItem = screen.getByText('Profile');
            settings = screen.getByText('Settings');
            nightMode = screen.getByText(/Night Mode/);
            signout = screen.getByText('Signout');
            expect(profileItem).toHaveFocus();
          });

          act(() => {
            fireEvent.keyDown(profileItem!, { key: 'ArrowDown' });
            jest.advanceTimersByTime(0);
            expect(settings).toHaveFocus();
          });

          act(() => {
            fireEvent.keyDown(settings!, { key: 'ArrowDown' });
            jest.advanceTimersByTime(0);
            expect(nightMode).toHaveFocus();
          });

          act(() => {
            fireEvent.keyDown(nightMode!, { key: 'ArrowDown' });
            jest.advanceTimersByTime(0);
            expect(signout).toHaveFocus();
          });

          act(() => {
            fireEvent.keyDown(signout!, { key: 'ArrowUp' });
            jest.advanceTimersByTime(0);
            expect(nightMode).toHaveFocus();
          });

          act(() => {
            fireEvent.keyDown(settings!, { key: 'ArrowUp' });
            jest.advanceTimersByTime(0);
            expect(settings).toHaveFocus();
          });

          act(() => {
            fireEvent.keyDown(profileItem!, { key: 'ArrowUp' });
            jest.advanceTimersByTime(0);
            expect(profileItem).toHaveFocus();
          });
        });

        describe('ArrowUp', () => {
          it('should set focus to the last menu item when current focus is on the first item,', () => {
            render(<Test />);

            const button = screen.getByText('Open');
            let profileItem: HTMLElement | null = null;
            let signout: HTMLElement | null = null;

            act(() => {
              fireEvent.click(button);
              jest.advanceTimersByTime(openDelay);
              profileItem = screen.getByText('Profile');
              signout = screen.getByText('Signout');
              expect(profileItem).toHaveFocus();
            });

            act(() => {
              fireEvent.keyDown(profileItem!, { key: 'ArrowUp' });
              jest.advanceTimersByTime(0);
              expect(signout).toHaveFocus();
            });
          });
        });

        describe('ArrowDown', () => {
          it('should set focus to the first menu item when current focus is on the last item,', () => {
            render(<Test />);

            const button = screen.getByText('Open');
            let profileItem: HTMLElement | null = null;
            let signout: HTMLElement | null = null;

            act(() => {
              fireEvent.click(button);
              jest.advanceTimersByTime(openDelay);
              profileItem = screen.getByText('Profile');
              signout = screen.getByText('Signout');
            });

            act(() => {
              // set focus to the last menu button item
              fireEvent.keyDown(profileItem!, { key: 'End' });
              jest.advanceTimersByTime(0);
              expect(signout).toHaveFocus();
            });

            act(() => {
              fireEvent.keyDown(signout!, { key: 'ArrowDown' });
              jest.advanceTimersByTime(0);
              expect(profileItem).toHaveFocus();
            });
          });
        });
      });
    });

    describe('letter keys', () => {
      it('should focus the menu item with first letter matching the key', () => {
        render(<Test />);

        const button = screen.getByText('Open');
        let profileItem: HTMLElement | null = null;
        let settings: HTMLElement | null = null;
        let nightMode: HTMLElement | null = null;

        act(() => {
          fireEvent.click(button);
          jest.advanceTimersByTime(openDelay);
          profileItem = screen.getByText('Profile');
          settings = screen.getByText('Settings');
          nightMode = screen.getByText(/Night Mode/);
        });

        act(() => {
          // set focus to the last menu item
          fireEvent.keyDown(profileItem!, { key: 's' });
          jest.advanceTimersByTime(0);
          expect(settings).toHaveFocus();
        });

        act(() => {
          fireEvent.keyDown(settings!, { key: 'p' });
          jest.advanceTimersByTime(0);
          expect(profileItem).toHaveFocus();
        });

        act(() => {
          fireEvent.keyDown(profileItem!, { key: 'n' });
          jest.advanceTimersByTime(0);
          expect(nightMode).toHaveFocus();
        });

        act(() => {
          fireEvent.keyDown(nightMode!, { key: 's' });

          jest.advanceTimersByTime(0);
          expect(settings).toHaveFocus();
        });
      });

      it('should cycle through all menu buttons with the same key', () => {
        render(<Test />);

        const button = screen.getByText('Open');
        let profileItem: HTMLElement | null = null;
        let settings: HTMLElement | null = null;
        let signout: HTMLElement | null = null;

        act(() => {
          fireEvent.click(button);
          jest.advanceTimersByTime(openDelay);
          profileItem = screen.getByText('Profile');
          settings = screen.getByText('Settings');
          signout = screen.getByText('Signout');
        });

        act(() => {
          // set focus to the last menu button item
          fireEvent.keyDown(profileItem!, { key: 's' });
          jest.advanceTimersByTime(0);
          expect(settings).toHaveFocus();
        });

        act(() => {
          fireEvent.keyDown(settings!, { key: 's' });
          jest.advanceTimersByTime(0);
          expect(signout).toHaveFocus();
        });

        act(() => {
          fireEvent.keyDown(signout!, { key: 's' });
          jest.advanceTimersByTime(0);
          expect(settings).toHaveFocus();
        });
      });
    });
  });
});
