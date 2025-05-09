import React from 'react';

import { Slider, SliderRail, SliderFilledRail, SliderThumb } from '@components';
import { a11yTest, fireEvent, render, screen, userEvent } from '@test-utils';

import { SliderProps } from './types';

describe('<Slider />', () => {
  function SliderTest(props: Partial<SliderProps>) {
    const { value: valueProp } = props;
    const [value, setValue] = React.useState(valueProp || 0);

    return (
      <Slider
        ariaLabel="This is a test"
        value={value}
        onChange={setValue}
        {...props}
      >
        <SliderRail>
          <SliderFilledRail />
        </SliderRail>
        <SliderThumb />
      </Slider>
    );
  }

  it('should pass a11y tests', async () => {
    await a11yTest(<SliderTest />);
  });

  it('should contain the proper aria attributes', () => {
    render(<SliderTest />);

    const slider = screen.getByRole('slider');

    expect(slider.getAttribute('tabindex')).toBe('0');
    expect(slider.getAttribute('aria-valuemin')).toBe('0');
    expect(slider.getAttribute('aria-valuenow')).toBe('0');
    expect(slider.getAttribute('aria-valuemax')).toBe('100');
    expect(slider.getAttribute('aria-orientation')).toBe('horizontal');
  });

  it('should call the onChange function when the moving the slider thumb', () => {
    const spyOnChange = jest.fn();

    render(<SliderTest onChange={spyOnChange} />);

    const sliderThumb = screen.getByRole('slider');

    userEvent.tab();
    fireEvent.keyDown(sliderThumb, { key: 'ArrowRight' });

    expect(spyOnChange).toHaveBeenCalled();
  });

  describe('keyboard navigation', () => {
    describe('arrow keys + End and Home', () => {
      it('should move thumb and have correct value', () => {
        render(<SliderTest />);

        const sliderThumb = screen.getByRole('slider');

        userEvent.tab();
        expect(sliderThumb).toHaveFocus();

        expect(sliderThumb.getAttribute('aria-valuenow')).toBe('0');

        fireEvent.keyDown(sliderThumb, { key: 'ArrowRight' });
        expect(sliderThumb.getAttribute('aria-valuenow')).toBe('1');

        fireEvent.keyDown(sliderThumb, { key: 'ArrowUp' });
        expect(sliderThumb.getAttribute('aria-valuenow')).toBe('2');

        fireEvent.keyDown(sliderThumb, { key: 'End' });
        expect(sliderThumb.getAttribute('aria-valuenow')).toBe('100');

        fireEvent.keyDown(sliderThumb, { key: 'Home' });
        expect(sliderThumb.getAttribute('aria-valuenow')).toBe('0');
      });
    });

    describe('Tab', () => {
      it('should set/loose focus to the slide thumb', () => {
        render(<SliderTest />);

        const sliderThumb = screen.getByRole('slider');

        expect(sliderThumb).not.toHaveFocus();

        userEvent.tab();
        expect(sliderThumb).toHaveFocus();

        userEvent.tab();
        expect(sliderThumb).not.toHaveFocus();
      });
    });

    describe('Shift+Tab', () => {
      it('should loose/set focus to the slide thumb', () => {
        render(<SliderTest />);

        const sliderThumb = screen.getByRole('slider');

        expect(sliderThumb).not.toHaveFocus();

        userEvent.tab();
        userEvent.tab();
        userEvent.tab({ shift: true });
        expect(sliderThumb).toHaveFocus();

        userEvent.tab({ shift: true });
        expect(sliderThumb).not.toHaveFocus();
      });
    });
  });
});
