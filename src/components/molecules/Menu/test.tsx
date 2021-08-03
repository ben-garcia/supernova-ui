/* eslint react/jsx-wrap-multilines: 0 */
import React from 'react';

import Menu from '.';
import { MenuProps } from './types';
import MenuButton from './MenuButton';
import MenuItem from './MenuItem';
import MenuGroup from './MenuGroup';
import MenuList from './MenuList';
import {
  // act,
  a11yTest,
  fireEvent,
  mockMatchMedia,
  render,
  screen,
  userEvent,
} from '../../../test-utils';

describe('<Menu />', () => {
  beforeAll(() => mockMatchMedia());

  const MenuTest = (props: Omit<MenuProps, 'children'>) => {
    return (
      <Menu {...props}>
        <MenuButton data-testid="menu-button">open</MenuButton>
        <MenuList data-testid="menu-list">
          <MenuGroup title="main">
            <MenuItem data-testid="profile">Profile</MenuItem>
            <MenuItem data-testid="settings">Settings</MenuItem>
          </MenuGroup>
          <MenuGroup title="secondary">
            <MenuItem data-testid="nightmode">Night Mode</MenuItem>
            <MenuItem data-testid="signout">Signout</MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>
    );
  };

  it('should pass a11y tests', async () => {
    await a11yTest(<MenuTest isOpen onClose={() => {}} />);
  });

  it('should render with correct aria attributes', () => {
    const { rerender, getByTestId } = render(
      <MenuTest isOpen={false} onClose={() => {}} />
    );
    const button = getByTestId('menu-button');
    const menuList = getByTestId('menu-list');

    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(button).toHaveAttribute(
      'aria-controls',
      menuList.getAttribute('id')
    );

    rerender(<MenuTest isOpen onClose={() => {}} />);

    expect(button).toHaveAttribute('aria-expanded', 'true');
  });

  it('should render menu items with correct role', () => {
    const { getByTestId } = render(<MenuTest isOpen onClose={() => {}} />);
    const menuItemProfile = getByTestId('profile');

    expect(menuItemProfile).toHaveAttribute('role', 'menuitem');
  });

  it('should render menu list inside a portal', () => {
    const { getByTestId } = render(<MenuTest isOpen onClose={() => {}} />);
    const menuList = getByTestId('menu-list');
    const portal = menuList.parentElement;
    const menuId = menuList?.getAttribute('id')?.replace('-list', '');

    expect(portal?.getAttribute('id')).toBe(`${menuId}-portal`);
  });

  it('should call the onClick function', () => {
    const mockFunction = jest.fn();
    const { getByText } = render(
      <Menu isOpen onClose={() => {}}>
        <MenuButton>open</MenuButton>
        <MenuList>
          <MenuItem onClick={mockFunction}>Profile</MenuItem>
        </MenuList>
      </Menu>
    );

    const item = getByText('Profile');

    fireEvent.click(item);

    expect(mockFunction).toHaveBeenCalledTimes(1);
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
      jest.useFakeTimers();

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

    beforeEach(() => jest.clearAllTimers());

    describe('esc key', () => {
      it('should return focus to the trigger when by default', () => {
        render(<Test />);

        const profileItem = screen.getByText('Profile');
        const button = screen.getByText('Open');

        fireEvent.click(button);

        jest.advanceTimersByTime(30);

        expect(profileItem).toHaveFocus();

        fireEvent.keyDown(window, { key: 'Escape' });
        jest.advanceTimersByTime(30);

        expect(button).toHaveFocus();
      });

      it('should NOT return focus to the trigger when closeOnEsc is false', () => {
        render(<Test closeOnEsc={false} />);

        const profileItem = screen.getByText('Profile');
        const button = screen.getByText('Open');

        fireEvent.click(button);

        jest.advanceTimersByTime(30);

        expect(profileItem).toHaveFocus();

        fireEvent.keyDown(window, { key: 'Escape' });
        jest.advanceTimersByTime(30);

        expect(profileItem).toHaveFocus();
      });
    });

    describe('tab and shift+tab', () => {
      it('should have no effect', () => {
        render(<Test />);

        const profileItem = screen.getByText('Profile');
        const button = screen.getByText('Open');

        expect(profileItem).not.toHaveFocus();

        fireEvent.click(button);

        jest.advanceTimersByTime(30);

        expect(profileItem).toHaveFocus();

        userEvent.tab();
        expect(profileItem).toHaveFocus();

        userEvent.tab({ shift: true });
        expect(profileItem).toHaveFocus();
      });
    });

    describe('function keys', () => {
      describe('End and Home', () => {
        it('should set focus to the first and last menu buttons', () => {
          render(<Test />);

          const profileItem = screen.getByText('Profile');
          const button = screen.getByText('Open');
          const signout = screen.getByText('Signout');

          fireEvent.click(button);

          jest.advanceTimersByTime(30);

          expect(profileItem).toHaveFocus();

          fireEvent.keyDown(window, { key: 'End' });
          expect(signout).toHaveFocus();

          fireEvent.keyDown(window, { key: 'Home' });
          expect(profileItem).toHaveFocus();
        });
      });
    });

    describe('arrow keys', () => {
      describe('ArrowLeft and ArrowRight', () => {
        it('should set focus to the next and previous menu buttons', () => {
          render(<Test />);

          const button = screen.getByText('Open');
          const profileItem = screen.getByText('Profile');
          const settings = screen.getByText('Settings');
          const nightMode = screen.getByText(/Night Mode/);
          const signout = screen.getByText('Signout');

          fireEvent.click(button);

          jest.advanceTimersByTime(30);

          expect(profileItem).toHaveFocus();

          fireEvent.keyDown(window, { key: 'ArrowRight' });
          expect(settings).toHaveFocus();

          fireEvent.keyDown(window, { key: 'ArrowRight' });
          expect(nightMode).toHaveFocus();

          fireEvent.keyDown(window, { key: 'ArrowRight' });
          expect(signout).toHaveFocus();

          fireEvent.keyDown(window, { key: 'ArrowLeft' });
          expect(nightMode).toHaveFocus();

          fireEvent.keyDown(window, { key: 'ArrowLeft' });
          expect(settings).toHaveFocus();

          fireEvent.keyDown(window, { key: 'ArrowLeft' });
          expect(profileItem).toHaveFocus();
        });

        describe('ArrowLeft', () => {
          it('should set focus to the last button when current focus is on the first button,', () => {
            render(<Test />);

            const button = screen.getByText('Open');
            const profileItem = screen.getByText('Profile');
            const signout = screen.getByText('Signout');

            fireEvent.click(button);

            jest.advanceTimersByTime(30);

            expect(profileItem).toHaveFocus();

            fireEvent.keyDown(window, { key: 'ArrowLeft' });
            expect(signout).toHaveFocus();
          });
        });

        describe('ArrowRight', () => {
          it('should set focus to the first button when current focus is on the last button,', () => {
            render(<Test />);

            const button = screen.getByText('Open');
            const profileItem = screen.getByText('Profile');
            const signout = screen.getByText('Signout');

            fireEvent.click(button);

            jest.advanceTimersByTime(30);

            // set focus to the last menu button item
            fireEvent.keyDown(window, { key: 'End' });
            expect(signout).toHaveFocus();

            fireEvent.keyDown(window, { key: 'ArrowRight' });
            expect(profileItem).toHaveFocus();
          });
        });
      });

      describe('ArrowDown and ArrowUp', () => {
        it('should set focus to the next and previous menu buttons', () => {
          render(<Test />);

          const button = screen.getByText('Open');
          const profileItem = screen.getByText('Profile');
          const settings = screen.getByText('Settings');
          const nightMode = screen.getByText(/Night Mode/);
          const signout = screen.getByText('Signout');

          fireEvent.click(button);

          jest.advanceTimersByTime(30);

          expect(profileItem).toHaveFocus();

          fireEvent.keyDown(window, { key: 'ArrowDown' });
          expect(settings).toHaveFocus();

          fireEvent.keyDown(window, { key: 'ArrowDown' });
          expect(nightMode).toHaveFocus();

          fireEvent.keyDown(window, { key: 'ArrowDown' });
          expect(signout).toHaveFocus();

          fireEvent.keyDown(window, { key: 'ArrowUp' });
          expect(nightMode).toHaveFocus();

          fireEvent.keyDown(window, { key: 'ArrowUp' });
          expect(settings).toHaveFocus();

          fireEvent.keyDown(window, { key: 'ArrowUp' });
          expect(profileItem).toHaveFocus();
        });

        describe('ArrowUp', () => {
          it('should set focus to the last button when current focus is on the first button,', () => {
            render(<Test />);

            const button = screen.getByText('Open');
            const profileItem = screen.getByText('Profile');
            const signout = screen.getByText('Signout');

            fireEvent.click(button);

            jest.advanceTimersByTime(30);

            expect(profileItem).toHaveFocus();

            fireEvent.keyDown(window, { key: 'ArrowUp' });
            expect(signout).toHaveFocus();
          });
        });

        describe('ArrowDown', () => {
          it('should set focus to the first button when current focus is on the last button,', () => {
            render(<Test />);

            const button = screen.getByText('Open');
            const profileItem = screen.getByText('Profile');
            const signout = screen.getByText('Signout');

            fireEvent.click(button);

            jest.advanceTimersByTime(30);

            // set focus to the last menu button item
            fireEvent.keyDown(window, { key: 'End' });
            expect(signout).toHaveFocus();

            fireEvent.keyDown(window, { key: 'ArrowDown' });
            expect(profileItem).toHaveFocus();
          });
        });
      });
    });

    describe('letter keys', () => {
      it('should focus the menu button with first letter matching the key', () => {
        render(<Test />);

        const button = screen.getByText('Open');
        const profile = screen.getByText('Profile');
        const settings = screen.getByText('Settings');
        const nightMode = screen.getByText(/Night Mode/);

        fireEvent.click(button);

        jest.advanceTimersByTime(30);

        // set focus to the last menu button item
        fireEvent.keyDown(window, { key: 's' });
        expect(settings).toHaveFocus();

        fireEvent.keyDown(window, { key: 'p' });
        expect(profile).toHaveFocus();

        fireEvent.keyDown(window, { key: 'n' });
        expect(nightMode).toHaveFocus();

        fireEvent.keyDown(window, { key: 's' });
        expect(settings).toHaveFocus();
      });

      it('should cycle through all menu buttons with the same key', () => {
        render(<Test />);

        const button = screen.getByText('Open');
        const settings = screen.getByText('Settings');
        const signout = screen.getByText('Signout');

        fireEvent.click(button);

        jest.advanceTimersByTime(30);

        // set focus to the last menu button item
        fireEvent.keyDown(window, { key: 's' });
        expect(settings).toHaveFocus();

        fireEvent.keyDown(window, { key: 's' });
        expect(signout).toHaveFocus();

        fireEvent.keyDown(window, { key: 's' });
        expect(settings).toHaveFocus();
      });
    });
  });
});
