import { FC, PropsWithChildren } from 'react';

import SliderRoot from './SliderRoot';
import { SliderRootProps } from './types';
import SliderFilledRail from './SliderFilledRail';
import { SliderFilledRailProps } from './SliderFilledRail/types';
import SliderRail from './SliderRail';
import { SliderRailProps } from './SliderRail/types';
import SliderThumb from './SliderThumb';
import { SliderThumbProps } from './SliderThumb/types';

interface SliderComponent {
  /**
   * The container for all Slider related components
   * that provides context to its children.
   */
  Root: FC<PropsWithChildren<SliderRootProps>>;
  /**
   * Component that represents the active or completed portion of the slider
   * track.
   */
  FilledRail: FC<SliderFilledRailProps>;
  /**
   * Visual background track on which the slider operates.
   */
  Rail: FC<PropsWithChildren<SliderRailProps>>;
  /**
   *  Component is the draggable handle that the user interacts.
   */
  Thumb: FC<SliderThumbProps>;
}

const Slider: SliderComponent = {
  Root: SliderRoot,
  FilledRail: SliderFilledRail,
  Rail: SliderRail,
  Thumb: SliderThumb,
};

export default Slider;
