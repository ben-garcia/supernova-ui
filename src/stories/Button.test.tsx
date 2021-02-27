import React from 'react';

import { a11yTest } from '../test-utils';
import { Button } from './Button';

describe('<Button />', () => {
  it('should pass a11y tests', async () => {
    await a11yTest(<Button label="button" />);
  });
});
