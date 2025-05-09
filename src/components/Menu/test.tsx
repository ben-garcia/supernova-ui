/* eslint react/jsx-wrap-multilines: 0 */
import React from 'react';

import { Menu, MenuButton, MenuList, MenuItem, MenuGroup } from '@components';
import { a11yTest, fireEvent, render, screen, userEvent } from '@test-utils';

import { MenuProps } from './types';

describe('<Menu />', () => {
  function MenuTest(props: Omit<MenuProps, 'children'>) {
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
  }

  it.skip('should pass a11y tests', async () => {
    await a11yTest(<MenuTest isOpen onClose={() => {}} />);
  });

  it('should render with correct aria attributes', () => {
    const { rerender } = render(<MenuTest isOpen={false} onClose={() => {}} />);
    const button = screen.getByRole('button');
    const menuList = screen.getByRole('menu');

    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(button).toHaveAttribute(
      'aria-controls',
      menuList.getAttribute('id')
    );

    rerender(<MenuTest isOpen onClose={() => {}} />);

    expect(button).toHaveAttribute('aria-expanded', 'true');
  });

  it('should render menu items with correct role', () => {
    render(<MenuTest isOpen onClose={() => {}} />);
    const menuItems = screen.getAllByRole('menuitem');

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

    const item = screen.getByText('Profile');

    fireEvent.click(item);

    expect(mockFunction).toHaveBeenCalledTimes(1);
  });

  describe('keyboard navigation', () => {
    let Test: React.FC<Partial<MenuProps>>;

    beforeAll(() => {
      Test = props => {
        const [isOpen, setIsOpen] = React.useState(false);
        return (
          <Menu {...props} isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <MenuButton onClick={() => setIsOpen(true)}>Open</MenuButton>
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
    });

    describe('esc key', () => {
      it('should return focus to the trigger when by default', () => {
        render(<Test />);

        const profileItem = screen.getByText('Profile');
        const button = screen.getByRole('button');

        fireEvent.click(button);
        expect(profileItem).toHaveFocus();

        fireEvent.keyDown(profileItem, { key: 'Escape' });
        expect(button).toHaveFocus();
      });

      it('should NOT return focus to the trigger when closeOnEsc is false', () => {
        render(<Test closeOnEsc={false} />);

        const profileItem = screen.getByText('Profile');
        const button = screen.getByText('Open');

        fireEvent.click(button);

        expect(profileItem).toHaveFocus();

        fireEvent.keyDown(profileItem, { key: 'Escape' });

        expect(profileItem).toHaveFocus();
      });
    });

    describe('tab and shift+tab', () => {
      it('should have no effect', () => {
        render(<Test />);

        const profileItem = screen.getByText('Profile');
        const button = screen.getByRole('button');

        expect(profileItem).not.toHaveFocus();

        fireEvent.click(button);
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
          const button = screen.getByRole('button');
          const signout = screen.getByText('Signout');

          fireEvent.click(button);
          expect(profileItem).toHaveFocus();

          fireEvent.keyDown(profileItem, { key: 'End' });
          expect(signout).toHaveFocus();

          fireEvent.keyDown(signout, { key: 'Home' });
          expect(profileItem).toHaveFocus();
        });
      });
    });

    describe('arrow keys', () => {
      describe('ArrowLeft and ArrowRight', () => {
        it('should set focus to the next and previous menu buttons', () => {
          render(<Test />);

          const button = screen.getByRole('button');
          const profileItem = screen.getByText('Profile');
          const settings = screen.getByText('Settings');
          const nightMode = screen.getByText(/Night Mode/);
          const signout = screen.getByText('Signout');

          fireEvent.click(button);
          expect(profileItem).toHaveFocus();

          fireEvent.keyDown(profileItem, { key: 'ArrowRight' });
          expect(settings).toHaveFocus();

          fireEvent.keyDown(settings, { key: 'ArrowRight' });
          expect(nightMode).toHaveFocus();

          fireEvent.keyDown(nightMode, { key: 'ArrowRight' });
          expect(signout).toHaveFocus();

          fireEvent.keyDown(signout, { key: 'ArrowLeft' });
          expect(nightMode).toHaveFocus();

          fireEvent.keyDown(nightMode, { key: 'ArrowLeft' });
          expect(settings).toHaveFocus();

          fireEvent.keyDown(settings, { key: 'ArrowLeft' });
          expect(profileItem).toHaveFocus();
        });

        describe('ArrowLeft', () => {
          it('should set focus to the last button when current focus is on the first button,', () => {
            render(<Test />);

            const button = screen.getByRole('button');
            const profileItem = screen.getByText('Profile');
            const signout = screen.getByText('Signout');

            fireEvent.click(button);
            expect(profileItem).toHaveFocus();

            fireEvent.keyDown(profileItem, { key: 'ArrowLeft' });
            expect(signout).toHaveFocus();
          });
        });

        describe('ArrowRight', () => {
          it('should set focus to the first button when current focus is on the last button,', () => {
            render(<Test />);

            const button = screen.getByRole('button');
            const profileItem = screen.getByText('Profile');
            const signout = screen.getByText('Signout');

            fireEvent.click(button);

            // set focus to the last menu button item
            fireEvent.keyDown(profileItem, { key: 'End' });
            expect(signout).toHaveFocus();

            fireEvent.keyDown(signout, { key: 'ArrowRight' });
            expect(profileItem).toHaveFocus();
          });
        });
      });

      describe('ArrowDown and ArrowUp', () => {
        it('should set focus to the next and previous menu buttons', () => {
          render(<Test />);

          const button = screen.getByRole('button');
          const profileItem = screen.getByText('Profile');
          const settings = screen.getByText('Settings');
          const nightMode = screen.getByText(/Night Mode/);
          const signout = screen.getByText('Signout');

          fireEvent.click(button);
          expect(profileItem).toHaveFocus();

          fireEvent.keyDown(profileItem, { key: 'ArrowDown' });
          expect(settings).toHaveFocus();

          fireEvent.keyDown(settings, { key: 'ArrowDown' });
          expect(nightMode).toHaveFocus();

          fireEvent.keyDown(nightMode, { key: 'ArrowDown' });
          expect(signout).toHaveFocus();

          fireEvent.keyDown(signout, { key: 'ArrowUp' });
          expect(nightMode).toHaveFocus();

          fireEvent.keyDown(settings, { key: 'ArrowUp' });
          expect(settings).toHaveFocus();

          fireEvent.keyDown(profileItem, { key: 'ArrowUp' });
          expect(profileItem).toHaveFocus();
        });

        describe('ArrowUp', () => {
          it('should set focus to the last button when current focus is on the first button,', () => {
            render(<Test />);

            const button = screen.getByRole('button');
            const profileItem = screen.getByText('Profile');
            const signout = screen.getByText('Signout');

            fireEvent.click(button);
            expect(profileItem).toHaveFocus();

            fireEvent.keyDown(profileItem, { key: 'ArrowUp' });
            expect(signout).toHaveFocus();
          });
        });

        describe('ArrowDown', () => {
          it('should set focus to the first button when current focus is on the last button,', () => {
            render(<Test />);

            const button = screen.getByRole('button');
            const profileItem = screen.getByText('Profile');
            const signout = screen.getByText('Signout');

            fireEvent.click(button);

            // set focus to the last menu button item
            fireEvent.keyDown(profileItem, { key: 'End' });
            expect(signout).toHaveFocus();

            fireEvent.keyDown(signout, { key: 'ArrowDown' });
            expect(profileItem).toHaveFocus();
          });
        });
      });
    });

    describe('letter keys', () => {
      it('should focus the menu button with first letter matching the key', () => {
        render(<Test />);

        const button = screen.getByRole('button');
        const profileItem = screen.getByText('Profile');
        const settings = screen.getByText('Settings');
        const nightMode = screen.getByText(/Night Mode/);

        fireEvent.click(button);

        // set focus to the last menu button item
        fireEvent.keyDown(profileItem, { key: 's' });
        expect(settings).toHaveFocus();

        fireEvent.keyDown(settings, { key: 'p' });
        expect(profileItem).toHaveFocus();

        fireEvent.keyDown(profileItem, { key: 'n' });
        expect(nightMode).toHaveFocus();

        fireEvent.keyDown(nightMode, { key: 's' });
        expect(settings).toHaveFocus();
      });

      it('should cycle through all menu buttons with the same key', () => {
        render(<Test />);

        const button = screen.getByRole('button');
        const profileItem = screen.getByText('Profile');
        const settings = screen.getByText('Settings');
        const signout = screen.getByText('Signout');

        fireEvent.click(button);

        // set focus to the last menu button item
        fireEvent.keyDown(profileItem, { key: 's' });
        expect(settings).toHaveFocus();

        fireEvent.keyDown(settings, { key: 's' });
        expect(signout).toHaveFocus();

        fireEvent.keyDown(signout, { key: 's' });
        expect(settings).toHaveFocus();
      });
    });
  });
});
